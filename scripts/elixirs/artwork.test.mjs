import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { validateCartridgeDocument } from "./cartridge.mjs";

const root = process.cwd();
const covenant = readFileSync(resolve(root, "content/elixirs/covenant.md"), "utf8");
const manifest = JSON.parse(
  readFileSync(resolve(root, "site/elixirs/assets/cartridges/manifest.json"), "utf8"),
);

const pngDimensions = (buffer) => {
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(buffer.subarray(12, 16).toString("ascii")).toBe("IHDR");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
};

describe("Elixir cartridge artwork", () => {
  it("ships a complete unique 3:2 PNG for every cartridge", () => {
    expect(manifest.schemaVersion).toBe(2);
    expect(manifest.assets).toHaveLength(3);

    const hashes = manifest.assets.map((asset) => {
      const image = readFileSync(resolve(root, "site/elixirs", asset.path));
      const hash = createHash("sha256").update(image).digest("hex");

      expect(pngDimensions(image)).toEqual(asset.dimensions);
      expect(asset.dimensions).toEqual({ width: 1536, height: 1024 });
      expect(hash).toBe(asset.sha256);
      return hash;
    });

    expect(new Set(hashes)).toHaveLength(3);
  });

  it("matches cartridge metadata to accessible provenance records", () => {
    for (const slug of ["signal", "mystery", "story"]) {
      const source = readFileSync(resolve(root, `content/elixirs/${slug}.md`), "utf8");
      const metadata = validateCartridgeDocument(source, covenant);
      const provenance = manifest.assets.find((asset) => asset.id === metadata.artwork.provenanceId);

      expect(provenance).toBeDefined();
      expect(provenance.path).toBe(metadata.artwork.path);
      expect(provenance.dimensions).toEqual({
        width: metadata.artwork.width,
        height: metadata.artwork.height,
      });
      expect(metadata.artwork.altText.length).toBeGreaterThan(40);
      expect(provenance.source).toContain("OpenAI built-in image generation");
      expect(provenance.author).toBeTruthy();
      expect(provenance.license).toBeTruthy();
      expect(provenance.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(provenance.promptSummary).toBeTruthy();
      expect(provenance.referenceAsset).toMatchObject({
        availability: "archived_git",
        path: "public/assets/pixel/expedition-atlas.png",
        sha256: "d9ce9af9cf088319e599184595d32fe70e5a33e5d42b4e9b8067b671f28a68cc",
      });
    }
  });
});
