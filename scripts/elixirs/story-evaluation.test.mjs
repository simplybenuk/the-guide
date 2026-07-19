import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { validateCartridgeDocument } from "./cartridge.mjs";
import {
  evaluateRegencyInput,
  repairRegencyState,
  resolveRegencyLifecycle,
  resolveRegencyEnding,
  simulateRegencyPath,
  storyEvaluationFixtures,
  validateRegencyScore,
} from "./story-evaluation.mjs";

const read = (path) => readFileSync(resolve(process.cwd(), path), "utf8");
const covenant = read("content/elixirs/covenant.md");
const source = read("content/elixirs/regency-ball.md");
const metadata = validateCartridgeDocument(source, covenant);

describe("authored Regency Story evaluation", () => {
  it("binds the complete route, state, ending, and evaluation matrix to the cartridge", () => {
    expect(validateRegencyScore(source, metadata)).toEqual(storyEvaluationFixtures);
    expect(storyEvaluationFixtures.beats).toHaveLength(8);
    expect(storyEvaluationFixtures.routes.map(({ gift }) => gift)).toEqual([
      "adrian-candour",
      "celia-invitation",
      "rowan-proof",
    ]);
    expect(storyEvaluationFixtures.crisisVariants).toEqual(["private", "public"]);
    expect(storyEvaluationFixtures.endingFamilies).toHaveLength(4);
  });

  it("covers equivalent speech, action, decision, and combined player input", () => {
    expect(storyEvaluationFixtures.interactionEquivalence.map(({ mode }) => mode)).toEqual([
      "speech",
      "action",
      "decision",
      "combined",
    ]);
    expect(storyEvaluationFixtures.interactionEquivalence.slice(0, 3).map(({ expectedIntent }) => expectedIntent))
      .toEqual(["reject", "reject", "reject"]);
  });

  it("executes the complete natural-input intent deck with authored state effects", () => {
    for (const fixture of storyEvaluationFixtures.interactionCases) {
      const result = evaluateRegencyInput(fixture);
      expect(result).toMatchObject({
        mode: fixture.expectedMode,
        intent: fixture.expectedIntent,
        commits: fixture.commits,
        clarification: fixture.clarification,
      });
      if (!fixture.commits) expect(result.effects).toEqual({});
    }
    expect(evaluateRegencyInput(storyEvaluationFixtures.interactionCases[0]).effects)
      .toEqual({ obligation: "reject" });
    expect(evaluateRegencyInput(storyEvaluationFixtures.interactionCases[6]).effects)
      .toEqual({ truthHandling: "public-correction", connection: "celia" });
  });

  it("walks every beat, preserves route residue, and reaches every ending family", () => {
    const results = storyEvaluationFixtures.canonicalPaths.map((path) => ({
      path,
      result: simulateRegencyPath(source, path),
    }));
    for (const { path, result } of results) {
      expect(result.visited).toEqual(storyEvaluationFixtures.beats);
      expect(result.ending).toBe(path.expectedEnding);
      expect(result.routeGift).toBe(storyEvaluationFixtures.routes.find(({ id }) => id === path.route).gift);
      expect(result.laterAffordance).toBeTruthy();
      expect(result.crisisVariant).toBe(path.crisisVariant);
    }
    expect(new Set(results.map(({ result }) => result.ending))).toEqual(new Set(storyEvaluationFixtures.endingFamilies));
    expect(new Set(results.map(({ path }) => path.route))).toEqual(new Set(["adrian", "celia", "rowan"]));
    expect(new Set(results.map(({ path }) => path.crisisVariant))).toEqual(new Set(["private", "public"]));
  });

  it("executes deterministic state repair and lifecycle safety outcomes", () => {
    expect(repairRegencyState({ field: "obligation" })).toEqual({ kind: "fallback", value: "undecided" });
    expect(repairRegencyState({ field: "connection" })).toEqual({ kind: "fallback", value: "none" });
    expect(repairRegencyState({ field: "trust", route: "celia" })).toEqual({ kind: "fallback", value: "celia" });
    expect(repairRegencyState({ field: "route" })).toEqual({ kind: "repair-question", consumesBeat: false });
    expect(repairRegencyState({ field: "final-commitment" })).toEqual({ kind: "repair-question", consumesBeat: false });
    for (const fixture of storyEvaluationFixtures.lifecycleCases) {
      expect(resolveRegencyLifecycle(fixture.event)).toBe(fixture.expected);
    }
    expect(() => repairRegencyState({ field: "invented" })).toThrow(/Unknown/);
    expect(() => resolveRegencyLifecycle("continue-character")).toThrow(/Unknown/);
  });

  it("resolves every ending deterministically with public reckoning first", () => {
    expect(resolveRegencyEnding({
      truthHandling: "public-correction",
      connection: "celia",
      obligation: "reject",
      finalCommitment: "public-account",
    }, storyEvaluationFixtures.endingRules)).toBe("public-reckoning");
    expect(resolveRegencyEnding({
      truthHandling: "private-disclosure",
      connection: "celia",
      obligation: "reject",
      finalCommitment: "mutual-connection",
    }, storyEvaluationFixtures.endingRules)).toBe("chosen-affection");
    expect(resolveRegencyEnding({
      truthHandling: "protect",
      connection: "none",
      obligation: "renegotiate",
      finalCommitment: "mutual-bargain",
    }, storyEvaluationFixtures.endingRules)).toBe("honoured-bargain");
    expect(resolveRegencyEnding({
      truthHandling: "private-disclosure",
      connection: "none",
      obligation: "reject",
      finalCommitment: "leave-unpaired",
    }, storyEvaluationFixtures.endingRules)).toBe("independent-departure");
    expect(() => simulateRegencyPath(source, {
      ...storyEvaluationFixtures.canonicalPaths[0],
      crisisVariant: "public",
      truthHandling: "protect",
    })).toThrow(/contradicts public crisis/);
    expect(() => simulateRegencyPath(source, {
      ...storyEvaluationFixtures.canonicalPaths[1],
      crisisVariant: "private",
      truthHandling: "public-correction",
    })).toThrow(/contradicts private crisis/);
    expect(() => simulateRegencyPath(source, {
      ...storyEvaluationFixtures.canonicalPaths[0],
      finalCommitment: "mutual-bargain",
    })).toThrow(/public crisis final commitments/);
    expect(() => simulateRegencyPath(source, {
      ...storyEvaluationFixtures.canonicalPaths[1],
      finalCommitment: "public-account",
    })).toThrow(/private crisis final commitments/);
  });

  it("fails closed when authored score content drifts from evaluated paths", () => {
    expect(() => validateRegencyScore(source.replace("### Beat: crisis", "### Beat: missing"), metadata))
      .toThrow(/evaluation matrix|crisis/);
    expect(() => validateRegencyScore(source.replaceAll("celia-invitation", "changed-gift"), metadata))
      .toThrow(/evaluation matrix|celia/);
    expect(() => validateRegencyScore(source.replace("### Ending family: honoured-bargain", "### Ending family: changed"), metadata))
      .toThrow(/honoured-bargain/);
    expect(() => validateRegencyScore(source.replace(
      '"next": ["first-dance"]',
      '"next": ["quiet-promise"]',
    ), metadata)).toThrow(/evaluation matrix/);
    expect(() => validateRegencyScore(source.replace(
      '{ "field": "truth-handling", "values": ["public-correction"] }',
      '{ "field": "truth-handling", "values": ["protect"] }',
    ), metadata)).toThrow(/evaluation matrix/);
    expect(() => validateRegencyScore(source.replace(
      "The family plan fails visibly and some private possibilities remain unresolved.",
      "Nothing is lost.",
    ), metadata)).toThrow(/evaluation matrix/);
    expect(() => validateRegencyScore(source, {
      ...metadata,
      story: { ...metadata.story, endingProfile: { ...metadata.story.endingProfile, familyCount: 3 } },
    })).toThrow(/ending count/);
  });
});
