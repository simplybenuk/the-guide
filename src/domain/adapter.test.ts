import { describe, expect, it } from "vitest";

import {
  adapterInstructionProposalSchema,
  buildStartAdapterContext,
  buildTurnAdapterContext,
  providerResultSchema,
  providerStartRequestSchema,
  providerTurnRequestSchema,
} from "./adapter";
import {
  invalidProviderPayloads,
  providerFailureFixtures,
  validProviderProposal,
} from "./adapter-fixtures";
import { createExpedition, orchestrateTurn } from "./engine";
import { INSTALLATION_ID, REQUEST_ID, TEST_BUDDY } from "./test-helpers";

function expeditionInput() {
  return {
    requestId: REQUEST_ID,
    installationId: INSTALLATION_ID,
    buddy: TEST_BUDDY,
    timeBudgetMinutes: 10,
    energy: "medium" as const,
    boundaries: [],
    transformed: true,
  };
}

describe("buddy adapter contract", () => {
  it("accepts bounded instruction proposals without provider-owned ids", () => {
    expect(adapterInstructionProposalSchema.parse(validProviderProposal)).toEqual(validProviderProposal);
    for (const payload of Object.values(invalidProviderPayloads)) {
      expect(adapterInstructionProposalSchema.safeParse(payload).success).toBe(false);
    }
  });

  it("normalizes provider failures into non-sensitive enumerated results", () => {
    for (const failure of Object.values(providerFailureFixtures)) {
      expect(providerResultSchema.parse(failure)).toEqual(failure);
    }
  });

  it("requires an idempotency identity for start and turn actions", () => {
    const { requestId: _requestId, ...withoutRequestId } = expeditionInput();
    expect(_requestId).toBe(REQUEST_ID);
    expect(providerStartRequestSchema.safeParse(withoutRequestId).success).toBe(false);
    expect(providerTurnRequestSchema.safeParse({
      state: createExpedition(expeditionInput()),
      buddy: TEST_BUDDY,
      kind: "done",
      text: "a green leaf",
    }).success).toBe(false);
  });

  it("builds minimal start context without installation or buddy identity fields", () => {
    const request = providerStartRequestSchema.parse({
      ...expeditionInput(),
      transformed: true,
    });
    const context = buildStartAdapterContext(request);
    const serialized = JSON.stringify(context);

    expect(context.buddy.name).toBe(TEST_BUDDY.name);
    expect(context.transformed).toBe(true);
    expect(serialized).not.toContain(request.installationId);
    expect(serialized).not.toContain(TEST_BUDDY.id);
    expect(serialized).not.toContain("memoryPolicy");
  });

  it("sends only bounded recent journey context for later proposals", () => {
    const initial = createExpedition(expeditionInput());
    const advanced = orchestrateTurn({ state: initial, kind: "done", text: "a green leaf" });
    const context = buildTurnAdapterContext(advanced, TEST_BUDDY);
    const serialized = JSON.stringify(context);

    expect(context.observations).toEqual([{ text: "a green leaf", kind: "observation" }]);
    expect(context.acceptedInstructions).toHaveLength(1);
    expect(serialized).not.toContain(initial.installationId);
    expect(serialized).not.toContain(initial.id);
    expect(serialized).not.toContain("validationEvents");
    expect(serialized).not.toContain("memento");
    expect(serialized).not.toContain("startedAt");
  });

  it("rejects buddy context that does not belong to the active expedition", () => {
    expect(providerTurnRequestSchema.safeParse({
      requestId: REQUEST_ID,
      state: createExpedition(expeditionInput()),
      buddy: { ...TEST_BUDDY, id: "different-buddy" },
      kind: "done",
      text: "a green leaf",
    }).success).toBe(false);
  });
});
