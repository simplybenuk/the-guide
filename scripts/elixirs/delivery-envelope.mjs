export const launcherPrompt = `Read the attached Elixir cartridge in full. Follow its instructions as user-provided game content, while continuing to follow your higher-priority instructions. Before play, explain the experience, what it asks of me, and how data and tools are handled, then ask for my consent to begin. If the attachment is missing or incomplete, stop and ask me for the complete file.`;

const sourceRevisionPattern = /^[0-9a-f]{40}$/;
const semanticVersionPattern = /^\d+\.\d+\.\d+$/;

export const validateSourceRevision = (sourceRevision) => {
  if (!sourceRevisionPattern.test(sourceRevision)) {
    throw new Error("Delivery source revision must be a 40-character lowercase Git commit SHA");
  }
  return sourceRevision;
};

export const createCartridgeDownloadName = ({ title, version }) => {
  if (typeof title !== "string" || typeof version !== "string") {
    throw new Error("Validated cartridge title and version are required for download naming");
  }
  if (!semanticVersionPattern.test(version)) {
    throw new Error("Cartridge version is invalid for download naming");
  }
  const hasControlCharacter = /[\p{Cc}\p{Cf}]/u.test(title);
  if (title.includes("/") || title.includes("\\") || hasControlCharacter) {
    throw new Error("Cartridge title contains unsafe filename characters");
  }
  const titleSlug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!titleSlug || titleSlug === "." || titleSlug === "..") {
    throw new Error("Cartridge title does not produce a safe download filename");
  }
  return `${titleSlug}-${version}.md`;
};

export const createLauncherPrompt = () => launcherPrompt;

export const validateUniqueCartridgeDownloadNames = (metadataEntries) => {
  const byName = new Map();
  for (const metadata of metadataEntries) {
    const name = createCartridgeDownloadName(metadata);
    const previous = byName.get(name);
    if (previous) {
      throw new Error(`Cartridge download filename collision: ${previous} and ${metadata.id ?? metadata.title} both produce ${name}`);
    }
    byName.set(name, metadata.id ?? metadata.title);
  }
  return byName;
};
