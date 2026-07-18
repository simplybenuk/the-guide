import { expect, test, type Page } from "@playwright/test";

const assertNoHorizontalOverflow = async (page: Page) => {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
  ).toBe(true);
};

for (const basePath of ["/", "/the-guide/"]) {
  test(`serves the complete cabinet from ${basePath}`, async ({ page }) => {
    const pageErrors: string[] = [];
    const requestedUrls: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("request", (request) => requestedUrls.push(request.url()));
    await page.goto(basePath);

    await expect(page.getByRole("heading", { name: "Choose an Elixir. Let your agent drink the story." })).toBeVisible();
    await expect(page.getByRole("article")).toHaveCount(3);
    await expect(page.getByRole("link", { name: /Open The .* Elixir/ })).toHaveCount(3);
    await expect(page.getByText("This cabinet does not receive your game conversation", { exact: false })).toBeVisible();
    await assertNoHorizontalOverflow(page);

    await page.getByRole("link", { name: "Open The Mystery Elixir" }).click();
    await expect(page.getByRole("heading", { name: "The Mystery Elixir", exact: true })).toBeVisible();
    await expect(page.getByText("Three collaborative clue rounds")).toBeVisible();
    await expect(page.getByRole("link", { name: /cartridges\/mystery\/0\.1\.0\/elixir\.md/ })).toHaveAttribute(
      "href",
      "../../cartridges/mystery/0.1.0/elixir.md",
    );

    await page.getByText("Show complete cartridge source").click();
    await expect(page.getByText("The Guide Common Elixir Covenant", { exact: false })).toBeVisible();
    expect(pageErrors).toEqual([]);
    expect(requestedUrls.every((url) => url.startsWith("http://127.0.0.1:4173/"))).toBe(true);
    expect(
      await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })),
    ).toEqual({ local: 0, session: 0 });
    await expect(page.locator("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay")).toHaveCount(0);
  });
}

test("remains usable at 320px, 200% text, keyboard navigation, and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/the-guide/");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });

  await assertNoHorizontalOverflow(page);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();

  await page.goto("/the-guide/elixirs/mystery/");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  await assertNoHorizontalOverflow(page);
  await expect(page.getByRole("heading", { name: "Show this Elixir to my agent" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy handoff" })).toBeVisible();
});

test("copies the exact resolved handoff and complete canonical cartridge", async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as unknown as { copiedText: string[] };
    state.copiedText = [];
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: (value: string) => state.copiedText.push(value) },
    });
  });
  await page.goto("/the-guide/elixirs/signal/");

  await page.getByRole("button", { name: "Copy handoff" }).click();
  await expect(page.getByRole("status")).toContainText("Handoff copied");
  const handoff = await page.locator("[data-handoff]").inputValue();
  const copiedHandoff = await page.evaluate(
    () => (window as unknown as { copiedText: string[] }).copiedText[0],
  );
  expect(copiedHandoff).toBe(handoff);
  expect(copiedHandoff).toContain(
    "http://127.0.0.1:4173/the-guide/cartridges/signal/0.1.0/elixir.md",
  );
  expect(copiedHandoff).toContain("read the complete The Signal Elixir v0.1.0 cartridge");
  expect(copiedHandoff).toContain("Explain the game");
  expect(copiedHandoff).toContain("affirmative consent");

  await page.getByRole("button", { name: "Copy cartridge" }).click();
  await expect(page.getByRole("status")).toHaveText("Complete cartridge copied.");
  const copiedCartridge = await page.evaluate(
    () => (window as unknown as { copiedText: string[] }).copiedText[1],
  );
  expect(copiedCartridge).toBe(await page.locator("[data-cartridge-source]").textContent());
  expect(copiedCartridge).toContain("# The Signal Elixir");
});

test("resolves the handoff against the current host rather than a fixed deployment", async ({ page }) => {
  await page.goto("http://localhost:4173/the-guide/elixirs/story/");

  await expect(page.locator("[data-handoff]")).toHaveValue(
    /http:\/\/localhost:4173\/the-guide\/cartridges\/story\/0\.1\.0\/elixir\.md/,
  );
  await expect(page.locator("[data-handoff]")).not.toHaveValue(/simplybenuk\.github\.io/);
});

test("offers manual fallback when clipboard access is denied", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("denied")) },
    });
  });
  await page.goto("/the-guide/elixirs/story/");

  await page.getByRole("button", { name: "Copy handoff" }).click();
  await expect(page.getByRole("status")).toContainText("selected so you can copy it manually");
  await expect(page.locator("[data-handoff]")).toBeFocused();

  await page.getByRole("button", { name: "Copy cartridge" }).click();
  await expect(page.getByRole("status")).toContainText("complete source is open below");
  await expect(page.locator("details")).toHaveAttribute("open", "");
});

test("keeps source inspection and download available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/the-guide/elixirs/signal/");

  await expect(page.getByRole("button", { name: "Copy handoff" })).toHaveCount(0);
  await expect(page.locator("[data-handoff]")).toHaveValue(
    /\.\.\/\.\.\/cartridges\/signal\/0\.1\.0\/elixir\.md/,
  );
  await expect(page.getByText("copy the versioned link address above", { exact: false })).toBeVisible();
  await page.getByText("Show complete cartridge source").click();
  await expect(page.getByText("The Signal Elixir has worn off", { exact: false })).toBeVisible();
  const download = page.getByRole("link", { name: "Download .md" });
  await expect(download).toHaveAttribute("download", "the-guide-signal-0.1.0.md");
  const response = await context.request.get(
    "http://127.0.0.1:4173/the-guide/cartridges/signal/0.1.0/elixir.md",
  );
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain("# The Signal Elixir");
  await context.close();
});
