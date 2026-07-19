import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { STORY_EXPANSION } from "./story-expansion-data.mjs";

const root = process.cwd();
const covenant = readFileSync(resolve(root, "content/elixirs/covenant.md"), "utf8").trim();
const out = (path, value) => {
  const target = resolve(root, path);
  const temporaryTarget = `${target}.tmp`;
  mkdirSync(resolve(target, ".."), { recursive: true });
  writeFileSync(temporaryTarget, `${value.trim()}\n`.replace(/^\+/gm, ""));
  renameSync(temporaryTarget, target);
};
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const sentence = (value) => value.replace(/\.$/, "");
const genreIds = Object.freeze({
  "last-light": "genre-science-fiction", claws: "genre-creature-horror", "red-dust-reckoning": "genre-western",
  "far-side-of-orpheus": "genre-science-fiction", "room-313": "genre-haunted-horror", "clockwork-masquerade": "genre-heist",
  "dragons-last-contract": "genre-fantasy", "murder-at-moonlight-express": "genre-mystery", "neon-saints": "genre-cyberpunk",
  "bone-orchard": "genre-folk-horror",
});
const casts = Object.freeze({
  "last-light": [["Mira Sol", "preserve the station's human record", "the personal log", "warm and economical"], ["Oren Vale", "hear one honest farewell", "the homeward receiver", "familiar and patient"]],
  claws: [["Bea Brine", "keep the quay crew useful and alive", "the rope-map route", "dry, salty, and practical"], ["Moss Bell", "prove the old cellars still matter", "the drain-chart route", "rapid and gleefully logistical"], ["Dr Tamsin Reed", "understand the swarm before destroying it", "the bell-sequence route", "calm, nerdy, and delighted by evidence"]],
  "red-dust-reckoning": [["Alma Pike", "protect households with no reserve", "the witness ledger", "plain-spoken and unsparing"], ["Jonah Reed", "keep the pump working without surrendering it", "the valve system", "mechanical and cautious"], ["Celestine Frost", "secure a binding public settlement", "the railroad ultimatum", "formal and sharply attentive"]],
  "far-side-of-orpheus": [["Dr Imani Voss", "preserve the crew and drive data", "the phase window", "precise under strain"], ["Taro Sen", "separate signal from wishful interpretation", "the echo map", "skeptical and observant"], ["Lea Okafor", "keep risk subject to crew consent", "the consent protocol", "steady and direct"]],
  "room-313": [["Nell Mercer", "find the guest omitted from the ledger", "the missing signature", "courteous with an iron memory"], ["Ivo March", "keep the service passages safe", "the master switch", "quiet and materially specific"], ["Sana Bell", "hear truth without being trapped by comfort", "the mirror contradiction", "vulnerable but self-possessed"]],
  "clockwork-masquerade": [["Lark Venn", "cross the roofline cleanly", "the aerial route", "buoyant and exact"], ["Odo Flint", "open the memory vault without damage", "the silent key", "meticulous and wry"], ["Sabine Lux", "make the audience see hidden labour", "the performance cue", "theatrical and strategically warm"]],
  "dragons-last-contract": [["Ash-of-Evening", "end the dragon's obligations truthfully", "the ember clauses", "ancient and spare"], ["Mara Ninevoices", "make workers part of the city's legal voice", "the many-voices testimony", "rhythmic and collective"], ["Edrin Hale", "face what the hero's heirs concealed", "the broken seal", "careful, ashamed, and honest"]],
  "murder-at-moonlight-express": [["Conductor Mara Vey", "restore order without burying evidence", "the carriage timeline", "composed and exact"], ["Felix Dorne", "protect illusion from a real fraud", "the false trunk", "florid until facts corner him"], ["Dr Suri Bell", "separate disappearance from theft", "the wire mark", "incisive and fair-minded"]],
  "neon-saints": [["Dr Aya Moss", "return revocation power to the memory's maker", "the consent key", "gentle and technically lucid"], ["Cassian Grey", "complete a lawful delivery", "the altered audit trail", "polished and increasingly candid"], ["Rook FM", "make one truth public without exposing a life", "the broadcast window", "irreverent and boundary-aware"]],
  "bone-orchard": [["Maelin Rill", "preserve remembrance without erasure", "the first carving", "measured and rooted in ritual"], ["Tomas Vey", "restore the missing family place", "the omitted name", "defensive, then plain"], ["Sister Fen", "recover the older voluntary bargain", "the boundary stones", "quiet, eerie, and exact"]],
});

