import { describe, expect, it, vi } from "vitest";

import { buildStartAdapterContext, providerStartRequestSchema } from "@/domain/adapter";
import { validProviderProposal } from "@/domain/adapter-fixtures";
import { INSTALLATION_ID, REQUEST_ID, TEST_BUDDY } from "@/domain/test-helpers";

import { createOpenAICompatibleBuddyAdapter } from "./buddy-adapter";

const config = {
  mode: "openai_compatible" as const,
  baseUrl: "https://example.test/v1",
  apiKey: "provider-secret",
  model: "example-model",
  timeoutMs: 1000,
};

const context = buildStartAdapterContext(providerStartRequestSchema.parse({
  requestId: REQUEST_ID,
  installationId: INSTALLATION_ID,
  buddy: TEST_BUDDY,
  timeBudgetMinutes: 10,
  energy: "medium",
  boundaries: [],
  transformed: true,
}));

function completion(
  content: unknown,
  options: { toolCalls?: unknown[]; functionCall?: unknown; finishReason?: string } = {},
) {
  return new Response(JSON.stringify({
    choices: [{
      finish_reason: options.finishReason,
      message: {
        content: typeof content === "string" ? content : JSON.stringify(content),
        tool_calls: options.toolCalls,
        function_call: options.functionCall,
      },
    }],
  }), { status: 200, headers: { "content-type": "application/json" } });
}

describe("OpenAI-compatible buddy adapter", () => {
  it("makes one bounded structured request and parses the proposal", async () => {
    const fetchMock = vi.fn(async () => completion(validProviderProposal));
    const result = await createOpenAICompatibleBuddyAdapter(config, fetchMock as typeof fetch)
      .proposeInstruction(context);

    expect(result).toEqual({ ok: true, proposal: validProviderProposal });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://example.test/v1/chat/completions");
    expect(init?.headers).toEqual({
      authorization: "Bearer provider-secret",
      "content-type": "application/json",
    });
    const body = JSON.parse(String(init?.body));
    expect(body.response_format).toEqual({ type: "json_object" });
    expect(body.tools).toBeUndefined();
    expect(body.messages[1].content).not.toContain(INSTALLATION_ID);
  });

  it("rejects tool calls and malformed provider output", async () => {
    const toolFetch = vi.fn(async () => completion(validProviderProposal, { toolCalls: [{}] }));
    await expect(createOpenAICompatibleBuddyAdapter(config, toolFetch as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "tool_call" });

    const legacyToolFetch = vi.fn(async () => completion(validProviderProposal, { functionCall: {} }));
    await expect(createOpenAICompatibleBuddyAdapter(config, legacyToolFetch as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "tool_call" });

    const toolFinishFetch = vi.fn(async () => completion(validProviderProposal, { finishReason: "tool_calls" }));
    await expect(createOpenAICompatibleBuddyAdapter(config, toolFinishFetch as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "tool_call" });

    const invalidFetch = vi.fn(async () => completion("not json"));
    await expect(createOpenAICompatibleBuddyAdapter(config, invalidFetch as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "invalid_output" });
  });

  it("maps rate limits, unavailability, and aborts without retrying", async () => {
    const rateLimited = vi.fn(async () => new Response("", { status: 429 }));
    await expect(createOpenAICompatibleBuddyAdapter(config, rateLimited as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "rate_limited" });
    expect(rateLimited).toHaveBeenCalledTimes(1);

    const unavailable = vi.fn(async () => new Response("", { status: 503 }));
    await expect(createOpenAICompatibleBuddyAdapter(config, unavailable as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "unavailable" });

    const networkFailure = vi.fn(async () => { throw new TypeError("fetch failed"); });
    await expect(createOpenAICompatibleBuddyAdapter(config, networkFailure as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "unavailable" });

    const aborted = vi.fn(async () => { throw new DOMException("Aborted", "AbortError"); });
    await expect(createOpenAICompatibleBuddyAdapter(config, aborted as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "timeout" });
  });

  it("clears the timeout after an immediate transport failure", async () => {
    vi.useFakeTimers();
    try {
      const networkFailure = vi.fn(async () => { throw new TypeError("fetch failed"); });
      await createOpenAICompatibleBuddyAdapter(config, networkFailure as typeof fetch).proposeInstruction(context);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it("rejects oversized response bodies before proposal parsing", async () => {
    const oversized = vi.fn(async () => new Response("x".repeat(32_769), { status: 200 }));
    await expect(createOpenAICompatibleBuddyAdapter(config, oversized as typeof fetch).proposeInstruction(context))
      .resolves.toEqual({ ok: false, kind: "invalid_output" });
    expect(oversized).toHaveBeenCalledTimes(1);
  });
});
