# ADR 0006: Provider Integration Strategy

## Status

Proposed for review

## Recommendation

Build in this order:

1. deterministic mock buddy
2. generic OpenAI-compatible endpoint
3. documented Hermes connection
4. documented OpenClaw connection
5. hosted provider option, if the product later has funding

## Rationale

The generic endpoint gives the project the widest BYOK and BYOA surface without making the game engine depend on one agent. Hermes and OpenClaw can then be treated as personal-agent integrations with richer memory and workspace support.

The mock provider remains a permanent development and demo tool, not throwaway scaffolding.

## Constraints

- Provider credentials must not be exposed in the browser.
- The game engine must not inherit agent tools automatically.
- Memory must be passed explicitly or accessed through a defined archive interface.
- Every provider response must pass schema validation.
