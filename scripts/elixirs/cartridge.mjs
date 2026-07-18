import { ELIXIR_METADATA_FENCE, elixirMetadataSchema } from "./schema.mjs";

const metadataBlockPattern = new RegExp(
  "^```" + ELIXIR_METADATA_FENCE + "\\r?\\n([\\s\\S]*?)\\r?\\n```$",
  "gm",
);

const forbiddenSourcePatterns = [
  { pattern: /<!--[\s\S]*?-->/, reason: "hidden HTML comments are not allowed" },
  {
    // The validator intentionally names the complete forbidden control range.
    // eslint-disable-next-line no-control-regex
    pattern: /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200D\u2060\uFEFF]/u,
    reason: "hidden control characters are not allowed",
  },
  { pattern: /<(?:script|iframe|object|embed)\b/i, reason: "executable or embedded HTML is not allowed" },
  { pattern: /(?:javascript|data\s*:\s*text\/html)\s*:/i, reason: "executable URLs are not allowed" },
  { pattern: /\b[a-z][a-z0-9+.-]*:\/\//i, reason: "remote URLs are not allowed inside a self-contained cartridge" },
  { pattern: /(?:^|[\s("'=])\/\/[a-z0-9]/im, reason: "protocol-relative URLs are not allowed" },
  { pattern: /!?\[[^\]]*\]\((?!#)[^)]+\)/i, reason: "linked resources and attachments are not allowed" },
  {
    pattern: /\b(?:fetch|download|retrieve|open|visit|browse|load|follow)\b[^\n]{0,80}\b(?:url|website|link|resource|file|attachment)\b/i,
    reason: "instructions to retrieve another resource are not allowed",
  },
  {
    pattern: /(?:^|[\s("'])[^\s)"']+\.(?:exe|msi|dmg|pkg|app|bat|cmd|com|ps1|sh|bash|zsh|fish|js|mjs|cjs|ts|py|rb|php|jar|zip|tar|gz)(?:[\s)"']|$)/im,
    reason: "executable or packaged attachment references are not allowed",
  },
  { pattern: /^\s*```(?:javascript|js|typescript|ts|bash|sh|powershell|python|html)\b/im, reason: "executable code fences are not allowed" },
  { pattern: /<\|(?:system|assistant|user)\|>/i, reason: "model-specific control tokens are not allowed" },
];

const base64TokenPattern = /(?:^|[^A-Za-z0-9+/])([A-Za-z0-9+/]{16,}={0,2})(?=$|[^A-Za-z0-9+/=])/g;

function containsEncodedText(source) {
  for (const match of source.matchAll(base64TokenPattern)) {
    const token = match[1];
    if (token.length % 4 !== 0) continue;

    const decoded = Buffer.from(token, "base64");
    const normalizedInput = token.replace(/=+$/, "");
    const normalizedRoundTrip = decoded.toString("base64").replace(/=+$/, "");
    if (normalizedRoundTrip !== normalizedInput || decoded.length < 8) continue;

    const printableBytes = [...decoded].filter(
      (byte) => byte === 9 || byte === 10 || byte === 13 || (byte >= 32 && byte <= 126),
    ).length;
    if (printableBytes / decoded.length >= 0.9) return true;
  }
  return false;
}

export function parseCartridgeMetadata(source) {
  if (typeof source !== "string" || source.trim().length === 0) {
    throw new Error("Cartridge source must be non-empty UTF-8 text.");
  }

  const blocks = [...source.matchAll(metadataBlockPattern)];
  if (blocks.length !== 1) {
    throw new Error(`Cartridge source must contain exactly one ${ELIXIR_METADATA_FENCE} block.`);
  }

  let metadata;
  try {
    metadata = JSON.parse(blocks[0][1]);
  } catch {
    throw new Error("Cartridge metadata must be valid JSON.");
  }

  return elixirMetadataSchema.parse(metadata);
}

export function validatePortableSource(source) {
  for (const { pattern, reason } of forbiddenSourcePatterns) {
    if (pattern.test(source)) {
      throw new Error(reason);
    }
  }
  if (containsEncodedText(source)) {
    throw new Error("encoded text payloads are not allowed");
  }
}

export function extractCovenantVersion(covenant) {
  const match = covenant.match(/^Covenant version: (\d+\.\d+\.\d+)$/m);
  if (!match) {
    throw new Error("Canonical covenant must declare a semantic Covenant version.");
  }
  return match[1];
}

export function assertCanonicalCovenant(source, covenant, declaredVersion) {
  const canonical = covenant.trim();
  const occurrences = source.split(canonical).length - 1;
  if (occurrences !== 1) {
    throw new Error("Cartridge must embed exactly one unmodified copy of the canonical covenant.");
  }

  const canonicalVersion = extractCovenantVersion(canonical);
  if (canonicalVersion !== declaredVersion) {
    throw new Error("Cartridge covenantVersion must match the embedded canonical covenant.");
  }
}

export function validateCartridgeDocument(source, covenant) {
  validatePortableSource(source);
  const metadata = parseCartridgeMetadata(source);
  assertCanonicalCovenant(source, covenant, metadata.covenantVersion);
  return metadata;
}
