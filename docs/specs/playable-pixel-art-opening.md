# The Guide — Playable Pixel-Art Opening Specification

## Status

**READY FOR HUMAN TESTING**

This specification was approved by the repository owner on 2026-07-17. P01–P09 passed the complete validation gate and independent agent review on 2026-07-17; the presentation and interaction vertical slice is ready for human output testing.

## Objective and scope

Transform the existing mobile-first journey into an original, web-accessible 1990s adventure-game experience while preserving the working buddy creation, boundaries, elixir choice, three-turn expedition, ending, and archive.

The slice proves the direction with one polished playable room, a tactile elixir interaction, a short transformation, and a consistent pixel-art treatment through the expedition and ending. It must add delight without placing a puzzle between the user and the real-world expedition.

## Problem and desired outcome

The implemented flow is coherent and usable, but its modern typography, abstract objects, rounded panels, and conventional forms do not deliver the nostalgic game identity described by the product direction.

The desired outcome is:

> This feels like discovering a strange, forgotten adventure game, but it works naturally on my phone and leads into my real life.

The opening should communicate its interaction within 30 seconds, make picking up and using the fictional elixir feel consequential, and keep refusal, pause, stop, and data controls immediately understandable.

## Actors

### Primary actor

An adult first-time or returning user on a phone or desktop browser who wants a playful expedition with their created AI buddy. No familiarity with point-and-click games is assumed.

### Secondary actor

A keyboard or assistive-technology user who must receive the same information, choices, and outcomes without depending on pixel precision, hover, animation, sound, or colour.

### Future actors outside this slice

- Players exploring multiple rooms or longer digital game sequences.
- Players using generated buddy appearances.
- Players connecting external agents or providers.
- Players using travel, shared, or social modes.

## Goals

- Preserve every accepted behaviour and safety guarantee of the first vertical slice.
- Establish a coherent, original Amiga-era point-and-click visual identity with C64-inspired palette and sound constraints.
- Turn the elixir ritual into a simple playable sequence: find, pick up, use, transform, depart.
- Keep the interaction discoverable with contextual actions suitable for touch, mouse, and keyboard.
- Reframe setup, expedition, ending, and archive as parts of the same game world rather than modern application panels.
- Make the experience recognisably retro with sound disabled and reduced motion enabled.
- Let returning users bypass repeated room interactions and begin quickly.
- Add optional, user-controlled sound without making audio necessary for comprehension.

## Non-goals

- Multiple explorable rooms, free character movement, pathfinding, scrolling maps, combat, health, scoring, failure states, collectibles, or reflex challenges.
- A general inventory or puzzle engine.
- Complex item combinations or interactions that can block expedition entry.
- Exact emulation of Amiga, C64, SCUMM, Zelda, or any commercial game engine.
- Copied characters, environments, interface layouts, fonts, music, sound effects, dialogue, or other protected assets.
- Generated buddy art or user-uploaded avatars.
- Changes to expedition domain schemas, branching, safety validation, persistence, provider boundaries, or archive ownership.
- Live providers, accounts, travel, location, sharing, or cross-device sync.
- Making buddy creation itself a navigable room; it remains a short sequence presented through in-world dialogue.

## Functional requirements

### FR-1: Preserve the implemented journey

1. All acceptance criteria in `docs/specs/first-vertical-slice.md` remain applicable unless this specification explicitly changes presentation.
2. Existing local archives must remain readable; no storage reset or migration may be required for this slice.
3. Buddy creation, boundary selection, transformed and unchanged expedition paths, Done, unexpected event, Not possible, pause, resume, stop, ending, archive deletion, and returning recognition must retain their current semantics.
4. A presentation failure must not bypass action validation or mutate expedition state incorrectly.

### FR-2: Original visual system

1. The experience must use an original pixel-art treatment inspired by late-1980s/early-1990s home-computer adventures.
2. The rendered scene must use hard pixel edges, nearest-neighbour image scaling, a deliberately limited palette, strong silhouettes, and restrained frame animation.
3. The primary world artwork must not be approximated solely with gradients and modern card components.
4. Text must use a readable, appropriately licensed bitmap-style face or an original/system fallback; body copy must remain legible at a 320 CSS-pixel viewport without browser zoom.
5. Modern rounded cards and soft drop shadows must not be the dominant visual language. Dialogue boxes, inventory slots, menus, and controls should use squared or stepped pixel borders.
6. The treatment must remain coherent across arrival, buddy creation, boundaries, playable room, expedition, pause, ending, and archive.
7. Copyright and licence provenance must be recorded for every non-code asset and font.

