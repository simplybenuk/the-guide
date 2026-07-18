import { z } from "zod";

const timeoutSchema = z.coerce.number().int().min(1000).max(30_000).default(8_000);

export type ProviderConfig =
  | { mode: "deterministic_mock" }
  | {
      mode: "openai_compatible";
      baseUrl: string;
      apiKey: string;
      model: string;
      timeoutMs: number;
    };

export class ProviderConfigurationError extends Error {
  constructor() {
    super("Live provider configuration is incomplete or invalid.");
    this.name = "ProviderConfigurationError";
  }
}

export function loadProviderConfig(
  environment: Record<string, string | undefined> = process.env,
): ProviderConfig {
  const mode = environment.GUIDE_PROVIDER_MODE?.trim() || "deterministic_mock";
  if (mode === "deterministic_mock") return { mode };
  if (mode !== "openai_compatible") throw new ProviderConfigurationError();

  const baseUrlValue = environment.GUIDE_PROVIDER_BASE_URL?.trim();
  const apiKey = environment.GUIDE_PROVIDER_API_KEY?.trim();
  const model = environment.GUIDE_PROVIDER_MODEL?.trim();
  if (!baseUrlValue || !apiKey || !model) throw new ProviderConfigurationError();

  try {
    const baseUrl = new URL(baseUrlValue);
    if (baseUrl.protocol !== "https:" && baseUrl.protocol !== "http:") {
      throw new ProviderConfigurationError();
    }
    return {
      mode,
      baseUrl: baseUrl.toString().replace(/\/$/, ""),
      apiKey,
      model,
      timeoutMs: timeoutSchema.parse(environment.GUIDE_PROVIDER_TIMEOUT_MS),
    };
  } catch {
    throw new ProviderConfigurationError();
  }
}
