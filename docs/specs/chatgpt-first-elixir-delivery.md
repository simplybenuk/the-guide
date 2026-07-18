# The Guide — ChatGPT-first Elixir Delivery Specification

## Status

**NOT READY FOR HUMAN TESTING**

The repository owner approved this specification for development on
2026-07-18. Approval does not authorize public deployment, analytics
collection, or a ChatGPT compatibility claim.

Local implementation, full validation, and independent review completed on
2026-07-18 with no remaining blocking or should-fix implementation finding.
Human output testing remains blocked solely because ChatGPT has zero live runs
and the required second live harness class is still unavailable.

The iteration makes ChatGPT the first named delivery target, preserves
URL/file/text as universal transports, defines and locally exercises a strict
delivery-event contract, and defers MCP and live analytics collection.

## Objective and scope

Make it obvious and dependable for a player to take an Elixir from the static
cabinet into a fresh ChatGPT conversation and reach the cartridge's disclosure
and consent step.

The work covers:

- a ChatGPT-first cabinet handoff with a platform-neutral fallback;
- exact immutable cartridge delivery by URL, file, or complete pasted text;
- clear recovery when ChatGPT cannot retrieve the URL;
- a strict local event producer for delivery actions;
- honest acquisition-popularity semantics for later hosting work; and
- named ChatGPT delivery evaluation without broad compatibility claims.

The work type is static product UX, delivery-contract engineering, privacy and
security design, browser testing, and external harness evaluation. It does not
add a server, analytics processor, account, transcript receiver, MCP service,
or new game content.

## Problem and desired outcome

The current cabinet exposes a versioned URL, copyable handoff, copied cartridge
text, download, and complete visible source. Although technically portable, the
detail page asks the player to understand the available transports and decide
how to use them in an unspecified agent harness.

For ChatGPT, the intended behavior is simpler: copy one prepared handoff, paste
it into a fresh chat, and let ChatGPT retrieve the complete cartridge. If URL
retrieval is unavailable or unsuccessful, the page should immediately explain
how to attach or paste the identical Markdown rather than leaving the player to
debug the handoff.

The desired player outcome is:

> I choose an Elixir, copy one thing into a fresh ChatGPT chat, and either reach
> its explanation and consent question or understand exactly which fallback to
> use.

The desired maintainer outcome is:

> We can validate every delivery action against one stable event contract and
> later measure which Elixirs are most often obtained without mistaking actions
> for players, starts, completions, or enjoyment.

## Actors

- **Player:** chooses an Elixir and wants the shortest trustworthy route into a
  fresh ChatGPT conversation.
- **Fallback player:** uses file attachment or complete-text paste because URL
  retrieval or clipboard access is unavailable.
- **ChatGPT:** the first named consumer-assistant delivery target. It remains a
  third-party harness that controls URL access, attachments, model behavior,
  conversation state, memory, and permissions.
- **Catalog maintainer:** publishes immutable cartridges, maintains the
  handoff, and evaluates exact delivery behavior.
- **Future hosting maintainer:** may later connect the local event contract to
  approved storage and reporting; no such connection exists in this iteration.

## Goals

- Give each Elixir detail page one dominant ChatGPT-first delivery action.
- Keep the handoff short, transparent, and bound to the exact Elixir version.
- Preserve visible source, versioned URL, complete-text copy, and Markdown
  download as universal trust and recovery paths.
- Distinguish delivery from gameplay: URL/file access completes before the
  agent discloses the game, and no tools are requested after loading.
- Provide actionable feedback for clipboard denial and URL-fetch uncertainty.
- Define a strict, versioned event schema for observable delivery actions.
- Exercise event creation locally without network transmission or persistence.
- Define “most acquired” as qualifying actions per Elixir/version and retain
  enough method context for later hosting analysis.
- Evaluate the URL, file, and paste journeys in a named ChatGPT environment
  before making any delivery or compatibility statement about it.

## Non-goals

- Cabinet search, filters, recommendations, rankings, popularity UI, or hosting
  dashboards.
- Live analytics collection, an event endpoint, analytics SDK, collector logs,
  database, data retention system, or third-party processor.
