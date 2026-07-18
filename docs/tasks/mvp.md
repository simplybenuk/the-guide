# Elixir-first development plan

Source specifications:

- `docs/specs/elixir-cartridge-and-first-cabinet.md`
- `docs/specs/elixir-first-repository-pivot.md`
- `docs/specs/chatgpt-first-elixir-delivery.md`
- `docs/specs/elixir-use-without-installing-delivery.md`

## Status

**NOT READY FOR HUMAN TESTING**

The Elixir cabinet is the sole active product direction. The former hosted
prototype is preserved at `hosted-prototype-final` and is being removed from the
active tree under the approved repository-pivot specification.

## Active

No implementation task is active. E07 named ChatGPT evidence is the next gate.

## Waiting on external evidence

- [ ] **E07 — Complete a second live harness class**
  - Codex evidence supports only the experimental `coding_agent` label.
  - One owner-observed ChatGPT attempt failed Pages URL retrieval in the mobile
    app on a Plus account using Instant mode. The underlying model identifier
    was not exposed, and it is not a complete compatibility run.
  - Complete the versioned fixture matrix in one consumer or personal-agent
    harness, derive compatibility fail-closed, and repeat independent review.

## Backlog

- Define and develop the owner-proposed fourth immersive cartridge through a
  separately approved cartridge specification.
- Human-test premise comprehension, cartridge differentiation, drinking and
  return, response relevance, stop behavior, and clean role release after the
  compatibility gate is satisfied.

## Completed

- [x] **U05 — Independent review and handoff** (2026-07-18)
  - Independent review found two initial blockers, two should-fix gaps, and
    further active-resource/attribute variants through adversarial probes.
  - Development resolved every finding and repeated the full suite. Final
    independent validation passed 58 unit tests, the exact
    16-file/6,205,296-byte audit, all 9 browser journeys, `git diff --check`,
    and canonical cartridge/covenant/artwork immutability checks.
  - No blocking or should-fix implementation finding remains. Overall status is
    **NOT READY FOR HUMAN TESTING** solely because E07 lacks a complete second
    named live harness class.
  - Detailed evidence is in
    `docs/evaluations/elixir-use-without-installing-review.md`.

- [x] **U01–U04 — Implement and validate use-without-installing delivery** (2026-07-18)
  - Added deterministic self-contained and resolver envelopes derived from
    validated canonical bytes with exact ID/version/publisher, UTF-8 byte count,
    SHA-256, reserved delimiters, final-line-feed validation, and commit-pinned
    first-party GitHub source URLs.
  - Replaced the URL-dependent primary action with a complete **Copy for
    ChatGPT** payload; retained an experimental agent resolver, raw copy,
    download, versioned URL, visible source, accessible clipboard recovery, and
    no-JavaScript paths. No package command, installation, MCP, or runtime fetch
    was introduced.
  - Advanced the strict local-only event contract to `1.1.0` with separate
    self-contained and resolver methods, preserved exact half-open-window
    acquisition semantics, and added distinct denied, unavailable, and failed
    clipboard results without transmission or persistence.
  - The Pages workflow now injects the checked-out commit SHA. The artifact
    audit permits only exact commit-pinned first-party raw/blob source literals
    and rejects moving/unapproved GitHub sources and package execution commands.
  - `npm run validate` passed after independent-review fixes: lint, strict
    typecheck, 10 Vitest files with 58 tests, deterministic
    16-file/6,205,296-byte artifact audit, and all 9
    Playwright journeys. Final `git diff --check` also passed.
  - Initial independent review found two blockers and two should-fix gaps.
    Development reconciled current overview evidence assertions, restricted
    resolver input to the exact cartridge path, rejected allowlisted source URLs
    in active remote-resource contexts, distinguished visible denied/unavailable/
    failed clipboard feedback, and added the requested negative fixtures.
  - A second adversarial review found active `srcset`/`object`/`embed` variants.
    The audit now permits pinned source literals only inside the labelled
    resolver textarea and rejects the same URL everywhere else, independently
    of the surrounding HTML attribute or tag.
  - Final hardening requires the exact generated resolver-textarea opening tag,
    preventing lookalike attributes or attribute-value token spoofing from
    broadening the pinned-URL allowlist.
  - Mobile visual inspection passed using the Playwright screenshot fallback;
    the T3 collaborative preview explicitly had no automation host. Canonical
    cartridge, covenant, artwork, and published gameplay sources are unchanged.
  - Changes are uncommitted. No push, PR, deployment, release, tag, npm
    publication, analytics collection, MCP service, or compatibility change
    occurred. Named ChatGPT testing remains external evidence.

- [x] **D06 — Publish the authorized GitHub Pages alpha** (2026-07-18)
  - Added the owner-approved personal, non-commercial alpha terms to the
    repository and audited artifact.
  - Merged PR `#5` as commit `c4ee2f18b5e0b5d9c62ed29d9d7263665b142096`,
    enabled GitHub Pages in custom-workflow mode, and completed manual workflow
    run `29661850789` successfully.
  - Verified `https://simplybenuk.github.io/the-guide/` and all 15 served files
    byte-for-byte against the reviewed artifact. A live headless-browser check
    confirmed the ChatGPT handoff URL and consent instruction, one local
    delivery event, no external requests, and no console errors.
  - Publication does not enable analytics collection or establish ChatGPT
    compatibility; ChatGPT remains at zero live runs.

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
  - Artifact audit now allowlists 16 static files and rejects transmission,
    analytics, persistence, public logging, server, secret, and unexpected-file
    markers; no cartridge, covenant, artwork, or versioned behavior changed.
  - `npm run validate` passed after independent-review fixes: lint, strict
    typecheck, 9 Vitest files with 51 tests, deterministic
    16-file/6,168,560-byte artifact audit, and all 8
    cabinet browser journeys.
  - Visual inspection passed using the Playwright fallback because the T3
    collaborative preview explicitly had no automation host. ChatGPT remains
    environment-blocked with zero runs and no compatibility claim.
  - At implementation handoff, no deployment or live analytics collection had
    occurred; the separately authorized D06 publication followed review.

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