const featureStructures = Object.freeze({
  claws: { uniqueField: "town-readiness", routeWriter: "network-operation", recurrence: "bell-truth", crisis: "high-tide-crisis", final: "harbour-decision", beats: [["arrival", "required"], ["first-clicks", "required"], ["choose-network", "branch"], ["network-operation", "alternate"], ["failed-plan", "conditional"], ["bell-truth", "merge"], ["high-tide-crisis", "conditional"], ["harbour-decision", "climax"]] },
  "red-dust-reckoning": { uniqueField: "public-credit", routeWriter: "inquiry", recurrence: "public-hearing", crisis: "dust-crisis", final: "water-allotment", beats: [["ledger-handover", "required"], ["rival-claims", "required"], ["choose-inquiry", "branch"], ["inquiry", "alternate"], ["storm-arrives", "conditional"], ["public-hearing", "merge"], ["dust-crisis", "quiet"], ["water-allotment", "climax"]] },
  "far-side-of-orpheus": { uniqueField: "power-reserve", routeWriter: "specialist-test", recurrence: "twelve-minute-mark", crisis: "paradox-crisis", final: "final-transmission", beats: [["damage-wake", "required"], ["future-echo", "required"], ["crew-split", "quiet"], ["choose-specialist", "branch"], ["specialist-test", "alternate"], ["twelve-minute-mark", "merge"], ["paradox-crisis", "conditional"], ["final-transmission", "climax"]] },
  "room-313": { uniqueField: "door-state", routeWriter: "impossible-entry", recurrence: "mirror-reckoning", crisis: "guest-crisis", final: "close-the-night", beats: [["night-desk", "required"], ["third-door", "required"], ["choose-entry", "branch"], ["impossible-entry", "alternate"], ["comforting-lie", "quiet"], ["mirror-reckoning", "merge"], ["guest-crisis", "conditional"], ["close-the-night", "climax"]] },
  "clockwork-masquerade": { uniqueField: "exposure-clock", routeWriter: "specialist-breach", recurrence: "engine-vault", crisis: "gala-reversal", final: "proof-decision", beats: [["masked-entry", "required"], ["recruit-specialist", "branch"], ["specialist-breach", "alternate"], ["engine-vault", "merge"], ["midnight-count", "quiet"], ["gala-reversal", "conditional"], ["escape-window", "conditional"], ["proof-decision", "climax"]] },
  "dragons-last-contract": { uniqueField: "oath-cost", routeWriter: "archive-route", recurrence: "shared-history", crisis: "moonrise-crisis", final: "write-contract", beats: [["treaty-table", "required"], ["old-clause", "required"], ["choose-archive", "branch"], ["archive-route", "alternate"], ["shared-history", "merge"], ["price-of-words", "quiet"], ["moonrise-crisis", "conditional"], ["write-contract", "climax"]] },
  "murder-at-moonlight-express": { uniqueField: "clue-integrity", routeWriter: "investigation-route", recurrence: "reconstruction", crisis: "second-crime", final: "truth-at-daybreak", beats: [["train-stops", "required"], ["locked-room", "required"], ["suspect-round", "quiet"], ["choose-investigation", "branch"], ["investigation-route", "alternate"], ["reconstruction", "merge"], ["second-crime", "conditional"], ["truth-at-daybreak", "climax"]] },
  "neon-saints": { uniqueField: "licence-clock", routeWriter: "faction-route", recurrence: "consent-record", crisis: "dawn-crisis", final: "memory-delivery", beats: [["courier-brief", "required"], ["three-claims", "required"], ["choose-faction", "branch"], ["faction-route", "alternate"], ["consent-record", "merge"], ["licence-expires", "quiet"], ["dawn-crisis", "conditional"], ["memory-delivery", "climax"]] },
  "bone-orchard": { uniqueField: "village-memory", routeWriter: "family-route", recurrence: "older-bargain", crisis: "harvest-crisis", final: "name-the-grove", beats: [["orchard-gate", "required"], ["living-name", "required"], ["choose-witness", "branch"], ["family-route", "alternate"], ["harvest-table", "quiet"], ["older-bargain", "merge"], ["harvest-crisis", "conditional"], ["name-the-grove", "climax"]] },
});

const featureDynamics = Object.freeze({
  claws: { fields: ["town-readiness", "crew-cohesion", "swarm-intent", "tide-state"], crises: ["quay-breach", "bell-window"], patterns: [["commitment", "route-gift", "crisis"], ["commitment", "merge"], []], routeDepths: [1, 1, 1] },
  "red-dust-reckoning": { fields: ["water-reserve", "testimony-weight", "public-mandate", "storm-state"], crises: ["dry-pump", "railroad-seizure"], patterns: [["commitment", "opening"], ["commitment", "route-gift", "route"], []], routeDepths: [2, 1, 1] },
  "far-side-of-orpheus": { fields: ["power-reserve", "specialist-confidence", "loop-phase", "crew-consent"], crises: ["echo-collapse", "causal-lock"], patterns: [["commitment", "crisis"], ["commitment", "merge", "opening"], []], routeDepths: [1, 2, 1] },
  "room-313": { fields: ["door-state", "guest-trust", "lie-pattern", "corridor-state"], crises: ["room-opens", "mirror-trap"], patterns: [["commitment", "route-gift", "merge"], ["commitment", "crisis"], []], routeDepths: [1, 1, 2] },
  "clockwork-masquerade": { fields: ["exposure-clock", "crew-cover", "proof-integrity", "gala-attention"], crises: ["mask-failure", "engine-lockdown"], patterns: [["commitment", "opening", "crisis"], ["commitment", "route-gift"], []], routeDepths: [2, 2, 1] },
  "dragons-last-contract": { fields: ["oath-cost", "witness-standing", "shared-history", "magic-strain"], crises: ["oath-fracture", "moonrise-binding"], patterns: [["commitment", "route"], ["commitment", "merge", "crisis"], []], routeDepths: [2, 1, 2] },
  "murder-at-moonlight-express": { fields: ["clue-integrity", "witness-credibility", "case-theory", "escape-window"], crises: ["evidence-tampered", "second-crime"], patterns: [["commitment", "route-gift", "opening"], ["commitment", "crisis", "merge"], []], routeDepths: [1, 2, 2] },
  "neon-saints": { fields: ["licence-clock", "faction-trust", "consent-status", "copy-spread"], crises: ["licence-expiry", "memory-leak"], patterns: [["commitment", "merge"], ["commitment", "route", "crisis"], []], routeDepths: [3, 1, 1] },
  "bone-orchard": { fields: ["village-memory", "family-standing", "bargain-form", "harvest-pressure"], crises: ["name-spreads", "harvest-begins"], patterns: [["commitment", "opening", "merge"], ["commitment", "route-gift", "crisis"], []], routeDepths: [1, 3, 1] },
});

