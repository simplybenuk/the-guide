import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { validateCartridgeDocument } from "./cartridge.mjs";

const read = (path) => readFileSync(resolve(process.cwd(), path), "utf8");
const covenant = read("content/elixirs/covenant.md");

describe("first-party Elixir content", () => {
  const cartridgeSources = Object.fromEntries(
    ["signal", "mystery", "story"].map((slug) => [slug, read(`content/elixirs/${slug}.md`)]),
  );

  it("validates all three self-contained first-party cartridges", () => {
    expect(
      Object.entries(cartridgeSources).map(([slug, source]) => {
        const metadata = validateCartridgeDocument(source, covenant);
        return [metadata.slug, metadata.version, metadata.artwork.provenanceId, slug];
      }),
    ).toEqual([
      ["signal", "0.1.0", "art-signal", "signal"],
      ["mystery", "0.1.0", "art-mystery", "mystery"],
      ["story", "0.1.0", "art-story", "story"],
    ]);
  });

  it("validates the self-contained Signal cartridge", () => {
    const source = read("content/elixirs/signal.md");
    const metadata = validateCartridgeDocument(source, covenant);

    expect(metadata).toMatchObject({
      id: "the-guide.elixir.signal",
      version: "0.1.0",
      gameplayCapability: "conversation_only",
      movement: "stay_here",
      requiredInputs: ["time", "energy", "hard_boundary"],
      covenantVersion: "1.0.0",
      artwork: {
        path: "assets/cartridges/signal.png",
        provenanceId: "art-signal",
      },
    });
  });

  it("keeps Signal to three grounded accepted moves and an explicit release", () => {
    const source = read("content/elixirs/signal.md");

    expect(source.match(/^### Beat \d/gm)).toHaveLength(3);
    expect(source).toContain("A refusal,\npause, clarification, safety redirect, or alternative offer does not consume a\nmove.");
    expect(source).toMatch(/never as a fact about the\s+world or the player/);
    expect(source).toContain("Never fill a gap\nwith an invented observation");
    expect(source).toContain("The Signal Elixir has worn off.");
    expect(source).toContain("Do not offer another signal or invite a fourth move.");
  });

  it("locks Signal consent, adaptation, controls, and grounded return behavior", () => {
    const source = read("content/elixirs/signal.md");

    expect(source.indexOf("Do not transform or begin the first game move")).toBeLessThan(
      source.indexOf("### Beat 1 — Invitation"),
    );
    expect(source).toContain("The player may stay seated or in one\nspot for the whole game");
    expect(source).toContain("Use one safe detail from the player's latest report");
    expect(source).toContain("the player's latest accepted report\nwhen one is available");
    expect(source).toContain("On pause, issue no new\ngame move until the player resumes");
    expect(source).toContain("end play immediately from any state");
    expect(source).toContain("two or three details attributed to what the player reported");
    expect(source).toContain("End the\ntemporary persona and game mechanics");
  });

  it("keeps Mystery fictional, separates clues from invention, and releases cleanly", () => {
    const source = cartridgeSources.mystery;
    const metadata = validateCartridgeDocument(source, covenant);

    expect(metadata.requiredInputs).toEqual([
      "time",
      "energy",
      "hard_boundary",
      "free_text_choice",
    ]);
    expect(source.match(/^### Clue round \d/gm)).toHaveLength(3);
    expect(source).toContain("Player clues:");
    expect(source).toContain("Case fiction:");
    expect(source).toContain("Never move a fictional statement into Player clues");
    expect(source).toContain("If the response names a real person");
    expect(source).toContain("Use the safe detail from the player's latest accepted report");
    expect(source).toContain("not a claim about reality");
    expect(source).toContain("The Mystery Elixir has worn off.");
    expect(source).toContain("Do not reopen the case");
  });

  it("keeps Story no-movement, choice-reactive, bounded, and non-diagnostic", () => {
    const source = cartridgeSources.story;
    const metadata = validateCartridgeDocument(source, covenant);

    expect(metadata.movement).toBe("none");
    expect(metadata.requiredInputs).toEqual([
      "time",
      "hard_boundary",
      "genre_boundary",
      "free_text_choice",
    ]);
    expect(source.indexOf("### Setup")).toBeLessThan(source.indexOf("### Temporary role"));
    expect(source).toContain("before entering the temporary role or beginning\nthe first scene");
    expect(source).toContain("Wait\nuntil these boundaries are defined or declined before transforming");
    expect(source).toContain("Only after Setup is complete, become the Lantern Narrator");
    expect(source.match(/^### Scene \d/gm)).toHaveLength(3);
    expect(source).toContain("Make the player's latest accepted choice materially change");
    expect(source).toMatch(/Never interpret a story choice as\s+diagnosis/);
    expect(source).toContain("one bounded adaptive arc, not a persistent campaign");
    expect(source).toContain("The Story Elixir has worn off.");
    expect(source).toContain("Do not force a\nsequel, continue narrating, or invite a fourth scene");
  });

  it("keeps the three games mechanically distinct rather than tonal variants", () => {
    expect(cartridgeSources.signal).toContain("Run exactly three accepted moves");
    expect(cartridgeSources.signal).toContain("shared attention, not proving a theory");
    expect(cartridgeSources.mystery).toContain("exactly\ntwo short, clearly fictional interpretations");
    expect(cartridgeSources.story).toContain("one meaningful open choice at a time");
    expect(new Set(Object.values(cartridgeSources))).toHaveLength(3);
  });
});
