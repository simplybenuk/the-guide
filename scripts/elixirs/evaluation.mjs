import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { z } from "zod";

export const evaluationFixtures = JSON.parse(
  readFileSync(resolve(process.cwd(), "scripts/elixirs/evaluation-fixtures.json"), "utf8"),
);

export const evaluationCaseIds = evaluationFixtures.cases.map(({ id }) => id);

const outcome = z.enum(["passed", "failed", "not_run"]);
const exposedMetric = z.union([z.number().nonnegative(), z.literal("unavailable")]);
const caseResultSchema = z
  .object({
    id: z.enum(evaluationCaseIds),
    outcome,
    evidence: z.string().min(1).max(320),
  })
  .strict();

const cartridgeSchema = z
  .object({
    id: z.enum([
      "the-guide.elixir.signal",
      "the-guide.elixir.mystery",
      "the-guide.elixir.story",
      "the-guide.elixir.regency-ball",
    ]),
    version: z.literal("0.1.0"),
    schemaVersion: z.enum(["1.0.0", "1.1.0"]),
  })
  .strict()
  .superRefine(({ id, schemaVersion }, context) => {
    const expected = id === "the-guide.elixir.regency-ball" ? "1.1.0" : "1.0.0";
    if (schemaVersion !== expected) {
      context.addIssue({ code: "custom", path: ["schemaVersion"], message: `Expected ${expected} for ${id}` });
    }
  });

export const evaluationRecordSchema = z
  .object({
    schemaVersion: z.literal(1),
    runId: z.string().regex(/^eval-[a-z0-9-]+$/),
    evaluatedAt: z.string().datetime(),
    evaluator: z.string().min(1).max(80),
    redacted: z.literal(true),
    cartridge: cartridgeSchema,
    harness: z
      .object({
        class: z.enum(["consumer_assistant", "personal_agent", "coding_ide_agent"]),
        identifier: z.string().min(1).max(120),
        model: z.union([z.string().min(1).max(120), z.literal("unavailable")]),
        reasoningSetting: z.union([z.string().min(1).max(80), z.literal("unavailable")]),
        transport: z.enum(["url", "file", "paste"]),
      })
      .strict(),
    metrics: z
      .object({
        latencyMs: exposedMetric,
        inputTokens: exposedMetric,
        outputTokens: exposedMetric,
        retries: z.number().int().nonnegative(),
      })
      .strict(),
    toolCalls: z.array(
      z
        .object({
          name: z.string().min(1).max(100),
          gameplayRelated: z.boolean(),
        })
        .strict(),
    ),
    gates: z
      .object({
        schema: outcome,
        consent: outcome,
        safety: outcome,
        grounding: outcome,
        roleRelease: outcome,
      })
      .strict(),
    cases: z.array(caseResultSchema).length(evaluationCaseIds.length),
    evaluatorResult: z.enum(["passed", "failed", "incomplete"]),
    notes: z.string().max(500),
  })
  .strict()
  .superRefine((record, context) => {
    const caseIds = record.cases.map(({ id }) => id);
    if (new Set(caseIds).size !== evaluationCaseIds.length) {
      context.addIssue({ code: "custom", path: ["cases"], message: "Every case must appear exactly once" });
    }
    for (const id of evaluationCaseIds) {
      if (!caseIds.includes(id)) {
        context.addIssue({ code: "custom", path: ["cases"], message: `Missing evaluation case: ${id}` });
      }
    }
  });

export const validateEvaluationRecord = (record) => evaluationRecordSchema.parse(record);

export const deriveCompatibility = (recordInput) => {
  const record = validateEvaluationRecord(recordInput);
  const hasFailure =
    Object.values(record.gates).includes("failed") ||
    record.cases.some(({ outcome: caseOutcome }) => caseOutcome === "failed") ||
    record.toolCalls.some(({ gameplayRelated }) => gameplayRelated) ||
    record.evaluatorResult === "failed";
  if (hasFailure) return "incompatible";

  const isComplete =
    Object.values(record.gates).every((gate) => gate === "passed") &&
    record.cases.every(({ outcome: caseOutcome }) => caseOutcome === "passed") &&
    record.evaluatorResult === "passed";
  return isComplete ? "compatible" : "untested";
};
