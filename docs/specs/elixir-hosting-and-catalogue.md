# The Guide — Elixir Hosting and Catalogue Specification

## Status

**READY FOR HUMAN TESTING**

This specification defines a bounded static hosting and discovery iteration for
The Guide. It migrates the existing three first-party Elixirs into a
registry-driven catalogue, makes published-version retention enforceable, and
adds scalable search, filters, collections, explainable recommendations, and
factual trust displays.

The repository owner confirmed the discovery recommendations for globally
stable publisher-qualified identity, permanent legacy URLs, an append-only
release ledger, transparent withdrawal tombstones, and separation of immutable
release facts from mutable catalogue metadata.

The repository owner approved this specification for development on 2026-07-18
and authorized completion of all H01–H08 tasks before human review. Approval
authorizes bounded local implementation, active-plan traceability, validation,
and independent agent review. It does not authorize commits, pushes, pull
requests, deployment, publication, analytics collection, a backend, accounts,
creator submissions, or changes to published cartridge behaviour.

Development began on 2026-07-18 with H01 active in `docs/tasks/mvp.md`.

Local development and six independent review passes completed on 2026-07-19.
The final review found no blocking or should-fix hosting/catalogue issue. This
state authorized human catalogue output review only. Human review on 2026-07-19
found that the landing page still reads as three exhaustive cartridge cards and
would become an overlong vertical feed at catalogue scale. This revision keeps
the approved static catalogue architecture and adds a bounded, collection-led
discovery presentation inspired by streaming catalogues: one editorial
spotlight, compact horizontal shelves, and a separate browse/search surface.
The repository owner approved the H09–H11 presentation refinement on
2026-07-19 and requested the BWH development workflow through independent
review. That approval authorizes bounded local implementation, plan
traceability, validation, and review of the revised presentation.
Development resumed on 2026-07-19 with H09 active in `docs/tasks/mvp.md`.
H09–H11 development and the seventh independent review completed on
2026-07-19. The reviewer found no blocking or should-fix catalogue-refinement
finding and returned this workstream for human output testing.
Human visual review then found that the shared branding still resembled a
retro adventure game rather than a premium library of interactive stories.
The owner approved a bounded local branding refinement on 2026-07-19: neutral
minimalist site chrome, contemporary sans-serif typography, artwork-led cards,
story-first catalogue language, and new genre-specific presentation art for
The Regency Ball only. Other story images remain unchanged. Because the
published Regency `0.1.0` artwork is digest-bound, the new image is registered
as mutable catalogue presentation art and the original published artwork is
retained unchanged. This approval authorizes local implementation, validation,
plan traceability, and independent review, but not commit or publication.
Local implementation, complete validation, and independent review then
completed on 2026-07-19. The reviewer found no blocking or should-fix B01
finding and returned the branding refinement for human visual testing. Detailed
evidence is recorded in
`docs/evaluations/catalogue-branding-agent-review.md`.
Human detail-page review then found that cartridge pages expose too much
technical and repetitive information before the play action. The owner approved
a bounded B02 refinement on 2026-07-19: lead with artwork and a short synopsis,
merge the overlapping pre-play and Story-experience facts into one concise
section, move the start instructions directly after it, and keep trust,
provenance, prompt fallbacks, and raw source available through collapsed
progressive disclosure. Delivery payloads, no-JavaScript recovery, lifecycle
notices, cartridge bytes, and release facts remain unchanged. This authorizes
local implementation, validation, plan traceability, and independent review,
but not commit or publication.
Local implementation, complete validation, and independent review completed on
2026-07-19. The reviewer found no blocking or should-fix B02 issue and returned
the simplified cartridge detail hierarchy for human visual testing. Detailed
evidence is recorded in
`docs/evaluations/cartridge-detail-simplification-agent-review.md`.
It does not authorize a commit, push, deployment, publication, external
ledger-variable configuration, or gameplay compatibility claim. Overall product
testing remains separately gated by E07’s second live harness class.

## Objective and scope

Replace the hard-coded three-item cabinet model with a deterministic static
catalogue model capable of safely representing hundreds of Elixir metadata
records while preserving:

- the exact bytes, digests, IDs, legacy URLs, and delivery behaviour of Signal,
  Mystery, and Story `0.1.0`;
- self-contained ChatGPT delivery, raw copy, download, visible source, and the
  experimental pinned resolver;
- the common covenant, conversation-only gameplay, consent, stop, grounding,
  data, and role-release boundaries;
- no accounts, application server, live analytics, transcript receiver, or
  persistent user profile; and
- deterministic builds, strict artifact audit, host portability, and manual
  publication authority.

The implementation publishes no new Elixir content. A synthetic fixture proves
the hundreds-scale path without lowering the content quality bar.

## Problem

The current artifact is safe and deterministic because its build and audit
explicitly name three cartridges, three artworks, three detail pages, and three
versioned output paths. That design does not scale operationally. More
importantly, current canonical source stores only one file per slug, so a later
version could cause a fresh build to omit an older published version even
though its URL looks immutable.

The cabinet also lacks controlled discovery metadata, catalogue lifecycle
state, collections, searchable public projections, version history, and a
clear distinction between editorial recommendation, quality evidence,
compatibility, trust, and popularity.

## Desired outcome

### Player outcome

A visitor can use a fast, accessible static catalogue to reduce hundreds of
possible Elixirs to a trustworthy shortlist based on time, energy, movement,
mechanic, tone, required inputs, and content/access considerations. The visitor
can understand why an Elixir is shown, inspect its publisher, version,
provenance, review, compatibility, and lifecycle state, then use the existing
private self-contained delivery flow.

### Maintainer outcome

A maintainer can add catalogue records and immutable release versions through a
strict reviewable repository workflow. The build discovers approved records,
emits all non-withdrawn historical versions, derives its exact artifact
allowlist, rejects mutation or disappearance, and supports explicit
deprecation, supersession, and withdrawal without silently replacing cartridge
bytes.

## Actors

- **Prospective player:** searches and filters for an appropriate Elixir.
- **Returning player:** looks for a different experience without an account or
  centrally stored history.
- **Player with access or content constraints:** relies on consistent facets and
  content notes before opening or delivering a cartridge.
- **Catalogue curator:** owns taxonomy, collections, editorial order,
  recommendations, lifecycle, and correction history.
- **First-party author:** supplies versioned cartridge content and provenance.
- **Safety/quality reviewer:** reviews rights, source, gameplay behaviour,
  content notes, accessibility, and evidence.
- **Publisher/maintainer:** validates, builds, audits, releases, withdraws, and
  recovers the static artifact.
- **Future invited creator:** is represented by publisher-aware data structures
  but cannot submit or publish in this iteration.
- **Third-party harness/provider:** receives the cartridge and owns gameplay,
  memory, permissions, and provider-side processing.

## Work type

Static information architecture, schema and migration design, deterministic
generation, supply-chain integrity, privacy-preserving discovery, accessible
front-end behaviour, release governance, and recovery.

## Goals

- Make immutable version retention enforceable rather than conventional.
- Remove hard-coded cartridge and artifact path lists in favour of strict
  registry-derived discovery and audit.
- Preserve every current published byte and legacy delivery path.
- Establish publisher-qualified paths and globally stable identity before
  external creators exist.
