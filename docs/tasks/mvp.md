# First Vertical Slice Development Plan

Source specifications:

- `docs/specs/first-vertical-slice.md`
- `docs/specs/playable-pixel-art-opening.md`
- `docs/specs/ai-led-signal-expedition.md`
- `docs/specs/elixir-cartridge-and-first-cabinet.md`

## Status

**NOT READY FOR HUMAN TESTING**

The first vertical slice and playable pixel-art opening are complete. The AI-led signal expedition remains implemented but awaits external live-provider and human evidence. Local development and validation of the Elixir Cartridge and First Cabinet are complete, including distinct original art for every cartridge. Independent review found acceptance criteria 1–19 materially satisfied; the iteration remains blocked from human output testing solely because a second complete live harness class is unavailable.

## Active

No locally executable Elixir task is active.

## Waiting on external or human evidence

- [ ] **E07 — Run security and cross-harness conformance evaluation**
  - Added a strict transcript-free evidence schema, one synthetic profile, fourteen normal/adversarial cases, game-specific claim probes, and fail-closed compatibility derivation.
  - Added browser evidence that the cabinet makes only same-origin static requests and writes no local or session storage.
  - Owner authorized the recommended ChatGPT + Codex representatives and ordinary provider-side evaluation usage on 2026-07-18.
  - Codex live evidence completed: all 42 medium-reasoning cartridge cases and all 12 selected low-reasoning comparisons passed with zero gameplay tool events; raw replies were not persisted and the unavailable model identifier is recorded honestly.
  - Cartridge metadata now records only `experimental` / `coding_agent` evidence. It does not claim consumer-assistant, ChatGPT, or personal-agent compatibility.
  - ChatGPT consumer evaluation is environment-blocked because this headless remote server cannot attach an authenticated browser; Hermes/OpenClaw remain unavailable.
  - Independent review found the Codex evidence and labels sound but returned **NOT READY FOR HUMAN TESTING** because FR-11.3 still requires a second complete live representative class; same-model judging without replayable raw replies remains an experimental-evidence residual risk.
  - External dependency: complete the same versioned matrix in a consumer or personal-agent harness when an appropriate environment becomes available.

- [ ] **S07 — Validate and prepare whole-iteration review**
  - Full automated, security, simulated-provider, and final independent review evidence is complete.
  - External dependency: configure the five server-only `GUIDE_PROVIDER_*` values, run the redacted live comparison, and complete real-phone human output testing.
  - Final independent review found no code findings but returned **NOT READY FOR HUMAN TESTING** solely because that required live/human evidence is absent.

## Backlog

No remaining locally executable Elixir implementation task follows E08.

## Completed

- [x] **E08 — Validate the whole experiment and prepare independent review** (2026-07-18)
  - Updated the project overview, product brief, and architecture to distinguish the additive static Elixir mode from the hosted prototype without implying publication or readiness.
  - `npm run validate` passed: lint, strict typecheck, 122 unit/integration tests, both production builds, 10 hosted Playwright journeys, and 7 static-cabinet Playwright journeys.
  - `npm run audit:elixirs` passed for exactly 14 allowlisted static files totaling 6,160,225 bytes; browser evidence confirms same-origin-only requests and no local/session storage writes.
  - Independent whole-iteration review found no additional blocking or should-fix findings and found acceptance criteria 1–19 materially satisfied.
  - Final verdict: **NOT READY FOR HUMAN TESTING** solely because FR-11.3 and acceptance criterion 20 require a second complete live consumer or personal-agent harness class.
  - ChatGPT remains environment-blocked with zero runs and no compatibility pass; Codex supports an experimental `coding_agent` label only.
  - No commit, push, GitHub Pages deployment, or public release was performed.

