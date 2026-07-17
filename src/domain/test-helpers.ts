import { createExpedition } from "./engine";
import type { Buddy, Expedition } from "./schemas";

export const INSTALLATION_ID = "11111111-1111-4111-8111-111111111111";

export const TEST_BUDDY: Buddy = {
  id: "buddy-1",
  name: "Moss",
  voiceDescription: "Warm, curious, and concise",
  curiosities: ["overlooked details"],
  peculiarities: ["names ordinary discoveries"],
  memoryPolicy: "archive_with_consent",
};

export function activeExpedition(overrides: Partial<Expedition> = {}): Expedition {
  return {
    ...createExpedition({
      installationId: INSTALLATION_ID,
      buddy: TEST_BUDDY,
      timeBudgetMinutes: 10,
      energy: "medium",
      boundaries: [],
      transformed: true,
      now: "2026-07-17T00:00:00.000Z",
      id: "expedition-1",
    }),
    ...overrides,
  };
}
