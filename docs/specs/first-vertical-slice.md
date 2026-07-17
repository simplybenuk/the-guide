# The Guide — First Vertical Slice Specification

## Status

**READY FOR HUMAN TESTING**

This specification defines the approved first implementation slice. Development began on 2026-07-16 and independent agent review passed on 2026-07-17.

## Objective and scope

Build a mobile-first web experience in which an adult user creates a lightweight AI buddy, completes one safe three-turn stay-here expedition, receives a reflection and transcript-grounded memento, and is recognized when returning on the same device.

The slice proves the core interaction and emotional promise without depending on accounts, travel, a live model provider, or personal-agent integration.

## Problem and desired outcome

Conventional AI chat puts the burden of deciding what to ask and what to do on the user. The Guide should instead create a short, game-shaped experience in which the user deliberately hands over the next decision while retaining immediate control over whether to continue.

The outcome is successful when an unfamiliar user can enter the experience without developer help, understand the premise, see their own words alter the expedition, safely refuse or stop, and receive an ending that reflects what actually happened.

## Actors

### Primary actor

An adult, self-directed user on a mobile device who enjoys playful, reflective, or AI-mediated experiences. The prototype assumes no technical knowledge and does not require the user to supply a provider account or key.

### Future actors outside this slice

- A user connecting an existing personal agent or provider.
- A signed-in user synchronizing an archive across devices.
- A product operator administering a hosted service.
- A user participating in travel or social expeditions.

## Goals

- Communicate the premise within 30 seconds of arrival.
- Present a minimal, portrait-first experience that feels like a game rather than onboarding or chat.
- Establish a named buddy with a small amount of personality.
- Capture time, energy, and hard boundaries without a long questionnaire.
- Make the fictional elixir ritual legible, optional, and emotionally meaningful.
- Run exactly three active expedition turns, one instruction at a time.
- Make a free-text response visibly affect a later instruction.
- Support refusal, pause, resume, and stop without guilt or loss of control.
- Validate every instruction before it becomes user-visible.
- End deliberately with the buddy returning, a reflection, and a grounded memento.
- Save a private local expedition record and recognize one prior detail on return.
- Provide deterministic behavior suitable for automated tests and repeatable demonstrations.

## Non-goals

- Live model or hosted inference integration.
- User-supplied API keys or local-agent networking.
- Hermes or OpenClaw integration.
- Accounts, authentication, multi-user tenancy, or cross-device synchronization.
- Travel, GPS, background location, maps, or destination routing.
- Six production-ready buddy or expedition personalities.
- Unbounded model-generated actions.
- Agent tools, shell access, messaging, browsing, or background work.
- A general-purpose assistant or conventional open-ended chat.
- Native mobile applications.
- Voice, camera, image input, social play, public sharing, scores, streaks, or leaderboards.
- Support specifically designed for children or vulnerable users.

## Functional requirements

### FR-1: Arrival

1. The first screen must present one illustrated or atmospheric portrait composition, concise premise copy, and one obvious primary action.
2. It must not require sign-up, provider configuration, location permission, or a tutorial before entry.
3. A returning local user must see a restrained welcome containing at most one meaningful detail from a prior completed expedition.

### FR-2: Buddy creation

1. The user must be able to create one buddy by providing or accepting a name.
2. The flow must establish a voice description, at least one curiosity, and one peculiarity using no more than three user decisions or responses.
3. The buddy record must use the existing `Buddy` contract and a `session_only` or local-archive memory policy.
4. Connecting an external buddy may be shown only as unavailable or future functionality; it must not imply a working integration.

### FR-3: Boundary setup

1. Setup must collect a time budget, energy level, and optional free-text hard boundaries.
2. Travel mode must be fixed to `stay_here` in this slice.
3. The supported time choices must all accommodate the fixed three-turn fixture; the default is 10 minutes.
4. Boundaries must remain reviewable before the expedition starts.
5. The interface must state that the user may refuse, pause, or stop at any time.

### FR-4: Elixir ritual