- Separate immutable release facts from correctable editorial catalogue data.
- Support deterministic client-side search, filtering, static collections, and
  explainable non-personal recommendations.
- Present quality, compatibility, provenance, lifecycle, and future popularity
  as distinct signals.
- Prove the architecture with 500 synthetic catalogue entries while publishing
  only the current reviewed first-party content.
- Preserve the current zero-collection, no-account, no-backend architecture.
- Leave explicit, safe seams for later first-party growth and an independently
  specified invited-creator pilot.

## Non-goals

- Authoring or publishing additional Elixir cartridges.
- Live analytics, popularity counts, event transmission, collection, cookies,
  browser persistence, stable identity, or reporting dashboards.
- Accounts, favourites, recently viewed items, cross-device state, or
  personalised behavioural ranking.
- A backend, database, API, search service, dynamic rendering, or moderation
  application.
- Creator submissions, authentication, publisher verification, public uploads,
  ratings, reviews, comments, payments, or marketplace economics.
- A private safety-report intake service; choosing and implementing it is a
  gate for the later invited-creator pilot.
- Receiving or analysing search queries, gameplay prompts, transcripts,
  boundaries, mementos, credentials, agent memory, or provider identity.
- Changing current cartridge bytes, covenant text, artwork bytes, gameplay,
  compatibility labels, delivery event semantics, or named-harness evidence.
- Automatically deploying or publishing the result.

## Confirmed decisions

1. The alpha remains a static, registry-driven, editorial catalogue.
2. Git and reviewed repository records remain the publication system of record.
3. Elixir identity is globally stable and separate from display title and
   mutable publisher branding.
4. New public cartridge paths are publisher-qualified:
   `cartridges/<publisher-id>/<elixir-slug>/<version>/elixir.md`.
5. Existing first-party paths
   `cartridges/<slug>/0.1.0/elixir.md` remain permanent byte-identical legacy
   resources. Current `0.1.0` detail pages and resolver prompts continue using
   them in this iteration.
6. Every published version has an append-only release-ledger entry binding ID,
   publisher, slug, semantic version, byte count, SHA-256, source path, source
   revision, publication date, and public paths.
7. A non-withdrawn published release may never be modified or omitted from a
   later artifact. Behaviour or contract changes require a new version.
8. Urgent safety or rights withdrawal is the only permitted exception to byte
   availability. The old URL serves an explicit deterministic tombstone rather
   than altered cartridge content or an unexplained missing resource.
9. Immutable release facts and mutable catalogue/editorial state are separate
   strict records with correction history.
10. Alpha discovery uses controlled facets, editorial collections, and
    deterministic explainable related-item rules, not behavioural
    personalisation.
11. Alpha popularity is absent. Local delivery event contract `1.1.0` remains
    ephemeral and uncollected.
12. No creator content, account, submission flow, reporting service, or backend
    is part of this iteration.

## Assumptions

- The owner approval of the recommendations selects a static Markdown
  tombstone on GitHub Pages, because Pages cannot guarantee application-owned
  HTTP `410` behaviour. Another host may map the same withdrawal record to
  `410` later without changing the catalogue contract.
- `the-guide` is the permanent publisher ID for current first-party content.
- Existing cartridge IDs such as `the-guide.elixir.signal` already express the
  publisher-qualified identity model and remain unchanged.
- The existing three source files remain at `content/elixirs/<slug>.md` to keep
  current commit-pinned resolver and provenance behaviour stable. New versions
  later use a version-archive path; this specification creates support and
  fixtures but no new release.
- Catalogue schema version `1.0.0` is separate from embedded cartridge metadata
  schema `1.0.0`; version numbers do not imply the same contract.
- Initial taxonomy wording may receive human copy edits during development if
  IDs, semantics, filter behaviour, and acceptance criteria do not change.
- Default ordering is explicit editorial order followed by title, never event
  volume.
- A 500-entry synthetic fixture is representative of the immediate
  hundreds-scale design target.
- Search uses a small project-authored deterministic matcher unless evidence
  shows a third-party index dependency is necessary. Adding a dependency
  requires focused supply-chain review.
- The current three Elixirs remain `experimental`; catalogue migration creates
  no new compatibility claim.

## Definitions

- **Elixir ID:** permanent identity in the form
  `<publisher-id>.elixir.<elixir-slug>`.
- **Publisher ID:** stable lowercase kebab-case publisher namespace; display
  name is separate.
- **Release:** one immutable ID/version/source-byte tuple recorded in the
  release ledger.
- **Catalogue entry:** mutable curated record selecting the recommended release
  and supplying discovery/lifecycle data.
- **Legacy cartridge URL:** the existing unqualified first-party resource path.
- **Canonical cartridge URL:** publisher-qualified path for a release.
- **Release ledger:** append-only public integrity record for published
  versions. It is not an analytics log.
- **Withdrawal record:** append-only operational record authorizing a tombstone
  for one release.
- **Tombstone:** safe static Markdown explaining that a specific version is no
  longer distributed; it is never a substitute cartridge.
- **Editorial collection:** curator-authored ordered set of Elixir IDs with a
  visible rationale.
- **Related recommendation:** deterministic metadata match with a visible
  reason, not a personalised prediction.
- **Acquisition action:** qualifying local delivery action under contract
  `1.1.0`; no such events leave the page in this iteration.

## Proposed source and data model

### Repository records

The implementation should add one catalogue source area using strict JSON
records or an equivalently strict project-native representation:

```text
content/catalogue/
  catalogue.json
  publishers.json
  taxonomy.json
  collections/
    <collection-id>.json
  releases.json
  withdrawals.json
```

Current cartridge and artwork source paths remain unchanged. Support for later
version archives uses:

```text
content/elixirs/releases/<publisher-id>/<elixir-slug>/<version>/elixir.md
site/elixirs/assets/cartridges/<publisher-id>/<elixir-slug>/<asset-id>.<ext>
```

No future-version or creator files are published in this iteration. Synthetic
scale fixtures belong under test fixtures and must never enter the production
artifact.

### Publisher record

Each publisher record contains exactly:

- catalogue schema version;
- stable `publisherId`;
- display name;
- publisher type, currently only `first_party`;
- public attribution text;
- rights/review status;
- optional public information URL from an exact allowed-origin policy; and
- lifecycle state.

The production schema accepts only the current first-party publisher in this
iteration. The shape is creator-ready; accepting `invited` or `third_party`
values requires a later approved schema version and contribution policy.

### Immutable release record

Each release-ledger entry contains exactly:

- catalogue schema version;
- Elixir ID, publisher ID, slug, and semantic version;
- embedded cartridge metadata schema and covenant version;
- canonical source path;
- UTF-8 byte count and lowercase SHA-256;
- source Git revision at publication;
- publication timestamp/date;
- canonical publisher-qualified cartridge path;
- zero or more permanent legacy paths;
- artwork provenance IDs and digests;
- rights/licence reference;
- review-evidence references;
- compatibility-evidence references; and
- release status at publication.

Artwork provenance distinguishes an active local generation reference from an
archived Git reference. Archived references retain the true source path, exact
source revision, Git object, byte count, SHA-256, and a checked-in recovery
record; they must never be replaced with an unrelated live file merely to pass
existence validation.