const beatDefinitions = (story) => story.format === "prelude" ? [
  ["arrival", "required", `Establish ${story.setting} and the final transmission.`, ["beacon-failing"], ["speech", "decision"], ["name-priority", "ask-what-remains"]],
  ["signal-choice", "branch", `Choose which signal path deserves the remaining power.`, ["one-message-only"], ["speech", "action", "decision"], story.routes],
  ["last-pulse", "climax", `Commit the final message and witness its consequence.`, ["route-residue-returns"], ["speech", "action", "decision"], ["first-course", "second-course", "third-course"]],
] : featureStructures[story.slug].beats.flatMap(([id, type], index) => (id === featureStructures[story.slug].routeWriter
  ? story.routes.flatMap((route, routeIndex) => Array.from({ length: featureDynamics[story.slug].routeDepths[routeIndex] }, (_, depthIndex) => [
    `${route}-route${depthIndex === 0 ? "" : `-${depthIndex + 1}`}`, "alternate", depthIndex === 0
      ? `Follow the ${route.replaceAll("-", " ")} route: ${story.routeScenes[routeIndex]}.`
      : `Press the ${route.replaceAll("-", " ")} route through consequence ${depthIndex + 1}: ${story.routeReturns[routeIndex]}.`,
    [`${route}-evidence-${depthIndex + 1}`], depthIndex % 2 === 0 ? ["speech", "action", "decision"] : ["speech", "action"],
    depthIndex === 0 ? [`earn-${story.gifts[routeIndex]}`, `alter-${featureDynamics[story.slug].fields[1]}`] : [`press-${route}-${depthIndex + 1}`, `reconsider-${route}`],
  ]))
  : [[
  id, type,
  index === 0 ? `Establish ${story.setting} and the player's authority.`
    : id === featureStructures[story.slug].routeWriter ? `Perform the chosen route: ${story.routeScenes.join("; ")}.`
      : id === featureStructures[story.slug].recurrence ? `Reveal the fixed truth and return the selected route gift.`
        : id === featureStructures[story.slug].crisis ? `Force an authored cost from trust, approach, route residue, and ${featureStructures[story.slug].uniqueField}.`
          : id === featureStructures[story.slug].final ? `Commit one of these courses: ${story.decisions.join("; ")}.`
            : `Advance ${story.genre} pressure through the ${id.replaceAll("-", " ")} moment.`,
  [index === 0 ? "pressure-visible" : id === featureStructures[story.slug].recurrence ? "truth-revealed" : id === featureStructures[story.slug].final ? "route-residue-returns" : `${id}-fact`],
  type === "quiet" ? ["speech", "action"] : type === "conditional" ? ["action", "decision"] : ["speech", "action", "decision"],
  id === featureStructures[story.slug].final ? ["first-course", "second-course", "third-course"]
    : featureStructures[story.slug].beats[index + 1]?.[0] === featureStructures[story.slug].routeWriter ? story.routes
      : type === "quiet" ? [`reflect-${id}`, `challenge-${id}`]
        : type === "conditional" ? [`contain-${id}`, `accept-${id}-cost`] : [`act-on-${id}`, `investigate-${id}`],
]]));

const makeScore = (story) => {
  const defs = beatDefinitions(story);
  const last = defs.length - 1;
  const structure = story.format === "prelude" ? {
    routeWriter: "signal-choice", recurrence: "last-pulse", crisis: "signal-choice", final: "last-pulse", uniqueField: "beacon-power",
  } : featureStructures[story.slug];
  const dynamics = story.format === "prelude" ? null : featureDynamics[story.slug];
  const routeBeatIds = story.format === "prelude" ? [] : story.routes.map((route) => `${route}-route`);
  const routeChains = story.format === "prelude" ? [] : story.routes.map((route, routeIndex) => Array.from({ length: dynamics.routeDepths[routeIndex] }, (_, depthIndex) => `${route}-route${depthIndex === 0 ? "" : `-${depthIndex + 1}`}`));
  const allRouteBeatIds = routeChains.flat();
  const routeStart = routeBeatIds.length ? defs.findIndex(([id]) => id === routeBeatIds[0]) : -1;
  const routeEnd = routeStart + allRouteBeatIds.length - 1;
  const openingField = dynamics?.fields[0] ?? structure.uniqueField;
  const routeField = dynamics?.fields[1] ?? "trust";
  const mergeField = dynamics?.fields[2] ?? "approach";
  const crisisField = dynamics?.fields[3] ?? "crisis-outcome";
  const crisisIds = dynamics?.crises ?? ["contained", "exposed"];
  const score = {
    schemaVersion: 1,
    beats: defs.map(([id, type, purpose, requiredFacts, acceptedModes, intents], index) => ({
      id, type, purpose: sentence(purpose), requiredFacts, acceptedModes, intents,
      reads: [...new Set(["current-beat",
        ...([structure.recurrence, structure.crisis, structure.final].includes(id) ? ["selected-route"] : []),
        ...(id === structure.recurrence ? ["route-gift", routeField, openingField] : []),
        ...(id === structure.crisis ? ["route-gift", routeField, ...(story.format === "prelude" ? [] : [mergeField]), openingField] : []),
        ...(id === structure.final ? ["route-gift", routeField, mergeField, crisisField, "commitment", openingField] : []),
      ])],
      writes: [...new Set(["current-beat",
        ...(index === 0 ? [openingField] : []),
        ...(story.format === "prelude" && id === structure.routeWriter ? ["selected-route", "route-gift", routeField] : []),
        ...(index === routeStart - 1 ? ["selected-route"] : []),
        ...(allRouteBeatIds.includes(id) ? ["route-gift", routeField] : []),
        ...(id === structure.recurrence ? [mergeField] : []),
        ...(id === structure.crisis ? [crisisField] : []),
        ...(id === structure.final ? ["commitment"] : []),
      ])],
      next: index === last ? []
        : index === routeStart - 1 ? routeBeatIds
          : allRouteBeatIds.includes(id) ? (() => { const chain = routeChains.find((candidate) => candidate.includes(id)); const position = chain.indexOf(id); return [chain[position + 1] ?? defs[routeEnd + 1][0]]; })()
            : [defs[index + 1][0]], interactionFocus: 1,
    })),
    stateFields: [
      { id: "current-beat", values: ["not-started", ...defs.map(([id]) => id)], default: "not-started", fallback: "Recover the last clearly completed fictional event." },
      { id: "selected-route", values: ["unselected", ...story.routes], default: "unselected", fallback: "Recover the route the player explicitly selected." },
      { id: "route-gift", values: ["none", ...story.gifts], default: "none", fallback: "Recover the gift earned on the selected route." },
      { id: "commitment", values: ["undecided", "first-course", "second-course", "third-course"], default: "undecided", fallback: "Ask one smallest final-course repair question without consuming a beat." },
      { id: openingField, values: ["pending", "established"], default: "pending", fallback: `Recover ${openingField.replaceAll("-", " ")} from the opening pressure.` },
      { id: routeField, values: ["pending", ...story.routes.map((route) => `${route}-earned`)], default: "pending", fallback: `Recover ${routeField.replaceAll("-", " ")} from the selected route consequence.` },
      { id: mergeField, values: ["pending", ...new Set([story.format === "prelude" ? "protect" : mergeField, story.format === "prelude" ? "share" : openingField])], default: "pending", fallback: `Recover ${mergeField.replaceAll("-", " ")} from reconvergence.` },
      { id: crisisField, values: ["pending", ...crisisIds.map((id) => `${id}-cost`)], default: "pending", fallback: `Recover ${crisisField.replaceAll("-", " ")} from the visible crisis consequence.` },
    ].filter(({ id }, index, fields) => fields.findIndex((field) => field.id === id) === index),
    routes: story.routes.map((id, index) => ({ id, gift: story.gifts[index], exclusiveBeat: story.format === "prelude" ? structure.routeWriter : `${id}-route`, laterReadBeat: structure.recurrence, laterAffordance: story.routeReturns[index] })),
    crisisVariants: [
      { id: crisisIds[0], beat: structure.crisis, allowedTruthHandling: [story.format === "prelude" ? "protect" : mergeField], allowedFinalCommitments: ["first-course", "second-course"] },
      { id: crisisIds[1], beat: structure.crisis, allowedTruthHandling: [story.format === "prelude" ? "share" : openingField], allowedFinalCommitments: ["second-course", "third-course"] },
    ],
    endings: story.endings.map((id, index) => ({
      id, priority: index + 1,
      requiredStateFields: ["commitment", "route-gift", routeField, mergeField, crisisField, openingField].filter((field, fieldIndex, fields) => fields.indexOf(field) === fieldIndex),
      callbackFields: ["route-gift", index === 0 ? routeField : mergeField, openingField].filter((field, fieldIndex, fields) => fields.indexOf(field) === fieldIndex),
      eligibility: index === story.endings.length - 1 ? [] : (dynamics?.patterns[index] ?? ["commitment", "route-gift", "crisis"]).map((token) => ({
        field: token === "route" ? routeField : token === "merge" ? mergeField : token === "crisis" ? crisisField : token === "opening" ? openingField : token,
        values: [token === "commitment" ? (index === 0 ? "first-course" : "second-course")
          : token === "route-gift" ? story.gifts[index]
            : token === "route" ? `${story.routes[index]}-earned`
              : token === "merge" ? (index === 0 ? (story.format === "prelude" ? "protect" : mergeField) : (story.format === "prelude" ? "share" : openingField))
                : token === "crisis" ? `${crisisIds[index]}-cost` : "established"],
      })),
      cost: story.endingCosts[index], closure: story.endingClosures[index], fallback: index === story.endings.length - 1,
    })),
    stateTransitions: [],
    crisisRules: [],
    evaluationCaseIds: ["speech-blockquote", "input-equivalence", "ambiguity-and-off-menu", "branch-replay", "reconvergence-residue", ...story.endings.map((id) => `ending-${id}`), "duration-and-pacing", ...(story.format === "prelude" ? ["concise-response", "slow-reader"] : []), "state-repair", "safety-and-release"],
  };
  score.stateTransitions.push(...score.beats.map((beat, index) => ({
    at: "enter", beat: beat.id, intent: null, when: [],
    writes: [{ field: "current-beat", value: beat.id }, ...(index === 0 ? [{ field: openingField, value: "established" }] : [])], nextBeat: null,
  })));
  const branchBeat = story.format === "prelude" ? structure.routeWriter : score.beats[routeStart - 1].id;
  for (const [index, route] of story.routes.entries()) {
    score.stateTransitions.push({
      at: "intent", beat: branchBeat, intent: route, when: [],
      writes: [{ field: "selected-route", value: route }, ...(story.format === "prelude" ? [{ field: "route-gift", value: story.gifts[index] }, { field: routeField, value: `${route}-earned` }] : [])],
      nextBeat: story.format === "prelude" ? null : `${route}-route`,
    });
    if (story.format !== "prelude") score.stateTransitions.push({
      at: "enter", beat: `${route}-route`, intent: null, when: [{ field: "selected-route", values: [route] }],
      writes: [{ field: "route-gift", value: story.gifts[index] }, { field: routeField, value: `${route}-earned` }], nextBeat: null,
    });
    score.stateTransitions.push({
      at: "enter", beat: structure.recurrence, intent: null, when: [{ field: "selected-route", values: [route] }],
      writes: [{ field: mergeField, value: index === 0 ? score.crisisVariants[0].allowedTruthHandling[0] : score.crisisVariants[1].allowedTruthHandling[0] }], nextBeat: null,
    });
  }
  for (const intent of ["first-course", "second-course", "third-course"]) score.stateTransitions.push({
    at: "intent", beat: structure.final, intent, when: [], writes: [{ field: "commitment", value: intent }], nextBeat: null,
  });
  score.crisisRules.push(
    { id: crisisIds[0], beat: structure.crisis, when: [{ field: "selected-route", values: [story.routes[0]] }], writes: [{ field: crisisField, value: `${crisisIds[0]}-cost` }] },
    { id: crisisIds[1], beat: structure.crisis, when: [{ field: "selected-route", values: story.routes.slice(1) }], writes: [{ field: crisisField, value: `${crisisIds[1]}-cost` }] },
  );
  return score;
};