- MCP, connectors, custom GPTs, skills, deep links, native share targets, or
  any installable ChatGPT integration.
- Detecting that ChatGPT actually started, completed, or enjoyed a game.
- Player-reported outcomes, feedback forms, ratings, or completion callbacks.
- Accounts, stable user/session identity, fingerprints, cookies, or persistent
  browser storage.
- Receiving prompts, search terms, transcripts, boundaries, mementos,
  credentials, memory, attachments, or other player content.
- Changing cartridge bytes, versions, metadata, covenant behavior, gameplay,
  artwork, or compatibility evidence without the existing review process.
- Claiming universal ChatGPT, consumer-assistant, or URL-fetch compatibility.
- Public deployment, Pages activation, release, domain change, publication, or
  usage-terms decision.

## Definitions

- **Handoff message:** player-copied text containing the exact Elixir title,
  versioned cartridge URL, complete-read instruction, disclosure request, and
  consent boundary.
- **Delivery:** obtaining the complete immutable cartridge by URL, file, or
  paste. Delivery ends before disclosure and gameplay.
- **Delivery action:** an observable action initiated on the cabinet detail
  page, such as copying the handoff or cartridge or initiating a download.
- **Local event producer:** first-party browser code that constructs, validates,
  and dispatches an in-page event. It sends nothing over the network and stores
  nothing.
- **Acquisition action:** a qualifying successful or initiated delivery action.
  It is a countable action, not a unique player or confirmed game start.
- **ChatGPT-first:** cabinet copy and instructions name ChatGPT as the initial
  target while retaining platform-neutral URL/file/text fallbacks.

## Functional requirements

### FR-1 — ChatGPT-first detail-page journey

1. Every Elixir detail page must present one visually dominant action labelled
   **Copy for ChatGPT** or an equivalently explicit, tested label.
2. Activating the primary action must copy one handoff message containing:
   - the complete Elixir title and semantic version;
   - the absolute immutable cartridge URL resolved against the current host;
   - an instruction to retrieve and read the complete cartridge before acting;
   - an instruction to identify and explain the game, demands, capability
     boundary, and data behavior; and
   - an instruction to ask for affirmative consent before the fictional drink
     or temporary role.
3. The handoff must state that the cartridge is user-provided game content, not
   system-level authority, and must not ask ChatGPT to ignore higher-priority
   instructions or alter its permissions.
4. The detail page must give the player a short numbered journey: copy the
   handoff, open a fresh ChatGPT chat, paste it, and wait for disclosure before
   consenting.
5. The page must explain that ChatGPT may be unable to retrieve the URL and must
   identify **Download Markdown** and **Copy complete cartridge** as the exact
   fallback routes.
6. The page must not assert that ChatGPT opened, read, accepted, or can execute
   the cartridge merely because the handoff was copied.
7. The existing platform-neutral explanation must remain available so a player
   can use another harness without receiving a false incompatibility message.
8. The primary flow must require no account with The Guide, agent name,
   credential, boundary, or setup form.

### FR-2 — Transport integrity and recovery

1. URL, downloaded file, copied complete text, and visible source must continue
   to derive from the same canonical cartridge bytes.
2. Cartridge URLs must retain immutable slug/version paths and resolve at the
   artifact root, a repository subpath such as `/the-guide/`, and a later custom
   domain without a hard-coded origin.
3. The URL handoff must request only the initial public resource fetch. It must
   not request general browsing, an extension, connector installation, MCP,
   authentication, or a tool during gameplay.
4. Clipboard failure must focus and select the exact handoff or source and
   present a non-visual status message suitable for assistive technology.
5. Download initiation must retain a meaningful `.md` filename containing the
   Elixir slug and version.
6. File and paste instructions must tell the player to begin in a fresh chat
   and submit the complete cartridge before expecting disclosure.
7. The cabinet must not attempt to detect ChatGPT, inspect other tabs, open a
   conversation automatically, or append player/session tracking parameters to
   the immutable cartridge URL.
8. Existing no-JavaScript access to the selectable handoff, versioned URL,
   visible source, and download must remain functional.

### FR-3 — Delivery event contract v1