- [x] **E06 — Package the manual GitHub Pages deployment** (2026-07-18)
  - Added a `workflow_dispatch`-only, main-constrained Pages workflow with current reviewed official action majors, a protected `github-pages` environment, and write/OIDC permissions isolated to deployment.
  - Added a deterministic 14-file deployment allowlist, 25 MiB project cap, `.nojekyll`, no-link rule, canonical cartridge-byte checks, and fail-closed scans for server/runtime/storage/local-path/private-key and representative embedded credential forms.
  - Upload is restricted to `dist/elixirs-pages`, explicitly includes hidden `.nojekyll`, retains the artifact for one day, and does not enable Pages automatically.
  - `npm run validate` passed: lint, strict typecheck, 117 unit/integration tests, hosted production build, static cabinet build, 10 hosted-app Playwright journeys, and 7 cabinet journeys; the clean artifact audited at exactly 14 files and 6,159,991 bytes.
  - Independent re-review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings.
  - No workflow was dispatched and no deployment, publication, or external write occurred.
  - Commit status: not committed; project commit authorisation is not documented.
  - Next priority: E07 — Run security and cross-harness conformance evaluation.

- [x] **E05 — Build the static cabinet and cartridge artifact** (2026-07-18)
  - Added a framework-free generator for a standalone static cabinet with complete comparison cards, cartridge detail views, canonical source inspection, identical download/copy paths, and host-relative handoff.
  - Added clear provider/The Guide trust boundaries, GitHub host privacy disclosure, no-account/no-credential flow, and JavaScript-independent source/download fallbacks with copy controls revealed only when functional.
  - Added exact static-tree and canonical-byte tests plus browser coverage at root and `/the-guide/`, on distinct local hosts, at 320px and 200% text, keyboard/reduced-motion states, successful and denied clipboard, and JavaScript-disabled use.
  - Corrected incomplete catalog comparison, handoff wording, dead no-JavaScript controls, and a fixed-origin portability regression through independent review cycles.
  - `npm run validate` passed: lint, strict typecheck, 108 unit/integration tests, hosted production build, static cabinet build, 10 hosted-app Playwright journeys, and 7 cabinet journeys.
  - Independent re-review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings; the collaborative preview host was unavailable, with the same states covered by local browser automation and visual inspection.
  - Commit status: not committed; project commit authorisation is not documented.
  - Next priority: E06 — Package the manual GitHub Pages deployment.

- [x] **E04 — Create the original cartridge artwork** (2026-07-18)
  - Generated three original 1536×1024 pixel-art heroes with a coherent nocturnal cabinet style and distinct non-colour motifs for Signal, Mystery, and Story.
  - Recorded source/method, author, usage terms, generation date, reference asset, prompt summaries, dimensions, hashes, and provenance IDs in the static asset manifest.
  - Added automated PNG signature, dimension, hash uniqueness, metadata/provenance, and accessible-alt validation; manually inspected native 3:2 and aggressive portrait crops.
  - `npm run validate` passed: lint, strict typecheck, 103 unit/integration tests, production build, and 10 Playwright journeys.
  - Independent review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings; final responsive rendering remains assigned to E05.
  - Commit status: not committed; project commit authorisation is not documented.
  - Next priority: E05 — Build the static cabinet and cartridge artifact.

- [x] **E03 — Author Mystery and Story cartridges** (2026-07-18)
  - Added portable Mystery and Story cartridges with exact covenant embedding, three accepted rounds/scenes, grounded state, bounded mementos, and explicit role release.
  - Kept Mystery's player clues visibly separate from harmless case fiction and Story's choices separate from diagnosis, recovered memory, and real-world claims.
  - Corrected Story's setup so genre and content boundaries are defined or declined before transformation, and removed an overstated environmental-detail requirement from Mystery metadata after independent review.
  - Added focused metadata, lifecycle, grounding, content-boundary, and mechanical-differentiation coverage across all three first-party games.
  - `npm run validate` passed: lint, strict typecheck, 101 unit/integration tests, production build, and 10 Playwright journeys.
  - Independent re-review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings; live harness obedience remains deferred to E07.
  - Commit status: not committed; project commit authorisation is not documented.
  - Next priority: E04 — Create the original cartridge artwork.

