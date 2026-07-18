const copyText = async (text) => {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard access is unavailable");
  }
  await navigator.clipboard.writeText(text);
};

for (const panel of document.querySelectorAll(".handoff-panel")) {
  const handoff = panel.querySelector("[data-handoff]");
  const cartridgeLink = panel.querySelector("[data-cartridge-url]");
  const cartridgeSource = document.querySelector("[data-cartridge-source]");
  const status = panel.querySelector("[data-copy-status]");
  const relativeCartridgeUrl = cartridgeLink.getAttribute("href");
  const absoluteCartridgeUrl = new URL(cartridgeLink.href, window.location.href).href;

  cartridgeLink.textContent = absoluteCartridgeUrl;
  handoff.value = handoff.value.replace(relativeCartridgeUrl, absoluteCartridgeUrl);
  for (const action of panel.querySelectorAll("[data-copy-action]")) action.hidden = false;

  const reportFailure = (selectable) => {
    selectable.focus();
    if (typeof selectable.select === "function") selectable.select();
    status.textContent = "Clipboard access was unavailable. The text is selected so you can copy it manually.";
  };

  panel.querySelector("[data-copy-handoff]").addEventListener("click", async () => {
    try {
      await copyText(handoff.value);
      status.textContent = "Handoff copied. Paste it into the agent conversation you chose.";
    } catch {
      reportFailure(handoff);
    }
  });

  panel.querySelector("[data-copy-cartridge]").addEventListener("click", async () => {
    try {
      await copyText(cartridgeSource.textContent);
      status.textContent = "Complete cartridge copied.";
    } catch {
      const sourcePanel = cartridgeSource.closest("details");
      sourcePanel.open = true;
      cartridgeSource.parentElement.focus();
      status.textContent = "Clipboard access was unavailable. The complete source is open below for manual copying.";
    }
  });
}
