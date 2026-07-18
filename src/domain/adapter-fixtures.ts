import type { AdapterInstructionProposal, ProviderResult } from "./adapter";

export const validProviderProposal: AdapterInstructionProposal = {
  family: "observation",
  text: "Find the nearest edge between light and shadow. Notice the smallest detail that crosses it.",
  expectedMinutes: 2,
  physicalEffort: "light",
  locationRequirement: "none",
  safetyNotes: [],
  responsePrompt: "What crossed the edge?",
};

export const providerFailureFixtures = {
  timeout: { ok: false, kind: "timeout" },
  unavailable: { ok: false, kind: "unavailable" },
  rateLimited: { ok: false, kind: "rate_limited" },
  invalidOutput: { ok: false, kind: "invalid_output" },
  toolCall: { ok: false, kind: "tool_call" },
} as const satisfies Record<string, ProviderResult>;

export const invalidProviderPayloads = {
  stateMutation: { ...validProviderProposal, status: "complete" },
  inventedId: { ...validProviderProposal, id: "provider-owned-id" },
  excessiveText: { ...validProviderProposal, text: "x".repeat(501) },
  unsafeEffort: { ...validProviderProposal, physicalEffort: "extreme" },
  toolCall: { tool_calls: [{ name: "open_door" }] },
};