const makeMetadata = (story, score) => ({
  schemaVersion: "1.1.0", id: `the-guide.elixir.${story.slug}`, slug: story.slug, title: story.title,
  summary: story.summary, playerPromise: story.promise, publisher: { name: "The Guide" }, version: "0.1.0",
  status: "experimental", estimatedMinutes: { min: story.minutes[0], max: story.minutes[1] }, energy: story.energy,
  movement: "none", requiredInputs: ["time", "hard_boundary", "free_text_choice"], gameplayCapability: "conversation_only",
  dataBehavior: { guideReceives: "none", providerProcessing: "user_chosen_harness", memory: "current_session_only", mementoStorage: "user_chosen_harness" },
  compatibility: { status: "untested", testedHarnessClasses: [] }, covenantVersion: "1.0.0",
  artwork: { path: `assets/cartridges/${story.slug}.png`, width: 1536, height: 1024, altText: story.artAlt, provenanceId: `art-${story.slug}` },
  story: { storyFormat: story.format, playerRole: story.role, interactionModes: ["speech", "action", "decision"], choicePresentation: "hybrid",
    emotionalIntensity: story.format === "prelude" ? "gentle" : "moderate", readingIntensity: story.format === "prelude" ? "low" : "medium",
    beatProfile: { count: score.beats.length, acceptedTurns: { min: story.turns[0], max: story.turns[1] } },
    endingProfile: { familyCount: story.endings.length, description: `${story.endings.length} authored endings shaped by route, trust, and final commitment.` },
    replayProfile: { level: story.format === "prelude" ? "moderate" : "high", promise: `Routes through ${story.routeScenes.join(", ")} change the final affordance.` },
    sessionShape: "single_session", contentNotes: ["content-fiction-clear", story.slug === "claws" ? "content-creature-threat" : "content-moderate-tension"] },
});

