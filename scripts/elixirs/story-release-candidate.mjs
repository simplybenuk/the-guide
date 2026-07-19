import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { z } from "zod";

import { catalogueEntrySchema, releaseSchema } from "./catalogue.mjs";
import { parseCartridgeMetadata } from "./cartridge.mjs";

const sha256 = z.string().regex(/^[0-9a-f]{64}$/);
const identity = z.object({
  elixirId: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
}).strict();
const candidateReleaseSchema = z.object({
  elixirId: z.string().min(1),
  publisherId: z.string().min(1),
  slug: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  cartridgeSchemaVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
  covenantVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
  sourcePath: z.string().min(1),
  bytes: z.number().int().positive(),
  sha256,
  canonicalPath: z.string().min(1),
  legacyPaths: z.array(z.string().min(1)),
  artwork: z.array(z.object({
    provenanceId: z.string().min(1),
    path: z.string().min(1),
    bytes: z.number().int().positive(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    provenanceReference: z.string().min(1),
    sha256,
  }).strict()).length(1),
  rightsReference: z.string().min(1),
  reviewReferences: z.array(z.string().min(1)).min(1),
  compatibilityReferences: z.array(z.string().min(1)).min(1),
  statusAtPublication: z.enum(["experimental", "stable"]),
}).strict();

export const storyCatalogueCandidateSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  state: z.literal("pending_owner_review"),
  preparedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  intendedLifecycle: z.literal("published"),
  entry: catalogueEntrySchema.omit({ lifecycle: true, review: true }),
}).strict();

export const storyReleaseCandidateSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  state: z.literal("prepared_not_publishable"),
  preparedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  release: candidateReleaseSchema,
  supersession: z.object({
    predecessor: identity.extend({
      bytes: z.number().int().positive(),
      sha256,
      nextLifecycle: z.literal("superseded"),
      successor: identity,
    }).strict(),
    successor: identity,
    collectionReplacements: z.array(z.object({
      collectionId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      replaceElixirId: z.string().min(1),
    }).strict()).min(1),
  }).strict().nullable(),
  activationRequirements: z.array(z.enum([
    "independent_review_passed",
    "reviewed_commit_revision_bound",
    "live_harness_evidence_recorded",
    "publication_explicitly_authorized",
  ])).length(4).refine((values) => new Set(values).size === values.length,
    "Activation requirements must be unique"),
}).strict();

const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const releaseKey = ({ elixirId, version }) => `${elixirId}@${version}`;

export const validateStoryReleaseCandidate = ({
  candidateDocument,
  catalogueCandidateDocument,
  releasesDocument,
  collections,
  repositoryRoot = process.cwd(),
}) => {
  const candidate = storyReleaseCandidateSchema.parse(candidateDocument);
  const catalogueCandidate = storyCatalogueCandidateSchema.parse(catalogueCandidateDocument);
  const entry = catalogueCandidate.entry;
  releaseSchema.parse({
    ...candidate.release,
    artwork: candidate.release.artwork.map(({ provenanceId, sha256: artworkSha256 }) => ({
      provenanceId,
      sha256: artworkSha256,
    })),
    sourceRevision: "0".repeat(40),
    publishedAt: candidate.preparedAt,
  });
  const source = readFileSync(resolve(repositoryRoot, candidate.release.sourcePath));
  const cartridgeMetadata = parseCartridgeMetadata(source.toString("utf8"));
  const artworkRecord = candidate.release.artwork[0];
  const artwork = readFileSync(resolve(repositoryRoot, artworkRecord.path));
  const provenance = readFileSync(resolve(repositoryRoot, artworkRecord.provenanceReference), "utf8");
  if (releaseKey(candidate.release) !== releaseKey({
    elixirId: entry.elixirId,
    version: entry.recommendedVersion,
  })) {
    throw new Error("Release candidate and catalogue candidate identities differ");
  }
  if (candidate.supersession) {
    const predecessor = releasesDocument.releases.find(
      (release) => releaseKey(release) === releaseKey(candidate.supersession.predecessor),
    );
    if (!predecessor) throw new Error("Supersession predecessor is absent from the immutable release ledger");
    if (predecessor.bytes !== candidate.supersession.predecessor.bytes
        || predecessor.sha256 !== candidate.supersession.predecessor.sha256) {
      throw new Error("Supersession predecessor does not retain its immutable bytes and digest");
    }
    if (releaseKey(candidate.release) !== releaseKey(candidate.supersession.successor)
        || releaseKey(candidate.release) !== releaseKey(candidate.supersession.predecessor.successor)) {
      throw new Error("Supersession successor does not identify the prepared release exactly");
    }
  }
  if (source.byteLength !== candidate.release.bytes || digest(source) !== candidate.release.sha256) {
    throw new Error("Release candidate source bytes or digest drifted");
  }
  if (artwork.byteLength !== artworkRecord.bytes || digest(artwork) !== artworkRecord.sha256) {
    throw new Error("Release candidate artwork bytes or digest drifted");
  }
  const pngWidth = artwork.readUInt32BE(16);
  const pngHeight = artwork.readUInt32BE(20);
  const expectedArtworkPath = `site/elixirs/${cartridgeMetadata.artwork.path}`;
  if (artworkRecord.provenanceId !== cartridgeMetadata.artwork.provenanceId
      || artworkRecord.path !== expectedArtworkPath
      || artworkRecord.width !== cartridgeMetadata.artwork.width
      || artworkRecord.height !== cartridgeMetadata.artwork.height
      || pngWidth !== artworkRecord.width || pngHeight !== artworkRecord.height) {
    throw new Error("Release candidate artwork identity or dimensions drifted");
  }
  for (const value of [artworkRecord.path, String(artworkRecord.bytes), String(artworkRecord.width),
    String(artworkRecord.height), artworkRecord.sha256]) {
    if (!provenance.includes(value)) throw new Error("Release candidate artwork provenance is incomplete");
  }
  for (const replacement of candidate.supersession?.collectionReplacements ?? []) {
    const collection = collections.find(({ id }) => id === replacement.collectionId);
    if (!collection?.elixirIds.includes(replacement.replaceElixirId)) {
      throw new Error(`Collection replacement is not anchored: ${replacement.collectionId}`);
    }
  }

  return candidate;
};
