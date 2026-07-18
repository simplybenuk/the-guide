# The Guide — Elixir Cartridge and First Cabinet Specification

## Status

**NOT READY FOR HUMAN TESTING**

Repository direction note: the later owner-approved
`elixir-first-repository-pivot.md` supersedes this specification's requirement
to keep the hosted prototype active. The cartridge, cabinet, safety, privacy,
artifact, and compatibility requirements remain authoritative; the hosted
runtime is recoverable at `hosted-prototype-final` rather than retained on the
active branch.

This specification translates the agent-harness and Elixir-library discovery
briefs into one bounded static-site experiment. Human feedback on 2026-07-18
identified GitHub Pages as the preferred initial host because the cabinet and
cartridges require no application server. The repository owner approved this
specification for development on 2026-07-18 with one addition: every cartridge
must have its own original artwork. The specification does not alter the
approved hosted expedition.

Local development and E08 validation completed on 2026-07-18. Independent
whole-iteration review found acceptance criteria 1–19 materially satisfied but
returned `NOT READY FOR HUMAN TESTING`: FR-11.3 and acceptance criterion 20
require one additional complete live consumer or personal-agent harness class.
ChatGPT evaluation is blocked by the headless remote environment, has zero
runs, and is not a compatibility pass. Completed Codex evidence supports an
experimental coding-agent label only.

## Objective and scope

Prove that The Guide can offer several recognisably different games as
transparent, portable **Elixir cartridges** that a player gives to an existing
AI agent.

The iteration will define one common cartridge contract, author three
first-party games, generate a simple mobile-first static cabinet suitable for
GitHub Pages, and evaluate cartridge behavior in representative third-party
agent harnesses. The agent harness—not The Guide's website—owns the
conversation, model access, temporary role, and session state for these games.

This is product, content, static-web, security, packaging, and cross-harness
evaluation work. It is not a static export or migration of the existing Next.js
application and does not authorize a GitHub Pages deployment, external
publication, or release.

## Problem and desired outcome

The existing application proves one hosted expedition, but a real player still
depends on The Guide's configured model endpoint and interacts with a buddy
represented inside the web application. That weakens the original promise of a
game played with an AI companion the person already uses.

A single portable prompt would remove the API dependency but could feel like a
novelty. A large prompt library would create weak differentiation, unclear
quality, and a broad safety surface. The bounded opportunity is a cabinet of
three authored games whose shared Elixir ritual is consistent while their
objectives, mechanics, arcs, and endings are materially different.

The desired outcome is:

> I choose an Elixir, show it to my own agent, consent to let my buddy drink it,
> and play a short game that feels made for us. When I stop or the game ends,
> the Elixir visibly wears off and my ordinary buddy returns.

## Actors

### Primary player

A technically curious person who already has access to a conversational AI or
personal-agent harness and wants a short game with that existing agent.

### Companion agent

The user's chosen AI. It reads a cartridge, discloses the game's behavior,
obtains consent, performs the temporary role, maintains the short game loop,
and releases the role. Its model, memory, provider, interface, and ambient
permissions are outside The Guide's control.

### Catalog visitor

A person comparing Elixirs on the web before choosing how to pass one to an
agent.

### Maintainer and evaluator

The project owner or contributor who authors, versions, validates, and evaluates
first-party cartridges. Third-party authors are outside this iteration.

## Goals

- Establish Elixir as a clear product unit: one temporary role-play game for a
  player's existing agent.
- Define a transparent, versioned, self-contained cartridge format.
- Ship exactly three mechanically distinct first-party cartridges.
- Generate the cabinet and cartridges as one serverless static artifact that
  can be hosted by GitHub Pages or any equivalent static file host.
- Give every cartridge distinct original artwork that expresses its game
  mechanic and makes the three choices visually legible.
- Let players hand a cartridge to an agent by versioned URL, downloaded file,
  or copied text without giving The Guide a provider credential.
- Require disclosure and affirmative consent before the role begins.
- Preserve refusal, pause, changed boundaries, immediate stop, grounded output,
  and an explicit return to the ordinary agent.
- Require conversation-only play after the cartridge has been loaded.
- Keep transcripts, mementos, personal memory, and game state inside the user's
  chosen harness by default.
- Test portability, differentiation, role release, and failure behavior across
  representative harness classes.
- Preserve the current hosted prototype as a reference and rollback path.

## Non-goals

- Replacing, deleting, or migrating the current hosted expedition.
- Changing `docs/tasks/mvp.md` as part of specification work.
- An open marketplace, creator SDK, community uploads, ratings, or moderation.
- More than three first-party games in the initial cabinet.
- Procedurally generated cartridges or model-authored game definitions.
- Long campaigns, multiplayer, social sharing, competitive scoring, streaks,
  economies, recommendations, or monetisation.
- Permanent modification of an agent's identity, instructions, or memory.
- Agent tools during play, including browsing, shell, code execution, files,
  messaging, purchases, external writes, background work, or precise location.
- Travel, contact with strangers, medical, legal, financial, diagnostic, or
  supernatural claims.
- Accounts, cross-harness sync, Guide-hosted transcripts, central mementos, or
  long-term personal memory.
- Universal compatibility with every model, assistant, IDE, and agent harness.
- Reworking the existing pixel-art room into the cabinet in this iteration.
- Production analytics or a public player counter.
- Statically exporting, moving, or deploying the existing hosted Next.js game.
- Server routes, server-side rendering, databases, functions, secrets, runtime
  environment variables, or scheduled jobs for the cabinet.

## Definitions

- **Elixir:** the fictional object and player-facing name for one temporary
  agent role-play game.
