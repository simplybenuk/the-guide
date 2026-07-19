import { expect, test, type Page } from "@playwright/test";

type DeliveryEvent = {
  contract_version: string;
  event_id: string;
  event_name: string;
  occurred_at: string;
  surface: string;
  channel: string;
  elixir_id: string;
  elixir_version: string;
  delivery_method: string;
  target_harness: string;
  result: string;
  deployment_revision: string;
};

const captureDeliveryEvents = async (page: Page) => {
  await page.addInitScript(() => {
    const state = window as unknown as { deliveryEvents: unknown[] };
    state.deliveryEvents = [];
    window.addEventListener("the-guide:delivery-event", (event) => {
      state.deliveryEvents.push((event as CustomEvent).detail);
    });
  });
};

const readDeliveryEvents = (page: Page) =>
  page.evaluate(() =>
    (window as unknown as { deliveryEvents: DeliveryEvent[] }).deliveryEvents,
  );

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
    await expect(page.locator("[data-spotlight]")).toHaveCount(1);
    await expect(page.locator("[data-shelf]")).toHaveCount(3);
    await expect(page.locator("[data-catalogue-entry]")).toHaveCount(9);
    await expect(page.getByRole("link", { name: "Browse all Elixirs" })).toBeVisible();
    await expect(page.getByText("This cabinet does not receive your game conversation", { exact: false })).toBeVisible();
    await expect(page.getByRole("link", { name: "Read the alpha usage terms" })).toHaveAttribute("href", "terms.md");
    const termsResponse = await page.context().request.get(new URL("terms.md", page.url()).href);
    expect(termsResponse.ok()).toBe(true);
    expect(await termsResponse.text()).toContain("personal, non-commercial alpha testing");
    await assertNoHorizontalOverflow(page);

    await page.getByRole("link", { name: "Open The Mystery Elixir" }).first().click();
    await expect(page.getByRole("heading", { name: "The Mystery Elixir", exact: true })).toBeVisible();
    await expect(page.getByText("Three collaborative clue rounds")).toBeVisible();
    await expect(page.getByRole("link", { name: "Read the alpha usage terms" })).toHaveAttribute("href", "../../terms.md");
    await expect(page.getByRole("link", { name: /cartridges\/mystery\/0\.1\.0\/elixir\.md/ })).toHaveAttribute(
      "href",
      "../../cartridges/mystery/0.1.0/elixir.md",
    );

    await page.getByText("Show complete cartridge source").click();
    await expect(page.locator("[data-cartridge-source]")).toContainText("The Guide Common Elixir Covenant");
    expect(pageErrors).toEqual([]);
    expect(requestedUrls.every((url) => url.startsWith("http://127.0.0.1:4173/"))).toBe(true);
    expect(
      await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })),
    ).toEqual({ local: 0, session: 0 });
    await expect(page.locator("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay")).toHaveCount(0);
  });
}

