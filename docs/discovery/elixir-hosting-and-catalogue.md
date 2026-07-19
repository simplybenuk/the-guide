# Elixir Hosting and Catalogue — Discovery Brief

## Idea and opportunity

Grow The Guide from a three-cartridge cabinet into a trustworthy catalogue that
can hold hundreds of portable Markdown Elixirs without making selection harder,
weakening immutable delivery, or observing private gameplay.

The near-term opportunity is a curated first-party library with strong
metadata, editorial navigation, and enforceable publication history. The model
should leave clean seams for invited and eventually third-party creators, but
creator accounts, public submissions, and marketplace operations are not
prerequisites for proving catalogue discovery.

## Problem and desired outcome

The current cabinet proves transparent, self-contained delivery for three
first-party Elixirs. Its implementation deliberately names those three sources,
artworks, pages, and artifact paths. That is appropriate for the first cabinet
but does not yet provide:

- a registry that can discover and validate hundreds of cartridges;
- durable retention of every published version across later builds;
- enough controlled metadata to search and compare a large catalogue;
- catalogue-level provenance, review, withdrawal, and maintenance state;
- a responsible basis for popularity or recommendation claims; or
- a safe path from first-party publishing to external contributions.

The desired player outcome is:

> I can quickly find a small set of Elixirs that fit my time, mood, energy,
> access needs, and boundaries; understand why each is shown; verify who made
> and reviewed it; and copy a complete immutable cartridge into my chosen agent
> without giving The Guide my conversation.

The desired curator outcome is:

> We can add, update, feature, deprecate, and if necessary withdraw Elixirs
> through a reviewable catalogue workflow; preserve all non-withdrawn published
> versions; and assess catalogue health without collecting gameplay transcripts
> or inventing quality claims from delivery clicks.

## Actors

- **Prospective player:** needs a comprehensible shortlist without knowing
  prompts, versions, or agent protocols.
- **Returning player:** wants novelty and may use device-local favourites or
  history later, without requiring an account.
- **Player with access or content constraints:** needs facets and content notes
  that are consistent, specific, and available before delivery.
- **Catalogue curator:** owns taxonomy, collections, featuring, lifecycle state,
  and the overall quality bar.
- **First-party author:** creates and maintains an Elixir and its evidence.
- **Safety and quality reviewer:** evaluates source, provenance, gameplay
  behaviour, compatibility evidence, and release readiness.
- **Publisher/maintainer:** operates the deterministic build, immutable release
  ledger, Pages artifact, and recovery process.
- **Invited creator, later:** supplies an Elixir under explicit identity,
  licensing, provenance, review, and maintenance terms.
- **Reporter:** flags a safety, rights, integrity, or catalogue-quality issue
  without being asked to share a transcript.
- **Third-party harness/provider:** receives the delivered cartridge and owns
  the conversation, model, memory, permissions, and provider-side processing.

## Repository evidence and known facts

- The active product is a deterministic static GitHub Pages artifact generated
  from canonical Markdown and original artwork.
- `scripts/elixirs/build.mjs` currently hard-codes Signal, Mystery, and Story,
  emits one detail page per slug, and emits the current source at
  `cartridges/<slug>/<version>/elixir.md`.
- `scripts/elixirs/audit.mjs` currently allowlists the exact three artworks,
  three detail pages, and three `0.1.0` cartridge paths. Scaling requires
  deriving the expected tree from validated catalogue data rather than
  weakening the audit to accept arbitrary files.
- Canonical source currently has one file per Elixir slug. A later version would
  replace that source file, and a fresh disposable build would not automatically
  retain the older published version. The existing path shape is versioned, but
  permanent byte availability is not yet enforced by source layout or CI.
- Cartridge metadata schema `1.0.0` already validates stable ID, slug, title,
  summary, promise, publisher, semantic version, status, duration, energy,
  movement, required inputs, conversation-only capability, data behaviour,
  compatibility, covenant version, and artwork/provenance reference.
- Publisher metadata currently accepts only the literal first-party name
  `The Guide`. Creator support therefore requires a reviewed metadata-schema
  version, not an unvalidated free-text relaxation.
- Portable-source validation rejects hidden content, executable HTML/code,
  encoded instructions, remote includes, linked resources, executable
  attachments, and model control tokens. Every cartridge embeds the exact
  versioned common covenant.
- The delivery envelope binds a cartridge to ID, title, publisher, version,
  UTF-8 byte count, SHA-256 digest, and explicit opening/closing markers.