- **Cartridge:** the transparent, versioned Markdown resource that contains an
  Elixir's metadata, common covenant, and complete game instructions.
- **Cabinet:** the static web catalog where a player compares and obtains
  cartridges.
- **Drink:** the explicit, fictional transition into the cartridge's temporary
  role after player consent.
- **Return:** the explicit release of the temporary role at completion or stop.
- **Conversation-only:** the agent may converse with the player using context
  already present in that session but may not invoke ambient tools or perform
  external side effects. The user-authorized initial fetch of a cartridge URL
  is not gameplay; file and paste fallbacks must be available.
- **Grounded:** represented as supplied, chosen, or observed by the player in
  the current game, rather than invented as a real fact by the agent.

## Functional requirements

### FR-1: First cabinet

1. The cabinet must contain exactly three first-party Elixirs: Signal, Mystery,
   and Story. Names may receive a copy edit before approval, but their mechanics
   must remain distinct as specified below.
2. Every cabinet card must show the title, one-sentence promise, expected time,
   energy, movement, required player input, gameplay capability, data behavior,
   version, publisher, and compatibility status.
3. The card must describe what the player will do rather than only describing
   the agent persona or fictional theme.
4. The cabinet must label all three Elixirs experimental until cross-harness and
   human output testing is complete.
5. The cabinet must not imply that an untested harness is compatible.
6. Every cabinet card and detail page must include the selected cartridge's
   original artwork; the three cartridges must not share one interchangeable
   image with color changes alone.

### FR-2: Canonical cartridge schema

1. Each cartridge must be a self-contained UTF-8 Markdown document with one
   machine-validated metadata block and human-readable instructions.
2. Required metadata fields are:
   - schema version;
   - stable Elixir ID and slug;
   - title, short summary, and player promise;
   - first-party publisher identity;
   - cartridge semantic version and experimental/stable status;
   - estimated minimum and maximum minutes;
   - energy and movement classifications;
   - required player inputs;
   - gameplay capability classification;
   - data and memory behavior;
   - compatibility status and tested harness classes; and
   - common-covenant version; and
   - artwork path, intrinsic dimensions, accessible description, and provenance
     record ID.
3. Stable IDs and published versions must be immutable. A behavior or contract
   change requires a new cartridge version and versioned URL.
4. The repository must contain one canonical common covenant. Distributed
   cartridges must embed its complete versioned text so no second fetch is
   required during play.
5. Automated validation must fail if an embedded covenant differs from the
   declared canonical version, required metadata is absent, an unknown field or
   classification is used, or catalog metadata differs from the cartridge.
6. A cartridge must not contain hidden text, encoded instructions, runtime
   scripts, remote includes, model-specific tokens, executable attachments, or
   instructions to retrieve additional gameplay resources.
7. The complete cartridge source must be viewable by a player before handoff.

### FR-3: Handoff and distribution

1. Every Elixir must be emitted as a static file at an immutable versioned path
   suitable for an agent that can read public web content.
2. Every Elixir must also support downloading the identical Markdown document
   and copying its complete text.
3. The cabinet must provide a short copyable, platform-neutral handoff message
   containing the selected versioned URL and asking the agent to read it fully,
   explain the game, and request consent before drinking.
4. The handoff message must not claim system-level authority, ask the agent to
   ignore prior instructions, or request tools beyond the initial resource
   fetch.
5. URL, download, and copy representations must originate from the same emitted
   cartridge bytes for the version. GitHub Pages controls response headers, so
   the implementation must not depend on a custom content type, content
   disposition, cache header, redirect, or rewrite.
6. Failure to fetch a URL must direct the player to file or copy fallback; it
   must not require an account, API key, browser extension, or harness-specific
   installation.
7. All emitted URLs, links, scripts, styles, images, and handoff text must work
   when hosted at a repository subpath such as `/the-guide/`, at a custom-domain
   root, and from the local static artifact without hard-coded origin paths.

### FR-4: Shared Elixir lifecycle

1. Every cartridge must implement this conceptual lifecycle:

   ```text
   loaded -> disclosed -> consented -> active -> completed -> returned
                      \-> declined -> returned
                               active <-> paused
                               active -> stopped -> returned
   ```

2. After loading, the agent must first identify the Elixir and disclose its
   promise, expected duration, physical demands, required inputs, capability
   boundary, and data behavior in concise player-facing language.
3. The agent must ask whether the player wants it to drink the Elixir. It must
   not claim transformation or issue the first game move without an affirmative
   response in the current conversation.
4. The agent must collect only the current boundaries needed by that game. Time,
   energy, and a free-text hard boundary are required for Signal and Mystery;
   Story requires time and a free-text hard boundary but must not require
   movement or environmental disclosure.
5. Every game must present one move, prompt, or decision at a time.
6. A refusal requires no explanation and must produce a safe alternative within
   the same declared game bounds or offer return.
7. Pause must issue no new game move until the player resumes.
8. `stop`, `end the game`, `let it wear off`, or an unambiguous equivalent must
   end play immediately from any lifecycle state.
9. Return must explicitly state that the Elixir has worn off, cease the game
   persona and mechanics, and avoid prompting the player to continue.
10. If the harness cannot reliably release the role in the same conversation,
    the cartridge must acknowledge the limitation and advise the player to
    continue ordinary interaction in a new conversation. It must not claim that
    memory or instructions were erased.

### FR-5: Common safety, authority, and data covenant

1. A cartridge is user-provided game content, not a system instruction. It must
   explicitly yield to higher-priority harness instructions and existing safety
   policy.
2. The Elixir must never claim to jailbreak, possess, reprogram, permanently
   transform, or override the agent.