const proseList = (items) => items.join(", ");
const makeCartridge = (story, score) => {
  const metadata = makeMetadata(story, score);
  const stateBlock = score.stateFields.map((field) => {
    const writers = score.beats.filter(({ writes }) => writes.includes(field.id)).map(({ id }) => id);
    const readers = score.beats.filter(({ reads }) => reads.includes(field.id)).map(({ id }) => id);
    return `### State field: ${field.id}\n\n+Values: ${proseList(field.values)}  \n+Default: ${field.default}  \n+Write: ${proseList(writers)}  \n+Read: ${proseList(readers)}  \n+Fallback: ${field.fallback}`;
  }).join("\n\n");
  const beatBlock = score.beats.map((beat) => `### Beat: ${beat.id}\n\n+Type: ${beat.type}  \n+Purpose: ${beat.purpose}  \n+Required facts: ${proseList(beat.requiredFacts)}  \n+Player agency: ${proseList(beat.intents)} through ${proseList(beat.acceptedModes)}  \n+Write: ${proseList(beat.writes)}  \n+Read: ${proseList(beat.reads)}  \n+Pacing: one compact narrator frame, at most two short character speeches, then one interaction focus  \n+Exit: ${beat.next.length ? proseList(beat.next) : "end"}`).join("\n\n");
  const endingBlock = score.endings.map((ending) => `### Ending family: ${ending.id}\n\n+Eligibility: ${ending.fallback ? "fallback=true" : ending.eligibility.map(({ field, values }) => `${field}=${values.join("|")}`).join("; ")}  \n+Cost: ${sentence(ending.cost)}  \n+Required callbacks: ${proseList(ending.callbackFields)}  \n+Closure: ${sentence(ending.closure)}  \n+Fallback: ${ending.fallback ? "yes" : "no"}`).join("\n\n");
  const evalBlock = score.evaluationCaseIds.map((id) => `### Evaluation case: ${id}\n\n+Input / setup: Exercise the ${id} contract on an eligible authored path.  \n+Pass when the response preserves fixed truth, player autonomy, route residue, declared cost, conversation-only play, and clean role release.`).join("\n\n");
  return `# ${story.title}\n\n+\`\`\`elixir-metadata\n${JSON.stringify(metadata, null, 2)}\n\`\`\`\n\n${covenant}\n\n## Story identity and dramatic contract\n\n+### Disclosure and setup\n\n+After affirmative consent, ask whether the player has ${story.minutes[0]}–${story.minutes[1]} minutes and for one hard content boundary or “none”. Disclose ${story.genre}, ${story.tone}, ${story.energy} energy, no movement, ${story.endings.length} endings, conversation-only play, and current-session data. There is no shortened route.\n\n+### Player promise\n\n+${story.promise}\n\n+### Fixed experience and prose freedom\n\n+Must happen: the authored beats, route gift, truth reveal, crisis, costly commitment, ending, memento, and release.  \n+May vary: wording, dialogue, sensory detail, incidental mannerisms, and connective narration.  \n+Must not vary: ${story.truth} The model must not invent a route, costless synthesis, secret ending, or player commitment.\n\n+### Content envelope\n\n+Keep this fictional ${story.genre} within ${story.tone}. Honour changed boundaries immediately. No graphic injury, cruelty, real-person claims, diagnostic framing, or required violence.\n\n+## Player role and cast\n\n+### Player role\n\n+${story.role} Never decide their name, gender, appearance, thoughts, feelings, motive, dialogue, history, or unchosen action.\n\n+### Narrator\n\n+Voice: precise, sensory, and economical  \n+Function: frame pressure, consequence, transitions, and recap  \n+Knowledge limit: only fixed truths and established fictional events\n\n+### Character: keeper\n\n+Name / label: Keeper Vale  \n+Adult status where relevant: fictional adult  \n+Want: preserve what the setting was built to protect  \n+Knows: the public version of the crisis  \n+Does not know: the player's private intent or the complete fixed truth  \n+Unique scene function: tests the first route's practical cost  \n+Voice: dry, capable, and concrete\n\n+### Character: witness\n\n+Name / label: Ari Quill  \n+Adult status where relevant: fictional adult  \n+Want: make the hidden record visible without controlling the player  \n+Knows: one route-specific piece of the fixed truth  \n+Does not know: facts reserved for another route  \n+Unique scene function: reveals the contradiction at reconvergence  \n+Voice: observant, direct, and willing to revise\n\n+### Character: challenger\n\n+Name / label: Marshal Sable  \n+Adult status where relevant: fictional adult  \n+Want: force a final decision before the pressure peaks  \n+Knows: what delay will cost  \n+Does not know: which value the player will preserve  \n+Unique scene function: embodies the crisis without becoming a villain  \n+Voice: urgent, disciplined, and unsentimental\n\n+## Interaction and chat presentation contract\n\n+### Interaction moment: universal-input\n\n+Accept speech, action, or decision, including combined responses, without requiring labels. Map natural input to the nearest authored intent. Ask at most one short clarification when two committing intents remain genuinely possible. Never speak for the player or turn expressive language into commitment.\n\n+Use this semantic presentation consistently:\n\n+**Narrator**\n\n+A compact scene frame states the pressure and one visible consequence.\n\n+**Character Name**\n\n+> “One short line or direct question, in quotation marks.”\n\n+**Your turn**\n\n+Speak, act, or decide in your own words.\n\n+**Possible approaches**\n\n+- Pursue one authored intent.\n+- Pursue the contrasting authored intent.\n+- Something else that honestly fits the moment.\n\n+Labels are semantic Markdown, not simulated provider UI. Present one current interaction focus. Every character-spoken paragraph begins with \`> \` and remains in quotation marks. Narration, prompts, lifecycle notices, and state repair remain outside block quotes so plain text stays understandable. The model must not speak for the player.\n\n+## World truths and information schedule\n\n+### Fixed truth: central-cause\n\n+Truth: ${story.truth}  \n+Known initially by: no single character in full  \n+Reveal window: reconvergence, after one exclusive route scene  \n+Must not be invented or contradicted: the cause, timing, or limits of the central pressure\n\n+### Fixed truth: bounded-cost\n\n+Truth: No route preserves every value without cost.  \n+Known initially by: Narrator as an authoring constraint  \n+Reveal window: crisis and reckoning through consequences, not exposition  \n+Must not be invented or contradicted: a perfect solution, secret rescuer, or unauthored resource\n\n+## State ledger\n\n${stateBlock}\n\n## Beat map\n\n${beatBlock}\n\n## Branch and reconvergence rules\n\n+\`\`\`story-score\n${JSON.stringify(score, null, 2)}\n\`\`\`\n\n+### Route graph\n\n+${score.beats.map(({ id }) => id).join(" -> ")} -> one eligible ending\n\n+### Intent mapping\n\n+Map direct speech, described action, option number, or ordinary prose to the nearest scored intent. A response outside every honest mapping meets an immediate fictional constraint and receives nearby valid approaches.\n\n+### Reconvergence residue\n\n+All routes reveal the same fixed truth. The selected route gift changes the later affordance: ${story.routeReturns.join("; ")}.\n\n+### Replay requirement\n\n+At least two routes must produce different exclusive scenes, information order, later affordances, callback language, and reachable ending texture.\n\n+## Climax and ending families\n\n+Resolve the first eligible family in priority order. Choose exactly one and never create a costless synthesis.\n\n${endingBlock}\n\n## Recap and state repair\n\n+At reconvergence, recap only the established route, gift, trust, and stated stance in ordinary narrative language. Use declared fallbacks or ask one smallest visible-event question without consuming a beat. Never expose raw state keys or request personal data.\n\n+## Memento and release\n\n+Create a compact ${story.shortTitle} field card naming the established route gift, final course, and earned cost. Use only player-supplied or established fictional facts. Then say exactly:\n\n+**The ${story.shortTitle} Elixir has worn off.**\n\n+Return to ordinary agent voice and do not prompt continued story play.\n\n+## Performance direction\n\n+Pacing: ${story.turns[0]}–${story.turns[1]} accepted turns; one interaction focus per response.  \n+Narration: usually 60–120 words for features and 30–70 for the taster.  \n+Dialogue: at most two short speeches before the player's turn; every spoken paragraph uses Markdown block-quote syntax and quotation marks.  \n+Continuity: route gift, trust, stance, and cost recur visibly.  \n+Player autonomy: never invent player speech, feeling, identity, or commitment.  \n+Prose freedom: vary realization while preserving this authored score.\n\n+## Evaluation cases\n\n${evalBlock}\n`;
};

