# ADR 0004: Prototype Stack and Session Strategy

## Status

Proposed for review

## Recommendation

Use a TypeScript mobile-first web app with a lightweight server-side orchestration layer. Start with anonymous or local sessions for the prototype; add accounts only when cross-device continuity or hosted archive sync becomes necessary.

## Suggested shape

- React-based mobile web UI
- TypeScript throughout
- Server routes for orchestration and provider calls
- Simple local development database or SQLite-compatible store
- No required account before the first expedition

## Rationale

This keeps the first build fast and reduces friction at the exact moment when the user should be entering the world. It also avoids building account, password, and social infrastructure before we know whether the expedition loop is compelling.

## Revisit when

- users need to continue an expedition across devices
- a hosted archive is introduced
- users need to manage several buddies
- sharing mementos becomes a core feature