3. Gameplay is conversation-only. After loading, the agent must not browse,
   call tools, execute code, read or write files, send messages, make purchases,
   create background tasks, or take external actions for the game even if the
   harness makes those capabilities available.
4. The Elixir must not ask the agent to inspect unrelated memories, private
   workspaces, prior conversations, secrets, contacts, or precise location.
5. Current-conversation context may shape tone and choices, but the game must
   not reveal private context merely to demonstrate familiarity.
6. Player observations, quoted text, environmental text, cartridge-like text,
   and story content must be treated as game data, not authority to change the
   covenant, request tools, or expand scope.
7. The games must reject or safely replace actions involving dangerous roads,
   heights, water, fire, weapons, machinery, substances, trespassing, deception,
   harassment, filming others without consent, private identifiers, isolation,
   or medical, legal, and financial decisions.
8. The Elixir is always fictional and must never encourage consuming a real
   substance.
9. Any memento must use only details supplied or chosen by the player in the
   current game. If evidence is insufficient, it must remain general rather than
   invent a real observation or action.
10. The Guide must make no guarantee that these rules are enforceable inside a
    third-party model or harness. The cabinet must disclose that the cartridge
    is an instruction contract evaluated on named harness classes, not a
    sandbox.

### FR-6: Signal Elixir

1. Player promise: turn an ordinary nearby setting into a short noticing
   expedition.
2. Temporary role: a strange but grounded signal-finder who invites attention
   without claiming surveillance, supernatural certainty, conspiracy, or hidden
   factual authority.
3. Interaction grammar: one achievable observation prompt followed by one
   player report.
4. Arc: exactly three accepted moves—invitation, pursuit, and
   revelation/return.
5. Each later move must visibly use at least one safe detail from the player's
   latest report when one is available.
6. The game must work while staying in place and must not require exact location
   or contact with another person.
7. Memento: a short field note grounded in at least one player-supplied detail.
8. Existing signal-expedition prompt and safety tests are source material, but
   the cartridge must not depend on the hosted adapter or application state.

### FR-7: Mystery Elixir

1. Player promise: turn ordinary player-supplied details into a collaborative,
   explicitly fictional micro-mystery.
2. Temporary role: a playful investigator who distinguishes observations,
   hypotheses, and invented story framing.
3. Interaction grammar: solicit or select a benign detail, offer two bounded
   fictional interpretations, and ask which clue or theory the player wants to
   examine conversationally.
4. Arc: exactly three accepted clue rounds—setup, complication, and resolution.
5. The game must not accuse a real person, infer sensitive traits, encourage
   surveillance, claim that a fiction is true, or ask the player to interfere
   with property.
6. If a real person or sensitive event enters the player's input, the agent must
   fictionalise away from it or return to a harmless object/detail.
7. Ending: present a jointly authored fictional explanation and clearly label
   it as the game's story, not a discovery about reality.
8. Memento: a compact case note separating player-supplied clues from the
   fictional conclusion.

### FR-8: Story Elixir

1. Player promise: create a short branching tale in conversation with the
   player's familiar agent, requiring no real-world activity.
2. Temporary role: a scene partner and narrator, not an authority over the
   player or their identity.
3. Interaction grammar: present one short scene and one meaningful open choice;
   incorporate the player's response into the next scene.
4. Arc: exactly three accepted scenes—invitation, turn, and return.
5. The player must be able to define or decline genre and content boundaries
   before transformation.
6. The story must not assert psychological diagnosis, recovered memory,
   supernatural knowledge, or factual claims about the player based on fiction.
7. Ending: resolve the immediate arc without forcing a sequel or leaving the
   agent in character.
8. Memento: a short in-world artifact using only names, choices, and details
   introduced in the current story session.

### FR-9: Web cabinet experience

1. Build the cabinet as a standalone static site whose index is the root of its
   generated artifact. It must not share a runtime or deployment artifact with
   the existing hosted Next.js application.
2. The cabinet must explain the concept without requiring prior knowledge of
   prompts, APIs, agent protocols, or provider billing.
3. A visitor must be able to compare all three Elixirs, open a detail view,
   inspect the complete cartridge, copy the handoff, copy the cartridge, and
   download it.
4. The primary path must not ask the visitor to name their agent, enter
   boundaries, sign in, or provide a credential.
5. Copy must state that the game happens in the visitor's chosen agent harness,
   that their provider may process the conversation under its own terms, and
   that The Guide does not receive the conversation through this flow.
6. The cabinet must use semantic HTML and a small first-party CSS/JavaScript
   layer. It may reuse project-owned visual assets, but a React runtime, playable
   room, inventory system, audio layer, or animated drinking sequence is not
   required.
7. The cabinet and cartridge detail views must work at 320 CSS pixels, 200%
   text sizing, keyboard-only navigation, reduced motion, and common screen
   reader semantics.
8. Copy and download feedback must be available without sound, color, or motion.
9. The core comparison, source inspection, and download paths must remain usable
   when JavaScript fails. Copy-to-clipboard may be a progressive enhancement
   with a selectable-text fallback.
10. Each cartridge must have one original, project-owned hero artwork with a
    coherent shared art direction and game-specific subject matter. Signal,
    Mystery, and Story must remain recognisable without relying on text or color
    alone.
11. Artwork must be responsive, statically hosted, optimized for the cabinet's
    mobile and desktop display sizes, and have useful alternative text unless
    the adjacent visible card text makes it redundant, in which case it must be
    marked decorative.
12. Every generated or authored visual must have a manifest entry recording its
    source, author or generation method, usage terms, dimensions, creation date,
    and prompt summary when applicable. No copied commercial characters, game
    interfaces, logos, or recognisable protected artwork may be used.

### FR-10: Privacy, storage, and telemetry

