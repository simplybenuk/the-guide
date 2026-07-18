import { fixtureInstruction, safeFallbackCandidates } from "./fixtures";
import { createUuid } from "./ids";
import {
  expeditionSchema,
  instructionSchema,
  turnRequestSchema,
  type Buddy,
  type Expedition,
  type Instruction,
  type Observation,
  type TurnRequest,
  type ValidationEvent,
} from "./schemas";
import { validateInstruction } from "./safety";

const livingWords = /\b(plant|tree|leaf|bird|animal|green|flower|person|care|growing)\b/i;
const madeWords = /\b(window|chair|table|brick|wall|cup|lamp|door|metal|wood|glass|object)\b/i;

function selectValidatedInstruction(
  state: Expedition,
  proposed: unknown,
  now: string,
): { instruction?: Expedition["currentInstruction"]; events: ValidationEvent[] } {
  const candidate = instructionSchema.parse(proposed);
  const validation = validateInstruction(state, candidate);
  const events: ValidationEvent[] = [
    {
      instructionId: candidate.id,
      outcome: validation.ok ? "accepted" : "rejected",
      reason: validation.ok ? undefined : validation.reason,
      recordedAt: now,
    },
  ];
  if (validation.ok) return { instruction: validation.instruction, events };

  for (const rawFallback of safeFallbackCandidates(state)) {
    const fallback = instructionSchema.parse(rawFallback);
    const fallbackValidation = validateInstruction(state, fallback);
    events.push({
      instructionId: fallback.id,
      outcome: fallbackValidation.ok ? "accepted" : "rejected",
      reason: fallbackValidation.ok ? undefined : fallbackValidation.reason,
      recordedAt: now,
    });
    if (fallbackValidation.ok) return { instruction: fallbackValidation.instruction, events };
  }
  return { events };
}

function instructionWithApplicationId(proposed: unknown, id: string) {
  if (!proposed || typeof proposed !== "object") return proposed;
  return { ...proposed, id };
}

export function normalizeObservation(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, 240);
}

export function createExpedition(input: {
  installationId: string;
  buddy: Buddy;
  timeBudgetMinutes: number;
  energy: Expedition["energy"];
  boundaries: string[];
  transformed: boolean;
  now?: string;
  id?: string;
  proposedInstruction?: unknown;
}): Expedition {
  const now = input.now ?? new Date().toISOString();
  const expeditionId = input.id ?? createUuid();
  const proposedOpening = input.proposedInstruction
    ? instructionWithApplicationId(input.proposedInstruction, `provider-${expeditionId}-0`)
    : fixtureInstruction({ turn: 0, branch: "opening" });
  const baseState = {
    id: expeditionId,
    installationId: input.installationId,
    buddyId: input.buddy.id,
    status: "active",
    mode: "stay_here",
    timeBudgetMinutes: input.timeBudgetMinutes,
    energy: input.energy,
    boundaries: input.boundaries.map(normalizeObservation).filter(Boolean),
    transformed: input.transformed,
    phase: "hook",
    turnNumber: 0,
    maxTurns: 3,
    currentInstruction: proposedOpening,
    acceptedInstructions: [],
    observations: [],
    validationEvents: [],
    startedAt: now,
  };
  const checkedBase = expeditionSchema.parse(baseState);
  const selection = selectValidatedInstruction(checkedBase, proposedOpening, now);
  if (!selection.instruction) {
    throw new Error("No safe opening instruction fits the boundaries you chose.");
  }
  return expeditionSchema.parse({
    ...checkedBase,
    currentInstruction: selection.instruction,
    validationEvents: selection.events,
  });
}

function branchFor(text: string): "living" | "made" | "general" {
  if (livingWords.test(text)) return "living";
  if (madeWords.test(text)) return "made";
  return "general";
}

function groundedEnding(state: Expedition, now: string): Expedition {
  const groundedDetail = state.observations[0]?.text;
  const fieldName = state.observations.at(-1)?.text;
  const reflection = groundedDetail
    ? `You began by noticing “${groundedDetail}.” By giving ordinary details your full attention, you made this familiar place briefly unfamiliar again.`
    : "You made room for close attention. Even without naming a discovery, the expedition changed the pace of an ordinary moment.";
  const body = groundedDetail
    ? `Field note: ${fieldName ? `${fieldName} — ` : ""}${groundedDetail}`
    : "Field note: A quiet interval, deliberately noticed.";

  return expeditionSchema.parse({
    ...state,
    status: "complete",
    phase: "reflection",
    currentInstruction: undefined,
    reflection,
    memento: {
      id: `memento-${state.id}`,
      title: fieldName || "A Quiet Interval",
      body,
      groundedDetail,
    },
    completedAt: now,
  });
}