- [x] **E02 — Author the Signal cartridge baseline** (2026-07-18)
  - Added a self-contained v0.1.0 Signal cartridge with exact covenant embedding, consent-first setup, three accepted stay-here observation beats, latest-report adaptation, grounded field note, and explicit persona release.
  - Removed an initial environment-description request and tightened Beat 3 to the latest accepted report after independent review identified two contract mismatches.
  - Expanded focused coverage for minimal inputs, consent ordering, adaptive Beats 2–3, stay-here behavior, refusal, pause, stop, memento grounding, and no fourth move.
  - `npm run validate` passed: lint, strict typecheck, 97 unit/integration tests, production build, and 10 Playwright journeys.
  - Independent re-review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings.
  - Commit status: not committed; project commit authorisation is not documented.
  - Next priority: E03 — Author Mystery and Story cartridges.

- [x] **E01 — Define the canonical Elixir schema and covenant** (2026-07-18)
  - Added a strict first-party cartridge schema with pinned schema version, stable identity/version fields, bounded demands and inputs, no-data-receipt behavior, evidence-scoped compatibility, and required accessible artwork/provenance metadata.
  - Added a visible JSON metadata fence parser, exact versioned covenant embedding, and fail-closed portability checks for hidden/control text, remote and linked resources, executable/package references, encoded text, executable fences, and model-specific tokens.
  - Persisted the common covenant covering authority, disclosure, affirmative consent, conversation-only play, minimal current boundaries, one-move pacing, refusal, pause, immediate stop, groundedness, prohibited action families, data handling, and explicit role release.
  - Added 10 focused regressions for valid metadata plus version drift, excess fields, identity/artwork mismatch, unsupported compatibility claims, contradictory duration, duplicate inputs, malformed/duplicate metadata, covenant drift/version mismatch, and adversarial source forms.
  - Initial independent review found incomplete remote/encoded portability checks and an unpinned schema version; both findings were resolved and expanded with the reviewer's exact adversarial probes.
  - `npm run validate` passed after the final fixes: lint, strict typecheck, 94 unit/integration tests, production build, and 10 Playwright journeys.
  - Preserved a malformed disposable `.next` cache at `/tmp/the-guide-next-cache.HVka2u/.next`; source data was unaffected and validation regenerated the build output.
  - Independent re-review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings; pattern-based portability remains a residual risk for real-cartridge and later security evaluation.
  - Commit status: not committed; project commit authorisation is not documented.
  - Next priority: E02 — Author the Signal cartridge baseline.

- [x] **S06 — Integrate and harden live orchestration** (2026-07-18)
  - Connected server-side start and turn generation while keeping IDs, transitions, validation, completion, mementos, and archive writes application-owned.
  - Added deterministic fallback for provider failure and unsafe output, with redacted validation events and unchanged submitted state.
  - Kept refusal and completion provider-free; retained pause and stop as local application controls.
  - Added pre-expedition personal-data disclosure, minimal bounded provider context, generic client/server recovery errors, and a stop-waiting abort/race guard.
  - Required stable per-action IDs, retained them through lost-response retries, scoped server deduplication by installation/expedition/turn, and bound identities to SHA-256 payload fingerprints.
  - Prevented active-cache eviction and returned controlled conflict/capacity responses rather than starting duplicate work.
  - `npm run validate` passed: lint, strict typecheck, 83 unit/integration tests, production build, and 10 Playwright journeys.
  - Independent re-review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings.
  - Residual boundary: deduplication is process-local for the current single-instance prototype; a stopped client discards late results while the one bounded server call may run until timeout.
  - Next priority: S07 — Validate and prepare whole-iteration review.

