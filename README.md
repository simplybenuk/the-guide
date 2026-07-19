# The Guide

The Guide is a cabinet of transparent, portable role-play games for you and an
AI companion you already use.

Choose an **Elixir**, give its versioned Markdown cartridge to your agent by URL,
file, or copied text, and let the agent temporarily run the game inside your
existing conversation. The Guide needs no provider credential, account,
transcript, or application server.

## Status

The static catalogue contains four experimental first-party Elixirs: Signal,
Mystery, Story, and The Regency Ball. A strict registry binds immutable releases to exact bytes
and paths; local search, filters, editorial collections, and explainable related
items use only public catalogue metadata and send no search or gameplay data.
Local implementation and artifact validation are complete.
Live Codex evidence supports the experimental `coding_agent` class only. One
owner-observed ChatGPT attempt failed to retrieve the public Pages cartridge,
using the ChatGPT mobile app on a Plus account in Instant mode. The underlying
model identifier was not exposed, and this is not a complete evidence run or
compatibility pass. The Regency Ball currently has zero live harness runs. It
is published specifically so the owner can collect evidence, and must complete
its versioned evaluation in two named harness classes—including at least one
consumer or personal-agent class—before compatibility promotion or a formal
human-testing readiness verdict.

The former hosted Next.js prototype is retired. Its final snapshot is preserved
at the `hosted-prototype-final` Git tag and documented in
[the archive index](./docs/archive/hosted-prototype/README.md).

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
npm start
```

Open `http://127.0.0.1:4173/`. The preview server listens on all interfaces to
support headless remote development. It has no authentication or TLS; protect
remote access with a firewall or SSH tunnel and do not treat it as a production
deployment.

Useful commands:

```bash
npm run build       # generate dist/elixirs-pages
npm run validate    # run the complete active-product suite
npm run audit:elixirs
npm run audit:releases -- --base-revision=<40-character-reviewed-commit> --bootstrap-ledger-sha256=<externally-approved-release-sha256> --approved-withdrawals-sha256=<externally-approved-withdrawal-sha256>
```

## How it works

- `content/elixirs/` contains the canonical covenant and cartridges.
- `content/catalogue/` contains publisher, immutable release, taxonomy,
  collection, lifecycle, and discovery records.
- `site/elixirs/` contains the cabinet presentation and original artwork.
- `scripts/elixirs/` validates, builds, audits, serves, and evaluates Elixirs.
- `tests/elixirs/` verifies the static cabinet at root and repository subpaths.
- `templates/story-elixir/` contains the reviewed per-story authoring and
  release-evidence starter kit.
- `.github/workflows/elixirs-pages.yml` packages the audited artifact through a
  manual-only Pages workflow. It fails closed unless the externally controlled
  `ELIXIR_LEDGER_BASE_REVISION`, `ELIXIR_BOOTSTRAP_LEDGER_SHA256`, and
  `ELIXIR_APPROVED_WITHDRAWALS_SHA256` repository variables are configured,
  and it does not deploy on push or pull request.

Every cartridge discloses its duration, demands, inputs, capability boundary,
and data behavior before asking the player for affirmative consent. Gameplay is
conversation-only, one move at a time, with refusal, pause, changed boundaries,
immediate stop, grounded endings, and explicit role release.

The cartridge is an instruction contract, not an enforceable sandbox. The
chosen harness owns model behavior, permissions, memory, and conversation data.
Compatibility labels therefore remain limited to completed evidence.

## Documentation

- [Product brief](./docs/product-brief.md)
- [Architecture](./docs/architecture.md)
- [Cartridge and cabinet specification](./docs/specs/elixir-cartridge-and-first-cabinet.md)
- [Current development plan](./docs/tasks/mvp.md)
- [Harness evaluation matrix](./docs/evaluations/elixir-harness-matrix.md)

## License

The public alpha is governed by the
[alpha usage terms](./TERMS.md): personal, non-commercial testing is permitted;
redistribution, modification, publication, commercial use, and incorporation
into other products require prior written permission. All other rights are
reserved.
