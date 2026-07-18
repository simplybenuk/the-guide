import { describe, expect, it } from "vitest";

import { loadProviderConfig, ProviderConfigurationError } from "./provider-config";

describe("provider configuration", () => {
  it("defaults to deterministic mock mode", () => {
    expect(loadProviderConfig({})).toEqual({ mode: "deterministic_mock" });
  });

  it("loads explicit server-only live configuration", () => {
    expect(loadProviderConfig({
      GUIDE_PROVIDER_MODE: "openai_compatible",
      GUIDE_PROVIDER_BASE_URL: "https://example.test/v1/",
      GUIDE_PROVIDER_API_KEY: "secret-value",
      GUIDE_PROVIDER_MODEL: "example-model",
      GUIDE_PROVIDER_TIMEOUT_MS: "5000",
    })).toEqual({
      mode: "openai_compatible",
      baseUrl: "https://example.test/v1",
      apiKey: "secret-value",
      model: "example-model",
      timeoutMs: 5000,
    });
  });

  it("fails closed without echoing configuration values", () => {
    const secret = "do-not-echo-this";
    expect(() => loadProviderConfig({
      GUIDE_PROVIDER_MODE: "openai_compatible",
      GUIDE_PROVIDER_BASE_URL: "not a url",
      GUIDE_PROVIDER_API_KEY: secret,
      GUIDE_PROVIDER_MODEL: "example-model",
    })).toThrow(ProviderConfigurationError);
    try {
      loadProviderConfig({ GUIDE_PROVIDER_MODE: "openai_compatible", GUIDE_PROVIDER_API_KEY: secret });
    } catch (error) {
      expect(String(error)).not.toContain(secret);
    }
  });
});
