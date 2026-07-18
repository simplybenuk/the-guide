# Elixir Growth Workstreams — Discovery Brief

## Idea and opportunity

Prototype testing suggests that the next phase is not one feature but a product
loop with three connected workstreams:

1. **Hosting and discovery:** support a catalog that may grow to hundreds of
   Elixirs, understand which cartridges are being obtained, and help a player
   choose a suitable one without turning the cabinet into an opaque or
   surveillance-heavy marketplace.
2. **Delivery and activation:** make starting a fresh story with the player's
   existing agent feel immediate and dependable across different harnesses.
3. **Content and experience:** create a repeatable way to author, evaluate, and
   publish more engaging games whose mechanics and emotional experiences are
   genuinely distinct.

These workstreams should be treated as one funnel rather than three unrelated
projects:

```text
find a fitting Elixir -> understand and trust it -> hand it to an agent
-> begin play successfully -> have a memorable experience -> return for another
```

The opportunity is to move from a three-item technical proof to a small,
curated game platform while preserving the core promise: the player uses an AI
companion they already have, the cartridge remains transparent, and The Guide
does not need the gameplay transcript.

The owner-proposed delivery order is:

```text
delivery foundation -> hosting and discovery -> content authoring system
```

Delivery is the first bounded implementation target. It should define the
handoff events needed to measure which Elixirs are selected and obtained, while
leaving storage, aggregation, ranking, and richer discovery to the hosting
workstream. Content follows with a canonical Markdown authoring template that
encodes the lessons learned from both player activation and catalog operation.

## Problem and desired outcome

The current cabinet proves that transparent Markdown cartridges can be
compared, copied, downloaded, and played in a third-party agent harness. It does
not yet answer three scale questions:

- how a larger catalog remains legible and how maintainers learn what is useful;
- how a non-technical player gets from a cabinet card to the first game move
  with minimal uncertainty; and
- how the catalog gains consistently excellent games rather than accumulating
  themed prompt variants.

The desired player outcome is:

> I can quickly find an Elixir that fits my mood, time, energy, and boundaries,
> start it with my own agent without figuring out prompt mechanics, and trust
> that it will deliver a distinctive, satisfying experience before wearing off
> cleanly.

The desired maintainer outcome is:

> We can see where discovery and delivery succeed or fail, publish better
> Elixirs through a repeatable quality process, and grow the catalog without
> collecting gameplay conversations or weakening the cartridge covenant.

## Actors

- **Player:** wants a suitable short experience and a low-friction, trustworthy
  start in an agent harness they already use.
- **Returning player:** wants novelty without re-learning the product and may
  benefit from local history, favourites, or explicit preferences.
- **Catalog curator:** classifies, features, versions, evaluates, and retires
  Elixirs while maintaining a coherent quality bar.
- **Elixir author:** designs a game mechanic and content, tests it, and prepares
  it for publication under the shared covenant.
- **Evaluator/maintainer:** verifies schema, safety, harness behavior,
  differentiation, start success, and clean role release.
- **Third-party harness:** receives a URL, file, text, or installation and owns
  the model, conversation, memory, permissions, and user interface.
- **Later community author:** potentially contributes content; untrusted public
  uploads and marketplace dynamics are outside the first growth phase.

## Known facts

- The active product is a deterministic static cabinet containing Signal,
  Mystery, and Story as self-contained, versioned Markdown cartridges.
- The current handoff supports versioned URL, downloaded file, complete copied
  text, and a platform-neutral message.
- The Guide currently receives no account, player preference, cartridge
  boundary, transcript, memento, or gameplay state.
- The three cartridges share one covenant covering disclosure, consent,
  conversation-only play, stop, grounding, data behavior, and role release.
- Cartridges are instruction contracts rather than enforceable sandboxes; the
  receiving harness controls actual behavior.
- Current compatibility evidence covers the experimental coding-agent class
  only. A second complete live harness class remains a product gate.