Entries are unique by both ID/version and every public path. Ordering is
deterministic. Released entries cannot be edited or deleted; corrections are
new catalogue corrections, evidence records, withdrawal records, or new
versions.

Withdrawal records are also append-only against the protected base. An ordinary
candidate cannot delete or edit one to restore playable bytes; reinstatement is
a separately approved recovery operation outside the publication workflow.
Where present, a withdrawal successor must exactly match the release-version
lifecycle successor and resolve to a published release.

### Mutable catalogue entry

Each catalogue entry contains exactly:

- catalogue schema version;
- Elixir ID and publisher ID;
- stable catalogue/detail slug;
- recommended version;
- lifecycle: `published`, `deprecated`, `superseded`, or `withdrawn`;
- title, summary, and player promise projection for listing/search;
- editorial order and optional featured rationale;
- category IDs and controlled tag IDs;
- tone, mechanic, activity/setting, and replayability IDs;
- derived or declared duration band, energy, movement, and required inputs;
- controlled content-note and access-consideration IDs;
- audience and locale IDs;
- review state/date and maintenance owner;
- optional successor ID/version;
- an exhaustive per-release version lifecycle list with version, lifecycle,
  and optional successor, keeping historical release state separate from the
  entry-wide recommended-version lifecycle;
- collection membership derived from collection records, not duplicated; and
- correction history for material public trust/discovery changes.

Identity, version, gameplay requirements, capability, data behaviour, covenant,
publisher attribution, and artwork projection must match the referenced
release/cartridge. A mutable entry cannot contradict immutable source.

### Taxonomy

Every taxonomy value contains stable ID, facet, public label, definition,
search synonyms, lifecycle, and replacement ID where deprecated. Production
entries may use only allowlisted taxonomy IDs.

The initial facets are:

- duration band;
- energy;
- movement;
- mechanic;
- tone;
- activity/setting;
- required input;
- replayability;
- content note;
- access consideration;
- audience; and
- locale.

Synonyms improve matching but do not appear as independent filters. Renaming a
label does not change its stable ID. Changing meaning requires a new ID.

### Collection

Each collection has schema version, stable ID, title, summary/rationale,
curator/owner, ordered Elixir references, lifecycle, publication date, and
updated date. References use Elixir ID and normally resolve to the recommended
version; a collection may pin a version only with an explicit rationale.

The migration ships three initial collections backed by the existing content:

- `start-here`;
- `low-energy`; and
- `three-ways-to-play`.

Final public titles and descriptions are human copy decisions, not architecture
changes.

### Withdrawal record and tombstone

A withdrawal record contains release key, withdrawal date, reason enum
(`safety`, `rights`, `integrity`, or `other_public_interest`), public
explanation, authorizing owner, optional successor, original byte count/digest,
and tombstone digest.

The generated tombstone must:

- identify the exact Elixir ID/version;
- say that the cartridge is withdrawn and must not be reconstructed;
- show date, coarse reason, and original SHA-256;
- link only to a validated safe successor or catalogue root;
- contain no original gameplay instructions, report details, or reporter data;
  and
- be byte-identical at canonical and legacy paths.

Withdrawal is tested with fixtures only. Withdrawing a current public Elixir is
an external publication and safety decision outside this development scope.

## Baseline release migration

The ledger must seed the current published source exactly:

| ID/version | Bytes | SHA-256 | Legacy path |
| --- | ---: | --- | --- |
| `the-guide.elixir.signal@0.1.0` | 8307 | `1c371b5813f6d93f37cabe486337f2680928f3e2ae5c19d4e86d40328f597cbb` | `cartridges/signal/0.1.0/elixir.md` |
| `the-guide.elixir.mystery@0.1.0` | 8288 | `f02cc863fb1a7cabd137c7980c2206e947313fa0e010926d1754bb5cb7f2b093` | `cartridges/mystery/0.1.0/elixir.md` |
| `the-guide.elixir.story@0.1.0` | 8108 | `48f4cb4f2b9cbca8c4ce04ba844b12cfb28a6a2e5398cb211ad827e04d6874d9` | `cartridges/story/0.1.0/elixir.md` |

The initial source revision is
`869bcbd12639fae71b56d1b684e9fe9e9b017c53`, the reviewed commit that added
self-contained delivery. The implementation must verify whether the deployed
artifact was built from this exact revision before describing it as the public
publication revision. If deployment evidence differs or is unavailable, keep
the source revision as repository provenance and label the deployment revision
unknown rather than guessing.

For each release, the build additionally emits the identical namespaced path:

```text
cartridges/the-guide/<slug>/0.1.0/elixir.md
```

Existing detail pages, download filenames, delivery prompt bytes, resolver
prompt URLs, source paths, event references, and legacy cartridge paths remain
unchanged for `0.1.0`.

## Functional requirements

### FR-1 — Registry-driven source discovery

1. Production build input must come from strict publisher, catalogue, release,
   taxonomy, collection, artwork-provenance, and withdrawal records.
2. The production build and audit must not contain a hard-coded list of Signal,
   Mystery, Story, their artwork filenames, detail paths, or release paths.
3. Registry traversal must be deterministic and reject duplicate identities,
   versions, slugs, paths, collection IDs, taxonomy IDs, and provenance IDs.
4. Unknown fields, unknown enums, path traversal, absolute filesystem paths,
   symlinks, remote content, dangling references, and references outside
   approved source roots must fail validation.
5. Each referenced cartridge must pass the existing portable-source, embedded
   metadata, covenant, and delivery-envelope validation before catalogue use.
6. Generated public JSON must be a strict safe projection; source paths,
   reviewer-private data, internal notes, and withdrawal authorization details
   must not be exposed.

### FR-2 — Release integrity and append-only history

1. Every published release must resolve to exact bytes matching its ledger byte
   count and SHA-256.
2. ID, slug, version, publisher, schema, covenant, artwork, and compatibility
   projections must match validated source/evidence.
3. Every canonical and legacy path must be globally unique and deterministic.
4. A release comparison command must compare a proposed ledger with a trusted
   base ledger and fail on modification, deletion, reordering that changes
   canonical serialization, or reuse of an identity/path.
5. Pull-request/release validation must receive the protected base revision
   explicitly; it must not infer trust from contributor-controlled input.
6. Local tests must exercise the comparison using committed positive and
   adversarial fixtures without requiring network access.
7. New entries may be appended only with complete source, provenance, rights,
   review, and compatibility state. This iteration seeds only the three current
   releases.
8. Build output must retain every non-withdrawn ledger release even when it is
   not the recommended version.

### FR-3 — Immutable and legacy URL behaviour

1. Every release emits its canonical publisher-qualified URL.
2. The three baseline releases also emit their declared legacy paths.
3. Canonical and legacy files for a non-withdrawn release must be byte-identical
   to source and each other.
4. Stable catalogue detail URLs may change editorial content and recommended
   version; they must not be described as immutable resources.
5. Version history must expose canonical and legacy paths, digest, byte count,
   lifecycle, and successor where relevant.
6. No redirect, query parameter, hard-coded host, custom content type, or
   server rewrite may be required for cartridge retrieval.
7. Links must operate at artifact root, repository subpath, later custom-domain
   root, and local static preview.

### FR-4 — Withdrawal and supersession

1. Deprecation and supersession leave original cartridge bytes available and
   add visible catalogue guidance.
