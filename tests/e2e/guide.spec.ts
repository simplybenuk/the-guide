import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

function contrastRatio(foreground: string, background: string) {
  const luminance = (rgb: string) => {
    const channels = rgb.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number) ?? [];
    const linear = channels.map((channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

async function expectWithinViewport(locator: Locator, page: Page, minimumTarget = false) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  if (!box || !viewport) return;
  expect(box.x, `${locator} starts inside the viewport`).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width, `${locator} ends inside the viewport (${JSON.stringify(box)})`).toBeLessThanOrEqual(viewport.width);
  if (minimumTarget) {
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
}

async function expectScreenBounds(page: Page, locators: Locator[]) {
  await expectNoHorizontalOverflow(page);
  for (const locator of locators) await expectWithinViewport(locator, page);
}

async function activateWithKeyboard(locator: Locator, page: Page) {
  await locator.focus();
  await expect(locator).toBeFocused();
  await page.keyboard.press("Enter");
}

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
  await expect(page.getByRole("heading", { name: "Moss remains itself." })).toBeVisible();
  await page.getByRole("button", { name: "Skip transformation" }).click();
  await page.getByRole("button", { name: "Enter expedition" }).click();

  await expect(page.getByText("Expedition 1 of 3")).toBeVisible();
  await expect(page.locator(".quest-companion .pixel-asset--buddy")).toBeVisible();
  await page.getByLabel("What detail claimed your attention first?").fill("a green leaf");
  await page.getByRole("button", { name: "Done" }).click();
  await expect(page.getByText(/evidence of something living/i)).toBeVisible();

  await page.getByRole("button", { name: "Pause" }).click();
  await expect(page.getByRole("heading", { name: "The path will wait." })).toBeVisible();
  await expect(page.locator(".pause-portal")).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "The path will wait." })).toBeVisible();
  await page.getByRole("button", { name: "Resume expedition" }).click();

  await page.getByLabel("What evidence did you find?").fill("a small shadow moving");
  await page.getByRole("button", { name: "Done" }).click();
  await expect(page.getByText(/Hold “a green leaf” in mind/)).toBeVisible();
  await page.getByLabel("What field name did you choose?").fill("Green Signal");
  await page.getByRole("button", { name: "Done" }).click();

  await expect(page.getByRole("heading", { name: "The expedition is complete." })).toBeVisible();
  await expect(page.locator(".ending-buddy.pixel-asset--buddy")).toBeVisible();
  await expect(page.getByText(/Field note: Green Signal — a green leaf/)).toBeVisible();
  await page.getByRole("button", { name: "Return home" }).click();
  await expect(page.getByRole("heading", { name: "I remember a green leaf." })).toBeVisible();

  await page.getByRole("button", { name: "Open the cabinet" }).click();
  await expect(page.locator(".cabinet-art")).toBeVisible();
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
  await page.getByRole("button", { name: "Skip transformation" }).click();
  await page.getByRole("button", { name: "Enter expedition" }).click();

  await page.getByRole("button", { name: "Not possible" }).click();
  await expect(page.locator(".quest-companion .pixel-asset--buddy-transformed")).toBeVisible();
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
  await expect(page.getByRole("button", { name: "Sound off" })).toBeFocused();
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
  await expect(page.getByRole("heading", { name: "Who is waiting?" })).toBeFocused();
  await expect(page.getByLabel("Buddy name")).toBeVisible();
  await expect(page.getByRole("combobox")).toHaveCount(3);

  await page.getByLabel("Buddy name").focus();
  await page.keyboard.type("   ");
  await activateWithKeyboard(page.getByRole("button", { name: "Meet my buddy" }), page);
  await expect(page.getByRole("alert").filter({ hasText: "Give your buddy a name" })).toBeVisible();

  await page.getByLabel("Buddy name").focus();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type("Moss");
  await activateWithKeyboard(page.getByRole("button", { name: "Meet my buddy" }), page);
  await expect(page.getByRole("heading", { name: "Set the edges" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Set the edges" })).toBeFocused();
  await expect(page.getByRole("radio")).toHaveCount(6);
  await expect(page.getByLabel(/Hard limits/)).toBeVisible();
  await expect(page.getByLabel("Expedition boundary summary")).toContainText(
    "You can refuse, pause, or stop at any time.",
  );
  await activateWithKeyboard(page.getByRole("button", { name: "Prepare the elixir" }), page);
  await expect(page.getByRole("heading", { name: "Choose what happens next." })).toBeFocused();
  await activateWithKeyboard(page.getByRole("button", { name: "Pick up elixir" }), page);
  await activateWithKeyboard(page.getByRole("button", { name: "Offer elixir to Moss" }), page);
  await activateWithKeyboard(page.getByRole("button", { name: "Keep Moss unchanged" }), page);
  await expect(page.getByRole("heading", { name: "Moss remains itself." })).toBeFocused();
  await expect(page.getByText("The portal is active. Your expedition is ready.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Skip transformation" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Enter expedition" })).toBeEnabled();
  await activateWithKeyboard(page.getByRole("button", { name: "Enter expedition" }), page);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.getByLabel(/What detail claimed your attention first/).focus();
  await page.keyboard.type("a green leaf");
  await activateWithKeyboard(page.getByRole("button", { name: "Done" }), page);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await activateWithKeyboard(page.getByRole("button", { name: "Pause" }), page);
  await expect(page.getByRole("heading", { name: "The path will wait." })).toBeFocused();
  await activateWithKeyboard(page.getByRole("button", { name: "Resume expedition" }), page);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
});

test("keeps sound opt-in, persistent, and non-blocking", async ({ page }) => {
  await page.addInitScript(() => {
    const trackedWindow = window as Window & { __playCalls?: number };
    trackedWindow.__playCalls = 0;
    HTMLMediaElement.prototype.play = function play() {
      trackedWindow.__playCalls = (trackedWindow.__playCalls ?? 0) + 1;
      return Promise.reject(new Error("Audio blocked for test"));
    };
  });
  await page.goto("/");

  await expect(page.getByRole("button", { name: "Sound off" })).toHaveAttribute("aria-pressed", "false");
  expect(await page.evaluate(() => (window as Window & { __playCalls?: number }).__playCalls)).toBe(0);
  await page.getByRole("button", { name: "Sound off" }).click();
  await expect(page.getByRole("button", { name: "Sound on" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByLabel("Buddy name").fill("Moss");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await page.getByRole("button", { name: "Prepare the elixir" }).click();
  await page.getByRole("button", { name: "Pick up elixir" }).click();
  await expect(page.getByLabel("Inventory", { exact: true })).toContainText("Elixir");
  expect(await page.evaluate(() => (window as Window & { __playCalls?: number }).__playCalls)).toBe(1);

  await page.reload();
  await expect(page.getByRole("button", { name: "Sound on" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Begin another expedition" }).click();
  await page.getByRole("button", { name: "Prepare the elixir" }).click();
  await page.getByRole("button", { name: "Begin ritual" }).click();
  await page.getByRole("button", { name: "Keep Moss unchanged" }).click();
  await page.getByRole("button", { name: "Skip transformation" }).click();
  await page.getByRole("button", { name: "Enter expedition" }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Stop" }).click();
  await page.getByRole("button", { name: "Return home" }).click();
  await page.getByRole("button", { name: "Open the cabinet" }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete all local data" }).click();

  await expect(page.getByRole("button", { name: "Sound off" })).toHaveAttribute("aria-pressed", "false");
  expect(await page.evaluate(() => ({
    archive: localStorage.getItem("the-guide:archive:v1"),
    sound: localStorage.getItem("the-guide:sound-enabled:v1"),
  }))).toEqual({ archive: null, sound: null });
});

test("keeps the playable path operable at 320px and 200 percent text", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  await expectScreenBounds(page, [
    page.getByRole("heading", { name: "Someone is waiting to meet you." }),
    page.getByRole("button", { name: "Meet my buddy" }),
  ]);

  const soundBox = await page.getByRole("button", { name: "Sound off" }).boundingBox();
  const eyebrowBox = await page.getByText("A small expedition machine").boundingBox();
  expect(soundBox?.height).toBeGreaterThanOrEqual(44);
  expect(eyebrowBox && soundBox ? eyebrowBox.y + eyebrowBox.height <= soundBox.y || soundBox.y + soundBox.height <= eyebrowBox.y : false).toBe(true);

  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await expectScreenBounds(page, [
    page.getByRole("heading", { name: "Who is waiting?" }),
    page.getByLabel("Buddy name"),
    page.getByRole("button", { name: "Meet my buddy" }),
  ]);
  await page.getByLabel("Buddy name").fill("   ");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await expectScreenBounds(page, [page.getByRole("alert").filter({ hasText: "Give your buddy a name" })]);
  await page.getByLabel("Buddy name").fill("Moss");
  await page.getByRole("button", { name: "Meet my buddy" }).click();
  await expectScreenBounds(page, [
    page.getByRole("heading", { name: "Set the edges" }),
    page.getByLabel(/Hard limits/),
    page.getByLabel("Expedition boundary summary"),
    page.getByRole("button", { name: "Prepare the elixir" }),
  ]);
  await page.getByRole("button", { name: "Prepare the elixir" }).click();
  await expectScreenBounds(page, [
    page.getByRole("heading", { name: "Choose what happens next." }),
    page.getByLabel("Inventory", { exact: true }),
    page.getByRole("button", { name: "Begin ritual" }),
  ]);

  for (const button of await page.locator(".room-hotspot").all()) {
    const box = await button.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.x).toBeGreaterThanOrEqual(0);
    expect(box ? box.x + box.width : 321).toBeLessThanOrEqual(320);
  }

  await page.screenshot({ path: "test-results/mobile-room-320.png", fullPage: true });
  await page.getByRole("button", { name: "Begin ritual" }).click();
  await expectScreenBounds(page, [
    page.getByText(/waiting for permission/),
    page.getByRole("button", { name: "Let it drink" }),
    page.getByRole("button", { name: "Keep Moss unchanged" }),
  ]);
  await page.getByRole("button", { name: "Keep Moss unchanged" }).click();
  await expectScreenBounds(page, [
    page.getByRole("heading", { name: "Moss remains itself." }),
    page.getByText("The portal gathers itself from the dark."),
    page.getByRole("button", { name: "Skip transformation" }),
    page.getByRole("button", { name: "Enter expedition" }),
  ]);
  await page.getByRole("button", { name: "Skip transformation" }).click();
  await expectScreenBounds(page, [
    page.getByRole("heading", { name: "Moss remains itself." }),
    page.getByText("The portal is active. Your expedition is ready."),
    page.getByRole("button", { name: "Enter expedition" }),
  ]);
  await page.getByRole("button", { name: "Enter expedition" }).click();

  // Root text enlargement is the deterministic browser-test proxy for 200% text sizing.
  await page.evaluate(() => document.documentElement.style.fontSize = "200%");
  const activeControls = [
    page.getByLabel(/What detail claimed your attention first/),
    page.getByRole("button", { name: "Done" }),
    page.getByRole("button", { name: "Not possible" }),
    page.getByRole("button", { name: "Pause" }),
    page.getByRole("button", { name: "Stop" }),
    page.getByRole("button", { name: "Sound off" }),
  ];
  await expectScreenBounds(page, [page.getByRole("heading", { level: 1 }), ...activeControls]);
  for (const control of activeControls.slice(1)) await expectWithinViewport(control, page, true);

  await page.getByRole("button", { name: "Done" }).click();
  await expectScreenBounds(page, [
    page.getByLabel(/What detail claimed your attention first/),
    page.getByRole("button", { name: "Not possible" }),
    page.getByRole("button", { name: "Pause" }),
    page.getByRole("button", { name: "Stop" }),
  ]);
  await page.getByRole("button", { name: "Pause" }).click();
  await expectScreenBounds(page, [
    page.getByRole("heading", { name: "The path will wait." }),
    page.getByRole("button", { name: "Resume expedition" }),
    page.getByRole("button", { name: "Stop and return home" }),
  ]);
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
  await expect(page.getByRole("heading", { name: "Moss has become the expedition persona." })).toBeVisible();
  await page.getByRole("button", { name: "Skip transformation" }).click();
  await expect(page.getByText("The portal is active. Your expedition is ready.")).toBeVisible();
  await page.getByRole("button", { name: "Enter expedition" }).evaluate((button) => {
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
  await page.getByRole("button", { name: "Skip transformation" }).click();
  await page.getByRole("button", { name: "Enter expedition" }).click();

  await expect(page.getByRole("heading", { name: "Set the edges" })).toBeVisible();
  const safetyAlert = page.getByRole("alert").filter({
    hasText: "No safe opening instruction fits the boundaries you chose.",
  });
  await expect(safetyAlert).toBeVisible();
  const colors = await safetyAlert.evaluate((element) => ({
    foreground: getComputedStyle(element).color,
    background: getComputedStyle(element.closest(".boundary-form") as Element).backgroundColor,
  }));
  expect(contrastRatio(colors.foreground, colors.background)).toBeGreaterThanOrEqual(4.5);
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
  await page.getByRole("button", { name: "Skip transformation" }).click();
  await page.getByRole("button", { name: "Enter expedition" }).click();
  await page.getByRole("button", { name: "Not possible" }).click();

  await expect(page.getByRole("heading", { name: "The path closes gently." })).toBeVisible();
  await expect(page.getByText("Nothing more is required.")).toBeVisible();
});
