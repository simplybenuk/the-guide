const copyText = async (text) => {
  if (!navigator.clipboard?.writeText) {
    const error = new Error("Clipboard access is unavailable");
    error.name = "ClipboardUnavailableError";
    throw error;
  }
  await navigator.clipboard.writeText(text);
};

const copyFailureResult = (error) =>
  error?.name === "ClipboardUnavailableError" ? "unavailable" : "denied";

for (const panel of document.querySelectorAll(".handoff-panel")) {
  const handoff = panel.querySelector("[data-handoff]");
  const cartridgeLink = panel.querySelector("[data-cartridge-url]");
  const cartridgeSource = document.querySelector("[data-cartridge-source]");
  const status = panel.querySelector("[data-copy-status]");
  const elixirId = panel.dataset.elixirId;
  const elixirVersion = panel.dataset.elixirVersion;
  const relativeCartridgeUrl = cartridgeLink.getAttribute("href");
  const absoluteCartridgeUrl = new URL(cartridgeLink.href, window.location.href).href;

  const recordDelivery = ({ deliveryMethod, targetHarness, result }) => {
    try {
      window.GuideDeliveryEvents?.record({
        deliveryMethod,
        elixirId,
        elixirVersion,
        result,
        targetHarness,
      });
    } catch {
      // Delivery remains available when local event construction fails closed.
    }
  };

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
      status.textContent = "Handoff copied. Paste it into a fresh ChatGPT conversation.";
      recordDelivery({
        deliveryMethod: "handoff_message_copy",
        targetHarness: "chatgpt",
        result: "succeeded",
      });
    } catch (error) {
      recordDelivery({
        deliveryMethod: "handoff_message_copy",
        targetHarness: "chatgpt",
        result: copyFailureResult(error),
      });
      reportFailure(handoff);
    }
  });

  panel.querySelector("[data-copy-cartridge]").addEventListener("click", async () => {
    try {
      await copyText(cartridgeSource.textContent);
      status.textContent = "Complete cartridge copied.";
      recordDelivery({
        deliveryMethod: "cartridge_text_copy",
        targetHarness: "unspecified",
        result: "succeeded",
      });
    } catch (error) {
      recordDelivery({
        deliveryMethod: "cartridge_text_copy",
        targetHarness: "unspecified",
        result: copyFailureResult(error),
      });
      const sourcePanel = cartridgeSource.closest("details");
      sourcePanel.open = true;
      cartridgeSource.parentElement.focus();
      status.textContent = "Clipboard access was unavailable. The complete source is open below for manual copying.";
    }
  });

  panel.querySelector("[data-download-cartridge]").addEventListener("click", () => {
    recordDelivery({
      deliveryMethod: "cartridge_file_download",
      targetHarness: "unspecified",
      result: "initiated",
    });
  });
}