2. Withdrawal requires a valid append-only withdrawal record and changes every
   public path for that release to the deterministic tombstone.
3. The artifact must never serve a different playable cartridge at a withdrawn
   version path.
4. A withdrawn version must not appear in ordinary results, related items,
   collections, primary delivery controls, or generated delivery references.
5. Direct version history may show the safe public tombstone facts.
6. Removing a withdrawal or reinstating bytes requires a separately approved
   recovery procedure; it cannot occur by ordinary catalogue editing.
7. The static Pages implementation may return HTTP `200` for a tombstone. UI and
   content must not claim HTTP `410` unless the deployed host actually provides
   it.

### FR-5 — Metadata authority and corrections

1. Release records own historical identity, version, bytes, publisher at
   publication, embedded gameplay facts, covenant, provenance, and rights.
2. Catalogue records own recommended version, taxonomy, collections, editorial
   order, featured rationale, maintenance, review recency, lifecycle, and
   successor guidance.
3. A catalogue projection must not contradict release/cartridge facts.
4. A change to gameplay instructions, promise, demands, required inputs,
   capability, data behaviour, covenant, or embedded content notes requires a
   new cartridge version.
5. A curator may correct taxonomy labels, search synonyms, collection
   membership, maintenance, or review state without changing cartridge bytes.
6. Material corrections affecting trust or discoverability require a dated
   public correction record; cosmetic punctuation does not.
7. Generated catalogue data must identify its schema and deployment revision.

### FR-6 — Catalogue browse, search, and filtering

1. The build must generate a compact metadata-only `catalogue-index.json` and
   complete static browse/detail/collection pages.
2. The index must not contain cartridge instructions, delivery prompts,
   transcript data, internal paths, private evidence, or arbitrary free text.
3. Search operates locally over title, summary, promise, publisher display
   name, controlled public labels, and approved synonyms.
4. Search must not inspect full cartridge instructions or send/store the query.
5. Match order is deterministic: exact/prefix title, title token, controlled
   label/synonym, publisher, then summary/promise token.
6. Filtering is OR within one facet and AND across facets.
7. Initial filters expose duration, energy, movement, mechanic, tone, required
   input, content note, access consideration, and lifecycle/compatibility where
   meaningful.
8. The landing page is discovery-led rather than a complete vertical listing:
   it shows one editorial spotlight and ordered collection shelves, then links
   to a dedicated complete browse/search surface.
9. Empty search on the browse surface shows the editorial browse default.
   No-result state explains active constraints and provides accessible
   clear-one/clear-all controls.
10. A filter state may be shareable only through allowlisted facet IDs in the
   URL. Raw search text must not enter URL parameters.
11. Default sort is editorial order then title. User-selectable sorts may
    include title and duration; no popularity sort is present.
12. Search/filter controls are keyboard and screen-reader operable and retain
    focus predictably as results update.
13. Without JavaScript, visitors can browse the complete catalogue and generated
    collection/category pages, open detail pages, and use all delivery paths.
14. Search results use compact cards and bounded pagination/show-more behaviour;
    the landing page never expands into the entire catalogue feed.

### FR-7 — Collections and explainable recommendations

1. Collection pages show title, rationale, curator, dates, and ordered items.
2. Unknown, withdrawn, or duplicate references fail the build.
3. Related recommendations are computed at build time or deterministically in
   browser code from public controlled metadata only.
4. The rule prioritizes shared duration/tone/activity fit, then deliberately
   different mechanics; ties use editorial order then title.
5. A detail page shows at most three related Elixirs and a concise reason using
   public facet labels, such as “similar energy, different mechanic.”
6. An explicit editorial recommendation may override the rule only through a
   reviewed collection/catalogue record with visible rationale.
7. Recommendations must not claim personal knowledge, popularity, completion,
   quality, safety, or compatibility beyond displayed evidence.
8. The landing page presents a reviewed subset of published collections as
   ordered shelves. A collection may remain available as a complete static page
   while omitted from the landing page when it duplicates the spotlight. Each
   visible shelf is a labelled semantic list with its rationale and a link to
   its complete collection page.
9. Shelves use contained horizontal overflow: touch/trackpad scrolling on small
   screens and labelled previous/next controls where controls add value. They
   must not auto-advance, loop deceptively, trap focus, or cause document-level
   horizontal overflow.

### FR-8 — Trust, quality, compatibility, and lifecycle display

1. Landing and browse cards expose artwork, title, a concise promise, and at
   most three high-value fit signals selected from duration, energy, movement,
   and mechanic. Experimental/lifecycle state remains visible but the full fact
   grid moves to the detail page.
2. Detail/version pages expose publisher type, exact version, digest, covenant,
   source/artwork provenance state, rights summary, review state/date, content
   notes, maintenance state, and compatibility scope.
3. First-party, review, provenance, compatibility, and lifecycle labels are
   separate factual labels. No generic “verified” or composite quality score is
   allowed.
4. Compatibility remains fail-closed, named-class/version scoped, and linked to
   complete redacted evidence.
5. Acquisition actions and future popularity are not displayed in this
   iteration and cannot affect editorial order or recommendations.
6. Deprecated/superseded entries show a successor before delivery while keeping
   transparent access to the historical source.
7. Withdrawn entries follow FR-4 and cannot be delivered.

### FR-9 — Delivery and event-contract preservation

1. Existing self-contained prompt, resolver prompt, raw copy, Markdown
   download, visible source, and no-JavaScript fallback remain available.
2. For the three baseline releases, self-contained envelope bytes, detail-page
   delivery wording, legacy cartridge URL, download filename, resolver source
   path, and browser event references remain unchanged unless an independently
   reviewed fixture proves a non-behavioural base-path substitution is required.
3. Delivery event contract remains strict version `1.1.0` with its current four
   methods, conditional targets/results, and acquisition semantics.
4. Valid release references are derived from currently deliverable registry
   records rather than a hard-coded array.
5. Events remain local ephemeral `CustomEvent` values. No network, persistence,
   logging, cookie, stable identity, or collector is added.
6. Search queries, facets, collection IDs, recommendation origins, lifecycle,
   and publisher data must not be added to contract `1.1.0`.
7. A later discovery-event contract or collector requires separate discovery,
   privacy design, approval, and schema versioning.

### FR-10 — Static architecture, privacy, and security

1. The production artifact contains no server bundle, API, database, secret,
   authentication, account, analytics SDK, third-party script, remote runtime
   asset, service worker, or dynamic rendering dependency.
2. Search and recommendation require no network request after the static
   catalogue index is loaded.
3. The cabinet receives no transcript, prompt, search query, boundary, memento,
   credential, agent memory, gameplay state, or provider identity.
4. Source records and generated values must be HTML/JSON escaped by context and
   may not create executable markup, dynamic code, arbitrary URLs, or DOM IDs.
5. Generated paths must be normalized under approved roots and reject traversal,
   encoded separators, collisions, reserved names, symlinks, and case-folding
   ambiguity.
6. Untrusted fixture or future contribution content is treated as data and may
   not add workflows, packages, scripts, remote assets, or executable HTML.
7. Content Security Policy support should be evaluated, but lack of host-owned
   response headers must not block the static artifact. No security claim may
   depend on unavailable Pages headers.
8. The GitHub Pages workflow remains manual-only and least privilege. Deployment
   is not part of development completion.

