import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildAndAuditProductionScaleFixture, createProductionScaleSource } from "./catalogue-scale.mjs";
import { createPublicCatalogueIndex, loadCatalogue, renderWithdrawalTombstone, searchCatalogue } from "./catalogue.mjs";
import { buildElixirSite } from "./build.mjs";
import { auditElixirArtifact } from "./audit.mjs";

const temporaryDirectories = [];
afterEach(() => {
  for (const path of temporaryDirectories.splice(0)) rmSync(path, { recursive: true, force: true });
});

describe("production-shaped hundreds-scale catalogue", () => {
  it.each([100, 500])("keeps the landing page bounded while validating %i records", (count) => {
    const outputDirectory = mkdtempSync(join(tmpdir(), "guide-catalogue-scale-output-"));
    temporaryDirectories.push(outputDirectory);
    const result = buildAndAuditProductionScaleFixture({ outputDirectory, count });
    expect(result.pages).toBe(Math.ceil(count / 24));
    expect(result.fileCount).toBeGreaterThan(count * 4);
    expect(result.totalBytes).toBeLessThan(25 * 1024 * 1024);
    const landing = readFileSync(resolve(outputDirectory, "index.html"), "utf8");
    expect((landing.match(/data-spotlight/g) ?? [])).toHaveLength(1);
    expect((landing.match(/data-catalogue-entry/g) ?? [])).toHaveLength(3);
    expect(landing).toContain(`Browse all ${count} stories`);
    expect(landing).not.toContain(`data-elixir-id="the-guide.elixir.fixture-${String(count - 1).padStart(4, "0")}"`);
    expect((readFileSync(resolve(outputDirectory, "browse/index.html"), "utf8").match(/data-catalogue-entry/g) ?? [])).toHaveLength(24);
    const lastPage = result.pages === 1 ? "browse/index.html" : `browse/page-${result.pages}/index.html`;
    expect(readFileSync(resolve(outputDirectory, lastPage), "utf8")).toContain(`Fixture Elixir ${String(count - 1).padStart(4, "0")}`);
    expect(readFileSync(resolve(outputDirectory, "catalogue-index.json"), "utf8")).not.toContain("BEGIN THE GUIDE ELIXIR CARTRIDGE");
    expect(readFileSync(resolve(outputDirectory, "collections/scale-start/index.html"), "utf8")).toContain("Fixture Elixir 0002");
    expect(readFileSync(resolve(outputDirectory, "elixirs/fixture-0000/index.html"), "utf8")).toContain("Try a different shape next");
    expect(() => readFileSync(resolve(outputDirectory, `elixirs/fixture-${String(count).padStart(4, "0")}/index.html`))).toThrow();
  }, 120_000);

  it("uses strict registry validation and deterministic discovery identities", () => {
    const sourceRoot = createProductionScaleSource({ count: 25 });
    temporaryDirectories.push(sourceRoot);
    const catalogue = loadCatalogue({ repositoryRoot: sourceRoot });
    expect(catalogue.entries).toHaveLength(25);
    expect(searchCatalogue(createPublicCatalogueIndex(catalogue).entries, "Fixture Elixir 0024")[0].slug).toBe("fixture-0024");
    expect(() => createProductionScaleSource({ count: 501 })).toThrow(/between 1 and 500/);

    const releasesPath = resolve(sourceRoot, "content/catalogue/releases.json");
    const releases = JSON.parse(readFileSync(releasesPath, "utf8"));
    releases.releases[1].canonicalPath = releases.releases[0].canonicalPath;
    writeFileSync(releasesPath, `${JSON.stringify(releases, null, 2)}\n`);
    expect(() => loadCatalogue({ repositoryRoot: sourceRoot })).toThrow(/Canonical path must be publisher-qualified|Release public paths must be unique/);
  });

  it("rejects dangling artwork references and parent-directory symlinks in validation and build", () => {
    const danglingRoot = createProductionScaleSource({ count: 1 });
    temporaryDirectories.push(danglingRoot);
    const manifestPath = resolve(danglingRoot, "site/elixirs/assets/cartridges/manifest.json");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    manifest.assets[0].referenceAsset = { availability: "active", path: "docs/missing-reference.md", sha256: "0".repeat(64) };
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    expect(() => loadCatalogue({ repositoryRoot: danglingRoot })).toThrow();

    const symlinkRoot = createProductionScaleSource({ count: 1 });
    temporaryDirectories.push(symlinkRoot);
    const validated = loadCatalogue({ repositoryRoot: symlinkRoot });
    const outsideRoot = mkdtempSync(join(tmpdir(), "guide-catalogue-outside-assets-"));
    temporaryDirectories.push(outsideRoot);
    const assetDirectory = resolve(symlinkRoot, "site/elixirs/assets/cartridges");
    const movedDirectory = resolve(outsideRoot, "cartridges");
    renameSync(assetDirectory, movedDirectory);
    symlinkSync(movedDirectory, assetDirectory, "dir");
    expect(() => loadCatalogue({ repositoryRoot: symlinkRoot })).toThrow(/symbolic link|outside approved root/);
    const outputDirectory = mkdtempSync(join(tmpdir(), "guide-catalogue-symlink-build-"));
    temporaryDirectories.push(outputDirectory);
    expect(() => buildElixirSite({ outputDirectory, sourceRoot: symlinkRoot, sourceRevision: "1234567890abcdef1234567890abcdef12345678", catalogue: validated })).toThrow(/symbolic link|outside its approved root/);
  });

  it("keeps a newer same-ID recommendation live when an older version is superseded or withdrawn", () => {
    const sourceRoot = createProductionScaleSource({ count: 1 });
    temporaryDirectories.push(sourceRoot);
    const releasesPath = resolve(sourceRoot, "content/catalogue/releases.json");
    const cataloguePath = resolve(sourceRoot, "content/catalogue/catalogue.json");
    const releasesDocument = JSON.parse(readFileSync(releasesPath, "utf8"));
    const catalogueDocument = JSON.parse(readFileSync(cataloguePath, "utf8"));
    const oldRelease = releasesDocument.releases[0];
    const oldSource = readFileSync(resolve(sourceRoot, oldRelease.sourcePath), "utf8");
    const newSource = oldSource.replace('"version": "0.1.0"', '"version": "0.2.0"');
    const newSourcePath = "content/elixirs/releases/the-guide/fixture-0000/0.2.0/elixir.md";
    mkdirSync(resolve(sourceRoot, "content/elixirs/releases/the-guide/fixture-0000/0.2.0"), { recursive: true });
    writeFileSync(resolve(sourceRoot, newSourcePath), newSource);
    releasesDocument.releases.push({
      ...structuredClone(oldRelease),
      version: "0.2.0",
      sourcePath: newSourcePath,
      bytes: Buffer.byteLength(newSource),
      sha256: createHash("sha256").update(newSource).digest("hex"),
      canonicalPath: "cartridges/the-guide/fixture-0000/0.2.0/elixir.md",
      legacyPaths: [],
    });
    const entry = catalogueDocument.entries[0];
    entry.recommendedVersion = "0.2.0";
    entry.releaseStates = [
      { version: "0.1.0", lifecycle: "superseded", successor: { elixirId: entry.elixirId, version: "0.2.0" } },
      { version: "0.2.0", lifecycle: "published", successor: null },
    ];
    writeFileSync(releasesPath, `${JSON.stringify(releasesDocument, null, 2)}\n`);
    writeFileSync(cataloguePath, `${JSON.stringify(catalogueDocument, null, 2)}\n`);

    const supersededCatalogue = loadCatalogue({ repositoryRoot: sourceRoot });
    const supersededOutput = mkdtempSync(join(tmpdir(), "guide-same-id-superseded-"));
    temporaryDirectories.push(supersededOutput);
    buildElixirSite({ outputDirectory: supersededOutput, sourceRoot, sourceRevision: "1234567890abcdef1234567890abcdef12345678", catalogue: supersededCatalogue });
    auditElixirArtifact({ artifactDirectory: supersededOutput, catalogue: supersededCatalogue });
    expect(readFileSync(resolve(supersededOutput, oldRelease.canonicalPath), "utf8")).toBe(oldSource);
    expect(readFileSync(resolve(supersededOutput, "cartridges/the-guide/fixture-0000/0.2.0/elixir.md"), "utf8")).toBe(newSource);
    const oldVersionPage = readFileSync(resolve(supersededOutput, "elixirs/fixture-0000/versions/0.1.0/index.html"), "utf8");
    expect(oldVersionPage).toContain("superseded");
    expect(oldVersionPage).toContain('href="../../../../elixirs/fixture-0000/versions/0.2.0/"');
    expect(readFileSync(resolve(supersededOutput, "elixirs/fixture-0000/index.html"), "utf8")).toContain('data-elixir-version="0.2.0"');

    entry.releaseStates[0].lifecycle = "withdrawn";
    const withdrawal = {
      elixirId: oldRelease.elixirId,
      version: oldRelease.version,
      withdrawnAt: "2026-07-19",
      reason: "safety",
      publicExplanation: "Withdrawn after a safety review.",
      authorizedBy: "The Guide",
      successor: { elixirId: entry.elixirId, version: "0.2.0" },
      originalBytes: oldRelease.bytes,
      originalSha256: oldRelease.sha256,
      tombstoneSha256: "0".repeat(64),
    };
    withdrawal.tombstoneSha256 = createHash("sha256").update(renderWithdrawalTombstone({ withdrawal, release: oldRelease })).digest("hex");
    const mismatchedWithdrawal = structuredClone(withdrawal);
    mismatchedWithdrawal.successor = null;
    mismatchedWithdrawal.tombstoneSha256 = createHash("sha256").update(renderWithdrawalTombstone({ withdrawal: mismatchedWithdrawal, release: oldRelease })).digest("hex");
    writeFileSync(cataloguePath, `${JSON.stringify(catalogueDocument, null, 2)}\n`);
    writeFileSync(resolve(sourceRoot, "content/catalogue/withdrawals.json"), `${JSON.stringify({ schemaVersion: "1.0.0", withdrawals: [mismatchedWithdrawal] }, null, 2)}\n`);
    expect(() => loadCatalogue({ repositoryRoot: sourceRoot })).toThrow(/successor must match/);

    entry.releaseStates[0].successor = { elixirId: entry.elixirId, version: "0.1.0" };
    withdrawal.successor = { elixirId: entry.elixirId, version: "0.1.0" };
    withdrawal.tombstoneSha256 = createHash("sha256").update(renderWithdrawalTombstone({ withdrawal, release: oldRelease })).digest("hex");
    writeFileSync(cataloguePath, `${JSON.stringify(catalogueDocument, null, 2)}\n`);
    writeFileSync(resolve(sourceRoot, "content/catalogue/withdrawals.json"), `${JSON.stringify({ schemaVersion: "1.0.0", withdrawals: [withdrawal] }, null, 2)}\n`);
    expect(() => loadCatalogue({ repositoryRoot: sourceRoot })).toThrow(/succeed itself|published release/);

    entry.releaseStates[0].successor = { elixirId: entry.elixirId, version: "0.2.0" };
    withdrawal.successor = { elixirId: entry.elixirId, version: "0.2.0" };
    withdrawal.tombstoneSha256 = createHash("sha256").update(renderWithdrawalTombstone({ withdrawal, release: oldRelease })).digest("hex");
    writeFileSync(cataloguePath, `${JSON.stringify(catalogueDocument, null, 2)}\n`);
    writeFileSync(resolve(sourceRoot, "content/catalogue/withdrawals.json"), `${JSON.stringify({ schemaVersion: "1.0.0", withdrawals: [withdrawal] }, null, 2)}\n`);
    const withdrawnCatalogue = loadCatalogue({ repositoryRoot: sourceRoot });
    const withdrawnOutput = mkdtempSync(join(tmpdir(), "guide-same-id-withdrawn-"));
    temporaryDirectories.push(withdrawnOutput);
    buildElixirSite({ outputDirectory: withdrawnOutput, sourceRoot, sourceRevision: "1234567890abcdef1234567890abcdef12345678", catalogue: withdrawnCatalogue });
    auditElixirArtifact({ artifactDirectory: withdrawnOutput, catalogue: withdrawnCatalogue });
    const tombstone = readFileSync(resolve(withdrawnOutput, oldRelease.canonicalPath), "utf8");
    expect(tombstone).toContain("# Withdrawn Elixir cartridge");
    const successorTarget = "../../../../elixirs/fixture-0000/versions/0.2.0/";
    expect(tombstone).toContain(`(${successorTarget})`);
    expect(new URL(successorTarget, "https://example.test/the-guide/cartridges/the-guide/fixture-0000/0.1.0/elixir.md").pathname).toBe("/the-guide/elixirs/fixture-0000/versions/0.2.0/");
    expect(readFileSync(resolve(withdrawnOutput, "cartridges/the-guide/fixture-0000/0.2.0/elixir.md"), "utf8")).toBe(newSource);
    expect(readFileSync(resolve(withdrawnOutput, "catalogue-index.json"), "utf8")).toContain('"version": "0.2.0"');
    expect(readFileSync(resolve(withdrawnOutput, "elixirs/fixture-0000/index.html"), "utf8")).toContain("Take this story to your AI");
    expect(readFileSync(resolve(withdrawnOutput, "elixirs/fixture-0000/versions/0.1.0/index.html"), "utf8")).toContain('href="../../../../elixirs/fixture-0000/versions/0.2.0/"');
  }, 120_000);
});
