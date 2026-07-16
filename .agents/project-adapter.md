# Project Adapter

## Project

- Name: The Guide
- Repository: https://github.com/simplybenuk/the-guide.git
- Context map: `.agents/context-map.md`

## Required tools and validation

- Discovery tools: Repository file inspection and search (`rg`, `rg --files`, and Git read-only commands).
- Source-of-truth inspection: Start with `README.md`, then follow `.agents/context-map.md` to the relevant product, architecture, decision, specification, UX, and task documents.
- Focused tests: Not yet defined; implementation has not started.
- Full validation: Not yet defined; implementation has not started.
- Browser or smoke checks: Not yet defined; there is currently no runnable application.

## Local guardrails

- Security and tenancy: Follow the trust boundaries in `docs/architecture.md` and safety requirements in `docs/specs/safety-model.md`; a final tenancy model is not yet defined.
- Data handling: Treat expedition archives and mementos as private and user-owned; follow the explicit-memory and secret-handling constraints in project specifications.
- Scope exclusions: Respect the non-goals in `docs/product-brief.md` and deferred work recorded in the planning documents.
- External-write approvals: Not documented; obtain human approval before external writes, publishing, releases, or other irreversible actions.

## Planning and delivery

- Spec location and format: Product and engineering specifications are Markdown files under `docs/specs/`; UX specifications are under `docs/ux/`.
- PRD/task schema: The current MVP task plan is `docs/tasks/mvp.md`; no formal task schema is defined yet.
- Progress log: Not yet defined.
- Branch and commit policy: Not yet defined.
- Review and release policy: Not yet defined.