### FR-11 — Accessibility and progressive enhancement

1. The catalogue is usable at 320 CSS pixels, 200% text zoom, keyboard-only,
   common screen-reader modes, reduced motion, and high-contrast preferences.
2. Result counts and filter changes use an appropriately scoped status region
   without announcing every keystroke excessively.
3. Cards, filters, tags, collections, trust labels, content notes, and
   withdrawal states do not rely on colour, artwork, animation, hover, or icon
   shape alone.
4. Native links and controls are preferred. Custom widgets require complete
   keyboard and accessibility semantics.
5. Artwork retains dimensions, meaningful alt text, provenance, lazy loading
   below the fold, and no text-only information encoded solely in the image.
6. Static no-JavaScript browse/collection pages provide equivalent access to
   every non-withdrawn Elixir, though dynamic filtering need not be reproduced.

### FR-12 — Scale and performance

1. A deterministic 500-entry synthetic fixture must exercise registry
   validation, build, audit, search, filters, collections, related rules, and
   path collision detection.
2. Synthetic entries and assets must never enter the production artifact.
3. The production listing index is metadata-only and excludes embedded
   cartridge/delivery bytes and full artwork manifests not needed for listing.
4. The later development plan must establish measured byte and latency budgets
   from the existing artifact baseline before implementation; arbitrary budgets
   must not be invented in this spec.
5. Validation must report index bytes, generated file count, build duration,
   audit duration, and browser interaction timing for the fixture.
6. Search/filter interaction should complete within one animation frame on the
   project test environment after index load; if evidence shows that target is
   unrealistic, the spec must be refined rather than hiding delayed results.
7. Initial page HTML must not embed 500 complete detail cards or cartridges;
   static pagination/collections and the compact index bound first load.
8. At 100 or 500 entries, landing-page height is determined by the number of
   curated shelves rather than the number of catalogue entries. Each shelf
   renders only its curated members and links to its complete collection page.
9. Artwork after the editorial spotlight is lazy-loaded. Shelf interaction
   requires no third-party carousel dependency and remains usable without
   JavaScript.

### FR-13 — Creator-ready seams without creator scope

1. Registry relationships use publisher IDs and globally stable Elixir IDs
   rather than assuming display name `The Guide` as catalogue identity.
2. Production publisher and cartridge validation still accepts only current
   first-party content in this iteration.
3. No submission endpoint, external repository ingestion, creator login,
   contributor workflow execution, or remote asset fetch may be added.
4. The UI must not advertise submissions before contribution terms, private
   reporting, moderation, withdrawal/appeal, identity, rights, and review
   capacity are approved.
5. A later invited-creator spec may version publisher/cartridge schemas and
   promote reviewed data into this static publication pipeline; it must not
   mutate existing release identities or paths.

## Proposed static experience

```text
collection-led landing page
  -> one editorial spotlight with a clear reason and primary detail action
  -> compact horizontal shelves for Start here, mood, energy, and play shape
  -> dedicated browse/search surface when the visitor wants the full catalogue
  -> deterministic shortlist with a few visible fit signals
  -> stable Elixir detail page and version history
  -> inspect complete immutable cartridge
  -> copy self-contained ChatGPT prompt (primary)
  -> gameplay occurs privately in chosen harness
```

The catalogue root should feel like browsing a streaming library, without
copying its dark patterns. It leads with a single curator-selected spotlight,
then a short stack of clearly titled editorial shelves. Each shelf shows
compact artwork-led cards in a contained horizontal track, gives its editorial
rationale, and links to a complete static collection page. Cards prioritize
recognition and fit: artwork, title, one concise promise, and no more than three
controlled signals. They are links, not mini detail pages.

Search remains easy to reach from the landing page but opens or focuses the
dedicated browse surface. The browse surface progressively enhances static
paginated pages with local search, filters, and sorting. It may show a compact
grid of 24 results at a time, but it is not the default landing experience and
does not use endless scroll. Full demands, trust facts, provenance, evidence,
version history, content/access notes, and delivery controls remain on the
Elixir detail/version pages.

The spotlight is selected deterministically from the first published entry with
a `featuredRationale`, then editorial order. Its rationale is visible so it is
not mistaken for popularity or personalisation. Shelves preserve collection
order. Repetition across editorial shelves is permitted when truthful, but the
initial three-item catalogue should avoid presenting repeated full fact grids;
the visual model must remain credible when fixtures contain 100 or 500 entries.

Shelf navigation is native and resilient: swipe/trackpad scrolling on narrow
screens, optional labelled previous/next controls on wider screens, no
autoplay, no infinite looping, and no dependency on JavaScript for item links.
Focused cards are scrolled into view, and the page remains usable at 320 CSS
pixels and 200% text zoom.

The three-item migration should feel like an improved cabinet rather than an
empty marketplace. Synthetic scale data appears only in automated/test preview
contexts.

## Publication and trust flow

```text
validated canonical cartridge + provenance/evidence
  -> append complete release-ledger entry
  -> compare against protected base ledger
  -> validate catalogue/taxonomy/collection projections
  -> deterministic build of exact expected tree
  -> strict artifact audit
  -> independent agent review
  -> human output testing
  -> separate publication authorization
```

Future releases use a two-stage gate: ledger append and catalogue recommendation
change are reviewable separately. A release may exist historically without
being recommended. A catalogue correction cannot rewrite release history.

## Security, privacy, and permissions analysis

- Registry-driven generation increases input surface. Strict schemas, exact
  roots, collision checks, escaping, and derived artifact allowlists replace
  unsafe permissive file discovery.
- Release immutability depends on both automated comparison and protected human
  review. Contributor-controlled changes cannot define their own trusted base.
- The namespaced public path prevents creator slug collision, but publisher
  verification remains deferred; a namespace is not an identity badge by
  itself.
- A tombstone changes bytes served at an immutable path only under an explicit
  withdrawal exception. It is safe because it cannot be mistaken for another
  playable version and the ledger retains the original digest.
- Search terms can reveal sensitive interests. They stay in page memory, do not
  enter share URLs, events, logs authored by The Guide, or persistent storage,
  and are discarded with the page.
- Static hosting providers still process ordinary HTTP/network data under their
  terms. The cabinet privacy notice must retain that distinction.
- Public catalogue metadata is untrusted presentation data despite repository
  review; all rendered contexts require escaping and allowed-origin rules.
- No creator code is executed. The future creator seam is data-only until a
  later trust-boundary specification.
- The existing cartridge remains an instruction contract, not a sandbox. Search
  and trust labels must not imply The Guide controls the receiving harness.
- Development authorization remains local. Commits, pushes, deployment,
  publication, withdrawal of a public version, analytics, and new services
  require separate authority.

## Compatibility, rollout, migration, and recovery

### Rollout

1. Capture immutable baseline fixtures for the current three sources, artwork,
   delivery envelopes, resolver prompts, event references, and artifact paths.
2. Add strict catalogue schemas, fixtures, and internal consistency validation.
3. Seed publishers, taxonomy, collections, catalogue entries, release ledger,
   and empty withdrawal records for the current content.
4. Refactor build and audit to derive input/output from validated records while
   preserving the baseline artifact behaviour.
