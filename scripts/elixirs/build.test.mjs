import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildElixirSite } from "./build.mjs";

const repositoryRoot = process.cwd();
const outputDirectory = mkdtempSync(join(tmpdir(), "guide-elixirs-build-"));

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
  beforeAll(() => buildElixirSite({ outputDirectory }));
  afterAll(() => rmSync(outputDirectory, { recursive: true, force: true }));

  it("emits only the expected framework-free static tree", () => {
    expect(listFiles(outputDirectory)).toEqual([
      ".nojekyll",
      "assets/cartridges/manifest.json",
      "assets/cartridges/mystery.png",
      "assets/cartridges/signal.png",
      "assets/cartridges/story.png",
      "cabinet.js",
      "cartridges/mystery/0.1.0/elixir.md",
      "cartridges/signal/0.1.0/elixir.md",
      "cartridges/story/0.1.0/elixir.md",
      "delivery-events.js",
      "elixirs/mystery/index.html",
      "elixirs/signal/index.html",
      "elixirs/story/index.html",
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
      const detail = readOutput(`elixirs/${slug}/index.html`);

      expect(emitted.equals(canonical)).toBe(true);
      expect(detail).toContain(`../../cartridges/${slug}/0.1.0/elixir.md`);
      expect(detail).toContain("data-cartridge-source");
      expect(detail).toContain("View exactly what it says");
      expect(detail).toContain('href="../../terms.md"');
      expect(detail).toContain("Start this Elixir in ChatGPT");
      expect(detail).toContain("Copy for ChatGPT");
      expect(detail).toContain("Download Markdown");
    }
  });

  it("copies artwork without alteration and exposes complete comparison metadata", () => {
    const manifest = JSON.parse(readOutput("assets/cartridges/manifest.json"));
    const index = readOutput("index.html");

    expect((index.match(/<article class="elixir-card/g) ?? [])).toHaveLength(3);
    for (const label of [
      "Shape",
      "Time",
      "Energy",
      "Movement",
      "Player input",
      "Capability",
      "Data behavior",
      "Version",
      "Publisher",
      "Status",
      "Compatibility",
    ]) {
      expect((index.match(new RegExp(`<dt>${label}</dt>`, "g")) ?? [])).toHaveLength(3);
    }
    expect(index).toContain("conversation only");
    expect(index).toContain("provider processing: user chosen harness");
    expect(index).toContain("<dd>The Guide</dd>");
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

  it("emits a complete no-JavaScript handoff and progressively enhanced copy controls", () => {
    for (const slug of ["signal", "mystery", "story"]) {
      const detail = readOutput(`elixirs/${slug}/index.html`);
      expect(detail).toContain(
        `before doing anything: ../../cartridges/${slug}/0.1.0/elixir.md`,
      );
      expect(detail).toContain("Please read the complete The");
      expect(detail).toContain("Explain the game, its demands, capability boundary, and data behavior");
      expect(detail).toContain("If you cannot retrieve it, say so rather than guessing");
      expect(detail).toContain("ask for my affirmative consent before you fictionally drink it");
      expect(detail).not.toContain("Please load The The");
      expect(detail).not.toMatch(/https?:\/\/[^\s<]+\/cartridges\//);
      expect(detail).toContain("select and copy the handoff message");
      expect(detail.match(/data-copy-action[^>]+hidden/g)).toHaveLength(2);
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
});
