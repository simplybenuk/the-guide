import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { z } from "zod";

import { validateCartridgeDocument } from "./cartridge.mjs";

export const catalogueSchemaVersion = "1.0.0";
const moduleRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const semanticVersion = z.string().regex(/^\d+\.\d+\.\d+$/);
const sha256 = z.string().regex(/^[0-9a-f]{64}$/);
const sourceRevision = z.string().regex(/^[0-9a-f]{40}$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value);
}, "Date must be a real ISO calendar date");
const unique = (values) => new Set(values).size === values.length;
const uniqueArray = (schema, message) => z.array(schema).refine(unique, message);
const catalogueVersion = z.literal(catalogueSchemaVersion);
const elixirId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*\.elixir\.[a-z0-9]+(?:-[a-z0-9]+)*$/);
const safeRepositoryPath = z
  .string()
  .min(1)
  .max(240)
  .regex(/^[a-zA-Z0-9._/-]+$/)
  .refine((value) => !value.startsWith("/") && !value.includes("//") && !value.split("/").some((segment) => ["", ".", ".."].includes(segment)), "Path must be repository-relative and normalized");

const artworkPath = z.string().regex(/^assets\/cartridges\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|webp)$/);
const artworkReferenceSchema = z.discriminatedUnion("availability", [
  z.object({
    availability: z.literal("active"),
    path: safeRepositoryPath,
    sha256,
  }).strict(),
  z.object({
    availability: z.literal("archived_git"),
    path: safeRepositoryPath,
    sourceRevision,
    gitObject: z.string().regex(/^[0-9a-f]{40}$/),
    bytes: z.number().int().positive(),
    sha256,
    recoveryRecord: safeRepositoryPath,
  }).strict(),
]);
const artworkManifestAssetSchema = z.object({
  id: z.string().regex(/^art-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  path: artworkPath,
  kind: z.literal("visual"),
  source: z.string().trim().min(1).max(240),
  author: z.string().trim().min(1).max(240),
  license: z.string().trim().min(1).max(240),
  dimensions: z.object({ width: z.number().int().positive().max(4096), height: z.number().int().positive().max(4096) }).strict(),
  generatedAt: date,
  generationMode: z.string().trim().min(1).max(300),
  referenceAsset: artworkReferenceSchema.nullable(),
  promptSummary: z.string().trim().min(1).max(500),
  sha256,
}).strict();

export const artworkManifestSchema = z.object({
  schemaVersion: z.literal(2),
  project: z.string().trim().min(1).max(120),
  assetRoot: z.literal("assets/cartridges/"),
  policy: z.string().trim().min(1).max(300),
  assets: z.array(artworkManifestAssetSchema),
}).strict();

const publisherSchema = z.object({
  publisherId: slug,
  displayName: z.string().trim().min(1).max(80),
  type: z.literal("first_party"),
  attribution: z.string().trim().min(1).max(240),
  rightsStatus: z.literal("alpha_terms"),
  lifecycle: z.literal("active"),
}).strict();

export const publishersDocumentSchema = z.object({
  schemaVersion: catalogueVersion,
  publishers: uniqueArray(publisherSchema, "Publisher records must be unique").superRefine((values, context) => {
    if (!unique(values.map(({ publisherId }) => publisherId))) {
      context.addIssue({ code: "custom", message: "publisherId must be unique" });
    }
  }),
}).strict();

const releaseArtworkSchema = z.object({ provenanceId: slug.regex(/^art-/), sha256 }).strict();
export const releaseSchema = z.object({
  elixirId,
  publisherId: slug,
  slug,
  version: semanticVersion,
  cartridgeSchemaVersion: semanticVersion,
  covenantVersion: semanticVersion,
  sourcePath: safeRepositoryPath,
  bytes: z.number().int().positive().max(200_000),
  sha256,
  sourceRevision,
  publishedAt: date,
  canonicalPath: safeRepositoryPath,
  legacyPaths: uniqueArray(safeRepositoryPath, "Legacy paths must be unique"),
  artwork: uniqueArray(releaseArtworkSchema, "Artwork provenance IDs must be unique").min(1),
  rightsReference: safeRepositoryPath,
  reviewReferences: uniqueArray(safeRepositoryPath, "Review references must be unique").min(1),
  compatibilityReferences: uniqueArray(safeRepositoryPath, "Compatibility references must be unique").min(1),
  statusAtPublication: z.enum(["experimental", "stable"]),
}).strict().superRefine((record, context) => {
  if (record.elixirId !== `${record.publisherId}.elixir.${record.slug}`) {
    context.addIssue({ code: "custom", path: ["elixirId"], message: "Elixir ID must bind publisher and slug" });
  }
  if (record.canonicalPath !== `cartridges/${record.publisherId}/${record.slug}/${record.version}/elixir.md`) {
    context.addIssue({ code: "custom", path: ["canonicalPath"], message: "Canonical path must be publisher-qualified" });
  }
  for (const path of record.legacyPaths) {
    if (path !== `cartridges/${record.slug}/${record.version}/elixir.md`) {
      context.addIssue({ code: "custom", path: ["legacyPaths"], message: "Legacy paths must use the reviewed first-party shape" });
    }
  }
  const currentSource = `content/elixirs/${record.slug}.md`;
  const archivedSource = `content/elixirs/releases/${record.publisherId}/${record.slug}/${record.version}/elixir.md`;
  if (![currentSource, archivedSource].includes(record.sourcePath)) {
    context.addIssue({ code: "custom", path: ["sourcePath"], message: "Source path is outside approved cartridge layouts" });
  }
});

export const releasesDocumentSchema = z.object({
  schemaVersion: catalogueVersion,
  releases: z.array(releaseSchema),
}).strict();

const correctionSchema = z.object({
  date,
  field: z.string().trim().min(1).max(80),
  summary: z.string().trim().min(1).max(240),
}).strict();
const successorSchema = z.object({ elixirId, version: semanticVersion }).strict();
const releaseStateSchema = z.object({
  version: semanticVersion,
  lifecycle: z.enum(["published", "deprecated", "superseded", "withdrawn"]),
  successor: successorSchema.nullable(),
}).strict();
const reviewSchema = z.object({ state: z.literal("reviewed"), date }).strict();
const catalogueArtworkSchema = z.object({
  provenanceId: z.string().regex(/^art-[a-z0-9]+(?:-[a-z0-9]+)*$/),
  altText: z.string().trim().min(40).max(300),
}).strict();
const requiredInput = z.enum(["time", "energy", "hard_boundary", "environment_detail", "genre_boundary", "free_text_choice"]);
const storyDiscoverySchema = z.object({
  genreIds: uniqueArray(slug, "Story genre IDs must be unique").min(1),
  themeIds: uniqueArray(slug, "Story theme IDs must be unique").min(1),
  storyShapeIds: uniqueArray(slug, "Story shape IDs must be unique").min(1),
  socialShapeIds: uniqueArray(slug, "Story social-shape IDs must be unique").min(1),
  interactionModeIds: uniqueArray(slug, "Story interaction-mode IDs must be unique").min(1),
  choicePresentationId: slug,
  emotionalIntensityId: slug,
  readingIntensityId: slug,
  sessionShapeId: slug,
}).strict();

export const catalogueEntrySchema = z.object({
  elixirId,
  publisherId: slug,
  slug,
  recommendedVersion: semanticVersion,
  lifecycle: z.enum(["published", "deprecated", "superseded", "withdrawn"]),
  title: z.string().trim().min(1).max(80),
  summary: z.string().trim().min(1).max(180),
  playerPromise: z.string().trim().min(1).max(240),
  editorialOrder: z.number().int().min(0).max(100_000),
  featuredRationale: z.string().trim().min(1).max(240).nullable(),
  categoryIds: uniqueArray(slug, "Category IDs must be unique"),
  tagIds: uniqueArray(slug, "Tag IDs must be unique"),
  toneIds: uniqueArray(slug, "Tone IDs must be unique").min(1),
  mechanicId: slug,
  interactionLabel: z.string().trim().min(1).max(120),
  activityIds: uniqueArray(slug, "Activity IDs must be unique").min(1),
  replayabilityId: slug,
  durationBandId: slug,
  energy: z.enum(["low", "medium"]),
  movement: z.enum(["none", "stay_here"]),
  requiredInputs: uniqueArray(requiredInput, "Required inputs must be unique").min(1),
  contentNoteIds: uniqueArray(slug, "Content note IDs must be unique"),
  accessConsiderationIds: uniqueArray(slug, "Access IDs must be unique"),
  audienceIds: uniqueArray(slug, "Audience IDs must be unique").min(1),
  localeIds: uniqueArray(slug, "Locale IDs must be unique").min(1),
  storyDiscovery: storyDiscoverySchema.optional(),
  catalogueArtwork: catalogueArtworkSchema.optional(),
  review: reviewSchema,
  maintenanceOwner: z.string().trim().min(1).max(80),
  successor: successorSchema.nullable(),
  releaseStates: uniqueArray(releaseStateSchema, "Release lifecycle records must be unique").min(1),
  corrections: z.array(correctionSchema),
}).strict();

export const catalogueDocumentSchema = z.object({
  schemaVersion: catalogueVersion,
  deploymentRevision: z.string().regex(/^[a-z0-9][a-z0-9._-]{0,79}$/),
  entries: z.array(catalogueEntrySchema),
}).strict();

const facet = z.enum([
  "duration", "energy", "movement", "mechanic", "tone", "activity", "input",
  "replayability", "content_note", "access", "audience", "locale", "genre",
  "theme", "story_shape", "social_shape", "interaction_mode",
  "choice_presentation", "emotional_intensity", "reading_intensity", "session_shape",
]);
export const taxonomyDocumentSchema = z.object({
  schemaVersion: catalogueVersion,
  values: z.array(z.object({
    id: slug,
    facet,
    label: z.string().trim().min(1).max(80),
    definition: z.string().trim().min(1).max(240),
    synonyms: uniqueArray(z.string().trim().min(1).max(40), "Taxonomy synonyms must be unique"),
    lifecycle: z.enum(["active", "deprecated"]),
    replacementId: slug.nullable(),
  }).strict()),
}).strict();

export const collectionSchema = z.object({
  schemaVersion: catalogueVersion,
  id: slug,
  title: z.string().trim().min(1).max(80),
  summary: z.string().trim().min(1).max(240),
  curator: z.string().trim().min(1).max(80),
  elixirIds: uniqueArray(elixirId, "Collection Elixir IDs must be unique").min(1),
  lifecycle: z.enum(["published", "retired"]),
  publishedAt: date,
  updatedAt: date,
}).strict().refine(({ publishedAt, updatedAt }) => publishedAt <= updatedAt, "Collection update cannot precede publication");

export const withdrawalSchema = z.object({
  elixirId,
  version: semanticVersion,
  withdrawnAt: date,
  reason: z.enum(["safety", "rights", "integrity", "other_public_interest"]),
  publicExplanation: z.string().trim().min(1).max(240)
    .regex(/^[^<>\r\n]+$/, "Public withdrawal explanations must be plain single-line text")
    .refine((value) => !/:\/\//.test(value) && !/!?\[[^\]]*\]\(/.test(value), "Public withdrawal explanations cannot contain links"),
  authorizedBy: z.string().trim().min(1).max(80),
  successor: successorSchema.nullable(),
  originalBytes: z.number().int().positive(),
  originalSha256: sha256,
  tombstoneSha256: sha256,
}).strict();

export const withdrawalsDocumentSchema = z.object({
  schemaVersion: catalogueVersion,
  withdrawals: z.array(withdrawalSchema),
}).strict();

const readJson = (root, path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const releaseKey = ({ elixirId, version }) => `${elixirId}@${version}`;
const normalizedRepositoryPath = (root, path) => relative(root, resolve(root, path)).split(sep).join("/");

const assertFile = (root, path) => {
  const normalized = normalizedRepositoryPath(root, path);
  if (normalized !== path || normalized.startsWith("../")) throw new Error(`Repository path escapes approved root: ${path}`);
  let current = resolve(root);
  for (const segment of path.split("/")) {
    current = resolve(current, segment);
    if (lstatSync(current).isSymbolicLink()) throw new Error(`Repository path contains a symbolic link: ${path}`);
  }
  const stat = lstatSync(resolve(root, path));
  if (stat.isSymbolicLink() || !stat.isFile()) throw new Error(`Repository reference must be a regular file: ${path}`);
  const realRoot = realpathSync(root);
  const realPath = realpathSync(resolve(root, path));
  const realRelative = relative(realRoot, realPath).split(sep).join("/");
  if (realRelative === ".." || realRelative.startsWith("../") || resolve(realRoot, realRelative) !== realPath) throw new Error(`Repository path resolves outside approved root: ${path}`);
};

const assertUnique = (values, label) => {
  if (!unique(values)) throw new Error(`${label} must be unique`);
};

const taxonomyFields = {
  categoryIds: "activity",
  tagIds: null,
  toneIds: "tone",
  mechanicId: "mechanic",
  activityIds: "activity",
  replayabilityId: "replayability",
  durationBandId: "duration",
  contentNoteIds: "content_note",
  accessConsiderationIds: "access",
  audienceIds: "audience",
  localeIds: "locale",
};

const storyTaxonomyFields = {
  genreIds: "genre",
  themeIds: "theme",
  storyShapeIds: "story_shape",
  socialShapeIds: "social_shape",
  interactionModeIds: "interaction_mode",
  choicePresentationId: "choice_presentation",
  emotionalIntensityId: "emotional_intensity",
  readingIntensityId: "reading_intensity",
  sessionShapeId: "session_shape",
};

const valuesFor = (entry, key) => Array.isArray(entry[key]) ? entry[key] : [entry[key]];

export const publicCatalogueEntrySchema = z.object({
  elixirId,
  slug,
  title: z.string().trim().min(1).max(80),
  summary: z.string().trim().min(1).max(180),
  playerPromise: z.string().trim().min(1).max(240),
  publisher: z.string().trim().min(1).max(80),
  version: semanticVersion,
  status: z.enum(["experimental", "stable"]),
  lifecycle: z.enum(["published", "deprecated", "superseded"]),
  editorialOrder: z.number().int().nonnegative(),
  duration: z.object({ min: z.number().int().positive(), max: z.number().int().positive() }).strict(),
  energy: z.enum(["low", "medium"]),
  movement: z.enum(["none", "stay_here"]),
  requiredInputs: z.array(requiredInput),
  gameplayCapability: z.literal("conversation_only"),
  dataSummary: z.string().trim().min(1).max(300),
  compatibility: z.enum(["untested", "experimental", "compatible"]),
  artwork: z.object({
    path: artworkPath,
    width: z.number().int().positive().max(4096),
    height: z.number().int().positive().max(4096),
    altText: z.string().trim().min(1).max(240),
  }).strict(),
  mechanicId: slug,
  interactionLabel: z.string().trim().min(1).max(120),
  toneIds: z.array(slug),
  taxonomyIds: z.array(slug),
  labels: z.array(z.string().trim().min(1).max(80)),
  searchTerms: z.array(z.string().trim().min(1).max(80)),
  story: z.object({
    playerRole: z.string().trim().min(1).max(160),
    interactionModes: z.array(z.enum(["speech", "action", "decision"])),
    choicePresentation: z.enum(["open", "hybrid", "authored_options"]),
    emotionalIntensity: z.enum(["gentle", "moderate", "high"]),
    readingIntensity: z.enum(["low", "medium", "high"]),
    endingDescription: z.string().trim().min(1).max(180),
    replayLevel: z.enum(["light", "moderate", "high"]),
    replayPromise: z.string().trim().min(1).max(200),
    sessionShape: z.enum(["single_session", "multi_session"]),
  }).strict().optional(),
}).strict();

export const publicCatalogueIndexSchema = z.object({
  schemaVersion: catalogueVersion,
  deploymentRevision: z.string().regex(/^[a-z0-9][a-z0-9._-]{0,79}$/),
  entries: z.array(publicCatalogueEntrySchema),
}).strict();

export const validateCatalogueRecords = ({
  repositoryRoot = moduleRoot,
  publishersDocument,
  releasesDocument,
  catalogueDocument,
  taxonomyDocument,
  collections,
  withdrawalsDocument,
  artworkManifest,
}) => {
  const publishers = publishersDocumentSchema.parse(publishersDocument).publishers;
  const releases = releasesDocumentSchema.parse(releasesDocument).releases;
  const catalogue = catalogueDocumentSchema.parse(catalogueDocument);
  const taxonomy = taxonomyDocumentSchema.parse(taxonomyDocument).values;
  const parsedCollections = collections.map((value) => collectionSchema.parse(value));
  const withdrawals = withdrawalsDocumentSchema.parse(withdrawalsDocument).withdrawals;
  const parsedArtworkManifest = artworkManifestSchema.parse(artworkManifest);

  assertUnique(publishers.map(({ publisherId }) => publisherId), "Publisher IDs");
  assertUnique(releases.map(releaseKey), "Release ID/version keys");
  assertUnique(releases.flatMap(({ canonicalPath, legacyPaths }) => [canonicalPath, ...legacyPaths]), "Release public paths");
  assertUnique(catalogue.entries.map(({ elixirId }) => elixirId), "Catalogue Elixir IDs");
  assertUnique(catalogue.entries.map(({ slug: value }) => value), "Catalogue slugs");
  assertUnique(taxonomy.map(({ id }) => id), "Taxonomy IDs");
  assertUnique(parsedCollections.map(({ id }) => id), "Collection IDs");
  assertUnique(withdrawals.map(releaseKey), "Withdrawal release keys");

  const publisherById = new Map(publishers.map((value) => [value.publisherId, value]));
  const releaseByKey = new Map(releases.map((value) => [releaseKey(value), value]));
  const entryById = new Map(catalogue.entries.map((value) => [value.elixirId, value]));
  const taxonomyById = new Map(taxonomy.map((value) => [value.id, value]));
  assertUnique(parsedArtworkManifest.assets.map(({ id }) => id), "Artwork provenance IDs");
  assertUnique(parsedArtworkManifest.assets.map(({ path }) => path), "Artwork paths");
  assertUnique(parsedArtworkManifest.assets.map(({ path }) => path.toLocaleLowerCase("en")), "Case-folded artwork paths");
  const artworkById = new Map(parsedArtworkManifest.assets.map((value) => [value.id, value]));
  const referencedArtworkIds = [
    ...releases.flatMap(({ artwork }) => artwork.map(({ provenanceId }) => provenanceId)),
    ...catalogue.entries.flatMap(({ catalogueArtwork }) => catalogueArtwork ? [catalogueArtwork.provenanceId] : []),
  ];
  if (parsedArtworkManifest.assets.some(({ id }) => !referencedArtworkIds.includes(id))) throw new Error("Artwork manifest contains an unreferenced production asset");
  for (const asset of parsedArtworkManifest.assets) {
    assertFile(repositoryRoot, `site/elixirs/${asset.path}`);
    const assetHash = createHash("sha256").update(readFileSync(resolve(repositoryRoot, `site/elixirs/${asset.path}`))).digest("hex");
    if (assetHash !== asset.sha256) throw new Error(`Artwork bytes differ from manifest: ${asset.id}`);
    if (asset.referenceAsset?.availability === "active") {
      assertFile(repositoryRoot, asset.referenceAsset.path);
      const actual = createHash("sha256").update(readFileSync(resolve(repositoryRoot, asset.referenceAsset.path))).digest("hex");
      if (actual !== asset.referenceAsset.sha256) throw new Error(`Active artwork reference digest differs: ${asset.id}`);
    } else if (asset.referenceAsset?.availability === "archived_git") {
      assertFile(repositoryRoot, asset.referenceAsset.recoveryRecord);
      const record = readFileSync(resolve(repositoryRoot, asset.referenceAsset.recoveryRecord), "utf8");
      for (const value of [asset.referenceAsset.path, asset.referenceAsset.sourceRevision, asset.referenceAsset.gitObject, String(asset.referenceAsset.bytes), asset.referenceAsset.sha256]) {
        if (!record.includes(value)) throw new Error(`Archived artwork recovery record differs from manifest: ${asset.id}`);
      }
    }
  }
  const covenant = readFileSync(resolve(repositoryRoot, "content/elixirs/covenant.md"), "utf8");

  const cartridges = releases.map((release) => {
    if (!publisherById.has(release.publisherId)) throw new Error(`Unknown publisher: ${release.publisherId}`);
    assertFile(repositoryRoot, release.sourcePath);
    for (const path of [release.rightsReference, ...release.reviewReferences, ...release.compatibilityReferences]) assertFile(repositoryRoot, path);
    const source = readFileSync(resolve(repositoryRoot, release.sourcePath), "utf8");
    const metadata = validateCartridgeDocument(source, covenant);
    const digest = createHash("sha256").update(source, "utf8").digest("hex");
    if (Buffer.byteLength(source, "utf8") !== release.bytes || digest !== release.sha256) throw new Error(`Release integrity mismatch: ${releaseKey(release)}`);
    if (metadata.id !== release.elixirId || metadata.slug !== release.slug || metadata.version !== release.version) throw new Error(`Release identity differs from cartridge: ${releaseKey(release)}`);
    if (metadata.schemaVersion !== release.cartridgeSchemaVersion || metadata.covenantVersion !== release.covenantVersion || metadata.status !== release.statusAtPublication) throw new Error(`Release metadata differs from cartridge: ${releaseKey(release)}`);
    if (metadata.publisher.name !== publisherById.get(release.publisherId).displayName) throw new Error(`Publisher projection differs from cartridge: ${releaseKey(release)}`);
    for (const artwork of release.artwork) {
      const provenance = artworkById.get(artwork.provenanceId);
      if (!provenance || provenance.sha256 !== artwork.sha256) throw new Error(`Artwork provenance mismatch: ${artwork.provenanceId}`);
      assertFile(repositoryRoot, `site/elixirs/${provenance.path}`);
      const actualArtworkHash = createHash("sha256").update(readFileSync(resolve(repositoryRoot, `site/elixirs/${provenance.path}`))).digest("hex");
      if (actualArtworkHash !== artwork.sha256) throw new Error(`Artwork bytes differ from release: ${artwork.provenanceId}`);
    }
    if (release.artwork.length !== 1 || release.artwork[0].provenanceId !== metadata.artwork.provenanceId) throw new Error(`Release artwork differs from cartridge metadata: ${releaseKey(release)}`);
    const metadataArtwork = artworkById.get(metadata.artwork.provenanceId);
    if (metadataArtwork.path !== metadata.artwork.path || metadataArtwork.dimensions.width !== metadata.artwork.width || metadataArtwork.dimensions.height !== metadata.artwork.height) throw new Error(`Artwork metadata projection differs from cartridge: ${releaseKey(release)}`);
    return Object.freeze({ release, metadata, source });
  });

  for (const entry of catalogue.entries) {
    const release = releaseByKey.get(`${entry.elixirId}@${entry.recommendedVersion}`);
    if (!release) throw new Error(`Catalogue entry has no recommended release: ${entry.elixirId}@${entry.recommendedVersion}`);
    if (entry.publisherId !== release.publisherId || entry.slug !== release.slug) throw new Error(`Catalogue identity differs from release: ${entry.elixirId}`);
    const cartridge = cartridges.find(({ release: value }) => releaseKey(value) === releaseKey(release));
    for (const field of ["title", "summary", "playerPromise", "energy", "movement", "requiredInputs"]) {
      if (JSON.stringify(entry[field]) !== JSON.stringify(cartridge.metadata[field])) throw new Error(`Catalogue ${field} differs from cartridge: ${entry.elixirId}`);
    }
    for (const [field, expectedFacet] of Object.entries(taxonomyFields)) {
      for (const id of valuesFor(entry, field)) {
        const value = taxonomyById.get(id);
        if (!value) throw new Error(`Unknown taxonomy ID ${id} in ${entry.elixirId}`);
        if (expectedFacet && value.facet !== expectedFacet) throw new Error(`Taxonomy facet mismatch for ${id} in ${entry.elixirId}`);
        if (value.lifecycle !== "active") throw new Error(`Deprecated taxonomy ID ${id} requires migration`);
      }
    }
    if (Boolean(cartridge.metadata.story) !== Boolean(entry.storyDiscovery)) {
      throw new Error(`Story discovery metadata presence differs from cartridge: ${entry.elixirId}`);
    }
    if (entry.catalogueArtwork && !artworkById.has(entry.catalogueArtwork.provenanceId)) {
      throw new Error(`Catalogue artwork provenance mismatch: ${entry.catalogueArtwork.provenanceId}`);
    }
    if (entry.storyDiscovery) {
      for (const [field, expectedFacet] of Object.entries(storyTaxonomyFields)) {
        for (const id of valuesFor(entry.storyDiscovery, field)) {
          const value = taxonomyById.get(id);
          if (!value) throw new Error(`Unknown Story taxonomy ID ${id} in ${entry.elixirId}`);
          if (value.facet !== expectedFacet) throw new Error(`Story taxonomy facet mismatch for ${id} in ${entry.elixirId}`);
          if (value.lifecycle !== "active") throw new Error(`Deprecated Story taxonomy ID ${id} requires migration`);
        }
      }
      const story = cartridge.metadata.story;
      const expectedInteractionIds = story.interactionModes.map((mode) => `interaction-${mode.replaceAll("_", "-")}`);
      if (JSON.stringify(entry.storyDiscovery.interactionModeIds) !== JSON.stringify(expectedInteractionIds)) {
        throw new Error(`Story interaction modes differ from cartridge: ${entry.elixirId}`);
      }
      if (entry.storyDiscovery.choicePresentationId !== `choice-${story.choicePresentation.replaceAll("_", "-")}` ||
          entry.storyDiscovery.emotionalIntensityId !== `emotion-${story.emotionalIntensity}` ||
          entry.storyDiscovery.readingIntensityId !== `reading-${story.readingIntensity}` ||
          entry.storyDiscovery.sessionShapeId !== `session-${story.sessionShape.replaceAll("_", "-")}`) {
        throw new Error(`Story discovery projection differs from cartridge: ${entry.elixirId}`);
      }
      if (JSON.stringify(entry.contentNoteIds) !== JSON.stringify(story.contentNotes)) {
        throw new Error(`Story content notes differ from cartridge: ${entry.elixirId}`);
      }
    }
    if (entry.successor && !releaseByKey.has(releaseKey(entry.successor))) throw new Error(`Unknown successor for ${entry.elixirId}`);
    if (["deprecated", "superseded"].includes(entry.lifecycle) && !entry.successor) throw new Error(`${entry.lifecycle} catalogue entry requires a successor: ${entry.elixirId}`);
    if (entry.lifecycle === "published" && entry.successor) throw new Error(`Published catalogue entry cannot declare a successor: ${entry.elixirId}`);
    assertUnique(entry.releaseStates.map(({ version }) => version), `Release lifecycle versions for ${entry.elixirId}`);
    const entryReleases = releases.filter(({ elixirId: id }) => id === entry.elixirId);
    if (entry.releaseStates.length !== entryReleases.length || entryReleases.some(({ version }) => !entry.releaseStates.some((state) => state.version === version))) throw new Error(`Release lifecycle must cover every version of ${entry.elixirId}`);
    for (const state of entry.releaseStates) {
      if (!releaseByKey.has(`${entry.elixirId}@${state.version}`)) throw new Error(`Release lifecycle references unknown version: ${entry.elixirId}@${state.version}`);
      if (state.successor && !releaseByKey.has(releaseKey(state.successor))) throw new Error(`Release lifecycle has unknown successor: ${entry.elixirId}@${state.version}`);
      if (["deprecated", "superseded"].includes(state.lifecycle) && !state.successor) throw new Error(`${state.lifecycle} release requires a successor: ${entry.elixirId}@${state.version}`);
      if (state.lifecycle === "published" && state.successor) throw new Error(`Published release cannot declare a successor: ${entry.elixirId}@${state.version}`);
    }
    const recommendedState = entry.releaseStates.find(({ version }) => version === entry.recommendedVersion);
    if (recommendedState.lifecycle !== entry.lifecycle || JSON.stringify(recommendedState.successor) !== JSON.stringify(entry.successor)) throw new Error(`Catalogue lifecycle must match the recommended release: ${entry.elixirId}@${entry.recommendedVersion}`);
  }

  const releaseStateByKey = new Map(catalogue.entries.flatMap((entry) => entry.releaseStates.map((state) => [`${entry.elixirId}@${state.version}`, state])));
  for (const entry of catalogue.entries) {
    for (const state of entry.releaseStates.filter(({ successor }) => successor)) {
      if (releaseKey(state.successor) === `${entry.elixirId}@${state.version}`) throw new Error(`Release lifecycle cannot succeed itself: ${entry.elixirId}@${state.version}`);
      if (releaseStateByKey.get(releaseKey(state.successor))?.lifecycle !== "published") throw new Error(`Release lifecycle successor must be a published release: ${entry.elixirId}@${state.version}`);
    }
  }

  for (const value of taxonomy) {
    if (value.replacementId && !taxonomyById.has(value.replacementId)) throw new Error(`Unknown taxonomy replacement: ${value.replacementId}`);
  }
  for (const collection of parsedCollections) {
    for (const id of collection.elixirIds) {
      const entry = entryById.get(id);
      if (!entry) throw new Error(`Collection ${collection.id} references unknown Elixir: ${id}`);
      if (entry.lifecycle === "withdrawn") throw new Error(`Collection ${collection.id} references withdrawn Elixir: ${id}`);
    }
  }
  for (const withdrawal of withdrawals) {
    const release = releaseByKey.get(releaseKey(withdrawal));
    if (!release) throw new Error(`Withdrawal references unknown release: ${releaseKey(withdrawal)}`);
    if (withdrawal.originalBytes !== release.bytes || withdrawal.originalSha256 !== release.sha256) throw new Error(`Withdrawal integrity differs from release: ${releaseKey(withdrawal)}`);
    if (withdrawal.successor && !releaseByKey.has(releaseKey(withdrawal.successor))) throw new Error(`Withdrawal has unknown successor: ${releaseKey(withdrawal)}`);
    const tombstoneHash = createHash("sha256").update(renderWithdrawalTombstone({ withdrawal, release })).digest("hex");
    if (tombstoneHash !== withdrawal.tombstoneSha256) throw new Error(`Withdrawal tombstone digest differs from deterministic output: ${releaseKey(withdrawal)}`);
    const state = entryById.get(withdrawal.elixirId)?.releaseStates.find(({ version }) => version === withdrawal.version);
    if (state?.lifecycle !== "withdrawn") throw new Error(`Withdrawal requires withdrawn release lifecycle: ${releaseKey(withdrawal)}`);
    if (JSON.stringify(state.successor) !== JSON.stringify(withdrawal.successor)) throw new Error(`Withdrawal successor must match release lifecycle: ${releaseKey(withdrawal)}`);
  }
  const withdrawnKeys = new Set(withdrawals.map(releaseKey));
  for (const entry of catalogue.entries) {
    for (const state of entry.releaseStates.filter(({ lifecycle }) => lifecycle === "withdrawn")) {
      if (!withdrawnKeys.has(`${entry.elixirId}@${state.version}`)) throw new Error(`Withdrawn release requires a withdrawal record: ${entry.elixirId}@${state.version}`);
    }
  }

  return Object.freeze({
    schemaVersion: catalogue.schemaVersion,
    deploymentRevision: catalogue.deploymentRevision,
    publishers: Object.freeze(publishers),
    releases: Object.freeze(releases),
    entries: Object.freeze([...catalogue.entries].sort((a, b) => a.editorialOrder - b.editorialOrder || a.title.localeCompare(b.title))),
    taxonomy: Object.freeze(taxonomy),
    collections: Object.freeze(parsedCollections.filter(({ lifecycle }) => lifecycle === "published").sort((a, b) => a.title.localeCompare(b.title))),
    withdrawals: Object.freeze(withdrawals),
    cartridges: Object.freeze(cartridges),
    artworkManifest: parsedArtworkManifest,
  });
};

export const loadCatalogue = ({ repositoryRoot = moduleRoot } = {}) => {
  const collectionDirectory = resolve(repositoryRoot, "content/catalogue/collections");
  const collectionFiles = readdirSync(collectionDirectory).filter((name) => name.endsWith(".json")).sort();
  return validateCatalogueRecords({
    repositoryRoot,
    publishersDocument: readJson(repositoryRoot, "content/catalogue/publishers.json"),
    releasesDocument: readJson(repositoryRoot, "content/catalogue/releases.json"),
    catalogueDocument: readJson(repositoryRoot, "content/catalogue/catalogue.json"),
    taxonomyDocument: readJson(repositoryRoot, "content/catalogue/taxonomy.json"),
    collections: collectionFiles.map((name) => readJson(repositoryRoot, `content/catalogue/collections/${name}`)),
    withdrawalsDocument: readJson(repositoryRoot, "content/catalogue/withdrawals.json"),
    artworkManifest: readJson(repositoryRoot, "site/elixirs/assets/cartridges/manifest.json"),
  });
};

export const compareReleaseLedgers = (baseDocument, candidateDocument) => {
  const base = releasesDocumentSchema.parse(baseDocument);
  const candidate = releasesDocumentSchema.parse(candidateDocument);
  if (candidate.releases.length < base.releases.length) throw new Error("Published release ledger entries cannot be deleted");
  for (let index = 0; index < base.releases.length; index += 1) {
    if (JSON.stringify(candidate.releases[index]) !== JSON.stringify(base.releases[index])) {
      throw new Error(`Published release ledger entry ${index} cannot be modified or reordered`);
    }
  }
  const candidateKeys = candidate.releases.map(releaseKey);
  assertUnique(candidateKeys, "Candidate release keys");
  assertUnique(candidate.releases.flatMap(({ canonicalPath, legacyPaths }) => [canonicalPath, ...legacyPaths]), "Candidate release paths");
  return Object.freeze({ retained: base.releases.length, appended: candidate.releases.length - base.releases.length });
};

export const compareWithdrawalLedgers = (baseDocument, candidateDocument) => {
  const base = withdrawalsDocumentSchema.parse(baseDocument);
  const candidate = withdrawalsDocumentSchema.parse(candidateDocument);
  if (candidate.withdrawals.length < base.withdrawals.length) throw new Error("Withdrawal ledger entries cannot be deleted");
  for (let index = 0; index < base.withdrawals.length; index += 1) {
    if (JSON.stringify(candidate.withdrawals[index]) !== JSON.stringify(base.withdrawals[index])) throw new Error(`Withdrawal ledger entry ${index} cannot be modified or reordered`);
  }
  assertUnique(candidate.withdrawals.map(releaseKey), "Candidate withdrawal keys");
  return Object.freeze({ retained: base.withdrawals.length, appended: candidate.withdrawals.length - base.withdrawals.length });
};

const normalizeSearch = (value) => value.toLocaleLowerCase("en").normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();

export const createPublicCatalogueIndex = (catalogue) => {
  const taxonomyById = new Map(catalogue.taxonomy.map((value) => [value.id, value]));
  const publisherById = new Map(catalogue.publishers.map((value) => [value.publisherId, value]));
  const releasesByKey = new Map(catalogue.releases.map((value) => [releaseKey(value), value]));
  return Object.freeze(publicCatalogueIndexSchema.parse({
    schemaVersion: catalogue.schemaVersion,
    deploymentRevision: catalogue.deploymentRevision,
    entries: catalogue.entries.filter(({ lifecycle }) => lifecycle !== "withdrawn").map((entry) => {
      const release = releasesByKey.get(`${entry.elixirId}@${entry.recommendedVersion}`);
      const cartridge = catalogue.cartridges.find(({ release: value }) => releaseKey(value) === releaseKey(release));
      const derivedTaxonomyIds = [
        `energy-${entry.energy}`,
        `movement-${entry.movement.replaceAll("_", "-")}`,
        ...(entry.requiredInputs.includes("hard_boundary") ? ["input-boundary"] : []),
        ...(entry.requiredInputs.includes("free_text_choice") ? ["input-free-choice"] : []),
      ];
      const publicTaxonomyIds = [...new Set([
        ...derivedTaxonomyIds,
        ...entry.categoryIds, ...entry.tagIds, ...entry.toneIds, entry.mechanicId,
        ...entry.activityIds, entry.replayabilityId, entry.durationBandId,
        ...entry.contentNoteIds, ...entry.accessConsiderationIds, ...entry.audienceIds, ...entry.localeIds,
        ...(entry.storyDiscovery ? Object.keys(storyTaxonomyFields).flatMap((field) => valuesFor(entry.storyDiscovery, field)) : []),
      ])];
      return Object.freeze({
        elixirId: entry.elixirId,
        slug: entry.slug,
        title: entry.title,
        summary: entry.summary,
        playerPromise: entry.playerPromise,
        publisher: publisherById.get(entry.publisherId).displayName,
        version: entry.recommendedVersion,
        status: release.statusAtPublication,
        lifecycle: entry.lifecycle,
        editorialOrder: entry.editorialOrder,
        duration: cartridge.metadata.estimatedMinutes,
        energy: entry.energy,
        movement: entry.movement,
        requiredInputs: entry.requiredInputs,
        gameplayCapability: cartridge.metadata.gameplayCapability,
        dataSummary: `The Guide receives ${cartridge.metadata.dataBehavior.guideReceives}; provider processing: ${cartridge.metadata.dataBehavior.providerProcessing.replaceAll("_", " ")}; memory: ${cartridge.metadata.dataBehavior.memory.replaceAll("_", " ")}; memento: ${cartridge.metadata.dataBehavior.mementoStorage.replaceAll("_", " ")}.`,
        compatibility: cartridge.metadata.compatibility.status,
        artwork: (() => {
          if (!entry.catalogueArtwork) return {
            path: cartridge.metadata.artwork.path,
            width: cartridge.metadata.artwork.width,
            height: cartridge.metadata.artwork.height,
            altText: cartridge.metadata.artwork.altText,
          };
          const asset = catalogue.artworkManifest.assets.find(({ id }) => id === entry.catalogueArtwork.provenanceId);
          return {
            path: asset.path,
            width: asset.dimensions.width,
            height: asset.dimensions.height,
            altText: entry.catalogueArtwork.altText,
          };
        })(),
        mechanicId: entry.mechanicId,
        interactionLabel: entry.interactionLabel,
        toneIds: entry.toneIds,
        taxonomyIds: publicTaxonomyIds,
        labels: publicTaxonomyIds.map((id) => taxonomyById.get(id).label),
        searchTerms: publicTaxonomyIds.flatMap((id) => [taxonomyById.get(id).label, ...taxonomyById.get(id).synonyms]),
        ...(cartridge.metadata.story ? {
          story: {
            playerRole: cartridge.metadata.story.playerRole,
            interactionModes: cartridge.metadata.story.interactionModes,
            choicePresentation: cartridge.metadata.story.choicePresentation,
            emotionalIntensity: cartridge.metadata.story.emotionalIntensity,
            readingIntensity: cartridge.metadata.story.readingIntensity,
            endingDescription: cartridge.metadata.story.endingProfile.description,
            replayLevel: cartridge.metadata.story.replayProfile.level,
            replayPromise: cartridge.metadata.story.replayProfile.promise,
            sessionShape: cartridge.metadata.story.sessionShape,
          },
        } : {}),
      });
    }),
  }));
};

const scoreSearchEntry = (entry, query) => {
  const normalized = normalizeSearch(query);
  if (!normalized) return 1;
  const title = normalizeSearch(entry.title);
  const queryTokens = normalized.split(" ");
  if (title === normalized) return 600;
  if (title.startsWith(normalized)) return 500;
  if (queryTokens.every((token) => title.split(" ").some((word) => word.startsWith(token)))) return 400;
  if (entry.searchTerms.some((term) => normalizeSearch(term).includes(normalized))) return 300;
  if (normalizeSearch(entry.publisher).includes(normalized)) return 200;
  const prose = normalizeSearch(`${entry.summary} ${entry.playerPromise}`);
  if (queryTokens.every((token) => prose.includes(token))) return 100;
  return 0;
};

export const searchCatalogue = (entries, query) => entries
  .map((entry) => ({ entry, score: scoreSearchEntry(entry, query) }))
  .filter(({ score }) => score > 0)
  .sort((left, right) => right.score - left.score || left.entry.editorialOrder - right.entry.editorialOrder || left.entry.title.localeCompare(right.entry.title))
  .map(({ entry }) => entry);

export const filterCatalogue = (entries, selectedByFacet) => entries.filter((entry) =>
  Object.values(selectedByFacet).every((selected) => selected.length === 0 || selected.some((id) => entry.taxonomyIds.includes(id))),
);

export const relatedCatalogueEntries = (entries, currentId, limit = 3) => {
  const current = entries.find(({ elixirId: id }) => id === currentId);
  if (!current) throw new Error(`Unknown related-item source: ${currentId}`);
  return entries
    .filter(({ elixirId: id, lifecycle }) => id !== currentId && lifecycle !== "withdrawn")
    .map((entry) => {
      const shared = entry.taxonomyIds.filter((id) => current.taxonomyIds.includes(id));
      const differentMechanic = entry.mechanicId !== current.mechanicId;
      const reasonIds = shared.filter((id) => id.startsWith("energy-") || id.startsWith("duration-") || id.startsWith("tone-") || id.startsWith("activity-"));
      return { entry, score: shared.length * 10 + (differentMechanic ? 5 : 0), reasonIds, differentMechanic };
    })
    .sort((left, right) => right.score - left.score || left.entry.editorialOrder - right.entry.editorialOrder || left.entry.title.localeCompare(right.entry.title))
    .slice(0, limit)
    .map(({ entry, reasonIds, differentMechanic }) => Object.freeze({ entry, reasonIds, differentMechanic }));
};

export const renderWithdrawalTombstone = ({ withdrawal, release }) => {
  if (releaseKey(withdrawal) !== releaseKey(release)) throw new Error("Withdrawal and release identity must match");
  const successorSlug = withdrawal.successor?.elixirId.split(".elixir.")[1];
  const destination = withdrawal.successor ? `elixirs/${successorSlug}/versions/${withdrawal.successor.version}/` : "";
  const navigationLabel = withdrawal.successor ? `Open safe successor ${withdrawal.successor.elixirId}@${withdrawal.successor.version}` : "Return to the Elixir catalogue";
  const relativeTarget = (publicPath) => `${"../".repeat(publicPath.split("/").length - 1)}${destination}`;
  const navigation = [
    `- [${navigationLabel} from the publisher-qualified path](${relativeTarget(release.canonicalPath)})`,
    ...release.legacyPaths.map((path, index) => `- [${navigationLabel} from permanent legacy path ${index + 1}](${relativeTarget(path)})`),
  ].join("\n");
  return `# Withdrawn Elixir cartridge\n\nElixir ID: ${release.elixirId}\nVersion: ${release.version}\nWithdrawn: ${withdrawal.withdrawnAt}\nReason: ${withdrawal.reason}\nExplanation: ${withdrawal.publicExplanation}\nOriginal SHA-256: ${release.sha256}\n\nThis cartridge is no longer distributed by The Guide. Do not guess, reconstruct, or treat this notice as gameplay instructions.\n\nUse the link matching the cartridge path you opened:\n\n${navigation}\n`;
};

export const deriveExpectedArtifactPaths = (catalogue) => {
  const paths = new Set([
    ".nojekyll",
    "assets/cartridges/manifest.json",
    "browse/index.html",
    "cabinet.js",
    "catalogue-index.json",
    "catalogue.js",
    "delivery-events.js",
    "index.html",
    "styles.css",
    "terms.md",
    "skills/agent-elixir-0.1.0.zip",
  ]);
  for (const asset of catalogue.artworkManifest.assets) paths.add(asset.path);
  for (const release of catalogue.releases) {
    paths.add(release.canonicalPath);
    for (const legacyPath of release.legacyPaths) paths.add(legacyPath);
    paths.add(`elixirs/${release.slug}/versions/${release.version}/index.html`);
  }
  for (const entry of catalogue.entries.filter(({ lifecycle }) => lifecycle !== "withdrawn")) paths.add(`elixirs/${entry.slug}/index.html`);
  for (const collection of catalogue.collections) paths.add(`collections/${collection.id}/index.html`);
  for (const release of catalogue.releases) {
    release.reviewReferences.forEach((_, index) => paths.add(`evidence/${release.publisherId}/${release.slug}/${release.version}/review-${index + 1}.md`));
    release.compatibilityReferences.forEach((_, index) => paths.add(`evidence/${release.publisherId}/${release.slug}/${release.version}/compatibility-${index + 1}.md`));
  }
  const publicEntryCount = catalogue.entries.filter(({ lifecycle }) => lifecycle !== "withdrawn").length;
  for (let page = 2; page <= Math.ceil(publicEntryCount / 24); page += 1) paths.add(`browse/page-${page}/index.html`);
  return [...paths].sort();
};