- Delivery event contract `1.1.0` permits only local, ephemeral
  `delivery_action_recorded` events for self-contained prompt copy, resolver
  prompt copy, raw cartridge copy, and Markdown download. It rejects unknown
  fields and stale cartridge references.
- Qualifying events can be aggregated as acquisition **actions** by immutable
  Elixir/version, method, target, and declared time window. They do not mean
  unique users, successful retrieval, play, completion, satisfaction, quality,
  or compatibility.
- The production artifact currently transmits and persists no event. The audit
  rejects network collectors, analytics SDKs, cookies, browser persistence,
  service workers, and unexpected remote origins.
- The self-contained ChatGPT prompt is now the primary mobile delivery path;
  it does not depend on URL retrieval. Immutable cartridge URLs, raw copy,
  download, and the experimental resolver remain trust and fallback surfaces.
- The Guide receives no gameplay transcript, boundary, memento, credential,
  agent memory, or gameplay state. Provider processing remains outside The
  Guide's boundary.
- Current terms permit personal, non-commercial alpha testing and prohibit
  redistribution, modification, publication, and incorporation without prior
  permission. External creator publication needs an explicit contributor and
  licensing model.
- Public deployment, publication, analytics, runtime services, accounts, and
  other external writes remain separate human-authorized decisions.

## Assumptions

- “Hundreds” is the design target; the bounded alpha need not publish hundreds
  of Elixirs to validate the model.
- A static generated index and in-browser filtering are technically sufficient
  for hundreds of compact metadata records. A backend is not justified by
  catalogue size alone.
- Early discovery quality will come primarily from controlled facets,
  trustworthy content notes, editorial collections, and clear promises—not
  behavioural personalisation.
- First-party and invited content can share a cartridge contract while having
  different publisher identity, review, and trust labels.
- Published bytes should never be silently replaced at an existing immutable
  URL. Legal or urgent safety withdrawal may make bytes unavailable, but must
  produce an explicit tombstone and retain a non-public audit record rather
  than serving altered content under the old version.
- Search text entered by a player may reveal sensitive interests or boundaries
  and should remain on-device by default.
- Quality and popularity are separate signals. Editorial or review quality must
  not be inferred from delivery volume.
- A future collector, if approved, can consume versioned events without making
  the catalogue renderer, search, or delivery depend on that service.

## Recommended direction

Adopt a **static, registry-driven, editorial catalogue** for the alpha.

1. Make the repository the publication system of record. Introduce a validated
   catalogue registry and version archive from which the generator discovers
   every Elixir and derives the exact audited output tree.
2. Preserve the current first-party URLs and define an explicit namespace rule
   before an invited-creator pilot. New canonical identities must be globally
   stable; human-readable slugs are navigation labels, not identity.
3. Generate a compact public catalogue index from canonical metadata. Perform
   search, filtering, sorting, and explainable related-item selection in the
   browser, with a complete server-rendered/static browse fallback.
4. Start with editorial collections and rules-based recommendations such as
   “same duration, different mechanic.” Show the reason and never imply that a
   behavioural model knows the player.
5. Display factual trust and quality evidence—publisher, source integrity,
   review state, compatibility scope, content notes, maintenance state, and
   provenance—alongside, but independently from, any future popularity count.
6. Keep alpha analytics disabled. Preserve local event `1.1.0` semantics and
   design any collection endpoint, discovery-event contract, retention policy,
   notice/consent basis, access controls, and deletion process in a separate
   approved slice. Search queries and gameplay content remain prohibited.
7. Prove the creator-shaped data and review workflow with first-party content,
   then run an invited pilot through reviewed repository contributions before
   considering public submissions, authentication, or moderation tooling.

This direction preserves the current product promise while avoiding a backend
whose main purpose would initially be to serve data already suitable for a
static artifact.

## Storage, versioning, publishing, and immutable URLs

### Recommended publication model

Use three distinct concepts:

- **Elixir identity:** a permanent globally unique ID, independent of display
  title and current publisher branding.
- **Elixir version:** immutable semantic version plus exact SHA-256/byte count.
- **Catalogue entry:** mutable editorial state that points to a recommended
  version and carries lifecycle, discovery, and review information.

The source tree should retain every published cartridge version rather than
only the newest source. Exact paths are a specification decision, but the model
should support:

```text
catalogue registry
  -> publisher record
  -> Elixir identity and mutable catalogue state
  -> immutable version records
  -> exact cartridge bytes, artwork/provenance, review and compatibility links
```

