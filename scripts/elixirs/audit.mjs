import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createPublicCatalogueIndex,
  deriveExpectedArtifactPaths,
  loadCatalogue,
  renderWithdrawalTombstone,
} from "./catalogue.mjs";
import { agentElixirArchiveName, createAgentElixirArchive } from "./skill-archive.mjs";
import { createCartridgeDownloadName } from "./delivery-envelope.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const defaultCatalogue = loadCatalogue();
const textExtensions = /\.(?:css|html|js|json|md)$/;
const allowedAbsoluteUrls = new Set([
  "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
]);
const isInsideOrdinaryAnchor = (text, index) => {
  const openingStart = text.lastIndexOf("<a", index);
  if (openingStart < 0) return false;
  const openingEnd = text.indexOf(">", openingStart);
  return openingEnd > index && /\bhref\s*=\s*["']?$/.test(text.slice(openingStart, index));
};

const isAllowedAbsoluteUrl = ({ path, text, url, index }) =>
  path.endsWith(".html") && allowedAbsoluteUrls.has(url) && isInsideOrdinaryAnchor(text, index);

const forbiddenText = [
  { label: "Next.js runtime", pattern: /\/_next\// },
  { label: "application API", pattern: /\/api\/(?:health|expedition)/ },
  { label: "runtime environment access", pattern: /process\.env|GUIDE_PROVIDER_/ },
  { label: "browser persistence", pattern: /localStorage|sessionStorage|indexedDB|serviceWorker/ },
  { label: "network-capable collector", pattern: /navigator\.sendBeacon|XMLHttpRequest|\bfetch\s*\(|\bWebSocket\s*\(|\bEventSource\s*\(|\bimportScripts\s*\(|\bnew\s+Image\s*\(|document\.createElement\s*\(\s*["']script["']|document\.cookie/ },
  { label: "collector path", pattern: /\/(?:analytics|collect|events|telemetry)(?:[/?#"'])/i },
  { label: "remote CSS resource", pattern: /url\(\s*["']?https?:\/\//i },
  { label: "remote active HTML attribute", pattern: /<(?!a\b)[a-z][^>]*\b(?:src|srcset|href|action|data|poster)\s*=\s*["']?https?:\/\//i },
  { label: "remote stylesheet resource", pattern: /<link\b[^>]*\bhref\s*=\s*["']?https?:\/\//i },
  { label: "remote form action", pattern: /<form\b[^>]*\baction\s*=\s*["']?https?:\/\//i },
  { label: "refresh redirect", pattern: /<meta\s+[^>]*http-equiv=["']?refresh/i },
  { label: "analytics SDK", pattern: /google-analytics|googletagmanager|posthog|plausible\.io|segment\.com/i },
  { label: "public event logging", pattern: /console\.(?:log|info|debug|table)\s*\(/ },
  { label: "package execution command", pattern: /\bnpx(?:\s|$)/i },
  { label: "private key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { label: "GitHub credential", pattern: /(?:gh[pousr]_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{60,255})/ },
  { label: "OpenAI credential", pattern: /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/ },
  { label: "AWS access key", pattern: /(?:AKIA|ASIA)[A-Z0-9]{16}/ },
  { label: "Google API key", pattern: /AIza[A-Za-z0-9_-]{35}/ },
  { label: "Slack credential", pattern: /xox[baprs]-[A-Za-z0-9-]{20,}/ },
  { label: "bearer credential", pattern: /Authorization\s*:\s*Bearer\s+[A-Za-z0-9._~+/-]{20,}/i },
  { label: "assigned credential", pattern: /(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][^"'\r\n]{12,}["']/i },
  { label: "local absolute path", pattern: /(?:\/home\/|\/root\/|[A-Z]:\\Users\\)/ },
];

const walk = (root, directory = root) => readdirSync(directory).flatMap((name) => {
  const path = resolve(directory, name);
  const stat = lstatSync(path);
  if (stat.isSymbolicLink()) throw new Error(`Artifact contains symbolic link: ${relative(root, path)}`);
  if (stat.isDirectory()) return walk(root, path);
  if (!stat.isFile()) throw new Error(`Artifact contains unsupported entry: ${relative(root, path)}`);
  return [relative(root, path).split(sep).join("/")];
});

export const auditElixirArtifact = ({ artifactDirectory, catalogue = defaultCatalogue }) => {
  const root = resolve(artifactDirectory);
  const expectedPaths = deriveExpectedArtifactPaths(catalogue);
  const paths = walk(root).sort();
  if (JSON.stringify(paths) !== JSON.stringify(expectedPaths)) {
    const unexpected = paths.filter((path) => !expectedPaths.includes(path));
    const missing = expectedPaths.filter((path) => !paths.includes(path));
    throw new Error(`Artifact allowlist mismatch. Unexpected: ${unexpected.join(", ") || "none"}. Missing: ${missing.join(", ") || "none"}.`);
  }
  if (readFileSync(resolve(root, ".nojekyll")).length !== 0) throw new Error(".nojekyll must be an empty marker file");
  const expectedSkillArchive = createAgentElixirArchive({ repositoryRoot });
  const skillArchive = readFileSync(resolve(root, "skills", agentElixirArchiveName));
  if (!skillArchive.equals(expectedSkillArchive)) throw new Error("Agent Elixir skill archive differs from reviewed deterministic source");

  let totalBytes = 0;
  const hashes = {};
  for (const path of paths) {
    const contents = readFileSync(resolve(root, path));
    totalBytes += contents.length;
    hashes[path] = createHash("sha256").update(contents).digest("hex");
    if (!textExtensions.test(path)) continue;
    const text = contents.toString("utf8");
    for (const forbidden of forbiddenText) {
      if (forbidden.pattern.test(text)) throw new Error(`${path} contains forbidden ${forbidden.label} content`);
    }
    for (const match of text.matchAll(/https?:\/\/[^\s"'<>)]*/g)) {
      if (!isAllowedAbsoluteUrl({ path, text, url: match[0], index: match.index })) throw new Error(`${path} contains unexpected remote origin: ${match[0]}`);
    }
  }

  if (totalBytes > 50 * 1024 * 1024) throw new Error(`Artifact exceeds the 50 MiB project limit: ${totalBytes} bytes`);

  const withdrawalByKey = new Map(catalogue.withdrawals.map((value) => [`${value.elixirId}@${value.version}`, value]));
  for (const { release, source } of catalogue.cartridges) {
    const withdrawal = withdrawalByKey.get(`${release.elixirId}@${release.version}`);
    const expected = withdrawal ? renderWithdrawalTombstone({ withdrawal, release }) : source;
    const expectedHash = createHash("sha256").update(expected).digest("hex");
    for (const path of [release.canonicalPath, ...release.legacyPaths]) {
      if (hashes[path] !== expectedHash) throw new Error(`Emitted ${release.slug} cartridge differs from canonical bytes or approved tombstone`);
    }
  }

  for (const entry of catalogue.entries.filter(({ lifecycle }) => !["retired", "withdrawn"].includes(lifecycle))) {
    const cartridge = catalogue.cartridges.find(({ release }) => release.elixirId === entry.elixirId && release.version === entry.recommendedVersion);
    const expectedHash = createHash("sha256").update(cartridge.source).digest("hex");
    const path = `downloads/${createCartridgeDownloadName(cartridge.metadata)}`;
    if (hashes[path] !== expectedHash) throw new Error(`Named download for ${entry.slug} differs from canonical cartridge bytes`);
  }

  const expectedIndex = `${JSON.stringify(createPublicCatalogueIndex(catalogue), null, 2)}\n`;
  if (readFileSync(resolve(root, "catalogue-index.json"), "utf8") !== expectedIndex) throw new Error("Public catalogue index differs from validated projection");

  return { fileCount: paths.length, totalBytes, hashes, expectedPaths };
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const artifactDirectory = resolve(process.argv[2] ?? "dist/elixirs-pages");
  const result = auditElixirArtifact({ artifactDirectory });
  process.stdout.write(`Audited ${result.fileCount} allowlisted static files (${result.totalBytes} bytes) at ${artifactDirectory}\n`);
}