export function recordTurnResponse(
  rawRequest: TurnRequest,
  now = new Date().toISOString(),
): Expedition {
  const request = turnRequestSchema.parse(rawRequest);
  const { state, kind } = request;
  if (kind === "not_possible") {
    throw new Error("A refusal does not record an observation.");
  }
  if (state.status !== "active" || !state.currentInstruction) {
    throw new Error("Only an active expedition can advance.");
  }

  const text = normalizeObservation(request.text);
  if (!text) throw new Error("Tell the buddy what you noticed before continuing.");

  const observation: Observation = {
    id: `observation-${state.id}-${state.turnNumber + 1}`,
    instructionId: state.currentInstruction.id,
    text,
    kind: kind === "unexpected" ? "unexpected" : "observation",
    recordedAt: now,
  };
  const acceptedInstructions = [...state.acceptedInstructions, state.currentInstruction];
  const advanced = expeditionSchema.parse({
    ...state,
    turnNumber: state.turnNumber + 1,
    phase: state.turnNumber + 1 === 1 ? "movement" : state.turnNumber + 1 === 2 ? "discovery" : "reflection",
    acceptedInstructions,
    observations: [...state.observations, observation],
    currentInstruction: state.currentInstruction,
  });

  return advanced.turnNumber === advanced.maxTurns ? groundedEnding(advanced, now) : advanced;
}

export function deterministicTurnInstruction(state: Expedition): Instruction {
  const latest = state.observations.at(-1)?.text ?? "";
  return fixtureInstruction({
    turn: state.turnNumber as 1 | 2,
    branch: state.turnNumber === 1 ? branchFor(latest) : "general",
    detail: state.observations[0]?.text,
  });
}

export function continueExpedition(
  advanced: Expedition,
  proposedInstruction?: unknown,
  now = new Date().toISOString(),
): Expedition {
  if (advanced.status !== "active" || advanced.turnNumber < 1 || advanced.turnNumber >= advanced.maxTurns) {
    return expeditionSchema.parse(advanced);
  }
  const proposed = proposedInstruction
    ? instructionWithApplicationId(proposedInstruction, `provider-${advanced.id}-${advanced.turnNumber}`)
    : deterministicTurnInstruction(advanced);
  const selection = selectValidatedInstruction(advanced, proposed, now);
  if (!selection.instruction) {
    return expeditionSchema.parse({
      ...advanced,
      status: "stopped",
      currentInstruction: undefined,
      validationEvents: [...advanced.validationEvents, ...selection.events],
      completedAt: now,
    });
  }
  return expeditionSchema.parse({
    ...advanced,
    currentInstruction: selection.instruction,
    validationEvents: [...advanced.validationEvents, ...selection.events],
  });
}

export function orchestrateTurn(rawRequest: TurnRequest, now = new Date().toISOString()): Expedition {
  const request = turnRequestSchema.parse(rawRequest);
  const { state, kind } = request;
  if (state.status !== "active" || !state.currentInstruction) {
    throw new Error("Only an active expedition can advance.");
  }

  if (kind === "not_possible") {
    const selection = selectValidatedInstruction(
      state,
      { ...safeFallbackCandidates(state)[0], id: `refusal-alternative-${state.turnNumber}` },
      now,
    );
    if (!selection.instruction) {
      return expeditionSchema.parse({
        ...state,
        status: "stopped",
        currentInstruction: undefined,
        validationEvents: [...state.validationEvents, ...selection.events],
        completedAt: now,
      });
    }
    return expeditionSchema.parse({
      ...state,
      currentInstruction: selection.instruction,
      validationEvents: [...state.validationEvents, ...selection.events],
    });
  }

  const advanced = recordTurnResponse(request, now);
  return advanced.status === "complete" ? advanced : continueExpedition(advanced, undefined, now);
}

export function pauseExpedition(state: Expedition): Expedition {
  if (state.status !== "active") throw new Error("Only an active expedition can pause.");
  return expeditionSchema.parse({ ...state, status: "paused" });
}

export function resumeExpedition(state: Expedition): Expedition {
  if (state.status !== "paused") throw new Error("Only a paused expedition can resume.");
  return expeditionSchema.parse({ ...state, status: "active" });
}

export function stopExpedition(state: Expedition, now = new Date().toISOString()): Expedition {
  if (state.status !== "active" && state.status !== "paused") {
    throw new Error("Only an active or paused expedition can stop.");
  }
  return expeditionSchema.parse({
    ...state,
    status: "stopped",
    currentInstruction: undefined,
    completedAt: now,
  });
}
