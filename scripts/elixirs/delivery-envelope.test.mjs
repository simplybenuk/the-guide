import { describe, expect, it } from "vitest";

import {
  createCartridgeDownloadName,
  createLauncherPrompt,
  launcherPrompt,
  validateUniqueCartridgeDownloadNames,
  validateSourceRevision,
} from "./delivery-envelope.mjs";

describe("file-first Elixir delivery", () => {
  it("creates the exact short, generic launcher prompt", () => {
    expect(createLauncherPrompt()).toBe(launcherPrompt);
    expect(launcherPrompt).toContain("Read the attached Elixir cartridge in full");
    expect(launcherPrompt).toContain("ask for my consent to begin");
    expect(launcherPrompt).toContain("attachment is missing or incomplete");
    expect(launcherPrompt).not.toMatch(/https?:\/\/|SHA-256|BEGIN THE GUIDE|\bnpx\b|The Signal|The Regency Ball/);
  });

  it("creates deterministic title-and-version filenames", () => {
    expect(createCartridgeDownloadName({ title: "The Regency Ball", version: "0.1.0" })).toBe("the-regency-ball-0.1.0.md");
    expect(createCartridgeDownloadName({ title: "The Signal Elixir", version: "0.1.0" })).toBe("the-signal-elixir-0.1.0.md");
    expect(createCartridgeDownloadName({ title: "Café Mystery!", version: "2.3.4" })).toBe("cafe-mystery-2.3.4.md");
  });

  it("rejects unsafe or incomplete filename inputs", () => {
    for (const title of ["", "...", "../story", "story/name", "story\\name", "story\nname", "story\u0085name", "story\u009fname", "story\u202ename"]) {
      expect(() => createCartridgeDownloadName({ title, version: "0.1.0" })).toThrow(/safe|unsafe/);
    }
    for (const version of ["1", "1.0", "v1.0.0", "1.0.0/other"]) {
      expect(() => createCartridgeDownloadName({ title: "Story", version })).toThrow(/version/);
    }
  });

  it("rejects filename collisions after title normalization", () => {
    expect(() => validateUniqueCartridgeDownloadNames([
      { id: "the-guide.elixir.cafe", title: "Cafe", version: "0.1.0" },
      { id: "the-guide.elixir.cafe-accented", title: "Café", version: "0.1.0" },
    ])).toThrow(/filename collision/);
  });

  it("retains strict source revision validation for deterministic builds", () => {
    expect(validateSourceRevision("1234567890abcdef1234567890abcdef12345678")).toHaveLength(40);
    for (const revision of ["main", "ABCDEF1234567890ABCDEF1234567890ABCDEF12", "a".repeat(39), "g".repeat(40)]) {
      expect(() => validateSourceRevision(revision)).toThrow(/40-character lowercase/);
    }
  });
});