- The current product brief deliberately excludes production analytics,
  recommendations, accounts, an open marketplace, community uploads, and more
  than the first three games. Pursuing this brief will therefore require a new
  approved specification that explicitly supersedes only the relevant
  non-goals.
- Public deployment and publication remain separately authorized actions, and
  usage terms are unresolved.

## Assumptions

- “Hundreds” is a direction-of-travel scale, not an immediate launch target.
- The near-term catalog remains first-party or tightly curated; accepting
  arbitrary public cartridges would introduce a separate trust and moderation
  program.
- Aggregate acquisition and activation signals are useful even without user
  identity or gameplay content.
- A player can express useful selection intent through declared facets such as
  time, energy, activity, tone, number of players, and input type.
- The best universal delivery path will remain URL/file/text, while selected
  harnesses may support faster, explicitly maintained adapters.
- More engaging content requires playtesting and experience criteria; an LLM
  generating more cartridge prose is not by itself a content strategy.
- “Most popular” initially means the most selected or obtained Elixir/version,
  based on explicitly defined cabinet events. It does not mean most played,
  completed, enjoyed, or recommended unless the player supplies a separate
  outcome signal.
- The Guide should continue to avoid receiving transcripts and mementos unless
  a later, separately approved product direction establishes a compelling need
  and a new consent, retention, and deletion model.

## Confirmed direction

- Tackle one workstream at a time: delivery, then hosting, then content.
- Delivery includes the event contract needed to identify the most obtained
  stories; hosting later owns aggregation, reporting, and discovery use.
- Content work will centre on a canonical Markdown authoring template for new
  stories, supported by validation and an experience-quality process.
- Delivery methods and event semantics are refined in
  `docs/discovery/elixir-delivery-methods.md`.

## Workstream — Hosting and discovery

### Outcome

A player can narrow a large catalog to a small set of suitable, trustworthy
choices, while maintainers can measure catalog acquisition and obvious funnel
failures without observing gameplay.

### Likely scope

- Extend cartridge metadata with stable discovery facets such as activity,
  tone, duration, energy, movement, player input, accessibility considerations,
  interaction mechanic, and content boundaries.
- Add search, filters, browseable collections, and an editorial “start here”
  route before attempting algorithmic personalisation.
- Consume the delivery event contract, aggregate acquisition counts, and expose
  popularity without changing what an event means. A download or copy remains
  an acquisition signal, not proof that play started or succeeded.
- Preserve immutable versioned cartridge URLs, deterministic builds, artifact
  audit, provenance, compatibility labels, and retirement status at larger
  catalog sizes.
- Give maintainers a catalog health view: discoverability, acquisition by
  Elixir/version, dead ends, compatibility coverage, freshness, and quality
  review state.
- Consider user-controlled local favourites/recently viewed items before
  server-side profiles.

### Material options

1. **Static, editorial catalog with privacy-preserving aggregate telemetry
   (recommended first step).** Keep hosting simple; add explicit facets,
   collections, and coarse events that contain no transcript, free text, stable
   user ID, or cross-site identity. This answers basic demand and funnel
   questions but cannot measure completed play directly.
2. **First-party catalog service with anonymous sessions.** Enables richer
   funnels, experiments, and recommendations, but introduces a runtime, event
   storage, consent/cookie decisions, retention/deletion policy, abuse controls,
   and operating cost.
3. **Account-based personalised library.** Enables cross-device history,
   favourites, and learned recommendations, but changes the product's
   no-account posture and creates a durable identity/data boundary. This should
   be considered only after explicit preference-based discovery proves
   insufficient.

### Success signals

- A new visitor can reach a confident choice quickly without understanding
  prompts or agent protocols.
- Common intents return a manageable, meaningfully differentiated shortlist.
- Acquisition events can be attributed to an Elixir and immutable version
  without collecting player-supplied game content.
- Players can understand why an Elixir was shown or featured.
- Catalog growth does not weaken compatibility, provenance, accessibility, or
  retirement checks.

## Workstream — Delivery and activation

