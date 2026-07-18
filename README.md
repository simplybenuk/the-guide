# The Guide

The Guide is a cabinet of transparent, portable role-play games for you and an
AI companion you already use.

Choose an **Elixir**, give its versioned Markdown cartridge to your agent by URL,
file, or copied text, and let the agent temporarily run the game inside your
existing conversation. The Guide needs no provider credential, account,
transcript, or application server.

## Status

The static cabinet contains three experimental first-party Elixirs: Signal,
Mystery, and Story. Local implementation and artifact validation are complete.
Live Codex evidence supports the experimental `coding_agent` class only.
ChatGPT consumer evaluation is blocked by the available headless environment,
has zero runs, and is not a compatibility pass. A second complete live harness
class is required before human output testing.

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
```

## How it works

- `content/elixirs/` contains the canonical covenant and cartridges.
- `site/elixirs/` contains the cabinet presentation and original artwork.
- `scripts/elixirs/` validates, builds, audits, serves, and evaluates Elixirs.
- `tests/elixirs/` verifies the static cabinet at root and repository subpaths.
- `.github/workflows/elixirs-pages.yml` packages the audited artifact through a
  manual-only Pages workflow; it does not deploy on push or pull request.

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

License to be decided. Resolve usage terms before public cartridge distribution.
