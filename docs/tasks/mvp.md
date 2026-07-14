# MVP Task Plan

## Phase 0 — Decisions and setup

- [ ] Choose initial web stack.
- [ ] Choose whether the first repo requires accounts or anonymous local sessions.
- [ ] Choose the working name for the expedition persona.
- [ ] Define the mock provider response fixtures.
- [ ] Create initial application structure and environment example.

## Phase 1 — Core state and adapter

- [ ] Implement expedition state types and validation.
- [ ] Implement in-memory or SQLite state store.
- [ ] Implement mock buddy adapter.
- [ ] Implement adapter response schemas.
- [ ] Implement turn orchestration.
- [ ] Persist after each turn.

## Phase 2 — Mobile opening

- [ ] Build the illustrated arrival scene.
- [ ] Build new-buddy creation flow.
- [ ] Add existing-agent connection placeholder.
- [ ] Build boundary card.
- [ ] Build elixir ritual and transformation state.
- [ ] Add pause and stop controls.

## Phase 3 — Expedition loop

- [ ] Render one instruction at a time.
- [ ] Add free-text response field.
- [ ] Add Done, Not possible, Pause, and Stop actions.
- [ ] Show visible adaptation after a user response.
- [ ] Implement three-turn scripted expedition.
- [ ] Add refusal and unexpected-event branches.

## Phase 4 — Ending and continuity

- [ ] Build completion transition back to the buddy.
- [ ] Generate a reflection from structured state.
- [ ] Generate and display a memento.
- [ ] Save expedition index and memento.
- [ ] Add returning welcome using one prior detail.
- [ ] Add archive view with delete action.

## Phase 5 — Provider and safety spike

- [ ] Add OpenAI-compatible endpoint adapter.
- [ ] Add server-side credential handling.
- [ ] Add structured instruction validation.
- [ ] Add safe fallback prompts.
- [ ] Test with a locally controlled endpoint if available.

## Phase 6 — Travel mode experiment

- [ ] Add Stay here / Wander nearby / Go somewhere choice.
- [ ] Add explicit time and distance display.
- [ ] Define coarse location input.
- [ ] Add travel-specific safety rules.
- [ ] Test with simulated locations before real location services.

## Definition of done for the first demo

- A user can complete one expedition without developer intervention.
- The mock buddy produces a coherent three-turn journey.
- Free text changes the next instruction.
- The user can refuse, pause, or stop.
- A memento is created from actual user input.
- A returning session recognises a prior expedition.
- No provider secret is exposed in the browser.