This is the recommended first implementation workstream.

### Outcome

From an Elixir detail page, a player can start a new, correctly loaded story in
their chosen agent with few decisions and clear recovery when the preferred
method fails.

### Likely scope

- Design one dominant “Start this Elixir” flow that first asks where the player
  wants to play, then presents the shortest supported path for that harness.
- Define a minimal, versioned event contract for story selection and handoff:
  Elixir ID, immutable version, handoff method, supported harness choice when
  explicitly selected, event type, and coarse timestamp. Prohibit cartridge
  contents, player-entered text, transcripts, mementos, credentials, stable
  user IDs, and unrelated browser data.
- Distinguish intent events such as detail view or start-button selection from
  acquisition events such as handoff copied, cartridge copied, or file
  downloaded. Use acquisition counts as the initial popularity measure.
- Preserve a universal fallback: copy a compact handoff message, attach the
  complete cartridge, or paste the cartridge text.
- Explore harness-specific launch links, share targets, projects/GPTs/skills,
  or installation packages only where the harness offers a stable,
  supportable, permission-honest mechanism.
- Make the handoff establish a new story, require the agent to read the entire
  cartridge, disclose the game, request consent, and avoid carrying a prior
  Elixir role into the new session.
- Provide visible start confirmation and troubleshooting for fetch failure,
  partial loading, unsupported links, lost formatting, tool overreach, and
  failed role release.
- Define a privacy-preserving way for the player to report whether play started
  and whether the return worked; do not infer these outcomes from a download.
- Keep the event producer independent of the eventual analytics/storage
  provider so the delivery flow can be specified and tested before the hosting
  architecture is selected.

### Material options

1. **Guided universal handoff (recommended baseline).** A harness picker
   produces tailored instructions while the underlying artifact remains the
   same URL/file/text cartridge. Broad reach and low coupling, but the user
   still performs one or two manual steps.
2. **Deep links and native share actions.** Potentially near-one-click on
   supported platforms, but capability, prefilled-message support, mobile
   behavior, and trust vary by harness and may change without notice.
3. **Installable harness-specific Elixir library or skill.** Best repeat-use
   experience and reliable version discovery, but creates multiple packaging,
   update, review, permission, and compatibility surfaces. This is an adapter
   program rather than one delivery feature.

### Success signals

- Most test users can get from the cabinet to the agent's disclosure/consent
  step without outside help.
- Time-to-first-disclosure and handoff abandonment fall across named harnesses.
- Fetch or deep-link failure always has a clear file/text fallback.
- The agent loads the intended immutable version, asks consent before play, and
  releases the role at stop or completion in evaluated harnesses.
- Players understand that the external harness, not The Guide, holds the
  conversation.
- Each supported handoff emits at most its allowlisted acquisition event, and
  aggregate counts can identify the most obtained Elixir/version without
  identifying a player.

## Workstream — Content and experience

### Outcome

The Guide can regularly publish Elixirs that offer distinct, replayable,
emotionally engaging experiences and meet the shared safety and portability
contract.

### Likely scope

- Create one canonical Markdown authoring template derived from the current
  cartridge format. It should prompt for metadata and covenant integration plus
  player fantasy, promise, objective, interaction grammar, agency, arc,
  adaptation, pacing, ending, memento, demands, tone, replay variation, safety
  cases, and evaluation evidence.
- Separate invariant contract sections from author-owned game sections so an
  author can create something structurally valid without copying and gradually
  drifting the shared covenant.
- Include author guidance and worked examples outside the emitted cartridge so
  template help text never becomes accidental game authority or player-facing
  content.
- Define an experience rubric: clarity of promise, speed of entry, meaningful
  choice, specificity to the player's input, escalation/turn, satisfying
  resolution, clean return, and differentiation from existing Elixirs.
- Add a staged pipeline: concept pitch, paper/conversation prototype, covenant
  and schema review, adversarial fixtures, multi-harness runs, human playtest,
  revision, versioned publication, and post-publication review.
