import type { BuddyAdapter } from "@/adapters/buddy-adapter";

import {
  buildStartAdapterContext,
  buildTurnAdapterContext,
  providerStartRequestSchema,
  providerTurnRequestSchema,
} from "./adapter";
import {
  continueExpedition,
  createExpedition,
  orchestrateTurn,
  recordTurnResponse,
} from "./engine";

export type OrchestrationResult = {
  state: ReturnType<typeof createExpedition>;
  providerCalled: boolean;
  fallbackUsed: boolean;
};

export async function startExpeditionWithAdapter(
  rawRequest: unknown,
  adapter: BuddyAdapter,
): Promise<OrchestrationResult> {
  const request = providerStartRequestSchema.parse(rawRequest);
  const providerResult = await adapter.proposeInstruction(buildStartAdapterContext(request));
  const state = createExpedition({
    ...request,
    proposedInstruction: providerResult.ok ? providerResult.proposal : undefined,
  });
  const acceptedProviderProposal = state.currentInstruction?.id === `provider-${state.id}-0`;
  return {
    state,
    providerCalled: true,
    fallbackUsed: !providerResult.ok || !acceptedProviderProposal,
  };
}

export async function advanceExpeditionWithAdapter(
  rawRequest: unknown,
  adapter: BuddyAdapter,
): Promise<OrchestrationResult> {
  const request = providerTurnRequestSchema.parse(rawRequest);
  if (request.kind === "not_possible") {
    return {
      state: orchestrateTurn(request),
      providerCalled: false,
      fallbackUsed: false,
    };
  }

  const advanced = recordTurnResponse(request);
  if (advanced.status === "complete") {
    return { state: advanced, providerCalled: false, fallbackUsed: false };
  }

  const providerResult = await adapter.proposeInstruction(
    buildTurnAdapterContext(advanced, request.buddy),
  );
  const state = continueExpedition(
    advanced,
    providerResult.ok ? providerResult.proposal : undefined,
  );
  const acceptedProviderProposal =
    state.currentInstruction?.id === `provider-${state.id}-${state.turnNumber}`;
  return {
    state,
    providerCalled: true,
    fallbackUsed: !providerResult.ok || !acceptedProviderProposal,
  };
}
