import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearRequestDeduplicationForTests,
  RequestCapacityError,
  RequestIdentityConflictError,
  withRequestDeduplication,
} from "./request-dedupe";

describe("request deduplication", () => {
  beforeEach(clearRequestDeduplicationForTests);

  it("shares concurrent and recently completed work for the same action", async () => {
    const operation = vi.fn(async () => ({ state: "advanced" }));
    const [first, second] = await Promise.all([
      withRequestDeduplication("turn:one", "payload-a", operation),
      withRequestDeduplication("turn:one", "payload-a", operation),
    ]);
    const third = await withRequestDeduplication("turn:one", "payload-a", operation);
    expect(operation).toHaveBeenCalledOnce();
    expect(first).toBe(second);
    expect(third).toBe(first);
  });

  it("rejects reuse of one action identity with a different payload", async () => {
    await withRequestDeduplication("turn:one", "payload-a", async () => "first");
    expect(() => withRequestDeduplication("turn:one", "payload-b", async () => "second"))
      .toThrow(RequestIdentityConflictError);
  });

  it("never evicts in-flight work when the cache reaches capacity", () => {
    const pending = new Promise<never>(() => undefined);
    for (let index = 0; index < 100; index += 1) {
      void withRequestDeduplication(`turn:${index}`, `payload:${index}`, () => pending);
    }
    expect(() => withRequestDeduplication("turn:overflow", "payload:overflow", () => pending))
      .toThrow(RequestCapacityError);
    expect(withRequestDeduplication("turn:0", "payload:0", () => pending)).toBe(pending);
  });
});