The build should:

- discover records from the registry rather than a hard-coded slug list;
- validate each version independently against its declared schema and covenant;
- verify declared digest, byte count, artwork provenance, review state, and
  catalogue references;
- emit all published, deprecated, and supported legacy versions;
- generate the detail page from the recommended version while allowing version
  history inspection;
- derive the complete artifact allowlist from validated records; and
- fail if a released version's bytes, digest, identity, or path changed or if a
  non-withdrawn released version disappeared.

### URL semantics

- **Immutable cartridge URL:** contains stable identity/namespace plus semantic
  version and serves only the exact reviewed bytes for that version.
- **Stable Elixir detail URL:** may show the current recommended version and is
  therefore a mutable catalogue page, not an immutable cartridge resource.
- **Version detail URL, optional:** explains review, provenance, compatibility,
  changelog, and lifecycle for one immutable version.
- **Legacy first-party paths:** the existing
  `cartridges/<slug>/<version>/elixir.md` paths must remain valid or receive a
  consciously approved compatibility plan; they must never silently point to a
  different version.

Immutability must mean “never replace bytes at the same versioned URL,” not
“unsafe or unlawful bytes can never be withdrawn.” Withdrawal behaviour is a
material policy decision: the recommended model serves a clear tombstone with
status, date, coarse reason, successor where safe, and integrity identifier,
while preventing the original bytes from being redistributed by the active
cabinet.

### Publishing states

Use explicit state transitions rather than deleting or overloading `status`:

```text
draft -> review -> approved -> published -> deprecated -> withdrawn
                     |             |
                     +-> rejected  +-> superseded
```

- `draft`, `review`, and `rejected` are not emitted publicly.
- `approved` is eligible for an authorized release but is not evidence of
  deployment.
- `published` is selectable and delivered.
- `deprecated` remains inspectable/deliverable with a recommended successor.
- `withdrawn` is not newly deliverable and follows the approved tombstone rule.
- A title, description, taxonomy, or review correction may update the catalogue
  record without mutating cartridge bytes, but the history must show material
  trust-related corrections.

Publication remains a reviewed pull request plus separately authorized Pages
deployment. A release ledger records identity, version, digest, source revision,
publication date, and resulting paths. CI compares the ledger against source
and the last trusted release state.

## Discovery: search, filters, categories, collections, and recommendations

### Search

Generate a bounded search document per Elixir from public fields only: title,
summary, player promise, author/publisher display names, controlled tags,
mechanics, themes, and collection labels. Do not index cartridge instructions
as a default discovery corpus; doing so adds noise and can expose safety text as
misleading matches.

Initial search should be deterministic, client-side, typo-tolerant only if a
small dependency can be audited, keyboard accessible, and usable without an
account. The raw query stays in memory and is not added to URLs or events unless
the user explicitly chooses a shareable filter state that contains controlled
facet tokens only.

### Filters and categories

Prefer a small controlled taxonomy over unconstrained creator tags. Initial
high-value facets are:

- time range;
- energy and movement;
- interaction mechanic;
- tone/mood;
- setting or activity mode;
- required input types;
- access considerations;
- content notes and player-selectable exclusions;
- player count/social mode, if the covenant later supports more than one; and
- experimental/stable, compatibility class, publisher type, and lifecycle.

Categories should be broad browse destinations owned by the curator. Tags are
more specific controlled descriptors. Synonyms belong in the search index, not
as duplicate public taxonomy values. Taxonomy values need definitions,
versioning, aliases for renamed terms, and lint rules to prevent drift.

### Collections

Collections are first-class editorial records with stable ID, title, rationale,
owner, ordered Elixir references, publish/update dates, and optional start/end
dates. Examples include “Start here,” “Ten minutes or less,” “Low-energy
evenings,” and “Different ways to make a story.” Collection membership is an
editorial claim and should be reviewable in source.

### Recommendations

Alpha recommendations should be transparent and non-personal:

- editorial next choices;
- related Elixirs sharing selected facets but differing in mechanic;
- “more like this” calculated from controlled metadata; and
- explicit preference matching performed locally from current filter choices.

Every recommendation surface should show a short reason. Popularity may become
one separately labelled input later, but it must not silently dominate, create
a winner-takes-all loop, or be presented as quality. Accounts, cross-device
profiles, opaque embeddings of user behaviour, and transcript-derived
recommendations are deferred.

## Popularity, quality, and responsible measurement