1. The elixir must be clearly fictional and must never imply real ingestion.
2. The user must choose whether to let the buddy transform.
3. Choosing not to transform must not block play; the buddy may enter expedition mode unchanged.
4. Motion and sound must not be required to understand the transition.
5. The ritual should complete within 10 seconds and must respect reduced-motion preferences.

### FR-5: Expedition lifecycle

1. The expedition must follow valid states from the existing `ExpeditionState` contract.
2. A normal completed expedition must contain exactly three accepted active instructions followed by reflection.
3. Only one instruction may be current or visible at a time.
4. The next instruction must not be selected until the user responds to the current instruction.
5. State must persist after every user response and status transition.
6. Refreshing or reopening on the same device must restore an active or paused expedition without creating an extra turn.
7. The active screen must avoid presenting the interaction as a scrolling chat transcript.

### FR-6: Deterministic adaptive mock

1. The mock buddy adapter must return schema-valid, deterministic fixtures.
2. The first instruction must be concrete, low-risk, achievable in the current setting, and independent of location data.
3. User responses must be classified into a bounded response interpretation such as completion with an observed detail, refusal, unexpected event, or unusable/empty input.
4. At least two materially distinct second- or third-turn branches must exist.
5. At least one branch decision must incorporate a safe, normalized detail from the user's own text into later visible content.
6. The same initial state and normalized response sequence must always produce the same branch and output.
7. The UI and product copy must not claim that the deterministic mock is a live or generally intelligent model.

### FR-7: User responses and controls

1. Free text must be the primary response control during active turns.
2. The interface must also expose Done, Not possible, Pause, and Stop actions.
3. Not possible must clear the current instruction and select a safe alternate branch without requiring an explanation or incrementing the accepted-turn count for the refused instruction.
4. Pause must persist state and prevent further adapter calls until resume.
5. Stop must be available on every active screen, end the expedition immediately after confirmation, and create a partial record.
6. Stopping must not require a memento; it may offer a brief, non-judgmental closing.
7. Empty or unusable free text must not corrupt state or silently advance the expedition.

### FR-8: Safety validation

1. Every proposed instruction must be schema-validated and pass the action validator before display or state advancement.
2. Allowed action families are observation, light movement within the user's immediate safe setting, writing, making with ordinary safe items, noticing, and reflection.
3. Instructions must be rejected when they conflict with the hard constraints in `docs/specs/safety-model.md`, the user's boundaries, remaining time, energy, or stay-here mode.
4. A rejected proposal must never be shown to the user.
5. The system must select a deterministic safe alternative serving a similar narrative purpose.
6. If no safe alternative exists, the expedition must redirect or end gracefully.
7. Validation records must exclude or redact free-text personal details not required to diagnose the rule outcome.

### FR-9: Completion and memento

1. After the third accepted turn, the expedition persona must announce completion and the buddy must visibly return to its ordinary state.
2. The reflection must describe the shape of the journey without inventing user actions or discoveries.
3. The memento must be derived only from accepted instructions, recorded response interpretations, and the user's submitted observations.
4. The memento must contain at least one detail grounded in the current expedition when the user supplied one.
5. If the transcript contains insufficient detail, the memento must use a truthful generic structure rather than fabricate specificity.
6. The user must be able to view and delete the saved expedition and memento.
7. Editing, exporting, sharing, and replaying a memento are deferred even if earlier UX documents mention them.

### FR-10: Local archive and return

1. Buddy, expedition, and memento data must be scoped to one opaque installation identifier generated on the device.
2. The identifier must not encode personal information and is not an authenticated identity.
3. No archive data may be sent to an external provider in this slice.
4. A returning welcome may use one stored observation only from a completed expedition.
5. The archive UI must list local expedition records and support deletion.
6. Deleting an expedition must also remove its associated memento and prevent its details from appearing in future welcomes.
7. The UI must disclose that local data may be lost when browser storage is cleared and is not synchronized across devices.

## Experience requirements

