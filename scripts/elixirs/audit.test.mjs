import { appendFileSync, copyFileSync, mkdtempSync, rmSync, symlinkSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { auditElixirArtifact } from "./audit.mjs";
import { buildElixirSite } from "./build.mjs";

const temporaryRoots = [];
const sourceRevision = "1234567890abcdef1234567890abcdef12345678";
const buildTemporaryArtifact = () => {
  const temporaryRoot = mkdtempSync(join(tmpdir(), "guide-elixirs-audit-"));
  temporaryRoots.push(temporaryRoot);
  const artifactDirectory = resolve(temporaryRoot, "artifact");
  buildElixirSite({ outputDirectory: artifactDirectory, sourceRevision });
  return artifactDirectory;
};

afterEach(() => {
  for (const path of temporaryRoots.splice(0)) rmSync(path, { recursive: true, force: true });
});

describe("Elixir Pages artifact audit", () => {
  it("accepts the exact deterministic static artifact", () => {
    const result = auditElixirArtifact({ artifactDirectory: buildTemporaryArtifact() });
    expect(result.fileCount).toBe(42);
    expect(result.totalBytes).toBeGreaterThan(100_000);
    expect(Object.keys(result.hashes)).toHaveLength(42);
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

    for (const marker of [
      "/_next/server.js",
      "/api/health",
      "process.env.SECRET",
      "localStorage",
      "sessionStorage",
      "navigator.sendBeacon('/events')",
      "fetch('/events')",
      "new WebSocket('wss://collector.example')",
      "new EventSource('/stream')",
      "new Image().src = '/pixel'",
      "document.createElement('script')",
      "document.cookie = 'id=123'",
      "console.log('delivery event')",
      "npx untrusted-package",
      "https://plausible.io/js/script.js",
    ]) {
      const contaminated = buildTemporaryArtifact();
      appendFileSync(resolve(contaminated, "cabinet.js"), `\n// ${marker}\n`);
      expect(() => auditElixirArtifact({ artifactDirectory: contaminated })).toThrow(/forbidden/);
    }
  });

  it("rejects unapproved origins, remote resources, and collector paths", () => {
    for (const marker of [
      '<script src="https://example.com/sdk.js"></script>',
      '<img src="https://example.com/pixel.gif">',
      '<form action="/collect/events"></form>',
      'body { background: url("https://example.com/pixel.gif"); }',
      '<meta http-equiv="refresh" content="0;url=https://example.com">',
    ]) {
      const contaminated = buildTemporaryArtifact();
      appendFileSync(resolve(contaminated, "index.html"), `\n${marker}\n`);
      expect(() => auditElixirArtifact({ artifactDirectory: contaminated })).toThrow(/forbidden|unexpected remote origin/);
    }
  });

  it("rejects mutable or non-first-party GitHub source URLs", () => {
    for (const marker of [
      "https://raw.githubusercontent.com/simplybenuk/the-guide/main/content/elixirs/story.md",
      `https://raw.githubusercontent.com/other/the-guide/${sourceRevision}/content/elixirs/story.md`,
      `https://github.com/simplybenuk/the-guide/blob/${sourceRevision}/content/elixirs/other.md`,
    ]) {
      const contaminated = buildTemporaryArtifact();
      appendFileSync(resolve(contaminated, "index.html"), `\n${marker}\n`);
      expect(() => auditElixirArtifact({ artifactDirectory: contaminated })).toThrow(/unexpected remote origin/);
    }
  });

  it("rejects allowed source URLs when used as active remote resources", () => {
    const pinned = `https://raw.githubusercontent.com/simplybenuk/the-guide/${sourceRevision}/content/elixirs/story.md`;
    for (const marker of [
      `<script src="${pinned}"></script>`,
      `<img src="${pinned}">`,
      `<img srcset="${pinned} 1x">`,
      `<object data="${pinned}"></object>`,
      `<embed src="${pinned}">`,
      `<video poster="${pinned}"></video>`,
      `<link rel="stylesheet" href="${pinned}">`,
      `<form action="${pinned}"></form>`,
      `<base href="${pinned}">`,
    ]) {
      const contaminated = buildTemporaryArtifact();
      appendFileSync(resolve(contaminated, "index.html"), `\n${marker}\n`);
      expect(() => auditElixirArtifact({ artifactDirectory: contaminated })).toThrow(/forbidden remote/);
    }
  });

  it("allows pinned source literals only inside the experimental resolver textarea", () => {
    const pinned = `https://raw.githubusercontent.com/simplybenuk/the-guide/${sourceRevision}/content/elixirs/story.md`;
    for (const marker of [
      `<p>${pinned}</p>`,
      `<a href="${pinned}">source</a>`,
      `<textarea>${pinned}</textarea>`,
      `<textarea data-resolver-prompt-extra>${pinned}</textarea>`,
      `<textarea title="data-resolver-prompt">${pinned}</textarea>`,
      `<script type="application/json">{"source":"${pinned}"}</script>`,
    ]) {
      const contaminated = buildTemporaryArtifact();
      appendFileSync(resolve(contaminated, "index.html"), `\n${marker}\n`);
      expect(() => auditElixirArtifact({ artifactDirectory: contaminated })).toThrow(/unexpected remote origin/);
    }
  });

  it("allows the GitHub privacy URL only as an ordinary user-followed anchor", () => {
    const privacy = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";
    for (const marker of [
      `<p>${privacy}</p>`,
      `<script type="module">import "${privacy}"</script>`,
      `<textarea>${privacy}</textarea>`,
      `<a href="${privacy}" ping="${privacy}">privacy</a>`,
    ]) {
      const contaminated = buildTemporaryArtifact();
      appendFileSync(resolve(contaminated, "index.html"), `\n${marker}\n`);
      expect(() => auditElixirArtifact({ artifactDirectory: contaminated })).toThrow(/unexpected remote origin/);
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

  it("rejects namespaced cartridge divergence and catalogue projection tampering", () => {
    const namespaced = buildTemporaryArtifact();
    appendFileSync(resolve(namespaced, "cartridges/the-guide/story/0.1.0/elixir.md"), "\nchanged\n");
    expect(() => auditElixirArtifact({ artifactDirectory: namespaced })).toThrow(/differs from canonical bytes/);

    const catalogue = buildTemporaryArtifact();
    appendFileSync(resolve(catalogue, "catalogue-index.json"), " ");
    expect(() => auditElixirArtifact({ artifactDirectory: catalogue })).toThrow(/differs from validated projection/);
  });
});
