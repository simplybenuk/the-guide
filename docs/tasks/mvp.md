# Elixir-first development plan

Source specifications:

- `docs/specs/elixir-cartridge-and-first-cabinet.md`
- `docs/specs/elixir-first-repository-pivot.md`
- `docs/specs/chatgpt-first-elixir-delivery.md`
- `docs/specs/elixir-use-without-installing-delivery.md`
- `docs/specs/elixir-hosting-and-catalogue.md`
- `docs/specs/story-elixir-authoring-and-chat-presentation.md`

## Status

**NOT READY FOR HUMAN TESTING**

The Elixir cabinet is the sole active product direction. The former hosted
prototype is preserved at `hosted-prototype-final` and is being removed from the
active tree under the approved repository-pivot specification.

## Active

- [ ] **S01 — Define Story authoring and metadata contracts**
  - Add strict, optional Story-specific metadata that leaves Signal, Mystery,
    and immutable Story `0.1.0` behaviour unchanged.
  - Define and validate the transparent cartridge sections for interaction
    moments, beats, state, branches, endings, presentation, and evaluation.
  - Add focused passing and fail-closed fixtures; then run required validation
    and hand the bounded task to independent agent review.

The H09–H11 catalogue refinement is ready for owner output testing; overall
gameplay remains gated by E07 below. The approved authored-Story iteration is
local-only until its separate review, evidence, and publication gates pass.

## Hosting and catalogue backlog

No approved hosting/catalogue implementation task remains after H11.

## Waiting on external evidence

- [ ] **E07 — Complete a second live harness class**
  - Codex evidence supports only the experimental `coding_agent` label.
  - One owner-observed ChatGPT attempt failed Pages URL retrieval in the mobile
    app on a Plus account using Instant mode. The underlying model identifier
    was not exposed, and it is not a complete compatibility run.
  - Complete the versioned fixture matrix in one consumer or personal-agent
    harness, derive compatibility fail-closed, and repeat independent review.

## Backlog

- [ ] **S02 — Add Story chat presentation validation**
- [ ] **S03 — Author The Regency Ball dramatic score and artwork**
- [ ] **S04 — Implement narrative and interaction evaluation**
- [ ] **S05 — Extend catalogue discovery**
- [ ] **S06 — Prepare local release and supersession evidence**
- [ ] **S07 — Independently review and, if separately authorized, evaluate live
  harnesses**
- Human-test premise comprehension, cartridge differentiation, drinking and
  return, response relevance, stop behavior, and clean role release after the
  compatibility gate is satisfied.

## Completed

- [x] **H11 — Validate and independently review collection-led discovery**
  (2026-07-19)
  - Full `npm run validate` passed: lint, strict typecheck, 13 Vitest files with
    79 tests, deterministic build, exact 34-file/6,333,353-byte artifact audit,
    and all 13 mobile Chromium browser journeys.
  - Independent review repeated focused and full validation, measured the
    500-entry browser fixture at 2.5 ms search and 1.4 ms filtering, passed
    `git diff --check`, and found no blocking or should-fix refinement finding.
  - Direct desktop and Pixel-sized Playwright evidence confirms the editorial
    spotlight, compact shelves, next-card mobile cues, dedicated browse view,
    and contained page width. T3 preview was unavailable; the installed
    fallback skill also lacked its executable.
  - Catalogue refinement is **READY FOR HUMAN TESTING**. Human focus is shelf
    repetition/editorial feel with three items, mobile shelf cues, `/browse/`
    discoverability, and whether compact cards provide enough selection detail.
  - Changes remain uncommitted and undeployed. E07 remains a separate overall
    gameplay-compatibility gate.

