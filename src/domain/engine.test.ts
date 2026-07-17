import { describe, expect, it } from "vitest";

import {
  orchestrateTurn,
  pauseExpedition,
  resumeExpedition,
  stopExpedition,
} from "./engine";
import { activeExpedition } from "./test-helpers";

describe("expedition engine", () => {
  it("branches visibly from the first observation", () => {
    const living = orchestrateTurn({
      state: activeExpedition(),
      kind: "done",
      text: "A green leaf moving in the light",
    });
    const made = orchestrateTurn({
      state: activeExpedition(),
      kind: "done",
      text: "A scratch along the wooden table",
    });
    expect(living.currentInstruction?.id).toBe("trace-living-detail");
    expect(made.currentInstruction?.id).toBe("trace-made-detail");
  });

  it("produces the same branch for the same normalized response", () => {
    const first = orchestrateTurn({
      state: activeExpedition(),
      kind: "done",
      text: "  A   green leaf  ",
    });
    const second = orchestrateTurn({
      state: activeExpedition(),
      kind: "done",
      text: "A green leaf",
    });
    expect(first.currentInstruction).toEqual(second.currentInstruction);
  });

  it("refuses without advancing the accepted turn", () => {
    const state = orchestrateTurn({
      state: activeExpedition(),
      kind: "not_possible",
      text: "",
    });
    expect(state.turnNumber).toBe(0);
    expect(state.currentInstruction?.id).toBe("refusal-alternative-0");
  });

  it("revalidates refusal alternatives against current boundaries", () => {
    const state = orchestrateTurn({
      state: activeExpedition({ boundaries: ["no listening"] }),
      kind: "not_possible",
      text: "",
    });
    expect(state.currentInstruction?.id).toBe("still-color-0");
    expect(state.validationEvents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ outcome: "rejected", reason: "boundary" }),
        expect.objectContaining({ instructionId: "still-color-0", outcome: "accepted" }),
      ]),
    );
  });

  it("stops gracefully when no safe refusal alternative exists", () => {
    const state = orchestrateTurn({
      state: activeExpedition({
        boundaries: ["no listening", "no color", "no noticing", "no remaining"],
      }),
      kind: "not_possible",
      text: "",
    });
    expect(state.status).toBe("stopped");
    expect(state.currentInstruction).toBeUndefined();
    expect(state.memento).toBeUndefined();
  });

  it("stores redacted validation events without instruction or observation text", () => {
    const state = orchestrateTurn({
      state: activeExpedition(),
      kind: "done",
      text: "a private green leaf",
    });
    const serializedEvents = JSON.stringify(state.validationEvents);
    expect(serializedEvents).not.toContain("private green leaf");
    expect(state.validationEvents.at(-1)).toMatchObject({ outcome: "accepted" });
  });

  it("does not advance on an empty observation", () => {
    expect(() =>
      orchestrateTurn({ state: activeExpedition(), kind: "done", text: "   " }),
    ).toThrow(/what you noticed/i);
  });

  it("pauses and resumes without changing the instruction", () => {
    const opening = activeExpedition();
    const paused = pauseExpedition(opening);
    const resumed = resumeExpedition(paused);
    expect(paused.status).toBe("paused");
    expect(resumed.currentInstruction).toEqual(opening.currentInstruction);
    expect(resumed.turnNumber).toBe(0);
  });

  it("stops with a partial record and no memento", () => {
    const stopped = stopExpedition(activeExpedition());
    expect(stopped.status).toBe("stopped");
    expect(stopped.memento).toBeUndefined();
    expect(stopped.currentInstruction).toBeUndefined();
  });

  it("completes exactly three turns with grounded output", () => {
    let state = activeExpedition();
    for (const text of ["a green leaf", "a small shadow", "Green Signal"]) {
      state = orchestrateTurn({ state, kind: "done", text });
    }
    expect(state.status).toBe("complete");
    expect(state.turnNumber).toBe(3);
    expect(state.currentInstruction).toBeUndefined();
    expect(state.memento?.groundedDetail).toBe("a green leaf");
    expect(state.reflection).toContain("a green leaf");
  });
});
