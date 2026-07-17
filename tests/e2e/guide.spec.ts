import { expect, test } from "@playwright/test";

test("completes an adaptive expedition and manages its local archive", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Opening the expedition cabinet…")).toBeHidden();
  await expect(page.getByRole("heading", { name: "Someone is waiting to meet you." })).toBeVisible();

  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByLabel("Buddy name").fill("Moss");
  await page.getByRole("button", { name: "Meet my buddy" }).click();

  await expect(page.getByRole("heading", { name: "Set the edges" })).toBeVisible();
  await page.getByLabel(/Hard limits/).fill("no climbing");
  await page.getByRole("button", { name: "Prepare the elixir" }).click();
  await page.getByRole("button", { name: "Begin ritual" }).click();
  await page.getByRole("button", { name: "Keep Moss unchanged" }).click();

  await expect(page.getByText("Expedition 1 of 3")).toBeVisible();
  await page.getByLabel("What detail claimed your attention first?").fill("a green leaf");
  await page.getByRole("button", { name: "Done" }).click();
  await expect(page.getByText(/evidence of something living/i)).toBeVisible();

  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("heading", { name: "The path will wait." })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "The path will wait." })).toBeVisible();
  await page.getByRole("button", { name: "Resume expedition" }).click();

  await page.getByLabel("What evidence did you find?").fill("a small shadow moving");
  await page.getByRole("button", { name: "Done" }).click();
  await expect(page.getByText(/Hold “a green leaf” in mind/)).toBeVisible();
  await page.getByLabel("What field name did you choose?").fill("Green Signal");
  await page.getByRole("button", { name: "Done" }).click();

  await expect(page.getByRole("heading", { name: "The expedition is complete." })).toBeVisible();
  await expect(page.getByText(/Field note: Green Signal — a green leaf/)).toBeVisible();
  await page.getByRole("button", { name: "Return home" }).click();
  await expect(page.getByRole("heading", { name: "I remember a green leaf." })).toBeVisible();

  await page.getByRole("button", { name: "Open the cabinet" }).click();
  await expect(page.getByText("Green Signal", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.getByText("The cabinet is empty.")).toBeVisible();
  await page.getByRole("button", { name: "Close cabinet" }).click();
  await expect(page.getByRole("heading", { name: "Someone is waiting to meet you." })).toBeVisible();
});

test("refuses without advancing and can stop with a partial record", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByLabel("Buddy name").fill("Moss");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByRole("button", { name: "Prepare the elixir" }).click();
  await page.getByRole("button", { name: "Begin ritual" }).click();
  await page.getByRole("button", { name: "Let it drink" }).click();

  await page.getByRole("button", { name: "Not possible" }).click();
  await expect(page.getByText("Expedition 1 of 3")).toBeVisible();
  await expect(page.getByText(/Listen until one ordinary sound/i)).toBeVisible();

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Stop" }).click();
  await expect(page.getByRole("heading", { name: "The path closes gently." })).toBeVisible();
  await expect(page.getByText("Nothing more is required.")).toBeVisible();
});

test("supports keyboard entry, touch targets, and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Someone is waiting to meet you." })).toBeVisible();
  await page.screenshot({ path: "test-results/mobile-arrival.png", fullPage: true });

  await page.keyboard.press("Tab");
  const start = page.getByRole("button", { name: "Meet my buddy" });
  await expect(start).toBeFocused();
  const startBox = await start.boundingBox();
  expect(startBox?.height).toBeGreaterThanOrEqual(44);

  const animationDuration = await page.locator(".arrival-room").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).animationDuration),
  );
  expect(animationDuration).toBeLessThanOrEqual(0.01);

  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Who is waiting?" })).toBeVisible();
  await expect(page.getByLabel("Buddy name")).toBeVisible();
});

test("plays the semantic elixir room without persisting optional inspections", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByLabel("Buddy name").fill("Moss");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByRole("button", { name: "Prepare the elixir" }).click();

  await expect(page.getByLabel(/mysterious room/i)).toBeVisible();
  await expect(page.getByLabel("Inventory", { exact: true })).toContainText("Empty");

  await page.getByRole("button", { name: "Inspect astrolabe" }).click();
  await expect(page.getByText(/sky that does not belong/i)).toBeVisible();
  await page.getByRole("button", { name: "Inspect cabinet" }).click();
  await expect(page.getByText(/one locked drawer/i)).toBeVisible();

  const archiveBeforePickup = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("the-guide:archive:v1") ?? "null"),
  );
  expect(archiveBeforePickup.activeExpedition).toBeUndefined();

  await page.getByRole("button", { name: "Pick up elixir" }).click();
  await expect(page.getByLabel("Inventory", { exact: true })).toContainText("Elixir");
  await page.getByRole("button", { name: "Offer elixir to Moss" }).click();
  await expect(page.getByText(/nothing real is consumed/i)).toBeVisible();
  await expect(page.getByLabel("Inventory", { exact: true })).toContainText("Elixir");

  await page.evaluate(() => {
    const trackedWindow = window as Window & { __uuidCalls?: number };
    const original = crypto.getRandomValues.bind(crypto);
    trackedWindow.__uuidCalls = 0;
    Object.defineProperty(crypto, "getRandomValues", {
      configurable: true,
      value: (array: Uint8Array) => {
        trackedWindow.__uuidCalls = (trackedWindow.__uuidCalls ?? 0) + 1;
        return original(array);
      },
    });
  });
  await page.getByRole("button", { name: "Let it drink" }).evaluate((button) => {
    (button as HTMLButtonElement).click();
    (button as HTMLButtonElement).click();
  });

  await expect(page.getByText("Expedition 1 of 3")).toBeVisible();
  const archiveAfterChoice = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("the-guide:archive:v1") ?? "null"),
  );
  expect(archiveAfterChoice.activeExpedition).toBeTruthy();
  expect(archiveAfterChoice.expeditions).toHaveLength(0);
  expect(await page.evaluate(() => (window as Window & { __uuidCalls?: number }).__uuidCalls)).toBe(1);
});

test("redirects safely when no opening instruction fits the boundaries", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByLabel("Buddy name").fill("Moss");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByLabel(/Hard limits/).fill("no view, no listening, no color");
  await page.getByRole("button", { name: "Prepare the elixir" }).click();
  await page.getByRole("button", { name: "Begin ritual" }).click();
  await page.getByRole("button", { name: "Let it drink" }).click();

  await expect(page.getByRole("heading", { name: "Set the edges" })).toBeVisible();
  await expect(
    page.getByRole("alert").filter({
      hasText: "No safe opening instruction fits the boundaries you chose.",
    }),
  ).toBeVisible();
});

test("ends gently when no refusal alternative is safe", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByLabel("Buddy name").fill("Moss");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByLabel(/Hard limits/).fill("no listening, no color, no remaining");
  await page.getByRole("button", { name: "Prepare the elixir" }).click();
  await page.getByRole("button", { name: "Begin ritual" }).click();
  await page.getByRole("button", { name: "Let it drink" }).click();
  await page.getByRole("button", { name: "Not possible" }).click();

  await expect(page.getByRole("heading", { name: "The path closes gently." })).toBeVisible();
  await expect(page.getByText("Nothing more is required.")).toBeVisible();
});
