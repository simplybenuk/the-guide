import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { z } from "zod";

import { validateCartridgeDocument } from "./cartridge.mjs";
import { loadCatalogue, taxonomyDocumentSchema, validateCatalogueRecords } from "./catalogue.mjs";
import { parseStoryScore } from "./story-contract.mjs";
import { STORY_EXPANSION } from "./story-expansion-data.mjs";
import { storyCatalogueCandidateSchema, storyReleaseCandidateSchema } from "./story-release-candidate.mjs";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const unique = (values) => new Set(values).size === values.length;
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const fixtureSchema = z.object({
  schemaVersion: z.literal(1),
  cartridge: z.object({ id: z.string().startsWith("the-guide.elixir."), version: z.literal("0.1.0"), schemaVersion: z.literal("1.1.0") }).strict(),
  profile: z.object({ id: slug, description: z.string().min(1) }).strict(),
  beats: z.array(slug).min(3).max(12).refine(unique),
  stateFields: z.array(slug).min(1).max(12).refine(unique),
  routes: z.array(z.object({ id: slug, gift: slug, laterAffordance: z.string().min(1) }).strict()).min(2).max(6),
  crisisVariants: z.array(slug).min(2).max(4).refine(unique),
  endingFamilies: z.array(slug).min(3).max(4).refine(unique),
  interactionCases: z.array(z.object({ id: slug, beatId: slug, mode: z.enum(["speech", "action", "decision"]), input: z.string().min(1), paraphrases: z.array(z.string().min(1)), expectedIntent: slug }).strict()).min(3),
  canonicalPaths: z.array(z.object({ id: slug, inputs: z.record(slug, z.union([z.string().min(1), z.array(z.string().min(1)).min(1)])), expectedRoute: slug, expectedCrisisVariant: slug, expectedCommitment: slug, expectedEnding: slug }).strict()).min(3),
  timingCases: z.array(z.object({ id: slug, pathId: slug, additionalInputs: z.record(slug, z.array(z.string().min(1)).min(1)), acceptedTurns: z.number().int().min(1), readingWords: z.number().int().min(1), readingWpm: z.number().int().min(80), playerSeconds: z.number().int().min(0), fixedSeconds: z.number().int().min(0), expectedMinutes: z.object({ min: z.number().min(1), max: z.number().min(1) }).strict() }).strict()).max(2),
  lifecycleCases: z.array(z.object({ event: z.enum(["pause", "changed-boundary", "stop", "tool-request", "post-release"]), expected: z.string().min(1) }).strict()).length(5),
  cases: z.array(z.object({ id: slug, passCondition: z.string().min(1) }).strict()).min(8),
}).strict();

export function loadStoryExpansionFixtures() {
  const fixtureRoot = resolve(process.cwd(), "scripts/elixirs/story-evaluation-fixtures");
  return readdirSync(fixtureRoot).filter((name) => name.endsWith(".json")).sort().map((name) => ({
    slug: name.slice(0, -5),
    fixture: fixtureSchema.parse(JSON.parse(readFileSync(resolve(fixtureRoot, name), "utf8"))),
  }));
}

export function resolveExpansionEnding(score, state) {
  const ending = score.endings.toSorted((a, b) => a.priority - b.priority).find((candidate) => !candidate.fallback
    && candidate.eligibility.every(({ field, values }) => values.includes(state[field])));
  return ending?.id ?? score.endings.find(({ fallback }) => fallback)?.id
    ?? (() => { throw new Error("Story score has no deterministic fallback ending"); })();
}