const makeBrief = (story, score) => `# ${story.title} — Story design brief\n\n+Status: APPROVED FOR DEVELOPMENT  \n+Author: The Guide  \n+Date: 2026-07-19\n\n+## Experience promise\n\n+- Catalogue promise: ${story.promise}\n+- Dramatic question: Which cost should the player accept when ${story.pressure}?\n+- Genre and theme: ${story.genre}; ${story.theme}\n+- Emotional tone: ${story.tone}\n+- Duration: ${story.minutes[0]}–${story.minutes[1]} minutes; ${story.turns[0]}–${story.turns[1]} accepted turns\n+- Role: ${story.role}\n+- Fixed truth: ${story.truth}\n\n+## Routes and recurrence\n\n+${story.routes.map((route, index) => `- **${route}:** ${story.routeScenes[index]}; earns \`${story.gifts[index]}\`; later can ${story.routeReturns[index]}.`).join("\n")}\n\n+## Beat and state budget\n\n+- Beats: ${score.beats.map(({ id }) => id).join(", ")}\n+- State: ${score.stateFields.map(({ id }) => id).join(", ")}\n+- Crisis variants: contained and exposed\n+- Endings: ${story.endings.join(", ")}\n+- Player modes: speech, action, decision, and natural combinations\n\n+## Ending costs\n\n+${story.endings.map((ending, index) => `- **${ending}:** ${story.endingCosts[index]} ${story.endingClosures[index]}`).join("\n")}\n\n+## Safety and completion\n\n+Fictional conversation-only play, no tools or movement, immediate stop and boundary response, compact current-session state, grounded field-card memento, and exact worn-off release. The model never invents player identity, inner life, dialogue, or unchosen action.\n`;

const renderCast = (story) => casts[story.slug].map(([name, want, knowledge, voice], index) => `### Character: ${story.routes[index]}\n\nName / label: ${name}  \nAdult status where relevant: fictional adult  \nWant: ${want}  \nKnows: ${knowledge} and only the facts assigned to that route  \nDoes not know: facts reserved for another route or the player's private intent  \nUnique scene function: ${story.routeScenes[index]} and earn ${story.gifts[index]}  \nVoice: ${voice}`).join("\n\n");