test("keeps 500-entry discovery bounded, complete, and local-only", async ({ page }, testInfo) => {
  const requestedUrls: string[] = [];
  page.on("request", (request) => requestedUrls.push(request.url()));
  await page.goto("http://127.0.0.1:4174/scale/");

  await expect(page.locator("[data-spotlight]")).toHaveCount(1);
  await expect(page.locator("[data-catalogue-entry]")).toHaveCount(3);
  await expect(page.getByRole("searchbox")).toHaveCount(0);
  await page.getByRole("link", { name: "Browse all Elixirs" }).click();
  await expect(page).toHaveURL("http://127.0.0.1:4174/scale/browse/");
  await expect(page.getByRole("article")).toHaveCount(24);
  await expect(page.getByRole("status")).toHaveText("500 Elixirs shown; first 24 displayed.");
  await expect(page.getByRole("link", { name: "Page 21" })).toHaveAttribute("href", "./page-21/");

  const interactionTiming = await page.evaluate(() => {
    const search = document.querySelector<HTMLInputElement>("[data-catalogue-search]")!;
    const filter = document.querySelector<HTMLInputElement>('[data-filter-id="mechanic-noticing"]')!;
    search.value = "Fixture Elixir 0498";
    const searchStarted = performance.now();
    search.dispatchEvent(new Event("input", { bubbles: true }));
    const searchMilliseconds = performance.now() - searchStarted;
    search.value = "";
    search.dispatchEvent(new Event("input", { bubbles: true }));
    filter.checked = true;
    const filterStarted = performance.now();
    filter.dispatchEvent(new Event("change", { bubbles: true }));
    const filterMilliseconds = performance.now() - filterStarted;
    filter.checked = false;
    filter.dispatchEvent(new Event("change", { bubbles: true }));
    return { searchMilliseconds, filterMilliseconds };
  });
  await testInfo.attach("catalogue-interaction-timing.json", { body: JSON.stringify(interactionTiming), contentType: "application/json" });
  process.stdout.write(`[catalogue-scale-timing] ${JSON.stringify(interactionTiming)}\n`);
  expect(interactionTiming.searchMilliseconds).toBeLessThan(16.7);
  expect(interactionTiming.filterMilliseconds).toBeLessThan(16.7);

  await page.getByLabel("Search titles, promises, mechanics, and moods").fill("Fixture Elixir 0499");
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Fixture Elixir 0499" })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("1 Elixir shown.");

  await page.getByLabel("Search titles, promises, mechanics, and moods").fill("");
  await page.getByText("Filter the catalogue").click();
  await page.locator('[data-filter-id="mechanic-noticing"]').check();
  await expect(page.getByRole("status")).toHaveText("250 Elixirs shown; first 24 displayed.");
  await page.getByRole("button", { name: "Show more Elixirs" }).click();
  await expect(page.getByRole("article")).toHaveCount(48);

  expect(requestedUrls.every((url) => url.startsWith("http://127.0.0.1:4174/"))).toBe(true);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
});

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
  const startShelf = page.locator("[data-shelf]").filter({ has: page.getByRole("heading", { name: "Start here" }) });
  const nextShelfButton = startShelf.getByRole("button", { name: "Next Start here Elixirs" });
  await expect(nextShelfButton).toBeVisible();
  await nextShelfButton.click();
  await expect.poll(() => startShelf.locator("[data-shelf-track]").evaluate((track) => track.scrollLeft)).toBeGreaterThan(0);

  await page.goto("/the-guide/elixirs/mystery/");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  await assertNoHorizontalOverflow(page);
  await expect(page.getByRole("heading", { name: "Start this Elixir in ChatGPT" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy for ChatGPT" })).toBeVisible();
});

test("copies the exact self-contained, resolver, and raw cartridge payloads", async ({ page }) => {
  await captureDeliveryEvents(page);
  await page.addInitScript(() => {
    const state = window as unknown as { copiedText: string[] };
    state.copiedText = [];
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: (value: string) => state.copiedText.push(value) },
    });
  });
  await page.goto("/the-guide/elixirs/signal/");

  await page.getByRole("button", { name: "Copy for ChatGPT" }).click();
  await expect(page.getByRole("status")).toContainText("Complete ChatGPT prompt copied");
  const chatgptPrompt = await page.locator("[data-chatgpt-prompt]").inputValue();
  const copiedChatgptPrompt = await page.evaluate(
    () => (window as unknown as { copiedText: string[] }).copiedText[0],
  );
  expect(copiedChatgptPrompt).toBe(chatgptPrompt);
  expect(copiedChatgptPrompt).toContain("Delivery envelope: the-guide-elixir/1");
  expect(copiedChatgptPrompt).toContain("<<< BEGIN THE GUIDE ELIXIR CARTRIDGE >>>");
  expect(copiedChatgptPrompt).toContain("<<< END THE GUIDE ELIXIR CARTRIDGE >>>");
  expect(copiedChatgptPrompt).toContain("affirmative consent");
  expect(copiedChatgptPrompt).not.toContain("http://127.0.0.1:4173");

  await page.getByText("Agent prompt (experimental)").click();
  await page.getByRole("button", { name: "Copy agent prompt" }).click();
  await expect(page.getByRole("status")).toContainText("Experimental agent prompt copied");
  const resolverPrompt = await page.locator("[data-resolver-prompt]").inputValue();
  const copiedResolverPrompt = await page.evaluate(
    () => (window as unknown as { copiedText: string[] }).copiedText[1],
  );
  expect(copiedResolverPrompt).toBe(resolverPrompt);
  expect(copiedResolverPrompt).toContain(
    "http://127.0.0.1:4173/the-guide/cartridges/signal/0.1.0/elixir.md",
  );
  expect(copiedResolverPrompt).toMatch(
    /https:\/\/raw\.githubusercontent\.com\/simplybenuk\/the-guide\/[0-9a-f]{40}\/content\/elixirs\/signal\.md/,
  );
  expect(copiedResolverPrompt).not.toMatch(/\/main\/|\bnpx\b/);

  await page.getByRole("button", { name: "Copy raw cartridge" }).click();
  await expect(page.getByRole("status")).toHaveText("Complete cartridge copied.");
  const copiedCartridge = await page.evaluate(
    () => (window as unknown as { copiedText: string[] }).copiedText[2],
  );
  expect(copiedCartridge).toBe(await page.locator("[data-cartridge-source]").textContent());
  expect(copiedCartridge).toContain("# The Signal Elixir");
  const openingMarker = "<<< BEGIN THE GUIDE ELIXIR CARTRIDGE >>>\n";
  expect(
    copiedChatgptPrompt.slice(
      copiedChatgptPrompt.indexOf(openingMarker) + openingMarker.length,
      copiedChatgptPrompt.indexOf("<<< END THE GUIDE ELIXIR CARTRIDGE >>>"),
    ),
  ).toBe(copiedCartridge);

  const events = await readDeliveryEvents(page);
  expect(events).toHaveLength(3);
  expect(events.map(({ delivery_method, target_harness, result }) => ({ delivery_method, target_harness, result }))).toEqual([
    { delivery_method: "self_contained_prompt_copy", target_harness: "chatgpt", result: "succeeded" },
    { delivery_method: "resolver_prompt_copy", target_harness: "unspecified", result: "succeeded" },
    { delivery_method: "cartridge_text_copy", target_harness: "unspecified", result: "succeeded" },
  ]);
  for (const event of events) {
    expect(Object.keys(event).sort()).toEqual([
      "channel",
      "contract_version",
      "delivery_method",
      "deployment_revision",
      "elixir_id",
      "elixir_version",
      "event_id",
      "event_name",
      "occurred_at",
      "result",
      "surface",
      "target_harness",
    ]);
    expect(event).toMatchObject({
      contract_version: "1.1.0",
      event_name: "delivery_action_recorded",
      surface: "cabinet_detail",
      channel: "cabinet_first",
      elixir_id: "the-guide.elixir.signal",
      elixir_version: "0.1.0",
      deployment_revision: "cabinet-delivery-v1",
    });
    expect(event.event_id).toMatch(/^evt_[0-9a-f-]{36}$/);
    expect(Number.isNaN(Date.parse(event.occurred_at))).toBe(false);
  }
});