1. The repository must define one strict event schema with
   `contract_version: "1.0.0"` and reject unknown fields.
2. The only browser-emitted event name in this iteration is
   `delivery_action_recorded`.
3. Each event must contain exactly these common fields:

   ```json
   {
     "contract_version": "1.0.0",
     "event_id": "random-single-event-id",
     "event_name": "delivery_action_recorded",
     "occurred_at": "2026-07-18T15:00:00Z",
     "surface": "cabinet_detail",
     "channel": "cabinet_first",
     "elixir_id": "the-guide.elixir.story",
     "elixir_version": "0.1.0",
     "delivery_method": "handoff_message_copy",
     "target_harness": "chatgpt",
     "result": "succeeded",
     "deployment_revision": "public-build-revision"
   }
   ```

4. Field rules are:
   - `event_id` is random, unique to one event, and never reused as a journey,
     session, device, or user identifier;
   - `occurred_at` is a valid UTC timestamp;
   - `surface` is exactly `cabinet_detail` for current browser events;
   - `channel` is exactly `cabinet_first` for current browser events;
   - `elixir_id` and `elixir_version` must resolve to a current canonical
     cartridge and must match the detail page;
   - `delivery_method` is one of `handoff_message_copy`,
     `cartridge_text_copy`, or `cartridge_file_download` in this iteration;
   - `target_harness` is `chatgpt` for the primary handoff and `unspecified`
     for platform-neutral complete-text/download fallbacks;
   - `result` is `succeeded`, `initiated`, `denied`, `unavailable`, or `failed`;
     copy actions use `succeeded` only after clipboard completion, while a
     download uses `initiated` because the page cannot observe completion; and
   - `deployment_revision` is a public build identifier and never a runtime or
     user-derived value.
5. Copy failure must emit only a coarse result. Exception messages, stack text,
   clipboard contents, and copied values must never enter the event.
6. Adding event names, delivery methods, target-harness values, or fields later
   requires a reviewed schema-version change appropriate to compatibility.
7. Discovery events, HTTP resource events, MCP events, player outcomes, and
   free-form extension properties are outside event contract v1 and must fail
   current schema validation.

### FR-4 — Local-only event production

1. A qualifying browser action must create the FR-3 event only after its
   immediate result is known, except download, which records `initiated` at the
   point of browser navigation.
2. The producer must validate every event before exposing it to the page.
3. A valid event must be dispatched through a documented first-party in-page
   interface that automated tests can observe without a network service.
4. Production cabinet code must have no event collector URL, network request,
   beacon, analytics SDK, remote script, cookie, local/session storage write,
   IndexedDB write, service worker, or console dump of the event.
5. Event creation failure must fail closed: the delivery action may still work,
   but no malformed or partially populated event may be emitted.
6. Event IDs and payloads must not persist beyond the page lifecycle.
7. The generated static artifact audit must reject an analytics endpoint,
   third-party SDK, unexpected remote origin, or unallowlisted runtime file.

### FR-5 — Popularity semantics

1. A future “most acquired” calculation may count:
   - `handoff_message_copy` with `result: succeeded`;
   - `cartridge_text_copy` with `result: succeeded`; and
   - `cartridge_file_download` with `result: initiated`.
2. Reports must describe these as acquisition **actions**, not unique users,
   players, starts, plays, completions, satisfaction, quality, or compatibility.
3. Counts must be grouped by `elixir_id`, `elixir_version`, declared time
   window, and optionally delivery method/target harness.
4. Multiple actions from one person remain multiple actions because contract
   v1 contains no stable identity or journey identifier.
5. Raw cartridge HTTP requests, link previews, bots, caches, and retries are not
   part of contract v1 and must not be added to acquisition-action totals.
6. The event contract and aggregation fixtures may define the future calculation,
   but this iteration must not collect, aggregate, display, or publish live
   popularity.

### FR-6 — ChatGPT delivery evaluation

1. ChatGPT must be recorded as a named `consumer_assistant` harness with the
   exact exposed product/model/mode and evaluation date where available.
2. Evaluation must separately exercise:
   - pasted handoff with immutable URL;
   - attached canonical Markdown file; and
   - complete pasted cartridge text.
