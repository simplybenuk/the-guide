import type { Expedition, Instruction } from "./schemas";

export type ValidationResult =
  | { ok: true; instruction: Instruction }
  | { ok: false; reason: "prohibited" | "boundary" | "time" | "energy" | "mode" };

const prohibitedPatterns = [
  /\b(road|traffic|roof|height|cliff|water|fire|weapon|machinery)\b/i,
  /\b(trespass|break in|evade|illegal|steal|damage)\b/i,
  /\b(harass|coerce|deceive|film (a |the )?stranger)\b/i,
  /\b(medical|medicine|diagnos|invest|financial|legal advice)\b/i,
  /\b(password|social security|exact location|home address)\b/i,
  /\b(isolated|travel alone|unsafe solo)\b/i,
  /\b(alcohol|drug|unknown substance|swallow|ingest)\b/i,
  /\b(surveillance|being watched|they are watching|conspiracy|secret authority)\b/i,
  /\b(destiny|fated|chosen one|supernatural certainty|objectively real omen)\b/i,
  /\b(you (must|cannot refuse)|obey me|do not stop|not allowed to stop)\b/i,
  /\b(imitate|recreate|quote) (a |the )?(film|game|character|scene|dialogue)\b/i,
];

export function validateInstruction(
  state: Expedition,
  instruction: Instruction,
): ValidationResult {
  const text = `${instruction.text} ${instruction.responsePrompt}`;
  if (prohibitedPatterns.some((pattern) => pattern.test(text))) {
    return { ok: false, reason: "prohibited" };
  }
  if (
    state.boundaries.some((boundary) => {
      const words = boundary.toLowerCase().match(/[a-z]{4,}/g) ?? [];
      return words.some((word) => {
        const stems = [word, word.replace(/ing$/, ""), word.replace(/ed$/, "")].filter(
          (stem) => stem.length >= 4,
        );
        return stems.some((stem) => text.toLowerCase().includes(stem));
      });
    })
  ) {
    return { ok: false, reason: "boundary" };
  }
  const elapsedEstimate = state.acceptedInstructions.reduce(
    (total, accepted) => total + accepted.expectedMinutes,
    0,
  );
  if (elapsedEstimate + instruction.expectedMinutes > state.timeBudgetMinutes) {
    return { ok: false, reason: "time" };
  }
  if (state.energy === "low" && instruction.physicalEffort === "moderate") {
    return { ok: false, reason: "energy" };
  }
  if (
    state.mode === "stay_here" &&
    (instruction.locationRequirement === "nearby" ||
      instruction.locationRequirement === "destination")
  ) {
    return { ok: false, reason: "mode" };
  }
  return { ok: true, instruction };
}
