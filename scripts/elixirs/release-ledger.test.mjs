import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

import { describe, expect, it } from "vitest";

import { auditReleaseLedgerAgainstGit } from "./release-ledger.mjs";

const root = process.cwd();
const approvedBase = "869bcbd12639fae71b56d1b684e9fe9e9b017c53";
const approvedBootstrapLedgerSha256 = "28aa5dfd287975bfd28ea9312e5a93a28077ebf0b2c8af3c2cf34703c741cdf1";
const approvedWithdrawalsSha256 = "0fe13842971a4bc090532fd5c3ae81013042ad484f274c699ce9d2e05b7c80d3";
const candidate = () => JSON.parse(readFileSync(resolve(root, "content/catalogue/releases.json"), "utf8"));

describe("protected-base release-ledger audit", () => {
  it("accepts only the exact approved initial ledger from the approved pre-ledger revision", () => {
    expect(auditReleaseLedgerAgainstGit({ baseRevision: approvedBase, bootstrapLedgerSha256: approvedBootstrapLedgerSha256, approvedWithdrawalsSha256, candidateDocument: candidate(), root })).toMatchObject({
      baseRevision: approvedBase,
      bootstrapped: true,
      retained: 0,
      appended: 3,
    });
    const changed = candidate();
    changed.releases[0].publishedAt = "2026-07-19";
    expect(() => auditReleaseLedgerAgainstGit({ baseRevision: approvedBase, bootstrapLedgerSha256: approvedBootstrapLedgerSha256, approvedWithdrawalsSha256, candidateDocument: changed, root })).toThrow(/externally approved bootstrap/);
    expect(() => auditReleaseLedgerAgainstGit({ baseRevision: approvedBase, approvedWithdrawalsSha256, candidateDocument: candidate(), root })).toThrow(/externally controlled/);
    expect(() => auditReleaseLedgerAgainstGit({ baseRevision: approvedBase, bootstrapLedgerSha256: approvedBootstrapLedgerSha256, candidateDocument: candidate(), root })).toThrow(/Withdrawal publication requires/);
    const removedApproval = { schemaVersion: "1.0.0", withdrawals: [{ elixirId: "the-guide.elixir.signal", version: "0.1.0" }] };
    expect(() => auditReleaseLedgerAgainstGit({ baseRevision: approvedBase, bootstrapLedgerSha256: approvedBootstrapLedgerSha256, approvedWithdrawalsSha256, candidateDocument: candidate(), candidateWithdrawalsDocument: removedApproval, root })).toThrow();
  });

  it("rejects absent, abbreviated, false, and non-ancestor base selection", () => {
    expect(() => auditReleaseLedgerAgainstGit({ candidateDocument: candidate(), root })).toThrow(/explicit 40-character/);
    expect(() => auditReleaseLedgerAgainstGit({ baseRevision: "869bcbd", candidateDocument: candidate(), root })).toThrow(/explicit 40-character/);
    const earlier = execFileSync("git", ["rev-parse", `${approvedBase}^`], { cwd: root, encoding: "utf8" }).trim();
    expect(() => auditReleaseLedgerAgainstGit({ baseRevision: earlier, bootstrapLedgerSha256: approvedBootstrapLedgerSha256, approvedWithdrawalsSha256, candidateDocument: candidate(), root })).toThrow(/bootstrap is allowed only/);
    expect(() => auditReleaseLedgerAgainstGit({ baseRevision: "f".repeat(40), candidateDocument: candidate(), root })).toThrow();
  });

  it("rejects ordinary withdrawal removal even when the candidate approval hash matches", () => {
    const temporaryRoot = mkdtempSync(join(tmpdir(), "guide-withdrawal-ledger-git-"));
    try {
      mkdirSync(resolve(temporaryRoot, "content/catalogue"), { recursive: true });
      const releaseDocument = candidate();
      const release = releaseDocument.releases[0];
      const withdrawalDocument = {
        schemaVersion: "1.0.0",
        withdrawals: [{
          elixirId: release.elixirId,
          version: release.version,
          withdrawnAt: "2026-07-19",
          reason: "safety",
          publicExplanation: "Withdrawn after review.",
          authorizedBy: "The Guide",
          successor: null,
          originalBytes: release.bytes,
          originalSha256: release.sha256,
          tombstoneSha256: "0".repeat(64),
        }],
      };
      writeFileSync(resolve(temporaryRoot, "content/catalogue/releases.json"), `${JSON.stringify(releaseDocument, null, 2)}\n`);
      writeFileSync(resolve(temporaryRoot, "content/catalogue/withdrawals.json"), `${JSON.stringify(withdrawalDocument, null, 2)}\n`);
      execFileSync("git", ["init", "-q"], { cwd: temporaryRoot });
      execFileSync("git", ["config", "user.email", "fixture@example.invalid"], { cwd: temporaryRoot });
      execFileSync("git", ["config", "user.name", "Fixture"], { cwd: temporaryRoot });
      execFileSync("git", ["add", "content/catalogue/releases.json", "content/catalogue/withdrawals.json"], { cwd: temporaryRoot });
      execFileSync("git", ["commit", "-qm", "reviewed ledgers"], { cwd: temporaryRoot });
      const baseRevision = execFileSync("git", ["rev-parse", "HEAD"], { cwd: temporaryRoot, encoding: "utf8" }).trim();
      const removed = { schemaVersion: "1.0.0", withdrawals: [] };
      const removedHash = createHash("sha256").update(JSON.stringify(removed)).digest("hex");
      expect(() => auditReleaseLedgerAgainstGit({ baseRevision, approvedWithdrawalsSha256: removedHash, candidateDocument: releaseDocument, candidateWithdrawalsDocument: removed, root: temporaryRoot })).toThrow(/cannot be deleted/);
    } finally {
      rmSync(temporaryRoot, { recursive: true, force: true });
    }
  });
});
