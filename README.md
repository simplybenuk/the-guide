# The Guide

An AI-powered, choose-your-own-adventure game for real life.

Choose a Guide personality, press **Go**, and let the character lead you through one memorable, useful action at a time.

## Status

The repository now contains two separate experiments:

- the hosted first vertical slice, where The Guide owns expedition state and validates model proposals; and
- a standalone static Elixir cabinet, where a player gives one transparent game cartridge to an AI they already use.

The Elixir cabinet is implemented and locally validated, but it is not published
or ready for human output testing. Live Codex evaluation supports an
experimental coding-agent label only; the required second live harness class is
still blocked by the available environment.

This repository is the single source of truth for The Guide. Product ideas,
the intended experience, and proposed implementation decisions are kept here
until the concept is approved for build.

## Project context

The initial product concept is documented in [life-game-concept.md](./life-game-concept.md).

The intended end-to-end user journey is documented in [user-experience.md](./user-experience.md).

The build planning pack is in [docs/README.md](./docs/README.md).

## Approved first vertical slice

- One created buddy and one temporary expedition role
- Lightweight time, energy, and boundary setup
- A deterministic three-turn stay-here expedition
- Completion, refusal, pause, stop, and unexpected-event branches
- Explicit state, validation, and safe fallback constraints
- A grounded reflection, memento, and private local archive

## Documentation map

- [Product concept](./life-game-concept.md) — the product idea, principles, and open questions.
- [User experience](./user-experience.md) — the end-to-end journey from arrival to returning home.
- [Planning pack](./docs/README.md) — proposed architecture, state, safety, adapter, UX, and MVP decisions.

The planning documents are intentionally provisional. They describe a possible
first vertical slice, not an implementation commitment.

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run the complete local validation suite with:

```bash
npm run validate
```

Build and inspect the separate static Elixir cabinet with:

```bash
npm run build:elixirs
npm run audit:elixirs
```

The generated site is written to `dist/elixirs-pages/`. Its browser suite is
available separately as `npm run test:e2e:elixirs`. The included GitHub Pages
workflow is manual-only; no deployment is authorized or performed by these
commands.

The end-to-end suite uses Playwright. On a new Linux environment, install its browser and system dependencies with `npx playwright install --with-deps chromium`.

## Design direction

The interface should feel like a clean, mysterious encounter with a responsive object: minimal, focused, and slightly theatrical. The mood draws from the sense of possibility in Zoltar, the cryptic invitation of the white rabbit, and the intimate responsiveness of Tom Riddle's diary—without copying their visual designs.

The user can surrender the burden of deciding what happens next, but control is always reversible. Adventures must be achievable, paced one action at a time, and responsive to refusal, changing energy, and real-world boundaries.

At its heart, The Guide is a human/AI buddy game: the user goes on an adventure or holiday with an AI that already exists as a companion, or creates and personifies one before the journey begins.

The opening should feel like an expedition ritual. The user inserts or connects their buddy, establishes a few boundaries, and starts the journey. The interface should wake up around that buddy rather than opening as a conventional settings screen or chat window.

The product should support bring-your-own-agent use without requiring The Guide
to receive provider credentials. The static Elixir experiment tests the simplest
version of that idea: the user's chosen harness owns the conversation and model
access, while The Guide publishes transparent, bounded game content. The hosted
prototype remains a separate reference implementation with stronger
application-owned state and validation.

The visual direction is a minimal point-and-click adventure: playful, strange, lightly spooky, and dryly funny. The buddy enters with the user, drinks a fictional elixir, and is temporarily transformed into an expedition persona. The ritual marks the start of the expedition and keeps the game world distinct from ordinary assistant use.

The product is mobile-first. The opening should resemble the start of a point-and-click adventure in portrait orientation: one illustrated scene, one buddy, one elixir, and one obvious thumb-friendly action.

Travel can be an optional expedition mode. The user chooses whether to stay put, wander nearby, or go somewhere, and the buddy turns the real world into a field of discoveries while respecting time, distance, safety, and location privacy.

The architecture should keep the game layer separate from the model layer so the product can eventually support different providers or user-selected models. A ChatGPT subscription should not be assumed to provide API access or transferable private memory; those are separate concerns.

Conceptually, The Guide is an AI harness for play: it gives a personal AI buddy a temporary role, a bounded world, a narrative arc, persistent mementos, and safe rules for interacting with a human.

## License

License to be decided.