- Build reusable authoring and evaluation tools without making every game use
  the same interaction grammar.
- Start with a small portfolio designed around contrasting player needs and
  moods; use acquisition, opt-in feedback, and playtests to guide the next
  concepts.
- Define versioning, deprecation, and retirement rules before catalog volume
  makes stale content difficult to govern.

### Material options

1. **Curated first-party studio model (recommended first phase).** A small
   editorial slate with a strong rubric and human playtesting maximises quality
   learning and keeps the trust boundary legible, but content throughput is
   limited.
2. **Invited-author program with editorial review.** Broadens creative range
   while retaining a gate, but requires author documentation, licensing,
   provenance, review capacity, and clear responsibility for updates.
3. **Open or AI-generated marketplace.** Maximises supply but adds moderation,
   malicious-instruction scanning, ranking manipulation, copyright,
   provenance, compatibility, and uneven-quality risks. It is a distinct later
   product and should not be used to solve the immediate content gap.

### Success signals

- Human playtests describe new Elixirs as different games, not reskinned
  prompts.
- Players report meaningful choices, agent responsiveness, satisfying endings,
  and dependable return.
- A concept can move through the pipeline with repeatable evidence and clear
  reasons for approval, revision, or rejection.
- A new author can produce a schema-valid draft from the Markdown template
  without hand-copying an existing story or editing the canonical covenant.
- New content passes schema, covenant, adversarial, multi-harness, and
  accessibility checks without weakening existing guarantees.
- Returning players can find fresh experiences across different moods, energy
  levels, and interaction styles.

## Cross-workstream scope

### In scope for the next product phase

- A scalable metadata and curation model.
- Search, filtering, collections, and explicit preference-based discovery.
- Privacy-preserving acquisition/activation measurement.
- A guided universal start flow plus a small number of validated harness
  adapters.
- A first-party content pipeline and an initial slate of new, mechanically
  contrasting Elixirs.
- Versioning, provenance, compatibility, quality, and retirement operations.

### Non-goals for the next product phase

- Receiving or analysing gameplay transcripts, mementos, private agent memory,
  or free-text boundaries.
- Claiming that download, copy, or link-open equals successful play.
- Universal one-click launch across every agent harness.
- Accounts or opaque behavioural personalisation before explicit filters and
  editorial discovery are tested.
- Unmoderated public uploads, an open marketplace, or bulk AI-generated
  cartridges.
- Long campaigns, multiplayer, monetisation, or social feeds unless separately
  discovered and specified.
- Weakening consent, stop, grounding, conversation-only play, or explicit role
  release to reduce activation friction.

## Dependencies

- Resolve usage terms, cartridge licensing, and artwork/content rights before
  wider public distribution or external author participation.
- Complete a second live harness class and retain version-scoped compatibility
  evidence.
- Obtain explicit approval for any public deployment and for any new analytics,
  runtime service, account system, or external platform integration.
- Define the initial catalog taxonomy before implementing search,
  recommendations, author tooling, or dashboards.
- Establish baseline prototype usability evidence for selection, handoff,
  first disclosure, play completion, and role release.
- Maintain deterministic cartridge generation, artifact audits, and provenance
  as the catalog and packaging surfaces expand.

## Risks

- **Measurement overclaim:** copy/download data is mistaken for successful or
  enjoyable play. Mitigate with explicit funnel definitions and opt-in outcome
  feedback.
- **Privacy drift:** useful analytics gradually acquire stable identities or
  player content. Mitigate with an event allowlist, data minimisation, short
  retention, documented access, and a prohibited-field audit.
- **Choice overload:** more Elixirs make selection harder. Mitigate with a
  small taxonomy, editorial collections, progressive filters, and clear game
  promises.
- **Harness fragmentation:** one-click paths become brittle or imply permissions
  they do not have. Mitigate with a universal fallback and separately versioned
  adapters with named compatibility evidence.
- **Catalog dilution:** throughput rewards superficial variants. Mitigate with
  mechanic-differentiation criteria, human playtests, and editorial retirement.