### FR-3: Room composition

1. The opening room must contain one ordinary buddy sprite, one elixir object, one inactive departure element such as a sealed door or dormant portal, and at least two optional inspectable environmental objects.
2. The buddy and elixir must be visually distinct at phone size without relying on hover labels.
3. The departure element must visibly change after the elixir decision to show that the expedition can begin.
4. Optional environmental objects may provide short atmospheric lines but must not alter domain state or block progress.
5. The room must fit in portrait orientation without horizontal scrolling. Desktop may expand the framing but must not add required interactions.
6. The scene must preserve an obvious route to pause, leave, or access sound preferences where those controls are relevant.

### FR-4: Contextual interaction grammar

1. The slice must use contextual tap/click actions rather than a persistent verb grid.
2. Activating an object must expose or immediately perform one obvious contextual action, such as Inspect, Pick up, Give, Drink, or Begin.
3. The elixir sequence must support these conceptual states: available, selected/carried, offered, and resolved. These are presentation states and must not be added to the persisted expedition domain model.
4. A compact inventory slot must display the elixir after pickup and clear it after the elixir decision.
5. The inventory must not accept unrelated objects or support item combinations in this slice.
6. Interactive hotspots must be at least 44 by 44 CSS pixels even when their visible sprite is smaller.
7. Focus, selection, available action, and resolved state must each be visually distinguishable without colour alone.
8. Touch must not require hover, double-tap, drag-and-drop, long press, or pixel-perfect targeting.

### FR-5: Elixir ritual and bypass

1. A first-time user must be able to complete the room by activating the elixir, picking it up, selecting the buddy, and choosing either **Let it drink** or **Keep the buddy unchanged**.
2. The interface must explicitly state before the decision that the elixir is fictional and nothing real is consumed.
3. Choosing **Keep the buddy unchanged** must activate departure and start the same unchanged expedition path supported today.
4. The interaction may not contain an incorrect choice, fail state, hidden prerequisite, or mandatory optional inspection.
5. The entire required room sequence must be completable in at most four primary activations after the room appears.
6. A clearly named **Begin ritual** shortcut must be available from the room and open the same explicit transformed/unchanged choice without requiring item play.
7. Returning users with a buddy must be offered a direct **Begin another expedition** path before or within the room; choosing it may bypass pickup but must not bypass boundary review or the elixir choice.

### FR-6: Transformation and departure

1. Choosing transformation must produce a short buddy-state change using an original sprite variant, palette shift, or similarly legible visual change.
2. The transformed and unchanged paths must remain visually distinguishable during the expedition.
3. The sequence must complete within 10 seconds and provide a skip action whenever it lasts longer than 2 seconds.
4. With reduced motion enabled, the final state must appear without flashes, camera shake, rapid scaling, or multi-frame movement.
5. The door, portal, or map activation must be understandable with animation and sound disabled.
6. Transformation visuals are fictional framing and must not suggest possession, intoxication, real substances, or loss of user control.

### FR-7: Buddy creation and boundary presentation

1. Existing fields and choices must be presented as in-world dialogue, character creation, or a boundary parchment without increasing required decisions.
2. Native form semantics, labels, validation messages, and keyboard behaviour must be preserved even when controls are visually customised.
3. The boundary summary must remain reviewable before expedition state is created.
4. The statement that the user can refuse, pause, or stop at any time must remain plainly readable.
5. Error and recovery screens must favour clarity over immersion and must not hide destructive consequences.

### FR-8: Expedition, ending, and archive treatment

1. The expedition must retain one visible instruction and free-text response at a time without becoming a scrolling chat.
2. The current instruction must be presented through a game-world dialogue or quest panel with sufficient space for the longest supported fixture content.
3. Done, Something unexpected happened, Not possible, Pause, and Stop must retain explicit accessible text; icons alone are insufficient.
4. The ordinary or transformed buddy sprite must remain present as the speaking companion, but decorative animation must not delay response entry.
5. The ending must visibly return the transformed buddy to its ordinary sprite before revealing the memento.
6. The memento and archive may be framed as field notes, postcards, maps, or cabinet items, while preserving truthful content and deletion controls.
7. Progress, effort, privacy, error, and destructive-action information must meet or exceed current legibility.

### FR-9: Sound and music

