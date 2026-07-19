import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 15_000,
    testTimeout: 15_000,
    environment: "node",
    include: ["scripts/elixirs/**/*.test.mjs"],
  },
});
