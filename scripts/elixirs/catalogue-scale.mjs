import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import { auditElixirArtifact } from "./audit.mjs";
import { buildElixirSite, cataloguePageSize } from "./build.mjs";
import { loadCatalogue } from "./catalogue.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const fixtureRevision = "1234567890abcdef1234567890abcdef12345678";
const onePixelPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
const artworkHash = createHash("sha256").update(onePixelPng).digest("hex");
const referenceRecord = "# Synthetic artwork reference\n";
const referenceHash = createHash("sha256").update(referenceRecord).digest("hex");

const write = (root, path, contents) => {
  const destination = resolve(root, path);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, contents);
};

const copy = (root, source, destination = source) => {
  const target = resolve(root, destination);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(resolve(repositoryRoot, source), target);
};

const cartridgeSource = ({ suffix, slug, title, covenant }) => {
  const metadata = {
    schemaVersion: "1.0.0",
    id: `the-guide.elixir.${slug}`,
    slug,
    title,
    summary: `Production-shaped catalogue scale fixture ${suffix}.`,
    playerPromise: `Exercise deterministic discovery and publishing paths for fixture ${suffix}.`,
    publisher: { name: "The Guide" },
    version: "0.1.0",
    status: "experimental",
    estimatedMinutes: { min: 5, max: 10 },
    energy: "low",
    movement: "none",
    requiredInputs: ["time", "energy", "hard_boundary"],
    gameplayCapability: "conversation_only",
    dataBehavior: {
      guideReceives: "none",
      providerProcessing: "user_chosen_harness",
      memory: "current_session_only",
      mementoStorage: "user_chosen_harness",
    },
    compatibility: { status: "experimental", testedHarnessClasses: ["coding_agent"] },
    covenantVersion: "1.0.0",
    artwork: {
      path: `assets/cartridges/${slug}.png`,
      width: 1,
      height: 1,
      altText: `A single-pixel test artwork for fixture ${suffix}.`,
      provenanceId: `art-${slug}`,
    },
  };
  return `# ${title}\n\n\`\`\`elixir-metadata\n${JSON.stringify(metadata, null, 2)}\n\`\`\`\n\n${covenant.trim()}\n\n# Fixture play\n\nAsk for one fictional word, reflect it once, then let the fixture end.\n`;
};