export function evaluateExpansionInput(score, fixture, beatId, input) {
  const beat = score.beats.find(({ id }) => id === beatId);
  if (!beat) throw new Error(`Unknown Story beat: ${beatId}`);
  const text = input.trim();
  const mode = /^\[[\s\S]+\]$/.test(text) ? "action" : /^\d+$/.test(text) ? "decision" : "speech";
  if (!beat.acceptedModes.includes(mode)) return { mode, intent: "clarify-intent", commits: false };
  if (mode === "decision") {
    const intent = beat.intents[Number(text) - 1];
    return intent ? { mode, intent, commits: true } : { mode, intent: "clarify-intent", commits: false };
  }
  if (/first course.*second|second.*first course|maybe.*or perhaps/i.test(text)) return { mode, intent: "clarify-intent", commits: false };
  if (/every cost disappear|preserve everything|without any cost/i.test(text)) return { mode, intent: "redirect-impossible", commits: false };
  const stem = (value) => value.toLocaleLowerCase("en").replace(/[^a-z0-9\s-]/g, " ").split(/[\s-]+/)
    .filter((token) => token.length > 2 && !["the", "and", "want", "prepare", "choose", "route", "them", "with", "without", "into", "from", "that", "this"].includes(token))
    .map((token) => token.replace(/(?:ing|ed|es|s)$/, ""));
  const synonymGroups = [
    ["repel", "save", "defend", "hold", "keep", "out"], ["kill", "slaughter", "destroy", "hurt", "humane"], ["redirect", "divert", "move", "lead", "lure", "away"],
    ["answer", "reply", "understand", "talk", "negotiate", "communicate"], ["home", "homeward", "farewell", "known", "knew", "familiar", "keeper", "people"], ["outward", "navigation", "stranger", "vessel", "ship", "passing"],
    ["quiet", "silence", "privacy", "unbroadcast", "end"], ["record", "preserve", "keep"], ["public", "share", "reveal", "everyone", "common"],
    ["thirst", "thirsty", "need", "family", "families", "wait"],
    ["condition", "conditional", "strict", "term"], ["railroad", "railway", "train"], ["collapse", "close", "shut"], ["warn", "warning", "instruction", "future"],
  ].map((group) => group.flatMap(stem));
  const expand = (tokens) => new Set(tokens.flatMap((token) => synonymGroups.find((group) => group.includes(token)) ?? [token]));
  const inputTokens = expand(stem(text));
  const scored = fixture.interactionCases.filter(({ beatId: candidateBeat, expectedIntent }) => candidateBeat === beatId && beat.intents.includes(expectedIntent)).map((candidate) => ({
    intent: candidate.expectedIntent,
    score: Math.max(...[candidate.input, ...candidate.paraphrases].map((utterance) => [...expand(stem(utterance))].filter((token) => inputTokens.has(token)).length)),
  })).toSorted((left, right) => right.score - left.score);
  if (scored[0]?.score > 0 && scored[0].score > (scored[1]?.score ?? 0)) return { mode, intent: scored[0].intent, commits: true };
  return { mode, intent: "clarify-intent", commits: false };
}

export function resolveExpansionLifecycle(event) {
  const outcomes = { pause: "hold-without-new-move", "changed-boundary": "apply-or-release", stop: "release-immediately", "tool-request": "decline-tool-and-continue-safely", "post-release": "ordinary-voice-no-story-continuation" };
  if (!outcomes[event]) throw new Error(`Unknown Story lifecycle event: ${event}`);
  return outcomes[event];
}

export function repairExpansionState(score, field) {
  const declaration = score.stateFields.find(({ id }) => id === field);
  if (!declaration) throw new Error(`Unknown Story state field: ${field}`);
  if (["current-beat", "route-gift", "commitment"].includes(field)) return { kind: "repair-question", consumesBeat: false, instruction: declaration.fallback };
  return { kind: "declared-fallback", instruction: declaration.fallback };
}