test("resolves only the Pages source in the agent prompt against the current host", async ({ page }) => {
  await page.goto("http://localhost:4173/the-guide/elixirs/story/");

  await expect(page.locator("[data-resolver-prompt]")).toHaveValue(
    /http:\/\/localhost:4173\/the-guide\/cartridges\/story\/0\.1\.0\/elixir\.md/,
  );
  await expect(page.locator("[data-chatgpt-prompt]")).not.toHaveValue(/https?:\/\//);
  await expect(page.locator("[data-resolver-prompt]")).not.toHaveValue(/simplybenuk\.github\.io|\/main\//);
});

test("offers manual fallback when clipboard access is denied", async ({ page }) => {
  await captureDeliveryEvents(page);
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new DOMException("denied", "NotAllowedError")) },
    });
  });
  await page.goto("/the-guide/elixirs/story/");

  await page.getByRole("button", { name: "Copy for ChatGPT" }).click();
  await expect(page.getByRole("status")).toContainText("selected so you can copy it manually");
  await expect(page.locator("[data-chatgpt-prompt]")).toBeFocused();

  await page.getByText("Agent prompt (experimental)").click();
  await page.getByRole("button", { name: "Copy agent prompt" }).click();
  await expect(page.locator("[data-resolver-prompt]")).toBeFocused();

  await page.getByRole("button", { name: "Copy raw cartridge" }).click();
  await expect(page.getByRole("status")).toContainText("complete source is open below");
  await expect(page.locator(".source-panel details")).toHaveAttribute("open", "");

  const events = await readDeliveryEvents(page);
  expect(events).toHaveLength(3);
  expect(events.map(({ result }) => result)).toEqual(["denied", "denied", "denied"]);
  expect(events.every((event) => Object.keys(event).length === 12)).toBe(true);
  expect(JSON.stringify(events)).not.toMatch(/transcript|clipboard|stack|private/i);
});

