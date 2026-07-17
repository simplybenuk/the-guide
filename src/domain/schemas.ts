import { z } from "zod";

export const energySchema = z.enum(["low", "medium", "high"]);
export const expeditionStatusSchema = z.enum([
  "setup",
  "ritual",
  "active",
  "paused",
  "complete",
  "stopped",
]);
export const expeditionPhaseSchema = z.enum([
  "hook",
  "movement",
  "discovery",
  "reflection",
]);
export const actionFamilySchema = z.enum([
  "observation",
  "movement",
  "writing",
  "making",
  "noticing",
  "reflection",
]);

export const buddySchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1).max(40),
  voiceDescription: z.string().trim().min(1).max(120),
  curiosities: z.array(z.string().trim().min(1).max(80)).min(1).max(3),
  peculiarities: z.array(z.string().trim().min(1).max(80)).min(1).max(3),
  memoryPolicy: z.literal("archive_with_consent"),
});

export const instructionSchema = z.object({
  id: z.string().min(1),
  family: actionFamilySchema,
  text: z.string().trim().min(1).max(500),
  expectedMinutes: z.number().int().min(1).max(10),
  physicalEffort: z.enum(["none", "light", "moderate"]),
  locationRequirement: z.enum(["none", "indoors", "nearby", "destination"]),
  safetyNotes: z.array(z.string().max(120)).max(4),
  responsePrompt: z.string().trim().min(1).max(240),
});

export const observationSchema = z.object({
  id: z.string().min(1),
  instructionId: z.string().min(1),
  text: z.string().trim().min(1).max(240),
  kind: z.enum(["observation", "unexpected"]),
  recordedAt: z.string().datetime(),
});

export const mementoSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(800),
  groundedDetail: z.string().max(240).optional(),
});

export const validationEventSchema = z.object({
  instructionId: z.string().min(1),
  outcome: z.enum(["accepted", "rejected"]),
  reason: z.enum(["prohibited", "boundary", "time", "energy", "mode"]).optional(),
  recordedAt: z.string().datetime(),
});

export const expeditionSchema = z
  .object({
    id: z.string().min(1),
    installationId: z.string().uuid(),
    buddyId: z.string().min(1),
    status: expeditionStatusSchema,
    mode: z.literal("stay_here"),
    timeBudgetMinutes: z.number().int().min(10).max(30),
    energy: energySchema,
    boundaries: z.array(z.string().trim().min(1).max(120)).max(8),
    transformed: z.boolean(),
    phase: expeditionPhaseSchema,
    turnNumber: z.number().int().min(0).max(3),
    maxTurns: z.literal(3),
    currentInstruction: instructionSchema.optional(),
    acceptedInstructions: z.array(instructionSchema).max(3),
    observations: z.array(observationSchema).max(3),
    validationEvents: z.array(validationEventSchema).max(20),
    memento: mementoSchema.optional(),
    reflection: z.string().max(1000).optional(),
    startedAt: z.string().datetime().optional(),
    completedAt: z.string().datetime().optional(),
  })
  .superRefine((state, context) => {
    if ((state.status === "active" || state.status === "paused") && !state.currentInstruction) {
      context.addIssue({
        code: "custom",
        path: ["currentInstruction"],
        message: "An active or paused expedition requires one current instruction.",
      });
    }
    if (state.turnNumber !== state.acceptedInstructions.length) {
      context.addIssue({
        code: "custom",
        path: ["turnNumber"],
        message: "Turn number must equal accepted instruction count.",
      });
    }
    if (state.status === "complete" && (!state.memento || !state.reflection)) {
      context.addIssue({
        code: "custom",
        path: ["status"],
        message: "Completed expeditions require a reflection and memento.",
      });
    }
  });

export const responseKindSchema = z.enum(["done", "unexpected", "not_possible"]);

export const turnRequestSchema = z.object({
  state: expeditionSchema,
  kind: responseKindSchema,
  text: z.string().max(2000).default(""),
});

export const archiveSchema = z.object({
  version: z.literal(1),
  installationId: z.string().uuid(),
  buddy: buddySchema.optional(),
  activeExpedition: expeditionSchema.optional(),
  expeditions: z.array(expeditionSchema).max(50),
});

export type Buddy = z.infer<typeof buddySchema>;
export type Instruction = z.infer<typeof instructionSchema>;
export type Observation = z.infer<typeof observationSchema>;
export type Memento = z.infer<typeof mementoSchema>;
export type ValidationEvent = z.infer<typeof validationEventSchema>;
export type Expedition = z.infer<typeof expeditionSchema>;
export type TurnRequest = z.infer<typeof turnRequestSchema>;
export type Archive = z.infer<typeof archiveSchema>;
