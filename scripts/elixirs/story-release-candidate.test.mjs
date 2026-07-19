import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { validateStoryReleaseCandidate } from "./story-release-candidate.mjs";

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const inputs = () => ({
  candidateDocument: readJson("content/catalogue/candidates/regency-ball-release.json"),
  catalogueCandidateDocument: readJson("content/catalogue/candidates/regency-ball-entry.json"),
  releasesDocument: readJson("content/catalogue/releases.json"),
  collections: ["start-here", "three-ways-to-play", "low-energy"].map((id) => {
    const collection = readJson(`content/catalogue/collections/${id}.json`);
    if (id === "start-here") {
      collection.elixirIds = collection.elixirIds.filter(
        (elixirId) => elixirId !== "the-guide.elixir.regency-ball",
      );
      collection.elixirIds.push("the-guide.elixir.story");
    }
    if (id === "three-ways-to-play") {
      collection.elixirIds = collection.elixirIds.map((elixirId) =>
        elixirId === "the-guide.elixir.regency-ball" ? "the-guide.elixir.story" : elixirId);
    }
    return collection;
  }),
  repositoryRoot: root,
});

describe("authored Story release preparation", () => {
  it("binds exact candidate bytes while remaining explicitly non-publishable", () => {
    const candidate = validateStoryReleaseCandidate(inputs());
    expect(candidate.state).toBe("prepared_not_publishable");
    expect(candidate.release).not.toHaveProperty("sourceRevision");
    expect(candidate.release).not.toHaveProperty("publishedAt");
    expect(candidate.activationRequirements).toContain("publication_explicitly_authorized");
    expect(inputs().catalogueCandidateDocument.state).toBe("pending_owner_review");
  });

  it("retains the immutable generic Story and defines one exact successor", () => {
    const candidate = validateStoryReleaseCandidate(inputs());
    expect(candidate.supersession.predecessor).toMatchObject({
      elixirId: "the-guide.elixir.story",
      version: "0.1.0",
      bytes: 8108,
      sha256: "48f4cb4f2b9cbca8c4ce04ba844b12cfb28a6a2e5398cb211ad827e04d6874d9",
      nextLifecycle: "superseded",
    });
    expect(candidate.supersession.successor).toEqual({
      elixirId: "the-guide.elixir.regency-ball",
      version: "0.1.0",
    });
  });

  it("allows a new Story identity without inventing a predecessor transition", () => {
    const additive = inputs();
    additive.candidateDocument.supersession = null;
    expect(validateStoryReleaseCandidate(additive).supersession).toBeNull();
  });

  it("fails closed on source, predecessor, successor, and collection drift", () => {
    const sourceDrift = inputs();
    sourceDrift.candidateDocument.release.sha256 = "0".repeat(64);
    expect(() => validateStoryReleaseCandidate(sourceDrift)).toThrow(/source bytes or digest drifted/);

    const predecessorDrift = inputs();
    predecessorDrift.candidateDocument.supersession.predecessor.sha256 = "0".repeat(64);
    expect(() => validateStoryReleaseCandidate(predecessorDrift)).toThrow(/immutable bytes and digest/);

    const successorDrift = inputs();
    successorDrift.candidateDocument.supersession.successor.version = "0.2.0";
    expect(() => validateStoryReleaseCandidate(successorDrift)).toThrow(/successor/);

    const collectionDrift = inputs();
    collectionDrift.candidateDocument.supersession.collectionReplacements[0].replaceElixirId =
      "the-guide.elixir.regency-ball";
    expect(() => validateStoryReleaseCandidate(collectionDrift)).toThrow(/not anchored/);

    const artworkDrift = inputs();
    artworkDrift.candidateDocument.release.artwork.push({
      ...artworkDrift.candidateDocument.release.artwork[0],
      provenanceId: "art-bogus",
    });
    expect(() => validateStoryReleaseCandidate(artworkDrift)).toThrow();

    const artworkBytesDrift = inputs();
    artworkBytesDrift.candidateDocument.release.artwork[0].bytes += 1;
    expect(() => validateStoryReleaseCandidate(artworkBytesDrift)).toThrow(/artwork bytes or digest/);

    const gateDrift = inputs();
    gateDrift.candidateDocument.activationRequirements[0] =
      gateDrift.candidateDocument.activationRequirements[1];
    expect(() => validateStoryReleaseCandidate(gateDrift)).toThrow(/must be unique/);
  });
});
