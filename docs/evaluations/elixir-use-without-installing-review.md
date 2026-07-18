# Elixir “Use Without Installing” — independent review

Date: 2026-07-18

Status: **NOT READY FOR HUMAN TESTING**

## Objective and boundary

This review assessed the completed U01–U04 implementation against the approved
`docs/specs/elixir-use-without-installing-delivery.md`, the project adapter,
architecture, common covenant, U01–U05 plan, complete working-tree diff, and the
focused generator, event, build, audit, browser, and Pages-workflow tests. The
review changed no implementation file.

The intended outcome is a dominant self-contained ChatGPT prompt plus an
experimental, commit-pinned read-only resolver, with exact cartridge integrity,
event contract `1.1.0`, no installation/runtime collection, and fail-closed
external compatibility claims.

## Verdict

The local implementation satisfies the approved specification with no remaining
blocking or should-fix finding. The overall handoff remains **NOT READY FOR HUMAN
TESTING** solely because the pre-existing external evidence gate is unmet: the
observed ChatGPT URL failure is now scoped to the mobile app, Plus account, and
Instant mode, but its underlying model was not exposed and no complete named
consumer-assistant matrix exists.

## Final re-review verdict

No blocking or should-fix implementation finding remains.

The final audit constrains pinned source URLs to the exact generated resolver
textarea opening tag for Signal, Mystery, or Story. The reviewer-discovered
`data-resolver-prompt-extra` and title/attribute-value spoof variants now reject,
as do active-resource, ordinary-textarea, closed-resolver, paragraph, anchor,
and script-JSON contexts. The GitHub privacy URL is separately limited to its
ordinary user-followed anchor context.

## Initial findings and resolution

### Initially blocking

1. **Required validation failure — resolved.** README and
   `repository-pivot.test.mjs` now agree on the honest unnamed owner-observed
   ChatGPT failure wording. The independent full suite passes.

2. **Pinned URL accepted outside inert resolver text — resolved.** The original
   script/image/link/form bypasses, later `srcset`/object/embed variants, and
   exact-attribute lookalikes now reject. Focused probes confirm the clean
   generated resolver remains accepted.

### Initially should-fix

1. **Arbitrary resolver origins/paths — resolved.** `createResolverPrompt` now
   requires the exact slug/version cartridge path. Independent evil-origin,
   mismatched-path, and query-string probes all reject.

2. **Inaccurate clipboard failure feedback — resolved.** Denied, unavailable,
   and unexpected failures now produce distinct accurate live-region text and
   matching coarse events; browser assertions cover unavailable and failed.

### Informational

- Decoded invalid-UTF-8 replacement coverage was added and passes.
- The dominant self-contained payload, experimental resolver hierarchy,
  event-contract `1.1.0` transition, exact embedded-byte checks, relative
  root/subpath behavior, local-only dispatch, and workflow SHA injection are
  otherwise aligned with the approved design.

## Final validation evidence

- Independent `npm run validate`: passed lint, strict typecheck, 10 Vitest
  files with 58 tests, deterministic build, 16-file/6,205,296-byte artifact
  audit, and all 9 Playwright journeys.
- `git diff --check`: passed before and after this review update.
- Focused resolver probes: arbitrary external URL, mismatched relative path,
  and query-bearing path all rejected.
- Focused audit probes: pinned first-party raw URL rejected in image `srcset`,
  object `data`, embed `src`, uppercase active markup, ordinary and lookalike
  textareas, title-token spoofing, and after a closed resolver. Privacy URL text
  and ping duplication also reject. The exact clean 16-file artifact passes.
- Canonical immutability: `git diff --quiet HEAD` passed for the covenant, all
  three cartridges, artwork manifest, and all three artwork files. Their
  SHA-256 values were also recorded during review; no canonical or published
  gameplay source is modified in the working tree.
- No commit, push, PR, deployment, release, tag, npm publication, analytics
  collection, MCP service, or compatibility change was performed by review.

## External evidence and handoff state

The owner observation is useful product feedback but is not formal ChatGPT
evidence. Product, plan, mode, and date are recorded as ChatGPT mobile, Plus,
Instant mode, 2026-07-18; the underlying model was not exposed and the required
transport and behavior matrix has not run. Compatibility is correctly unchanged
and fail-closed.

No further `bwh-development` fix is required from this review. Retain **NOT
READY FOR HUMAN TESTING** until E07 supplies a complete second live harness
class, then repeat the evidence-scoped review. Human testing or deployment must
not be inferred from local copy/retrieval success.

## Context inspected

- `.agents/project-adapter.md`
- `docs/specs/elixir-use-without-installing-delivery.md`
- `docs/tasks/mvp.md`
- `docs/architecture.md`
- `content/elixirs/covenant.md`
- `README.md`
- `.github/workflows/elixirs-pages.yml`
- changed generator, envelope, event, audit, browser source and focused tests
- complete working-tree diff and canonical cartridge/artwork paths
