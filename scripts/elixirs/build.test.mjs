import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildElixirSite } from "./build.mjs";
import { loadCatalogue } from "./catalogue.mjs";

const repositoryRoot = process.cwd();
const outputDirectory = mkdtempSync(join(tmpdir(), "guide-elixirs-build-"));
const sourceRevision = "1234567890abcdef1234567890abcdef12345678";

const listFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : [relative(outputDirectory, path)];
    })
    .sort();

const readOutput = (path) => readFileSync(resolve(outputDirectory, path), "utf8");
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");

describe("static Elixir cabinet build", () => {
  beforeAll(() => buildElixirSite({ outputDirectory, sourceRevision }));
  afterAll(() => rmSync(outputDirectory, { recursive: true, force: true }));

  it("emits only the expected framework-free static tree", () => {
    expect(listFiles(outputDirectory)).toEqual([
      ".nojekyll",
      "assets/cartridges/manifest.json",
      "assets/cartridges/mystery.png",
      "assets/cartridges/signal.png",
      "assets/cartridges/story.png",
      "browse/index.html",
      "cabinet.js",
      "cartridges/mystery/0.1.0/elixir.md",
      "cartridges/signal/0.1.0/elixir.md",
      "cartridges/story/0.1.0/elixir.md",
      "cartridges/the-guide/mystery/0.1.0/elixir.md",
      "cartridges/the-guide/signal/0.1.0/elixir.md",
      "cartridges/the-guide/story/0.1.0/elixir.md",
      "catalogue-index.json",
      "catalogue.js",
      "collections/low-energy/index.html",
      "collections/start-here/index.html",
      "collections/three-ways-to-play/index.html",
      "delivery-events.js",
      "elixirs/mystery/index.html",
      "elixirs/mystery/versions/0.1.0/index.html",
      "elixirs/signal/index.html",
      "elixirs/signal/versions/0.1.0/index.html",
      "elixirs/story/index.html",
      "elixirs/story/versions/0.1.0/index.html",
      "evidence/the-guide/mystery/0.1.0/compatibility-1.md",
      "evidence/the-guide/mystery/0.1.0/review-1.md",
      "evidence/the-guide/signal/0.1.0/compatibility-1.md",
      "evidence/the-guide/signal/0.1.0/review-1.md",
      "evidence/the-guide/story/0.1.0/compatibility-1.md",
      "evidence/the-guide/story/0.1.0/review-1.md",
      "index.html",
      "styles.css",
      "terms.md",
    ]);

    const artifactText = listFiles(outputDirectory)
      .filter((path) => /\.(?:html|css|js|json|md)$/.test(path))
      .map(readOutput)
      .join("\n");
    expect(artifactText).not.toMatch(/\/_next|\/api\/(?:health|expedition)|localStorage|sessionStorage|GUIDE_PROVIDER_/);
    expect(artifactText).not.toMatch(/sendBeacon|XMLHttpRequest|\bfetch\s*\(|console\.(?:log|info|debug|table)\s*\(/);
    expect(artifactText).not.toContain("react");
  });

  it("derives source, download, and copy content from identical cartridge bytes", () => {
    for (const slug of ["signal", "mystery", "story"]) {
      const canonical = readFileSync(resolve(repositoryRoot, `content/elixirs/${slug}.md`));
      const emitted = readFileSync(
        resolve(outputDirectory, `cartridges/${slug}/0.1.0/elixir.md`),
      );
      const namespaced = readFileSync(
        resolve(outputDirectory, `cartridges/the-guide/${slug}/0.1.0/elixir.md`),
      );
      const detail = readOutput(`elixirs/${slug}/index.html`);

      expect(emitted.equals(canonical)).toBe(true);
      expect(namespaced.equals(canonical)).toBe(true);
      expect(detail).toContain(`../../cartridges/${slug}/0.1.0/elixir.md`);
      expect(detail).toContain("data-cartridge-source");
      expect(detail).toContain("View exactly what it says");
      expect(detail).toContain('href="../../terms.md"');
      expect(detail).toContain("Start this Elixir in ChatGPT");
      expect(detail).toContain("Copy for ChatGPT");
      expect(detail).toContain("Download Markdown");
    }
  });

  it("emits a metadata-only public index, collections, and immutable version records", () => {
    const index = JSON.parse(readOutput("catalogue-index.json"));
    expect(index.schemaVersion).toBe("1.0.0");
    expect(index.deploymentRevision).toBe("catalogue-v1");
    expect(index.entries).toHaveLength(3);
    expect(JSON.stringify(index)).not.toMatch(/sourcePath|reviewReferences|compatibilityReferences|cartridge source|transcript/i);
    expect(readOutput("collections/start-here/index.html")).toContain("Three distinct ways");
    expect(readOutput("elixirs/signal/versions/0.1.0/index.html")).toContain(
      "1c371b5813f6d93f37cabe486337f2680928f3e2ae5c19d4e86d40328f597cbb",
    );
    expect(readOutput("elixirs/signal/index.html")).toContain('href="../../evidence/the-guide/signal/0.1.0/review-1.md"');
    expect(readOutput("elixirs/signal/index.html")).toContain('href="../../evidence/the-guide/signal/0.1.0/compatibility-1.md"');
    expect(readOutput("evidence/the-guide/signal/0.1.0/compatibility-1.md")).toContain("Elixir cross-harness evaluation matrix");
    expect(readOutput("index.html")).not.toContain("data-catalogue-search");
    expect(readOutput("index.html")).toContain("data-spotlight");
    expect(readOutput("browse/index.html")).toContain("data-catalogue-search");
    expect(readOutput("browse/index.html")).toContain('type="application/json"');
    expect(readOutput("catalogue.js")).not.toMatch(/fetch\s*\(|localStorage|sessionStorage|indexedDB/);
  });

  it("copies artwork without alteration and keeps discovery cards compact", () => {
    const manifest = JSON.parse(readOutput("assets/cartridges/manifest.json"));
    const index = readOutput("index.html");
    const browse = readOutput("browse/index.html");
    const detail = readOutput("elixirs/signal/index.html");

    expect((index.match(/data-spotlight/g) ?? [])).toHaveLength(1);
    expect((index.match(/data-shelf(?:\s|>)/g) ?? [])).toHaveLength(3);
    expect((index.match(/<article class="elixir-card/g) ?? [])).toHaveLength(9);
    expect((browse.match(/<article class="elixir-card/g) ?? [])).toHaveLength(3);
    expect(index).not.toContain("<dt>");
    expect(browse).not.toContain("<dt>");
    expect((browse.match(/<ul class="fit-signals"/g) ?? [])).toHaveLength(3);
    expect(detail).toContain("Before you play");
    expect(detail).toContain("The Guide receives");
    expect(detail).toContain("Publisher, review, and provenance");
    expect(index).toContain("The game happens in the agent harness you choose");
    expect(index).toContain("does not receive your game conversation");
    expect(index).toContain('href="terms.md"');
    expect(readOutput("terms.md")).toContain("personal, non-commercial alpha testing");
    expect(index).not.toMatch(/href="\/|src="\//);

    for (const asset of manifest.assets) {
      const source = readFileSync(resolve(repositoryRoot, "site/elixirs", asset.path));
      const emitted = readFileSync(resolve(outputDirectory, asset.path));
      expect(hash(emitted)).toBe(hash(source));
      expect(index).toContain(`src="./${asset.path}"`);
    }
  });

  it("keeps every generated internal URL relative for root and subpath hosting", () => {
    for (const path of listFiles(outputDirectory).filter((file) => file.endsWith(".html"))) {
      const html = readOutput(path);
      expect(html).not.toMatch(/(?:href|src)="\/(?!\/)/);
      expect(html).not.toContain("file://");
      expect(html).not.toContain("localhost");
    }
  });

  it("emits complete self-contained and pinned resolver prompts with progressive copy controls", () => {
    for (const slug of ["signal", "mystery", "story"]) {
      const detail = readOutput(`elixirs/${slug}/index.html`);
      const canonical = readFileSync(resolve(repositoryRoot, `content/elixirs/${slug}.md`), "utf8");
      const digest = createHash("sha256").update(canonical).digest("hex");
      expect(detail).toContain("Delivery envelope: the-guide-elixir/1");
      expect(detail).toContain(`UTF-8 bytes: ${Buffer.byteLength(canonical, "utf8")}`);
      expect(detail).toContain(`SHA-256: ${digest}`);
      expect(detail).toContain("&lt;&lt;&lt; BEGIN THE GUIDE ELIXIR CARTRIDGE &gt;&gt;&gt;");
      expect(detail).toContain("&lt;&lt;&lt; END THE GUIDE ELIXIR CARTRIDGE &gt;&gt;&gt;");
      expect(detail).toContain(`Published cartridge: ../../cartridges/${slug}/0.1.0/elixir.md`);
      expect(detail).toContain(
        `https://raw.githubusercontent.com/simplybenuk/the-guide/${sourceRevision}/content/elixirs/${slug}.md`,
      );
      expect(detail).toContain(
        `https://github.com/simplybenuk/the-guide/blob/${sourceRevision}/content/elixirs/${slug}.md`,
      );
      expect(detail).not.toMatch(/\/main\/|\bnpx\b/);
      expect(detail).toContain("select and copy the complete prompt above");
      expect(detail.match(/data-copy-action[^>]+hidden/g)).toHaveLength(3);
    }
  });

  it("emits a deterministic local-only delivery event runtime", () => {
    const runtime = readOutput("delivery-events.js");
    expect(runtime).toContain("the-guide:delivery-event");
    expect(runtime).toContain("cabinet-delivery-v1");
    expect(runtime).toContain("the-guide.elixir.signal@0.1.0");
    expect(runtime).toContain("the-guide.elixir.mystery@0.1.0");
    expect(runtime).toContain("the-guide.elixir.story@0.1.0");
    expect(runtime).not.toMatch(/sendBeacon|XMLHttpRequest|\bfetch\s*\(|localStorage|sessionStorage|indexedDB/);
  });

  it("rejects raw asset paths that attempt to escape source or artifact roots", () => {
    const malicious = structuredClone(loadCatalogue());
    malicious.artworkManifest.assets[0].path = "../../../../outside.png";
    const maliciousOutput = mkdtempSync(join(tmpdir(), "guide-malicious-build-"));
    try {
      expect(() => buildElixirSite({ outputDirectory: maliciousOutput, sourceRevision, catalogue: malicious })).toThrow(/escapes its approved root/);
    } finally {
      rmSync(maliciousOutput, { recursive: true, force: true });
    }
  });
});
