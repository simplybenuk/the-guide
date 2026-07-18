const copyText = async (text) => {
  if (!navigator.clipboard?.writeText) {
    const error = new Error("Clipboard access is unavailable");
    error.name = "ClipboardUnavailableError";
    throw error;
  }
  await navigator.clipboard.writeText(text);
};

const copyFailureResult = (error) => {
  if (error?.name === "ClipboardUnavailableError") return "unavailable";
  if (error?.name === "NotAllowedError" || error?.name === "SecurityError") return "denied";
  return "failed";
};

for (const panel of document.querySelectorAll(".handoff-panel")) {
  const chatgptPrompt = panel.querySelector("[data-chatgpt-prompt]");
  const resolverPrompt = panel.querySelector("[data-resolver-prompt]");
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
  resolverPrompt.value = resolverPrompt.value.replace(relativeCartridgeUrl, absoluteCartridgeUrl);
  for (const action of panel.querySelectorAll("[data-copy-action]")) action.hidden = false;

  const reportFailure = (selectable, result) => {
    selectable.focus();
    if (typeof selectable.select === "function") selectable.select();
    status.textContent = result === "denied"
      ? "Clipboard permission was denied. The text is selected so you can copy it manually."
      : result === "unavailable"
        ? "Clipboard access is unavailable. The text is selected so you can copy it manually."
        : "Copying failed unexpectedly. The text is selected so you can copy it manually.";
  };

  panel.querySelector("[data-copy-chatgpt]").addEventListener("click", async () => {
    try {
      await copyText(chatgptPrompt.value);
      status.textContent = "Complete ChatGPT prompt copied. Paste it into a fresh conversation.";
      recordDelivery({
        deliveryMethod: "self_contained_prompt_copy",
        targetHarness: "chatgpt",
        result: "succeeded",
      });
    } catch (error) {
      const result = copyFailureResult(error);
      recordDelivery({
        deliveryMethod: "self_contained_prompt_copy",
        targetHarness: "chatgpt",
        result,
      });
      reportFailure(chatgptPrompt, result);
    }
  });

  panel.querySelector("[data-copy-resolver]").addEventListener("click", async () => {
    try {
      await copyText(resolverPrompt.value);
      status.textContent = "Experimental agent prompt copied.";
      recordDelivery({
        deliveryMethod: "resolver_prompt_copy",
        targetHarness: "unspecified",
        result: "succeeded",
      });
    } catch (error) {
      const result = copyFailureResult(error);
      recordDelivery({
        deliveryMethod: "resolver_prompt_copy",
        targetHarness: "unspecified",
        result,
      });
      const resolverPanel = resolverPrompt.closest("details");
      resolverPanel.open = true;
      reportFailure(resolverPrompt, result);
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
      const result = copyFailureResult(error);
      recordDelivery({
        deliveryMethod: "cartridge_text_copy",
        targetHarness: "unspecified",
        result,
      });
      const sourcePanel = cartridgeSource.closest("details");
      sourcePanel.open = true;
      cartridgeSource.parentElement.focus();
      status.textContent = result === "denied"
        ? "Clipboard permission was denied. The complete source is open below for manual copying."
        : result === "unavailable"
          ? "Clipboard access is unavailable. The complete source is open below for manual copying."
          : "Copying failed unexpectedly. The complete source is open below for manual copying.";
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
