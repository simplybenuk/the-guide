import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";
import { z } from "zod";

const assetSchema = z.object({
  path: z.string().startsWith("/assets/pixel/"),
  kind: z.enum(["visual", "font", "sound"]),
  source: z.string().min(1),
  author: z.string().min(1),
  license: z.string().min(1),
  baseResolution: z.string().optional(),
  generatedAt: z.iso.date().optional(),
  layout: z.string().min(1).optional(),
  cells: z.array(z.string().min(1)).optional(),
  promptSummary: z.string().min(1).optional(),
});

const manifestSchema = z.object({
  schemaVersion: z.literal(1),
  project: z.literal("The Guide"),
  assetRoot: z.literal("/assets/pixel/"),
  policy: z.string().min(1),
  assets: z.array(assetSchema),
});

describe("pixel asset manifest", () => {
  it("records provenance for every declared asset", () => {
    const path = resolve(process.cwd(), "public/assets/pixel/manifest.json");
    const manifest: unknown = JSON.parse(readFileSync(path, "utf8"));

    expect(manifestSchema.parse(manifest)).toEqual(manifest);
  });

  it("accounts for the complete bounded visual atlas", () => {
    const path = resolve(process.cwd(), "public/assets/pixel/manifest.json");
    const manifest = manifestSchema.parse(JSON.parse(readFileSync(path, "utf8")));
    const atlas = manifest.assets.find((asset) => asset.path.endsWith("expedition-atlas.png"));

    expect(atlas?.cells).toEqual([
      "room",
      "buddy",
      "buddy-transformed",
      "elixir",
      "portal-dormant",
      "portal-active",
      "astrolabe",
      "cabinet",
      "ui",
    ]);

    const atlasPath = resolve(process.cwd(), "public", atlas?.path.slice(1) ?? "");
    const png = readFileSync(atlasPath);
    expect(png.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1254, 1254]);
  });
});