- [x] **S05 — Author transformation personas and signal-arc prompts** (2026-07-18)
  - Added materially different ordinary-buddy and transformed-expedition-persona voice contracts.
  - Encoded invitation, pursuit, revelation, and return beats with grounded-detail dependencies and stay-here constraints.
  - Kept all user-authored buddy and journey values in an explicitly untrusted data payload rather than the privileged system message.
  - Added prompt regressions for hostile buddy data, grounded phase directives, safety, originality, privacy, and strict JSON output boundaries.
  - Resolved independent-review findings for prompt injection, invented opening details, and phase-contract coverage.
  - `npm run validate` passed: lint, strict typecheck, 61 unit/integration tests, production build, and 9 Playwright journeys.
  - Independent re-review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings.
  - Next priority: S06 — Integrate and harden live orchestration.

- [x] **S04 — Implement the server-configured OpenAI-compatible adapter** (2026-07-18)
  - Added validated server-only provider configuration with deterministic mock as the default.
  - Implemented one bounded Chat Completions-compatible request with no retries, explicit timeout, JSON response mode, and no tool definitions.
  - Enforced a 32 KiB response limit, bounded choices/content, strict proposal parsing, and rejection of modern and legacy tool-call signals.
  - Redacted failure handling distinguishes timeout, rate limit, unavailability, invalid output, and tool calls without exposing credentials or raw errors.
  - Fixed independent-review findings for tool metadata, output bounds, transport classification, and timer cleanup; added focused regressions.
  - Moved a malformed disposable `.next` cache to `/tmp/the-guide-next-cache.UTAg6v/.next`; source data was unaffected and the build regenerated valid output.
  - `npm run validate` passed: lint, strict typecheck, 53 unit/integration tests, production build, and 9 Playwright journeys.
  - Final independent re-review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings.
  - Next priority: S05 — Author transformation personas and signal-arc prompts.

- [x] **S03 — Define the live adapter schemas and fixtures** (2026-07-18)
  - Added strict provider proposal, minimal context, start/turn request, result, and failure schemas.
  - Prevented provider-owned IDs, state/status mutations, tool calls, and excess fields at the contract boundary.
  - Limited outbound context to permitted buddy traits and the latest two accepted instructions/observations.
  - Verified installation, expedition, buddy and observation IDs; memory policy; validation events; mementos; archive data; reflections; and timestamps are excluded.
  - Added valid, invalid, failure, and privacy-boundary fixtures and tests.
  - `npm run validate` passed: lint, strict typecheck, 45 unit/integration tests, production build, and 9 Playwright journeys.
  - Independent review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings.
  - Next priority: S04 — Implement the server-configured OpenAI-compatible adapter.

- [x] **S02 — Simplify the active expedition screen** (2026-07-18)
  - Reduced active play to one dominant instruction, response field, and Done action.
  - Condensed buddy identity, signal progress, and effort into supporting metadata.
  - Moved Unexpected, Not possible, Pause, and Stop into one quiet responsive secondary strip without changing semantics.
  - Preserved 320px and 200% text operability after tightening intrinsic control sizing.
  - `npm run validate` passed: lint, strict typecheck, 41 unit/integration tests, production build, and 9 Playwright journeys.
  - Independent review returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings.
  - Commit status: not committed; project commit authorisation is not documented.
  - Next priority: S03 — Define the live adapter schemas and fixtures.