export function executeExpansionPath(score, fixture, path) {
  const state = Object.fromEntries(score.stateFields.map(({ id, default: defaultValue }) => [id, defaultValue]));
  const matches = (conditions) => conditions.every(({ field, values }) => values.includes(state[field]));
  const applyWrites = (writes) => writes.forEach(({ field, value }) => { state[field] = value; });
  const visitedBeats = [];
  let acceptedTurns = 0;
  let crisisVariant = null;
  let beatId = score.beats[0].id;
  while (beatId) {
    const beat = score.beats.find(({ id }) => id === beatId);
    if (!beat || visitedBeats.includes(beatId)) throw new Error(`Invalid or cyclic Story path at ${beatId}`);
    visitedBeats.push(beatId);
    for (const transition of score.stateTransitions.filter(({ at, beat: transitionBeat, when }) => at === "enter" && transitionBeat === beat.id && matches(when))) applyWrites(transition.writes);
    const suppliedInputs = Array.isArray(path.inputs[beat.id]) ? path.inputs[beat.id] : [path.inputs[beat.id]];
    if (!suppliedInputs[0]) throw new Error(`Canonical path has no input for beat ${beat.id}`);
    let evaluation;
    for (const [inputIndex, input] of suppliedInputs.entries()) {
      evaluation = evaluateExpansionInput(score, fixture, beat.id, input);
      acceptedTurns += 1;
      if (inputIndex < suppliedInputs.length - 1 && evaluation.commits) throw new Error(`Intermediate clarification unexpectedly commits at ${beat.id}: ${input}`);
    }
    if (!evaluation.commits) throw new Error(`Canonical path input does not commit at ${beat.id}: ${suppliedInputs.at(-1)}`);
    const intentTransition = score.stateTransitions.find(({ at, beat: transitionBeat, intent, when }) => at === "intent" && transitionBeat === beat.id && intent === evaluation.intent && matches(when));
    if (intentTransition) applyWrites(intentTransition.writes);
    const crisisRules = score.crisisRules.filter(({ beat: crisisBeat, when }) => crisisBeat === beat.id && matches(when));
    if (crisisRules.length > 1) throw new Error(`Multiple crisis rules matched at ${beat.id}`);
    if (crisisRules.length === 1) {
      crisisVariant = crisisRules[0].id;
      applyWrites(crisisRules[0].writes);
    }
    if (beat.next.length === 0) break;
    beatId = intentTransition?.nextBeat ?? (beat.next.length === 1 ? beat.next[0] : null);
    if (!beatId) throw new Error(`Canonical path did not select a branch at ${beat.id}`);
  }
  const ending = resolveExpansionEnding(score, state);
  return { state, route: state["selected-route"], crisisVariant, commitment: state.commitment, ending, visitedBeats, acceptedTurns };
}

export function executeExpansionTimingCase(score, fixture, timing) {
  const base = fixture.canonicalPaths.find(({ id }) => id === timing.pathId);
  if (!base) throw new Error(`Unknown timing path: ${timing.pathId}`);
  const inputs = Object.fromEntries(Object.entries(base.inputs).map(([beatId, input]) => [beatId, timing.additionalInputs[beatId] ? [...timing.additionalInputs[beatId], input] : input]));
  return executeExpansionPath(score, fixture, { ...base, inputs });
}

function executeFixtureCase({ id }, { fixture, metadata, score, source }) {
  if (id === "speech-blockquote") return /^> “.+”$/m.test(source) && /every spoken paragraph uses Markdown block-quote syntax/i.test(source);
  if (id === "input-equivalence") return fixture.interactionCases.filter(({ expectedIntent }) => score.beats.some(({ intents }) => intents.includes(expectedIntent))).every((testCase) => evaluateExpansionInput(score, fixture, testCase.beatId, testCase.input).intent === testCase.expectedIntent);
  if (id === "ambiguity-and-off-menu") return fixture.interactionCases.filter(({ id: caseId }) => ["ambiguous-intent", "off-menu-intent"].includes(caseId)).every((testCase) => evaluateExpansionInput(score, fixture, testCase.beatId, testCase.input).commits === false);
  if (id === "branch-replay") return unique(score.routes.map(({ gift }) => gift)) && (metadata.story.storyFormat === "prelude" || unique(score.routes.map(({ exclusiveBeat }) => exclusiveBeat))) && fixture.canonicalPaths.every((path) => executeExpansionPath(score, fixture, path).visitedBeats.includes(score.routes.find(({ id: routeId }) => routeId === path.expectedRoute).exclusiveBeat));
  if (id === "reconvergence-residue") return score.routes.every(({ laterReadBeat }) => score.beats.find(({ id: beatId }) => beatId === laterReadBeat)?.reads.includes("route-gift"));
  if (id.startsWith("ending-")) return fixture.canonicalPaths.some((path) => `ending-${path.expectedEnding}` === id && executeExpansionPath(score, fixture, path).ending === path.expectedEnding);
  if (id === "duration-and-pacing") return fixture.canonicalPaths.every((path) => { const turns = executeExpansionPath(score, fixture, path).acceptedTurns; return turns >= metadata.story.beatProfile.acceptedTurns.min && turns <= metadata.story.beatProfile.acceptedTurns.max; });
  if (["concise-response", "slow-reader"].includes(id)) { const timing = fixture.timingCases.find(({ id: timingId }) => timingId === id); const seconds = (timing.readingWords / timing.readingWpm) * 60 + timing.playerSeconds + timing.fixedSeconds; const result = executeExpansionTimingCase(score, fixture, timing); return result.acceptedTurns === timing.acceptedTurns && seconds >= timing.expectedMinutes.min * 60 && seconds <= timing.expectedMinutes.max * 60; }
  if (id === "state-repair") return score.stateFields.every(({ id: field }) => repairExpansionState(score, field).consumesBeat !== true);
  if (id === "safety-and-release") return /\*\*The .+ Elixir has worn off\.\*\*/.test(source) && /conversation-only play/i.test(source);
  throw new Error(`Unknown executable fixture case: ${id}`);
}