5. Add namespaced byte-identical cartridge paths and version-history/trust data.
6. Add static browse pages, compact index, client search/filters, collections,
   and explainable related items.
7. Add adversarial, accessibility, privacy, performance, root/subpath, and
   500-entry scale validation.
8. Run full repository validation and independent agent review.
9. Hand the result to the human for output testing. Do not deploy or publish.

### Migration invariant

At every step, the three baseline cartridge source files, artwork, common
covenant, self-contained delivery prompts, current compatibility evidence, and
legacy public paths remain recoverable and testable. Any unexpected current
delivery-envelope or cartridge-byte change stops migration.

### Recovery

- Before merge, revert/delete the bounded catalogue implementation and retain
  the existing three-item build.
- After an authorized merge but before publication, rebuild the previous
  reviewed source revision.
- After publication, redeploy the last reviewed artifact and restore its
  catalogue records; immutable non-withdrawn release files must match the
  ledger in either artifact.
- A faulty catalogue correction can be reverted without altering release
  entries or cartridge bytes.
- A faulty new release remains in historical ledger/source after publication
  and is deprecated, superseded, or explicitly withdrawn; it is not rewritten.
- A public withdrawal or reinstatement follows its own authorization and audit
  process. No user database or data migration exists.

## Acceptance criteria

1. Status records the human-approved development transition and does not claim
   human output testing or publication.
2. Production build input is registry-driven and contains no hard-coded
   three-slug/artwork/path allowlist.
3. Strict schemas reject unknown fields and all invalid/dangling/colliding
   registry, taxonomy, collection, release, publisher, and withdrawal records.
4. Signal, Mystery, and Story `0.1.0` source byte counts and SHA-256 values match
   the baseline table.
5. Current cartridge, covenant, artwork, gameplay, compatibility evidence, and
   published-version behaviour remain unchanged.
6. Existing legacy cartridge URLs emit exact canonical source bytes.
7. New `cartridges/the-guide/<slug>/0.1.0/elixir.md` paths emit those same bytes.
8. Current detail pages, self-contained prompt bytes, resolver prompt URLs,
   raw-copy source, download filename, and local event references pass exact
   migration fixtures.
9. Release-ledger comparison rejects mutation, deletion, duplicate key/path,
   or contributor-controlled base selection and permits complete appends.
10. Every non-withdrawn release is present in the artifact even when not
    recommended.
11. Deprecation/supersession preserves bytes and shows successor guidance.
12. A withdrawal fixture emits the exact tombstone at canonical/legacy paths,
    removes delivery/discovery references, and retains the original digest.
13. The public catalogue index contains only allowlisted metadata and identifies
    schema/deployment revision.
14. Search uses only approved public fields, remains local, and has deterministic
    ranking.
15. Filters implement OR-within/AND-across semantics and accessible empty,
    combined, no-result, clear-one, and clear-all states.
16. Raw search text appears in no URL, event, storage, log, generated file, or
    network request authored by The Guide.
17. Static no-JavaScript pages allow complete catalogue, collection, detail,
    source, URL, and download navigation.
18. Three initial collections resolve deterministically and show rationale.
19. Related items show no more than three deterministic results and a truthful
    public-facet reason.
20. No recommendation claims personalisation, popularity, quality, safety, or
    compatibility beyond displayed evidence.
21. Cards and detail pages distinguish publisher, review, provenance,
    compatibility, lifecycle, and cartridge status without a composite score.
22. Withdrawn versions are not searchable, recommended, collected, or
    deliverable.
23. Delivery event `1.1.0` remains strict, local, ephemeral, identity-free, and
    unchanged in meaning.
24. Production artifact contains no backend, API, database, analytics SDK,
    collector, cookie, persistent browser storage, account, service worker,
    third-party runtime script, or remote asset.
25. The 500-entry fixture passes validation/build/audit/search/filter/collection/
    related/path-collision tests and never appears in production output.
26. Measured index bytes, file count, build/audit duration, and interaction
    timing are recorded against the pre-change baseline.
27. Catalogue journeys pass at root and repository subpath at 320 CSS pixels,
    200% text, keyboard-only, screen-reader semantics, and reduced motion.
28. Full `npm run validate` passes without weakening existing tests or audits.
29. Independent agent review completes before human output testing.
30. No active plan edit, commit, push, PR, deployment, publication, analytics,
    withdrawal, or creator intake occurs under this specification alone.
31. The root page contains exactly one deterministic editorial spotlight and
    does not render the complete catalogue as a vertical card grid.
32. Every homepage-selected editorial collection appears as a labelled shelf
    with a rationale, ordered compact cards, and a link to its complete
    collection page; omitted published collections retain their static pages.
33. Landing and browse cards contain no full fact grid and expose no more than
    three fit signals in addition to title, artwork, concise promise, and
    lifecycle/status treatment.
34. A visitor can reach dedicated browse/search from the landing page; empty
    browse, populated search, filters, sorting, no-result recovery, and static
    pagination retain FR-6 semantics.
35. With a 100- and 500-entry fixture, root-page rendered card count is bounded
    by curated shelf membership and does not equal total catalogue size.
36. Shelves work by touch, trackpad, keyboard, and optional labelled controls;
    they do not autoplay, loop, trap focus, or create document-level horizontal
    overflow at 320 CSS pixels or 200% text.
37. Disabling JavaScript leaves the spotlight, shelf item links, collection
    links, complete static browse path, and cartridge delivery paths usable.
38. No carousel package, remote asset, discovery event, storage, account,
    backend, popularity signal, or personalisation is introduced by the
    presentation refinement.
39. Shared site branding uses neutral minimalist chrome, contemporary sans-serif
    typography, restrained controls, and artwork-led cards without retro game
    typography, fantasy gradients, per-cartridge accent bars, offset shadows,
    or decorative pixel styling.
40. Site-level navigation and discovery language presents The Guide as a
    library of interactive stories while preserving exact Elixir terminology
    where cartridge, delivery, compatibility, or trust contracts require it.
41. The Regency Ball uses distinct genre-specific catalogue presentation art;
    Signal, Mystery, and Story images remain byte-identical and visually
    unchanged.
42. The published Regency Ball `0.1.0` cartridge, release ledger, and
    digest-bound original artwork remain byte-identical; the new cover has its
    own registered provenance, digest, accessible description, and public
    catalogue projection.
43. A cartridge detail page leads with its artwork, title, and one concise story
    synopsis, without visible status badges or duplicate editorial rationale.
44. One visible “What you need to play” section replaces separate “Before you
    play” and “Story experience” panels and shows only the essential duration,
    participation, role or input, and conversation boundary.
45. The primary start instructions immediately follow the concise play facts;
    the complete prompt, alternate resolver, version paths, raw source, and
    factual trust record remain accessible but collapsed by default.
46. Progressive disclosure does not weaken keyboard, screen-reader,
    no-JavaScript, download, manual-copy, lifecycle, privacy, or immutable
    version access.

## Development-readiness bundle

### Proposed task outline

#### H01 — Freeze baseline and define catalogue contracts

- Add exact current cartridge/artwork/delivery/artifact fixtures.
- Implement strict schemas for publishers, releases, catalogue entries,
  taxonomy, collections, and withdrawals.
- Add positive and adversarial cross-record validation.

#### H02 — Seed registry and immutable release ledger

