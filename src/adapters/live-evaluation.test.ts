import { describe, expect, it, vi } from "vitest";

import { createOpenAICompatibleBuddyAdapter } from "./buddy-adapter";
import { advanceExpeditionWithAdapter, startExpeditionWithAdapter } from "@/domain/live-orchestration";
import { INSTALLATION_ID, REQUEST_ID, TEST_BUDDY } from "@/domain/test-helpers";

const proposals = [
  {
    family: "observation",
    text: "Choose one overlooked detail in view and let it become the first signal.",
    expectedMinutes: 2,
    physicalEffort: "none",
    locationRequirement: "none",
    safetyNotes: ["Remain in your current safe setting."],
    responsePrompt: "What detail became the first signal?",
  },
  {
    family: "noticing",
    text: "Return to the green leaf. Follow one edge until a second detail changes how it looks.",
    expectedMinutes: 2,
    physicalEffort: "none",
    locationRequirement: "none",
    safetyNotes: ["Observe without touching."],
    responsePrompt: "What changed at the leaf's edge?",
  },
  {
    family: "reflection",
    text: "Hold the green leaf beside the warm edge you noticed. Give their connection a private field name.",
    expectedMinutes: 2,
    physicalEffort: "none",
    locationRequirement: "none",
    safetyNotes: [],
    responsePrompt: "What field name joins the two signals?",
  },
] as const;

describe("OpenAI-compatible signal evaluation fixture", () => {
  it("carries grounded details through invitation, pursuit, and revelation over HTTP", async () => {
    let responseIndex = 0;
    const fetchImplementation = vi.fn(async () => new Response(JSON.stringify({
      choices: [{
        finish_reason: "stop",
        message: { content: JSON.stringify(proposals[responseIndex++]) },
      }],
    }), { status: 200, headers: { "content-type": "application/json" } }));
    const adapter = createOpenAICompatibleBuddyAdapter({
      mode: "openai_compatible",
      baseUrl: "https://provider.test/v1",
      apiKey: "redacted-evaluation-key",
      model: "fixture-signal-model",
      timeoutMs: 1_000,
    }, fetchImplementation as typeof fetch);

    const started = await startExpeditionWithAdapter({
      requestId: REQUEST_ID,
      installationId: INSTALLATION_ID,
      buddy: TEST_BUDDY,
      timeBudgetMinutes: 10,
      energy: "medium",
      boundaries: [],
      transformed: true,
    }, adapter);
    const pursued = await advanceExpeditionWithAdapter({
      requestId: "33333333-3333-4333-8333-333333333333",
      state: started.state,
      buddy: TEST_BUDDY,
      kind: "done",
      text: "green leaf",
    }, adapter);
    const revealed = await advanceExpeditionWithAdapter({
      requestId: "44444444-4444-4444-8444-444444444444",
      state: pursued.state,
      buddy: TEST_BUDDY,
      kind: "done",
      text: "warm edge",
    }, adapter);
    const completed = await advanceExpeditionWithAdapter({
      requestId: "55555555-5555-4555-8555-555555555555",
      state: revealed.state,
      buddy: TEST_BUDDY,
      kind: "done",
      text: "Green Threshold",
    }, adapter);

    expect(started.state.phase).toBe("hook");
    expect(pursued.state.currentInstruction?.text).toContain("green leaf");
    expect(revealed.state.currentInstruction?.text).toContain("warm edge");
    expect(new Set([
      started.state.currentInstruction?.text,
      pursued.state.currentInstruction?.text,
      revealed.state.currentInstruction?.text,
    ]).size).toBe(3);
    expect(completed.state.status).toBe("complete");
    expect(completed.state.memento?.groundedDetail).toBe("green leaf");
    expect(fetchImplementation).toHaveBeenCalledTimes(3);
  });
});