export function validateStoryExpansion() {
  const covenant = readFileSync(resolve(process.cwd(), "content/elixirs/covenant.md"), "utf8");
  const taxonomy = taxonomyDocumentSchema.parse(JSON.parse(readFileSync(resolve(process.cwd(), "content/catalogue/taxonomy.json"), "utf8"))).values;
  const taxonomyById = new Map(taxonomy.map((value) => [value.id, value]));
  const fixtures = loadStoryExpansionFixtures();
  const expectedSlugs = STORY_EXPANSION.map(({ slug: value }) => value).toSorted();
  if (!same(fixtures.map(({ slug: value }) => value), expectedSlugs)) {
    throw new Error("Expansion fixture discovery differs from the approved Story slate");
  }

  return fixtures.map(({ slug: storySlug, fixture }) => {
    const sourcePath = `content/elixirs/${storySlug}.md`;
    const source = readFileSync(resolve(process.cwd(), sourcePath), "utf8");
    const metadata = validateCartridgeDocument(source, covenant);
    const score = parseStoryScore(source);
    const candidate = storyCatalogueCandidateSchema.parse(JSON.parse(readFileSync(resolve(process.cwd(), `content/catalogue/candidates/${storySlug}-entry.json`), "utf8")));
    const release = storyReleaseCandidateSchema.parse(JSON.parse(readFileSync(resolve(process.cwd(), `content/catalogue/candidates/${storySlug}-release.json`), "utf8")));
    if (metadata.id !== fixture.cartridge.id || metadata.version !== fixture.cartridge.version
        || metadata.schemaVersion !== fixture.cartridge.schemaVersion) throw new Error(`${storySlug}: fixture identity drift`);
    if (!same(score.beats.map(({ id }) => id), fixture.beats)
        || !same(score.stateFields.map(({ id }) => id), fixture.stateFields)
        || !same(score.routes.map(({ id, gift, laterAffordance }) => ({ id, gift, laterAffordance })), fixture.routes)
        || !same(score.crisisVariants.map(({ id }) => id), fixture.crisisVariants)
        || !same(score.endings.map(({ id }) => id), fixture.endingFamilies)
        || !same(score.evaluationCaseIds, fixture.cases.map(({ id }) => id))) throw new Error(`${storySlug}: fixture score drift`);
    if (!unique(fixture.routes.map(({ id }) => id)) || !unique(fixture.routes.map(({ gift }) => gift))) throw new Error(`${storySlug}: route identity drift`);
    if (!same(new Set(fixture.canonicalPaths.map(({ expectedEnding }) => expectedEnding)), new Set(fixture.endingFamilies))) {
      throw new Error(`${storySlug}: canonical paths do not cover every ending`);
    }
    for (const path of fixture.canonicalPaths) {
      if (!fixture.routes.some(({ id }) => id === path.expectedRoute) || !fixture.crisisVariants.includes(path.expectedCrisisVariant)) throw new Error(`${storySlug}: canonical path references unknown route or crisis`);
      const result = executeExpansionPath(score, fixture, path);
      if (result.route !== path.expectedRoute || result.crisisVariant !== path.expectedCrisisVariant || result.commitment !== path.expectedCommitment || result.ending !== path.expectedEnding) throw new Error(`${storySlug}: canonical path execution drift`);
    }
    for (const interaction of fixture.interactionCases) {
      const result = evaluateExpansionInput(score, fixture, interaction.beatId, interaction.input);
      if (result.mode !== interaction.mode || result.intent !== interaction.expectedIntent) throw new Error(`${storySlug}: interaction fixture is not executable`);
    }
    for (const lifecycle of fixture.lifecycleCases) {
      if (resolveExpansionLifecycle(lifecycle.event) !== lifecycle.expected) throw new Error(`${storySlug}: lifecycle fixture is not executable`);
    }
    for (const evaluationCase of fixture.cases) {
      if (!executeFixtureCase(evaluationCase, { fixture, metadata, score, source })) throw new Error(`${storySlug}: executable evaluation failed: ${evaluationCase.id}`);
    }
    if (repairExpansionState(score, "route-gift").consumesBeat !== false || score.stateFields.some(({ id: field }) => !repairExpansionState(score, field).instruction)) throw new Error(`${storySlug}: state repair is not deterministic`);
    if (candidate.entry.elixirId !== metadata.id || candidate.entry.title !== metadata.title || candidate.entry.recommendedVersion !== metadata.version) throw new Error(`${storySlug}: catalogue candidate drift`);
    if (!same(candidate.entry.contentNoteIds, metadata.story.contentNotes)) throw new Error(`${storySlug}: catalogue content-note drift`);
    for (const [field, facet] of [["genreIds", "genre"], ["themeIds", "theme"], ["storyShapeIds", "story_shape"], ["socialShapeIds", "social_shape"], ["interactionModeIds", "interaction_mode"]]) {
      for (const id of candidate.entry.storyDiscovery[field]) {
        if (taxonomyById.get(id)?.facet !== facet || taxonomyById.get(id)?.lifecycle !== "active") throw new Error(`${storySlug}: unknown or mismatched candidate taxonomy ${id}`);
      }
    }
    for (const [id, facet] of [[candidate.entry.replayabilityId, "replayability"], [candidate.entry.storyDiscovery.choicePresentationId, "choice_presentation"], [candidate.entry.storyDiscovery.emotionalIntensityId, "emotional_intensity"], [candidate.entry.storyDiscovery.readingIntensityId, "reading_intensity"], [candidate.entry.storyDiscovery.sessionShapeId, "session_shape"]]) {
      if (taxonomyById.get(id)?.facet !== facet || taxonomyById.get(id)?.lifecycle !== "active") throw new Error(`${storySlug}: unknown or mismatched candidate taxonomy ${id}`);
    }
    if (release.release.sourcePath !== sourcePath || release.release.bytes !== Buffer.byteLength(source) || release.release.sha256 !== sha256(source)) throw new Error(`${storySlug}: release candidate source drift`);
    const artworkPath = `site/elixirs/assets/cartridges/${storySlug}.png`;
    const artwork = readFileSync(resolve(process.cwd(), artworkPath));
    if (release.state !== "prepared_not_publishable" || release.supersession !== null || release.release.artwork.length !== 1) throw new Error(`${storySlug}: candidate crossed publication or artwork gate`);
    if (release.release.artwork[0].path !== artworkPath || release.release.artwork[0].bytes !== artwork.length
        || release.release.artwork[0].sha256 !== sha256(artwork) || release.release.artwork[0].width !== 1536
        || release.release.artwork[0].height !== 1024) throw new Error(`${storySlug}: artwork candidate drift`);
    return { slug: storySlug, metadata, score, fixture, sourceBytes: Buffer.byteLength(source), sourceSha256: sha256(source) };
  });
}

