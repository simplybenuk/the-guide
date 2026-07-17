import { describe, expect, it } from "vitest";

import { activeExpedition } from "@/domain/test-helpers";

import { POST } from "./route";

describe("turn orchestration route", () => {
  it("advances a schema-valid request", async () => {
    const request = new Request("http://localhost/api/expedition/turn", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        state: activeExpedition(),
        kind: "done",
        text: "a green leaf",
      }),
    });
    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.state.currentInstruction.id).toBe("trace-living-detail");
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
