# The Guide — AI-Led Signal Expedition Specification

## Status

**IN DEVELOPMENT**

Human approval was recorded on 2026-07-18 in the Codex workflow session.
Development began on 2026-07-18 with S01, the buddy and scene-composition correction.

This specification records human output-testing feedback from 2026-07-18 and defines the next bounded product iteration. It preserves the validated safety and state harness while changing the presentation and enabling a live AI adapter.

## Objective and scope

Make the existing expedition feel like a strange intelligence is drawing the user through the real world, one signal at a time.

The iteration replaces the mock-only turn generator with one server-configured OpenAI-compatible provider, makes the ritual room a single scene with scene-native hotspots, gives transformation a behavioural consequence, and reduces the active expedition screen to the instruction, the user's response, and quiet secondary controls.

The existing memento and archive remain functional, but receive no new product investment in this iteration.

## Problem and desired outcome

Human testing found that the current visual shell is more game-like than the original prototype but does not yet create the intended experience:

- The buddy-creation presentation contains a portrait area that reads as blank or broken.
- The room is visually split into a scene followed by six object boxes, so interaction feels like selecting cards rather than exploring a place.
- Transformation changes decoration but does not meaningfully change the buddy's behaviour.
- The expedition screen exposes too many equally weighted actions and feels like a control panel.
- Deterministic fixture content lacks the uncanny, responsive invitation of following a signal into an unfolding mystery.
- Sound is too sparse to contribute materially to atmosphere.

The desired outcome is:

> My buddy notices something in my world, gives me one irresistible thread to follow, and turns what I report back into the next strange but achievable step.

The tonal target is an original “follow the signal” mystery: uncanny invitation, escalating recognition, and voluntary pursuit. It may evoke the feeling of following a white rabbit without copying characters, dialogue, imagery, plot, or interface from *The Matrix* or other works.

## Actors

### Primary actor

An adult using a phone who wants a short, playful real-world experience and is willing to report what they notice in free text.

### Prototype operator

The developer or product owner who configures one provider endpoint and credential on the server. End-user credential entry is outside this iteration.

## Goals

- Make every required room interaction occur within one coherent illustrated scene.
- Ensure the buddy is visibly present during creation and throughout the journey.
- Make transformation change the AI's voice, framing, and expedition behaviour.
- Present one dominant instruction and one response action at a time.
- Use live AI generation to make the next instruction respond specifically to the user's latest observation and the prior arc.
- Establish a three-beat mystery arc: invitation, pursuit, and revelation/return.
- Preserve immediate refusal, pause, and stop without giving them equal visual weight to the current action.
- Keep all model output schema-validated, safety-validated, bounded by time and energy, and recoverable through deterministic fallback.
- Keep the existing mock adapter available for tests and offline demonstration.

## Non-goals

- End-user API-key entry, accounts, credential persistence, or multiple provider profiles.
- Importing private memory from ChatGPT, Hermes, OpenClaw, or another agent.
- Agent tool use, browsing, messaging, shell access, background activity, or autonomous location lookup.
- GPS, travel routing, maps, destination mode, or precise location collection.
- More rooms, a general inventory engine, complex puzzles, movement controls, or a verb grid.
- New memento, archive, sharing, replay, or returning-user capabilities.
- A full soundtrack, adaptive music system, voice acting, or procedural audio.
- Copying recognizable protected elements from reference films or games.

## Functional requirements

### FR-1: Buddy presence

1. The buddy-creation screen must show a valid ordinary buddy image rather than an empty decorative frame.
2. If the art asset fails to load, the frame must show the buddy's name or an explicit illustrated-placeholder state; it must not appear accidentally blank.
3. The selected buddy representation must remain consistent in setup, room, transformation, expedition, and return states.
4. Buddy image presentation must have a textual equivalent and remain decorative to assistive technology when adjacent text already identifies the buddy.
5. Boundary setup must show the selected buddy rather than an empty or unrelated portal portrait.

### FR-2: Single playable room