- [x] **S01 — Correct buddy and scene composition, including human-feedback revision** (2026-07-18)
  - Added ordinary buddy art with an intentional name fallback during creation and boundary setup.
  - Replaced the object grid with one illustrated scene containing scene-relative semantic hotspots and made the room use the full available phone width.
  - Made the elixir and one optional brass token disappear from the scene when collected and appear in the visible ephemeral inventory.
  - Kept the brass token deliberately inert and out of provider, domain, expedition, persistence, and archive state.
  - Preserved optional inspections, narration, the ritual shortcut, 44px targets, keyboard operation, assistive-technology names, and the existing expedition/archive contracts.
  - Prevented narrow-screen sound/title overlap and recorded 320px boundary, initial-room, and collected-room captures for visual evidence.
  - `npm run validate` passed: lint, strict typecheck, 41 unit/integration tests, production build, and 9 Playwright journeys.
  - Independent review of the human-feedback revision returned **READY FOR HUMAN TESTING** with no blocking or should-fix findings.
  - Commit status: not committed; project commit authorisation is not documented.
  - Human focus: touch discoverability of unlabeled scene objects and whether the full-width room feels appropriately immersive on a real phone.
  - Next priority: S02 — Simplify the active expedition screen.

- [x] **P09 — Run full validation and prepare independent review** (2026-07-17)
  - Added a completeness audit that matches every shipped pixel media file to a provenance-manifest entry.
  - Added representative 1280px desktop arrival and expedition captures alongside the existing mobile arrival and 320px room captures.
  - Visually inspected representative desktop and mobile states and found no material clipping or coherence issue.
  - Ran `npm run validate`: lint, typecheck, 41 unit/integration tests, production build, and 9 Playwright scenarios passed.
  - Final independent whole-slice review found no blocking or should-fix implementation findings and marked FR-1–FR-10 materially satisfied.
  - Advanced `docs/specs/playable-pixel-art-opening.md` to **READY FOR HUMAN TESTING**.
  - Human focus: nostalgic feel, pickup-to-choice discoverability, both visual outcomes, transformation/audio restraint, real-device readability, and keyboard focus.

- [x] **P08 — Expand automated accessibility and responsive tests** (2026-07-17)
  - Added a dedicated 320×568 mobile scenario covering arrival, buddy setup, boundaries, the playable room, transformation, departure, and active expedition.
  - Enforced zero horizontal overflow, 44px hotspot and sound-toggle targets, viewport-bounded room controls, and non-overlap between the fixed sound control and narrative heading.
  - Applied 200% root text sizing during active play and verified the response field plus Done, Not possible, Pause, and Stop remain available without horizontal overflow.
  - Added direct viewport-intersection assertions across creation, boundaries, ritual choice, transformation, departure, active play, validation feedback, and pause instead of relying on document scroll width alone.
  - Extended keyboard-only coverage through room interactions, expedition advancement, pause, and resume, including deliberate heading focus when the instruction or expedition state changes.
  - Fixed narrow-screen intrinsic sizing for panels, forms, system controls, and long headings discovered by the new 200% text checks.
  - Reserved responsive top space for the global sound control and captured a representative 320px room screenshot.
  - Existing scenarios continue to cover keyboard order, reduced motion, shortcut and item branches, returning bypass, blocked audio, persistence, refusal, pause, stop, and deletion.
  - Validated with `npm run validate` (40 unit/integration tests and 8 mobile Playwright scenarios passed).
  - Initial independent review gaps were addressed; re-review passed with no blocking or should-fix findings.
  - Human focus: visually inspect 320px/200% quest controls and keyboard focus indicators from the room through pause.

- [x] **P07 — Add bounded audio and preferences** (2026-07-17)
  - Added three deterministic, project-authored PCM effects for pickup, elixir resolution, and portal departure, plus a reproducible local generation script.
  - Added a globally reachable 44px sound toggle that defaults off, persists separately in local storage, and starts no playback before user activation.
  - Added optional event playback with low volume and silent handling for blocked or unavailable browser audio.
  - Recorded audio provenance and format in the asset manifest and validated RIFF/WAVE headers for every declared effect.
  - Added unit coverage for preference isolation and browser coverage for opt-in, persistence, no autoplay, logical keyboard order, and blocked-audio continuity.
  - Resolved the initial review blocker by including the sound preference in recovery and Delete all local data, synchronizing the mounted toggle immediately, and verifying both local keys are removed.
  - Recovered from a malformed disposable `.next` cache by moving it to `/tmp/tmp.vSsbfgMu5h/next-cache`; no source data was deleted.
  - Validated with `npm run validate` (40 unit/integration tests and 7 mobile Playwright scenarios passed).
  - Independent re-review passed with no remaining blocking or should-fix findings; P07 is ready for human testing.

