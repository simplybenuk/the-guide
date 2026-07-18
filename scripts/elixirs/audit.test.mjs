import { appendFileSync, copyFileSync, mkdtempSync, rmSync, symlinkSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { auditElixirArtifact } from "./audit.mjs";
import { buildElixirSite } from "./build.mjs";

const temporaryRoots = [];
const buildTemporaryArtifact = () => {
  const temporaryRoot = mkdtempSync(join(tmpdir(), "guide-elixirs-audit-"));
  temporaryRoots.push(temporaryRoot);
  const artifactDirectory = resolve(temporaryRoot, "artifact");
  buildElixirSite({ outputDirectory: artifactDirectory });
  return artifactDirectory;
};

afterEach(() => {
  for (const path of temporaryRoots.splice(0)) rmSync(path, { recursive: true, force: true });
});

describe("Elixir Pages artifact audit", () => {
  it("accepts the exact deterministic static artifact", () => {
    const result = auditElixirArtifact({ artifactDirectory: buildTemporaryArtifact() });
    expect(result.fileCount).toBe(14);
    expect(result.totalBytes).toBeGreaterThan(100_000);
    expect(Object.keys(result.hashes)).toHaveLength(14);
  });

  it("rejects unexpected or missing files", () => {
    const unexpected = buildTemporaryArtifact();
    copyFileSync(resolve(unexpected, "index.html"), resolve(unexpected, "surprise.html"));
    expect(() => auditElixirArtifact({ artifactDirectory: unexpected })).toThrow(
      /Unexpected: surprise\.html/,
    );

    const missing = buildTemporaryArtifact();
    unlinkSync(resolve(missing, ".nojekyll"));
    expect(() => auditElixirArtifact({ artifactDirectory: missing })).toThrow(
      /Missing: \.nojekyll/,
    );
  });

  it("rejects links and server, secret, persistence, or environment markers", () => {
    const linked = buildTemporaryArtifact();
    symlinkSync(resolve(linked, "index.html"), resolve(linked, "linked.html"));
    expect(() => auditElixirArtifact({ artifactDirectory: linked })).toThrow(/symbolic link/);

    for (const marker of ["/_next/server.js", "/api/health", "process.env.SECRET", "localStorage"]) {
      const contaminated = buildTemporaryArtifact();
      appendFileSync(resolve(contaminated, "cabinet.js"), `\n// ${marker}\n`);
      expect(() => auditElixirArtifact({ artifactDirectory: contaminated })).toThrow(/forbidden/);
    }
  });

  it("rejects representative embedded credentials from public files", () => {
    const credentialFixtures = [
      ["ghp_", "A".repeat(36)].join(""),
      ["github_pat_", "B".repeat(82)].join(""),
      ["sk-proj-", "c".repeat(32)].join(""),
      ["AKIA", "D".repeat(16)].join(""),
      ["AIza", "e".repeat(35)].join(""),
      ["xoxb-", "1".repeat(12), "-", "f".repeat(24)].join(""),
      ["Authorization: Bearer ", "g".repeat(32)].join(""),
      ["client_secret = \"", "h".repeat(24), "\""].join(""),
    ];

    for (const credential of credentialFixtures) {
      const contaminated = buildTemporaryArtifact();
      appendFileSync(resolve(contaminated, "cabinet.js"), `\n${credential}\n`);
      expect(() => auditElixirArtifact({ artifactDirectory: contaminated })).toThrow(/forbidden/);
    }
  });

  it("rejects cartridge bytes that differ from the canonical version", () => {
    const artifactDirectory = buildTemporaryArtifact();
    appendFileSync(
      resolve(artifactDirectory, "cartridges/signal/0.1.0/elixir.md"),
      "\nchanged\n",
    );
    expect(() => auditElixirArtifact({ artifactDirectory })).toThrow(/differs from canonical bytes/);
  });
});