1. The room must render as one illustrated scene with the buddy, elixir, portal, astrolabe, and cabinet located within it.
2. Each object must be activated through a semantic hotspot positioned over its visible location in the scene.
3. The interface must not render separate object cards or a six-box object grid beneath the scene.
4. Hotspots must have at least 44 by 44 CSS-pixel activation areas and visible keyboard focus without requiring visible rectangular cards at rest.
5. Touch, pointer, keyboard, and assistive-technology users must receive the same object names, available actions, and state changes.
6. Scene narration and the current contextual action may appear in one compact dialogue region outside the artwork.
7. Optional inspections must remain optional and must not write expedition or archive state.
8. The Begin ritual escape hatch must remain available without competing visually with scene interaction.
9. On a phone, the illustrated room must use the full available viewport width, with framing and controls arranged around the scene rather than shrinking it into a card.
10. Picking up the elixir must remove it from the room and place it in the visible inventory.
11. The room may contain one additional inert curiosity item that can be collected, disappears from the scene, and appears in the ephemeral room inventory.
12. The curiosity item must have no expedition effect, provider context, archive write, combination behavior, or hidden prerequisite; room reload may safely restore it.

### FR-3: Consequential transformation

1. The transformed and unchanged choices must send distinct persona state to the AI adapter.
2. The transformed path must use a clearly different voice and framing from the ordinary buddy while preserving the same safety and action boundaries.
3. The first generated instruction must demonstrate the chosen state in its wording; a sprite swap alone is insufficient.
4. Transformation must establish the expedition's central signal or mystery and create anticipation for the first instruction.
5. The unchanged path must remain fully playable and must sound like the ordinary buddy inviting the user into the same bounded game.
6. Animation and sound remain optional enhancements; copy and behaviour must communicate the consequence with both disabled.

### FR-4: Live buddy adapter

1. Add one OpenAI-compatible server-side adapter behind the existing buddy-adapter boundary.
2. Select provider mode through server configuration; retain deterministic mock mode for tests and fallback.
3. The browser must never receive or persist the provider credential.
4. The provider request may contain only the minimum expedition context needed for the current turn: buddy traits, transformation state, time, energy, explicit boundaries, accepted instructions, and submitted observations.
5. Provider output must be structured and validated against application-owned schemas before it can affect state or become visible.
6. The model may propose an instruction and response prompt but may not advance state, change boundaries, invoke tools, or decide that pause/stop/refusal failed.
7. Every proposed instruction must pass the existing deterministic action validator.
8. Invalid, unsafe, timed-out, rate-limited, or unavailable provider responses must use a validated deterministic fallback without exposing raw provider errors or unsafe text.
9. Logs must exclude credentials and full user observations by default.
10. Provider calls must have a bounded timeout and no automatic retry loop that can produce duplicate turns or unbounded cost.

### FR-5: Signal-shaped expedition

1. A normal expedition remains three accepted instructions long.
2. The three instructions must form an arc rather than three independent activities:
   - **Invitation:** notice a specific anomaly, pattern, threshold, trace, or overlooked detail.
   - **Pursuit:** use the user's reported detail to choose a new perspective or safe nearby action.
   - **Revelation:** connect at least one grounded detail from the journey into a final act of attention or interpretation.
3. Each instruction must be concrete, achievable, concise, and addressed directly to the user.
4. The next instruction must visibly depend on the user's latest response when a safe usable detail is available.
5. The AI must not invent objects, people, events, or user actions as though they were observed facts.
6. Mystery language may invite interpretation but must not assert surveillance, supernatural certainty, hidden authority, or real-world conspiracy.
7. The expedition must remain usable in stay-here mode without location data.

### FR-6: Simplified active screen

1. The active screen must have one dominant visual hierarchy:
   - current instruction;
   - response prompt and text field;
   - one primary submit action.
2. Progress, effort, and buddy identity may remain as compact supporting information but must not compete with the instruction.
3. “Something unexpected happened” must be handled through the response flow or one compact secondary action, not a second full-width primary button.
4. Not possible, Pause, and Stop must remain reachable as plainly labelled secondary actions in one quiet control region or disclosure.
5. Secondary controls must require no more than one additional activation and must remain keyboard and screen-reader accessible.
6. The active screen must not resemble a dashboard, chat transcript, or multi-option decision menu.
7. During a provider call, the current response must not be submitted twice and the user must retain a clear route to stop waiting.

### FR-7: Memento and archive preservation

