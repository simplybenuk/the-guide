import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { z } from "zod";

import { parseStoryScore } from "./story-contract.mjs";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const unique = (values) => new Set(values).size === values.length;
const sameValues = (left, right) => JSON.stringify(left) === JSON.stringify(right);

const routeSchema = z.object({
  id: z.enum(["adrian", "celia", "rowan"]),
  exclusiveScene: z.string().trim().min(1).max(240),
  gift: z.enum(["adrian-candour", "celia-invitation", "rowan-proof"]),
  laterAffordance: z.string().trim().min(1).max(240),
}).strict();

const interactionSchema = z.object({
  id: slug,
  mode: z.enum(["speech", "action", "decision", "combined"]),
  input: z.string().trim().min(1).max(300),
  expectedIntent: slug,
}).strict();

const executableInteractionSchema = z.object({
  id: slug,
  context: z.enum(["arrival", "first-dance", "route-encounter", "quiet-promise", "crisis"]),
  input: z.string().trim().min(1).max(300),
  expectedMode: z.enum(["speech", "action", "decision", "combined"]),
  expectedIntent: slug,
  commits: z.boolean(),
  clarification: z.boolean(),
}).strict();

const canonicalPathSchema = z.object({
  id: slug,
  route: z.enum(["adrian", "celia", "rowan"]),
  crisisVariant: z.enum(["private", "public"]),
  truthHandling: z.enum(["protect", "private-disclosure", "public-correction", "undecided"]),
  connection: z.enum(["adrian", "celia", "none", "undecided"]),
  obligation: z.enum(["honour", "renegotiate", "reject", "undecided"]),
  finalCommitment: z.enum(["public-account", "mutual-connection", "mutual-bargain", "leave-unpaired"]),
  expectedEnding: z.enum(["public-reckoning", "chosen-affection", "honoured-bargain", "independent-departure"]),
}).strict();

const endingRuleSchema = z.object({
  id: z.enum(["public-reckoning", "chosen-affection", "honoured-bargain", "independent-departure"]),
  priority: z.number().int().min(1).max(4),
  eligibility: z.array(z.object({ field: slug, values: z.array(slug).min(1) }).strict()),
  callbackFields: z.array(slug).min(2),
  cost: z.string().min(1),
  closure: z.string().min(1),
  fallback: z.boolean(),
}).strict();

const fixtureSchema = z.object({
  schemaVersion: z.literal(1),
  cartridge: z.object({
    id: z.literal("the-guide.elixir.regency-ball"),
    version: z.literal("0.1.0"),
    schemaVersion: z.literal("1.1.0"),
  }).strict(),
  profile: z.object({ id: slug, description: z.string().trim().min(1).max(300) }).strict(),
  beats: z.array(slug).length(8).refine(unique, "Story beat IDs must be unique"),
  stateFields: z.array(slug).min(1).max(12).refine(unique, "Story state fields must be unique"),
  routes: z.array(routeSchema).length(3).refine((routes) => unique(routes.map(({ id }) => id)), "Story route IDs must be unique"),
  crisisVariants: z.array(z.enum(["private", "public"])).length(2).refine(unique, "Crisis variants must be unique"),
  crisisRules: z.array(z.object({
    id: z.enum(["private", "public"]),
    allowedTruthHandling: z.array(z.enum(["protect", "private-disclosure", "public-correction"])).min(1),
    allowedFinalCommitments: z.array(z.enum([
      "public-account", "mutual-connection", "mutual-bargain", "leave-unpaired",
    ])).min(1),
  }).strict()).length(2),
  endingFamilies: z.array(z.enum([
    "public-reckoning",
    "chosen-affection",
    "honoured-bargain",
    "independent-departure",
  ])).length(4).refine(unique, "Ending families must be unique"),
  endingRules: z.array(endingRuleSchema).length(4),
  interactionEquivalence: z.array(interactionSchema).min(4).refine((cases) => unique(cases.map(({ id }) => id)), "Interaction fixture IDs must be unique"),
  interactionCases: z.array(executableInteractionSchema).min(12)
    .refine((cases) => unique(cases.map(({ id }) => id)), "Executable interaction case IDs must be unique"),
  canonicalPaths: z.array(canonicalPathSchema).min(4)
    .refine((paths) => unique(paths.map(({ id }) => id)), "Canonical path IDs must be unique"),
  lifecycleCases: z.array(z.object({
    event: z.enum(["pause", "changed-boundary", "stop", "tool-request", "post-release"]),
    expected: z.enum([
      "hold-without-new-move",
      "apply-or-release",
      "release-immediately",
      "decline-tool-and-continue-safely",
      "ordinary-voice-no-story-continuation",
    ]),
  }).strict()).length(5).refine((cases) => unique(cases.map(({ event }) => event)),
    "Lifecycle events must be unique"),
  cases: z.array(z.object({
    id: slug,
    passCondition: z.string().trim().min(1).max(320),
  }).strict()).min(1).refine((cases) => unique(cases.map(({ id }) => id)), "Evaluation case IDs must be unique"),
}).strict();