1. The slice must include a small set of original or appropriately licensed effects for item pickup, elixir resolution, and departure activation.
2. Sound must begin only after a user activation and must comply with browser autoplay restrictions.
3. A persistent, clearly labelled sound toggle must be reachable from every screen that can play audio. The default before first activation is silent.
4. Sound preference may be stored locally but must not be added to expedition archives or sent to the server.
5. No cue, state change, instruction, warning, or success condition may be communicated by sound alone.
6. A looping background track is optional for this slice and may ship only if it is original or appropriately licensed, loops cleanly, has an independent music toggle, and does not delay the required implementation.
7. Audio playback failure must be silent and non-blocking.

### FR-10: Accessibility and responsive behaviour

1. Every hotspot and inventory action must be a semantic button or equivalent keyboard-operable control with an accessible name.
2. Keyboard focus order must follow the visual and narrative order. Focus must be moved deliberately when changing from room, choice, transformation, instruction, pause, and ending states.
3. Inspect text and game-state changes must be announced through an appropriate live region without repeatedly announcing decorative content.
4. Focus indicators must remain visible against every supported scene palette.
5. Text contrast, control contrast, target size, error association, and form labelling must meet WCAG 2.2 AA expectations.
6. At 320 by 568 CSS pixels, required content and controls must remain operable without horizontal scrolling or overlap.
7. At 200% browser text zoom, primary actions, safety controls, and form content must remain available; artwork may crop or reduce to preserve them.
8. Reduced-motion behaviour must be covered by automated tests. A static scene is an acceptable equivalent experience.
9. A non-visual user must receive object names, current inventory, available contextual action, transformation result, and departure state in text.

## Proposed design

### Presentation architecture

Keep `GuideExperience` as the owner of product-flow state and existing domain operations. Introduce small presentation components for the pixel scene rather than a canvas or general game engine:

```text
GuideExperience
  ├── GameShell
  │    ├── PixelScene
  │    ├── DialogueBox
  │    ├── ContextAction
  │    ├── InventorySlot
  │    └── AudioControls
  ├── BuddyCreationScene
  ├── BoundaryScene
  ├── ElixirRoom
  ├── ExpeditionScene
  ├── ReturnScene
  └── CabinetScene
```

Use semantic HTML and React state for interactions. Do not add canvas, WebGL, physics, pathfinding, or a third-party game engine for this bounded room.

### Presentation state

The room may use an ephemeral union similar to:

```text
room_ready -> elixir_selected -> elixir_offered -> choice_open -> resolved
```

Reloading before expedition creation may safely return the room to `room_ready`; no material user data is lost. Once the user resolves the elixir choice, the existing expedition creation path remains the system of record.

### Asset strategy

- Ship a deliberately small original asset set: one room background, ordinary and transformed buddy sprites, elixir sprite, departure states, two environmental props, inventory icon, and minimal UI tiles.
- Prefer sprite sheets or individual lossless raster assets at a documented base resolution, displayed only at integer scale where practicable.
- Use `image-rendering: pixelated` and avoid smoothing transformations.
- Reserve CSS for layout, focus, responsive framing, and UI tiles; use authored raster art for the main scene and characters.
- Store asset source, author, licence, and export scale in an asset manifest alongside the assets.

### Mobile layout

Use three responsive zones:

1. A scene viewport occupying the upper portion of the screen.
2. A dialogue/action region containing current narration or choice.
3. A compact inventory and system-control strip kept within thumb reach.

On short viewports, the scene may crop vertically or become shallower. Required dialogue, forms, current instruction, and safety controls take precedence over decorative art.

### Interaction copy

Use short contextual labels and dry atmospheric responses. Required safety and consent language remains literal. Optional inspections should reward attention with tone or world-building but must not create a content dependency.

## Security, privacy, and safety constraints

- Pixel-art presentation does not change the browser, model, server, or local archive trust boundaries in `docs/architecture.md`.
- Decorative object interactions must never call the turn API, create an expedition, or write personal archive data.
- Only the explicit elixir resolution may call the existing expedition-creation operation.
- User-derived names and responses must continue to render as text, never executable markup.
- No remote asset, font, analytics, audio, or content service may be introduced without separate review of its data and availability implications.
- The sound preference is non-sensitive local UI state and must be independently deletable with normal browser data.
- The fictional-elixir and no-real-ingestion requirements in `docs/specs/safety-model.md` remain binding.
- Stop, refusal, and boundary controls may be visually themed but must never be hidden behind an in-world puzzle.

## Rollout and recovery