1. Existing completion, memento, archive, deletion, and returning-recognition behaviour must continue to work.
2. No new memento presentation or archive capability is required.
3. Live-provider output must not be permitted to fabricate memento details; the existing transcript-grounding rule remains authoritative.
4. A provider failure during the expedition must not corrupt existing archive data.

### FR-8: Sound boundary

1. Existing opt-in effects and silent-default behaviour must remain functional.
2. Sound must not be expanded until the scene interaction and AI-led expedition pass human testing.
3. No information, action state, or transformation consequence may depend on sound.

## Proposed design

### Presentation structure

Keep semantic DOM and React state. Replace the room's layout grid with a responsive scene container and scene-relative semantic buttons:

```text
ElixirRoom
  ├── RoomArtwork
  ├── SceneHotspot: buddy
  ├── SceneHotspot: elixir
  ├── SceneHotspot: portal
  ├── SceneHotspot: astrolabe
  ├── SceneHotspot: cabinet
  └── CompactNarrationAndAction
```

Hotspot coordinates may vary by responsive breakpoint but must be defined against the single room artwork and covered by visual and accessibility tests. Required controls take precedence over artwork when text is enlarged.

### Provider boundary

Introduce a server-only adapter selection:

```text
Turn route
  -> load and validate request
  -> build minimal adapter context
  -> mock adapter OR OpenAI-compatible adapter
  -> parse structured proposal
  -> deterministic action validation
  -> accept proposal OR validated deterministic fallback
  -> application-owned state transition
```

Configuration uses server-only environment variables for provider mode, endpoint, credential, and model identifier. The specific provider SDK and model remain execution choices; the adapter contract and validation requirements are model-agnostic.

### Prompt contract

The provider receives:

- the temporary buddy voice and whether transformation occurred;
- the current arc phase;
- remaining turn count, time, energy, stay-here mode, and hard boundaries;
- accepted instructions and normalized observations needed for continuity;
- the allowed action families and instruction schema;
- explicit prohibitions against tools, invented observations, coercion, surveillance claims, and unsafe action.

It returns only a structured instruction proposal. Application code remains responsible for IDs, timestamps, validation events, persistence, and state transitions.

### Recovery

- Provider unavailable or timed out: use a phase-appropriate deterministic fallback and disclose only that the buddy briefly lost the signal if disclosure is helpful.
- Invalid structured output: reject it and use fallback; do not render partial text.
- Unsafe proposal: record a redacted rejection and use fallback.
- No safe fallback: end gently without advancing or fabricating progress.
- Existing local archives require no migration.

## Security, privacy, and cost constraints

- Credentials are server-only and must not use a `NEXT_PUBLIC_` variable.
- Endpoint configuration is operator-controlled in this iteration; arbitrary browser-supplied endpoint URLs are prohibited to avoid SSRF and secret-forwarding risks.
- Provider responses are untrusted input.
- User observations sent to the provider are personal data and must be disclosed before the first live expedition.
- No observation, buddy detail, or credential is written to ordinary logs.
- Provider calls use a finite timeout, one attempt per accepted user action, and bounded output size.
- Tools and tool-call responses are rejected even if the configured provider supports them.
- The existing action validator, boundary handling, pause, refusal, stop, and archive deletion remain application-controlled.

## Rollout and recovery

1. Implement the scene and active-screen corrections without changing stored expedition schemas.
2. Add the live adapter behind an explicit server configuration flag while keeping mock mode as the default for automated tests.
3. Validate live mode against a non-sensitive test expedition and a deliberately invalid/unsafe response suite.
4. Human-test the complete live journey on a phone before making live mode the normal development experience.
5. If live generation reduces safety, coherence, latency, or groundedness below the deterministic baseline, retain mock mode and return the prompt/adapter contract for refinement.
6. Do not expose end-user provider configuration until its credential, network, tenancy, and recovery model has a separately approved specification.

## Acceptance criteria

