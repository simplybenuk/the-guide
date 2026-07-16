# Project Context

## Identity and product purpose

- Vision: `README.md`, `life-game-concept.md`, and `docs/product-brief.md`
- Primary users: `docs/product-brief.md`
- Core domain concepts: `life-game-concept.md`, `user-experience.md`, and `docs/architecture.md`

## Source of truth

- Product requirements: `docs/product-brief.md` and `user-experience.md`
- Architecture: `docs/architecture.md`
- ADRs: `docs/decisions/`
- Database/schema: Not yet defined; planned state and adapter structures are described in `docs/specs/`.
- Domain rules: `docs/specs/expedition-state.md`, `docs/specs/safety-model.md`, and `docs/specs/buddy-adapter.md`
- Design system: Not yet defined; experience direction is in `user-experience.md` and `docs/ux/opening-and-expedition.md`.
- Planning/PRD: `docs/README.md` and `docs/tasks/mvp.md`
- Operational runbooks: Not yet defined.

## Existing features

- Shipped feature index: None; the repository is in ideation and planning.
- Active feature specs: `docs/specs/` and `docs/ux/opening-and-expedition.md`
- Deferred or archived work: Deferred decisions are recorded in the relevant documents under `docs/`; there is no separate archive.

## Security and permissions

- Tenancy model: Not yet defined; local-user or authenticated-user scoping remains an architecture decision.
- Roles and permissions: Not yet defined.
- Sensitive data: Provider credentials, personal memory, location information, expedition archives, and mementos.
- Required access checks: Not yet defined; follow the trust boundaries in `docs/architecture.md` and constraints in `docs/specs/safety-model.md`.

## Development workflow

- Package manager: Not yet defined.
- Validation commands: Not yet defined; there is currently no runnable implementation.
- Branch policy: Not yet defined.
- Commit/PR rules: Not yet defined.

## Documentation authority

- Precedence when sources conflict: `README.md` identifies this repository as the source of truth; approved decision records should govern their decisions, followed by the most specific current specification. Escalate unresolved conflicts.
- Freshness expectations: Planning documents are provisional until explicitly approved for build.
- Documents agents must not modify: None explicitly identified; preserve project documentation unless the task requires an approved, scoped change.