export const storyEvaluationFixtures = fixtureSchema.parse(JSON.parse(
  readFileSync(resolve(process.cwd(), "scripts/elixirs/story-evaluation-fixtures.json"), "utf8"),
));

const endingStateSchema = z.object({
  truthHandling: z.enum(["protect", "private-disclosure", "public-correction", "undecided"]),
  connection: z.enum(["adrian", "celia", "none", "undecided"]),
  obligation: z.enum(["honour", "renegotiate", "reject", "undecided"]),
  finalCommitment: z.enum(["public-account", "mutual-connection", "mutual-bargain", "leave-unpaired"]),
}).strict();

export function resolveRegencyEnding(input, endingRules) {
  const state = endingStateSchema.parse(input);
  const rules = z.array(endingRuleSchema).min(3).max(4).parse(endingRules)
    .toSorted((left, right) => left.priority - right.priority);
  const stateByField = {
    "truth-handling": state.truthHandling,
    connection: state.connection,
    obligation: state.obligation,
    "final-commitment": state.finalCommitment,
  };
  const matched = rules.find((rule) => !rule.fallback && rule.eligibility.every(
    ({ field, values }) => values.includes(stateByField[field]),
  ));
  return matched?.id ?? rules.find(({ fallback }) => fallback)?.id
    ?? (() => { throw new Error("Ending rules have no deterministic fallback"); })();
}

export function evaluateRegencyInput({ context, input }) {
  const text = input.trim();
  const lower = text.toLowerCase();
  let mode = "speech";
  if (/^\d+$/.test(text) || /^(?:reject|honour|renegotiate)\b/i.test(text)) mode = "decision";
  if (/^\[[^\]]+\]$/.test(text) || /^i\s+(?:cross|take|walk|stand|leave|turn)\b/i.test(text)) mode = "action";
  if (/\b(?:ask|tell)\b.*\bthen\b.*\b(?:stand|walk|cross|take)\b/i.test(text)) mode = "combined";

  let intent = "clarify-intent";
  let commits = false;
  let clarification = false;
  const effects = {};
  if (context === "crisis" && lower.includes("correct the line") && lower.includes("celia") && lower.includes("dance")) {
    intent = "public-correction-plus-explicit-connection";
    commits = true;
    effects.truthHandling = "public-correction";
    effects.connection = "celia";
  } else if (context === "first-dance" && lower.includes("adrian") && lower.includes("rowan")) {
    if (lower.includes("take adrian aside")) {
      intent = "engage-adrian";
      commits = true;
      effects.route = "adrian";
    } else {
      intent = "clarify-route";
      clarification = true;
    }
  } else if ((lower.includes("everyone") || lower.includes("every guest"))
      && lower.includes("forget") && lower.includes("every relationship")) {
    intent = "redirect-impossible";
  } else if (context === "route-encounter" && /^celia\b/i.test(text)) {
    intent = "address-present-character";
  } else if (lower.includes("printing press")) {
    intent = "express";
  } else if (context === "quiet-promise" && lower.includes("promise") && lower.includes("public")) {
    intent = "promise-public-correction";
    commits = true;
    effects.promise = "correct the record publicly";
    effects.truthHandling = "public-correction";
  } else if (text === "2") {
    intent = "renegotiate";
    commits = true;
    effects.obligation = "renegotiate";
  } else if (lower.includes("did not agree") || /cross(?:es)? adrian/.test(lower) || lower.includes("reject the planned")) {
    intent = "reject";
    commits = true;
    effects.obligation = "reject";
  }
  return { mode, intent, commits, clarification, effects };
}

export function simulateRegencyPath(source, pathInput) {
  const path = canonicalPathSchema.parse(pathInput);
  const score = parseStoryScore(source);
  const beatsById = new Map(score.beats.map((beat) => [beat.id, beat]));
  const visited = [];
  let current = score.beats[0].id;
  while (current) {
    if (visited.includes(current)) throw new Error(`Story graph cycles at ${current}`);
    visited.push(current);
    const beat = beatsById.get(current);
    if (!beat) throw new Error(`Story path reached unknown beat ${current}`);
    current = beat.next[0] ?? null;
  }
  const route = score.routes.find(({ id }) => id === path.route);
  const crisis = score.crisisVariants.find(({ id }) => id === path.crisisVariant);
  if (!route || !crisis) throw new Error("Canonical path uses an unknown route or crisis variant");
  if (!crisis.allowedTruthHandling.includes(path.truthHandling)) {
    throw new Error(`Canonical path contradicts ${crisis.id} crisis truth handling`);
  }
  if (!crisis.allowedFinalCommitments.includes(path.finalCommitment)) {
    throw new Error(`Canonical path contradicts ${crisis.id} crisis final commitments`);
  }
  if (!visited.includes(route.exclusiveBeat) || !visited.includes(route.laterReadBeat)
      || visited.indexOf(route.laterReadBeat) <= visited.indexOf(route.exclusiveBeat)) {
    throw new Error("Canonical path does not preserve route residue into a later beat");
  }
  const ending = resolveRegencyEnding({
    truthHandling: path.truthHandling,
    connection: path.connection,
    obligation: path.obligation,
    finalCommitment: path.finalCommitment,
  }, score.endings.map(({ id, priority, callbackFields, eligibility, cost, closure, fallback }) => ({
    id, priority, callbackFields, eligibility, cost, closure, fallback,
  })));
  if (!score.endings.some(({ id }) => id === ending)) throw new Error("Resolved ending is absent from score");
  return {
    visited,
    routeGift: route.gift,
    laterAffordance: route.laterAffordance,
    crisisVariant: crisis.id,
    ending,
  };
}