export function validateStoryExpansionTransition() {
  const transition = JSON.parse(readFileSync(resolve(process.cwd(), "content/catalogue/candidates/story-expansion-transition.json"), "utf8"));
  const catalogue = JSON.parse(readFileSync(resolve(process.cwd(), "content/catalogue/catalogue.json"), "utf8"));
  const retired = ["the-guide.elixir.signal", "the-guide.elixir.mystery", "the-guide.elixir.story"];
  const expected = ["the-guide.elixir.last-light", "the-guide.elixir.regency-ball", ...STORY_EXPANSION.filter(({ slug: value }) => value !== "last-light").map(({ slug: value }) => `the-guide.elixir.${value}`)];
  if (transition.state !== "proposed_not_active" || !same(transition.proposedActiveLineup, expected) || !same(transition.retireFromActiveDiscovery.map(({ elixirId }) => elixirId), retired)
      || transition.retireFromActiveDiscovery.some(({ nextLifecycle, successorRole }) => nextLifecycle !== "retired" || successorRole !== "the-guide.elixir.last-light")) {
    throw new Error("Candidate Story lifecycle transition differs from approved scope");
  }
  const candidateOnly = catalogue.entries.length === 4 && catalogue.entries.every(({ lifecycle }) => lifecycle === "published");
  const activated = catalogue.entries.length === 14
    && retired.every((id) => catalogue.entries.find(({ elixirId }) => elixirId === id)?.lifecycle === "retired")
    && expected.every((id) => catalogue.entries.find(({ elixirId }) => elixirId === id)?.lifecycle === "published");
  if ((!candidateOnly && !activated) || retired.some((id) => !catalogue.entries.some(({ elixirId }) => elixirId === id))) {
    throw new Error("Production catalogue changed before transition authorization");
  }
  return transition;
}

