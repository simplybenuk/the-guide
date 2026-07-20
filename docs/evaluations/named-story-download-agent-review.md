# Named Story download independent review

Date: 2026-07-20
Task: F06 — Make download URL basenames match story filenames
Verdict: **READY FOR HUMAN TESTING**

## Findings

No blocking or should-fix finding. The build derives each active download path
from validated title and version metadata, rejects normalized filename
collisions, restricts output to the audited artifact root, and emits the same
bytes used by the canonical cartridge. Immutable canonical and legacy
`elixir.md` URLs remain present. Retired and withdrawn entries receive no named
download artifact.

## Validation evidence

- Main development environment: `npm run validate` passed lint, typecheck, 18
  Vitest files / 124 tests, a deterministic 142-file / 40,669,833-byte build
  audit, and all 12 mobile Chromium journeys.
- Independent review environment: 25 focused tests, deterministic build/audit,
  `git diff --check`, all 11 active download hashes, and retired-entry exclusion
  passed. Git subprocess and local-port checks were sandbox-blocked there; the
  complete main-environment run supplies those results.

Human testing should spot-check a straightforward title and a punctuation-heavy
title, confirming the saved filename includes the normalized title and version.