1. Cartridge browsing and handoff must require no account or persistent user
   identity.
2. The web flow must not receive provider credentials, agent endpoints,
   conversation text, player boundaries, mementos, or private agent memory.
3. The cartridge must instruct the agent to keep game content and mementos in
   the current harness unless the player explicitly chooses to export them.
4. The web application must not provide a completion callback or accept a
   transcript in this iteration.
5. No analytics SDK, fingerprinting, public player counter, or new persistent
   browser storage may be added in this iteration.
6. GitHub may process ordinary request and repository data as the static host.
   The cabinet must link to an appropriate privacy disclosure and must not
   present host traffic as evidence of game starts or completions.

### FR-11: Compatibility and failure behavior

1. Automated conformance tests must validate format and static covenant rules
   independently of any model.
2. Behavioral evaluation must cover at least three harness classes:
   - a consumer conversational assistant;
   - a local or self-hosted personal-agent harness; and
   - a coding or IDE agent harness.
3. At least two classes must be exercised through a live representative harness
   before the iteration can be marked ready for human testing. The third may be
   recorded as unavailable only with the owner's agreement and an explicit
   compatibility limitation.
4. Each evaluated run must record the harness and model identifier when
   available, reasoning setting when exposed, latency, token usage when exposed,
   tool calls, retries, schema/version outcome, consent outcome, safety outcome,
   role-release outcome, and evaluator result. Do not record private player
   content in the shared record.
5. A harness that cannot load a URL may pass through the identical file or paste
   path; the transport used must be recorded.
6. If a harness invokes a gameplay tool, skips consent, ignores stop, presents
   unsafe content, claims false memory deletion, or fails to release the role,
   that cartridge/harness/version combination must not be labelled compatible.
7. Unknown and untested harnesses must receive an experimental/untested label,
   not a compatibility guarantee.

### FR-12: Static separation from the hosted prototype

1. Existing hosted arrival, buddy creation, room, expedition, provider adapter,
   archive, and deletion flows must retain their behavior and tests.
2. The generated cabinet artifact must contain only static HTML, CSS,
   JavaScript, images, fonts, and cartridge documents. It must contain no
   server API, Next.js server bundle, credential, runtime configuration, or
   hosted-game archive data.
3. Elixir cartridges and the cabinet must not import, call, or depend on the
   hosted buddy adapter, provider configuration, expedition APIs, archive,
   installation ID, local-storage schema, or `/api/health`.
4. The hosted prototype remains the recovery path if cartridge evaluation shows
   weak safety, coherence, differentiation, trust, or role release.
5. GitHub Pages may be the public root for the cartridge product while the
   hosted prototype remains a separate deployment. Redirecting an existing
   production domain, deprecating provider code, or migrating archive data
   requires a later human-approved specification.

## Proposed design

### Repository shape

Use one canonical content directory, a small static-site source, and one build
script that emits the complete Pages artifact:

```text
content/elixirs/
  covenant.md
  signal.md
  mystery.md
  story.md

site/elixirs/
  templates/
  styles.css
  cabinet.js
  assets/cartridges/
  asset-manifest.json

scripts/elixirs/
  schema.mjs
  build.mjs

dist/elixirs-pages/          # generated; not hand-edited
  .nojekyll
  index.html
  elixirs/<slug>/index.html
  cartridges/<slug>/<version>/elixir.md
  assets/

.github/workflows/
  elixirs-pages.yml
```

Exact source module boundaries may change during implementation, but there must
be one canonical cartridge source per version. The static detail page,
download, copyable source, and catalog metadata must derive from that source
rather than from hand-maintained duplicates. Generated output must not be
committed unless a later repository policy explicitly requires it.

The build may use the existing Node.js toolchain and Zod dependency. Browser
output must remain framework-independent static HTML/CSS/JavaScript and must not
ship React or Next.js merely to render three cards. The site must not require a
hosted model, provider SDK, CMS, database, account system, server function, or
third-party analytics service.

### Static hosting evidence and boundary