3. URL evaluation must record whether ChatGPT actually retrieves the cartridge,
   reports that access is unavailable, or behaves ambiguously. Ambiguity is not
   a pass and must lead to the documented fallback.
4. Every passing transport must demonstrate exact Elixir title/version
   recognition, concise disclosure, affirmative-consent request before role
   entry, stop handling, and explicit role release.
5. No passing case may use a tool after the cartridge is loaded for gameplay.
   Any initial URL retrieval must be distinguishable from gameplay tool use.
6. Shared evaluation evidence must remain redacted and contain no private player
   content, transcript, boundary, memento, account identity, or credential.
7. ChatGPT compatibility must remain fail-closed and cartridge/version scoped.
   Delivery success alone is not a compatibility pass.
8. If authenticated or externally reachable ChatGPT evaluation is unavailable,
   record zero completed runs and retain `untested`; do not substitute a mocked
   response or another harness.
9. This iteration does not remove the existing second-live-harness gate. It may
   satisfy the consumer-assistant portion only if the complete approved matrix
   is actually run and passes.

### FR-7 — Accessibility and progressive enhancement

1. The ChatGPT-first journey must remain operable at 320 CSS pixels, 200% text,
   keyboard-only navigation, reduced motion, and common screen-reader semantics.
2. Primary, fallback, status, and privacy copy must not rely on color, sound,
   artwork, animation, or hover.
3. Copy buttons are progressive enhancement; the complete handoff and cartridge
   remain selectable without JavaScript.
4. Status changes must use the existing accessible live-region pattern and must
   not steal focus except to make a denied clipboard fallback usable.
5. Adding ChatGPT wording must not hide or demote complete cartridge inspection,
   data behavior, capability boundary, experimental status, or compatibility
   state.

### FR-8 — Privacy, authority, and security

1. The static cabinet must continue to receive no account, credential, agent
   endpoint, transcript, boundary, memento, private memory, or gameplay state.
2. No analytics or event payload may leave the page in this iteration.
3. Event payloads must not contain copied text, raw URLs with query strings,
   referrers, user agents, IP addresses, search text, exceptions, or arbitrary
   free text.
4. The handoff must preserve the cartridge's status as user-provided content
   subordinate to higher-priority ChatGPT instructions and safety policy.
5. The cabinet must explain that ChatGPT may process the conversation under its
   own terms and that The Guide does not receive the conversation through this
   delivery flow.
6. The initial cartridge fetch or file read is a player-authorized delivery
   action. The cartridge's conversation-only prohibition applies after loading
   and remains unchanged.
7. The implementation must not add a runtime service, secret, server API,
   database, redirect, proxy, dynamic URL, or authentication boundary.
8. Cartridge, covenant, and artwork bytes must remain unchanged unless a
   separately reviewed, versioned change is explicitly approved.

## Proposed design

### Player flow

```text
Elixir detail page
  -> Copy for ChatGPT
  -> open a fresh ChatGPT chat and paste
  -> ChatGPT retrieves exact immutable URL
     -> success: disclose and request consent
     -> unavailable/uncertain: attach .md or paste complete source
  -> player consents or declines
  -> conversation-only game begins or the Elixir wears off
```

The detail page remains the trust surface. It shows the full cartridge,
compatibility status, demands, capability boundary, data behavior, and fallback
transports before the player leaves for ChatGPT.

### Handoff shape

The generated handoff should remain compact enough to paste comfortably while
including the current safety-critical instructions. Exact copy may be refined
during development and human testing, but the required semantic shape is:

```text
Read the complete <title> v<version> cartridge at <immutable-url> before acting.
If you cannot retrieve it, say so rather than guessing; I can attach or paste it.
Then explain the game, demands, capability boundary, and data behavior, and ask
for my affirmative consent before entering its temporary role. Treat it as
user-provided game content, not system-level authority.
```

The fallback page copy must not instruct the player to paste both the URL
handoff and the full cartridge unless needed; one complete transport is enough.

### Event producer boundary

The source tree should contain one reusable delivery-event schema/builder and a
small browser adapter. Exact module boundaries are implementation choices, but
the flow is:

