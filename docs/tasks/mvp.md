# First Vertical Slice Development Plan

Source specifications:

- `docs/specs/first-vertical-slice.md`
- `docs/specs/playable-pixel-art-opening.md`

## Status

**IN DEVELOPMENT**

The first vertical slice was approved on 2026-07-16 and completed. The playable pixel-art opening specification was approved by the repository owner on 2026-07-17. Tasks are ordered by dependency and executed one bounded task per development run.

## Active

No task is active. P02 is complete and awaiting independent agent review before P03 begins.

## Backlog

- [ ] **P03 — Build the semantic playable elixir room**
- [ ] **P04 — Reframe buddy creation and boundaries**
- [ ] **P05 — Implement transformation and departure presentation**
- [ ] **P06 — Reskin expedition, pause, ending, and archive**
- [ ] **P07 — Add bounded audio and preferences**
- [ ] **P08 — Expand automated accessibility and responsive tests**
- [ ] **P09 — Run full validation and prepare independent review**

## Completed

- [x] **P02 — Author and integrate the bounded original asset set** (2026-07-17)
  - Generated one original 1254×1254 pixel-art atlas using the built-in OpenAI image-generation tool from a project-authored prompt.
  - Included the room, ordinary and transformed buddy, elixir, dormant and active portal, astrolabe, cabinet, inventory slot, and reusable UI tiles in a fixed 3×3 layout.
  - Integrated atlas cells into arrival, ritual, expedition, ending, and archive presentation without changing domain or interaction state.
  - Recorded generation provenance, usage terms, dimensions, cell order, and prompt summary in the asset manifest.
  - Added focused validation for manifest completeness, PNG presence, and exact dimensions.
  - Visually inspected the generated atlas and Playwright mobile arrival capture; the T3 shared preview was unavailable, so the configured Playwright browser was used as the documented fallback.
  - Validated with `npm run validate` (38 unit/integration tests and 5 mobile Playwright scenarios passed).
  - No commit was created because the project does not document commit authorisation.
  - Next handoff: `bwh-agent-review`.

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