- Create current publisher, release, catalogue, taxonomy, collection, and empty
  withdrawal records.
- Bind the three releases to exact bytes, digests, provenance, evidence, source
  paths, and legacy/canonical URLs.
- Implement trusted-base append-only comparison with fixture support.

#### H03 — Refactor deterministic build and artifact audit

- Replace hard-coded source/output arrays with validated registry traversal.
- Derive the exact expected artifact tree and allowed pinned source paths.
- Emit current legacy paths plus byte-identical namespaced paths.
- Preserve delivery envelopes and production privacy rejection rules.

#### H04 — Build static catalogue and version/trust views

- Generate metadata-only catalogue index, static paginated browse, collection,
  detail, and version-history surfaces.
- Add factual lifecycle, provenance, review, content-note, and compatibility
  displays.
- Add deprecated/superseded/withdrawal fixture presentations.

#### H05 — Add local search, filters, and related items

- Implement deterministic ranking and OR-within/AND-across filters.
- Add shareable controlled facets without raw search text.
- Add accessible result status, no-result recovery, clear controls, and
  explainable related-item rules.

#### H06 — Validate scale, performance, security, and accessibility

- Generate a deterministic 500-entry test fixture outside production roots.
- Test collisions, malicious metadata/paths, escaping, fixture exclusion,
  root/subpath operation, no JavaScript, and privacy inventory.
- Record before/after size, file count, timing, and interaction evidence.

#### H07 — Validate migration and recovery

- Prove current bytes, prompts, URLs, downloads, events, artwork, and evidence
  remain unchanged.
- Exercise append, deprecate, supersede, withdraw, correction, rollback, and
  last-reviewed-artifact recovery fixtures.
- Run focused and full project validation.

#### H08 — Independent review and human handoff

- Run `bwh-agent-review` against this approved specification and project
  guardrails.
- Resolve blocking and should-fix findings.
- Hand validated output to the human for testing without deploying or editing
  the active plan unless separately requested.

#### H09 — Refactor the landing page into editorial discovery

- Replace the root exhaustive card grid with one deterministic editorial
  spotlight and ordered collection shelves.
- Add a dedicated first-page browse route and clear landing-page entry points
  to browse/search and complete collection pages.
- Introduce one shared compact-card projection while retaining detailed facts
  on detail/version pages.

#### H10 — Add resilient shelf interaction and scale coverage

- Implement contained native horizontal scrolling plus accessible labelled
  controls where useful, with no autoplay, looping, focus trap, or external
  carousel dependency.
- Preserve static item/collection/browse navigation without JavaScript.
- Extend 100- and 500-entry fixtures to prove bounded landing height/card count,
  lazy artwork, compact search results, and root/subpath correctness.

#### H11 — Validate and independently review the refinement

- Update browser journeys for spotlight, shelves, browse/search, keyboard,
  touch-sized viewport, 200% text, reduced motion, no-JavaScript, request, and
  storage behaviour.
- Run the complete validation suite and record the revised output evidence.
- Run `bwh-agent-review`, resolve blocking and should-fix findings, and return
  the revised output for human testing without publishing it.

### Dependencies

- Human approval of the H09–H11 presentation refinement; H01–H08 remain
  completed historical work and are not reopened except where regression tests
  require a bounded update.
- Current cartridge, artwork, delivery, compatibility, and provenance fixtures.
- Protected-base revision input for real append-only PR/release comparison.
- Existing npm toolchain, Pages build, and browser-test environment.
- Independent reviewer capacity.
- Separate human authority for any eventual commit, PR, deployment, or public
  catalogue publication.

### Affected areas

- new strict records under `content/catalogue/`;
- current sources under `content/elixirs/` as read-only migration inputs;
- schema, build, audit, delivery-reference, and test-fixture code under
  `scripts/elixirs/`;
- static catalogue presentation under `site/elixirs/`;
- browser journeys under `tests/elixirs/`;
- generated disposable artifact under `dist/elixirs-pages/`;
- Pages workflow only if protected-base validation input is required; workflow
  triggers, deployment authority, and permissions must remain unchanged;
- architecture/product documentation only where needed to reflect an approved
  static catalogue; and
- no active-plan edit under this specification.

### Validation plan

#### Schema and integrity tests

- Positive fixtures for current publisher, releases, entries, taxonomy,
  collections, and empty withdrawals.
- Unknown fields, invalid enums/IDs/versions/digests/dates, duplicate keys,
  collisions, dangling references, contradiction, traversal, symlink, absolute
  path, remote source, and case-folding failures.
- Append-only comparison for add, mutate, delete, reorder, path reuse, false
  base, and withdrawal-record behaviour.

#### Migration and delivery tests

- Exact byte/digest fixtures for cartridges and artwork.
- Exact self-contained envelope and resolver prompt fixtures for all three.
- Legacy and namespaced URL byte equality at root/subpath.
- Raw copy, download, visible source, event reference, no-JavaScript, covenant,
  compatibility, and provenance regressions.

#### Catalogue correctness tests

- Search ranking across title, controlled labels/synonyms, publisher, and
  summary/promise.
- OR-within/AND-across filters, empty query, conflicting filters, no results,
  lifecycle exclusion, controlled URL state, and deterministic sort.
- Collection order/reference validation and related-item score/reason fixtures.
- Immutable/mutable projection consistency and correction history.
- Deterministic spotlight selection, shelf order, compact-card field bounds,
  and dedicated browse-route correctness.
- 100- and 500-entry root rendering proves total catalogue growth does not turn
  the landing page into an exhaustive vertical feed.

#### Security and privacy tests

- HTML/JSON/script-context escaping and malicious metadata fixtures.
- Artifact rejection for remote assets, scripts, APIs, collectors, cookies,
  persistence, service workers, runtime environment access, unexpected URLs,
  and synthetic production leakage.
- Browser request/storage inventory proving search and delivery remain local.
- No raw query, private evidence, reviewer identity, withdrawal authorization,
  report data, or gameplay content in public projections.

#### Accessibility and browser validation

- Root and repository subpath journeys.
- 320 CSS pixels, 200% text, keyboard-only, focus order/retention, live-region
  restraint, reduced motion, colour independence, and screen-reader semantics.
- No-JavaScript static browse, collections, detail, source, URL, and download.
- Shelf touch/trackpad overflow, keyboard traversal, focus visibility,
  previous/next control labelling, and contained document width.

#### Scale and performance evidence

- Existing production baseline and deterministic 500-entry fixture.
- Index and initial HTML bytes, total file count, build/audit duration, page
  load, and search/filter interaction timing.
- Verify pagination/lazy artwork and absence of full cartridges from listing
  index/HTML.

#### Repository validation

```bash
npm test
npm run build
npm run audit:elixirs
npm run test:e2e
npm run validate
```

### Validation evidence required for completion

- Exact migration matrix for the three current releases.
- Schema and append-only adversarial test results.
- Generated artifact path manifest and audit result.
- Search/filter/collection/related correctness results.
- Request/storage/privacy inventory.
- Accessibility and root/subpath browser evidence.
- Production and 500-entry size/performance comparison.
- Full validation output.
- Independent review artifact and resolution of blocking/should-fix findings.
- Explicit statement that no publication or new data boundary occurred.

## Risks and mitigations