test("distinguishes unavailable clipboard access from an unexpected copy failure", async ({ page }) => {
  await captureDeliveryEvents(page);
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {} });
  });
  await page.goto("/the-guide/elixirs/story/");

  await page.getByRole("button", { name: "Copy for ChatGPT" }).click();
  await expect(page.getByRole("status")).toContainText("Clipboard access is unavailable");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("unexpected")) },
    });
  });
  await page.getByText("Agent prompt (experimental)").click();
  await page.getByRole("button", { name: "Copy agent prompt" }).click();
  await expect(page.getByRole("status")).toContainText("Copying failed unexpectedly");

  expect((await readDeliveryEvents(page)).map(({ delivery_method, result }) => ({ delivery_method, result }))).toEqual([
    { delivery_method: "self_contained_prompt_copy", result: "unavailable" },
    { delivery_method: "resolver_prompt_copy", result: "failed" },
  ]);
});

test("records download initiation locally without an analytics request", async ({ page }) => {
  await captureDeliveryEvents(page);
  const requestedUrls: string[] = [];
  page.on("request", (request) => requestedUrls.push(request.url()));
  await page.goto("/the-guide/elixirs/mystery/");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download Markdown" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("the-guide-mystery-0.1.0.md");

  expect(await readDeliveryEvents(page)).toMatchObject([
    {
      event_name: "delivery_action_recorded",
      elixir_id: "the-guide.elixir.mystery",
      delivery_method: "cartridge_file_download",
      target_harness: "unspecified",
      result: "initiated",
    },
  ]);
  expect(
    requestedUrls.some((url) =>
      /\/(?:analytics|collect|telemetry)(?:[/.]|$)|\/events(?:[/?#]|$)/i.test(new URL(url).pathname),
    ),
  ).toBe(false);
  expect(
    await page.evaluate(async () => ({
      cookie: document.cookie,
      local: localStorage.length,
      session: sessionStorage.length,
      indexedDatabases: typeof indexedDB.databases === "function" ? await indexedDB.databases() : [],
    })),
  ).toEqual({ cookie: "", local: 0, session: 0, indexedDatabases: [] });
});

test("keeps source inspection and download available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/the-guide/elixirs/signal/");

  await expect(page.getByRole("button", { name: "Copy for ChatGPT" })).toHaveCount(0);
  await expect(page.locator("[data-chatgpt-prompt]")).toHaveValue(/<<< END THE GUIDE ELIXIR CARTRIDGE >>>/);
  await expect(page.locator("[data-resolver-prompt]")).toHaveValue(
    /\.\.\/\.\.\/cartridges\/signal\/0\.1\.0\/elixir\.md/,
  );
  await expect(page.getByText("select and copy the complete prompt above", { exact: false })).toBeVisible();
  await page.getByText("Show complete cartridge source").click();
  await expect(page.locator("[data-cartridge-source]")).toContainText("The Signal Elixir has worn off");
  const download = page.getByRole("link", { name: "Download Markdown" });
  await expect(download).toHaveAttribute("download", "the-guide-signal-0.1.0.md");
  const response = await context.request.get(
    "http://127.0.0.1:4173/the-guide/cartridges/signal/0.1.0/elixir.md",
  );
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain("# The Signal Elixir");
  await context.close();
});

