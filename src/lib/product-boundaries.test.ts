import { describe, expect, it } from "vitest";

import { PRODUCT_BOUNDARIES } from "./product-boundaries";

describe("approved first-slice boundaries", () => {
  it("keeps deferred capabilities disabled", () => {
    expect(PRODUCT_BOUNDARIES).toMatchObject({
      providerMode: "deterministic_mock",
      travelMode: "stay_here",
      authenticatedAccounts: false,
      externalTools: false,
    });
  });

  it("caps normal expeditions at three accepted turns", () => {
    expect(PRODUCT_BOUNDARIES.maxAcceptedTurns).toBe(3);
  });
});
