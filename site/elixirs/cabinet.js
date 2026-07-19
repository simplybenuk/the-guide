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
  const prompt = panel.querySelector("[data-launcher-prompt]");
  const status = panel.querySelector("[data-copy-status]");
  const elixirId = panel.dataset.elixirId;
  const elixirVersion = panel.dataset.elixirVersion;

  const recordDelivery = ({ deliveryMethod, result }) => {
    try {
      window.GuideDeliveryEvents?.record({
        deliveryMethod,
        elixirId,
        elixirVersion,
        result,
        targetHarness: "unspecified",
      });
    } catch {
      // Delivery remains available when local event construction fails closed.
    }
  };

  const copyAction = panel.querySelector("[data-copy-launcher]");
  copyAction.hidden = false;
  copyAction.addEventListener("click", async () => {
    try {
      await copyText(prompt.value);
      status.textContent = "Prompt copied. Attach the story file, then send it in a new conversation.";
      recordDelivery({ deliveryMethod: "launcher_prompt_copy", result: "succeeded" });
    } catch (error) {
      const result = copyFailureResult(error);
      recordDelivery({ deliveryMethod: "launcher_prompt_copy", result });
      prompt.focus();
      prompt.select();
      status.textContent = result === "denied"
        ? "Clipboard permission was denied. The prompt is selected so you can copy it manually."
        : result === "unavailable"
          ? "Clipboard access is unavailable. The prompt is selected so you can copy it manually."
          : "Copying failed unexpectedly. The prompt is selected so you can copy it manually.";
    }
  });

  panel.querySelector("[data-download-cartridge]").addEventListener("click", () => {
    recordDelivery({ deliveryMethod: "cartridge_file_download", result: "initiated" });
  });

  panel.querySelector("[data-download-skill]").addEventListener("click", () => {
    recordDelivery({ deliveryMethod: "agent_skill_download", result: "initiated" });
  });
}