- **Cold-start recommendations:** sparse behavioral data produces weak or
  manipulative rankings. Mitigate by starting with declared preferences and
  transparent editorial logic.
- **Content trust:** external or generated cartridges introduce malicious
  instructions, copyright, or unsafe mechanics. Keep the near-term catalog
  first-party/curated and treat broader authorship as a separate trust-boundary
  specification.
- **Operational load:** hundreds of immutable versions, harness adapters, and
  evaluations become costly. Automate schema/provenance checks, bound supported
  adapters, and publish explicit maintenance states.

## Decisions needed before specification

1. **Delivery slice boundary:** should the first delivery specification include
   a live analytics destination, or only define, validate, and locally exercise
   the event contract for the hosting phase to connect? A live destination
   changes the current zero-data architecture.
2. **Permitted measurement design:** confirm the exact acquisition events,
   fields, consent/notice approach, retention period, processor, and access
   model. The current recommendation excludes stable identity and all player
   content.
3. **Primary delivery harnesses:** which two or three named agent products
   deserve tailored start paths in addition to the universal fallback?
4. **Definition of activation:** is success reaching agent disclosure, granting
   consent, completing the first move, completing the game, or a set of these?
   The cabinet cannot observe later stages without explicit player feedback or
   deeper integration.
5. **Content ownership model:** first-party only for the content phase, or a small
   invited-author pilot? The latter requires licensing, provenance, review, and
   maintenance ownership decisions.
6. **Initial audience and experience portfolio:** which player need should lead
   the slate—cosy escape, creativity, curiosity, reflection, social play, or
   another outcome? This determines taxonomy, tone, and the first content briefs.
7. **Local versus server-side personalisation:** should favourites, history,
   and explicit preferences stay on the device, or should cross-device state be
   considered now?

## Recommended sequencing

1. **Delivery first:** specify the universal start flow, select the first named
   harnesses, define the allowlisted acquisition-event contract, and test
   handoff, fallback, first disclosure, and event privacy. This slice may
   produce events, but it must not silently choose a storage provider or call
   acquisition “completed play.”
2. **Hosting second:** choose the approved event processor and retention model,
   aggregate popularity by Elixir/version, then add catalog search, filters,
   collections, and transparent popularity displays. The host consumes the
   delivery contract rather than redefining it.
3. **Content third:** create the canonical Markdown authoring template,
   mechanic taxonomy, and experience rubric; validate the pipeline by authoring
   and human-testing a small set of contrasting first-party Elixirs.
4. Reassess accounts, richer recommendations, invited authors, and installable
   libraries only with evidence that the simpler model cannot meet player needs.

## Stop conditions

- Do not add analytics, cookies, server events, accounts, or stable user
  identifiers until the measurement boundary, consent basis, retention, and
  deletion behavior are approved in a specification.
- Do not claim play, completion, satisfaction, or compatibility from a page
  view, copy, download, or deep-link event.
- Do not publish new cartridges or accept external authors until usage terms,
  provenance, quality review, versioning, and maintenance ownership are clear.
- Do not ship a harness-specific start method without a working universal
  fallback and version-scoped evaluation evidence.
- Do not receive gameplay transcripts or relax the covenant as an incidental
  consequence of improving measurement, delivery, or engagement.

## Validation required in the eventual specifications

- Moderated usability tests covering discovery, comparison, handoff, first
  disclosure, fallback, stop, and role release across named harnesses.
- Event-contract tests that allowlist fields and prove that cartridge text,
  user free text, transcripts, identifiers, credentials, and mementos are not
  emitted.
- Catalog tests for search/filter accuracy, accessible operation, immutable
  versions, provenance, compatibility labels, and retired content.
- Cartridge schema/covenant tests, adversarial fixtures, multi-harness live
  runs, and human experience reviews for every published Elixir version.
- Load and operational tests proportionate to the approved catalog and traffic
  target, without treating hypothetical hundreds as current demand.
