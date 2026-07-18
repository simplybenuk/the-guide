# Elixir-first development plan

Source specifications:

- `docs/specs/elixir-cartridge-and-first-cabinet.md`
- `docs/specs/elixir-first-repository-pivot.md`
- `docs/specs/chatgpt-first-elixir-delivery.md`

## Status

**NOT READY FOR HUMAN TESTING**

The Elixir cabinet is the sole active product direction. The former hosted
prototype is preserved at `hosted-prototype-final` and is being removed from the
active tree under the approved repository-pivot specification.

## Active

- [ ] **D06 — Publish the authorized GitHub Pages alpha**
  - Add the owner-approved personal, non-commercial alpha terms to the
    repository and audited artifact.
  - Publish the reviewed delivery scope through a draft PR, merge with explicit
    authority, run the main-only manual Pages workflow, and verify the live
    cabinet before starting ChatGPT evidence collection.

## Waiting on external evidence

- [ ] **E07 — Complete a second live harness class**
  - Codex evidence supports only the experimental `coding_agent` label.
  - ChatGPT browser evaluation is environment-blocked with zero runs and is not
    a compatibility pass.
  - Complete the versioned fixture matrix in one consumer or personal-agent
    harness, derive compatibility fail-closed, and repeat independent review.

## Backlog

- Define and develop the owner-proposed fourth immersive cartridge through a
  separately approved cartridge specification.
- Human-test premise comprehension, cartridge differentiation, drinking and
  return, response relevance, stop behavior, and clean role release after the
  compatibility gate is satisfied.

## Completed

- [x] **D05 — Independent ChatGPT-first delivery review** (2026-07-18)
  - Initial review returned one blocking audit gap and two should-fix contract
    gaps; development tightened remote-origin/collector rejection, shared strict
    browser/Node ID and timestamp validation, and explicit time-windowed
    acquisition aggregation.
  - Re-review independently reran `npm run validate` and `git diff --check`,
    found no remaining blocking or should-fix implementation issue, and returned
    **NOT READY FOR HUMAN TESTING** solely because ChatGPT remains at zero live
    runs and `untested`.
  - Detailed evidence is in
    `docs/evaluations/chatgpt-first-delivery-review.md`.

- [x] **D01–D04 — Implement and validate ChatGPT-first delivery** (2026-07-18)
  - Added strict event contract v1, deterministic browser runtime generation,
    local in-page dispatch, rejection coverage, and acquisition-action fixtures.
  - Made **Copy for ChatGPT** the dominant handoff while preserving immutable
    URL, Markdown, complete-text, accessible denial, and no-JavaScript paths.
  - Artifact audit now allowlists 15 static files and rejects transmission,
    analytics, persistence, public logging, server, secret, and unexpected-file
    markers; no cartridge, covenant, artwork, or versioned behavior changed.
  - `npm run validate` passed after independent-review fixes: lint, strict
    typecheck, 9 Vitest files with 51 tests, deterministic
    15-file/6,167,559-byte artifact audit, and all 8
    cabinet browser journeys.
  - Visual inspection passed using the Playwright fallback because the T3
    collaborative preview explicitly had no automation host. ChatGPT remains
    environment-blocked with zero runs and no compatibility claim.
  - Changes are uncommitted; no deployment, publication, release, domain, tag,
    workflow trigger, push, or live analytics collection occurred.

- [x] **A04 — Validate, independently review, and publish the cleanup PR** (2026-07-18)
  - Clean `npm ci` installed 159 packages with zero audit vulnerabilities.
  - `npm run validate` passed: lint, strict typecheck, 42 Elixir tests, deterministic 14-file/6,160,225-byte artifact audit, and all 7 cabinet browser journeys.
  - `git diff --check`, local/remote recovery-tag resolution, framework-dependency inventory, no-artifact `npm start`, and cartridge/artwork immutability checks passed.
  - Independent review found no blocking or should-fix cleanup finding and declared the work ready for human cleanup-PR review.
  - Overall product status remains **NOT READY FOR HUMAN TESTING** solely because E07 still requires a second complete live harness class; ChatGPT remains environment-blocked and unpassed.

- [x] **A03 — Remove the hosted runtime** (2026-07-18)
  - Removed hosted source, APIs, browser archive, provider configuration, pixel/audio assets, hosted tests, environment template, and Next.js configuration.
  - Removed Next.js, React, React DOM, hosted type packages, and 235 transitive packages; the active dependency tree is Elixir-only and reports no audit vulnerability.
  - Verified all three canonical cartridge and artwork SHA-256 hashes remain identical to the preserved `27a1de7` snapshot.
- [x] **A02 — Make Elixirs the default toolchain** (2026-07-18)
  - `npm start` now builds, audits, and serves the cabinet; `npm run build`, `npm run test:e2e`, and `npm run validate` target the active Elixir product.
  - Replaced Next.js-specific lint, typecheck, Vitest, and Playwright configuration with cabinet-focused equivalents.
  - Verified a no-artifact `npm start` rebuilds the 14-file cabinet, passes audit, serves the root page, and prints the required unauthenticated all-interface warning.
- [x] **A01 — Establish archive and Elixir-first documentation** (2026-07-18)
  - Added the compact recovery index for `hosted-prototype-final` / `27a1de7` and safe branch/worktree recovery.
  - Rewrote overview, product, architecture, context, adapter, and planning sources around Elixirs as the sole active direction.
  - Removed hosted-only decisions, discovery, reviews, specifications, UX, and top-level concept documents from active locations; they remain available at the tagged snapshot.

- [x] Elixir cartridge/cabinet tasks E01–E06 and local E08 validation
  (2026-07-18). Detailed evidence remains in
  `docs/evaluations/elixir-final-validation.md`.
- [x] Preserve final hosted/cabinet coexistence snapshot as
  `hosted-prototype-final` at `27a1de7` (2026-07-18).