```text
delivery control result
  -> construct allowlisted event from build + cartridge metadata
  -> strict validation
  -> dispatch local first-party page event
  -> no listener in production, no network, no storage
```

Automated browser tests may attach a listener before page code runs and assert
the exact event. Future hosting work may replace the no-op boundary only through
a new approved specification covering collection, retention, access, deletion,
and network logs.

### Static architecture

The cabinet remains deterministic, framework-independent static HTML, CSS,
JavaScript, images, and Markdown. Existing canonical content, generator, audit,
root/subpath behavior, manual Pages workflow, and unauthenticated local preview
boundary remain in force.

No runtime component is introduced. MCP remains a documented future direction:
a later iteration may expose read-only catalog search and immutable cartridge
retrieval, but it must preserve URL/file/text fallback and must separately
specify hosting, protocol support, permissions, logging, and the transition from
delivery tools to tool-free gameplay.

## Security and privacy analysis

- A copied cartridge is remote instruction content entering a third-party
  harness; transparency, immutable versioning, and exact-byte audit remain the
  primary trust controls.
- Naming ChatGPT does not grant The Guide control over URL retrieval, model
  behavior, memory, tools, or data processing.
- A precise event schema reduces future analytics drift, but local dispatch is
  not authorization to transmit the event.
- Random event IDs provide future retry idempotency only. They must not become
  session identifiers or be retained/reused by client code.
- The event producer uses canonical build metadata, not values parsed from
  user-controlled URLs or copied content.
- No dynamic collector origin means the current same-origin-only artifact
  property can remain enforceable.
- Clipboard errors are reduced to an enum; exception messages can expose
  implementation or environment details and must not enter events.
- Download initiation cannot prove file receipt; its result is deliberately
  `initiated`, not `succeeded`.
- A player may share the cartridge URL outside the cabinet. That produces no
  acquisition event under contract v1 and must not be inferred from host logs.

## Compatibility, rollout, and recovery

### Rollout

1. Add and test the delivery-event schema, builder, and aggregation fixtures.
2. Refine the generated detail-page hierarchy and ChatGPT-first handoff.
3. Connect delivery controls to local validated event dispatch.
4. Run focused unit, build, artifact, browser, accessibility, and privacy tests.
5. Evaluate the three transports in an available named ChatGPT environment;
   persist only the approved redacted evidence.
6. Run the complete repository validation and independent agent review.
7. Hand the reviewed local output to the human only if the existing live-harness
   gate is satisfied; otherwise retain **NOT READY FOR HUMAN TESTING** with the
   exact missing evidence.
8. Public deployment remains a separate explicitly authorized action after
   usage terms are resolved.

### Recovery

- Before merge, close the delivery change and retain the current cabinet.
- After merge, revert the bounded delivery commit or redeploy the last reviewed
  static artifact if the ChatGPT-first UX causes regressions.
- No event data, database, user record, account, or migration requires rollback
  because the iteration transmits and persists nothing.
- If ChatGPT URL retrieval is unreliable, keep the clearer file/text fallback
  and remove or revise the URL-first claim without changing cartridge bytes.
- MCP or live analytics requires a new discovery/specification; neither may be
  introduced as an implementation workaround.

## Acceptance criteria

1. Every Elixir detail page has one dominant ChatGPT-first copy action and
   concise fresh-chat instructions.
2. The copied handoff contains the exact title, semantic version, absolute
   immutable cartridge URL, complete-read requirement, disclosure request,
   affirmative-consent boundary, and user-content authority statement.
3. The primary handoff requests only the initial resource fetch and does not
   request installation, authentication, MCP, permission elevation, or gameplay
   tools.
4. File attachment and complete-text paste remain clear fallbacks, and all URL,
   file, copy, and visible-source bytes remain identical to canonical content.
5. Clipboard denial provides selectable manual fallback and accessible status
   without losing the primary or complete-source content.
6. The static cabinet remains functional without JavaScript for handoff
   selection, versioned URL access, source inspection, and download.
7. Event contract v1 accepts only `delivery_action_recorded` with the specified
   fields, enums, conditional semantics, and valid canonical Elixir/version.
