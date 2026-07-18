import { randomUUID } from "node:crypto";

import { z } from "zod";

export const deliveryEventContractVersion = "1.0.0";
export const deliveryEventName = "delivery_action_recorded";
export const deliveryEventBrowserName = "the-guide:delivery-event";
export const deliveryDeploymentRevision = "cabinet-delivery-v1";
export const deliveryMethods = [
  "handoff_message_copy",
  "cartridge_text_copy",
  "cartridge_file_download",
];
export const deliveryResults = ["succeeded", "initiated", "denied", "unavailable", "failed"];
export const deliveryTargets = ["chatgpt", "unspecified"];

const eventIdPattern = /^evt_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const utcTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const eventId = z.string().regex(eventIdPattern);
const utcTimestamp = z
  .string()
  .regex(utcTimestampPattern)
  .refine((value) => {
    const parsed = new Date(value);
    return !Number.isNaN(parsed.valueOf()) && parsed.toISOString() === value;
  }, "Timestamp must be a canonical UTC instant");
const publicBuildIdentifier = z.string().regex(/^[a-z0-9][a-z0-9._-]{0,79}$/);

export const deliveryEventSchema = z
  .object({
    contract_version: z.literal(deliveryEventContractVersion),
    event_id: eventId,
    event_name: z.literal(deliveryEventName),
    occurred_at: utcTimestamp,
    surface: z.literal("cabinet_detail"),
    channel: z.literal("cabinet_first"),
    elixir_id: z.string().regex(/^the-guide\.elixir\.[a-z0-9]+(?:-[a-z0-9]+)*$/),
    elixir_version: z.string().regex(/^\d+\.\d+\.\d+$/),
    delivery_method: z.enum(deliveryMethods),
    target_harness: z.enum(deliveryTargets),
    result: z.enum(deliveryResults),
    deployment_revision: publicBuildIdentifier,
  })
  .strict()
  .superRefine((event, context) => {
    const copyResults = ["succeeded", "denied", "unavailable", "failed"];
    if (event.delivery_method === "cartridge_file_download") {
      if (!['initiated', 'unavailable', 'failed'].includes(event.result)) {
        context.addIssue({ code: "custom", path: ["result"], message: "Downloads may only be initiated, unavailable, or failed" });
      }
      if (event.target_harness !== "unspecified") {
        context.addIssue({ code: "custom", path: ["target_harness"], message: "Download fallback has no inferred target harness" });
      }
      return;
    }

    if (!copyResults.includes(event.result)) {
      context.addIssue({ code: "custom", path: ["result"], message: "Copy actions cannot claim an initiated result" });
    }
    const expectedTarget = event.delivery_method === "handoff_message_copy" ? "chatgpt" : "unspecified";
    if (event.target_harness !== expectedTarget) {
      context.addIssue({ code: "custom", path: ["target_harness"], message: `Expected ${expectedTarget} for ${event.delivery_method}` });
    }
  });

const referenceKey = ({ id, version }) => `${id}@${version}`;

export const validateDeliveryEvent = (event, { validReferences }) => {
  const parsed = deliveryEventSchema.parse(event);
  const references = new Set(validReferences.map(referenceKey));
  if (!references.has(referenceKey({ id: parsed.elixir_id, version: parsed.elixir_version }))) {
    throw new Error(`Unknown delivery event cartridge reference: ${parsed.elixir_id}@${parsed.elixir_version}`);
  }
  return parsed;
};

export const createDeliveryEvent = (
  input,
  {
    validReferences,
    deploymentRevision,
    eventIdFactory = () => `evt_${randomUUID()}`,
    now = () => new Date().toISOString(),
  },
) =>
  validateDeliveryEvent(
    {
      contract_version: deliveryEventContractVersion,
      event_id: eventIdFactory(),
      event_name: deliveryEventName,
      occurred_at: now(),
      surface: "cabinet_detail",
      channel: "cabinet_first",
      elixir_id: input.elixirId,
      elixir_version: input.elixirVersion,
      delivery_method: input.deliveryMethod,
      target_harness: input.targetHarness,
      result: input.result,
      deployment_revision: deploymentRevision,
    },
    { validReferences },
  );

const qualifiesAsAcquisition = (event) =>
  (event.delivery_method === "cartridge_file_download" && event.result === "initiated") ||
  (event.delivery_method !== "cartridge_file_download" && event.result === "succeeded");

