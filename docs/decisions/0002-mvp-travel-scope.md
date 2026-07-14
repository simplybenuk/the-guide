# ADR 0002: Travel Scope for MVP

## Status

Proposed

## Decision

Stay-here mode is required for the first vertical slice. Travel mode is designed as a selectable extension and tested first with simulated locations or user-provided broad destinations.

## Rationale

The emotional core is the buddy, the transformation, the instruction, and the user's response. Requiring GPS would add privacy, platform, safety, and testing complexity before that loop is proven.

## Consequences

- The first demo can work indoors and without location permission.
- Travel remains a visible product promise rather than being forgotten.
- Real location APIs are deferred until the action validator and archive are stable.
