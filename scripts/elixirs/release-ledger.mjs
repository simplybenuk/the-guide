import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";

import { compareReleaseLedgers, compareWithdrawalLedgers, releasesDocumentSchema, withdrawalsDocumentSchema } from "./catalogue.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const approvedBootstrapRevision = "869bcbd12639fae71b56d1b684e9fe9e9b017c53";

const canonicalHash = (document) => createHash("sha256").update(JSON.stringify(document)).digest("hex");

export const auditReleaseLedgerAgainstGit = ({
  baseRevision,
  bootstrapLedgerSha256,
  approvedWithdrawalsSha256,
  candidateDocument,
  candidateWithdrawalsDocument,
  root = repositoryRoot,
} = {}) => {
  if (!/^[0-9a-f]{40}$/.test(baseRevision ?? "")) throw new Error("Protected base revision must be an explicit 40-character lowercase commit SHA");
  const resolvedBase = execFileSync("git", ["rev-parse", "--verify", `${baseRevision}^{commit}`], { cwd: root, encoding: "utf8" }).trim();
  if (resolvedBase !== baseRevision) throw new Error("Protected base revision did not resolve exactly");
  const ancestry = spawnSync("git", ["merge-base", "--is-ancestor", baseRevision, "HEAD"], { cwd: root, encoding: "utf8" });
  if (ancestry.status !== 0) throw new Error("Protected base revision must be an ancestor of the candidate HEAD");

  const candidate = releasesDocumentSchema.parse(candidateDocument ?? JSON.parse(readFileSync(resolve(root, "content/catalogue/releases.json"), "utf8")));
  const candidateWithdrawals = withdrawalsDocumentSchema.parse(candidateWithdrawalsDocument ?? JSON.parse(readFileSync(resolve(root, "content/catalogue/withdrawals.json"), "utf8")));
  if (!/^[0-9a-f]{64}$/.test(approvedWithdrawalsSha256 ?? "")) throw new Error("Withdrawal publication requires an externally controlled 64-character ledger SHA-256");
  if (canonicalHash(candidateWithdrawals) !== approvedWithdrawalsSha256) throw new Error("Candidate withdrawal ledger differs from the externally approved ledger");
  let baseText;
  try {
    baseText = execFileSync("git", ["show", `${baseRevision}:content/catalogue/releases.json`], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch {
    if (baseRevision !== approvedBootstrapRevision) throw new Error("Protected base has no release ledger; bootstrap is allowed only from the approved pre-catalogue revision");
    if (!/^[0-9a-f]{64}$/.test(bootstrapLedgerSha256 ?? "")) throw new Error("Bootstrap requires an externally controlled 64-character ledger SHA-256");
    if (canonicalHash(candidate) !== bootstrapLedgerSha256) throw new Error("Candidate release ledger differs from the externally approved bootstrap ledger");
    const withdrawals = compareWithdrawalLedgers({ schemaVersion: "1.0.0", withdrawals: [] }, candidateWithdrawals);
    return Object.freeze({ baseRevision, bootstrapped: true, retained: 0, appended: candidate.releases.length, withdrawals });
  }

  const comparison = compareReleaseLedgers(JSON.parse(baseText), candidate);
  let baseWithdrawals;
  try {
    baseWithdrawals = JSON.parse(execFileSync("git", ["show", `${baseRevision}:content/catalogue/withdrawals.json`], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
  } catch {
    throw new Error("Protected base release ledger exists without a withdrawal ledger");
  }
  const withdrawals = compareWithdrawalLedgers(baseWithdrawals, candidateWithdrawals);
  return Object.freeze({ baseRevision, bootstrapped: false, ...comparison, withdrawals });
};

const baseArgument = process.argv.find((value) => value.startsWith("--base-revision="))?.split("=")[1];
const bootstrapHashArgument = process.argv.find((value) => value.startsWith("--bootstrap-ledger-sha256="))?.split("=")[1];
const approvedWithdrawalsHashArgument = process.argv.find((value) => value.startsWith("--approved-withdrawals-sha256="))?.split("=")[1];
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = auditReleaseLedgerAgainstGit({ baseRevision: baseArgument, bootstrapLedgerSha256: bootstrapHashArgument, approvedWithdrawalsSha256: approvedWithdrawalsHashArgument });
  process.stdout.write(`Release ledger retained ${result.retained} and appended ${result.appended}${result.bootstrapped ? " from the approved bootstrap" : ""}; withdrawal ledger retained ${result.withdrawals.retained} and appended ${result.withdrawals.appended}.\n`);
}