- Design for a phone held in one hand and portrait orientation first.
- Keep the primary action obvious and thumb-friendly.
- Use short copy, deliberate pacing, and a single focal action or instruction.
- Keep pause and stop visually available without making the screen feel like a control panel.
- Use original visual treatment; mood references are not licenses to copy protected designs.
- The experience must remain understandable without animation, sound, color alone, or hover interaction.
- Interactive controls must have accessible names, visible focus, and adequate touch targets.
- The free-text field, validation feedback, status changes, and dialog behavior must be usable by keyboard and assistive technology.

## Proposed design

### Application shape

- A TypeScript, React-based mobile web application.
- A lightweight server-side orchestration boundary for the turn engine and adapter interface.
- A deterministic mock buddy adapter as the only adapter enabled in this slice.
- A simple persistence adapter suitable for local development and one-device prototype continuity.
- Shared schemas for buddy data, expedition state, instruction proposals, response interpretations, reflections, and mementos.

The implementation may select the specific React framework, package manager, and SQLite-compatible library during development planning, provided the trust boundaries and requirements in this specification remain unchanged.

### Logical flow

```text
arrival
  -> create buddy
  -> set boundaries
  -> choose elixir transformation
  -> propose fixture instruction
  -> validate instruction
  -> present one instruction
  -> interpret response
  -> persist state
  -> branch or finish
  -> reflection and memento
  -> local archive / returning welcome
```

### State and adapter contracts

The existing contracts in `docs/specs/expedition-state.md` and `docs/specs/buddy-adapter.md` are the starting point. Development planning may refine field names or split types, but must preserve these invariants:

- The application, not the adapter, owns state transitions.
- Proposed and accepted instructions are stored separately.
- Only validated instructions become current or user-visible.
- Every mutation is attributable to a user action or accepted orchestration step.
- The mock remains replaceable by the same bounded adapter contract.

### Deterministic branching

The fixture set should define one coherent expedition with a compact branch graph. Branching is driven by enumerated interpretations plus normalized safe text tokens, not by unrestricted code execution or arbitrary prompt behavior. Fixtures must cover a normal observation, refusal, unexpected event, and insufficient response.

### Persistence and tenancy boundary

The prototype uses a single opaque local installation identifier. Server-side records, if used, must be keyed by that identifier and never treated as proof of identity. This is deliberately not a production tenancy model. Any hosted, multi-user, or cross-device rollout requires a new approved authentication, authorization, retention, and recovery design.

## Security, privacy, and safety constraints

- Browser code must contain no provider secrets; this slice uses none.
- User free text, buddy details, archives, and mementos are private data.
- Logs must not contain complete free-text responses by default.
- Displayed user-derived text must be treated as untrusted and rendered without executable markup.
- Identifiers must be opaque and sufficiently unpredictable to avoid casual record enumeration.
- Server routes, if present, must enforce installation scoping on every archive and expedition operation.
- The local identifier must not be presented as secure authentication.
- No exact location, age, contacts, health data, financial data, or legal data should be requested.
- The action validator and stop controls are product requirements, not optional prompt behavior.
- Archive deletion must remove the selected local record from active application storage; backup and production-retention guarantees are outside this prototype.

## Rollout and recovery

1. Develop and test entirely against deterministic fixtures.
2. Conduct internal mobile usability and safety testing before sharing the prototype more broadly.
3. Seed demonstrations with non-sensitive sample data and provide an archive-reset control.
4. Do not enable a live provider, travel mode, or hosted multi-user access under this specification.
5. If state restoration, scoping, or safety validation fails, disable continuation of affected expeditions and offer deletion/restart rather than guessing state.
6. Fixture and schema changes must remain backward compatible with saved prototype data or include an explicit, tested prototype reset path.

## Acceptance criteria

The slice is acceptable for independent agent review when all of the following are true:

