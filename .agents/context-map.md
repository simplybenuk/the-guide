# Project context

## Identity and product purpose

- Vision and primary users: `README.md`, `docs/product-brief.md`
- Active architecture: `docs/architecture.md`
- Canonical game content: `content/elixirs/`

## Sources of truth

- Product requirements: `docs/product-brief.md`
- Cartridge/cabinet contract: `docs/specs/elixir-cartridge-and-first-cabinet.md`
- ChatGPT-first delivery and local event contract:
  `docs/specs/chatgpt-first-elixir-delivery.md`
- Self-contained ChatGPT and experimental pinned resolver delivery:
  `docs/specs/elixir-use-without-installing-delivery.md`
- Active repository boundary: `docs/specs/elixir-first-repository-pivot.md`
- Architecture and trust boundaries: `docs/architecture.md` and
  `content/elixirs/covenant.md`
- Planning: `docs/tasks/mvp.md`
- Compatibility evidence: `docs/evaluations/elixir-harness-matrix.md`
- Delivery review evidence:
  `docs/evaluations/chatgpt-first-delivery-review.md`
- Artwork provenance: `site/elixirs/assets/cartridges/manifest.json`

## Active implementation

- Canonical content: `content/elixirs/`
- Build, schema, audit, serving, and evaluation: `scripts/elixirs/`
- Static presentation and art: `site/elixirs/`
- Browser journeys: `tests/elixirs/`
- Manual Pages packaging: `.github/workflows/elixirs-pages.yml`

## Archive

The retired hosted prototype is not active source. Its recovery index is
`docs/archive/hosted-prototype/README.md`; the exact snapshot is the
`hosted-prototype-final` Git tag.

## Security and permissions

- The Guide receives no gameplay transcript, provider credential, boundary, or
  memento through the static handoff flow.
- A cartridge is an instruction contract, not an enforceable sandbox.
- Gameplay requests no agent tools or external side effects.
- Compatibility claims require completed redacted evidence and remain
  class/version scoped.
- External publication, deployment, releases, tag changes, and other external
  writes require explicit human authorization.

## Development workflow

- Package manager: npm
- Local preview: `npm start`
- Focused tests: `npm test`
- Browser tests: `npm run test:e2e`
- Full validation: `npm run validate`
- Generated output: `dist/elixirs-pages/` (not committed)

## Documentation authority

When sources conflict, the most specific approved active specification governs,
followed by architecture and product brief. Archived files are historical
evidence only and must not override active Elixir sources.