1. Implement behind a local presentation flag or isolated component boundary until the complete flow passes validation.
2. Preserve the existing component and CSS until the new arrival-to-ending path passes automated tests and human visual review; removal is a downstream implementation decision.
3. Test with existing local archive fixtures before enabling the new shell by default.
4. If an asset fails to load, display a readable text fallback with fully functional controls.
5. If audio fails or is blocked, continue silently without warning unless the user explicitly attempts to enable it.
6. If the room-state interaction fails, **Begin ritual** must remain a functional escape hatch into the existing explicit choice.
7. No data migration or destructive reset is permitted under this specification.

## Acceptance criteria

The slice is ready for independent agent review when all of the following are true:

1. The full accepted first-slice end-to-end journey still passes with existing local archive data.
2. At 390 by 844 CSS pixels, a first-time user can create a buddy, review boundaries, pick up the elixir, offer it to the buddy, choose either outcome, and reach the first instruction without assistance.
3. The required room interaction takes no more than four primary activations, and the **Begin ritual** shortcut reaches the same explicit choice.
4. A returning user can begin another expedition without replaying optional room interactions while still reviewing boundaries and making the elixir choice.
5. The room visibly contains the buddy, elixir, departure element, and two optional inspectable objects; optional objects never block progress or mutate expedition state.
6. The experience is recognisably pixel-art-led with sound disabled, reduced motion enabled, and hover unavailable.
7. Transformed and unchanged paths are visually distinct, and the ending returns a transformed buddy to its ordinary appearance.
8. The static reduced-motion transition communicates the same transformation and departure result.
9. Elixir, buddy, departure, inventory, and system controls are keyboard operable, have accessible names, expose state textually, and provide at least 44 by 44 CSS-pixel targets.
10. At 320 by 568 CSS pixels and 200% text zoom, required controls do not overlap, disappear, or require horizontal scrolling.
11. Pickup, resolution, and departure effects never autoplay before interaction; sound-off state persists locally; blocking audio does not block play.
12. All safety, privacy, error, pause, refusal, stop, deletion, and recovery information remains explicit and accessible.
13. No protected commercial-game asset or unrecorded third-party asset is present; the asset manifest accounts for every shipped visual, font, and sound resource.
14. No expedition schema, archive format, state transition, safety rule, or API contract changes are required.
15. `npm run validate` passes, including updated mobile Playwright coverage.

## Development-readiness bundle

### Proposed task outline

This outline is for downstream development planning after human approval and does not modify `docs/tasks/mvp.md`.

1. **P01 — Establish pixel presentation primitives and asset manifest**
   - Add palette, bitmap typography, pixel borders, responsive game shell, reduced-motion rules, and licence/provenance manifest.
2. **P02 — Author and integrate the bounded original asset set**
   - Create the room, buddy variants, elixir, departure states, props, inventory icon, and UI tiles at documented base resolutions.
3. **P03 — Build the semantic playable elixir room**
   - Implement hotspots, contextual actions, inventory state, optional inspections, ritual shortcut, keyboard flow, and textual equivalents.
4. **P04 — Reframe buddy creation and boundaries**
   - Apply the in-world dialogue and boundary-card presentation without changing inputs, validation, or semantics.
5. **P05 — Implement transformation and departure presentation**
   - Add transformed/unchanged visual states, reduced-motion equivalent, skip behaviour, and expedition handoff.
6. **P06 — Reskin expedition, pause, ending, and archive**
   - Carry the visual system through the complete journey while preserving all controls and data behaviour.
7. **P07 — Add bounded audio and preferences**
   - Add original/licensed effects, opt-in playback, persistent sound preference, error handling, and optional independently controlled music if ready.
8. **P08 — Expand automated accessibility and responsive tests**
   - Cover room branches, shortcut, keyboard navigation, reduced motion, blocked audio, small viewport, returning bypass, and state preservation.
9. **P09 — Run full validation and prepare independent review**
   - Run the complete suite, audit asset provenance, capture representative mobile/desktop states, and hand off to `bwh-agent-review`.

### Dependencies

- Human approval of this specification.
- Original art and audio production or appropriately licensed assets with recorded provenance.
- A readable, redistributable bitmap-style font or an acceptable system-font fallback.
- Existing first-vertical-slice behaviour and tests remaining stable.

### Affected areas

