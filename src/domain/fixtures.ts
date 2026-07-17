import type { Expedition, Instruction } from "./schemas";

export type FixtureContext = {
  turn: 0 | 1 | 2;
  branch: "opening" | "living" | "made" | "general" | "alternate";
  detail?: string;
};

const instructions: Record<string, Instruction> = {
  opening: {
    id: "observe-nearest-view",
    family: "observation",
    text: "Find the nearest view into another part of your surroundings. Look for one detail you have stopped noticing.",
    expectedMinutes: 2,
    physicalEffort: "light",
    locationRequirement: "indoors",
    safetyNotes: ["Remain in your current safe setting."],
    responsePrompt: "What detail claimed your attention first?",
  },
  alternate: {
    id: "listen-in-place",
    family: "noticing",
    text: "Stay exactly where you are. Listen until one ordinary sound separates itself from the background.",
    expectedMinutes: 2,
    physicalEffort: "none",
    locationRequirement: "none",
    safetyNotes: ["No movement is required."],
    responsePrompt: "What sound emerged?",
  },
  living: {
    id: "trace-living-detail",
    family: "noticing",
    text: "Look again for evidence of something living: a plant, a shadow in motion, or a sign that someone has cared for this place.",
    expectedMinutes: 2,
    physicalEffort: "light",
    locationRequirement: "indoors",
    safetyNotes: ["Observe without touching or disturbing anything."],
    responsePrompt: "What evidence did you find?",
  },
  made: {
    id: "trace-made-detail",
    family: "observation",
    text: "Choose one human-made object in view. Notice a mark, join, edge, or repair that reveals how it came to be here.",
    expectedMinutes: 2,
    physicalEffort: "none",
    locationRequirement: "none",
    safetyNotes: ["Observe only; do not move or open the object."],
    responsePrompt: "What small clue did the object give you?",
  },
  general: {
    id: "change-the-frame",
    family: "movement",
    text: "Shift your point of view by one safe step or by turning in place. Find what becomes visible only from there.",
    expectedMinutes: 2,
    physicalEffort: "light",
    locationRequirement: "indoors",
    safetyNotes: ["Do not climb, reach, or leave your current safe setting."],
    responsePrompt: "What appeared when the frame changed?",
  },
  closing: {
    id: "name-the-trace",
    family: "writing",
    text: "Give the detail you found a private field name—two or three words that will return you to this moment.",
    expectedMinutes: 2,
    physicalEffort: "none",
    locationRequirement: "none",
    safetyNotes: [],
    responsePrompt: "What field name did you choose?",
  },
};

export function fixtureInstruction(context: FixtureContext): Instruction {
  if (context.turn === 0) return instructions.opening;
  if (context.turn === 1) return instructions[context.branch];

  return {
    ...instructions.closing,
    text: context.detail
      ? `Hold “${context.detail}” in mind. Give that discovery a private field name—two or three words that will return you to this moment.`
      : instructions.closing.text,
  };
}

export function safeFallback(state: Expedition): Instruction {
  return {
    ...instructions.alternate,
    id: `safe-fallback-${state.turnNumber}`,
  };
}

export function safeFallbackCandidates(state: Expedition): Instruction[] {
  return [
    safeFallback(state),
    {
      id: `still-color-${state.turnNumber}`,
      family: "observation",
      text: "Without moving, choose the nearest patch of color and notice where its edge begins and ends.",
      expectedMinutes: 1,
      physicalEffort: "none",
      locationRequirement: "none",
      safetyNotes: ["Remain exactly where you are."],
      responsePrompt: "What color did you choose?",
    },
  ];
}