1. The buddy-creation portrait visibly contains the ordinary buddy or an intentional named fallback.
2. Boundary setup visibly contains the selected buddy, and the phone room uses the full available content width.
3. The room shows one coherent scene with six initial scene-relative semantic hotspots and no object-card grid beneath it.
4. A touch, keyboard, or screen-reader user can inspect objects, collect the inert curiosity item, pick up the elixir, offer it, choose transformation, and depart without a hidden prerequisite.
5. Each collected item leaves the scene and appears in the ephemeral inventory; neither the curiosity item nor optional inspections alter expedition or archive state.
6. The transformed and unchanged paths produce materially different first-instruction voice and framing with motion and sound disabled.
7. In live mode, two materially different safe observations produce contextually different next instructions that each reuse or respond to a grounded detail.
8. The three live instructions form an invitation, pursuit, and revelation arc while remaining achievable in stay-here mode.
9. The active screen presents one instruction, one response field, and one visually dominant submit action; unexpected, refusal, pause, and stop remain accessible but secondary.
10. Provider credentials do not appear in client bundles, browser storage, network responses, rendered errors, or logs.
11. Malformed, unsafe, tool-bearing, timed-out, and unavailable provider responses never render and resolve through a validated fallback or gentle ending.
12. Double submission cannot create duplicate provider calls or advance more than one turn.
13. Existing mock-mode journeys, pause/refresh/resume, stop, memento, archive, return, deletion, reduced-motion, sound-off, keyboard, 320px, and 200% text tests continue to pass.
14. A human phone test finds the signal-led expedition more compelling than the deterministic baseline and confirms that the screen no longer feels overloaded.

## Development-readiness bundle

### Proposed task outline

1. **S01 — Correct buddy and scene composition**
   - Fix buddy presence through setup, replace the object grid with a phone-width scene and scene-relative semantic hotspots, make collected objects move to an ephemeral inventory, and preserve narration, touch targets, keyboard order, and the ritual shortcut.
2. **S02 — Simplify the active expedition screen**
   - Establish the instruction/response/submit hierarchy and consolidate secondary actions without changing their semantics.
3. **S03 — Define the live adapter schemas and fixtures**
   - Separate proposal generation from state transition, add provider/failure fixtures, minimal context construction, and redacted error types.
4. **S04 — Implement the server-configured OpenAI-compatible adapter**
   - Add server-only configuration, bounded request/timeout behavior, structured parsing, no-tool enforcement, and deterministic fallback.
5. **S05 — Author transformation personas and signal-arc prompts**
   - Make transformed and unchanged voice contracts distinct and encode invitation, pursuit, and revelation requirements without copyrighted imitation.
6. **S06 — Integrate and harden live orchestration**
   - Add idempotency protection, safety validation, fallback selection, privacy disclosure, and archive-preserving recovery.
7. **S07 — Validate and prepare independent review**
   - Run the full suite, provider contract tests, browser checks, security audit, representative live-output evals, and independent agent review before human testing.

### Dependencies

- Human approval of this specification.
- One operator-controlled OpenAI-compatible endpoint, credential, and model identifier for manual validation.
- A model that can return the bounded structured proposal within acceptable latency.
- Existing safety schemas and deterministic fixtures remaining available.

### Affected areas

- `src/components/guide-experience.tsx`
- `src/app/globals.css`
- `src/app/api/expedition/turn/route.ts`
- `src/domain/engine.ts`, schemas, safety rules, fixtures, and tests
- New server-only adapter/configuration modules
- `.env.example` with names only and no credential values
- Playwright journeys and provider contract/evaluation fixtures
- Product disclosure and relevant architecture/adapter documentation

### Validation plan

#### Unit and contract tests

- Minimal provider context excludes unrelated archive records.
- Valid structured proposals parse; free text, tool calls, excess output, and malformed payloads fail closed.
- Transformation state changes the persona contract.
- Timeout, unavailable endpoint, rate limit, invalid output, and unsafe proposal select deterministic fallback once.
- Credentials and full observations are absent from errors and logs.
- Existing state-transition, safety, memento-grounding, and archive tests remain unchanged or stricter.

#### Integration tests

- Mock and live adapters implement the same proposal boundary.
- Provider calls cannot directly mutate state.
- A user action results in at most one provider call and one accepted transition.
- Refusal, pause, and stop do not make unintended provider calls.
- No-safe-instruction handling ends without corrupting the active archive.

#### Browser and accessibility tests

- Scene-relative hotspots at phone and desktop viewports.
- No object cards under the scene.
- Buddy art or intentional fallback in creation.
- Simplified hierarchy at 320px and 200% text sizing.
- Keyboard and screen-reader-equivalent room flow.
- Secondary actions remain discoverable in one activation.
- Provider wait, fallback, retry/recovery, pause, and stop states.