8. Unknown fields, event names, methods, harnesses, results, malformed IDs or
   timestamps, arbitrary text, and mismatched cartridge references are rejected.
9. Primary handoff success emits one local event with method
   `handoff_message_copy`, target `chatgpt`, and result `succeeded`.
10. Complete-text success emits one local event with method
    `cartridge_text_copy`, target `unspecified`, and result `succeeded`.
11. Download activation emits one local event with method
    `cartridge_file_download`, target `unspecified`, and result `initiated`.
12. Copy denial/failure emits at most one event with a coarse result and no
    copied value, exception, stack, URL query, or arbitrary text.
13. The production artifact makes no event-related network request and creates
    no cookie, local/session storage, IndexedDB, service worker, or console log.
14. Aggregation fixtures count qualifying actions by Elixir/version/method and
    exclude failures, HTTP traffic, unique-player claims, starts, completions,
    satisfaction, and compatibility.
15. The artifact remains operable at root and `/the-guide/`, at 320 CSS pixels,
    200% text, keyboard-only, reduced motion, screen-reader semantics, and with
    clipboard access denied.
16. Signal, Mystery, and Story cartridge, covenant, metadata, artwork, and
    published-version behavior remain unchanged.
17. Named ChatGPT evidence records URL, file, and paste results honestly; an
    unavailable or ambiguous URL fetch is not marked passed.
18. Any passing ChatGPT transport discloses before consent, invokes no gameplay
    tool after loading, respects stop, and releases the role explicitly.
19. ChatGPT and all broader compatibility labels remain fail-closed and exactly
    match complete redacted evidence.
20. The generated artifact contains no runtime service, secret, API, analytics
    SDK, collector URL, database dependency, third-party script, unexpected
    remote origin, MCP implementation, or unallowlisted file.
21. The manual-only Pages workflow remains manual and is not executed; no
    deployment, release, domain, tag, or external publication change occurs.
22. `npm run validate` and `git diff --check` pass, and independent review finds
    no blocking or should-fix issue before human output testing is considered.

## Development-readiness bundle

### Proposed task outline

#### D01 — Implement and validate event contract v1

- Add a strict schema and event builder derived from canonical cartridge/build
  metadata.
- Add positive, conditional-field, unknown-field, prohibited-value, and
  mismatched-reference tests.
- Add aggregation fixtures that encode the approved popularity semantics.

#### D02 — Create the ChatGPT-first handoff experience

- Make the detail-page primary action and instructions ChatGPT-specific while
  preserving platform-neutral copy and all fallbacks.
- Refine the compact generated handoff and accessible failure guidance.
- Preserve exact bytes, no-JavaScript behavior, relative source paths, and
  absolute runtime handoff resolution.

#### D03 — Connect local event production

- Dispatch one validated in-page event for each completed or initiated delivery
  control action.
- Fail closed on invalid events and prove there is no network, storage, or log
  side effect.
- Extend static audit allowlists only for reviewed first-party files required by
  this design.

#### D04 — Validate ChatGPT delivery and regressions

- Extend unit/build/browser tests for copy, download, denial, accessibility,
  root/subpath behavior, privacy, and event semantics.
- Run the URL/file/paste delivery evaluation in ChatGPT when accessible and
  persist only redacted, version-scoped evidence.
- Run full repository validation and record any continuing external evidence
  blocker accurately.

#### D05 — Independent review and handoff

- Run independent agent review against this specification, project guardrails,
  changed source, tests, generated artifact, and evaluation evidence.
- Resolve blocking/should-fix findings before any human output-testing handoff.
- Do not deploy, publish, commit, push, or modify the active plan without the
  separate authority required by the workflow.

### Dependencies

- Existing canonical cartridges, generator, artifact audit, and browser suite.
- Current ChatGPT access capable of exercising the named consumer-assistant
  transport, or an honest zero-run blocker record.
- A test-reachable immutable cartridge origin for URL retrieval evaluation;
  external exposure requires separate authorization.
- Existing compatibility fixtures and redacted evidence format.
- Usage terms and publication approval only for later public rollout, not local
  implementation.

