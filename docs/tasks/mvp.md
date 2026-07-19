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

No local authored-Story implementation task remains. The exact candidate is
ready for owner code/content review; E07 remains a separate external-evidence
gate before formal human output testing or compatibility promotion.

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

- Human-test premise comprehension, cartridge differentiation, drinking and
  return, response relevance, stop behavior, and clean role release after the
  compatibility gate is satisfied.

## Completed

- [x] **S07 — Independently review local implementation** (2026-07-19)
  - Independent review ran four adversarial passes. Development resolved shallow
    score validation, descriptive-only evaluation, candidate artwork/review
    state gaps, prose/score semantic drift, unbound ending costs/callbacks, and
    incoherent crisis/final-commitment combinations.
  - Final review found no remaining local blocking or should-fix issue and
    confirmed the candidate is ready for owner code/content review.
  - Full validation passed 98 tests, the exact 34-file/6,333,568-byte audit, all
    13 browser journeys, immutable published hashes, and `git diff --check`.
  - Verdict remains **NOT READY FOR HUMAN TESTING solely because E07 is
    incomplete and unauthorized**. No external harness run or write occurred.
    Detailed evidence: `docs/evaluations/story-elixir-agent-review.md`.

- [x] **S05 — Extend catalogue discovery** (2026-07-19)
  - Added strict Story genre, theme, shape, social, interaction, choice,
    intensity, and session facets plus spoiler-safe public projection of role,
    participation, endings, replay promise, and session shape.
  - Added a standard accessible Story-experience detail section and local browse
    filters. A candidate-only build replaces generic Story in `start-here` and
    `three-ways-to-play`, then passes the real static build and artifact audit
    without altering production catalogue state.
  - Catalogue, build, artwork, evaluation, content, and lint checks passed all
    35 focused tests before the full validation gate.

- [x] **S06 — Prepare local release and supersession evidence** (2026-07-19)
  - Bound the exact 53,292-byte cartridge and 2,616,876-byte artwork to a strict
    `prepared_not_publishable` record; verified the immutable generic Story
    predecessor and exact successor/collection transition; added fail-closed
    drift tests.
  - Updated the product and architecture descriptions for additive authored
    Story candidates. Recorded local validation and rollback evidence in
    `docs/evaluations/story-elixir-local-validation.md`.
  - Full `npm run validate` passed lint, strict typecheck, 15 Vitest files with
    98 tests, the deterministic 34-file/6,333,568-byte build and audit, and all
    13 mobile Chromium browser journeys. `git diff --check` and all three
    published cartridge digests passed.
  - Changes remain local and uncommitted. Production releases, catalogue,
    collections, withdrawals, and artwork manifest are unchanged; no external
    harness, publication, deployment, or compatibility promotion occurred.

- [x] **S03 — Author The Regency Ball dramatic score and artwork** (2026-07-19)
  - Authored the self-contained schema `1.1.0` cartridge with a fixed fictional
    adult cast, consent/setup, eight beats, three route-specific conversations,
    nine compact state fields, visible reconvergence residue, two crisis
    variants, four deterministic ending families, dance-card recap/memento,
    presentation contract, evaluation cases, and exact release.
  - Generated a distinct original 1536×1024 RGB pixel-art ballroom still life
    with the OpenAI built-in image tool using the existing cartridge art only as
    loose style references. Recorded prompt summary, source, authorship, licence,
    active reference digest, dimensions, and final SHA-256 in provenance.
  - Focused cartridge, content, artwork, and lint checks passed 25 tests. Full
    catalogue validation is intentionally deferred until S05–S06 add the new
    release and recommendation records together; no external publication
    occurred.

- [x] **S04 — Implement narrative and interaction evaluation** (2026-07-19)
  - Added a strict evaluation deck and route matrix bound to the reference
    cartridge, including equivalent speech/action/decision/combined inputs,
    branch replay, reconvergence residue, state repair, safety, and release.
  - Added a deterministic four-ending oracle with public-reckoning overlap
    priority and fail-closed drift tests for beats, route gifts, endings, and
    metadata counts. Extended redacted evaluation identity support for schema
    `1.1.0` without changing existing records.
  - Focused story/evaluation/content checks passed all 18 tests. Changes remain
    local and uncommitted.

- [x] **S02 — Add Story chat presentation validation** (2026-07-19)
  - Added fail-closed authored-source requirements for standalone Narrator,
    Character Name, Your turn, and optional Possible approaches labels; quoted
    dialogue; one interaction focus; plain-text fallback; natural speech/action/
    decision input; and the rule that the model never speaks for the player.
  - Added negative fixtures for every required presentation semantic. Focused
    cartridge/content checks passed 21 tests and the full unit suite passed all
    83 tests across 13 files.
  - Changes remain uncommitted and local. Next priority: S03.

- [x] **S01 — Define Story authoring and metadata contracts** (2026-07-19)
  - Added a strict cartridge schema `1.1.0` for authored Stories with nested
    format, player-role, interaction-mode, choice-presentation, intensity,
    ending, replay, session-shape, and content-note metadata. Existing schema
    `1.0.0` remains strict and rejects the new object, preserving all current
    release behaviour.
  - Added deterministic authored-Story structure validation for twelve ordered,
    non-empty transparent sections and stable labelled interaction, state, beat,
    ending, and evaluation blocks; documented the authoring convention beside
    canonical cartridge sources.
  - Focused validation passed 20 tests across cartridge and current-content
    contracts. Full `npm run validate` passed lint, typecheck, 13 Vitest files
    with 82 tests, the deterministic 34-file/6,333,353-byte build and audit, and
    all 13 mobile Chromium browser journeys. `git diff --check` passed, and the
    Signal, Mystery, and Story SHA-256 digests exactly match the release ledger.
  - Changes remain uncommitted and undeployed. No cartridge, covenant, release
    ledger, artwork, catalogue recommendation, compatibility label, external
    harness, or publication state changed.
  - Next priority: independent S01 review, then S02 chat-presentation validation.

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
