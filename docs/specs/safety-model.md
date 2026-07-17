# Safety Model

## Safety objective

The Guide proposes real-world actions, so safety is part of the game engine. The model may be imaginative, but it cannot be the only safety control.

## Hard constraints

Reject or replace instructions involving:

- dangerous roads, heights, water, fire, weapons, or machinery
- trespassing, evasion, illegal activity, or property interference
- harassment, coercion, deception, or filming people without appropriate consent
- medical, financial, or legal decisions presented as game tasks
- disclosure of passwords, private identifiers, or exact location
- unsafe solo travel or isolated destinations
- actions that require alcohol, drugs, or ingesting unknown substances

The elixir is always fictional.

## Validation inputs

The validator receives:

- current mode and location precision
- time remaining
- energy level
- explicit boundaries
- age or vulnerability flags if the product collects them
- instruction text and structured effort metadata
- whether the user is alone

## Response to unsafe proposals

1. Do not show the unsafe proposal.
2. Log a redacted validation event.
3. Ask the adapter for a safer alternative with the same narrative purpose.
4. If no safe alternative exists, end or redirect the expedition gracefully.

## User controls

- Stop must be available on every active screen.
- Refusal must never require explanation.
- Pause must prevent further model calls.
- Location sharing must be optional and revocable.
- The user can inspect and delete saved expedition data.

## Recommendation: curate action types before allowing free generation

For the first real-world build, permit a limited catalog of action families: observation, movement within a safe nearby area, writing, making, noticing, and reflection. Let the model fill in flavour and wording, but keep the action space bounded.