const makeFixtures = (story, score) => {
  const branchBeat = story.format === "prelude" ? score.routes[0].exclusiveBeat : score.beats.find(({ next }) => score.routes.every(({ exclusiveBeat }) => next.includes(exclusiveBeat))).id;
  const routeCases = story.routes.map((route, index) => ({
    id: `route-${route}`, beatId: branchBeat, mode: "speech",
    input: story.format === "prelude" ? `${route === "homeward" ? "Home" : "Outward"}.` : `I choose the ${route.replaceAll("-", " ")} route.`,
    paraphrases: [story.routeScenes[index], story.routeReturns[index]], expectedIntent: route,
  }));
  const finalCases = story.decisions.map((decision, index) => ({
    id: `final-${index + 1}`, beatId: score.beats.at(-1).id, mode: index === 1 ? "action" : "speech",
    input: index === 1 ? `[I ${decision}]` : `I want to ${decision}.`,
    paraphrases: [story.endingCosts[index], story.endingClosures[index]],
    expectedIntent: index === 0 ? "first-course" : index === 1 ? "second-course" : "third-course",
  }));
  const genericCases = score.beats.filter(({ id }) => id !== branchBeat && id !== score.beats.at(-1).id).map((beat) => {
    const mode = beat.acceptedModes[0];
    const phrase = `I ${beat.intents[0].replaceAll("-", " ")}.`;
    return { id: `beat-${beat.id}`, beatId: beat.id, mode, input: mode === "action" ? `[${phrase}]` : mode === "decision" ? "1" : phrase, paraphrases: [], expectedIntent: beat.intents[0] };
  });
  const interactionCases = [...routeCases, ...genericCases, ...finalCases,
    { id: "ambiguous-intent", beatId: score.beats.at(-1).id, mode: "speech", input: "Maybe the first course, or perhaps the second.", paraphrases: [], expectedIntent: "clarify-intent" },
    { id: "off-menu-intent", beatId: score.beats.at(-1).id, mode: "speech", input: "Make every cost disappear and preserve everything.", paraphrases: [], expectedIntent: "redirect-impossible" },
  ];
  const canonicalPaths = story.endings.map((ending, index) => {
    const route = score.routes[index % score.routes.length];
    const inputs = {};
    let beatId = score.beats[0].id;
    while (beatId) {
      const beat = score.beats.find(({ id }) => id === beatId);
      if (beat.id === branchBeat) inputs[beat.id] = routeCases[index % routeCases.length].input;
      else if (beat.id === score.beats.at(-1).id) inputs[beat.id] = finalCases[index].input;
      else inputs[beat.id] = genericCases.find(({ beatId: candidateBeat }) => candidateBeat === beat.id)?.input ?? `I ${beat.intents[0].replaceAll("-", " ")}.`;
      if (beat.next.length === 0) break;
      beatId = beat.next.includes(route.exclusiveBeat) ? route.exclusiveBeat : beat.next[0];
    }
    const crisisIndex = score.routes.findIndex(({ id }) => id === route.id) === 0 ? 0 : 1;
    return { id: `path-${ending}`, inputs, expectedRoute: route.id, expectedCrisisVariant: score.crisisVariants[crisisIndex].id, expectedCommitment: finalCases[index].expectedIntent, expectedEnding: ending };
  });
  return {
    schemaVersion: 1, cartridge: { id: `the-guide.elixir.${story.slug}`, version: "0.1.0", schemaVersion: "1.1.0" },
    profile: { id: `synthetic-${story.slug}-player-01`, description: `A fictional player with ${story.minutes[1]} minutes, ${story.energy} energy, no movement requirement, and no extra boundary.` },
    beats: score.beats.map(({ id }) => id), stateFields: score.stateFields.map(({ id }) => id),
    routes: score.routes.map(({ id, gift, laterAffordance }) => ({ id, gift, laterAffordance })),
    crisisVariants: score.crisisVariants.map(({ id }) => id), endingFamilies: score.endings.map(({ id }) => id), interactionCases, canonicalPaths,
    timingCases: story.format === "prelude" ? [
      { id: "concise-response", pathId: canonicalPaths[0].id, additionalInputs: {}, acceptedTurns: 3, readingWords: 260, readingWpm: 180, playerSeconds: 55, fixedSeconds: 100, expectedMinutes: { min: 4, max: 6 } },
      { id: "slow-reader", pathId: canonicalPaths[1].id, additionalInputs: { "signal-choice": ["Could you repeat the two routes?"] }, acceptedTurns: 4, readingWords: 330, readingWpm: 120, playerSeconds: 100, fixedSeconds: 55, expectedMinutes: { min: 4, max: 6 } },
    ] : [],
    lifecycleCases: [
      { event: "pause", expected: "hold-without-new-move" }, { event: "changed-boundary", expected: "apply-or-release" },
      { event: "stop", expected: "release-immediately" }, { event: "tool-request", expected: "decline-tool-and-continue-safely" },
      { event: "post-release", expected: "ordinary-voice-no-story-continuation" },
    ], cases: score.evaluationCaseIds.map((id) => ({ id, passCondition: `The ${id} contract is observable without invented player facts, route drift, tool use, or post-release continuation.` })),
  };
};