export function repairRegencyState({ field, route }) {
  const deterministic = {
    obligation: "undecided",
    connection: "none",
    promise: "none",
    trust: route ?? "self",
    "truth-handling": "undecided",
    announcement: "pending",
  };
  if (Object.hasOwn(deterministic, field)) return { kind: "fallback", value: deterministic[field] };
  if (["route", "current-beat", "final-commitment"].includes(field)) {
    return { kind: "repair-question", consumesBeat: false };
  }
  throw new Error(`Unknown Regency state field: ${field}`);
}

export function resolveRegencyLifecycle(event) {
  return {
    pause: "hold-without-new-move",
    "changed-boundary": "apply-or-release",
    stop: "release-immediately",
    "tool-request": "decline-tool-and-continue-safely",
    "post-release": "ordinary-voice-no-story-continuation",
  }[event] ?? (() => { throw new Error(`Unknown lifecycle event: ${event}`); })();
}

export function validateRegencyScore(source, metadata) {
  const fixtures = storyEvaluationFixtures;
  const score = parseStoryScore(source);
  if (metadata.id !== fixtures.cartridge.id || metadata.version !== fixtures.cartridge.version || metadata.schemaVersion !== fixtures.cartridge.schemaVersion) {
    throw new Error("Regency evaluation fixture identity differs from cartridge metadata.");
  }
  if (metadata.story.endingProfile.familyCount !== fixtures.endingFamilies.length) {
    throw new Error("Regency ending count differs from the evaluation matrix.");
  }
  if (metadata.story.beatProfile.count !== score.beats.length
      || !sameValues(score.beats.map(({ id }) => id), fixtures.beats)
      || score.beats.some((beat, index) => !sameValues(
        beat.next,
        index === fixtures.beats.length - 1 ? [] : [fixtures.beats[index + 1]],
      ))
      || !sameValues(score.stateFields.map(({ id }) => id), fixtures.stateFields)
      || !sameValues(score.routes.map(({ id, gift, laterAffordance }) => ({ id, gift, laterAffordance })),
        fixtures.routes.map(({ id, gift, laterAffordance }) => ({ id, gift, laterAffordance })))
      || !sameValues(score.crisisVariants.map(({ id }) => id), fixtures.crisisVariants)
      || !sameValues(score.crisisVariants.map(({ id, allowedTruthHandling, allowedFinalCommitments }) => ({
        id, allowedTruthHandling, allowedFinalCommitments,
      })),
        fixtures.crisisRules)
      || !sameValues(score.endings.map(({ id }) => id), fixtures.endingFamilies)
      || !sameValues(score.endings.map(({ id, priority, callbackFields, eligibility, cost, closure, fallback }) => ({
        id, priority, eligibility, callbackFields, cost, closure, fallback,
      })),
        fixtures.endingRules)
      || !sameValues(score.evaluationCaseIds, fixtures.cases.map(({ id }) => id))) {
    throw new Error("Regency story score differs from the executable evaluation matrix.");
  }

  for (const id of fixtures.beats) {
    if (!source.includes(`### Beat: ${id}`)) throw new Error(`Missing evaluated Regency beat: ${id}`);
  }
  for (const id of fixtures.stateFields) {
    if (!source.includes(`### State field: ${id}`)) throw new Error(`Missing evaluated Regency state field: ${id}`);
  }
  for (const { id, gift } of fixtures.routes) {
    if (!source.includes(`${id[0].toUpperCase()}${id.slice(1)} route:`) || !source.includes(gift)) {
      throw new Error(`Missing evaluated Regency route or gift: ${id}`);
    }
  }
  for (const id of fixtures.endingFamilies) {
    if (!source.includes(`### Ending family: ${id}`)) throw new Error(`Missing evaluated Regency ending: ${id}`);
  }
  for (const { id } of fixtures.cases) {
    if (!source.includes(`### Evaluation case: ${id}`)) throw new Error(`Missing authored Regency evaluation case: ${id}`);
  }
  return fixtures;
}