- `src/components/guide-experience.tsx` and new presentation components.
- `src/app/globals.css` or a split pixel presentation stylesheet.
- New local visual, font, and audio assets plus an asset manifest.
- `tests/e2e/guide.spec.ts` and focused presentation-state tests.
- UX documentation if implementation reveals a necessary, human-approved refinement.

### Stop conditions for development

- Stop if the proposed implementation requires expedition schema or archive migration.
- Stop if an asset's ownership or redistribution rights cannot be established.
- Stop if audio requires a remote service, tracking, or a changed content-security boundary.
- Stop if mobile accessibility requires replacing contextual interaction with a materially different interaction model; return to specification refinement.
- Stop if preserving the existing journey conflicts with the playable-room design rather than silently removing behaviour.

## Validation plan

### Automated component and unit validation

- Every presentation-state transition, including ritual shortcut and both elixir outcomes.
- Optional inspections do not create expedition state or archive writes.
- Exactly one expedition is created after elixir resolution despite repeated activation.
- Sound preference storage and unavailable-audio fallback.
- Reduced-motion state resolves immediately to the correct visual outcome.
- Asset-manifest entries are present for shipped asset types.

### End-to-end validation

- First-time transformed journey through item pickup.
- First-time unchanged journey through item pickup.
- Ritual-shortcut journey.
- Returning-user quick path with boundary review.
- Keyboard-only room and expedition flow.
- Touch-target measurements on the mobile project viewport.
- Reduced-motion and sound-disabled journey.
- Pause/refresh/resume, refusal, stop, unsafe-boundary redirect, ending, return recognition, and archive deletion regression coverage.
- 320 by 568 small-viewport smoke coverage and representative 200% zoom inspection.

### Manual visual and audio validation

- Human review on a real phone and desktop for clarity, nostalgic character, thumb reach, text legibility, focus visibility, and whether the room feels playable rather than decorative.
- Human verification that transformed and unchanged states read clearly without sound.
- Human verification that effects are appropriately restrained and that music, if included, loops unobtrusively.
- Human output testing remains required after independent agent review; automation cannot approve the aesthetic outcome.

### Required commands

- Focused development checks: `npm test`
- Browser checks: `npm run test:e2e`
- Full validation before agent review: `npm run validate`

## Decisions recorded by this specification

- Use an expressive Amiga-era point-and-click visual target, with C64 influence limited to palette and audio character.
- Use contextual object actions, not a persistent verb grid.
- Provide both item-play and a direct ritual shortcut.
- Let returning users bypass optional room play but not boundary review or the elixir decision.
- Use a small authored buddy sprite set for the bounded slice; generated appearances are deferred.
- Require sound effects but make background music conditional on a ready original/licensed loop.
- Use semantic DOM and React state rather than a canvas or game engine.
- Keep room state ephemeral and preserve existing expedition and archive contracts.

## Assumptions

- The user's “Commodore Amiga 64” direction refers to the nostalgic home-computer era rather than exact hardware emulation.
- A single shared ordinary buddy sprite with one transformed variant is sufficient to prove the art direction; additional selectable appearances can be added only if they fit the bounded asset task without changing flow.
- Existing local archives contain no presentation-specific data and therefore require no migration.
- The existing deterministic content remains suitable while presentation changes are tested.
- Optional music is less important than tactile effects, visual coherence, and interaction accessibility.

## Open questions

No question blocks human approval. The following may be resolved during implementation within the constraints above:

- Final original palette, base sprite resolution, and exact room composition.
- Whether the departure object is a door, portal, or map device.
- Final inspection lines and transformation copy.
- Whether an original looping music track is ready without delaying the slice.
- Whether the bounded art task can safely include more than one ordinary buddy appearance.

## Source-of-truth decisions and conflicts

- `docs/specs/first-vertical-slice.md` remains authoritative for implemented behaviour, safety, data, and acceptance guarantees.
- `docs/architecture.md` remains authoritative for trust boundaries; this specification introduces no architectural change.
- `docs/specs/safety-model.md` remains authoritative for the fictional elixir and real-world action constraints.
- `docs/product-brief.md`, `user-experience.md`, and `docs/ux/opening-and-expedition.md` support the game-like, mobile-first, one-action-at-a-time direction.
- The README describes the current design as minimal and mysterious, while the discovery brief calls for a substantially more explicit pixel-art identity. These are compatible at the interaction-principle level, but the new approved specification should become the more specific authority for visual presentation.
- The UX document mentions save, edit, share, and replay at the ending, while the approved first-slice specification defers edit, share, and replay. This slice preserves the approved deferral.