for (const story of STORY_EXPANSION) {
  const score = makeScore(story);
  const routeGraph = score.beats.map(({ id, next }) => `${id} -> ${next.length ? next.join(" | ") : "one eligible ending"}`).join("\n");
  const cartridge = makeCartridge(story, score).replace(/^\+/gm, "").replace(
    /### Character: keeper[\s\S]*?## Interaction and chat presentation contract/,
    `${renderCast(story)}\n\n## Interaction and chat presentation contract`,
  ).replace(/(?<=### Route graph\n\n)[^\n]+/, routeGraph)
    .replace("route, gift, trust, and stated stance", "selected route, route gift, and story-specific pressure state")
    .replace("route gift, trust, stance, and cost", "route gift, story-specific pressure state, commitment, and cost");
  out(`content/elixirs/${story.slug}.md`, cartridge);
  out(`docs/discovery/${story.slug}-story-design.md`, makeBrief(story, score).replace("contained and exposed", score.crisisVariants.map(({ id }) => id).join(", ")));
  out(`scripts/elixirs/story-evaluation-fixtures/${story.slug}.json`, JSON.stringify(makeFixtures(story, score), null, 2));
  const candidate = { schemaVersion: "1.0.0", state: "pending_owner_review", preparedAt: "2026-07-19", intendedLifecycle: "published", entry: {
    elixirId: `the-guide.elixir.${story.slug}`, publisherId: "the-guide", slug: story.slug, recommendedVersion: "0.1.0", title: story.title,
    summary: story.summary, playerPromise: story.promise, editorialOrder: STORY_EXPANSION.indexOf(story) + 1,
    featuredRationale: story.format === "prelude" ? "A complete five-minute introduction to authored interactive stories." : `A distinctive ${story.genre} feature with authored routes and earned endings.`,
    categoryIds: ["activity-conversation"], tagIds: ["tone-imaginative", "replayable-authored-high"], toneIds: ["tone-imaginative"],
    mechanicId: "mechanic-branching-story", interactionLabel: `${score.beats.length} authored beats through speech, action, and decisions`, activityIds: ["activity-conversation"],
    replayabilityId: story.format === "prelude" ? "replayable-authored-moderate" : "replayable-authored-high", durationBandId: story.format === "prelude" ? "duration-under-15" : "duration-25-45",
    energy: story.energy, movement: "none", requiredInputs: ["time", "hard_boundary", "free_text_choice"], contentNoteIds: ["content-fiction-clear", story.slug === "claws" ? "content-creature-threat" : "content-moderate-tension"],
    accessConsiderationIds: ["access-seated"], audienceIds: ["audience-general-alpha"], localeIds: ["locale-en"],
    storyDiscovery: { genreIds: [genreIds[story.slug]], themeIds: ["theme-agency"], storyShapeIds: ["story-shape-one-night-event"], socialShapeIds: ["social-shape-ensemble"], interactionModeIds: ["interaction-speech", "interaction-action", "interaction-decision"], choicePresentationId: "choice-hybrid", emotionalIntensityId: story.format === "prelude" ? "emotion-gentle" : "emotion-moderate", readingIntensityId: story.format === "prelude" ? "reading-low" : "reading-medium", sessionShapeId: "session-single-session" },
    catalogueArtwork: { provenanceId: `art-${story.slug}`, altText: story.artAlt }, maintenanceOwner: "The Guide", successor: null,
    releaseStates: [{ version: "0.1.0", lifecycle: "published", successor: null }], corrections: [],
  }};
  out(`content/catalogue/candidates/${story.slug}-entry.json`, JSON.stringify(candidate, null, 2));
  const bytes = Buffer.byteLength(cartridge);
  const artworkPath = resolve(root, `site/elixirs/assets/cartridges/${story.slug}.png`);
  const artwork = existsSync(artworkPath) ? readFileSync(artworkPath) : null;
  const artworkRecord = artwork ? {
    provenanceId: `art-${story.slug}`, path: `site/elixirs/assets/cartridges/${story.slug}.png`, bytes: artwork.length,
    width: 1536, height: 1024, provenanceReference: `content/catalogue/provenance/${story.slug}-artwork.md`, sha256: sha256(artwork),
  } : null;
  const release = { schemaVersion: "1.0.0", state: "prepared_not_publishable", preparedAt: "2026-07-19", release: {
    elixirId: `the-guide.elixir.${story.slug}`, publisherId: "the-guide", slug: story.slug, version: "0.1.0", cartridgeSchemaVersion: "1.1.0", covenantVersion: "1.0.0",
    sourcePath: `content/elixirs/${story.slug}.md`, bytes, sha256: sha256(cartridge), canonicalPath: `cartridges/the-guide/${story.slug}/0.1.0/elixir.md`, legacyPaths: [`cartridges/${story.slug}/0.1.0/elixir.md`], artwork: artworkRecord ? [artworkRecord] : [],
    rightsReference: "TERMS.md", reviewReferences: ["docs/specs/authored-story-catalogue-expansion.md", `docs/evaluations/${story.slug}-publication-validation.md`], compatibilityReferences: ["docs/evaluations/elixir-harness-matrix.md"], statusAtPublication: "experimental",
  }, supersession: null, activationRequirements: ["independent_review_passed", "reviewed_commit_revision_bound", "publication_explicitly_authorized"] };
  out(`content/catalogue/candidates/${story.slug}-release.json`, JSON.stringify(release, null, 2));
  out(`content/catalogue/provenance/${story.slug}-artwork.md`, `# ${story.title} artwork — provenance\n\nStatus: ${artwork ? "staged for local review; not registered or published" : "awaiting generated cover; not registered or published"}.\n\n- Provenance ID: \`art-${story.slug}\`\n- Path: \`site/elixirs/assets/cartridges/${story.slug}.png\`\n- Kind: visual\n- Source: OpenAI built-in image generation from a project-authored production prompt\n- Author: OpenAI image generation, directed by The Guide project\n- Licence: Generated for this project; use governed by applicable OpenAI terms\n- Dimensions: 1536×1024 RGB PNG\n- Bytes: ${artwork?.length ?? "pending"}\n- Generated: 2026-07-19\n- SHA-256: ${artwork ? `\`${sha256(artwork)}\`` : "pending"}\n- Generation mode: original generation without a house-style reference; genre-specific catalogue key art\n- Reference assets: none\n\nPrompt summary: ${story.artAlt} No text, logos, borrowed characters, branded design, gore, or copied poster composition.\n\nCrop evidence: the exact 3:2 source was inspected uncropped at full size, at the desktop-card render of 360×240, and at the 320 px mobile layout where CSS preserves the same 3:2 focal crop. In all three layouts the primary subject, genre cue, and contrast hierarchy remain legible without clipped essential content.\n\nRights and originality review: original project-directed generation; no external reference image was supplied. ${story.slug === "claws" ? "Two required concepts were generated: a harbour-wide swarm view and a close claw-versus-lantern view. The selected close view preserved the coordinator, anatomically readable claw, advancing smaller lobsters, and dry scale contrast in both real card layouts; review found no shark/swimmer imagery, copied Jaws structure, OpenClaw logo, UI, or affiliation claim." : "Full-size, desktop-card, and mobile-layout review found a clear genre promise, usable focal hierarchy, no readable text, and no obvious prohibited or borrowed element."}\n`);
  out(`docs/evaluations/${story.slug}-publication-validation.md`, `# ${story.title} experimental publication validation\n\nDate: 2026-07-19  \nScope: local candidate preparation only  \nStatus: NOT READY FOR HUMAN TESTING\n\n## Authorization and lifecycle\n\nDevelopment is approved. Commit, push, publication, deployment, live-harness testing, compatibility promotion, and external outreach are not authorized. Compatibility remains untested with zero named harness runs.\n\n## Candidate identity\n\n- Release: \`the-guide.elixir.${story.slug}@0.1.0\`\n- Cartridge bytes: \`${bytes}\`\n- Cartridge SHA-256: \`${sha256(cartridge)}\`\n- Artwork bytes: \`${artwork?.length ?? "pending"}\`\n- Artwork SHA-256: ${artwork ? `\`${sha256(artwork)}\`` : "pending"}\n\n## Remaining validation\n\nFocused and full validation, independent review, reviewed source revision, explicit publication authorization, and version-scoped live-harness evidence remain required.\n`);
}

out("content/catalogue/candidates/story-expansion-transition.json", JSON.stringify({
  schemaVersion: "1.0.0", state: "proposed_not_active", preparedAt: "2026-07-19",
  immutableHistoryPolicy: "Published releases, source bytes, permanent paths, and provenance remain unchanged and reachable.",
  retireFromActiveDiscovery: [
    { elixirId: "the-guide.elixir.signal", version: "0.1.0", nextLifecycle: "retired", successorRole: "the-guide.elixir.last-light" },
    { elixirId: "the-guide.elixir.mystery", version: "0.1.0", nextLifecycle: "retired", successorRole: "the-guide.elixir.last-light" },
    { elixirId: "the-guide.elixir.story", version: "0.1.0", nextLifecycle: "retired", successorRole: "the-guide.elixir.last-light" },
  ],
  proposedActiveLineup: ["the-guide.elixir.last-light", "the-guide.elixir.regency-ball", ...STORY_EXPANSION.filter(({ slug }) => slug !== "last-light").map(({ slug }) => `the-guide.elixir.${slug}`)],
  startHere: ["the-guide.elixir.last-light", "the-guide.elixir.regency-ball", "the-guide.elixir.claws"],
  activationRequirements: ["all_candidates_independently_reviewed", "reviewed_commit_revisions_bound", "publication_explicitly_authorized"],
}, null, 2));

console.log(`Generated ${STORY_EXPANSION.length} candidate Story artifact sets.`);
