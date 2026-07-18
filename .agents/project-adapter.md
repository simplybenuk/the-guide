# Project adapter

## Project

- Name: The Guide
- Repository: https://github.com/simplybenuk/the-guide.git
- Context map: `.agents/context-map.md`

## Required tools and validation

- Inspect with `rg`, `rg --files`, and read-only Git commands.
- Start with `README.md`, then load the smallest relevant sources from the
  context map.
- Focused tests: `npm test`.
- Static build: `npm run build`.
- Artifact audit: `npm run audit:elixirs`.
- Browser validation: `npm run test:e2e`.
- Full validation: `npm run validate`.
- Local preview: `npm start`; the unauthenticated server listens on all
  interfaces for headless development and requires firewall or SSH protection.

## Local guardrails

- Follow `docs/architecture.md` and `content/elixirs/covenant.md` for authority,
  safety, privacy, tools, grounding, and role-release boundaries.
- Cartridge, artwork, covenant, and evaluation evidence changes require focused
  version/provenance review; never silently mutate published-version behavior.
- Do not claim compatibility beyond the named class, harness, cartridge version,
  and complete redacted evidence.
- The hosted prototype is retired historical evidence at
  `hosted-prototype-final`, not an active fallback or implementation source.
- Public deployment, release, domain changes, tag changes, and other external
  writes require explicit human authorization.

## Planning and delivery

- Discovery briefs: `docs/discovery/`.
- Specifications: `docs/specs/`.
- Active plan: `docs/tasks/mvp.md`.
- Compatibility and review evidence: `docs/evaluations/`.
- Generated artifacts are disposable and must not be committed.
- Commits and pushes require user or workflow authorization.
- Independent agent review is required before human output testing or cleanup
  PR handoff.