test("searches, filters, sorts, and clears locally without persisting the query", async ({ page }) => {
  const requestedUrls: string[] = [];
  page.on("request", (request) => requestedUrls.push(request.url()));
  await page.goto("/the-guide/browse/");

  const search = page.getByRole("searchbox", { name: "Search titles, promises, mechanics, and moods" });
  await search.fill("deduction");
  await expect(page.getByRole("status")).toHaveText("1 Elixir shown.");
  await expect(page.getByRole("link", { name: "Open The Mystery Elixir" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open The Signal Elixir" })).toBeHidden();
  expect(page.url()).not.toContain("deduction");

  await search.fill("");
  await page.getByText("Filter the catalogue").click();
  await page.getByLabel("Grounded noticing").check();
  await expect(page.getByRole("status")).toHaveText("1 Elixir shown.");
  expect(page.url()).toContain("filter=mechanic-noticing");
  await page.getByRole("button", { name: "Clear search and filters" }).click();
  await expect(page.getByRole("status")).toHaveText("3 Elixirs shown.");
  await expect(search).toBeFocused();
  expect(new URL(page.url()).search).toBe("");

  await page.getByRole("combobox", { name: "Sort" }).selectOption("title");
  const titles = await page.locator("[data-catalogue-entry]:not([hidden]) h3").allTextContents();
  expect(titles).toEqual(["The Mystery Elixir", "The Signal Elixir", "The Story Elixir"]);
  expect(requestedUrls.every((url) => url.startsWith("http://127.0.0.1:4173/"))).toBe(true);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
});

test("exposes editorial collections, explainable related items, and immutable release facts", async ({ page, request }) => {
  await page.goto("/the-guide/");
  const startShelf = page.locator("[data-shelf]").filter({ has: page.getByRole("heading", { name: "Start here" }) });
  await startShelf.getByRole("link", { name: "View collection" }).click();
  await expect(page.getByRole("heading", { name: "Start here" })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(3);
  await expect(page.getByText("Curated by The Guide")).toBeVisible();

  await page.goto("/the-guide/elixirs/signal/");
  await expect(page.getByRole("heading", { name: "Publisher, review, and provenance" })).toBeVisible();
  const compatibilityEvidence = page.getByRole("link", { name: "elixir-harness-matrix.md" });
  await expect(compatibilityEvidence).toHaveAttribute("href", "../../evidence/the-guide/signal/0.1.0/compatibility-1.md");
  const evidenceResponse = await request.get(new URL(await compatibilityEvidence.getAttribute("href") ?? "", page.url()).href);
  expect(evidenceResponse.ok()).toBe(true);
  expect(await evidenceResponse.text()).toContain("Elixir cross-harness evaluation matrix");
  await expect(page.getByText("different mechanic", { exact: false })).toHaveCount(2);
  await page.getByRole("link", { name: "View this version’s immutable paths and history" }).click();
  await expect(page.getByRole("heading", { name: "The Signal Elixir 0.1.0" })).toBeVisible();
  await expect(page.getByText("1c371b5813f6d93f37cabe486337f2680928f3e2ae5c19d4e86d40328f597cbb")).toBeVisible();

  const legacy = await request.get("/the-guide/cartridges/signal/0.1.0/elixir.md");
  const canonical = await request.get("/the-guide/cartridges/the-guide/signal/0.1.0/elixir.md");
  expect(legacy.ok()).toBe(true);
  expect(canonical.ok()).toBe(true);
  expect(await canonical.body()).toEqual(await legacy.body());
});

test("keeps the complete static catalogue browseable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/the-guide/");
  await expect(page.locator("[data-spotlight]")).toHaveCount(1);
  await expect(page.locator("[data-catalogue-entry]")).toHaveCount(9);
  await expect(page.getByRole("searchbox")).toHaveCount(0);
  await page.getByRole("link", { name: /Search and filter all 3 Elixirs/ }).click();
  await expect(page.getByRole("heading", { name: "Browse all Elixirs" })).toBeVisible();
  await expect(page.getByRole("searchbox")).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(3);
  await page.goto("http://127.0.0.1:4173/the-guide/");
  const lowEnergyShelf = page.locator("[data-shelf]").filter({ has: page.getByRole("heading", { name: "Low-energy play" }) });
  await lowEnergyShelf.getByRole("link", { name: "View collection" }).click();
  await expect(page.getByRole("article")).toHaveCount(3);
  await page.getByRole("link", { name: "Open The Story Elixir" }).click();
  await expect(page.getByRole("heading", { name: "Start this Elixir in ChatGPT" })).toBeVisible();
  await context.close();
});