- [x] **P06 — Reskin expedition, pause, ending, and archive** (2026-07-17)
  - Reframed the active instruction as a game-world quest dialogue beside the correct ordinary or transformed buddy sprite.
  - Added a dormant portal treatment to pause, an ordinary-buddy return treatment to completion, and a cabinet-led archive presentation.
  - Preserved all instruction, free-text, effort, response, refusal, pause, stop, memento, privacy, deletion, and recovery semantics.
  - Expanded mobile browser coverage to verify ordinary/transformed expedition sprites, pause portal, returned buddy, and archive cabinet across the complete flow.
  - Validated with `npm run validate` (38 unit/integration tests and 6 mobile Playwright scenarios passed).
  - Independent agent review passed with no blocking or should-fix findings; P06 is ready for human testing.

- [x] **P05 — Implement transformation and departure presentation** (2026-07-17)
  - Added a dedicated transformation/departure state between the elixir decision and expedition creation.
  - Presented matching ordinary/transformed buddy variants beside dormant/active portal states with explicit textual equivalents.
  - Added a sub-two-second stepped transformation, immediate reduced-motion equivalent, visible skip action, and explicit Enter expedition handoff.
  - Kept the item path within four primary activations and guarded departure synchronously against duplicate expedition creation.
  - Expanded browser coverage for transformed and unchanged copy, skip, activated portal state, reduced-motion readiness, and double departure activation.
  - Validated with `npm run validate` (38 unit/integration tests and 6 mobile Playwright scenarios passed).
  - Independent agent review passed with no blocking or should-fix findings; P05 is ready for human testing.

- [x] **P04 — Reframe buddy creation and boundaries** (2026-07-17)
  - Reframed buddy creation as an in-world character dialogue with the ordinary buddy portrait and retained the same name, voice, curiosity, and peculiarity controls.
  - Reframed boundary setup as a parchment presented beside the dormant portal while preserving the same time, energy, hard-limit, summary, validation, and submission behaviour.
  - Preserved native form labels, focus behaviour, validation alerts, and the explicit statement that the user may refuse, pause, or stop at any time.
  - Expanded mobile browser coverage to assert exactly three buddy selects, six boundary radios, the hard-limit field, and the accessible boundary summary.
  - Resolved the initial review blocker with a parchment-scoped dark error colour; automated browser coverage now exercises custom invalid-buddy validation and requires at least a 4.5:1 rendered contrast ratio for the unsafe-boundary alert.
  - Validated with `npm run validate` (38 unit/integration tests and 6 mobile Playwright scenarios passed).
  - Independent re-review passed with no remaining blocking or should-fix findings; P04 is ready for human testing.
  - Commit status: P03 is committed as `566be57`; P04 changes are not committed.
  - Next handoff: `bwh-agent-review`.

- [x] **P03 — Build the semantic playable elixir room** (2026-07-17)
  - Replaced the decorative ritual display with an ephemeral room state machine: ready, elixir selected, choice open, and resolved.
  - Added semantic keyboard-operable hotspots for the elixir, buddy, astrolabe, and cabinet, plus a textual sealed-portal state.
  - Added contextual room narration, visible inventory feedback, the direct Begin ritual shortcut, and the explicit fictional-elixir consent choice.
  - Prevented repeated choice activation from creating more than one active expedition.
  - Kept optional inspections and item selection out of the local archive and expedition domain state until explicit elixir resolution.
  - Updated all existing end-to-end paths to exercise the shortcut and added a dedicated item-play scenario covering inspections, inventory, consent, and persistence boundaries.
  - Resolved initial agent-review findings by retaining the elixir in inventory through the consent choice, proving synchronous duplicate-choice protection with a UUID call-count assertion, and removing the stale backlog entry.
  - Validated with `npm run validate` (38 unit/integration tests and 6 mobile Playwright scenarios passed).
  - Independent agent re-review passed with no remaining blocking or should-fix findings; P03 is ready for human testing.
  - P01–P02 independent agent review passed with no blocking or should-fix findings before P03 began.
  - Commit status: P03 is committed as `566be57`; commit `a15444d` contains work through P02 and is pushed to `origin/agent/planning-decisions`.
  - Next handoff: `bwh-agent-review`.