### Signal vocabulary

Keep these signals distinct in data, UI, and reporting:

- **Acquisition action:** a successful prompt/raw copy or initiated download
  under delivery event contract `1.1.0`.
- **Discovery interest:** a detail or collection view, if a future discovery
  event contract is approved; it is vulnerable to bots and placement effects.
- **Activation:** cannot be observed by the current cabinet. It would require a
  voluntary coarse player report or a deeper integration.
- **Completion/enjoyment:** never inferred from delivery. A future optional
  feedback mechanism may ask a bounded question without receiving a transcript.
- **Quality:** editorial/playtest evidence against a published rubric.
- **Compatibility:** version-scoped named harness evidence only.
- **Trust:** provenance, identity, review, maintenance, and safety state.

### Alpha signals

The static alpha should rank and feature using editorial rationale and quality
evidence. Local `1.1.0` events remain testable but leave no device and produce
no live counts. Useful alpha evidence comes from consented moderated usability
sessions, redacted evaluation fixtures, release/review records, catalogue health
checks, and qualitative player research conducted outside gameplay transcripts.

### Events that could be collected responsibly later

If live measurement is approved, start from the existing acquisition contract
and add only a separately versioned discovery contract with exact allowlisted
values. Potentially defensible events are:

- catalogue loaded with public deployment revision;
- collection opened using collection ID;
- controlled filter applied/cleared using allowlisted facet and value;
- Elixir detail opened using Elixir ID/version and originating collection ID;
- the existing delivery action and coarse result; and
- optional explicit “play started” or “would recommend” response initiated by
  the player after returning to the cabinet.

Do not collect raw search queries, cartridge/prompt text, transcript excerpts,
free-text boundaries, referrer URLs, user agents, IP addresses in application
payloads, precise location, provider/account identity, persistent device IDs,
or cross-site identifiers. Infrastructure providers may process ordinary
network data; that processing and retention must be disclosed and minimized.

Before collection, specify lawful/consent basis, notice, processor, region,
retention, aggregation thresholds, staff access, incident response, deletion,
bot filtering, and public metric wording. Prefer short-lived raw events and
longer-lived coarse aggregates. Without stable identity, label counts as
actions, not people, and accept that one player can produce multiple actions.

### Quality evidence

An Elixir's quality record should combine:

- schema/covenant/security validation;
- mechanic distinctiveness and promise accuracy;
- human playtest results against consent, pacing, responsiveness, stop,
  grounding, ending, and role-release criteria;
- named version-scoped harness evidence;
- accessibility/content-note review;
- provenance and rights completeness;
- maintainer and review recency; and
- issue history and resolution state.

Avoid one composite score. A compact evidence panel is more honest and makes
gaps visible. Ratings and reviews are deferred because they require identity,
anti-abuse, moderation, brigading resistance, and enough volume to be useful.

## Provenance, trust, safety review, moderation, and reporting

### Trust model

Display factual labels rather than a generic “verified” badge:

- first-party or invited publisher;
- author/organisation identity level;
- exact cartridge version and digest;
- source and artwork provenance complete/incomplete;
- licence and permitted-use summary;
- covenant and schema versions;
- safety/quality review state and date;
- compatible/experimental/untested with linked evidence scope; and
- maintained, deprecated, superseded, or withdrawn.

Third-party identity validation, if later introduced, verifies control of an
account or domain; it does not certify gameplay quality or safety.

### Review pipeline

Every publishable version should pass:

1. structural schema, digest, covenant, and source-portability checks;
2. secret, remote-resource, hidden-instruction, and malicious-authority review;
3. rights, attribution, artwork, AI-assistance disclosure, and licence review;
4. content-note, boundary, vulnerable-user, and real-world-action review;
5. mechanic/promise and human experience review;
6. named harness evaluation proportional to the compatibility claim;
7. independent release review; and
8. explicit publication authorization.

Untrusted creator contributions must be treated as data: do not execute their
scripts, workflows, packages, generated HTML, or remote assets. Validation
should run in a restricted environment with no secrets and should promote only
reviewed Markdown, metadata, and approved assets into canonical source.

### Moderation and reporting

The curated alpha needs lifecycle operations, not a full moderation dashboard.
Before inviting creators, establish:

- a private report intake route with anti-spam controls;
- a report schema limited to cartridge ID/version, category, optional concise
  description, and optional contact route;
- prominent guidance not to submit transcripts, prompts containing private
  play, credentials, boundaries, or mementos;
