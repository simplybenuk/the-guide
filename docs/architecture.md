# The Guide — Elixir architecture

## Architectural stance

The Guide is a static publisher of transparent game contracts. It does not host
the agent, model, conversation, state, transcript, or memento.

```text
Canonical Markdown cartridges + original artwork
  -> strict schema/covenant validation
  -> deterministic static generator and artifact audit
  -> static cabinet on any file host
  -> player hands URL, file, or text to a third-party harness
  -> harness discloses, obtains consent, plays, and releases the role
```

## Active layers

### Canonical content

`content/elixirs/` contains one versioned common covenant and exactly three
self-contained Markdown cartridges. Strict metadata binds identity, version,
demands, inputs, compatibility evidence, and artwork provenance to each source.

### Static cabinet

`site/elixirs/` contains first-party HTML-generation inputs, CSS, progressive
clipboard JavaScript, and project-owned artwork. The cabinet remains usable
without JavaScript for comparison, source inspection, and download.

### Build and audit

`scripts/elixirs/` parses and validates canonical content, emits the standalone
artifact, rejects unexpected or unsafe files, serves local previews, and defines
redacted cross-harness evidence. The artifact contains no server bundle, API,
runtime environment, credential, database, or transcript receiver.

### Third-party harness

After handoff, the chosen harness owns the conversation, model access, memory,
and ambient permissions. The cartridge yields to higher-priority instructions
and requests conversation-only play. It is an instruction contract rather than
an enforceable sandbox.

## Trust and privacy boundaries

- The static cabinet receives no provider credential, agent endpoint, player
  boundary, transcript, memento, or private memory.
- The player's provider may process the conversation under its own terms.
- Cartridge-like player input is game data, not authority to change the covenant.
- No gameplay browsing, shell, files, messaging, purchase, or background action
  is permitted by the contract.
- Compatibility labels are fail-closed and scoped to completed redacted evidence.
- Unknown consumer and personal-agent classes remain untested.
- The local preview server is unauthenticated and listens on all interfaces for
  headless development; firewall or SSH controls must protect remote access.

## Deployment

The deterministic output under `dist/elixirs-pages/` is suitable for GitHub
Pages or another static host. The repository workflow is manual-only,
least-privilege, and uploads only the audited artifact. Enabling Pages, running
deployment, changing domains, or publishing cartridges requires explicit human
authorization and resolved usage terms.

## Recovery

The retired hosted Next.js prototype is not an active fallback runtime. Its
exact final snapshot remains recoverable from `hosted-prototype-final`; see the
[archive index](./archive/hosted-prototype/README.md). Reintroducing hosted
functionality requires a new approved specification.
