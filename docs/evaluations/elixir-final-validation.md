# Elixir cabinet final validation

Date: 2026-07-18

Status: **NOT READY FOR HUMAN TESTING**

## Gate result

The locally executable implementation and validation work is complete. The
iteration cannot be handed to a human for output testing because FR-11.3 and
acceptance criterion 20 require complete live evidence from at least two
representative harness classes. Codex supplies experimental coding-agent
evidence only. ChatGPT consumer evaluation is blocked by the headless remote
environment and has zero runs; it is not marked compatible or passed.

## Validation evidence

- `npm run validate` passed on 2026-07-18: lint, strict TypeScript checking, 24
  Vitest files with 122 tests, the hosted Next.js production build, the
  deterministic static Elixir build, 10 hosted Playwright journeys, and 7
  static-cabinet Playwright journeys.
- `npm run audit:elixirs` passed: the artifact contains exactly 14 allowlisted
  static files totaling 6,160,225 bytes.
- Cabinet browser coverage verifies root and `/the-guide/` subpath operation,
  320 CSS pixels, 200% text, keyboard operation, reduced motion, clipboard
  denial fallback, exact canonical copy/handoff behavior, no-JavaScript source
  and download access, same-origin-only requests, and empty local/session
  storage.
- Artifact and workflow tests reject server bundles, API routes, runtime
  configuration, secrets, unexpected files, deployment from pull requests, and
  non-manual deployment triggers.
- No GitHub Pages deployment, public release, commit, or push was performed.

## Acceptance assessment

Acceptance criteria 1–19 have local automated, artifact, and/or completed Codex
evidence appropriate to their scope. Criterion 20 is blocked: although full
local validation passes, independent readiness cannot pass until the required
second live harness class exists.

Independent whole-iteration review found no additional blocking or should-fix
findings, confirmed acceptance criteria 1–19 are materially satisfied, and
returned `NOT READY FOR HUMAN TESTING` with FR-11.3 / criterion 20 as the sole
blocker.

The completed Codex matrix covers all 14 cases for Signal, Mystery, and Story at
medium reasoning (42 actor cases) plus four selected lower-reasoning comparisons
per cartridge (12 actor cases). All completed cases passed and emitted no
gameplay tool event. The partial lower-reasoning records remain `untested` by
design because ten cases in each were not run. Raw actor replies were evaluated
transiently and were not persisted; same-model judging is therefore not
independently replayable and remains a residual limitation of this experimental
single-class evidence.

## Resume condition

Run the same versioned fixture matrix in an available consumer conversational
assistant or local/personal-agent harness, persist only the defined redacted
evidence, derive compatibility fail-closed, and repeat independent review. An
authenticated ChatGPT browser session is one valid route, but this record does
not require or imply that ChatGPT is the only possible second class.