- triage severity, owner, response target, escalation, evidence handling, and
  reporter privacy rules;
- temporary delisting/withdrawal and reinstatement procedures;
- creator notice and appeal for non-urgent cases;
- copyright, impersonation, malware/prompt-injection, safety, privacy, and
  quality categories; and
- an audit trail that does not expose reporter identity publicly.

A public GitHub issue template alone is not recommended for sensitive reports,
because reporters may inadvertently publish private context. The exact private
channel and service are decisions for the creator-pilot specification.

## Catalogue metadata needed at scale

Metadata should be strict, versioned, and divided by authority so that changing
editorial copy does not imply changing immutable cartridge bytes.

### Immutable cartridge-version metadata

- metadata schema version;
- globally stable Elixir ID and version;
- slug at publication, title, summary, and player promise;
- publisher ID and display name; author/credit records;
- exact UTF-8 byte count and SHA-256 digest;
- source revision and publication record;
- covenant version and cartridge status;
- estimated duration, energy, movement, required inputs;
- gameplay capability and data/memory behaviour;
- content notes, safety boundaries, and declared audience;
- mechanic, interaction grammar, replayability, and supported player count;
- language/locale and accessibility considerations;
- artwork IDs, dimensions, alt text, provenance, rights, and digest;
- content/source licence and AI-assistance disclosure;
- compatibility status and evidence references; and
- changelog, predecessor/successor, and breaking-change reason.

### Mutable catalogue metadata

- recommended version and version history;
- lifecycle state, release/deprecation/withdrawal dates, and coarse reason;
- curator-owned categories and controlled tags;
- collection memberships and editorial order;
- search synonyms and featured rationale;
- maintenance owner, review state/date, and next review due;
- publisher profile/trust state;
- support/reporting route; and
- replacement or migration guidance.

### Separate records

- publishers and contributor identities;
- taxonomy definitions and aliases;
- editorial collections;
- provenance/rights evidence;
- safety and quality reviews;
- compatibility evaluations;
- immutable release ledger; and
- withdrawal/report audit records, kept private where appropriate.

Do not duplicate authoritative values across cartridge, registry, and generated
index. Define which layer owns each field and generate public projections from
it. Reject unknown fields and dangling references.

## Material hosting options and trade-offs

### Option A — Static registry and catalogue, no live collection

**Recommended alpha.** Git remains the source of truth; CI validates and emits
the entire searchable catalogue to Pages. Search and recommendations operate
on public metadata in the browser.

Advantages:

- preserves no-backend, no-account, no-transcript architecture;
- inexpensive, host-portable, cacheable, and recoverable by redeployment;
- reviewable publishing and exact source provenance;
- sufficient performance and functionality for hundreds of metadata records;
- no runtime availability dependency for search or delivery.

Trade-offs:

- no live popularity, cross-device state, dynamic moderation queue, or instant
  publication;
- editorial updates require a repository change and deployment;
- client index size and no-JavaScript navigation need explicit performance and
  accessibility validation;
- Git workflow becomes the operational interface and needs scale-oriented
  tooling.

### Option B — Static catalogue plus minimal first-party event/report service

Keep catalogue and cartridge delivery static; add a narrow API only for approved
aggregate events and/or private reports.

Advantages:

- supplies coarse acquisition/discovery trends without coupling catalogue
  availability to a backend;
- can support a private safety-report intake before creator scale;
- smaller migration than a full catalogue service.

Trade-offs:

- changes the zero-data boundary and requires privacy notice, processor,
  retention/deletion, access control, abuse protection, monitoring, and cost;
- network metadata still exists even with identity-free payloads;
- event quality is affected by retries, bots, placement, and lack of unique-user
  identity;
- creates an operational service before evidence proves it is necessary.

The reporting service and analytics collector should not be assumed to be the
same system or share retention/access rules.

### Option C — Dynamic catalogue, accounts, and submission backend

Store catalogue state, creator accounts, submissions, reviews, reports,
moderation, and personal libraries in an application service.

Advantages:

- supports creator self-service, queues, rapid updates, cross-device libraries,
  richer moderation, experiments, and personalised recommendations;
- can enforce workflow state and permissions centrally.

Trade-offs:

- introduces tenancy, authentication, authorization, database migrations,
  availability, backup/recovery, incident response, deletion/export, abuse,
  support, and materially higher security/privacy obligations;
- risks coupling immutable public delivery to mutable runtime state;
- provides little additional player value during a first-party alpha;
- invites premature marketplace dynamics and behavioural ranking.