### Affected areas

- `site/elixirs/cabinet.js` and `site/elixirs/styles.css`
- `scripts/elixirs/build.mjs`
- new or existing delivery-event schema/tests under `scripts/elixirs/`
- `scripts/elixirs/audit.mjs` and its tests if a new first-party static module is
  emitted
- `tests/elixirs/cabinet.spec.ts`
- delivery-related evaluation fixtures and redacted evidence under
  `scripts/elixirs/` and `docs/evaluations/`
- active overview/architecture copy only where needed to describe the approved
  delivery behavior; cartridge and covenant sources are not expected to change

### Validation plan

#### Focused automated validation

- Event-schema unit tests for every allowed method/result and rejection case.
- Aggregation tests separating qualifying actions from failures and unsupported
  outcome claims.
- Generator tests for exact handoff content, identical canonical bytes, runtime
  absolute URL resolution, and root/subpath-relative authored output.
- Browser tests for primary copy, complete-text copy, download initiation,
  clipboard denial, local event detail, event count, and no-JavaScript fallback.
- Artifact tests rejecting remote scripts, endpoints, beacons, APIs, storage,
  unexpected files, secrets, and changed cartridge bytes.

#### Browser and accessibility validation

- Root and `/the-guide/` journeys.
- 320 CSS pixels, 200% text, keyboard navigation, reduced motion, and accessible
  live-region/focus behavior.
- Clipboard allowed, denied, unavailable, and throwing behavior.
- Request inventory proving that no event dispatch leaves the page.
- Browser storage inventory proving no persistent state is created.

#### ChatGPT evaluation

- Paste the generated handoff into a fresh named ChatGPT conversation and
  record actual URL retrieval behavior.
- Repeat with the exact downloaded Markdown attachment and complete pasted
  source.
- Run the approved disclosure, consent, stop, grounding, tool, and role-release
  cases needed for version-scoped compatibility evidence.
- Record product/model/mode, transport, date, exposed metrics, retries, and
  redacted outcomes without preserving transcript content.

#### Repository validation

- `npm test`
- `npm run build`
- `npm run audit:elixirs`
- `npm run test:e2e`
- `npm run validate`
- `git diff --check`
- independent agent review before human output testing

### Validation evidence required for completion

- Passing focused schema, generator, audit, and browser tests.
- Passing full repository validation.
- Deterministic generated artifact with unchanged canonical cartridge/artwork
  hashes.
- Request/storage audit showing no collection or persistence.
- Complete redacted ChatGPT evidence or an explicit zero-run blocker with no
  compatibility claim.
- Independent review with no blocking or should-fix finding.

## Risks and mitigations

- **ChatGPT cannot retrieve the URL:** make failure honesty and file/text
  fallback first-class; do not mark URL delivery passed without evidence.
- **ChatGPT naming appears to guarantee support:** display experimental,
  evidence-scoped compatibility and distinguish a target from a pass.
- **Primary copy hides transparency:** keep the full source, metadata, data
  behavior, capability boundary, version, and fallbacks adjacent and accessible.
- **Download is overreported as success:** emit `initiated`, never downloaded,
  opened, or played.
- **Local events become shadow analytics:** prohibit network, storage, remote
  scripts, and logging; audit generated requests and files.
- **Future teams treat event IDs as identity:** document single-event use and
  prohibit reuse across actions or page lifecycles.
- **Popularity conflates prominence with quality:** define only acquisition
  actions now; hosting must later disclose ranking logic and position effects.
- **Copied message drifts from cartridge identity:** derive title, version, and
  URL from canonical build metadata and test exact output.
- **Tool boundary blurs after URL fetch:** evaluate initial retrieval separately
  and fail any gameplay-related tool call after loading.
- **ChatGPT interface changes:** scope evidence by product/model/mode/date and
  retain file/text fallbacks rather than encoding brittle automation.
- **Existing compatibility gate is bypassed:** keep the current second-class
  requirement and fail closed when ChatGPT runs are incomplete.

## Stop conditions

Return this specification for refinement if implementation requires:

- a live analytics collector, event transmission, cookie, persistent browser
  storage, database, retention/deletion system, or third-party SDK;