#### Human output tests

- Compare mock and live runs using the same initial setup.
- Judge whether transformation changes character, not merely art.
- Judge whether each live instruction feels specific, connected, achievable, and increasingly intriguing.
- Reject outputs that imitate protected dialogue or claim surveillance, destiny, conspiracy, or supernatural knowledge as fact.
- Confirm on a real phone that the current instruction dominates and controls no longer feel excessive.

### Required validation

- Focused checks during development: `npm test`
- Browser checks: `npm run test:e2e`
- Full gate before independent review: `npm run validate`
- A redacted live-provider evaluation record covering model identifier, reasoning setting if applicable, latency, token usage, tool calls, retries, schema outcome, safety outcome, fallback use, and human result.

### Stop conditions

Development must stop and return for human direction if it requires:

- browser-entered credentials or arbitrary user-supplied endpoints;
- accounts, hosted multi-user tenancy, or cross-device data;
- agent tools, precise location, travel, or background activity;
- an expedition schema or archive migration;
- weakening deterministic validation, refusal, pause, stop, or deletion;
- sending complete archives or unrelated personal memory to the provider;
- a copyrighted character, scene, quotation, or recognizable imitation to achieve the intended tone.

## Decisions

- Live AI integration is the next capability investment.
- The first integration is a server-configured generic OpenAI-compatible endpoint.
- The current deterministic mock remains required for testing and fallback.
- The room becomes one scene with embedded hotspots; the six-box object presentation is removed.
- Boundary setup shows the buddy, and the room scene uses the full available phone width.
- Collected items disappear from the scene; one inert curiosity item may join the elixir in ephemeral room inventory without adding a general inventory system.
- Transformation must alter AI behaviour and narrative framing.
- The expedition becomes a three-beat signal mystery while retaining stay-here safety constraints.
- The active screen is reduced to instruction, response, one primary action, and quiet secondary controls.
- Existing memento/archive behaviour stays intact, but enhancement is deferred.
- Existing minimal sound stays intact; further audio investment is deferred until the core game loop passes human testing.

## Assumptions

- “The memento experience can be parked” means preserve the current functioning memento and archive without expanding them in this iteration.
- A single operator-configured provider is enough to prove whether live intelligence brings the game to life.
- Provider calls may receive the current bounded expedition transcript after an explicit disclosure, but not unrelated archive history.
- The existing atlas contains usable object and buddy art; S01 may reposition or add an intentional fallback without commissioning a larger art set.

## Open questions for human approval

No question blocks approval if these defaults are acceptable:

1. Should live mode use an operator-owned key first? Default: yes; end-user key entry requires a separate security and UX specification.
2. Should the unchanged buddy use live AI too? Default: yes, with ordinary-buddy voice rather than expedition-persona voice.
3. Should “Something unexpected happened” remain a visible secondary link or be inferred from response text? Default: keep one visible secondary action for clarity and testability.
4. Should sound be expanded in this iteration? Default: no; prove scene interaction and AI-led play first.

## Source-of-truth decisions and conflicts

- `docs/architecture.md` remains authoritative: the application owns state and validation; the provider only proposes.
- `docs/specs/safety-model.md` remains authoritative for allowed and prohibited real-world actions.
- `docs/specs/expedition-state.md` remains authoritative for lifecycle, pause, refusal, stop, and the three-turn cap.
- `docs/specs/buddy-adapter.md` and ADR 0006 support the generic OpenAI-compatible adapter after the completed mock slice.
- The completed first-slice and pixel-opening specifications remain historical evidence and regression requirements; this specification supersedes their presentation direction only where explicitly stated.
- The earlier pixel-opening specification prohibited unrelated inventory objects. Human feedback on 2026-07-18 supersedes that constraint only for one inert, ephemeral curiosity item with no combination, persistence, or expedition effect.
- The existing first-slice specification prohibits live providers because they were outside that completed scope. This new specification deliberately introduces one bounded provider integration without changing the prior implementation record.
- The literal feedback that the memento “can't be parked” conflicts with the accompanying statement that it is acceptable and investment should move to the game. This specification preserves it unchanged and defers enhancement rather than removing it.