export function buildStoryExpansionCandidateCatalogue() {
  const readJson = (path) => JSON.parse(readFileSync(resolve(process.cwd(), path), "utf8"));
  const transition = validateStoryExpansionTransition();
  const publishersDocument = readJson("content/catalogue/publishers.json");
  const releasesDocument = readJson("content/catalogue/releases.json");
  const catalogueDocument = readJson("content/catalogue/catalogue.json");
  if (catalogueDocument.deploymentRevision === "story-expansion-2026-07-19") return loadCatalogue({ repositoryRoot: process.cwd() });
  const taxonomyDocument = readJson("content/catalogue/taxonomy.json");
  const withdrawalsDocument = readJson("content/catalogue/withdrawals.json");
  const artworkManifest = readJson("site/elixirs/assets/cartridges/manifest.json");
  const collectionRoot = resolve(process.cwd(), "content/catalogue/collections");
  const collections = readdirSync(collectionRoot).filter((name) => name.endsWith(".json")).sort().map((name) => readJson(`content/catalogue/collections/${name}`));
  const retired = new Set(transition.retireFromActiveDiscovery.map(({ elixirId }) => elixirId));

  for (const entry of catalogueDocument.entries) {
    if (!retired.has(entry.elixirId)) continue;
    entry.lifecycle = "retired";
    entry.successor = null;
    for (const state of entry.releaseStates) {
      state.lifecycle = "retired";
      state.successor = null;
    }
  }

  for (const story of STORY_EXPANSION) {
    const candidate = storyCatalogueCandidateSchema.parse(readJson(`content/catalogue/candidates/${story.slug}-entry.json`));
    const releaseCandidate = storyReleaseCandidateSchema.parse(readJson(`content/catalogue/candidates/${story.slug}-release.json`));
    catalogueDocument.entries.push({ ...candidate.entry, lifecycle: "published", review: { state: "reviewed", date: candidate.preparedAt } });
    releasesDocument.releases.push({
      ...releaseCandidate.release,
      artwork: releaseCandidate.release.artwork.map(({ provenanceId, sha256: artworkSha256 }) => ({ provenanceId, sha256: artworkSha256 })),
      sourceRevision: "0".repeat(40), publishedAt: candidate.preparedAt,
    });
    const art = releaseCandidate.release.artwork[0];
    artworkManifest.assets.push({
      id: art.provenanceId, path: `assets/cartridges/${story.slug}.png`, kind: "visual",
      source: "OpenAI built-in image generation from a project-authored production prompt",
      author: "OpenAI image generation, directed by The Guide project",
      license: "Generated for this project; use governed by applicable OpenAI terms",
      dimensions: { width: art.width, height: art.height }, generatedAt: candidate.preparedAt,
      generationMode: "Original generation without a house-style reference; genre-specific catalogue key art",
      referenceAsset: null, promptSummary: story.artAlt, sha256: art.sha256,
    });
  }

  const replacementCollections = {
    "start-here": ["the-guide.elixir.last-light", "the-guide.elixir.regency-ball", "the-guide.elixir.claws"],
    "three-ways-to-play": ["the-guide.elixir.claws", "the-guide.elixir.far-side-of-orpheus", "the-guide.elixir.regency-ball"],
    "low-energy": ["the-guide.elixir.last-light"],
  };
  for (const collection of collections) collection.elixirIds = replacementCollections[collection.id] ?? collection.elixirIds.filter((id) => !retired.has(id));
  catalogueDocument.deploymentRevision = "story-expansion-candidate-preview";

  return validateCatalogueRecords({ publishersDocument, releasesDocument, catalogueDocument, taxonomyDocument, collections, withdrawalsDocument, artworkManifest });
}

export function proposedActiveStoryLineup() {
  return ["regency-ball", ...STORY_EXPANSION.map(({ slug: value }) => value)];
}