export const aggregateAcquisitionActions = (
  events,
  { validReferences, windowStart, windowEnd },
) => {
  const start = utcTimestamp.parse(windowStart);
  const end = utcTimestamp.parse(windowEnd);
  if (start >= end) throw new Error("Acquisition window must end after it starts");

  const counts = new Map();
  for (const input of events) {
    const event = validateDeliveryEvent(input, { validReferences });
    if (event.occurred_at < start || event.occurred_at >= end) continue;
    if (!qualifiesAsAcquisition(event)) continue;
    const key = `${event.elixir_id}@${event.elixir_version}:${event.delivery_method}:${event.target_harness}`;
    const current = counts.get(key) ?? {
      elixir_id: event.elixir_id,
      elixir_version: event.elixir_version,
      delivery_method: event.delivery_method,
      target_harness: event.target_harness,
      window_start: start,
      window_end: end,
      actions: 0,
    };
    current.actions += 1;
    counts.set(key, current);
  }
  return [...counts.values()].sort((left, right) =>
    `${left.elixir_id}:${left.delivery_method}`.localeCompare(`${right.elixir_id}:${right.delivery_method}`),
  );
};

const serialize = (value) => JSON.stringify(value);

export const renderDeliveryEventBrowserRuntime = ({ validReferences, deploymentRevision }) => `(() => {
  "use strict";
  const contractVersion = ${serialize(deliveryEventContractVersion)};
  const eventName = ${serialize(deliveryEventName)};
  const browserEventName = ${serialize(deliveryEventBrowserName)};
  const methods = new Set(${serialize(deliveryMethods)});
  const results = new Set(${serialize(deliveryResults)});
  const targets = new Set(${serialize(deliveryTargets)});
  const references = new Set(${serialize(validReferences.map(referenceKey))});
  const deploymentRevision = ${serialize(deploymentRevision)};
  const eventIdPattern = new RegExp(${serialize(eventIdPattern.source)});
  const utcTimestampPattern = new RegExp(${serialize(utcTimestampPattern.source)});
  const inputKeys = ["deliveryMethod", "elixirId", "elixirVersion", "result", "targetHarness"];
  const eventKeys = ["channel", "contract_version", "delivery_method", "deployment_revision", "elixir_id", "elixir_version", "event_id", "event_name", "occurred_at", "result", "surface", "target_harness"];

  const hasExactKeys = (value, keys) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const actual = Object.keys(value).sort();
    return actual.length === keys.length && actual.every((key, index) => key === [...keys].sort()[index]);
  };

  const isValid = (event) => {
    if (!hasExactKeys(event, eventKeys)) return false;
    if (event.contract_version !== contractVersion || event.event_name !== eventName) return false;
    if (!eventIdPattern.test(event.event_id) || !utcTimestampPattern.test(event.occurred_at)) return false;
    const occurredAt = new Date(event.occurred_at);
    if (Number.isNaN(occurredAt.valueOf()) || occurredAt.toISOString() !== event.occurred_at) return false;
    if (event.surface !== "cabinet_detail" || event.channel !== "cabinet_first") return false;
    if (!references.has(event.elixir_id + "@" + event.elixir_version)) return false;
    if (!methods.has(event.delivery_method) || !results.has(event.result) || !targets.has(event.target_harness)) return false;
    if (event.deployment_revision !== deploymentRevision) return false;
    if (event.delivery_method === "cartridge_file_download") {
      return ["initiated", "unavailable", "failed"].includes(event.result) && event.target_harness === "unspecified";
    }
    if (!["succeeded", "denied", "unavailable", "failed"].includes(event.result)) return false;
    return event.target_harness === (event.delivery_method === "handoff_message_copy" ? "chatgpt" : "unspecified");
  };

  const record = (input) => {
    if (!hasExactKeys(input, inputKeys)) throw new Error("Invalid delivery event input");
    if (!globalThis.crypto || typeof globalThis.crypto.randomUUID !== "function") throw new Error("Secure event IDs are unavailable");
    const event = Object.freeze({
      contract_version: contractVersion,
      event_id: "evt_" + globalThis.crypto.randomUUID(),
      event_name: eventName,
      occurred_at: new Date().toISOString(),
      surface: "cabinet_detail",
      channel: "cabinet_first",
      elixir_id: input.elixirId,
      elixir_version: input.elixirVersion,
      delivery_method: input.deliveryMethod,
      target_harness: input.targetHarness,
      result: input.result,
      deployment_revision: deploymentRevision,
    });
    if (!isValid(event)) throw new Error("Invalid delivery event");
    globalThis.dispatchEvent(new CustomEvent(browserEventName, { detail: event }));
    return event;
  };

  globalThis.GuideDeliveryEvents = Object.freeze({ record });
})();
`;