- **Ledger self-approval:** contributor changes both release and supposed base.
  Require a protected base revision supplied by trusted workflow/reviewer input;
  test base spoofing.
- **Legacy/canonical divergence:** duplicate URLs serve different bytes. Generate
  both from one validated buffer and compare outputs during audit.
- **Resolver regression:** source/path refactor changes current delivery. Keep
  current source paths and exact envelope fixtures.
- **Withdrawal ambiguity:** tombstone is mistaken for a cartridge or ordinary
  error. Use deterministic markers, exact identity/digest, no gameplay text,
  and removal from all delivery/discovery references.
- **Mutable catalogue rewrites history:** projections contradict the release.
  Validate cross-record authority and require correction history.
- **Registry broadens attack surface:** arbitrary paths or markup reach output.
  Enforce strict schemas, roots, normalization, escaping, and exact tree audit.
- **Taxonomy overload or stigma:** filters confuse or alienate players. Keep the
  initial set bounded, defined, controlled, and subject to human copy testing.
- **Choice overload:** hundreds of cards worsen discovery. Lead with collections,
  one editorial spotlight, compact shelves, a separate browse surface,
  progressive facets, pagination, and shortlist usability testing.
- **Streaming imitation adds dark patterns:** autoplay, looping, hidden focus,
  or oversized promotion harms agency and access. Borrow only the collection-led
  information architecture; prohibit autoplay/looping and keep editorial reasons
  visible.
- **Shelf repetition feels thin with three items:** the same entries can appear
  in several collections. Use distinct truthful collection rationales and
  compact cards, accept limited repetition during the three-item alpha, and
  evaluate the layout primarily against the 100-entry fixture.
- **Recommendation theatre:** deterministic match is mistaken for personalised
  quality. Show reasons and prohibit behavioural/quality claims.
- **Privacy drift:** search/facet activity enters telemetry. Keep event `1.1.0`
  unchanged, add no discovery event, and audit network/storage/query handling.
- **Static performance regression:** metadata/artwork bloat hurts mobile. Use a
  compact index, pagination, lazy artwork, measured budgets, and a 500 fixture.
- **Premature creator trust:** publisher-aware schema appears to accept creators.
  Fail production validation for non-first-party publisher types and advertise
  no submission route.
- **Review burden hidden by fixtures:** scale tests imply content capacity.
  State clearly that fixture scale is technical evidence, not publication
  volume or quality evidence.

## Stop conditions

Stop development and refine the specification if:

- any baseline cartridge, artwork, covenant, delivery prompt, resolver path,
  compatibility evidence, or legacy URL must change unexpectedly;
- append-only validation cannot obtain a base outside contributor control;
- canonical and legacy paths cannot be generated from identical validated bytes;
- GitHub Pages cannot present a withdrawal tombstone without it being mistaken
  for another playable cartridge;
- search/filter scale requires a remote service, persistent user state, raw
  query collection, or an unauditable dependency;
- generated expected paths cannot remain strict enough to reject unexpected
  artifact content;
- implementation requires a backend, account, analytics collector, creator
  intake, new licence/terms, public withdrawal, or external publication;
- current event `1.1.0` semantics would need discovery fields or transmission;
  or
- compatibility, quality, popularity, or play outcomes would be inferred from
  catalogue/delivery actions.

## Open questions

No open question blocks human approval of this bounded architecture.

The following implementation-level choices must be recorded during development
without expanding scope:

1. Final user-facing labels/definitions for the seeded controlled taxonomy and
   three collections.
2. Exact protected-base input mechanism for ledger comparison within the
   existing manual/least-privilege workflow. If it requires broader permissions
   or an external service, stop under the specified condition.
3. Measured performance budgets derived from the pre-change artifact baseline.
4. Whether CSP can be expressed effectively on the eventual static host; no
   security acceptance criterion depends on unsupported response headers.

The browse fallback decision is now resolved: generate a dedicated editorially
ordered, paginated browse route beginning at `/browse/`, alongside complete
static collection pages. Client-side search and filtering progressively enhance
that browse surface.

Separately deferred product decisions are live measurement, private report
intake, creator terms/identity, invited submissions, accounts, favourites, and
dynamic moderation tooling.

## Source-of-truth decisions and conflicts

- On human approval, this specification supersedes the “exactly three” and
  hard-coded first-cabinet constraints in
  `docs/specs/elixir-cartridge-and-first-cabinet.md` only for catalogue
  infrastructure. It does not authorize publishing a fourth cartridge.
- On human approval, it supersedes that specification's recommendation non-goal
  only for transparent editorial and metadata-related recommendations. Ratings,
  behavioural personalisation, and marketplace ranking remain excluded.
- `docs/product-brief.md` remains authoritative for transparent portable
  cartridges, private gameplay, no provider key/account, and static low-cost
  publication. Its “more than the first three games” non-goal remains in force
  for content publication until a separate content specification changes it.
- `docs/architecture.md` remains authoritative: The Guide is a static publisher
  and does not host the agent, conversation, model, state, transcript, or
  memento.
- `content/elixirs/covenant.md` remains unchanged and authoritative after
  delivery.
- `docs/specs/elixir-use-without-installing-delivery.md` remains authoritative
  for self-contained delivery, resolver provenance, exact envelope integrity,
  and event contract `1.1.0`.
- The discovery brief selected static-first hosting but left the first three
  versioning decisions for specification. The owner's follow-up explicitly
  confirms the recommended publisher-qualified namespace with legacy
  preservation, ledger, transparent tombstone, and metadata split; this spec
  resolves those decisions.
- Human catalogue testing on 2026-07-19 supersedes the earlier root-page dense
  grid presentation only. The approved registry, immutability, privacy,
  trust-display, delivery, and static-hosting decisions remain unchanged.
- Current delivery spec status is `NOT READY FOR HUMAN TESTING` because the
  second named live harness evidence is unavailable. Catalogue work must not
  claim that it resolves that external evidence blocker.
- No archive source was used to define this design, and the retired hosted
  prototype remains outside the active implementation boundary.

## Context files read

- `.agents/project-adapter.md`
- `.agents/context-map.md`
- `README.md`
- `docs/product-brief.md`
- `docs/architecture.md`
- `docs/discovery/elixir-hosting-and-catalogue.md`
- `docs/discovery/elixir-growth-workstreams.md`
- `docs/specs/elixir-cartridge-and-first-cabinet.md`
- `docs/specs/chatgpt-first-elixir-delivery.md`
- `docs/specs/elixir-use-without-installing-delivery.md`
- `content/elixirs/covenant.md`
- `content/elixirs/README.md`
- `scripts/elixirs/schema.mjs`
- `scripts/elixirs/cartridge.mjs`
- `scripts/elixirs/build.mjs`
- `scripts/elixirs/audit.mjs`
- `scripts/elixirs/delivery-envelope.mjs`
- `scripts/elixirs/delivery-events.mjs`
- `scripts/elixirs/delivery-events.test.mjs`
- `content/catalogue/catalogue.json`
- `content/catalogue/collections/*.json`
- `site/elixirs/cabinet.js`
- `site/elixirs/catalogue.js`
- `site/elixirs/styles.css`
- `tests/elixirs/cabinet.spec.ts`
- `site/elixirs/assets/cartridges/manifest.json`
- `.github/workflows/elixirs-pages.yml`
- `package.json`
