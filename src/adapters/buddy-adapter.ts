import { z } from "zod";

import {
  adapterInstructionProposalSchema,
  providerResultSchema,
  type AdapterContext,
  type ProviderResult,
} from "@/domain/adapter";
import { fixtureInstruction } from "@/domain/fixtures";
import type { ProviderConfig } from "@/lib/provider-config";

import { buildSignalMessages } from "./signal-prompt";

export type BuddyAdapter = {
  proposeInstruction(context: AdapterContext): Promise<ProviderResult>;
};

type Fetch = typeof fetch;

const completionResponseSchema = z.object({
  choices: z.array(
    z.object({
      finish_reason: z.string().nullable().optional(),
      message: z.object({
        content: z.string().max(8_000).nullable().optional(),
        tool_calls: z.array(z.unknown()).optional(),
        function_call: z.unknown().optional(),
      }),
    }),
  ).min(1).max(4),
});

const MAX_RESPONSE_BYTES = 32_768;

async function readBoundedResponse(response: Response) {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_RESPONSE_BYTES) {
    throw new Error("Provider response exceeded the allowed size.");
  }
  if (!response.body) return "";

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_RESPONSE_BYTES) {
      await reader.cancel();
      throw new Error("Provider response exceeded the allowed size.");
    }
    chunks.push(value);
  }

  const merged = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

export function createMockBuddyAdapter(): BuddyAdapter {
  return {
    async proposeInstruction(context) {
      const latest = context.observations.at(-1)?.text ?? "";
      const branch = /\b(plant|tree|leaf|bird|animal|green|flower|person|care|growing)\b/i.test(latest)
        ? "living"
        : /\b(window|chair|table|brick|wall|cup|lamp|door|metal|wood|glass|object)\b/i.test(latest)
          ? "made"
          : "general";
      const instruction = fixtureInstruction({
        turn: context.turnNumber as 0 | 1 | 2,
        branch: context.turnNumber === 0 ? "opening" : branch,
        detail: context.observations[0]?.text,
      });
      const proposal = adapterInstructionProposalSchema.parse({
        family: instruction.family,
        text: instruction.text,
        expectedMinutes: instruction.expectedMinutes,
        physicalEffort: instruction.physicalEffort,
        locationRequirement: instruction.locationRequirement,
        safetyNotes: instruction.safetyNotes,
        responsePrompt: instruction.responsePrompt,
      });
      return providerResultSchema.parse({ ok: true, proposal });
    },
  };
}

export function createOpenAICompatibleBuddyAdapter(
  config: Extract<ProviderConfig, { mode: "openai_compatible" }>,
  fetchImplementation: Fetch = fetch,
): BuddyAdapter {
  return {
    async proposeInstruction(context) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.timeoutMs);
      let response: Response;
      try {
        response = await fetchImplementation(`${config.baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${config.apiKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: config.model,
            messages: buildSignalMessages(context),
            response_format: { type: "json_object" },
            max_tokens: 450,
          }),
          signal: controller.signal,
        });
      } catch (error) {
        clearTimeout(timeout);
        if (controller.signal.aborted || (error instanceof Error && error.name === "AbortError")) {
          return { ok: false, kind: "timeout" };
        }
        return { ok: false, kind: "unavailable" };
      }
      try {
        if (response.status === 429) return { ok: false, kind: "rate_limited" };
        if (!response.ok) return { ok: false, kind: "unavailable" };

        const completion = completionResponseSchema.parse(JSON.parse(await readBoundedResponse(response)));
        const choice = completion.choices[0];
        const message = choice.message;
        if (
          message.tool_calls?.length ||
          message.function_call !== undefined ||
          choice.finish_reason === "tool_calls" ||
          choice.finish_reason === "function_call"
        ) return { ok: false, kind: "tool_call" };
        if (!message.content) return { ok: false, kind: "invalid_output" };

        const proposal = adapterInstructionProposalSchema.parse(JSON.parse(message.content));
        return providerResultSchema.parse({ ok: true, proposal });
      } catch (error) {
        if (controller.signal.aborted || (error instanceof Error && error.name === "AbortError")) {
          return { ok: false, kind: "timeout" };
        }
        return { ok: false, kind: "invalid_output" };
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}

export function createBuddyAdapter(config: ProviderConfig, fetchImplementation: Fetch = fetch) {
  return config.mode === "deterministic_mock"
    ? createMockBuddyAdapter()
    : createOpenAICompatibleBuddyAdapter(config, fetchImplementation);
}