Choose this only when an approved creator/submission or cross-device product
need cannot be met by reviewed repository contributions and static publication.
Even then, publish immutable cartridge artifacts independently of the runtime.

## Bounded alpha scope

### In scope

- A registry and source/archive model that retains every published version and
  drives build/audit output without hard-coded cartridge lists.
- A schema version supporting controlled discovery, lifecycle, publisher,
  provenance, review, and maintenance metadata while preserving current IDs,
  URLs, and cartridge bytes through an explicit migration plan.
- A generated public catalogue index and static detail/version pages.
- Client-side title/summary/tag search; controlled filters; deterministic sort;
  shareable controlled-filter URLs if they expose no free text.
- Three to five editorial collections including “Start here.”
- Explainable editorial/metadata-related recommendations.
- Factual trust, content-note, compatibility, review, and lifecycle displays.
- First-party publishing, deprecation, supersession, and simulated withdrawal
  workflow.
- Current self-contained delivery and local event `1.1.0`, unchanged in
  meaning and still uncollected.
- A synthetic catalogue fixture large enough to validate the hundreds-scale
  build, audit, search, accessibility, and performance path without publishing
  hundreds of low-quality Elixirs.
- A curated initial expansion target chosen during specification; a working
  assumption is 12–24 first-party Elixirs, subject to the separate content
  pipeline and human quality capacity.

### Non-goals

- A backend, database, live analytics destination, or public popularity rank.
- Accounts, cross-device history, behavioural profiles, or opaque personalised
  recommendations.
- Public submissions, creator self-service, arbitrary remote cartridge URLs,
  an open marketplace, ratings, reviews, comments, follows, or payments.
- Receiving or analysing gameplay transcripts, mementos, boundaries, prompts,
  or provider memory.
- Inferring activation, completion, enjoyment, safety, quality, or compatibility
  from a view, filter, copy, download, or HTTP request.
- Bulk AI generation as a substitute for distinct mechanics, provenance,
  review, and human playtesting.
- Changing the common covenant, gameplay tool boundary, or published cartridge
  behaviour as a side effect of catalogue work.
- Automatic public deployment or external publication without separate human
  authorization.

## Phased path toward creator submissions

### Phase 0 — Publication foundation

Create the registry, immutable release ledger/archive, namespace decision,
taxonomy, metadata authorities, lifecycle rules, and generated audit tree.
Migrate the three current Elixirs without changing their bytes or URLs.

### Phase 1 — Curated first-party alpha

Add static search, filters, collections, explainable related items, trust
evidence, and a small reviewed first-party slate. Validate hundreds-scale with
fixtures, not content volume. Run moderated discovery tests and keep analytics
off.

### Phase 2 — Evidence and operational readiness

Assess whether research and release records answer the important questions. If
not, separately specify either minimal aggregate measurement or private report
intake with exact privacy and recovery controls. Establish creator terms,
licensing, contribution declarations, review capacity, and a private reporting
channel.

### Phase 3 — Invited creator pilot

Invite a bounded cohort through fork/pull-request or another reviewed intake
that grants no production access. A working assumption is up to five creators
and ten published Elixirs. Quarantine submissions, prohibit contributor code
execution and remote assets, require provenance/licence declarations, and have
The Guide curate and publish approved immutable versions. Label invited content
distinctly from first-party work.

### Phase 4 — Controlled submissions

Only after measuring review load, issue rate, creator support, and player value,
consider an authenticated submission portal or structured form. Specify
tenancy, permissions, moderation queues, appeals, deletion, publisher identity,
rate limits, abuse response, and migration/recovery before implementation.

### Phase 5 — Marketplace decision

Open submissions, behavioural ranking, ratings, payments, or creator analytics
are separate product directions, not the default end state. Proceed only if
curated discovery and invited publishing cannot satisfy demonstrated needs.

## Success signals

- A new visitor can use time, energy, mechanic, mood, and content constraints to
  reach a manageable, meaningfully differentiated shortlist.
- Players understand why an item is featured or recommended and can distinguish
  editorial, quality, compatibility, trust, and popularity signals.
- Existing three cartridge bytes, digests, identity, and immutable paths remain
  unchanged through migration.
- A later build cannot silently mutate or drop a non-withdrawn published version.
- Build and audit derive their exact accepted tree from validated catalogue data
  and reject unknown content or dangling references.