- [x] **P02 — Author and integrate the bounded original asset set** (2026-07-17)
  - Generated one original 1254×1254 pixel-art atlas using the built-in OpenAI image-generation tool from a project-authored prompt.
  - Included the room, ordinary and transformed buddy, elixir, dormant and active portal, astrolabe, cabinet, inventory slot, and reusable UI tiles in a fixed 3×3 layout.
  - Integrated atlas cells into arrival, ritual, expedition, ending, and archive presentation without changing domain or interaction state.
  - Recorded generation provenance, usage terms, dimensions, cell order, and prompt summary in the asset manifest.
  - Added focused validation for manifest completeness, PNG presence, and exact dimensions.
  - Visually inspected the generated atlas and Playwright mobile arrival capture; the T3 shared preview was unavailable, so the configured Playwright browser was used as the documented fallback.
  - Validated with `npm run validate` (38 unit/integration tests and 5 mobile Playwright scenarios passed).
  - No commit was created because the project does not document commit authorisation.
  - Independent agent review passed with no blocking or should-fix findings.

- [x] **P01 — Establish pixel presentation primitives and asset manifest** (2026-07-17)
  - Added a reusable semantic game shell and applied it across the existing journey.
  - Established the limited pixel palette, bitmap-style system typography, hard-edged controls, responsive framing, and reduced-motion rules.
  - Added an asset provenance manifest and focused schema validation for future visual, font, and sound resources.
  - Restored the missing accessible safety error on the boundary screen and tightened its browser assertion.
  - Validated with `npm run validate` (37 unit/integration tests and 5 mobile Playwright scenarios passed).

- [x] **T01 — Bootstrap the application and validation toolchain** (2026-07-16)
  - Created a TypeScript and React mobile web application using Next.js App Router.
  - Added a server health route and centralized first-slice capability boundaries.
  - Established lint, strict typecheck, unit test, production build, and aggregate validation commands.
  - Added focused tests covering deferred capabilities and the three-turn limit.
  - Validated with `npm run validate`.
- [x] **T02 — Define schemas, state transitions, and fixture format** (2026-07-17)
- [x] **T03 — Implement local identity, persistence, restoration, and deletion** (2026-07-17)
- [x] **T04 — Implement deterministic mock branching and grounded mementos** (2026-07-17)
- [x] **T05 — Implement action validation and safe fallbacks** (2026-07-17)
- [x] **T06 — Build arrival, buddy creation, boundaries, and elixir flow** (2026-07-17)
- [x] **T07 — Build expedition interaction and user controls** (2026-07-17)
- [x] **T08 — Build completion, archive, and returning recognition** (2026-07-17)
- [x] **T09 — Complete accessibility and responsive treatment** (2026-07-17)
- [x] **T10 — Run full validation and prepare independent review** (2026-07-17)

## Deferred by the approved specification

- Live providers and external personal-agent connections
- Accounts, authenticated tenancy, and cross-device synchronization
- Travel, GPS, and location-aware behavior
- Six differentiated personalities
- Agent tools and background activity
- Public sharing and other social functionality
- Player-selected turn counts and branching/choice-dependent endings for future cartridges
- The repository owner's future fourth immersive Story concept
