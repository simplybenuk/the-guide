import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { buildStoryExpansionCandidateCatalogue, evaluateExpansionInput, executeExpansionPath, executeExpansionTimingCase, proposedActiveStoryLineup, repairExpansionState, resolveExpansionLifecycle, validateStoryExpansion, validateStoryExpansionTransition } from "./story-expansion.mjs";

const read = (path) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("authored Story catalogue expansion", () => {
  it("discovers and validates every approved taster and feature fixture", () => {
    const stories = validateStoryExpansion();
    expect(stories).toHaveLength(10);
    expect(stories.filter(({ metadata }) => metadata.story.storyFormat === "prelude")).toHaveLength(1);
    expect(stories.filter(({ metadata }) => metadata.story.storyFormat === "feature")).toHaveLength(9);
    expect(stories.find(({ slug }) => slug === "last-light").metadata).toMatchObject({
      estimatedMinutes: { min: 4, max: 6 },
      story: { beatProfile: { count: 3, acceptedTurns: { min: 3, max: 4 } } },
    });
  });

  it("proposes one taster and ten feature Stories including unchanged Regency", () => {
    expect(proposedActiveStoryLineup()).toHaveLength(11);
    expect(new Set(proposedActiveStoryLineup()).size).toBe(11);
    expect(proposedActiveStoryLineup()).toContain("regency-ball");
  });

  it("retires the three launch demonstrations only in a non-active transition proposal", () => {
    const transition = validateStoryExpansionTransition();
    expect(transition.state).toBe("proposed_not_active");
    expect(transition.retireFromActiveDiscovery.map(({ nextLifecycle }) => nextLifecycle)).toEqual(["retired", "retired", "retired"]);
    expect(transition.proposedActiveLineup).toHaveLength(11);
  });

  it("applies the proposed retirement and eleven-Story lineup through production schemas", () => {
    const catalogue = buildStoryExpansionCandidateCatalogue();
    const retired = catalogue.entries.filter(({ lifecycle }) => lifecycle === "retired");
    const discoverable = catalogue.entries.filter(({ lifecycle }) => !["retired", "withdrawn"].includes(lifecycle));
    expect(retired.map(({ elixirId }) => elixirId)).toEqual(["the-guide.elixir.signal", "the-guide.elixir.mystery", "the-guide.elixir.story"]);
    expect(discoverable).toHaveLength(11);
    expect(catalogue.collections.find(({ id }) => id === "start-here").elixirIds).toEqual([
      "the-guide.elixir.last-light", "the-guide.elixir.regency-ball", "the-guide.elixir.claws",
    ]);
  });

  it("keeps every candidate unpublished, additive, untested, and provenance-bound to staged artwork", () => {
    for (const { metadata } of validateStoryExpansion()) {
      expect(metadata.status).toBe("experimental");
      expect(metadata.compatibility).toEqual({ status: "untested", testedHarnessClasses: [] });
    }
  });

  it("executes natural input, ambiguity, off-menu, state repair, and lifecycle fixtures", () => {
    const { score, fixture } = validateStoryExpansion().find(({ slug }) => slug === "claws");
    const finalBeat = score.beats.at(-1).id;
    expect(evaluateExpansionInput(score, fixture, finalBeat, fixture.interactionCases.find(({ id }) => id === "final-1").input)).toEqual({ mode: "speech", intent: "first-course", commits: true });
    expect(evaluateExpansionInput(score, fixture, finalBeat, fixture.interactionCases.find(({ id }) => id === "final-2").input)).toEqual({ mode: "action", intent: "second-course", commits: true });
    expect(evaluateExpansionInput(score, fixture, finalBeat, "3")).toEqual({ mode: "decision", intent: "third-course", commits: true });
    expect(evaluateExpansionInput(score, fixture, finalBeat, fixture.interactionCases.find(({ id }) => id === "ambiguous-intent").input)).toMatchObject({ intent: "clarify-intent", commits: false });
    expect(evaluateExpansionInput(score, fixture, finalBeat, fixture.interactionCases.find(({ id }) => id === "off-menu-intent").input)).toMatchObject({ intent: "redirect-impossible", commits: false });
    expect(evaluateExpansionInput(score, fixture, finalBeat, "Save the harbour without killing them.")).toMatchObject({ intent: "first-course", commits: true });
    expect(repairExpansionState(score, "route-gift")).toMatchObject({ kind: "repair-question", consumesBeat: false });
    expect(executeExpansionPath(score, fixture, fixture.canonicalPaths[0]).ending).toBe("harbour-held");
    expect(resolveExpansionLifecycle("stop")).toBe("release-immediately");
    expect(() => repairExpansionState(score, "invented")).toThrow(/Unknown/);
    expect(() => resolveExpansionLifecycle("continue-character")).toThrow(/Unknown/);
  });

  it("maps ordinary paraphrases to authored commitments without fixture wording", () => {
    const probes = {
      claws: [
        ["Keep them out but do not hurt them.", "first-course"],
        ["Use the tunnels to lure them away.", "second-course"],
        ["Try to communicate with the colony.", "third-course"],
      ],
      "red-dust-reckoning": [
        ["Give it to the thirstiest families.", "first-course"],
        ["Let the railway use it under strict conditions.", "second-course"],
        ["Make the spring available to everyone.", "third-course"],
      ],
      "far-side-of-orpheus": [
        ["Shut down the echo before it can repeat.", "first-course"],
        ["Preserve a record of what happened.", "second-course"],
        ["Send a warning to future travellers.", "third-course"],
      ],
      "last-light": [
        ["Answer the people who knew the keeper.", "first-course"],
        ["Guide the vessel through the dark.", "second-course"],
        ["Let the beacon go quiet.", "third-course"],
      ],
      "room-313": [
        ["Seal the door without letting anyone see inside.", "first-course"],
        ["Let one visitor hear what really happened.", "second-course"],
        ["Tie the room to a truthful hotel record.", "third-course"],
      ],
      "clockwork-masquerade": [
        ["Release the evidence to the whole city.", "first-course"],
        ["Give the workers control under a bargain.", "second-course"],
        ["Rebuild the machine openly in public.", "third-course"],
      ],
      "dragons-last-contract": [
        ["Renew the oath with equal duties.", "first-course"],
        ["End the inherited compact completely.", "second-course"],
        ["Rotate stewardship between every party.", "third-course"],
      ],
      "murder-at-moonlight-express": [
        ["Tell the passengers every conspirator motive.", "first-course"],
        ["Reveal the fraud but protect the escape.", "second-course"],
        ["Question the living illusionist in private.", "third-course"],
      ],
      "neon-saints": [
        ["Return the recollection to its creator.", "first-course"],
        ["Deliver it only under revocable consent.", "second-course"],
        ["Erase every copy that can be sold.", "third-course"],
      ],
      "bone-orchard": [
        ["Restore the living name to its place at the table.", "first-course"],
        ["Bring the old harvest agreement to an end.", "second-course"],
        ["Make remembrance voluntary for each family.", "third-course"],
      ],
    };
    const stories = validateStoryExpansion();
    for (const [slug, cases] of Object.entries(probes)) {
      const { score, fixture } = stories.find(({ slug: candidate }) => candidate === slug);
      const finalBeat = score.beats.at(-1).id;
      for (const [input, intent] of cases) expect(evaluateExpansionInput(score, fixture, finalBeat, input)).toMatchObject({ intent, commits: true });
      for (const [option, intent] of ["first-course", "second-course", "third-course"].entries()) expect(evaluateExpansionInput(score, fixture, finalBeat, String(option + 1))).toMatchObject({ intent, commits: true });
    }
  });

  it("maps independent route prose for every Story", () => {
    const probes = {
      "last-light": "Look through the keeper's personal log.", claws: "Put the fishers in a line across the quay.",
      "red-dust-reckoning": "Check the witness accounts in the saloon.", "far-side-of-orpheus": "Go into the unstable drive chamber.",
      "room-313": "Check the strange guest ledger.", "clockwork-masquerade": "Take the roof with the aerialist.",
      "dragons-last-contract": "Read the clauses preserved in dragon fire.", "murder-at-moonlight-express": "Search the touring trunks in the baggage car.",
      "neon-saints": "Verify the consent signature at the street clinic.", "bone-orchard": "Read the carvings beneath the oldest roots.",
    };
    for (const { slug, score, fixture } of validateStoryExpansion()) {
      const branch = score.beats.find(({ next }) => next.length > 1) ?? score.beats.find(({ id }) => id === score.routes[0].exclusiveBeat);
      expect(evaluateExpansionInput(score, fixture, branch.id, probes[slug])).toMatchObject({ intent: score.routes[0].id, commits: true });
    }
  });

  it("preserves all four published cartridge digests exactly", () => {
    const releases = JSON.parse(read("content/catalogue/releases.json")).releases;
    for (const release of releases) {
      const source = read(release.sourcePath);
      expect(Buffer.byteLength(source)).toBe(release.bytes);
      expect(createHash("sha256").update(source).digest("hex")).toBe(release.sha256);
    }
  });

  it("gives Claws its approved lobster premise and originality boundaries", () => {
    const claws = read("content/elixirs/claws.md");
    const spec = read("docs/specs/authored-story-catalogue-expansion.md");
    expect(claws).toMatch(/Port Crustacean/);
    expect(claws).toMatch(/lobsters follow an old resonant harbour bell pattern/i);
    expect(spec).toMatch(/must\s+not reuse protected \*Jaws\* characters/);
    expect(spec).toMatch(/must\s+not reproduce OpenClaw logos/);
    expect(claws).not.toMatch(/Jaws|OpenClaw/);
  });

  it("uses a distinct authored cast for every new Story", () => {
    const names = [];
    for (const slug of proposedActiveStoryLineup().filter((value) => value !== "regency-ball")) {
      const source = read(`content/elixirs/${slug}.md`);
      const storyNames = [...source.matchAll(/^Name \/ label: (.+?)\s{2}$/gm)].map((match) => match[1]);
      expect(storyNames.length).toBeGreaterThanOrEqual(2);
      names.push(...storyNames);
      expect(source).not.toMatch(/Keeper Vale|Ari Quill|Marshal Sable/);
    }
    expect(new Set(names).size).toBe(names.length);
  });

  it("uses distinct executable feature graphs, state pressure, crises, and ending rules", () => {
    const features = validateStoryExpansion().filter(({ metadata }) => metadata.story.storyFormat === "feature");
    const signatures = features.map(({ score }) => JSON.stringify(score.beats.map(({ type, next, acceptedModes, intents }) => ({
      type, next: next.map((id) => score.beats.findIndex(({ id: candidate }) => candidate === id)), acceptedModes, intentCount: intents.length,
    }))));
    expect(new Set(signatures).size).toBe(features.length);
    for (const { score, fixture } of features) {
      expect(new Set(score.routes.map(({ exclusiveBeat }) => exclusiveBeat)).size).toBe(3);
      for (const path of fixture.canonicalPaths) {
        const result = executeExpansionPath(score, fixture, path);
        expect(result.ending).toBe(path.expectedEnding);
        expect(result.visitedBeats).toContain(score.routes.find(({ id }) => id === path.expectedRoute).exclusiveBeat);
        expect(result.visitedBeats.filter((beat) => score.routes.some(({ exclusiveBeat }) => exclusiveBeat === beat))).toHaveLength(1);
      }
    }
  });

  it("executes the Last Light concise-response and slow-reader contracts", () => {
    const { score, fixture } = validateStoryExpansion().find(({ slug }) => slug === "last-light");
    expect(fixture.cases.map(({ id }) => id)).toEqual(expect.arrayContaining(["concise-response", "slow-reader"]));
    expect(executeExpansionTimingCase(score, fixture, fixture.timingCases.find(({ id }) => id === "concise-response"))).toMatchObject({ acceptedTurns: 3, ending: "answered-light" });
    expect(executeExpansionTimingCase(score, fixture, fixture.timingCases.find(({ id }) => id === "slow-reader"))).toMatchObject({ acceptedTurns: 4, ending: "guiding-light" });
  });
});