- MCP, a ChatGPT connector, custom GPT, deep link, installable skill, or any
  authenticated harness integration;
- a server function, proxy, dynamic cartridge URL, redirect, runtime secret, or
  new public origin;
- cartridge, covenant, game, artwork, or published-version behavior changes;
- transcripts, prompts, boundaries, mementos, credentials, account identity,
  free text, network identifiers, or exception details entering event data;
- a unique-user, start, completion, satisfaction, quality, recommendation, or
  compatibility claim derived from delivery actions;
- removal of URL/file/text fallback, full-source visibility, no-JavaScript
  behavior, consent, stop, grounding, or role release;
- a ChatGPT compatibility claim without complete named-version evidence; or
- deployment, publication, release, domain, workflow trigger, tag, commit, push,
  or active-plan changes without separate authorization.

## Confirmed decisions

- Delivery is the first of the three owner-identified workstreams.
- ChatGPT is the first named delivery target.
- The primary cabinet method is a copied handoff message containing the
  immutable URL; file attachment and complete-text paste remain fallbacks.
- The cabinet remains the universal trust and acquisition surface for this
  iteration; cabinet search belongs to the later hosting workstream.
- MCP is explicitly deferred but retained as a potential future chat-first
  search and retrieval direction.
- Live analytics collection is out of scope.
- Event contract v1 is implemented and exercised locally only, with no network
  transmission, persistence, aggregation, or display.
- Popularity means qualifying acquisition actions by Elixir/version, not users,
  starts, plays, completions, enjoyment, quality, or compatibility.
- Player-reported delivery outcomes are deferred.
- The static architecture, no-account journey, cartridge covenant, immutable
  content, and fail-closed compatibility model remain in force.

## Assumptions

- **Copy for ChatGPT** is the initial primary-action label; human copy testing
  may refine wording without changing the method or scope.
- A bare versioned URL is less dependable than the prepared handoff because the
  handoff tells ChatGPT to read fully, disclose, ask consent, and report fetch
  failure honestly.
- File and paste are sufficient fallbacks for the first named target.
- The local in-page event interface is enough to make the future hosting
  contract independently testable without authorizing data collection.
- An exact ChatGPT product/model label may only be known at evaluation time and
  will be recorded then rather than guessed in the specification.
- Current ChatGPT access may remain unavailable in the development environment;
  this blocks a compatibility pass and potentially human testing, but does not
  block local implementation or specification approval.
- No new original artwork, cartridge version, or content revision is needed for
  delivery UX.

## Open questions for human approval

No unresolved question changes the proposed local architecture or development
scope. Human approval should confirm the specification as written.

At evaluation time, record the exact available ChatGPT product/model/mode and
the authorized test-reachable cartridge origin. If either is unavailable, use
the specified zero-run blocker rather than expanding scope.

## Source-of-truth decisions and conflicts

- This specification refines delivery behavior under FR-3, FR-9, FR-10, and
  FR-11 of `docs/specs/elixir-cartridge-and-first-cabinet.md` without changing
  its cartridge, covenant, static-artifact, or compatibility requirements.
- The earlier specification prohibits analytics SDKs and collection. Local
  validated event dispatch sends and stores nothing, so it does not supersede
  that privacy requirement or authorize telemetry.
- `docs/architecture.md` remains authoritative: The Guide is a static publisher
  and the third-party harness owns conversation, model, memory, and permissions.
- `content/elixirs/covenant.md` remains authoritative after loading. The initial
  player-authorized URL/file delivery is distinct from prohibited gameplay tool
  use.
- `docs/product-brief.md` remains authoritative for URL/file/text portability,
  no account or transcript, transparent content, consent, and role release.
- `docs/discovery/elixir-delivery-methods.md` supplies the evaluated options and
  broader future event vocabulary. This specification deliberately narrows v1
  to cabinet delivery actions and defers MCP, discovery events, resource events,
  outcomes, collection, and reporting.
- The previous discovery brief suggested a future collection boundary but did
  not select one. The owner's decision to exclude live collection resolves that
  question for this iteration.
- The existing active plan is not edited by specification work.
