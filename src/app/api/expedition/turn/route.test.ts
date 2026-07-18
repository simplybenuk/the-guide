import { beforeEach, describe, expect, it } from "vitest";

import { activeExpedition, REQUEST_ID, TEST_BUDDY } from "@/domain/test-helpers";
import { clearRequestDeduplicationForTests } from "@/lib/request-dedupe";

import { POST } from "./route";

describe("turn orchestration route", () => {
  beforeEach(clearRequestDeduplicationForTests);

  it("advances a schema-valid request", async () => {
    const request = new Request("http://localhost/api/expedition/turn", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        requestId: REQUEST_ID,
        state: activeExpedition(),
        buddy: TEST_BUDDY,
        kind: "done",
        text: "a green leaf",
      }),
    });
    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.state.currentInstruction.text).toMatch(/something living/i);
  });

  it("rejects invalid state without echoing the submitted observation", async () => {
    const privateText = "private observation 123";
    const request = new Request("http://localhost/api/expedition/turn", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ state: {}, kind: "done", text: privateText }),
    });
    const response = await POST(request);
    const body = await response.text();
    expect(response.status).toBe(400);
    expect(body).not.toContain(privateText);
  });
});
