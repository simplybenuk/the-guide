# The Guide — Elixir architecture

## Architectural stance

The Guide is a static publisher of transparent game contracts. It does not host
the agent, model, conversation, state, transcript, or memento.

```text
Canonical Markdown cartridges + original artwork
  -> strict schema/covenant validation
  -> deterministic static generator and artifact audit
  -> static cabinet on any file host
  -> player attaches the downloaded file with a short prompt or generic skill
  -> harness discloses, obtains consent, plays, and releases the role
```

## Active layers

### Canonical content

`content/elixirs/` contains one versioned common covenant, fourteen immutable
published release sources, and eleven actively discoverable authored Stories.
Strict metadata binds
identity, version, demands, inputs, compatibility evidence, and artwork
provenance to each source. Authored Story candidates use schema `1.1.0`: their
experience contract declares player role, speech/action/decision interaction,
choice presentation, intensity, endings, replay promise, and session shape.
Their source prescribes ordered beats, compact state, reconvergence, ending
eligibility, and semantic narrator/character labels while leaving prose
realisation to the model.

`content/catalogue/` is the strict publication registry for those immutable
sources. Publisher, release-ledger, discovery, taxonomy, collection, and
withdrawal records are validated together. The ledger binds every published
ID/version to exact bytes and paths; mutable editorial catalogue state cannot
rewrite cartridge history. Entry lifecycle describes the currently recommended
version, while exhaustive release-version lifecycle records allow an older
version to be superseded or withdrawn without hiding a newer live recommendation.
Artwork provenance separately records active references and exact archived Git
references, including recoverable path, revision, object, bytes, and digest.
Story preparation snapshots live under
`content/catalogue/candidates/`; their exact source/artwork digests and proposed
transitions remain useful validation evidence after publication. The Regency
Ball and the 2026-07-19 expansion entered the production registry only after
local and independent review, immutable source revisions, provenance review,
and explicit owner authorization. Compatibility promotion remains gated by
named live-harness evidence.

### Static cabinet

`site/elixirs/` contains first-party HTML-generation inputs, CSS, local
search/filter and progressive clipboard JavaScript, and project-owned artwork.
The generated catalogue includes static collection and version-history pages
and remains usable without JavaScript for browsing, comparison, source
inspection, and download. Search terms remain in page memory and are neither
persisted nor transmitted.

The detail-page play journey is file-first: one canonical cartridge download,
one short generic launcher prompt, and one subordinate `agent-elixir` skill
option for compatible hosts. The skill is independently versioned, contains no
story, performs no retrieval, and still requires the selected cartridge as an
attachment.

### Build and audit

`scripts/elixirs/` parses and cross-validates canonical content and catalogue
records, enforces append-only release history against an explicit reviewed Git
revision, verifies each appended release against the bytes at its recorded
source commit, emits the exact registry-derived
artifact tree, rejects unexpected or unsafe files, serves local previews, and
defines redacted cross-harness evidence. The artifact contains no server
bundle, API, runtime environment, credential, database, analytics collector, or
transcript receiver.

### Third-party harness

After attachment, the chosen harness owns the conversation, model access,
memory, and ambient permissions. The short prompt or optional skill reads the
cartridge and takes the player to disclosure and affirmative consent. The
cartridge yields to higher-priority instructions and requests conversation-only
play. It is an instruction contract rather than an enforceable sandbox.

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
least-privilege, reads its release-ledger base from a repository-controlled
variable and its bootstrap digest from a second externally controlled variable
outside the candidate tree. A third external digest authorizes the exact
append-only withdrawal ledger. The workflow fails closed when required trust
input is absent and uploads
only the audited artifact. Enabling Pages, running
deployment, changing domains, or publishing cartridges requires explicit human
authorization and resolved usage terms.

## Recovery

The retired hosted Next.js prototype is not an active fallback runtime. Its
exact final snapshot remains recoverable from `hosted-prototype-final`; see the
[archive index](./archive/hosted-prototype/README.md). Reintroducing hosted
functionality requires a new approved specification.
