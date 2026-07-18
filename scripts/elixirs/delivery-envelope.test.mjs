import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { validateCartridgeDocument } from "./cartridge.mjs";
import {
  cartridgeClosingMarker,
  cartridgeOpeningMarker,
  createResolverPrompt,
  createSelfContainedPrompt,
  getCartridgeIntegrity,
  validateSourceRevision,
} from "./delivery-envelope.mjs";

const repositoryRoot = process.cwd();
const covenant = readFileSync(resolve(repositoryRoot, "content/elixirs/covenant.md"), "utf8");
const sourceRevision = "1234567890abcdef1234567890abcdef12345678";

const load = (slug) => {
  const source = readFileSync(resolve(repositoryRoot, `content/elixirs/${slug}.md`), "utf8");
  return { metadata: validateCartridgeDocument(source, covenant), source };
};

describe("use-without-installing delivery envelopes", () => {
  it("embeds every canonical cartridge byte exactly once with deterministic integrity", () => {
    for (const slug of ["signal", "mystery", "story"]) {
      const cartridge = load(slug);
      const prompt = createSelfContainedPrompt(cartridge);
      const opening = `${cartridgeOpeningMarker}\n`;
      const start = prompt.indexOf(opening) + opening.length;
      const end = prompt.indexOf(cartridgeClosingMarker, start);
      const embedded = prompt.slice(start, end);
      const integrity = getCartridgeIntegrity(cartridge.source);

      expect(embedded).toBe(cartridge.source);
      expect(prompt.indexOf(cartridge.source)).toBe(prompt.lastIndexOf(cartridge.source));
      expect(integrity.bytes).toBe(Buffer.byteLength(cartridge.source, "utf8"));
      expect(integrity.sha256).toBe(createHash("sha256").update(cartridge.source).digest("hex"));
      expect(prompt).toContain(`Elixir ID: the-guide.elixir.${slug}`);
      expect(prompt).toMatch(/ask for my affirmative consent/i);
      expect(prompt).not.toMatch(/https?:\/\//);
      expect(prompt).not.toMatch(/\bnpx\b|install or run packages/i);
    }
  });

  it("creates only exact Pages and commit-pinned first-party resolver sources", () => {
    const cartridge = load("story");
    const prompt = createResolverPrompt({
      ...cartridge,
      cartridgeUrl: "../../cartridges/story/0.1.0/elixir.md",
      sourceRevision,
    });

    expect(prompt).toContain("Published cartridge: ../../cartridges/story/0.1.0/elixir.md");
    expect(prompt).toContain(
      `https://raw.githubusercontent.com/simplybenuk/the-guide/${sourceRevision}/content/elixirs/story.md`,
    );
    expect(prompt).toContain(
      `https://github.com/simplybenuk/the-guide/blob/${sourceRevision}/content/elixirs/story.md`,
    );
    expect(prompt).toContain("Do not install or run packages");
    expect(prompt).toContain("the retrieval phase is over");
    expect(prompt).not.toMatch(/\/main\/|[?&][a-z]+=|\bnpx\b/i);
  });

  it("rejects incomplete, ambiguous, mutable, or mismatched inputs", () => {
    const cartridge = load("signal");
    expect(() => createSelfContainedPrompt({ ...cartridge, source: cartridge.source.trimEnd() })).toThrow(/line feed/);
    expect(() => createSelfContainedPrompt({ ...cartridge, source: `${cartridge.source.slice(0, -1)}\uFFFD\n` })).toThrow(/invalid UTF-8/);
    expect(() => createSelfContainedPrompt({ ...cartridge, source: `${cartridge.source}${cartridgeOpeningMarker}\n` })).toThrow(/reserved/);
    expect(() => createSelfContainedPrompt({ ...cartridge, metadata: { ...cartridge.metadata, id: "the-guide.elixir.other" } })).toThrow(/do not match/);
    for (const cartridgeUrl of [
      "../../cartridges/signal/0.1.0/elixir.md?latest=1",
      "../../cartridges/other/9.9.9/elixir.md",
      "https://evil.example/cartridge.md",
    ]) {
      expect(() => createResolverPrompt({ ...cartridge, cartridgeUrl, sourceRevision })).toThrow(/must be exactly/);
    }
    for (const revision of ["main", "ABCDEF1234567890ABCDEF1234567890ABCDEF12", "a".repeat(39), "g".repeat(40)]) {
      expect(() => validateSourceRevision(revision)).toThrow(/40-character lowercase/);
    }
  });
});