1. On a phone-sized viewport, a new user can create a buddy, set boundaries, complete the ritual, and begin the first instruction without developer intervention.
2. The premise is understandable without exposing architecture or provider terminology.
3. A normal run completes exactly three accepted turns.
4. Two different supported free-text observations produce visibly different later paths under otherwise identical starting state.
5. Not possible produces a safe alternate instruction without demanding justification.
6. Pause survives refresh and does not advance the expedition; resume continues from the same instruction.
7. Stop is available throughout active play and produces a partial record without requiring a memento.
8. Unsafe, out-of-mode, over-time, and boundary-conflicting fixture proposals are never displayed and resolve through safe fallback or graceful termination.
9. A completed reflection and memento contain no unsupported claims and include a submitted detail when one is available.
10. Returning on the same installation can display one prior grounded detail without showing an activity dump.
11. Deleting an expedition removes its memento and prevents reuse of its detail.
12. No provider credential, external model call, tool execution, GPS request, account flow, or background tracking exists.
13. Core flows are keyboard-operable, screen-reader-labelled, and understandable with reduced motion.
14. All required automated checks and the mobile end-to-end scenario pass.

## Development-readiness bundle

### Proposed task outline

This outline is for downstream planning after human approval; it does not modify `docs/tasks/mvp.md`.

1. Bootstrap the TypeScript mobile web application and establish validation commands.
2. Define shared schemas, state-transition rules, and deterministic fixture format.
3. Implement local identity, persistence, archive deletion, and restoration.
4. Implement the mock adapter, bounded response interpreter, branch graph, and grounded memento builder.
5. Implement action validation, safe fallbacks, redacted validation events, and unsafe-fixture tests.
6. Build arrival, buddy creation, boundaries, and elixir flow.
7. Build the active expedition UI and Done, Not possible, Pause, Resume, and Stop behavior.
8. Build completion, reflection, memento, archive, and returning recognition.
9. Add accessibility, responsive behavior, and reduced-motion treatment.
10. Run full automated validation, mobile end-to-end checks, and independent agent review.

### Dependencies

- Human approval of this specification.
- Selection of a React/TypeScript framework, package manager, test runner, and persistence library during development planning.
- Original or appropriately licensed visual assets, or a deliberately asset-light first implementation.
- A fixture content review for coherence, safety, tone, and grounded branching.

### Affected areas

- New application structure and runtime configuration.
- Shared domain schemas and state engine.
- Server orchestration and local persistence boundary.
- Mobile UI and accessibility behavior.
- Mock content fixtures and safety rules.
- Project README and future run/validation documentation.

### Validation plan

#### Automated unit and schema tests

- Valid and invalid buddy, state, instruction, interpretation, reflection, and memento payloads.
- Allowed and rejected state transitions, including refresh-safe idempotency.
- Exactly-one-current-instruction and exactly-three-accepted-turn invariants.
- Deterministic response classification and branching.
- Transcript-grounding behavior, including insufficient-detail fallback.
- Local identifier format and record-scoping enforcement.
- Cascade deletion of mementos and exclusion from returning welcomes.

#### Safety tests

- Every prohibited category in `docs/specs/safety-model.md` has at least one rejected fixture.
- Time, energy, hard-boundary, and stay-here violations are rejected.
- Rejected text is not rendered or copied into ordinary logs.
- Safe alternative and no-alternative termination paths are covered.

#### Integration tests

- Full orchestrator loop with persistence after each response and status change.
- Refusal does not count the refused instruction as accepted.
- Pause makes no adapter call and resumes without duplicate advancement.
- Stop creates a partial record and no required memento.
- Completed expedition creates a grounded reflection, memento, and return detail.

#### End-to-end and human checks

- Complete the normal flow on a representative phone viewport.
- Run observation, refusal, unexpected-event, pause/refresh/resume, and stop scenarios.
- Verify keyboard navigation, accessible names, focus management, reduced motion, and non-color status cues.
- Verify archive inspection and deletion on the same installation.
- Conduct human output testing only after independent agent review; agents must not claim that gate as passed.

### Stop conditions for development

Development must stop and return for human direction if it would require:

