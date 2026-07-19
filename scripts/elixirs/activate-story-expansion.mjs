import { execFileSync } from "node:child_process";
import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildStoryExpansionCandidateCatalogue } from "./story-expansion.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const sourceRevision = process.argv.find((value) => value.startsWith("--source-revision="))?.split("=")[1];
if (!/^[0-9a-f]{40}$/.test(sourceRevision ?? "")) throw new Error("Activation requires --source-revision=<40-character commit SHA>");
const resolved = execFileSync("git", ["rev-parse", "--verify", `${sourceRevision}^{commit}`], { cwd: root, encoding: "utf8" }).trim();
if (resolved !== sourceRevision) throw new Error("Source revision must resolve exactly");

const candidate = buildStoryExpansionCandidateCatalogue();
const writeJson = (path, value) => {
  const target = resolve(root, path);
  const temporary = `${target}.tmp`;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temporary, target);
};

const releases = candidate.releases.map((release) => release.sourceRevision === "0".repeat(40) ? {
  ...release,
  sourceRevision,
  reviewReferences: [...new Set([...release.reviewReferences, "docs/evaluations/story-expansion-agent-review.md"])],
} : release);

writeJson("content/catalogue/catalogue.json", {
  schemaVersion: candidate.schemaVersion,
  deploymentRevision: "story-expansion-2026-07-19",
  entries: candidate.entries,
});
writeJson("content/catalogue/releases.json", { schemaVersion: candidate.schemaVersion, releases });
for (const collection of candidate.collections) writeJson(`content/catalogue/collections/${collection.id}.json`, collection);
writeJson("site/elixirs/assets/cartridges/manifest.json", candidate.artworkManifest);

process.stdout.write(`Activated ${candidate.entries.filter(({ lifecycle }) => lifecycle === "published").length} published and ${candidate.entries.filter(({ lifecycle }) => lifecycle === "retired").length} retired catalogue entries at ${sourceRevision}.\n`);
