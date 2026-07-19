import { z } from "zod";

export const STORY_SECTION_HEADINGS = Object.freeze([
  "## Story identity and dramatic contract",
  "## Player role and cast",
  "## Interaction and chat presentation contract",
  "## World truths and information schedule",
  "## State ledger",
  "## Beat map",
  "## Branch and reconvergence rules",
  "## Climax and ending families",
  "## Recap and state repair",
  "## Memento and release",
  "## Performance direction",
  "## Evaluation cases",
]);

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const unique = (values) => new Set(values).size === values.length;
const uniqueSlugs = (message) => z.array(slug).refine(unique, message);

const beatSchema = z.object({
  id: slug,
  type: z.enum(["required", "branch", "alternate", "merge", "quiet", "conditional", "climax"]),
  purpose: z.string().trim().min(1).max(240),
  requiredFacts: uniqueSlugs("Beat required facts must be unique").min(1),
  acceptedModes: z.array(z.enum(["speech", "action", "decision"])).min(1).refine(unique,
    "Beat interaction modes must be unique"),
  intents: uniqueSlugs("Beat intents must be unique").min(1),
  reads: uniqueSlugs("Beat state reads must be unique"),
  writes: uniqueSlugs("Beat state writes must be unique"),
  next: uniqueSlugs("Beat exits must be unique"),
  interactionFocus: z.literal(1),
}).strict();

const storyScoreSchema = z.object({
  schemaVersion: z.literal(1),
  beats: z.array(beatSchema).min(3).refine((values) => unique(values.map(({ id }) => id)),
    "Beat IDs must be unique"),
  stateFields: z.array(z.object({
    id: slug,
    fallback: z.string().trim().min(1).max(240),
  }).strict()).min(1).max(12).refine((values) => unique(values.map(({ id }) => id)),
    "State field IDs must be unique"),
  routes: z.array(z.object({
    id: slug,
    gift: slug,
    exclusiveBeat: slug,
    laterReadBeat: slug,
    laterAffordance: z.string().trim().min(1).max(240),
  }).strict()).min(2).max(6).refine((values) => unique(values.map(({ id }) => id))
    && unique(values.map(({ gift }) => gift))
    && unique(values.map(({ laterAffordance }) => laterAffordance)),
  "Route IDs, gifts, and later affordances must be unique"),
  crisisVariants: z.array(z.object({
    id: slug,
    beat: slug,
    allowedTruthHandling: uniqueSlugs("Crisis truth-handling values must be unique").min(1),
    allowedFinalCommitments: uniqueSlugs("Crisis final commitments must be unique").min(1),
  }).strict()).min(2).max(4)
    .refine((values) => unique(values.map(({ id }) => id)), "Crisis variant IDs must be unique"),
  endings: z.array(z.object({
    id: slug,
    priority: z.number().int().min(1).max(4),
    requiredStateFields: uniqueSlugs("Ending state fields must be unique").min(2),
    callbackFields: uniqueSlugs("Ending callback fields must be unique").min(2),
    eligibility: z.array(z.object({
      field: slug,
      values: uniqueSlugs("Ending eligibility values must be unique").min(1),
    }).strict()).max(4),
    cost: z.string().trim().min(1).max(240),
    closure: z.string().trim().min(1).max(240),
    fallback: z.boolean(),
  }).strict()).min(3).max(4).refine((values) => unique(values.map(({ id }) => id))
    && unique(values.map(({ priority }) => priority)), "Ending IDs and priorities must be unique"),
  evaluationCaseIds: uniqueSlugs("Evaluation case IDs must be unique").min(1),
}).strict();

