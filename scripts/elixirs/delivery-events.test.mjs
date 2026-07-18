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
  deploymentRevision: "cabinet-delivery-v1",
  eventIdFactory: () => "evt_123e4567-e89b-42d3-a456-426614174000",
  now: () => "2026-07-18T15:00:00.000Z",
};

const create = (overrides = {}) =>
  createDeliveryEvent(
    {
      elixirId: "the-guide.elixir.story",
      elixirVersion: "0.1.0",
      deliveryMethod: "handoff_message_copy",
      targetHarness: "chatgpt",
      result: "succeeded",
      ...overrides,
    },
    options,
  );

describe("delivery event contract v1", () => {
  it("creates one strict, identity-free ChatGPT handoff event", () => {
    expect(create()).toEqual({
      contract_version: "1.0.0",
      event_id: "evt_123e4567-e89b-42d3-a456-426614174000",
      event_name: "delivery_action_recorded",
      occurred_at: "2026-07-18T15:00:00.000Z",
      surface: "cabinet_detail",
      channel: "cabinet_first",
      elixir_id: "the-guide.elixir.story",
      elixir_version: "0.1.0",
      delivery_method: "handoff_message_copy",
      target_harness: "chatgpt",
      result: "succeeded",
      deployment_revision: "cabinet-delivery-v1",
    });
  });

  it("enforces method, result, and target semantics", () => {
    expect(() => create({ targetHarness: "unspecified" })).toThrow(/Expected chatgpt/);
    expect(() => create({ result: "initiated" })).toThrow(/cannot claim an initiated/);
    expect(() =>
      create({
        deliveryMethod: "cartridge_file_download",
        targetHarness: "unspecified",
        result: "succeeded",
      }),
    ).toThrow(/Downloads may only/);
    expect(
      create({
        deliveryMethod: "cartridge_file_download",
        targetHarness: "unspecified",
        result: "initiated",
      }).result,
    ).toBe("initiated");
  });

  it("rejects unknown fields and stale cartridge references", () => {
    expect(() => deliveryEventSchema.parse({ ...create(), transcript: "private" })).toThrow();
    expect(() => create({ elixirVersion: "9.9.9" })).toThrow(/Unknown delivery event cartridge/);
    expect(() => create({ elixirId: "the-guide.elixir.unknown" })).toThrow(/Unknown delivery event cartridge/);
  });

  it("rejects malformed IDs, timestamps, and public build identifiers", () => {
    expect(() => validateDeliveryEvent({ ...create(), event_id: "user-123" }, { validReferences })).toThrow();
    expect(() => validateDeliveryEvent({ ...create(), occurred_at: "today" }, { validReferences })).toThrow();
    expect(() => validateDeliveryEvent({ ...create(), occurred_at: "2026-07-18T15:00:00+00:00" }, { validReferences })).toThrow();
    expect(() => validateDeliveryEvent({ ...create(), occurred_at: "2026-02-30T15:00:00.000Z" }, { validReferences })).toThrow();
    expect(() => validateDeliveryEvent({ ...create(), deployment_revision: "private value" }, { validReferences })).toThrow();
  });

  it("counts acquisition actions without inventing unique users or outcomes", () => {
    const events = [
      create(),
      create(),
      create({ result: "denied" }),
      create({ deliveryMethod: "cartridge_text_copy", targetHarness: "unspecified" }),
      create({ deliveryMethod: "cartridge_file_download", targetHarness: "unspecified", result: "initiated" }),
      create({ deliveryMethod: "cartridge_file_download", targetHarness: "unspecified", result: "failed" }),
      createDeliveryEvent(
        {
          elixirId: "the-guide.elixir.story",
          elixirVersion: "0.1.0",
          deliveryMethod: "handoff_message_copy",
          targetHarness: "chatgpt",
          result: "succeeded",
        },
        { ...options, now: () => "2026-07-19T00:00:00.000Z" },
      ),
    ];

    expect(
      aggregateAcquisitionActions(events, {
        validReferences,
        windowStart: "2026-07-18T00:00:00.000Z",
        windowEnd: "2026-07-19T00:00:00.000Z",
      }),
    ).toEqual([
      {
        elixir_id: "the-guide.elixir.story",
        elixir_version: "0.1.0",
        delivery_method: "cartridge_file_download",
        target_harness: "unspecified",
        window_start: "2026-07-18T00:00:00.000Z",
        window_end: "2026-07-19T00:00:00.000Z",
        actions: 1,
      },
      {
        elixir_id: "the-guide.elixir.story",
        elixir_version: "0.1.0",
        delivery_method: "cartridge_text_copy",
        target_harness: "unspecified",
        window_start: "2026-07-18T00:00:00.000Z",
        window_end: "2026-07-19T00:00:00.000Z",
        actions: 1,
      },
      {
        elixir_id: "the-guide.elixir.story",
        elixir_version: "0.1.0",
        delivery_method: "handoff_message_copy",
        target_harness: "chatgpt",
        window_start: "2026-07-18T00:00:00.000Z",
        window_end: "2026-07-19T00:00:00.000Z",
        actions: 2,
      },
    ]);
  });

  it("requires a valid declared acquisition window", () => {
    expect(() => aggregateAcquisitionActions([create()], { validReferences })).toThrow();
    expect(() =>
      aggregateAcquisitionActions([create()], {
        validReferences,
        windowStart: "2026-07-19T00:00:00.000Z",
        windowEnd: "2026-07-18T00:00:00.000Z",
      }),
    ).toThrow(/must end after/);
  });

  it("renders a deterministic local-only browser runtime", () => {
    const runtime = renderDeliveryEventBrowserRuntime({ validReferences, deploymentRevision: options.deploymentRevision });
    expect(runtime).toContain("the-guide:delivery-event");
    expect(runtime).toContain("GuideDeliveryEvents");
    expect(runtime).toContain("[89ab]");
    expect(runtime).toContain("toISOString() !== event.occurred_at");
    expect(runtime).not.toMatch(/fetch\s*\(|sendBeacon|XMLHttpRequest|localStorage|sessionStorage|indexedDB/);
  });
});
