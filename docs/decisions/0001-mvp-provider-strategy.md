# ADR 0001: MVP Provider Strategy

## Status

Proposed

## Decision

Build the first vertical slice against a deterministic mock buddy adapter. Define the production adapter around an OpenAI-compatible endpoint so user-controlled keys, local proxies, Hermes, and OpenClaw-style gateways can be supported without changing the game engine.

## Rationale

- Avoids paying inference costs during UI and state development.
- Makes demos reproducible.
- Keeps the architecture open to BYOA and BYOK.
- Separates game mechanics from provider-specific authentication.

## Consequences

- The first demo's intelligence is scripted or parameterised.
- Real provider integration is a follow-on task.
- The adapter contract must be designed carefully before implementation.
