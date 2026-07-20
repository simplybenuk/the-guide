import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  artworkManifestSchema,
  catalogueDocumentSchema,
  compareReleaseLedgers,
  compareWithdrawalLedgers,
  createPublicCatalogueIndex,
  filterCatalogue,
  loadCatalogue,
  relatedCatalogueEntries,
  releasesDocumentSchema,
  renderWithdrawalTombstone,
  searchCatalogue,
  validateCatalogueRecords,
} from "./catalogue.mjs";
import { auditElixirArtifact } from "./audit.mjs";
import { buildElixirSite } from "./build.mjs";

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const documents = () => ({
  repositoryRoot: root,
  publishersDocument: readJson("content/catalogue/publishers.json"),
  releasesDocument: readJson("content/catalogue/releases.json"),
  catalogueDocument: readJson("content/catalogue/catalogue.json"),
  taxonomyDocument: readJson("content/catalogue/taxonomy.json"),
  collections: ["low-energy", "start-here", "three-ways-to-play"].map((id) => readJson(`content/catalogue/collections/${id}.json`)),
  withdrawalsDocument: readJson("content/catalogue/withdrawals.json"),
  artworkManifest: readJson("site/elixirs/assets/cartridges/manifest.json"),
});

describe("Elixir catalogue contracts", () => {
  it("loads a strict registry with eleven active Stories and immutable history", () => {
    const catalogue = loadCatalogue();
    expect(catalogue.entries.filter(({ lifecycle }) => lifecycle === "published")).toHaveLength(11);
    expect(catalogue.entries.filter(({ lifecycle }) => lifecycle === "retired").map(({ slug }) => slug)).toEqual(["signal", "mystery", "story"]);
    expect(catalogue.releases.filter(({ slug }) => ["signal", "mystery", "story", "regency-ball"].includes(slug)).map(({ bytes, sha256 }) => ({ bytes, sha256 }))).toEqual([
      { bytes: 8307, sha256: "1c371b5813f6d93f37cabe486337f2680928f3e2ae5c19d4e86d40328f597cbb" },
      { bytes: 8288, sha256: "f02cc863fb1a7cabd137c7980c2206e947313fa0e010926d1754bb5cb7f2b093" },
      { bytes: 8108, sha256: "48f4cb4f2b9cbca8c4ce04ba844b12cfb28a6a2e5398cb211ad827e04d6874d9" },
      { bytes: 53292, sha256: "7ca92ecd00c04b6300f1ebc32656c208cc79f0e508bbd02732aaa48c6abf049c" },
    ]);
    for (const { release, source } of catalogue.cartridges) {
      expect(Buffer.byteLength(source, "utf8")).toBe(release.bytes);
      expect(createHash("sha256").update(source).digest("hex")).toBe(release.sha256);
    }
    const reference = catalogue.artworkManifest.assets[0].referenceAsset;
    expect(reference.availability).toBe("archived_git");
    expect(execFileSync("git", ["rev-parse", `${reference.sourceRevision}:${reference.path}`], { cwd: root, encoding: "utf8" }).trim()).toBe(reference.gitObject);
    const referenceBytes = execFileSync("git", ["cat-file", "blob", reference.gitObject], { cwd: root, maxBuffer: 2_000_000 });
    expect(referenceBytes).toHaveLength(reference.bytes);
    expect(createHash("sha256").update(referenceBytes).digest("hex")).toBe(reference.sha256);
  });

  it("rejects unknown fields, contradictions, dangling references, and path collisions", () => {
    const unknown = documents();
    unknown.catalogueDocument.entries[0].privateNote = "must not escape";
    expect(() => validateCatalogueRecords(unknown)).toThrow();

    const contradiction = documents();
    contradiction.catalogueDocument.entries[0].title = "Changed history";
    expect(() => validateCatalogueRecords(contradiction)).toThrow(/title differs/);

    const taxonomy = documents();
    taxonomy.catalogueDocument.entries[0].mechanicId = "missing-mechanic";
    expect(() => validateCatalogueRecords(taxonomy)).toThrow(/Unknown taxonomy/);

    const collection = documents();
    collection.collections[0].elixirIds.push("the-guide.elixir.missing");
    expect(() => validateCatalogueRecords(collection)).toThrow(/unknown Elixir/);

    const paths = documents();
    paths.releasesDocument.releases.push(structuredClone(paths.releasesDocument.releases[0]));
    expect(() => validateCatalogueRecords(paths)).toThrow(/unique/);

    expect(() => releasesDocumentSchema.parse({ ...documents().releasesDocument, extra: true })).toThrow();
    expect(() => catalogueDocumentSchema.parse({ ...documents().catalogueDocument, entries: [] })).not.toThrow();
  });

  it("rejects malicious, unknown, duplicate, and unreferenced artwork manifest records", () => {
    const traversal = documents();
    traversal.artworkManifest.assets[0].path = "../../README.md";
    expect(() => validateCatalogueRecords(traversal)).toThrow();

    const unknown = documents();
    unknown.artworkManifest.assets[0].privatePath = "README.md";
    expect(() => artworkManifestSchema.parse(unknown.artworkManifest)).toThrow();

    const duplicate = documents();
    duplicate.artworkManifest.assets[1].id = duplicate.artworkManifest.assets[0].id;
    expect(() => validateCatalogueRecords(duplicate)).toThrow(/Artwork provenance IDs/);

    const unreferenced = documents();
    unreferenced.artworkManifest.assets.push({
      ...structuredClone(unreferenced.artworkManifest.assets[0]),
      id: "art-unused",
      path: "assets/cartridges/unused.png",
    });
    expect(() => validateCatalogueRecords(unreferenced)).toThrow(/unreferenced production asset/);
  });

  it("enforces append-only release history against a trusted base document", () => {
    const base = documents().releasesDocument;
    expect(compareReleaseLedgers(base, structuredClone(base))).toEqual({ retained: 14, appended: 0 });

    const append = structuredClone(base);
    append.releases.push({
      ...structuredClone(base.releases[0]),
      elixirId: "the-guide.elixir.lantern",
      slug: "lantern",
      version: "0.2.0",
      sourcePath: "content/elixirs/releases/the-guide/lantern/0.2.0/elixir.md",
      canonicalPath: "cartridges/the-guide/lantern/0.2.0/elixir.md",
      legacyPaths: [],
    });
    expect(compareReleaseLedgers(base, append)).toEqual({ retained: 14, appended: 1 });

    const changed = structuredClone(base);
    changed.releases[0].sha256 = "0".repeat(64);
    expect(() => compareReleaseLedgers(base, changed)).toThrow(/cannot be modified/);
    const deleted = structuredClone(base);
    deleted.releases.pop();
    expect(() => compareReleaseLedgers(base, deleted)).toThrow(/cannot be deleted/);
    const reordered = structuredClone(base);
    reordered.releases.reverse();
    expect(() => compareReleaseLedgers(base, reordered)).toThrow(/modified or reordered/);
  });

  it("enforces append-only withdrawal history against a trusted base document", () => {
    const empty = documents().withdrawalsDocument;
    expect(compareWithdrawalLedgers(empty, structuredClone(empty))).toEqual({ retained: 0, appended: 0 });
    const release = documents().releasesDocument.releases[0];
    const withdrawal = {
      elixirId: release.elixirId,
      version: release.version,
      withdrawnAt: "2026-07-19",
      reason: "safety",
      publicExplanation: "Withdrawn after review.",
      authorizedBy: "The Guide",
      successor: null,
      originalBytes: release.bytes,
      originalSha256: release.sha256,
      tombstoneSha256: "0".repeat(64),
    };
    const appended = { schemaVersion: "1.0.0", withdrawals: [withdrawal] };
    expect(compareWithdrawalLedgers(empty, appended)).toEqual({ retained: 0, appended: 1 });
    expect(() => compareWithdrawalLedgers(appended, empty)).toThrow(/cannot be deleted/);
    const mutated = structuredClone(appended);
    mutated.withdrawals[0].authorizedBy = "Someone else";
    expect(() => compareWithdrawalLedgers(appended, mutated)).toThrow(/cannot be modified/);
    const reorderedBase = { schemaVersion: "1.0.0", withdrawals: [withdrawal, { ...withdrawal, elixirId: "the-guide.elixir.story" }] };
    expect(() => compareWithdrawalLedgers(reorderedBase, { ...reorderedBase, withdrawals: [...reorderedBase.withdrawals].reverse() })).toThrow(/modified or reordered/);
  });

  it("projects only public metadata and implements deterministic local discovery", () => {
    const index = createPublicCatalogueIndex(loadCatalogue());
    expect(Object.keys(index)).toEqual(["schemaVersion", "deploymentRevision", "entries"]);
    expect(JSON.stringify(index)).not.toMatch(/sourcePath|reviewReferences|compatibilityReferences|transcript|prompt/i);
    expect(searchCatalogue(index.entries, "story").map(({ slug }) => slug)).toContain("regency-ball");
    expect(searchCatalogue(index.entries, "lobster").map(({ slug }) => slug)).toEqual(["claws"]);
    expect(searchCatalogue(index.entries, "The Guide")).toHaveLength(11);
    expect(searchCatalogue(index.entries, "")).toHaveLength(11);
    expect(filterCatalogue(index.entries, { genre: ["genre-western"] }).map(({ slug }) => slug)).toEqual(["red-dust-reckoning"]);
    expect(relatedCatalogueEntries(index.entries, "the-guide.elixir.last-light")).toHaveLength(3);
  });

  it("projects spoiler-safe authored Story discovery into static browsing and detail facts", () => {
    const catalogue = loadCatalogue();
    const index = createPublicCatalogueIndex(catalogue);
    const regency = index.entries.find(({ slug }) => slug === "regency-ball");

    expect(regency.story).toEqual({
      playerRole: "An adult guest whose family expects one advantageous match at a grand fictional ball.",
      interactionModes: ["speech", "action", "decision"],
      choicePresentation: "hybrid",
      emotionalIntensity: "moderate",
      readingIntensity: "medium",
      endingDescription: "Four distinct endings shaped by obligation, trust, public truth, and the final waltz.",
      replayLevel: "high",
      replayPromise: "Three first-dance routes reveal different conversations and later ways to change the ball.",
      sessionShape: "single_session",
    });
    expect(regency.taxonomyIds).toEqual(expect.arrayContaining([
      "genre-romance",
      "story-shape-one-night-event",
      "interaction-speech",
      "interaction-action",
      "interaction-decision",
      "emotion-moderate",
      "session-single-session",
    ]));
    expect(searchCatalogue(index.entries, "courtship").map(({ slug }) => slug)).toContain("regency-ball");
    expect(filterCatalogue(index.entries, { genre: ["genre-romance"] }).map(({ slug }) => slug)).toEqual(["regency-ball"]);

    const outputDirectory = mkdtempSync(join(tmpdir(), "the-guide-regency-catalogue-"));
    try {
      buildElixirSite({ outputDirectory, sourceRevision: "0".repeat(40), catalogue });
      const detail = readFileSync(resolve(outputDirectory, "elixirs/regency-ball/index.html"), "utf8");
      const browse = readFileSync(resolve(outputDirectory, "browse/index.html"), "utf8");
      const home = readFileSync(resolve(outputDirectory, "index.html"), "utf8");
      const startHere = readFileSync(resolve(outputDirectory, "collections/start-here/index.html"), "utf8");
      const threeWays = readFileSync(resolve(outputDirectory, "collections/three-ways-to-play/index.html"), "utf8");
      expect(detail).toContain("What you need to play");
      expect(detail).toContain("How you play");
      expect(detail).toContain("speech, action, decision");
      expect(detail).toContain("Your role");
      expect(detail).not.toContain("<h2 id=\"story-facts-title\">Story experience</h2>");
      expect(browse).toContain("data-filter-facet=\"genre\"");
      expect(browse).toContain("data-filter-id=\"interaction-speech\"");
      expect(home).toContain("The Regency Ball");
      expect(home).toContain("Start here");
      expect(home).toContain("Three worlds to enter");
      expect(startHere).toContain("The Regency Ball");
      expect(threeWays).toContain("The Dragon&#39;s Last Contract");
      expect(() => auditElixirArtifact({ artifactDirectory: outputDirectory, catalogue })).not.toThrow();
    } finally {
      rmSync(outputDirectory, { recursive: true, force: true });
    }
  });

  it("renders an explicit non-playable withdrawal tombstone", () => {
    const release = loadCatalogue().releases[0];
    const withoutDigest = {
      elixirId: release.elixirId,
      version: release.version,
      withdrawnAt: "2026-07-19",
      reason: "safety",
      publicExplanation: "Withdrawn after review.",
      authorizedBy: "The Guide",
      successor: null,
      originalBytes: release.bytes,
      originalSha256: release.sha256,
      tombstoneSha256: "0".repeat(64),
    };
    const text = renderWithdrawalTombstone({ withdrawal: withoutDigest, release });
    expect(text).toContain("# Withdrawn Elixir cartridge");
    expect(text).toContain(release.sha256);
    expect(text).toContain("Do not guess, reconstruct");
    expect(text).toContain("[Return to the Elixir catalogue from the publisher-qualified path](../../../../)");
    expect(text).toContain("[Return to the Elixir catalogue from permanent legacy path 1](../../../)");
    expect(new URL("../../../../", "https://example.test/the-guide/cartridges/the-guide/signal/0.1.0/elixir.md").pathname).toBe("/the-guide/");
    expect(new URL("../../../", "https://example.test/the-guide/cartridges/signal/0.1.0/elixir.md").pathname).toBe("/the-guide/");
    expect(new URL("../../../../", "https://example.test/cartridges/the-guide/signal/0.1.0/elixir.md").pathname).toBe("/");
    expect(new URL("../../../", "https://example.test/cartridges/signal/0.1.0/elixir.md").pathname).toBe("/");
    expect(text).not.toContain("Common Elixir Covenant");

    const withSuccessor = renderWithdrawalTombstone({ withdrawal: { ...withoutDigest, successor: { elixirId: "the-guide.elixir.mystery", version: "0.1.0" } }, release });
    const canonicalTarget = "../../../../elixirs/mystery/versions/0.1.0/";
    const legacyTarget = "../../../elixirs/mystery/versions/0.1.0/";
    expect(withSuccessor).toContain(`(${canonicalTarget})`);
    expect(withSuccessor).toContain(`(${legacyTarget})`);
    expect(new URL(canonicalTarget, "https://example.test/the-guide/cartridges/the-guide/signal/0.1.0/elixir.md").pathname).toBe("/the-guide/elixirs/mystery/versions/0.1.0/");
    expect(new URL(legacyTarget, "https://example.test/the-guide/cartridges/signal/0.1.0/elixir.md").pathname).toBe("/the-guide/elixirs/mystery/versions/0.1.0/");
    expect(new URL(canonicalTarget, "https://example.test/cartridges/the-guide/signal/0.1.0/elixir.md").pathname).toBe("/elixirs/mystery/versions/0.1.0/");
    expect(new URL(legacyTarget, "https://example.test/cartridges/signal/0.1.0/elixir.md").pathname).toBe("/elixirs/mystery/versions/0.1.0/");
  });

  it("requires a digest-bound withdrawal record and removes withdrawn discovery", () => {
    const fixture = documents();
    const release = fixture.releasesDocument.releases[0];
    const entry = fixture.catalogueDocument.entries.find(({ elixirId }) => elixirId === release.elixirId);
    entry.lifecycle = "withdrawn";
    entry.releaseStates[0].lifecycle = "withdrawn";
    for (const collection of fixture.collections) {
      collection.elixirIds = collection.elixirIds.filter((id) => id !== release.elixirId);
    }
    const withdrawal = {
      elixirId: release.elixirId,
      version: release.version,
      withdrawnAt: "2026-07-19",
      reason: "safety",
      publicExplanation: "Withdrawn after a safety review.",
      authorizedBy: "The Guide",
      successor: null,
      originalBytes: release.bytes,
      originalSha256: release.sha256,
      tombstoneSha256: "0".repeat(64),
    };
    withdrawal.tombstoneSha256 = createHash("sha256").update(renderWithdrawalTombstone({ withdrawal, release })).digest("hex");
    fixture.withdrawalsDocument.withdrawals.push(withdrawal);
    const validated = validateCatalogueRecords(fixture);
    expect(createPublicCatalogueIndex(validated).entries).toHaveLength(11);

    const tampered = structuredClone(fixture);
    tampered.withdrawalsDocument.withdrawals[0].tombstoneSha256 = "f".repeat(64);
    expect(() => validateCatalogueRecords(tampered)).toThrow(/tombstone digest differs/);

    const unsafe = structuredClone(fixture);
    unsafe.withdrawalsDocument.withdrawals[0].publicExplanation = "See https://example.com for details.";
    expect(() => validateCatalogueRecords(unsafe)).toThrow(/cannot contain links/);
  });

  it("builds and audits complete withdrawal and successor lifecycle behavior", () => {
    const withdrawalFixture = documents();
    const release = withdrawalFixture.releasesDocument.releases[0];
    const withdrawalEntry = withdrawalFixture.catalogueDocument.entries.find(({ elixirId }) => elixirId === release.elixirId);
    withdrawalEntry.lifecycle = "withdrawn";
    withdrawalEntry.releaseStates[0].lifecycle = "withdrawn";
    for (const collection of withdrawalFixture.collections) collection.elixirIds = collection.elixirIds.filter((id) => id !== release.elixirId);
    const withdrawal = {
      elixirId: release.elixirId,
      version: release.version,
      withdrawnAt: "2026-07-19",
      reason: "safety",
      publicExplanation: "Withdrawn after a safety review.",
      authorizedBy: "The Guide",
      successor: null,
      originalBytes: release.bytes,
      originalSha256: release.sha256,
      tombstoneSha256: "0".repeat(64),
    };
    withdrawal.tombstoneSha256 = createHash("sha256").update(renderWithdrawalTombstone({ withdrawal, release })).digest("hex");
    withdrawalFixture.withdrawalsDocument.withdrawals.push(withdrawal);
    const withdrawnCatalogue = validateCatalogueRecords(withdrawalFixture);
    const withdrawnOutput = mkdtempSync(join(tmpdir(), "guide-withdrawal-build-"));
    try {
      buildElixirSite({ outputDirectory: withdrawnOutput, sourceRevision: "1234567890abcdef1234567890abcdef12345678", catalogue: withdrawnCatalogue });
      auditElixirArtifact({ artifactDirectory: withdrawnOutput, catalogue: withdrawnCatalogue });
      const canonical = readFileSync(resolve(withdrawnOutput, release.canonicalPath), "utf8");
      expect(canonical).toBe(readFileSync(resolve(withdrawnOutput, release.legacyPaths[0]), "utf8"));
      expect(canonical).toContain("# Withdrawn Elixir cartridge");
      expect(() => readFileSync(resolve(withdrawnOutput, "elixirs/signal/index.html"))).toThrow();
      expect(readFileSync(resolve(withdrawnOutput, "catalogue-index.json"), "utf8")).not.toContain(release.elixirId);
      expect(readFileSync(resolve(withdrawnOutput, "delivery-events.js"), "utf8")).not.toContain(release.elixirId);
    } finally {
      rmSync(withdrawnOutput, { recursive: true, force: true });
    }

    const successorFixture = documents();
    const successorEntry = successorFixture.catalogueDocument.entries.find(({ elixirId }) => elixirId === "the-guide.elixir.signal");
    successorEntry.lifecycle = "deprecated";
    successorEntry.successor = { elixirId: "the-guide.elixir.last-light", version: "0.1.0" };
    successorEntry.releaseStates[0] = { version: "0.1.0", lifecycle: "deprecated", successor: { elixirId: "the-guide.elixir.last-light", version: "0.1.0" } };
    const successorCatalogue = validateCatalogueRecords(successorFixture);
    const successorOutput = mkdtempSync(join(tmpdir(), "guide-successor-build-"));
    try {
      buildElixirSite({ outputDirectory: successorOutput, sourceRevision: "1234567890abcdef1234567890abcdef12345678", catalogue: successorCatalogue });
      auditElixirArtifact({ artifactDirectory: successorOutput, catalogue: successorCatalogue });
      const detail = readFileSync(resolve(successorOutput, "elixirs/signal/index.html"), "utf8");
      expect(detail.indexOf("Use the maintained successor")).toBeLessThan(detail.indexOf("Take this story to your AI"));
      expect(detail).toContain("The Last Light 0.1.0");
      expect(readFileSync(resolve(successorOutput, "elixirs/signal/versions/0.1.0/index.html"), "utf8")).toContain("Use the maintained successor");
    } finally {
      rmSync(successorOutput, { recursive: true, force: true });
    }
  });

  it("keeps a 500-entry metadata fixture deterministic and responsive", () => {
    const seed = createPublicCatalogueIndex(loadCatalogue()).entries[0];
    const entries = Array.from({ length: 500 }, (_, index) => ({
      ...structuredClone(seed),
      elixirId: `the-guide.elixir.fixture-${String(index).padStart(3, "0")}`,
      slug: `fixture-${String(index).padStart(3, "0")}`,
      title: `Fixture Elixir ${String(index).padStart(3, "0")}`,
      editorialOrder: index,
      mechanicId: index % 2 === 0 ? "mechanic-noticing" : "mechanic-branching-story",
      taxonomyIds: ["duration-under-15", index % 2 === 0 ? "mechanic-noticing" : "mechanic-branching-story"],
      searchTerms: [index % 2 === 0 ? "noticing" : "story"],
    }));
    expect(searchCatalogue(entries, "Fixture Elixir 499").map(({ slug }) => slug)).toEqual(["fixture-499"]);
    expect(filterCatalogue(entries, { mechanic: ["mechanic-noticing"] })).toHaveLength(250);
    expect(JSON.stringify({ schemaVersion: "1.0.0", entries }).length).toBeLessThan(1_200_000);
    expect(new Set(entries.map(({ elixirId: id }) => id))).toHaveLength(500);
  });
});
