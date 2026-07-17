import { describe, expect, it } from "vitest";

import { expeditionSchema, instructionSchema } from "./schemas";
import { activeExpedition } from "./test-helpers";

describe("domain schemas", () => {
  it("accepts the valid opening state", () => {
    const state = expeditionSchema.parse(activeExpedition());
    expect(state.status).toBe("active");
    expect(state.validationEvents).toHaveLength(1);
  });

  it("rejects an active state without a current instruction", () => {
    expect(() =>
      expeditionSchema.parse({ ...activeExpedition(), currentInstruction: undefined }),
    ).toThrow(/current instruction/i);
  });

  it("rejects a turn count that diverges from accepted instructions", () => {
    expect(() => expeditionSchema.parse({ ...activeExpedition(), turnNumber: 1 })).toThrow(
      /accepted instruction/i,
    );
  });

  it("rejects an instruction outside the curated families", () => {
    expect(() =>
      instructionSchema.parse({
        ...activeExpedition().currentInstruction,
        family: "commerce",
      }),
    ).toThrow();
  });
});