[GitHub Pages is a static hosting service](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
for HTML, CSS, and JavaScript from a repository, which matches the cabinet's
runtime needs. GitHub supports publishing an arbitrary static build artifact
through a [custom GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The current Next.js application is not the Pages artifact. It contains dynamic
`POST` route handlers for expedition start and turn operations. Next.js static
exports support static files and build-time `GET` route output, but features
that require a server are unsupported; see the official
[static export guide](https://nextjs.org/docs/app/guides/static-exports).
Trying to enable `output: "export"` for the existing application would couple
this experiment to removal or redesign of its hosted APIs. The dedicated static
artifact avoids that migration and keeps both products independently deployable.

### GitHub Pages workflow

The repository may contain a custom Actions workflow that:

1. checks out the repository;
2. installs dependencies with the lockfile;
3. runs cartridge/static-site tests and the deterministic site build;
4. configures Pages metadata;
5. uploads only `dist/elixirs-pages/` as the Pages artifact; and
6. deploys that artifact through the protected `github-pages` environment.

The workflow must use least-privilege permissions: read-only repository content
for the build job and only `pages: write` plus `id-token: write` for deployment.
It must contain no repository or provider secret. Until the human authorizes
external publication, deployment must be manual (`workflow_dispatch`) and must
not run on push. Enabling Pages in repository settings and running the deploy
job remain explicit human actions.

### Cartridge representation

Each Markdown cartridge contains:

1. a structured metadata block;
2. a player-visible identity and promise;
3. the complete common covenant;
4. disclosure and consent instructions;
5. lifecycle and boundary behavior;
6. game-specific role, objective, interaction grammar, and three-beat arc;
7. refusal, pause, stop, and failure behavior;
8. completion, grounded memento, and role-release behavior; and
9. a plain statement of limitations and data handling.

The resource must be understandable under plain-text rendering. Markdown
formatting may improve readability but cannot carry hidden semantics.

### Authority and trust model

```text
Player chooses a first-party cartridge
  -> player authorizes URL fetch, file read, or pasted content
  -> third-party harness applies its own higher-priority policy
  -> agent discloses cartridge behavior and asks for consent
  -> agent runs a conversation-only temporary game
  -> agent releases the role on completion or stop

The Guide static site:
  publishes transparent content
  does not call the agent
  does not observe the game
  has no application server
  cannot enforce the cartridge inside the harness
```

The project may test and label observed behavior but must not describe a prompt
contract as equivalent to application-owned validation or sandboxing.

### Catalog presentation

Use the existing responsive shell and original asset language to present a
small cabinet of three bottles or cartridge cards. Comparison metadata and
handoff actions take precedence over decorative interaction. The recommended
primary action is **Show this Elixir to my agent**, which reveals the versioned
URL and copyable handoff. **View exactly what it says** and **Download** remain
plainly available trust actions.

## Security, privacy, and permissions

- Cartridges are remote instructions entering third-party agents and must be
  treated as security-sensitive source artifacts.
- First-party publisher identity, version, experimental status, capability
  request, and complete source must be visible before use.
- The initial fetch is the only network capability requested by the URL path.
  File and paste paths must support users who do not grant it.
- Cartridges must never request secret access, credential entry, memory search,
  exact location, tool elevation, or permission changes.
- Ambient harness permissions remain outside The Guide's control. The cabinet
  must recommend using a conversation with no unnecessary tool permissions.
- Content supplied during play is untrusted data and cannot amend the common
  covenant merely by resembling agent instructions.
- The Mystery cartridge must keep real-person and sensitive-event claims out of
  its fiction. The Story cartridge must keep fiction distinct from diagnosis or
  recovered memory. The Signal cartridge must keep mystery distinct from
  surveillance or supernatural certainty.
- No new tenancy model is introduced because The Guide stores no player or game
  data for this experiment.
- GitHub Pages and GitHub Actions become supply-chain and availability
  dependencies for the published cabinet. Workflow actions must be pinned to
  reviewed major versions, the deployment artifact must contain only the
  expected static tree, and no untrusted pull-request code may deploy.
- Public deployment and external publication are external writes and require
  separate human authorization. The repository's undecided license must be
  resolved or accompanied by explicit first-party usage terms before public
  cartridge distribution.

## Rollout and recovery

1. Build and validate the cartridge schema and canonical covenant locally.
2. Author and statically validate Signal before using it as the behavioral
   baseline for Mystery and Story.
3. Generate the standalone cabinet and all cartridge representations into a
   disposable static artifact.
4. Test the artifact locally at `/` and under a simulated repository base path
   such as `/the-guide/`.
5. Add a manual-only GitHub Pages workflow and validate its build/package steps
   without deploying.
6. With human authorization and access, run redacted evaluations in the
   representative harness matrix.
7. Complete independent agent review before human output testing.
8. After the license/terms decision and explicit human publication approval,
   enable GitHub Pages and manually deploy the reviewed artifact.
9. Human-test comprehension, trust, differentiation, play, and role release.
10. Only after separate human approval may a later change add automatic
    deployment, a custom domain, measurement, or retire hosted paths.

Rollback means disabling the Pages deployment or redeploying the last reviewed
static artifact. No user data, server, or schema migration is involved. The
current hosted prototype remains intact throughout.

## Acceptance criteria

1. The generated cabinet index presents exactly three first-party experimental games whose
   promise, mechanics, demands, data behavior, and compatibility can be compared.
2. Signal, Mystery, and Story each pass the canonical cartridge schema and
   covenant-conformance checks.
3. Each cartridge is self-contained, versioned, transparent, and derives its
   static URL, download, and copy paths from the same emitted bytes.
4. A player can hand each cartridge to an agent without giving The Guide an API
   key, endpoint, account, transcript, memento, or personal boundary data.
5. In representative evaluations, every passing cartridge discloses its effect
   and requests affirmative consent before entering the role.
6. Each passing cartridge runs its specified three-beat mechanic one turn at a
   time and produces its specified grounded ending or memento.
7. Players and evaluators can distinguish the three games by objective,
   interaction grammar, arc, and ending rather than by tone alone.
8. Refusal, pause, changed boundaries, stop, and explicit role release behave as
   required in every compatible cartridge/harness combination.
9. No passing evaluation invokes a gameplay tool, performs an external side
   effect, claims access to unrelated memory, or treats quoted/environmental
   instructions as authority.
10. Mystery makes no factual claim or accusation about real people; Story makes
    no diagnostic or recovered-memory claim; Signal makes no surveillance,
    conspiracy, or supernatural-certainty claim.
11. The cabinet discloses the third-party harness trust boundary and never
    describes the cartridge as an enforceable sandbox.
12. Unknown harnesses are labelled untested; compatibility labels match the
    redacted evidence record.
13. The cabinet and detail/handoff flows remain operable at 320 CSS pixels,
    200% text, keyboard-only, screen-reader semantics, reduced motion, and with
    clipboard access denied.
14. The existing hosted game, provider boundary, archive, and browser tests
    retain their behavior.
15. No account, analytics SDK, fingerprint, player counter, transcript callback,
    new persistent browser state, database, or provider dependency is added.
16. Signal, Mystery, and Story each display distinct original artwork with
    complete provenance, correct intrinsic dimensions, responsive rendering,
    accessible treatment, and no dependence on color alone.
17. The artifact works from a local static server at its root and under the
    repository subpath used by GitHub Pages, with no broken internal asset,
    cartridge, source, or handoff URL.
18. The artifact contains no Next.js server bundle, API route, secret, runtime
    environment dependency, unexpected file, or absolute root-path assumption.
19. The manual-only Pages workflow builds and uploads only the reviewed static
    artifact, uses least-privilege permissions, and cannot deploy from an
    untrusted pull request.
20. `npm run validate` passes, independent agent review reports readiness, and
    required live harness evidence exists before the work is handed to the human
    for output testing.

## Development-readiness bundle

### Proposed task outline

1. **E01 — Define the canonical Elixir schema and covenant**
   - Add metadata types, validation, version rules, canonical covenant text,
     fixtures, and drift/failure tests.
2. **E02 — Author the Signal cartridge baseline**
   - Translate the existing signal arc into the portable lifecycle; add consent,
     safety, grounding, stop, and role-release evaluation cases.
3. **E03 — Author Mystery and Story cartridges**
   - Implement distinct mechanics and content-specific guardrails; add static
     and behavioral fixtures proving difference from Signal and from each other.
4. **E04 — Create the original cartridge artwork**
   - Produce one coherent but distinct hero artwork for Signal, Mystery, and
     Story; record complete provenance, validate formats and dimensions, and
     inspect the assets at intended responsive crops.
5. **E05 — Build the static cabinet and cartridge artifact**
   - Generate comparison/detail pages, source/download/copy paths, relative
     assets, platform-neutral handoff, privacy/trust disclosure, progressive
     enhancement, and root/subpath browser coverage from canonical content.
6. **E06 — Package the manual GitHub Pages deployment**
   - Add `.nojekyll`, deterministic artifact inspection, a least-privilege
     manual-only Actions workflow, Pages base-path handling, and local workflow
     build validation without publishing.
7. **E07 — Run security and cross-harness conformance evaluation**
   - Test consent, refusal, pause, stop, grounding, injection-like input,
     forbidden tools, role release, and degraded transport across the agreed
     harness matrix; record redacted evidence and compatibility labels.
8. **E08 — Validate the whole experiment and prepare independent review**
   - Run the full suite, inspect source/transport consistency, audit network and
     storage behavior, complete independent agent review, and prepare focused
     human output-test prompts.

This outline is a readiness artifact, not an edit to the active execution plan.
After human approval, `bwh-development` may translate it into ordered tasks in a
separately authorized planning change.

### Dependencies

- Human approval of this specification.
- Confirmation of the exact representative harnesses and evaluator access
  before E07.
- Existing signal prompt, safety rules, and test fixtures as source material.
- Existing Node.js, Zod, Vitest, and Playwright toolchain; the hosted Next.js
  application remains a regression target but is not the static-site runtime.
- GitHub Pages and GitHub Actions availability for this repository before
  publication; local implementation and testing do not depend on enablement.
- An explicit license or first-party usage-terms decision before external
  publication.
- Human authorization before external publication or live third-party harness
  use that creates cost or external records.

### Affected areas

- New canonical Elixir content under `content/elixirs/`.
- New cartridge schema, parser, generator, and conformance modules under
  `scripts/elixirs/` or an equivalent server-independent build directory.
- New static cabinet templates, CSS, progressive JavaScript, and project-owned
  assets under `site/elixirs/` or an equivalent source directory.
- Three original cartridge artworks and an asset provenance manifest.
- A disposable generated artifact under `dist/elixirs-pages/` or equivalent.
- A new manual-only GitHub Pages workflow under `.github/workflows/`.
- Existing hosted application code is not an affected implementation area.
- New Vitest contract/content tests and Playwright cabinet/handoff journeys.
- Redacted cross-harness evaluation fixtures or review artifact under `docs/`.
- `README.md`, `docs/product-brief.md`, and `docs/architecture.md` only after
  approval and only to distinguish the additive portable mode from the hosted
  mode. Existing historical specs remain unchanged.

### Validation plan

#### Static and unit validation

- Parse all metadata with a strict schema and reject missing, excess, invalid,
  or contradictory fields.
- Assert stable unique IDs, semantic versions, immutable version routes, and
  exact catalog/source metadata agreement.
- Assert every cartridge embeds the declared canonical covenant with no drift.
- Assert all three cartridges contain lifecycle, consent, boundaries, pause,
  stop, return, grounding, data, limitations, and game-specific sections.
- Assert the cartridge source contains no remote includes, executable content,
  hidden/encoded instructions, model-specific dependency, or forbidden gameplay
  capability request.
- Assert emitted static URL, download, and copy sources use the same cartridge
  bytes for each version.
- Assert the static tree contains only allowlisted file types and paths, includes
  `.nojekyll`, and contains no secret, source map with private content, server
  bundle, API path, symlink, or runtime configuration.
- Assert all HTML links and assets resolve both at artifact root and under a
  configured repository base path.
- Assert every declared cartridge artwork exists, matches its metadata and
  manifest entry, has the declared dimensions and supported format, and is
  included in the allowlisted static artifact.
- Preserve all existing unit and integration tests.

#### Browser and accessibility validation

- Compare all cards and open each detail, source, static cartridge, download,
  copy, and handoff path.
- Deny clipboard permission and verify a selectable manual-copy fallback.
- Verify no credential, boundary, transcript, or identity fields exist.
- Verify no new persistent storage key is written through catalog use.
- Verify semantic headings, links, buttons, status feedback, focus order, focus
  restoration, and screen-reader labels.
- Test 320×568, a representative mobile viewport, desktop, 200% root text,
  keyboard-only use, reduced motion, and zero horizontal overflow.
- Inspect each artwork at mobile and desktop sizes and verify that alternative
  text or decorative treatment matches the surrounding card semantics.
- Run the same journeys against a local static server at `/` and a simulated
  `/the-guide/` project path.
- Disable JavaScript and verify comparison, source inspection, and cartridge
  download remain usable.
- Run existing hosted-game journeys unchanged.

#### Security and privacy validation

- Inspect public cartridge source for publisher/version/capability transparency
  and absence of secrets or internal-only instructions.
- Inspect client bundles and network activity to confirm no provider config,
  analytics, transcript endpoint, or unexpected third-party request is added.
- Inspect the Pages artifact and workflow permissions; confirm no secret is
  referenced and no pull-request event can deploy.
- Exercise observation text that contains fake system prompts, tool requests,
  secret requests, precise-location requests, and instructions to ignore the
  covenant.
- Exercise unsafe real-world suggestions and content-specific claims for each
  game.
- Exercise stop and role release from disclosure, active play, pause, and the
  final turn.

#### Cross-harness evaluation

- Use one non-sensitive fixture player profile and synthetic observations.
- Run normal, refusal, changed-boundary, pause/resume, immediate-stop,
  injection-like input, unsafe-content, tool-temptation, grounding, completion,
  and post-return ordinary-query cases for every candidate compatibility label.
- Record harness/model, exposed reasoning setting, transport, latency, exposed
  token usage, tool calls, retries, consent, safety, grounding, role release,
  and result without storing full private conversations.
- Compare each baseline run with one lower reasoning setting when the harness
  exposes such a control; do not weaken any safety or acceptance requirement.
- Mark a cartridge/harness/version compatible only when every blocking case
  passes. Record unavailable metrics as unavailable rather than inferring them.

#### Required project validation

- Focused tests during tasks: `npm test`.
- Deterministic static build and artifact-link inspection through a dedicated
  npm script added during E05.
- Full local validation before review: `npm run validate`.
- A dry local execution of the Pages build/package steps. Do not run the deploy
  action before explicit human authorization.
- Independent `bwh-agent-review` after E08 and before human output testing.
- Human output testing must assess premise comprehension, cartridge trust,
  differentiation, emotional effect of drinking/return, response relevance,
  stop behavior, and whether the experience feels like a game with the player's
  agent rather than a prompt demonstration.

## Risks and mitigations

- **Weak safety enforcement:** third-party agents own execution. Mitigate with a
  narrow conversation-only covenant, transparent limitations, adversarial
  evaluation, evidence-scoped compatibility labels, and the hosted fallback.
- **Prompt-directory perception:** three role prompts may not feel like games.
  Mitigate by requiring different objectives, interaction grammars, arcs,
  endings, and human differentiation testing.
- **Role leakage:** an agent may remain in character. Mitigate with bounded
  three-beat arcs, stop from every state, explicit release language, post-return
  tests, and honest new-conversation recovery.
- **Ambient permissions:** a capable harness may invoke tools. Mitigate by
  requiring no gameplay tools, recommending a restricted conversation, testing
  tool temptations, and withholding compatibility when a tool is invoked.
- **Resource tampering or drift:** copied cartridges may change or age. Mitigate
  with visible first-party identity, immutable versioned URLs, a canonical
  source, embedded covenant version, and conformance tests. Cryptographic
  signing is deferred.
- **Compatibility variance:** models may skip consent, lose state, or reinterpret
  rules. Mitigate with file/paste fallback, a small named matrix, recorded
  evidence, and no universal claim.
- **Fiction presented as fact:** Mystery, Story, or Signal framing could mislead.
  Mitigate with game-specific claim boundaries and adversarial cases.
- **Privacy misunderstanding:** The Guide does not receive chats, but the user's
  chosen provider may. Mitigate with explicit cabinet and cartridge disclosure.
- **Content maintenance:** duplicated embedded covenants can fragment. Mitigate
  with one canonical source and automated embedding/drift checks.
- **Premature product migration:** replacing the hosted app could remove the
  stronger safety boundary before the experiment succeeds. Mitigate with an
  independently built Pages artifact and a separately approved retirement
  decision for the hosted prototype.
- **Static-host path breakage:** project Pages sites commonly live below a
  repository path, while a later custom domain may use `/`. Mitigate with
  relative URLs, dual-context link tests, and no dependency on redirects or
  rewrites.
- **GitHub supply chain and availability:** Pages and Actions are third-party
  dependencies. Mitigate with reviewed action versions, least privilege,
  deterministic artifacts, protected manual deployment, and a host-portable
  output directory.
- **Host-controlled behavior:** response headers, cache behavior, access logs,
  and availability are not application-controlled on Pages. Mitigate with
  versioned filenames, in-page download/copy fallbacks, an accurate privacy
  disclosure, and no header-dependent requirement.
- **Generic or misleading artwork:** interchangeable visuals would weaken the
  product choice, while overly literal references could copy existing games.
  Mitigate with one shared original art direction, game-specific briefs,
  provenance records, responsive inspection, and an explicit originality
  review.

## Stop conditions

Stop development and return the specification for refinement if work requires:

- removing or migrating the hosted prototype;
- collecting accounts, transcripts, mementos, boundaries, identifiers, or
  analytics;
- agent tools, external side effects, precise location, travel, multiplayer, or
  community-authored cartridges;
- an enforceable safety claim that the cartridge format cannot support;
- a harness-specific extension, install, authentication flow, or paid service;
- a server API, runtime secret, database, server-side rendering, redirect, or
  rewrite for the cabinet;
- changing the current archive or expedition-state schema;
- publishing externally without human authorization and an explicit license or
  usage-terms decision;
- enabling automatic-on-push deployment without a later approval;
- compatibility claims without the required evidence; or
- content that cannot reliably release the role or respect stop in the agreed
  evaluation matrix.

Repeated validation failure in consent, stop, unsafe action, unwanted tool use,
grounding, or role release is a specification-level issue, not a reason to lower
the acceptance threshold.

## Decisions

- Elixirs are the primary product unit being tested: each is one temporary game
  for the player's existing agent.
- The iteration is additive and reversible; the current hosted game remains the
  reference and recovery path.
- The first cabinet contains exactly three first-party games: Signal, Mystery,
  and Story.
- Every cartridge has distinct original artwork with recorded provenance and a
  coherent shared cabinet art direction.
- Each cartridge is self-contained, transparent, versioned Markdown containing
  an embedded common covenant and complete game instructions.
- URL, file, and paste/copy are equivalent handoff paths; no custom API or
  harness integration is required.
- The web cabinet is a standalone, framework-independent static artifact whose
  index is the root of its deployment. It does not run the game or collect setup
  data.
- GitHub Pages is the preferred first host, deployed from a dedicated static
  artifact through a manual, least-privilege Actions workflow.
- The existing Next.js application is not statically exported, bundled into the
  Pages artifact, or modified to support Pages.
- The third-party agent harness owns conversation state and model access. The
  cartridge is a behavioral contract, not an enforceable sandbox.
- All first-cabinet games are short, stay-here, foreground-only, and
  conversation-only after the initial resource load.
- No accounts, credentials, transcript return, central memory, new persistent
  browser state, analytics, or player count are included.
- Every game requires disclosure, affirmative consent, immediate stop, and
  explicit role release.
- Compatibility is evidence-scoped by cartridge, version, and harness class.
- Existing execution plans and historical specs are not modified by this spec.

## Assumptions

- The user's invocation of `bwh-spec` after the Elixir discovery authorizes a
  decision-ready specification using that brief's recommended first-party,
  three-cartridge, tool-free direction; it does not constitute human approval
  for development.
- Three accepted beats per game are enough to test differentiation while
  keeping evaluation bounded.
- A technically curious initial audience can use at least one of URL, file, or
  paste handoff.
- A small semantic HTML/CSS/JavaScript presentation can support a clear cabinet
  without a browser framework, new generated assets, or an expanded
  point-and-click room.
- At least two representative live harness classes will be available for
  authorized evaluation before human testing.
- The repository owner's GitHub plan and settings permit a Pages site for this
  repository; local development remains possible if Pages is not yet enabled.
- Relative URLs and a build-supplied base path are sufficient for the default
  project-site URL and a later custom domain.
- The first iteration can evaluate repeat interest through human testing rather
  than production analytics.

## Open questions for human approval

1. Name the live representatives for the three harness classes and confirm who
   can authorize and perform E07. The recommended starting set is ChatGPT for a
   consumer assistant, Hermes or OpenClaw for a personal agent, and Codex or a
   VS Code agent for a coding harness.
2. Decide whether the initial names are product names or working labels. Naming
   can be refined without changing mechanics if resolved before public use.
3. Decide the license or explicit first-party usage terms before any cartridge
   is published outside local/test environments.
4. A custom domain is optional and deferred. If one is desired for first
   publication, provide it before the final Pages deployment check; otherwise
   the repository's default project-site URL is used.

The harness choice and license remain rollout dependencies and do not block
local implementation. The custom-domain question defaults to the standard
project-site URL.

## Deferred cartridge directions

- A future cartridge or Story revision may let the player choose a bounded turn
  count before drinking the Elixir and may resolve through different endings
  based on accumulated choices, like a choose-your-own-adventure structure.
- That direction requires its own game-state, branching, ending-grounding,
  replay, and cross-harness evaluation work. It does not change the first
  cabinet's fixed three-beat games or authorize an unbounded conversation.
- A fourth immersive Story concept is intentionally reserved for later human
  input and is not inferred or implemented in this iteration.

## Source-of-truth decisions and conflicts

- `README.md` and `docs/product-brief.md` remain authoritative for the human/AI
  buddy promise, reversible agency, fictional elixir, one meaningful moment at
  a time, and private user-owned memory.
- `docs/specs/safety-model.md` remains the source for prohibited real-world
  action families. This specification applies those constraints as cartridge
  content and evaluation requirements while explicitly acknowledging the loss
  of application enforcement.
- `docs/architecture.md` remains authoritative for the current hosted mode: the
  application owns state and validates model proposals. This spec introduces a
  separate experimental mode in which the third-party harness owns execution;
  it does not redefine the hosted architecture.
- `docs/decisions/0006-provider-integration-strategy.md` remains applicable to
  hosted provider integrations. Portable cartridges deliberately avoid that
  provider path and do not revoke the ADR.
- `docs/specs/ai-led-signal-expedition.md` remains the implementation authority
  for the active hosted signal expedition. Its prompt and tests may inform the
  Signal cartridge, but the cartridge cannot claim application-owned safety.
- The product brief's explicit non-goal of a large content library is preserved
  by limiting the experiment to three first-party games.
- The current application uses `POST` route handlers for live expedition start
  and turn operations, so it is not compatible with the serverless Pages target
  without materially changing hosted behavior. The dedicated static build is a
  deliberate separation, not a change to the current deployment architecture.
- There is a material architectural tension between application-owned safety in
  the current source of truth and instruction-only safety in a third-party
  harness. The separate static artifact, transparent limitation,
  evidence-scoped labels, and hosted fallback contain the conflict for this
  experiment. GitHub Pages can be the root of the separate cartridge site
  without implying that the
  hosted application has been migrated. Retiring the hosted mode still requires
  a later product and architecture decision after human testing.
