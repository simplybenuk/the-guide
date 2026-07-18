import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const expectedPaths = [
  ".nojekyll",
  "assets/cartridges/manifest.json",
  "assets/cartridges/mystery.png",
  "assets/cartridges/signal.png",
  "assets/cartridges/story.png",
  "cabinet.js",
  "cartridges/mystery/0.1.0/elixir.md",
  "cartridges/signal/0.1.0/elixir.md",
  "cartridges/story/0.1.0/elixir.md",
  "elixirs/mystery/index.html",
  "elixirs/signal/index.html",
  "elixirs/story/index.html",
  "index.html",
  "styles.css",
];

const textExtensions = /\.(?:css|html|js|json|md)$/;
const forbiddenText = [
  { label: "Next.js runtime", pattern: /\/_next\// },
  { label: "application API", pattern: /\/api\/(?:health|expedition)/ },
  { label: "runtime environment access", pattern: /process\.env|GUIDE_PROVIDER_/ },
  { label: "browser persistence", pattern: /localStorage|indexedDB/ },
  { label: "private key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { label: "GitHub credential", pattern: /(?:gh[pousr]_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{60,255})/ },
  { label: "OpenAI credential", pattern: /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/ },
  { label: "AWS access key", pattern: /(?:AKIA|ASIA)[A-Z0-9]{16}/ },
  { label: "Google API key", pattern: /AIza[A-Za-z0-9_-]{35}/ },
  { label: "Slack credential", pattern: /xox[baprs]-[A-Za-z0-9-]{20,}/ },
  { label: "bearer credential", pattern: /Authorization\s*:\s*Bearer\s+[A-Za-z0-9._~+/-]{20,}/i },
  {
    label: "assigned credential",
    pattern: /(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][^"'\r\n]{12,}["']/i,
  },
  { label: "local absolute path", pattern: /(?:\/home\/|\/root\/|[A-Z]:\\Users\\)/ },
];

const walk = (root, directory = root) =>
  readdirSync(directory).flatMap((name) => {
    const path = resolve(directory, name);
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) throw new Error(`Artifact contains symbolic link: ${relative(root, path)}`);
    if (stat.isDirectory()) return walk(root, path);
    if (!stat.isFile()) throw new Error(`Artifact contains unsupported entry: ${relative(root, path)}`);
    return [relative(root, path).split(sep).join("/")];
  });

export const auditElixirArtifact = ({ artifactDirectory }) => {
  const root = resolve(artifactDirectory);
  const paths = walk(root).sort();
  if (JSON.stringify(paths) !== JSON.stringify(expectedPaths)) {
    const unexpected = paths.filter((path) => !expectedPaths.includes(path));
    const missing = expectedPaths.filter((path) => !paths.includes(path));
    throw new Error(
      `Artifact allowlist mismatch. Unexpected: ${unexpected.join(", ") || "none"}. Missing: ${missing.join(", ") || "none"}.`,
    );
  }

  const noJekyll = readFileSync(resolve(root, ".nojekyll"));
  if (noJekyll.length !== 0) throw new Error(".nojekyll must be an empty marker file");

  let totalBytes = 0;
  const hashes = {};
  for (const path of paths) {
    const contents = readFileSync(resolve(root, path));
    totalBytes += contents.length;
    hashes[path] = createHash("sha256").update(contents).digest("hex");
    if (textExtensions.test(path)) {
      const text = contents.toString("utf8");
      for (const forbidden of forbiddenText) {
        if (forbidden.pattern.test(text)) {
          throw new Error(`${path} contains forbidden ${forbidden.label} content`);
        }
      }
    }
  }

  if (totalBytes > 25 * 1024 * 1024) {
    throw new Error(`Artifact exceeds the 25 MiB project limit: ${totalBytes} bytes`);
  }

  for (const slug of ["signal", "mystery", "story"]) {
    const canonical = readFileSync(resolve(process.cwd(), `content/elixirs/${slug}.md`));
    const emittedPath = `cartridges/${slug}/0.1.0/elixir.md`;
    const canonicalHash = createHash("sha256").update(canonical).digest("hex");
    if (hashes[emittedPath] !== canonicalHash) {
      throw new Error(`Emitted ${slug} cartridge differs from canonical bytes`);
    }
  }

  return { fileCount: paths.length, totalBytes, hashes };
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const artifactDirectory = resolve(process.argv[2] ?? "dist/elixirs-pages");
  const result = auditElixirArtifact({ artifactDirectory });
  process.stdout.write(
    `Audited ${result.fileCount} allowlisted static files (${result.totalBytes} bytes) at ${artifactDirectory}\n`,
  );
}
