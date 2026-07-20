import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildElixirSite } from "./build.mjs";
import { loadCatalogue } from "./catalogue.mjs";
import { createCartridgeDownloadName } from "./delivery-envelope.mjs";

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
    expect(listFiles(outputDirectory)).toEqual(expect.arrayContaining([
      ".nojekyll",
      "assets/cartridges/manifest.json",
      "assets/cartridges/mystery.png",
      "assets/cartridges/regency-ball-cover.png",
      "assets/cartridges/regency-ball.png",
      "assets/cartridges/signal.png",
      "assets/cartridges/story.png",
      "browse/index.html",
      "cabinet.js",
      "cartridges/mystery/0.1.0/elixir.md",
      "cartridges/regency-ball/0.1.0/elixir.md",
      "cartridges/signal/0.1.0/elixir.md",
      "cartridges/story/0.1.0/elixir.md",
      "cartridges/the-guide/mystery/0.1.0/elixir.md",
      "cartridges/the-guide/regency-ball/0.1.0/elixir.md",
      "cartridges/the-guide/signal/0.1.0/elixir.md",
      "cartridges/the-guide/story/0.1.0/elixir.md",
      "catalogue-index.json",
      "catalogue.js",
      "collections/low-energy/index.html",
      "collections/start-here/index.html",
      "collections/three-ways-to-play/index.html",
      "delivery-events.js",
      "elixirs/mystery/versions/0.1.0/index.html",
      "elixirs/regency-ball/index.html",
      "elixirs/regency-ball/versions/0.1.0/index.html",
      "elixirs/signal/versions/0.1.0/index.html",
      "elixirs/story/versions/0.1.0/index.html",
      "evidence/the-guide/mystery/0.1.0/compatibility-1.md",
      "evidence/the-guide/mystery/0.1.0/review-1.md",
      "evidence/the-guide/regency-ball/0.1.0/compatibility-1.md",
      "evidence/the-guide/regency-ball/0.1.0/review-1.md",
      "evidence/the-guide/regency-ball/0.1.0/review-2.md",
      "evidence/the-guide/signal/0.1.0/compatibility-1.md",
      "evidence/the-guide/signal/0.1.0/review-1.md",
      "evidence/the-guide/story/0.1.0/compatibility-1.md",
      "evidence/the-guide/story/0.1.0/review-1.md",
      "index.html",
      "skills/agent-elixir-0.1.0.zip",
      "styles.css",
      "terms.md",
    ]));

    const artifactText = listFiles(outputDirectory)
      .filter((path) => /\.(?:html|css|js|json|md)$/.test(path))
      .map(readOutput)
      .join("\n");
    expect(artifactText).not.toMatch(/\/_next|\/api\/(?:health|expedition)|localStorage|sessionStorage|GUIDE_PROVIDER_/);
    expect(artifactText).not.toMatch(/sendBeacon|XMLHttpRequest|\bfetch\s*\(|console\.(?:log|info|debug|table)\s*\(/);
    expect(artifactText).not.toMatch(/react-dom|data-reactroot|__REACT/i);
  });

  it("derives source, download, and copy content from identical cartridge bytes", () => {
    const catalogue = loadCatalogue();
    for (const slug of catalogue.entries.filter(({ lifecycle }) => lifecycle === "published").map(({ slug }) => slug)) {
      const canonical = readFileSync(resolve(repositoryRoot, `content/elixirs/${slug}.md`));
      const emitted = readFileSync(
        resolve(outputDirectory, `cartridges/${slug}/0.1.0/elixir.md`),
      );
      const namespaced = readFileSync(
        resolve(outputDirectory, `cartridges/the-guide/${slug}/0.1.0/elixir.md`),
      );
      const detail = readOutput(`elixirs/${slug}/index.html`);
      const entry = catalogue.entries.find((candidate) => candidate.slug === slug);
      const release = catalogue.releases.find(({ elixirId, version }) => elixirId === entry.elixirId && version === entry.recommendedVersion);
      const metadata = catalogue.cartridges.find(({ release: candidate }) => candidate.elixirId === release.elixirId && candidate.version === release.version).metadata;
      const downloadName = createCartridgeDownloadName(metadata);
      const namedDownload = readFileSync(resolve(outputDirectory, `downloads/${downloadName}`));

      expect(emitted.equals(canonical)).toBe(true);
      expect(namespaced.equals(canonical)).toBe(true);
      expect(namedDownload.equals(canonical)).toBe(true);
      expect(detail).toContain(`href="../../downloads/${downloadName}"`);
      expect(detail).toContain(`download="${downloadName}"`);
      expect(detail).toContain("data-cartridge-source");
      expect(detail).toContain("Read the complete cartridge");
      expect(detail).toContain('href="../../terms.md"');
      expect(detail).toContain("Take this story to your AI");
      expect(detail).toContain("Copy prompt");
      expect(detail).toContain("Download story");
    }
  });

  it("emits a metadata-only public index, collections, and immutable version records", () => {
    const index = JSON.parse(readOutput("catalogue-index.json"));
    expect(index.schemaVersion).toBe("1.0.0");
    expect(index.deploymentRevision).toBe("story-expansion-2026-07-19");
    expect(index.entries).toHaveLength(11);
    expect(JSON.stringify(index)).not.toMatch(/sourcePath|reviewReferences|compatibilityReferences|cartridge source|transcript/i);
    expect(readOutput("collections/start-here/index.html")).toContain("Four distinct ways");
    expect(readOutput("elixirs/signal/versions/0.1.0/index.html")).toContain(
      "1c371b5813f6d93f37cabe486337f2680928f3e2ae5c19d4e86d40328f597cbb",
    );
    expect(readOutput("elixirs/last-light/index.html")).toContain('href="../../evidence/the-guide/last-light/0.1.0/review-1.md"');
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
    const detail = readOutput("elixirs/last-light/index.html");

    expect((index.match(/data-spotlight/g) ?? [])).toHaveLength(1);
    expect((index.match(/data-shelf(?:\s|>)/g) ?? [])).toHaveLength(3);
    expect((index.match(/<article class="elixir-card/g) ?? [])).toHaveLength(7);
    expect((browse.match(/<article class="elixir-card/g) ?? [])).toHaveLength(11);
    expect(index).not.toContain("<dt>");
    expect(browse).not.toContain("<dt>");
    expect((browse.match(/<ul class="fit-signals"/g) ?? [])).toHaveLength(11);
    expect(detail).toContain("What you need to play");
    expect(detail).not.toContain("<h2 id=\"facts-title\">Before you play</h2>");
    expect(detail).not.toContain("<h2 id=\"story-facts-title\">Story experience</h2>");
    expect(detail).toContain("<summary>Version, safety, and provenance</summary>");
    expect(detail).toContain("<summary>Use the Agent Skill</summary>");
    expect(detail).toContain("complete story file served by the versioned link and download");
    expect(detail).not.toContain("link, download, and copy actions");
    expect(detail.indexOf("What you need to play")).toBeLessThan(detail.indexOf("Take this story to your AI"));
    expect(index).toContain("The game happens in the agent harness you choose");
    expect(index).toContain("does not receive your game conversation");
    expect(index).toContain('href="terms.md"');
    expect(readOutput("terms.md")).toContain("personal, non-commercial alpha testing");
    expect(index).not.toMatch(/href="\/|src="\//);

    for (const asset of manifest.assets) {
      const source = readFileSync(resolve(repositoryRoot, "site/elixirs", asset.path));
      const emitted = readFileSync(resolve(outputDirectory, asset.path));
      expect(hash(emitted)).toBe(hash(source));
    }
    expect(index).not.toContain('src="./assets/cartridges/regency-ball.png"');
    expect(index).toContain('src="./assets/cartridges/regency-ball-cover.png"');
    const regencyDetail = readOutput("elixirs/regency-ball/index.html");
    expect(regencyDetail).toContain('src="../../assets/cartridges/regency-ball-cover.png"');
    expect(regencyDetail).not.toContain('src="../../assets/cartridges/regency-ball.png"');
  });

  it("keeps every generated internal URL relative for root and subpath hosting", () => {
    for (const path of listFiles(outputDirectory).filter((file) => file.endsWith(".html"))) {
      const html = readOutput(path);
      expect(html).not.toMatch(/(?:href|src)="\/(?!\/)/);
      expect(html).not.toContain("file://");
      expect(html).not.toContain("localhost");
    }
  });

  it("emits one short launcher prompt, named download, and generic skill option", () => {
    for (const slug of loadCatalogue().entries.filter(({ lifecycle }) => lifecycle === "published").map(({ slug }) => slug)) {
      const detail = readOutput(`elixirs/${slug}/index.html`);
      expect(detail).toContain("Read the attached Elixir cartridge in full");
      expect(detail).toMatch(/download="[a-z0-9-]+-0\.1\.0\.md"/);
      expect(detail).toContain("/agent-elixir");
      expect(detail).toContain('href="../../skills/agent-elixir-0.1.0.zip"');
      expect(detail).not.toMatch(/Delivery envelope:|BEGIN THE GUIDE|resolver-prompt|Copy raw cartridge|Copy for ChatGPT/);
      expect(detail.match(/data-copy-action[^>]+hidden/g)).toHaveLength(1);
    }
    const skillArchive = readFileSync(resolve(outputDirectory, "skills/agent-elixir-0.1.0.zip"));
    expect(skillArchive.toString("utf8")).toContain("name: agent-elixir");
    expect(skillArchive.toString("utf8")).not.toMatch(/# The (?:Signal|Mystery|Story|Regency Ball)/);
  });

  it("emits a deterministic local-only delivery event runtime", () => {
    const runtime = readOutput("delivery-events.js");
    expect(runtime).toContain("the-guide:delivery-event");
    expect(runtime).toContain("cabinet-delivery-v2");
    expect(runtime).toContain("launcher_prompt_copy");
    expect(runtime).toContain("the-guide.elixir.last-light@0.1.0");
    expect(runtime).toContain("the-guide.elixir.claws@0.1.0");
    expect(runtime).not.toContain("the-guide.elixir.signal@0.1.0");
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

  it("rejects active cartridges with colliding suggested download names", () => {
    const malicious = structuredClone(loadCatalogue());
    const active = malicious.cartridges.filter(({ release }) => malicious.entries.find(({ elixirId }) => elixirId === release.elixirId)?.lifecycle === "published");
    active[1].metadata.title = active[0].metadata.title;
    active[1].metadata.version = active[0].metadata.version;
    const maliciousOutput = mkdtempSync(join(tmpdir(), "guide-colliding-downloads-"));
    try {
      expect(() => buildElixirSite({ outputDirectory: maliciousOutput, sourceRevision, catalogue: malicious })).toThrow(/filename collision/);
    } finally {
      rmSync(maliciousOutput, { recursive: true, force: true });
    }
  });
});
