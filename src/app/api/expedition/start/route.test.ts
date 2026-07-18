import { beforeEach, describe, expect, it } from "vitest";

import { INSTALLATION_ID, REQUEST_ID, TEST_BUDDY } from "@/domain/test-helpers";
import { clearRequestDeduplicationForTests } from "@/lib/request-dedupe";

import { POST } from "./route";

describe("expedition start route", () => {
  beforeEach(clearRequestDeduplicationForTests);

  it("creates an expedition through the configured mock adapter", async () => {
    const request = new Request("http://localhost/api/expedition/start", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        requestId: REQUEST_ID,
        installationId: INSTALLATION_ID,
        buddy: TEST_BUDDY,
        timeBudgetMinutes: 10,
        energy: "medium",
        boundaries: [],
        transformed: true,
      }),
    });
    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.state.currentInstruction.text).toMatch(/nearest view/i);
    expect(body.provider).toEqual({ mode: "deterministic_mock", fallbackUsed: false });
  });

  it("replays an identical action but rejects the same identity with changed content", async () => {
    const body = {
      requestId: REQUEST_ID,
      installationId: INSTALLATION_ID,
      buddy: TEST_BUDDY,
      timeBudgetMinutes: 10,
      energy: "medium",
      boundaries: [],
      transformed: true,
    };
    const send = (payload: unknown) => POST(new Request("http://localhost/api/expedition/start", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    }));
    const first = await send(body);
    const replay = await send(body);
    const conflict = await send({ ...body, timeBudgetMinutes: 20 });
    expect((await replay.json()).state).toEqual((await first.json()).state);
    expect(conflict.status).toBe(409);
  });

  it("does not echo invalid submitted content", async () => {
    const privateText = "private buddy payload 456";
    const response = await POST(new Request("http://localhost/api/expedition/start", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ buddy: privateText }),
    }));
    expect(response.status).toBe(400);
    expect(await response.text()).not.toContain(privateText);
  });
});