- A representative hundreds-scale fixture remains usable on mobile, keyboard,
  screen reader, no-JavaScript fallback, and constrained network/device profiles.
- Every publicly selectable version has complete provenance, rights, review,
  content-note, lifecycle, and compatibility state.
- No catalogue or delivery path collects a transcript, search query, free text,
  stable user identity, credential, boundary, memento, or private harness data.
- Curators can publish, supersede, deprecate, and simulate urgent withdrawal
  using documented, recoverable procedures.
- The invited-pilot gate is based on demonstrated review capacity and resolved
  rights/reporting processes, not catalogue growth pressure alone.

## Dependencies

- Human approval of the later hosting specification and any superseded
  first-cabinet non-goals.
- A decision on canonical identity/path namespace before third-party IDs exist.
- A release-ledger baseline for the already published three `0.1.0` cartridges.
- Taxonomy and metadata ownership agreed before schema implementation.
- Resolved contribution licence, author agreement, artwork rights, and permitted
  use before invited creator publication.
- A quality/playtest rubric and enough independent review capacity for the
  intended release cadence.
- A private reporting route and withdrawal/appeal policy before external
  creators are publicly listed.
- Explicit authorization for any analytics collector, backend, account system,
  third-party processor, or public deployment.
- Continued delivery, covenant, artifact-audit, accessibility, and named-harness
  evidence contracts.

## Material decisions needed before specification

1. **Immutable path and identity namespace:** retain legacy first-party paths
   while adopting publisher-qualified paths for new work, or use one other
   globally unique canonical path with permanent legacy aliases?
2. **Withdrawal contract:** when safety or rights require removal, should an
   immutable URL return an HTML/Markdown tombstone, HTTP `410` where hosting
   permits, or another explicit failure shape? What audit evidence is retained?
3. **Metadata authority split:** which fields are embedded and frozen in the
   cartridge version, and which are curator-owned catalogue records that can be
   corrected without releasing new gameplay bytes?
4. **Initial taxonomy and audience:** which moods, mechanics, content-note
   vocabulary, accessibility facets, and intended audience should anchor the
   first-party slate?
5. **Alpha catalogue size:** what number of genuinely reviewed first-party
   Elixirs is supportable? The recommendation is a 12–24 target plus a
   synthetic hundreds-scale fixture, not a quota of hundreds.
6. **Quality governance:** who may approve safety, rights, compatibility, and
   experience quality, and which reviews require independence?
7. **Popularity boundary:** confirm no live collection/ranking in the alpha. If
   measurement is required, select it as a separate specification with exact
   processor, fields, notice/consent, retention, access, deletion, and wording.
8. **Reporting route:** choose a private intake channel, retention/access model,
   and urgent withdrawal owner before the invited creator pilot.
9. **Creator rights and identity:** decide contributor licence/terms,
   AI-assistance disclosure, artwork policy, maintenance responsibility, and
   how invited publisher identity is verified and labelled.
10. **Local user state:** decide whether favourites/recently viewed belongs in
    the alpha. The recommendation is to defer it; if added, keep it
    device-local, optional, inspectable, clearable, and outside event payloads.

None of these decisions prevents recommending the static-first direction. The
first three materially shape the versioning and schema design and should be
resolved at the start of `bwh-spec`.

## Risks and mitigations

- **Versioned-path illusion:** a URL looks immutable while later builds drop its
  bytes. Retain versions in canonical source, ledger releases, and fail CI on
  mutation or disappearance.
- **Mutable metadata ambiguity:** catalogue corrections appear to rewrite a
  cartridge's historical claims. Split immutable version facts from mutable
  editorial state and expose meaningful correction history.
- **Namespace collision:** third-party slugs collide or publisher identity
  changes. Use globally stable IDs and decide qualified paths before the pilot.
- **Unsafe permanence:** strict permanence conflicts with legal or safety
  withdrawal. Define transparent tombstones and restricted audit retention.
- **Choice overload:** more items reduce confidence. Lead with collections and
  progressive high-value filters; test shortlist quality, not just search hits.
- **Taxonomy drift and stigma:** uncontrolled or poorly named tags become noisy
  or harmful. Use curator-owned definitions, aliases, inclusive review, and
  versioned changes.
- **Popularity feedback loop:** prominent items collect more actions and become
  more prominent. Keep editorial/quality/popularity distinct, show time windows,
  apply thresholds, and preserve exploration space if counts are added later.
