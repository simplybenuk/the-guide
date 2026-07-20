# The Guide

The Guide is a cabinet of transparent, portable role-play games for you and an
AI companion you already use. Each **Elixir** is a complete authored Story in a
clearly named Markdown cartridge: download it, attach it to a new conversation,
and play. There is no Guide account, provider credential, transcript store, or
gameplay server.

I built The Guide for **OpenAI Build Week** with Codex and GPT-5.6. It explores
a simple idea: an AI companion can be more than a general assistant without
being replaced by another app. Give it a small, inspectable game cartridge and
it can become the narrator, cast, and rules engine for a designed experience.

## Try it

Open the [live Story cabinet](https://simplybenuk.github.io/the-guide/), choose a
Story, and download its Markdown cartridge. Attach that file to a fresh
conversation with a compatible AI companion and send the launcher prompt shown
on the Story page.

The cabinet currently contains eleven authored Stories, from the five-minute
*Last Light* taster to 25–45 minute adventures including *The Regency Ball*,
*Claws*, *Red Dust Reckoning*, and *The Far Side of Orpheus*. Search, filters,
collections, and related-Story recommendations all run locally in the browser.

## Why I built it

AI models are already good at improvisation, but improvisation alone does not
guarantee a satisfying game. A complete experience also needs authored shape,
meaningful decisions, consistent characters, endings that respond to play, and
clear boundaries around what the game may ask or do.

I wanted those qualities without creating another walled garden. The player
should be able to use an AI companion they already trust, inspect the complete
game before playing, keep the file, and move it between compatible hosts. That
led to the core product decision: The Guide publishes games as portable content
instead of running them as a hosted AI service.

## Building The Guide with Codex and GPT-5.6

Codex was my primary development environment throughout Build Week, not an
occasional autocomplete tool. I used it as a product and engineering
collaborator: I set the goals, constraints, taste, and approval gates; Codex and
GPT-5.6 helped turn those decisions into researched options, specifications,
working software, authored content, tests, and review evidence.

The Git history preserves that collaboration from early concept exploration,
through a playable hosted prototype, to the final file-first product. Codex
made it practical to explore quickly, challenge an approach with repository
evidence, and then carry an approved decision consistently across product copy,
code, content, tooling, and validation.

### Where Codex accelerated me

- **Product discovery and specification.** Codex researched delivery models,
  helped pressure-test the idea, turned decisions into detailed briefs and
  specifications, and kept implementation tied back to acceptance criteria.
- **Engineering.** Codex built the static catalogue, cartridge and metadata
  contracts, local discovery features, immutable release ledger, build tools,
  audit scripts, automated tests, and browser journeys. GPT-5.6 helped reason
  across these connected systems and implement changes without losing the
  product's privacy and portability constraints.
- **My agent workflow.** I used Codex to build and iterate my BWH AI workflow:
  reusable skills for ideation, specification, bounded development, and
  independent review, backed by project-specific contracts and handoffs. Codex
  also built the reusable, story-free `agent-elixir` skill offered to compatible
  Agent Skills hosts.
- **Story creation.** Codex created the premises, casts, branching structures,
  dialogue, state models, endings, evaluation fixtures, catalogue copy, and
  original cover-art directions for the authored Story collection. *Claws* was
  the only Story for which I supplied specific creative guidance—the dangerous
  lobsters premise. The other ten began with the product and editorial
  constraints, then were proposed by Codex and reviewed by me.
- **Quality and safety.** Codex repeatedly reviewed its work against the
  covenant, compatibility evidence, content boundaries, release provenance,
  accessibility requirements, and security assumptions. It generated checks
  that made those decisions executable rather than leaving them as prose.
- **The submission itself.** Codex helped plan, assemble, and validate the
  sub-three-minute demo video, including the edit structure and supporting
  production workflow.

### The decisions I made

The original concept and final product decisions remained mine. The most
important was the pivot away from a conventional hosted application. The early
prototype proved the experience, but it also put The Guide between the player
and their AI companion. I chose to retire it and make portable Markdown
cartridges the product.

I also chose the bring-your-own-agent model; the no-account,
no-provider-credential architecture; the consent, refusal, pause, and role
release rules; the separation between a generic host skill and the Story files;
the editorial bar and final Story slate; and which implementation and release
proposals to approve. Codex expanded the option space and accelerated execution,
but I decided what The Guide should be and reviewed the work that shipped.

### An unusual development setup

The entire project was built on a private Ubuntu server through Codex CLI. I
interacted with it primarily from an Android phone using a mixture of `tmux`,
Terminus, and T3Code. That setup let me carry the same long-running development
environment between short mobile sessions while Codex handled repository-scale
inspection, editing, testing, and iteration on the server.

## How it works

An Elixir cartridge contains the Story and the instructions needed to run it.
Every cartridge discloses its duration, demands, inputs, capability boundary,
and data behaviour before asking the player for affirmative consent. Gameplay
is conversation-only and proceeds one move at a time, with refusal, pause,
changed boundaries, immediate stop, grounded endings, and explicit role
release.

The Guide itself is a static publisher. It does not execute the Story, receive
the conversation, or call a model API. Catalogue search and filtering remain in
the browser, and no search or gameplay data is sent to The Guide.

The cartridge is an instruction contract, not an enforceable sandbox. The
chosen AI harness still controls model behaviour, permissions, memory, and
conversation data. Compatibility labels therefore remain limited to complete,
version-scoped live-harness evidence.

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
npm start
```

Open `http://127.0.0.1:4173/`.

The preview server listens on all interfaces to support headless remote
development. It has no authentication or TLS; protect remote access with a
firewall or SSH tunnel and do not treat it as a production deployment.

## Validation

```bash
npm run validate          # complete active-product suite
npm run build             # generate dist/elixirs-pages
npm run audit:elixirs     # audit the generated static artifact
npm run test:e2e          # exercise root and repository-subpath journeys
npm run audit:releases -- --base-revision=<40-character-reviewed-commit> --bootstrap-ledger-sha256=<externally-approved-release-sha256> --approved-withdrawals-sha256=<externally-approved-withdrawal-sha256>
```

The release audit deliberately requires externally controlled values. The
manual GitHub Pages workflow fails closed unless the corresponding repository
variables are configured.

## Project structure

- `content/elixirs/` contains the canonical covenant and Story cartridges.
- `content/catalogue/` contains publisher, release, taxonomy, collection,
  lifecycle, and discovery records.
- `site/elixirs/` contains the static cabinet presentation and original artwork.
- `scripts/elixirs/` validates, builds, audits, serves, and evaluates Elixirs.
- `tests/elixirs/` verifies the static cabinet at root and repository subpaths.
- `templates/story-elixir/` contains the reviewed Story authoring and release
  evidence kit.
- `skills/agent-elixir/` contains the generic, story-free Agent Skill packaged
  by the static build.
- `.agents/` contains the custom specification-led development workflow used
  with Codex throughout the project.
- `.github/workflows/elixirs-pages.yml` packages the audited artifact through a
  least-privilege, manual-only Pages workflow.

## Compatibility status

Local implementation and artifact validation are complete. Live Codex evidence
supports the experimental `coding_agent` class only. One
owner-observed ChatGPT attempt failed in the mobile app to retrieve the public
Pages cartridge; the underlying model identifier was not exposed, so that
attempt is not a complete evidence run or compatibility pass.

The authored catalogue is published for testing, but a release remains untested
unless it has complete, version-scoped live-harness evidence. Signal, Mystery,
and the generic Story demonstrations are retired from ordinary discovery while
their immutable release pages remain available.

The former hosted Next.js prototype is also retired. Its final snapshot is
preserved at the `hosted-prototype-final` Git tag and documented in the
[archive index](./docs/archive/hosted-prototype/README.md).

## Documentation

- [Product brief](./docs/product-brief.md)
- [Architecture](./docs/architecture.md)
- [Cartridge and cabinet specification](./docs/specs/elixir-cartridge-and-first-cabinet.md)
- [Story authoring and presentation specification](./docs/specs/story-elixir-authoring-and-chat-presentation.md)
- [Authored Story expansion specification](./docs/specs/authored-story-catalogue-expansion.md)
- [Current development plan](./docs/tasks/mvp.md)
- [Harness evaluation matrix](./docs/evaluations/elixir-harness-matrix.md)

## Licence

The public alpha is governed by the
[alpha usage terms](./TERMS.md): personal, non-commercial testing is permitted;
redistribution, modification, publication, commercial use, and incorporation
into other products require prior written permission. All other rights are
reserved.
