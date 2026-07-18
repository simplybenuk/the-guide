import { z } from "zod";

import {
  actionFamilySchema,
  buddySchema,
  energySchema,
  expeditionPhaseSchema,
  expeditionSchema,
  instructionSchema,
  responseKindSchema,
  type Buddy,
  type Expedition,
} from "./schemas";

export const adapterInstructionProposalSchema = instructionSchema
  .omit({ id: true })
  .strict();

const buddyContextSchema = buddySchema
  .pick({
    name: true,
    voiceDescription: true,
    curiosities: true,
    peculiarities: true,
  })
  .strict();

const instructionContextSchema = z
  .object({
    family: actionFamilySchema,
    text: z.string().trim().min(1).max(500),
    expectedMinutes: z.number().int().min(1).max(10),
    physicalEffort: z.enum(["none", "light", "moderate"]),
    responsePrompt: z.string().trim().min(1).max(240),
  })
  .strict();

const observationContextSchema = z
  .object({
    text: z.string().trim().min(1).max(240),
    kind: z.enum(["observation", "unexpected"]),
  })
  .strict();

export const adapterContextSchema = z
  .object({
    buddy: buddyContextSchema,
    transformed: z.boolean(),
    phase: expeditionPhaseSchema,
    turnNumber: z.number().int().min(0).max(2),
    maxTurns: z.literal(3),
    timeBudgetMinutes: z.number().int().min(10).max(30),
    energy: energySchema,
    boundaries: z.array(z.string().trim().min(1).max(120)).max(8),
    acceptedInstructions: z.array(instructionContextSchema).max(2),
    observations: z.array(observationContextSchema).max(2),
  })
  .strict();

export const providerStartRequestSchema = z
  .object({
    requestId: z.string().uuid(),
    installationId: z.string().uuid(),
    buddy: buddySchema,
    timeBudgetMinutes: z.number().int().min(10).max(30),
    energy: energySchema,
    boundaries: z.array(z.string().trim().min(1).max(120)).max(8),
    transformed: z.boolean(),
  })
  .strict();

export const providerTurnRequestSchema = z
  .object({
    requestId: z.string().uuid(),
    state: expeditionSchema,
    buddy: buddySchema,
    kind: responseKindSchema,
    text: z.string().max(2000).default(""),
  })
  .strict()
  .superRefine((request, context) => {
    if (request.state.buddyId !== request.buddy.id) {
      context.addIssue({
        code: "custom",
        path: ["buddy", "id"],
        message: "The buddy must match the active expedition.",
      });
    }
  });

export const providerFailureKindSchema = z.enum([
  "timeout",
  "unavailable",
  "rate_limited",
  "invalid_output",
  "tool_call",
]);

export const providerResultSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), proposal: adapterInstructionProposalSchema }).strict(),
  z.object({ ok: z.literal(false), kind: providerFailureKindSchema }).strict(),
]);

function buddyContext(buddy: Buddy) {
  return {
    name: buddy.name,
    voiceDescription: buddy.voiceDescription,
    curiosities: buddy.curiosities,
    peculiarities: buddy.peculiarities,
  };
}

export function buildStartAdapterContext(input: z.infer<typeof providerStartRequestSchema>) {
  return adapterContextSchema.parse({
    buddy: buddyContext(input.buddy),
    transformed: input.transformed,
    phase: "hook",
    turnNumber: 0,
    maxTurns: 3,
    timeBudgetMinutes: input.timeBudgetMinutes,
    energy: input.energy,
    boundaries: input.boundaries,
    acceptedInstructions: [],
    observations: [],
  });
}

export function buildTurnAdapterContext(state: Expedition, buddy: Buddy) {
  return adapterContextSchema.parse({
    buddy: buddyContext(buddy),
    transformed: state.transformed,
    phase: state.phase,
    turnNumber: Math.min(state.turnNumber, 2),
    maxTurns: state.maxTurns,
    timeBudgetMinutes: state.timeBudgetMinutes,
    energy: state.energy,
    boundaries: state.boundaries,
    acceptedInstructions: state.acceptedInstructions.slice(-2).map((instruction) => ({
      family: instruction.family,
      text: instruction.text,
      expectedMinutes: instruction.expectedMinutes,
      physicalEffort: instruction.physicalEffort,
      responsePrompt: instruction.responsePrompt,
    })),
    observations: state.observations.slice(-2).map((observation) => ({
      text: observation.text,
      kind: observation.kind,
    })),
  });
}

export type AdapterContext = z.infer<typeof adapterContextSchema>;
export type AdapterInstructionProposal = z.infer<typeof adapterInstructionProposalSchema>;
export type ProviderResult = z.infer<typeof providerResultSchema>;
