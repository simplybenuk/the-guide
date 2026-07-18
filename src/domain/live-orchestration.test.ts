import { describe, expect, it, vi } from "vitest";

import type { BuddyAdapter } from "@/adapters/buddy-adapter";

import type { AdapterContext } from "./adapter";
import { validProviderProposal } from "./adapter-fixtures";
import { orchestrateTurn } from "./engine";
import { advanceExpeditionWithAdapter, startExpeditionWithAdapter } from "./live-orchestration";
import { activeExpedition, INSTALLATION_ID, REQUEST_ID, TEST_BUDDY } from "./test-helpers";

const startInput = {
  requestId: REQUEST_ID,
  installationId: INSTALLATION_ID,
  buddy: TEST_BUDDY,
  timeBudgetMinutes: 10,
  energy: "medium" as const,
  boundaries: [],
  transformed: true,
};

function adapterReturning(result: Awaited<ReturnType<BuddyAdapter["proposeInstruction"]>>) {
  const proposeInstruction = vi.fn(async (context: AdapterContext) => {
    void context;
    return result;
  });
  return { adapter: { proposeInstruction }, proposeInstruction };
}

describe("live orchestration", () => {
  it("accepts one safe opening proposal while retaining application-owned identity", async () => {
    const { adapter, proposeInstruction } = adapterReturning({ ok: true, proposal: validProviderProposal });
    const result = await startExpeditionWithAdapter(startInput, adapter);

    expect(proposeInstruction).toHaveBeenCalledOnce();
    expect(result.state.currentInstruction?.id).toBe(`provider-${result.state.id}-0`);
    expect(result.fallbackUsed).toBe(false);
  });

  it.each(["timeout", "unavailable", "rate_limited", "invalid_output", "tool_call"] as const)(
    "uses one deterministic opening fallback for %s",
    async (kind) => {
      const { adapter, proposeInstruction } = adapterReturning({ ok: false, kind });
      const result = await startExpeditionWithAdapter(startInput, adapter);
      expect(proposeInstruction).toHaveBeenCalledOnce();
      expect(result.state.currentInstruction?.id).toBe("observe-nearest-view");
      expect(result.fallbackUsed).toBe(true);
    },
  );

  it("rejects an unsafe proposal and selects a validated fallback", async () => {
    const { adapter } = adapterReturning({
      ok: true,
      proposal: { ...validProviderProposal, text: "This proves they are watching you" },
    });
    const result = await startExpeditionWithAdapter(startInput, adapter);
    expect(result.fallbackUsed).toBe(true);
    expect(JSON.stringify(result.state)).not.toContain("they are watching you");
    expect(result.state.validationEvents).toEqual(expect.arrayContaining([
      expect.objectContaining({ outcome: "rejected", reason: "prohibited" }),
    ]));
  });

  it("preserves the submitted state when a turn provider fails", async () => {
    const original = activeExpedition();
    const snapshot = structuredClone(original);
    const { adapter } = adapterReturning({ ok: false, kind: "timeout" });
    const result = await advanceExpeditionWithAdapter({
      requestId: REQUEST_ID, state: original, buddy: TEST_BUDDY, kind: "done", text: "a green leaf",
    }, adapter);
    expect(original).toEqual(snapshot);
    expect(result.fallbackUsed).toBe(true);
    expect(result.state.currentInstruction?.id).toBe("trace-living-detail");
  });

  it("sends the recorded observation to one turn proposal and accepts it once", async () => {
    const { adapter, proposeInstruction } = adapterReturning({ ok: true, proposal: validProviderProposal });
    const result = await advanceExpeditionWithAdapter({
      requestId: REQUEST_ID, state: activeExpedition(), buddy: TEST_BUDDY, kind: "done", text: "a green leaf",
    }, adapter);
    expect(proposeInstruction).toHaveBeenCalledOnce();
    expect(proposeInstruction.mock.calls[0][0].observations.at(-1)?.text).toBe("a green leaf");
    expect(result.state.turnNumber).toBe(1);
    expect(result.state.currentInstruction?.id).toBe(`provider-${result.state.id}-1`);
  });

  it("does not call the provider for refusal or completion", async () => {
    const { adapter, proposeInstruction } = adapterReturning({ ok: true, proposal: validProviderProposal });
    const refused = await advanceExpeditionWithAdapter({
      requestId: REQUEST_ID, state: activeExpedition(), buddy: TEST_BUDDY, kind: "not_possible", text: "",
    }, adapter);
    let nearComplete = orchestrateTurn({ state: activeExpedition(), kind: "done", text: "one" });
    nearComplete = orchestrateTurn({ state: nearComplete, kind: "done", text: "two" });
    const completed = await advanceExpeditionWithAdapter({
      requestId: REQUEST_ID, state: nearComplete, buddy: TEST_BUDDY, kind: "done", text: "three",
    }, adapter);
    expect(proposeInstruction).not.toHaveBeenCalled();
    expect(refused.state.turnNumber).toBe(0);
    expect(completed.state.status).toBe("complete");
  });
});