export const createProductionScaleSource = ({ count = 500 } = {}) => {
  if (!Number.isInteger(count) || count < 1 || count > 500) throw new Error("Production scale count must be between 1 and 500");
  const sourceRoot = mkdtempSync(resolve(tmpdir(), "guide-production-catalogue-"));
  const base = loadCatalogue();
  const covenant = readFileSync(resolve(repositoryRoot, "content/elixirs/covenant.md"), "utf8");
  copy(sourceRoot, "content/elixirs/covenant.md");
  copy(sourceRoot, "TERMS.md");
  copy(sourceRoot, "site/elixirs/styles.css");
  copy(sourceRoot, "site/elixirs/catalogue.js");
  copy(sourceRoot, "site/elixirs/cabinet.js");
  write(sourceRoot, "docs/review.md", "# Synthetic review evidence\n");
  write(sourceRoot, "docs/compatibility.md", "# Synthetic compatibility evidence\n");
  write(sourceRoot, "docs/reference.md", referenceRecord);

  const releases = [];
  const entries = [];
  const assets = [];
  for (let index = 0; index < count; index += 1) {
    const suffix = String(index).padStart(4, "0");
    const slug = `fixture-${suffix}`;
    const title = `Fixture Elixir ${suffix}`;
    const sourcePath = `content/elixirs/releases/the-guide/${slug}/0.1.0/elixir.md`;
    const source = cartridgeSource({ suffix, slug, title, covenant });
    const sourceHash = createHash("sha256").update(source).digest("hex");
    write(sourceRoot, sourcePath, source);
    write(sourceRoot, `site/elixirs/assets/cartridges/${slug}.png`, onePixelPng);
    releases.push({
      elixirId: `the-guide.elixir.${slug}`,
      publisherId: "the-guide",
      slug,
      version: "0.1.0",
      cartridgeSchemaVersion: "1.0.0",
      covenantVersion: "1.0.0",
      sourcePath,
      bytes: Buffer.byteLength(source),
      sha256: sourceHash,
      sourceRevision: fixtureRevision,
      publishedAt: "2026-07-18",
      canonicalPath: `cartridges/the-guide/${slug}/0.1.0/elixir.md`,
      legacyPaths: [],
      artwork: [{ provenanceId: `art-${slug}`, sha256: artworkHash }],
      rightsReference: "TERMS.md",
      reviewReferences: ["docs/review.md"],
      compatibilityReferences: ["docs/compatibility.md"],
      statusAtPublication: "experimental",
    });
    entries.push({
      elixirId: `the-guide.elixir.${slug}`,
      publisherId: "the-guide",
      slug,
      recommendedVersion: "0.1.0",
      lifecycle: "published",
      title,
      summary: `Production-shaped catalogue scale fixture ${suffix}.`,
      playerPromise: `Exercise deterministic discovery and publishing paths for fixture ${suffix}.`,
      editorialOrder: index,
      featuredRationale: `Validates production catalogue behavior at entry ${suffix}.`,
      categoryIds: ["activity-conversation"],
      tagIds: [],
      toneIds: [index % 2 === 0 ? "tone-curious" : "tone-playful"],
      mechanicId: index % 2 === 0 ? "mechanic-noticing" : "mechanic-branching-story",
      interactionLabel: index % 2 === 0 ? "Synthetic noticing fixture" : "Synthetic story fixture",
      activityIds: ["activity-conversation"],
      replayabilityId: "replayable-variable",
      durationBandId: "duration-under-15",
      energy: "low",
      movement: "none",
      requiredInputs: ["time", "energy", "hard_boundary"],
      contentNoteIds: [],
      accessConsiderationIds: [],
      audienceIds: ["audience-general-alpha"],
      localeIds: ["locale-en"],
      review: { state: "reviewed", date: "2026-07-18" },
      maintenanceOwner: "The Guide maintainers",
      successor: null,
      releaseStates: [{ version: "0.1.0", lifecycle: "published", successor: null }],
      corrections: [],
    });
    assets.push({
      id: `art-${slug}`,
      path: `assets/cartridges/${slug}.png`,
      kind: "visual",
      source: "Generated scale validation fixture",
      author: "The Guide test suite",
      license: "Project test fixture",
      dimensions: { width: 1, height: 1 },
      generatedAt: "2026-07-18",
      generationMode: "Deterministic one-pixel fixture",
      referenceAsset: { availability: "active", path: "docs/reference.md", sha256: referenceHash },
      promptSummary: `Synthetic fixture artwork ${suffix}.`,
      sha256: artworkHash,
    });
  }

  write(sourceRoot, "content/catalogue/publishers.json", `${JSON.stringify({ schemaVersion: "1.0.0", publishers: base.publishers }, null, 2)}\n`);
  write(sourceRoot, "content/catalogue/taxonomy.json", `${JSON.stringify({ schemaVersion: "1.0.0", values: base.taxonomy }, null, 2)}\n`);
  write(sourceRoot, "content/catalogue/releases.json", `${JSON.stringify({ schemaVersion: "1.0.0", releases }, null, 2)}\n`);
  write(sourceRoot, "content/catalogue/catalogue.json", `${JSON.stringify({ schemaVersion: "1.0.0", deploymentRevision: "production-scale-fixture", entries }, null, 2)}\n`);
  write(sourceRoot, "content/catalogue/withdrawals.json", `${JSON.stringify({ schemaVersion: "1.0.0", withdrawals: [] }, null, 2)}\n`);
  write(sourceRoot, "content/catalogue/collections/scale-start.json", `${JSON.stringify({ schemaVersion: "1.0.0", id: "scale-start", title: "Scale start", summary: "The first three production-shaped fixtures.", curator: "The Guide", elixirIds: entries.slice(0, 3).map(({ elixirId }) => elixirId), lifecycle: "published", publishedAt: "2026-07-18", updatedAt: "2026-07-18" }, null, 2)}\n`);
  write(sourceRoot, "site/elixirs/assets/cartridges/manifest.json", `${JSON.stringify({ schemaVersion: 2, project: "The Guide production scale fixture", assetRoot: "assets/cartridges/", policy: "Every fixture release owns one deterministic local artwork asset.", assets }, null, 2)}\n`);
  return sourceRoot;
};

export const buildAndAuditProductionScaleFixture = ({ outputDirectory, count = 500, keepSource = false } = {}) => {
  if (!outputDirectory) throw new Error("Production scale output directory is required");
  const sourceRoot = createProductionScaleSource({ count });
  try {
    const validationStarted = performance.now();
    const catalogue = loadCatalogue({ repositoryRoot: sourceRoot });
    const validationMilliseconds = performance.now() - validationStarted;
    const buildStarted = performance.now();
    buildElixirSite({ outputDirectory, sourceRoot, sourceRevision: fixtureRevision, catalogue });
    const buildMilliseconds = performance.now() - buildStarted;
    const auditStarted = performance.now();
    const audit = auditElixirArtifact({ artifactDirectory: outputDirectory, catalogue });
    const auditMilliseconds = performance.now() - auditStarted;
    return {
      catalogue,
      sourceRoot: keepSource ? sourceRoot : null,
      count,
      pages: Math.ceil(count / cataloguePageSize),
      validationMilliseconds,
      buildMilliseconds,
      auditMilliseconds,
      fileCount: audit.fileCount,
      totalBytes: audit.totalBytes,
    };
  } finally {
    if (!keepSource) rmSync(sourceRoot, { recursive: true, force: true });
  }
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outputDirectory = resolve(process.argv[2] ?? "dist/elixirs-scale-pages");
  const result = buildAndAuditProductionScaleFixture({ outputDirectory });
  process.stdout.write(`${JSON.stringify({ ...result, catalogue: undefined }, null, 2)}\n`);
}
