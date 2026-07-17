# First Vertical Slice Development Plan

Source specifications:

- `docs/specs/first-vertical-slice.md`
- `docs/specs/playable-pixel-art-opening.md`

## Status

**IN DEVELOPMENT**

The first vertical slice was approved on 2026-07-16 and completed. The playable pixel-art opening specification was approved by the repository owner on 2026-07-17. Tasks are ordered by dependency and executed one bounded task per development run.

## Active

No task is active. P01–P09 are complete and the playable pixel-art opening is ready for human testing.

## Backlog

No approved tasks remain.

## Completed

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