- Enabling a live model or external personal-agent connection.
- Adding accounts, authentication, hosted multi-user tenancy, or cross-device sync.
- Collecting precise location or supporting travel.
- Supporting children or introducing vulnerability profiling.
- Expanding the allowed real-world action space beyond the curated families.
- Weakening pause, stop, archive deletion, validation, or transcript-grounding guarantees.
- Choosing a solution that exposes private records across installation identifiers.

## Decisions captured by this specification

- One complete expedition role is in scope; six differentiated personalities are deferred.
- The first slice uses a deterministic adaptive mock, not a live model.
- The mock must visibly branch from bounded interpretations of user text.
- The initial tenancy boundary is one opaque local installation, without authentication or cross-device claims.
- Stay-here is the only expedition mode.
- Three accepted active turns define a normal completed expedition.
- The expedition role remains named `expedition persona` internally until user-facing naming is tested.
- A curated action catalog bounds instruction generation.
- The prototype is aimed at adult, self-directed users.

## Assumptions

- The application will use TypeScript and a React-based mobile web framework.
- Server-side orchestration is retained even though the first adapter is deterministic.
- A SQLite-compatible store or equivalent is suitable for prototype persistence.
- User-supplied boundaries are plain text but are enforced through conservative deterministic matching in this slice.
- One coherent expedition fixture is enough to validate the interaction model if it contains materially distinct branches.
- Original visuals can be developed independently of the state and orchestration work.

## Open questions for human review

These questions do not prevent approval if the captured defaults are acceptable:

1. Should declining the elixir keep the ordinary buddy voice throughout, or use the same expedition copy without a visual transformation? Default: keep the buddy visually unchanged but enter the same bounded expedition state.
2. Should local persistence use browser-only storage or a server-side SQLite store keyed by installation identifier? Default: choose during development planning based on the selected framework, while preserving the same-device and scoping requirements.
3. Which single expedition tone should the first fixture use? Default: a Detective-like observation journey, while keeping the user-facing role name provisional.
4. Should the prototype include an explicit “Delete all local data” control in addition to per-expedition deletion? Default: yes, because it improves prototype recovery and privacy.

## Source-of-truth decisions and conflicts

### Source-of-truth decisions applied

- `docs/product-brief.md`: mobile-first buddy game, stay-here MVP, free-text adaptation, private archive, and reversible agency.
- `docs/architecture.md`: application-owned state, server orchestration, untrusted adapter output, explicit validation, and separated archive/provider boundaries.
- `docs/specs/expedition-state.md`: explicit state, one instruction at a time, persistence, refusal/pause/stop behavior, and three-turn cap.
- `docs/specs/buddy-adapter.md`: structured adapter contract, deterministic mock, disabled tools, and explicit memory.
- `docs/specs/safety-model.md`: prohibited actions, safe replacement, redacted validation events, and curated action families.
- `user-experience.md` and `docs/ux/opening-and-expedition.md`: portrait-first ritual, buddy transformation, free-text play, deliberate return, and grounded memento.
- ADRs 0001–0006: mock-first provider strategy, stay-here scope, three-turn length, TypeScript mobile web recommendation, provisional persona naming, and provider sequence.

### Conflicts resolved for approval

- `README.md` lists six Guide personalities in the planned MVP, while the newer buddy-centered brief and UX describe a buddy temporarily entering an expedition role. This specification scopes the first slice to one role and defers six differentiated personalities.
- `docs/ux/opening-and-expedition.md` includes edit, share, and replay actions for mementos, while the product non-goals defer social capability and the prototype lacks an export model. This specification requires view and delete only.
- The architecture leaves accounts versus local expedition identity unresolved. This specification chooses a non-authenticated opaque installation boundary for the prototype and prohibits hosted multi-user rollout under that model.
- Earlier experience material suggests connecting a personal agent during the first visit, while the provider ADRs call for mock-first implementation. This specification makes buddy creation functional and treats external connection as deferred.

## Approval record

- Human approver: Repository owner
- Approval date: 2026-07-16
- Approval notes: Approved by the user in the Codex workflow session.