const requiredAuthoredBlocks = Object.freeze([
  ["## Interaction and chat presentation contract", "Interaction moment", /^### Interaction moment: ([a-z0-9]+(?:-[a-z0-9]+)*)$/gm],
  ["## State ledger", "State field", /^### State field: ([a-z0-9]+(?:-[a-z0-9]+)*)$/gm],
  ["## Beat map", "Beat", /^### Beat: ([a-z0-9]+(?:-[a-z0-9]+)*)$/gm],
  ["## Climax and ending families", "Ending family", /^### Ending family: ([a-z0-9]+(?:-[a-z0-9]+)*)$/gm],
  ["## Evaluation cases", "Evaluation case", /^### Evaluation case: ([a-z0-9]+(?:-[a-z0-9]+)*)$/gm],
]);

const presentationRequirements = Object.freeze([
  { pattern: /^\*\*Narrator\*\*$/m, label: "a standalone **Narrator** label" },
  { pattern: /^\*\*Character Name\*\*$/m, label: "a standalone **Character Name** label" },
  { pattern: /^\*\*Your turn\*\*$/m, label: "a standalone **Your turn** label" },
  { pattern: /^\*\*Possible approaches\*\*$/m, label: "a standalone **Possible approaches** label" },
  { pattern: /speak,\s+act,\s+or\s+decide/i, label: "the speak, act, or decide invitation" },
  { pattern: /quotation\s+marks/i, label: "the character-dialogue quotation rule" },
  { pattern: /plain\s+text/i, label: "the plain-text fallback rule" },
  { pattern: /one\s+current\s+interaction\s+focus/i, label: "the single interaction-focus rule" },
  { pattern: /(?:must not|never)\s+speak\s+for\s+the\s+player/i, label: "the do-not-speak-for-the-player rule" },
]);

const normalizeLines = (source) => source.replaceAll("\r\n", "\n").split("\n");
const markerIds = (body, pattern) => [...body.matchAll(pattern)].map((match) => match[1]);
const sameValues = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const labelledBlocks = (body, label) => {
  const pattern = new RegExp(`^### ${label}: ([a-z0-9]+(?:-[a-z0-9]+)*)$`, "gm");
  const matches = [...body.matchAll(pattern)];
  return new Map(matches.map((match, index) => [
    match[1],
    body.slice(match.index + match[0].length, matches[index + 1]?.index ?? body.length).trim(),
  ]));
};

const requireFields = (block, label, fields) => {
  for (const field of fields) {
    if (!new RegExp(`(?:^|\\s)${field}:\\s+\\S`, "m").test(block)) {
      throw new Error(`${label} requires a non-empty ${field} field.`);
    }
  }
};

const paragraphField = (block, field) => {
  const match = block.match(new RegExp(`(?:^|\\n)${field}:\\s+([^\\n]+(?:\\n(?!\\n|[A-Z][A-Za-z ]+:)[^\\n]+)*)`, "m"));
  return match?.[1].replace(/\s+/g, " ").trim().replace(/\.$/, "") ?? null;
};

const listField = (block, field) => paragraphField(block, field)?.split(",").map((value) => value.trim()) ?? [];

const endingEligibilityText = (ending) => ending.fallback
  ? "fallback=true"
  : ending.eligibility.map(({ field, values }) => `${field}=${values.join("|")}`).join("; ");
const normalizedSentence = (value) => value.trim().replace(/\.$/, "");

export function parseStoryScore(source) {
  const matches = [...source.matchAll(/^```story-score\r?\n([\s\S]*?)\r?\n```$/gm)];
  if (matches.length !== 1) {
    throw new Error("Authored Story cartridge must contain exactly one story-score block.");
  }
  let score;
  try {
    score = JSON.parse(matches[0][1]);
  } catch {
    throw new Error("Authored Story story-score block must contain valid JSON.");
  }
  return storyScoreSchema.parse(score);
}

const validateScoreGraph = (score) => {
  const beatIds = score.beats.map(({ id }) => id);
  const beatIdSet = new Set(beatIds);
  const stateIds = new Set(score.stateFields.map(({ id }) => id));
  const references = new Set();

  for (const [index, beat] of score.beats.entries()) {
    if (index === score.beats.length - 1 && beat.next.length !== 0) {
      throw new Error("The final authored beat must be terminal.");
    }
    if (index < score.beats.length - 1 && beat.next.length === 0) {
      throw new Error(`Authored beat has no exit: ${beat.id}`);
    }
    for (const next of beat.next) {
      if (!beatIdSet.has(next)) throw new Error(`Authored beat has an unknown exit: ${beat.id} -> ${next}`);
    }
    for (const field of [...beat.reads, ...beat.writes]) {
      if (!stateIds.has(field)) throw new Error(`Authored beat references an unknown state field: ${field}`);
      references.add(field);
    }
  }

  const reachable = new Set();
  const queue = [beatIds[0]];
  while (queue.length > 0) {
    const id = queue.shift();
    if (reachable.has(id)) continue;
    reachable.add(id);
    queue.push(...score.beats.find((beat) => beat.id === id).next);
  }
  if (reachable.size !== beatIds.length) throw new Error("Authored Story graph contains an unreachable beat.");

  for (const field of stateIds) {
    if (!references.has(field)) throw new Error(`Authored state field is never read or written: ${field}`);
    const written = score.beats.some(({ writes }) => writes.includes(field));
    const read = score.beats.some(({ reads }) => reads.includes(field));
    if (!written || !read) throw new Error(`Authored state field needs both a writer and reader: ${field}`);
  }
  for (const route of score.routes) {
    if (!beatIdSet.has(route.exclusiveBeat) || !beatIdSet.has(route.laterReadBeat)) {
      throw new Error(`Authored route references an unknown beat: ${route.id}`);
    }
    if (beatIds.indexOf(route.laterReadBeat) <= beatIds.indexOf(route.exclusiveBeat)) {
      throw new Error(`Authored route consequence must recur later: ${route.id}`);
    }
    const exclusiveBeat = score.beats.find(({ id }) => id === route.exclusiveBeat);
    const laterBeat = score.beats.find(({ id }) => id === route.laterReadBeat);
    if (!exclusiveBeat.writes.includes("route-gift") || !laterBeat.reads.includes("route-gift")) {
      throw new Error(`Authored route gift needs a scored write and later read: ${route.id}`);
    }
  }
  for (const variant of score.crisisVariants) {
    if (!beatIdSet.has(variant.beat)) throw new Error(`Crisis variant references an unknown beat: ${variant.id}`);
  }
  for (const ending of score.endings) {
    for (const field of [...ending.requiredStateFields, ...ending.callbackFields]) {
      if (!stateIds.has(field)) throw new Error(`Ending references an unknown state field: ${ending.id}/${field}`);
    }
    for (const condition of ending.eligibility) {
      if (condition.field !== "final-commitment" && !stateIds.has(condition.field)) {
        throw new Error(`Ending eligibility references an unknown state field: ${ending.id}/${condition.field}`);
      }
      if (condition.field !== "final-commitment" && !ending.requiredStateFields.includes(condition.field)) {
        throw new Error(`Ending eligibility field is absent from requiredStateFields: ${ending.id}/${condition.field}`);
      }
    }
  }
  if (score.endings.filter(({ fallback }) => fallback).length !== 1) {
    throw new Error("Authored Story requires exactly one deterministic fallback ending.");
  }
  if (!sameValues([...score.endings.map(({ priority }) => priority)].sort((a, b) => a - b),
    score.endings.map((_, index) => index + 1))) {
    throw new Error("Authored ending priorities must be contiguous from one.");
  }
};

export function validateStoryAuthoringStructure(source, covenant, storyMetadata) {
  if (typeof source !== "string" || source.trim().length === 0) {
    throw new Error("Authored Story source must be non-empty text.");
  }
  if (typeof covenant !== "string" || covenant.trim().length === 0) {
    throw new Error("The canonical covenant is required for authored Story validation.");
  }

  const lines = normalizeLines(source);
  const positions = [];
  for (const heading of STORY_SECTION_HEADINGS) {
    const matches = lines.flatMap((line, index) => line === heading ? [index] : []);
    if (matches.length !== 1) throw new Error(`Authored Story cartridge must contain exactly one "${heading}" section.`);
    positions.push(matches[0]);
  }
  const covenantStart = source.indexOf(covenant.trim());
  if (covenantStart === -1) throw new Error("Authored Story cartridge must contain the canonical covenant.");
  const covenantEnd = covenantStart + covenant.trim().length;
  if (source.indexOf(STORY_SECTION_HEADINGS[0]) < covenantEnd) {
    throw new Error("Authored Story sections must appear after the embedded covenant.");
  }
  for (let index = 1; index < positions.length; index += 1) {
    if (positions[index] <= positions[index - 1]) throw new Error("Authored Story sections must appear in the required order.");
  }

  const sections = new Map();
  for (let index = 0; index < STORY_SECTION_HEADINGS.length; index += 1) {
    const body = lines.slice(positions[index] + 1, positions[index + 1] ?? lines.length).join("\n").trim();
    if (body.length === 0) throw new Error(`Authored Story section "${STORY_SECTION_HEADINGS[index]}" must not be empty.`);
    sections.set(STORY_SECTION_HEADINGS[index], body);
  }

  const authoredIds = new Map();
  for (const [heading, label, pattern] of requiredAuthoredBlocks) {
    const ids = markerIds(sections.get(heading), pattern);
    if (ids.length === 0) throw new Error(`Authored Story section "${heading}" requires a labelled ${label} block.`);
    if (!unique(ids)) throw new Error(`Authored Story ${label} IDs must be unique.`);
    authoredIds.set(label, ids);
  }

  for (const { pattern, label } of presentationRequirements) {
    if (!pattern.test(sections.get("## Interaction and chat presentation contract"))) {
      throw new Error(`Authored Story presentation contract requires ${label}.`);
    }
  }

  const score = parseStoryScore(sections.get("## Branch and reconvergence rules"));
  validateScoreGraph(score);
  if (score.beats.length !== storyMetadata.beatProfile.count
      || !sameValues(score.beats.map(({ id }) => id), authoredIds.get("Beat"))) {
    throw new Error("Authored beat blocks must exactly match the declared beat count and score order.");
  }
  if (!sameValues(score.stateFields.map(({ id }) => id), authoredIds.get("State field"))) {
    throw new Error("Authored State field blocks must exactly match the story score.");
  }
  if (score.endings.length !== storyMetadata.endingProfile.familyCount
      || !sameValues(score.endings.map(({ id }) => id), authoredIds.get("Ending family"))) {
    throw new Error("Authored ending blocks must exactly match the declared ending count and score order.");
  }
  if (!sameValues(score.evaluationCaseIds, authoredIds.get("Evaluation case"))) {
    throw new Error("Authored evaluation-case blocks must exactly match the story score.");
  }
  const beatBlocks = labelledBlocks(sections.get("## Beat map"), "Beat");
  for (const beat of score.beats) {
    const block = beatBlocks.get(beat.id);
    requireFields(block, `Beat ${beat.id}`, ["Type", "Purpose", "Required facts", "Exit"]);
    if (paragraphField(block, "Type") !== beat.type
        || paragraphField(block, "Purpose") !== beat.purpose
        || !sameValues(listField(block, "Required facts"), beat.requiredFacts)) {
      throw new Error(`Beat ${beat.id} prose must exactly match its scored type, purpose, and required facts.`);
    }
    for (const next of beat.next) {
      if (!block.includes(next)) throw new Error(`Beat ${beat.id} Exit must name its scored destination: ${next}`);
    }
  }
  const stateBlocks = labelledBlocks(sections.get("## State ledger"), "State field");
  for (const { id } of score.stateFields) {
    const block = stateBlocks.get(id);
    requireFields(block, `State field ${id}`, ["Write", "Read"]);
    const writers = score.beats.filter(({ writes }) => writes.includes(id)).map(({ id: beatId }) => beatId);
    const readers = score.beats.filter(({ reads }) => reads.includes(id)).map(({ id: beatId }) => beatId);
    if (!sameValues(listField(block, "Write"), writers) || !sameValues(listField(block, "Read"), readers)) {
      throw new Error(`State field ${id} prose writers/readers must exactly match the story score.`);
    }
  }
  const endingBlocks = labelledBlocks(sections.get("## Climax and ending families"), "Ending family");
  for (const { id } of score.endings) {
    const block = endingBlocks.get(id);
    requireFields(block, `Ending family ${id}`, ["Eligibility", "Cost", "Required callbacks", "Closure"]);
    const ending = score.endings.find((item) => item.id === id);
    if (paragraphField(block, "Eligibility") !== endingEligibilityText(ending)) {
      throw new Error(`Ending family ${id} prose eligibility must exactly match the story score.`);
    }
    if (paragraphField(block, "Cost") !== normalizedSentence(ending.cost)
        || !sameValues(listField(block, "Required callbacks"), ending.callbackFields)
        || paragraphField(block, "Closure") !== normalizedSentence(ending.closure)) {
      throw new Error(`Ending family ${id} prose cost, callbacks, and closure must exactly match the story score.`);
    }
  }
  const evaluationBlocks = labelledBlocks(sections.get("## Evaluation cases"), "Evaluation case");
  for (const id of score.evaluationCaseIds) {
    if (!/\bPass (?:when|only when)\b/i.test(evaluationBlocks.get(id))) {
      throw new Error(`Evaluation case ${id} requires an explicit pass condition.`);
    }
  }
  const allowedModes = new Set(storyMetadata.interactionModes);
  for (const beat of score.beats) {
    if (beat.acceptedModes.some((mode) => !allowedModes.has(mode))) {
      throw new Error(`Beat accepts an interaction mode absent from metadata: ${beat.id}`);
    }
  }
  return score;
}
