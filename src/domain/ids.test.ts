import { describe, expect, it } from "vitest";

import { createUuid } from "./ids";

describe("compatible UUID generation", () => {
  it("creates a valid UUID v4 using getRandomValues without randomUUID", () => {
    const randomSource = {
      getRandomValues<T extends ArrayBufferView | null>(array: T): T {
        const bytes = array as Uint8Array;
        bytes.forEach((_, index) => {
          bytes[index] = index;
        });
        return array;
      },
    };

    expect(createUuid(randomSource)).toBe("00010203-0405-4607-8809-0a0b0c0d0e0f");
  });

  it("fails clearly when secure random values are unavailable", () => {
    expect(() => createUuid({} as Pick<Crypto, "getRandomValues">)).toThrow(
      /secure random values/i,
    );
  });
});
