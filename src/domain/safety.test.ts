import { describe, expect, it } from "vitest";

import { validateInstruction } from "./safety";
import type { Instruction } from "./schemas";
import { activeExpedition } from "./test-helpers";

function instruction(text: string, overrides: Partial<Instruction> = {}): Instruction {
  return {
    id: "proposal",
    family: "observation",
    text,
    expectedMinutes: 2,
    physicalEffort: "none",
    locationRequirement: "none",
    safetyNotes: [],
    responsePrompt: "What did you notice?",
    ...overrides,
  };
}

describe("action validation", () => {
  it.each([
    "Stand in the road",
    "Trespass into the garden",
    "Deceive a stranger",
    "Make a medical decision",
    "Share your password",
    "Travel alone to an isolated destination",
    "Swallow an unknown substance",
  ])("rejects prohibited proposal: %s", (text) => {
    expect(validateInstruction(activeExpedition(), instruction(text))).toEqual({
      ok: false,
      reason: "prohibited",
    });
  });

  it("rejects user boundary conflicts", () => {
    const state = activeExpedition({ boundaries: ["Do not ask me to write"] });
    expect(validateInstruction(state, instruction("Write down one word"))).toEqual({
      ok: false,
      reason: "boundary",
    });
  });

  it("rejects travel, excessive time, and excessive effort", () => {
    expect(
      validateInstruction(
        activeExpedition(),
        instruction("Go elsewhere", { locationRequirement: "destination" }),
      ),
    ).toMatchObject({ ok: false, reason: "mode" });
    const opening = activeExpedition().currentInstruction!;
    expect(
      validateInstruction(
        activeExpedition({
          timeBudgetMinutes: 10,
          turnNumber: 1,
          acceptedInstructions: [opening],
        }),
        instruction("Wait", { expectedMinutes: 10 }),
      ),
    ).toMatchObject({ ok: false, reason: "time" });
    expect(
      validateInstruction(
        activeExpedition({ energy: "low" }),
        instruction("Move something", { physicalEffort: "moderate" }),
      ),
    ).toMatchObject({ ok: false, reason: "energy" });
  });

  it("accepts a safe in-place observation", () => {
    expect(validateInstruction(activeExpedition(), instruction("Notice a nearby color"))).toMatchObject({
      ok: true,
    });
  });
});