- **Privacy drift:** search, reports, or “anonymous” analytics begin carrying
  sensitive interests or stable identity. Prohibit raw/free text in events,
  minimize reports, and require a new approved contract for every boundary.
- **Quality-score theatre:** one score hides incomplete or incomparable
  evidence. Display separate factual review dimensions and recency.
- **Creator supply-chain risk:** untrusted contributions introduce hidden
  instructions, secrets, executable automation, remote assets, plagiarism, or
  malicious prompts. Quarantine, validate as data, forbid contributor code
  execution, and promote only reviewed artifacts.
- **Rights ambiguity:** current alpha terms do not establish creator
  contribution rights. Resolve licence, warranties/representations, takedown,
  and maintenance ownership before publication.
- **Review bottleneck:** catalogue targets exceed human safety and experience
  capacity. Bound release cadence and pilot size; do not lower the quality bar
  to satisfy a numerical catalogue target.
- **Static index bloat:** embedded prompts, artwork, and search data hurt mobile
  load. Keep the listing index metadata-only, lazy-load detail assets, budget
  bytes, and validate a representative fixture.
- **Backend inevitability bias:** creator tooling is assumed to require a full
  service. Prove reviewed repository submissions first and add runtime only for
  a demonstrated need.

## Stop conditions

- Do not publish a new versioning model until all three existing cartridge
  bytes, digests, IDs, and public paths have an explicit preservation plan.
- Do not call a URL immutable if the build can silently replace or omit its
  non-withdrawn version.
- Do not collect or transmit events until fields, processor, notice/consent,
  retention, access, deletion, aggregation, and recovery are approved.
- Do not collect search queries, transcripts, prompts, mementos, boundaries,
  credentials, or stable user/device identity for catalogue ranking.
- Do not present acquisition actions as users, starts, plays, completions,
  enjoyment, quality, safety, or compatibility.
- Do not accept public or invited creator publication until rights, provenance,
  identity, review, reporting, withdrawal, appeal, and maintenance ownership are
  defined.
- Do not execute contributor-supplied code or expose deployment secrets to
  untrusted submission validation.
- Do not weaken the common covenant, transparent source, fallback delivery,
  exact-byte integrity, or compatibility evidence gate to improve discovery.
- Do not add accounts or a dynamic catalogue merely because the design target
  is hundreds; require a demonstrated user or operational need.
- Do not deploy, publish, change domains, or make another external write without
  separate human authorization.

## Validation required in the later specification

- Migration fixtures proving the three current cartridge bytes, SHA-256 values,
  IDs, legacy URLs, delivery envelopes, and visible source remain exact.
- Ledger/CI negative tests for mutation, deletion, duplicate ID/version,
  namespace collision, bad digest, dangling reference, unknown metadata, and
  unauthorized lifecycle transition.
- Build and artifact-audit tests deriving and then strictly checking the full
  expected tree for current, deprecated, superseded, and withdrawn fixtures.
- Search/filter/category/collection/recommendation correctness tests, including
  empty, combined, aliased, conflicting, and no-result states.
- Accessibility and progressive-enhancement tests at 320 CSS pixels, 200% text,
  keyboard-only, screen-reader semantics, reduced motion, and no JavaScript.
- Performance budgets and a synthetic representative hundreds-scale catalogue
  covering index size, build time, page load, interaction latency, and artwork
  loading on constrained mobile/network profiles.
- Security tests for hidden/executable content, prompt authority, remote assets,
  malicious metadata, path traversal, untrusted contribution files, and secret
  exposure.
- Provenance, rights, review, content-note, compatibility, and withdrawal-state
  completeness tests for every selectable version.
- Request/storage inventory proving no analytics, raw query, event persistence,
  cookie, service worker, account, backend, or transcript receiver in alpha.
- Moderated player tests measuring time-to-confident-shortlist, explanation
  comprehension, content-note usefulness, trust interpretation, handoff, stop,
  and role release without retaining private gameplay transcripts.
- Full repository validation under the project adapter: focused tests, static
  build, artifact audit, browser tests, and independent agent review before
  human output testing.

## Handoff to specification

The later `bwh-spec` should treat this as a hosting/catalogue slice, not a
creator marketplace or analytics implementation. It should first decide
identity/path namespace, withdrawal behaviour, and immutable-versus-mutable
metadata authority; then specify the registry/archive migration, generated
catalogue, discovery UX, trust display, and bounded first-party alpha. Live
measurement and invited submissions should remain separately gated follow-on
slices unless the human explicitly expands the approved specification.
