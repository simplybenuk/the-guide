# The Guide

An AI-powered, choose-your-own-adventure game for real life.

Choose a Guide personality, press **Go**, and let the character lead you through one memorable, useful action at a time.

## Status

Early concept and planning. Implementation has not started yet.

## Project context

The initial product concept is documented in [life-game-concept.md](./life-game-concept.md).

## Planned MVP

- Six Guide personalities
- Lightweight time and context setup
- One-action-at-a-time adventure progression
- Completion, refusal, and unexpected-event branches
- Explicit adventure state and safety constraints
- Final reflection and a small adventure history

## Getting started

This repository is currently documentation-first. Implementation instructions will be added when the technology stack is selected.

## Design direction

The interface should feel like a clean, mysterious encounter with a responsive object: minimal, focused, and slightly theatrical. The mood draws from the sense of possibility in Zoltar, the cryptic invitation of the white rabbit, and the intimate responsiveness of Tom Riddle's diary—without copying their visual designs.

The user can surrender the burden of deciding what happens next, but control is always reversible. Adventures must be achievable, paced one action at a time, and responsive to refusal, changing energy, and real-world boundaries.

At its heart, The Guide is like going on an adventure or holiday with your personal agent: the agent is a travelling companion with memory and a point of view, while the user remains free to change course or go home.

The opening should feel like an expedition ritual. The user inserts or connects their agent, establishes a few boundaries, and starts the journey. The interface should wake up around that companion rather than opening as a conventional settings screen or chat window.

The initial product should be local-first and support bring-your-own-agent or bring-your-own-key usage. A future hosted plan could provide model access for convenience, but the core experience should not depend on us paying inference costs for every player.

The visual direction is a minimal point-and-click adventure: playful, strange, lightly spooky, and dryly funny. The companion enters with the user, drinks a fictional elixir, and is temporarily possessed by the Game Master. The ritual marks the start of the expedition and keeps the game world distinct from ordinary assistant use.

The architecture should keep the game layer separate from the model layer so the product can eventually support different providers or user-selected models. A ChatGPT subscription should not be assumed to provide API access or transferable private memory; those are separate concerns.

## License

License to be decided.