- [x] **H09–H10 — Implement collection-led discovery and bounded shelves**
  (2026-07-19)
  - Replaced the exhaustive root grid with one deterministic editorial
    spotlight and three collection-backed horizontal shelves; no root search or
    complete catalogue feed remains.
  - Added `/browse/` as the complete static first page for local search,
    filtering, sorting, 24-item progressive results, and static pagination.
  - Replaced listing fact grids with compact artwork-led cards containing a
    promise, exactly three controlled fit signals, and factual status; complete
    demands and trust evidence remain on detail/version pages.
  - Shelf controls enhance native touch/trackpad overflow without autoplay,
    looping, focus traps, persistence, remote code, or a carousel dependency;
    no-JavaScript item, collection, browse, detail, and delivery links remain.
  - Production root rendering is collection-bounded. Both 100- and 500-entry
    production-shaped fixtures render one spotlight plus only three shelf cards,
    while `/browse/` retains every entry and the 500-entry interaction timings
    remain below one animation frame.
  - Changes remain uncommitted and undeployed. Cartridge/artwork bytes, delivery
    event `1.1.0`, compatibility, privacy, and publication authority are
    unchanged.

- [x] **H08 — Independent review and human handoff** (2026-07-19)
  - Six independent review passes progressively exposed and resolved path,
    protected-ledger, version-lifecycle, withdrawal-recovery, tombstone-link,
    scale, evidence-navigation, and artwork-provenance defects.
  - Final independent review found no blocking or should-fix catalogue finding
    and returned **READY FOR HUMAN TESTING** for this workstream.
  - Final validation passed 78 unit tests, the exact 33-file/6,323,373-byte
    production audit, all 13 browser journeys, protected release/withdrawal
    ledger probes, archive-provenance verification, and `git diff --check`.
  - Changes remain uncommitted and undeployed. The three required external
    publication variables remain absent and fail closed; E07 remains separate.

- [x] **H02–H07 — Implement and validate static hosting and catalogue** (2026-07-18)
  - Seeded strict first-party publisher, release ledger, catalogue, taxonomy,
    three editorial collections, and empty withdrawal records without changing
    cartridge, covenant, or artwork bytes.
  - Refactored build/audit from hard-coded cartridges to a cross-validated
    registry-derived 33-file artifact. Each release emits byte-identical
    publisher-qualified and permanent legacy paths; deterministic tombstone
    fixtures cover explicitly authorized withdrawal.
  - Added metadata-only public index, static collection and immutable-version
    pages, local deterministic search, OR-within/AND-across filters, controlled
    share URLs, accessible clearing/no-result states, factual trust records,
    and explainable related items. Search remains in page memory.
  - Independent reviews exposed artwork traversal/symlink/reference gaps,
    candidate-base authority, mutable withdrawal history, contradictory
    successor state, entry-wide lifecycle, non-navigable evidence, and
    scale-helper/metric gaps. Development remediated each with strict realpath
    and provenance checks, fail-closed external release/withdrawal anchors,
    release-version lifecycle, path-labelled host-portable exact-version and
    catalogue-fallback tombstone links, navigable audited evidence, and a
    bounded 24-card renderer.
  - The 500-entry production-shaped fixture validates and builds 500 strict
    releases through the real stack: 21 pages, 3,030 files, 18,562,233 bytes,
    487.7 ms validation, 1,230.3 ms build, 1,113.4 ms audit, 3.3 ms browser
    search, and 2.3 ms browser filtering. Synthetic content is excluded from production.
  - Full post-remediation validation passed: lint, strict typecheck, 13 Vitest
    files with 78 tests, exact 33-file/6,323,373-byte audit, and all 13 mobile/
    root/subpath/no-JavaScript/scale Playwright journeys. Protected-base audit,
    `git diff --check`, and exact cartridge/artwork SHA-256 checks passed. The
    three external ledger variables remain an intentionally unconfigured,
    fail-closed publication precondition outside development authority.
  - T3 collaborative preview reported no available automation host; Playwright
    provided the approved browser fallback. Changes remain uncommitted; no
    push, PR, deployment, publication, analytics, backend, account, creator
    intake, or compatibility change occurred.

- [x] **H01 — Freeze baseline and define catalogue contracts** (2026-07-18)
  - Added strict publisher, release, catalogue, taxonomy, collection, and
    withdrawal records bound to the exact current cartridge/artwork bytes,
    provenance, review, and compatibility evidence.
  - Added append-only ledger comparison, public-index projection, deterministic
    local search/filter/related rules, withdrawal tombstone rendering, and a
    500-entry metadata fixture.
  - Focused validation passed: 6 catalogue contract tests. Changes remain
    uncommitted; no publication or external data boundary occurred.

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
