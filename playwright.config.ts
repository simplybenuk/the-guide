import { existsSync } from "node:fs";

import { defineConfig, devices } from "@playwright/test";

const sandboxLibraryFallback = "/tmp/the-guide-playwright-libs/usr/lib/x86_64-linux-gnu";
const browserEnvironment = existsSync(sandboxLibraryFallback)
  ? {
      LD_LIBRARY_PATH: [sandboxLibraryFallback, process.env.LD_LIBRARY_PATH]
        .filter(Boolean)
        .join(":"),
    }
  : undefined;

export default defineConfig({
  testDir: "./tests/elixirs",
  fullyParallel: false,
  retries: 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    launchOptions: browserEnvironment ? { env: browserEnvironment } : undefined,
  },
  webServer: {
    command:
      "npm run build && node scripts/elixirs/serve.mjs --root dist/elixirs-pages --port 4173 --base-path /the-guide",
    url: "http://127.0.0.1:4173/the-guide/",
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
