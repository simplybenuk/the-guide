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
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: 0,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    launchOptions: browserEnvironment ? { env: browserEnvironment } : undefined,
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1",
    url: "http://127.0.0.1:3000/api/health",
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
