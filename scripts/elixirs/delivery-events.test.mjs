import { describe, expect, it } from "vitest";

import {
  aggregateAcquisitionActions,
  createDeliveryEvent,
  deliveryEventSchema,
  renderDeliveryEventBrowserRuntime,
  validateDeliveryEvent,
} from "./delivery-events.mjs";

const validReferences = [
  { id: "the-guide.elixir.signal", version: "0.1.0" },
  { id: "the-guide.elixir.story", version: "0.1.0" },
];
const options = {
  validReferences,
  deploymentRevision: "cabinet-delivery-v2",
  eventIdFactory: () => "evt_123e4567-e89b-42d3-a456-426614174000",
  now: () => "2026-07-19T15:00:00.000Z",
};

const create = (overrides = {}) => createDeliveryEvent({
  elixirId: "the-guide.elixir.story",
  elixirVersion: "0.1.0",
  deliveryMethod: "launcher_prompt_copy",
  targetHarness: "unspecified",
  result: "succeeded",
  ...overrides,
}, options);

describe("delivery event contract v1.2", () => {
  it("creates one strict, identity-free launcher prompt event", () => {
    expect(create()).toEqual({
      contract_version: "1.2.0",
      event_id: "evt_123e4567-e89b-42d3-a456-426614174000",
      event_name: "delivery_action_recorded",
      occurred_at: "2026-07-19T15:00:00.000Z",
      surface: "cabinet_detail",
      channel: "cabinet_first",
      elixir_id: "the-guide.elixir.story",
      elixir_version: "0.1.0",
      delivery_method: "launcher_prompt_copy",
      target_harness: "unspecified",
      result: "succeeded",
      deployment_revision: "cabinet-delivery-v2",
    });
  });

  it("enforces method, result, and target semantics", () => {
    expect(() => create({ targetHarness: "chatgpt" })).toThrow(/Expected unspecified/);
    expect(() => create({ result: "initiated" })).toThrow(/cannot claim an initiated/);
    for (const deliveryMethod of ["cartridge_file_download", "agent_skill_download"]) {
      expect(create({ deliveryMethod, result: "initiated" }).result).toBe("initiated");
      expect(() => create({ deliveryMethod, result: "succeeded" })).toThrow(/Downloads may only/);
    }
  });

  it("rejects retired methods, unknown fields, and stale references", () => {
    for (const deliveryMethod of ["self_contained_prompt_copy", "resolver_prompt_copy", "cartridge_text_copy", "handoff_message_copy"]) {
      expect(() => create({ deliveryMethod })).toThrow();
    }
    expect(() => deliveryEventSchema.parse({ ...create(), transcript: "private" })).toThrow();
    expect(() => create({ elixirVersion: "9.9.9" })).toThrow(/Unknown delivery event cartridge/);
    expect(() => validateDeliveryEvent({ ...create(), contract_version: "1.1.0" }, { validReferences })).toThrow();
  });

  it("rejects malformed IDs, timestamps, and public build identifiers", () => {
    expect(() => validateDeliveryEvent({ ...create(), event_id: "user-123" }, { validReferences })).toThrow();
    expect(() => validateDeliveryEvent({ ...create(), occurred_at: "today" }, { validReferences })).toThrow();
    expect(() => validateDeliveryEvent({ ...create(), occurred_at: "2026-07-19T15:00:00+00:00" }, { validReferences })).toThrow();
    expect(() => validateDeliveryEvent({ ...create(), deployment_revision: "private value" }, { validReferences })).toThrow();
  });

  it("counts the three acquisition actions without inventing outcomes", () => {
    const events = [
      create(), create(), create({ result: "denied" }),
      create({ deliveryMethod: "cartridge_file_download", result: "initiated" }),
      create({ deliveryMethod: "agent_skill_download", result: "initiated" }),
      create({ deliveryMethod: "agent_skill_download", result: "failed" }),
    ];
    expect(aggregateAcquisitionActions(events, {
      validReferences,
      windowStart: "2026-07-19T00:00:00.000Z",
      windowEnd: "2026-07-20T00:00:00.000Z",
    }).map(({ delivery_method, actions }) => ({ delivery_method, actions }))).toEqual([
      { delivery_method: "agent_skill_download", actions: 1 },
      { delivery_method: "cartridge_file_download", actions: 1 },
      { delivery_method: "launcher_prompt_copy", actions: 2 },
    ]);
  });

  it("requires a valid declared acquisition window", () => {
    expect(() => aggregateAcquisitionActions([create()], { validReferences })).toThrow();
    expect(() => aggregateAcquisitionActions([create()], {
      validReferences,
      windowStart: "2026-07-20T00:00:00.000Z",
      windowEnd: "2026-07-19T00:00:00.000Z",
    })).toThrow(/must end after/);
  });

  it("renders a deterministic local-only browser runtime", () => {
    const runtime = renderDeliveryEventBrowserRuntime({ validReferences, deploymentRevision: options.deploymentRevision });
    expect(runtime).toContain("the-guide:delivery-event");
    expect(runtime).toContain("launcher_prompt_copy");
    expect(runtime).toContain("agent_skill_download");
    expect(runtime).not.toMatch(/fetch\s*\(|sendBeacon|XMLHttpRequest|localStorage|sessionStorage|indexedDB/);
  });
});
