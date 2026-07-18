# Elixir Delivery Methods and Event Contract — Discovery Brief

## Idea and opportunity

Make an Elixir easy to start from either side of the boundary:

- **cabinet-first:** a player searches or browses The Guide, chooses an Elixir,
  copies a versioned link or handoff message, and pastes it into a fresh AI
  conversation; or
- **chat-first:** a player asks their existing agent to find an Elixir, and the
  agent uses a narrowly scoped catalog integration such as an MCP server to
  search and retrieve the selected cartridge.

Both routes should resolve to the same immutable Markdown cartridge and the
same disclosure, consent, conversation-only play, and role-release covenant.
Delivery ends once the complete cartridge is loaded. Any browsing, URL fetch,
or MCP call used to obtain it is a delivery action, not a gameplay capability.

The delivery workstream should also define the event contract that later lets
hosting report which Elixirs are most often selected or obtained. It must keep
acquisition popularity separate from actual starts, completions, satisfaction,
and compatibility.

## Problem and desired outcome

The prototype already exposes a versioned link, copied handoff message, copied
cartridge text, and downloadable Markdown file. These are portable but place
several decisions on the player: what to copy, where to paste it, whether their
agent can fetch a URL, whether the whole cartridge was loaded, and what to do
when fetching fails.

The alternative chat-first experience could feel natural for a returning
player, but it assumes that the chosen harness supports and has been configured
with a suitable integration. It also risks allowing the agent to choose,
retrieve, or start content without a sufficiently visible player decision.

The desired outcome is:

> I can find an Elixir in the cabinet or ask my agent to find one, make an
> informed choice, and reach the Elixir's disclosure and consent step with one
> obvious action and a dependable fallback.

For the maintainer:

> We can compare delivery channels and rank acquisition popularity using a
> small, versioned, privacy-preserving event contract without receiving the
> player's AI conversation.

## Actors

- **First-time player:** benefits from cabinet explanations, visible cartridge
  source, compatibility evidence, and guided handoff.
- **Returning player:** may prefer to begin inside their existing AI chat and
  ask the agent to find a suitable Elixir.
- **Player's agent:** may receive pasted text, fetch a public URL, read an
  attachment, or call a configured read-only catalog integration.
- **Catalog maintainer:** publishes immutable cartridge versions and needs
  acquisition counts separated by Elixir, version, channel, and method.
- **Harness/integration maintainer:** validates a named delivery adapter without
  claiming that all AI chats support its capabilities.
- **Static host or later event processor:** serves public artifacts and may
  receive explicitly allowlisted delivery events, but never gameplay content.

## Known facts

- The cabinet currently emits one canonical cartridge as identical URL,
  download, copy, and visible-source bytes.
- The current handoff message asks the agent to read the complete cartridge,
  explain the game, and request affirmative consent before transformation.
- The current generated cartridge path is immutable by slug and semantic
  version, for example `cartridges/story/0.1.0/elixir.md`.
- Current evaluation transport values are `url`, `file`, and `paste`.
- The common covenant permits the initial cartridge delivery but prohibits
  browsing, tools, files, messaging, and external actions after the cartridge
  has been loaded for gameplay.
- The cabinet is static, stores no browser state, sends no product analytics,
  and receives no transcript, boundary, memento, credential, or agent memory.
- Compatibility evidence is currently limited to the experimental coding-agent
  class. No chat-first or MCP delivery compatibility is established.
- The current product has no public deployment authorization, resolved usage
  terms, server runtime, account system, or analytics processor.

## Assumptions

- The lowest-common-denominator route remains a copied handoff containing an
  immutable public URL, with full-text paste and file attachment as fallbacks.
- Some harnesses can retrieve a public URL supplied in chat, but support,
  permission prompts, and reliability vary and must be tested by named harness.
- A chat-first catalog integration can be read-only and limited to public
  Elixir metadata and cartridge bytes; it does not need access to the user's
  conversation, files, identity, or other tools.
- A structured catalog protocol such as MCP may make chat-first discovery
  possible, but installation and capability support prevent it from being the
  universal first-time route.
- Popularity can initially mean acquisition actions, not unique people. No
  stable user identifier is required.
- Search terms may reveal personal interests or boundaries. Raw free-text
  queries must not enter analytics, even if a search service processes them
  transiently to return results.

## Delivery principles

- One immutable cartridge version is authoritative across every method.
- The player sees the promise, demands, inputs, data behavior, and compatibility
  status before choosing.
- A retrieval method may fetch only public catalog data and cartridge content.
- Retrieval completes before the agent begins disclosure or play.
- The agent must not interpret access to a delivery integration as permission
  to use it or any other tool during gameplay.
- A fresh conversation is recommended; resuming a prior Elixir role is not the
  default start behavior.
- Every convenient route retains file and complete-text fallbacks.
- Events describe observable delivery actions precisely and never infer play.

## Delivery journeys

### Journey A — Cabinet-first guided handoff

1. The player browses or searches the cabinet using promises and structured
   facets such as time, energy, movement, tone, and interaction shape.
2. The player opens an Elixir detail page and inspects its suitability.
3. A single primary action, such as **Start with my AI**, offers the shortest
   tested method for a selected harness and always exposes universal fallbacks.
4. The default universal action copies a compact handoff message containing the
   immutable cartridge URL.
5. The player opens a fresh chat and pastes the message.
6. The agent retrieves the complete cartridge if permitted. If retrieval fails,
   the player attaches the Markdown file or pastes the complete text.
7. The agent discloses the Elixir and asks for consent. Delivery is complete;
   gameplay remains in the harness.

This is the recommended baseline because it works without installing The Guide
inside a harness and keeps the player-facing trust information visible.

### Journey B — Direct link supplied in chat

1. The player obtains or receives an immutable Elixir link.
2. They paste it into a fresh AI chat with the short handoff instruction.
3. The agent fetches and reads the complete resource, then follows the normal
   disclosure and consent lifecycle.
4. If the harness cannot fetch it, the response directs the player to attach or
   paste the cartridge rather than pretending it was loaded.

This is the simplest repeatable handoff. A bare URL alone is less reliable than
a compact instruction that names the title/version, requests a complete read,
and states the required next step.

### Journey C — Chat-first catalog integration

1. The player asks their agent for a game using ordinary language, such as a
   short low-energy mystery.
2. A configured read-only integration searches public Elixir metadata. The
   first protocol candidate is MCP, subject to named-harness validation.
3. The agent presents a small shortlist with the same promise, demands, data,
   and compatibility information shown by the cabinet.
4. The player explicitly chooses an Elixir.
5. The integration returns the complete immutable cartridge, integrity data,
   and canonical source URL.
6. The agent closes the delivery phase, discloses the selected game, and asks
   for consent before play.

The integration should expose the conceptual operations:

- `search_elixirs`: structured filters and optional transient text query,
  returning bounded summaries and stable IDs;
- `get_elixir`: a stable ID and optional version, returning the complete
  cartridge, resolved version, integrity digest, metadata, and source URL; and
- `list_elixirs` or an equivalent browseable resource for clients that do not
  support search well.

Whether a particular MCP implementation exposes retrieval as a resource, tool,
or both is a specification and compatibility decision. The product contract is
read-only search and retrieval, not the protocol primitive. The service must
not accept transcripts, player profiles, boundaries, mementos, or arbitrary
content, and it must offer no general browsing or gameplay operation.

### Journey D — Harness-specific launch or installed library

A deep link, native share action, installable skill, custom assistant, or other
harness-native package could reduce repeated handoff friction. Each creates a
separate adapter, update, permission, review, and compatibility surface. These
methods should remain optional accelerators over the universal cartridge, not
forked game content or prerequisites for play.

## Materially different delivery options

### Option 1 — Universal URL/file/text only

Polish the current cabinet around one dominant copy-handoff action with clear
fetch failure recovery. This has the widest reach and smallest operating
surface, but chat-first discovery and near-one-click repeat use remain manual.

### Option 2 — Universal baseline plus read-only chat-first catalog

Retain URL/file/text for everyone and add a narrowly scoped MCP-compatible
search/retrieval service for tested harnesses. This supports both of the desired
entry points and keeps one content source, but introduces a server/integration,
protocol compatibility, operational monitoring, and installation guidance.

### Option 3 — Harness-specific launch adapters first

Optimise selected AI products with deep links, skills, or custom assistants.
This may provide the shortest path on those products, but risks platform
fragmentation before the universal journey is understood and could obscure the
transparent cartridge.

### Tentative direction

Use **Option 2** as the direction, delivered incrementally:

1. make the cabinet-first copied handoff and direct-link journey excellent;
2. define and instrument the shared event contract;
3. prototype read-only chat-first search/retrieval against one named
   MCP-capable harness; and
4. add other native adapters only when their measured benefit justifies their
   maintenance cost.

The MCP route is a convenience and discovery channel, not the only way to play.

## Event contract

### Contract goals

- Compare how Elixir versions are discovered and obtained.
- Identify the most acquired Elixirs without persistent identity.
- Separate explicit player actions, resource traffic, and player-reported
  activation.
- Work across cabinet, direct-link, and chat-first delivery.
- Remain independent of the eventual analytics vendor or storage service.
- Reject rather than silently accept unknown event names or fields.

### Event classes and names

#### Discovery events

- `catalog_filters_applied`: structured facet IDs were applied. Record no raw
  search text; at most record `query_present: true|false`.
- `elixir_detail_opened`: a player opened a specific Elixir/version from a
  known cabinet surface.
- `elixir_shortlist_presented`: a chat-first integration returned one or more
  candidate IDs. This measures discovery operation, not player interest.

Discovery events do not count toward popularity by default.

#### Acquisition-intent events

- `delivery_action_recorded`: a player deliberately invoked a cabinet or
  harness-adapter delivery action. `delivery_method` identifies
  `handoff_message_copy`, `cartridge_link_copy`, `cartridge_text_copy`,
  `cartridge_file_download`, or `native_launch`; `result` records whether that
  immediate action succeeded or failed.
- `chat_elixir_selected`: a player explicitly chose a candidate returned by a
  chat-first catalog integration.

Successful `delivery_action_recorded` events and `chat_elixir_selected` form the
initial **acquisition popularity** metric. They do not prove that a cartridge
was retrieved, read, started, or completed. A download or native launch is
“succeeded” only when the cabinet successfully initiates the browser action;
the event cannot assert what the browser or target harness did afterward.

#### Resource-delivery events

- `cartridge_delivery_recorded`: the immutable cartridge was requested through
  `http_fetch` or `mcp_retrieval`; `result` records whether that delivery
  operation succeeded or failed.

These are operational delivery counts. Bots, previews, retries, caches, and a
fetch following a copied handoff can produce them, so they must never be added
to acquisition-intent counts or called players.

#### Optional player-reported outcome events

- `delivery_outcome_reported` with `outcome` limited to `started`,
  `did_not_start`, or `unsure`.

This is an explicit, optional player report. Completion, satisfaction, and
recommendation require separate future questions and are outside the first
delivery contract.

### Common event envelope

Every accepted event uses a strict, versioned envelope:

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
  "target_harness": "unspecified",
  "result": "succeeded",
  "deployment_revision": "public-build-revision"
}
```

Required and conditional fields:

- `contract_version`: semantic version of the event schema.
- `event_id`: random ID used only for retry idempotency; never reused across
  events, journeys, sessions, devices, or users.
- `event_name`: allowlisted name from the classes above.
- `occurred_at`: UTC timestamp; storage may reduce precision for reporting.
- `surface`: allowlisted origin such as `cabinet_results`, `cabinet_detail`,
  `direct_cartridge`, or `chat_integration`.
- `channel`: `cabinet_first`, `direct_link`, `chat_first`, or
  `harness_adapter`.
- `elixir_id` and `elixir_version`: required whenever the event concerns one
  chosen or delivered cartridge; absent for catalog-wide filtering.
- `delivery_method`: conditionally allowlisted as `handoff_message_copy`,
  `cartridge_link_copy`, `cartridge_text_copy`,
  `cartridge_file_download`, `native_launch`, `http_fetch`, or
  `mcp_retrieval`.
- `target_harness`: optional allowlisted product/class only when the player
  explicitly selected it; otherwise `unspecified`. Never infer it from browser
  or network metadata.
- `result`: `succeeded` or an allowlisted coarse failure such as `denied`,
  `unavailable`, or `failed`; no exception text.
- `deployment_revision`: public application/build revision for correlating
  behavior changes, not a user or session identifier.

Event-specific payload fields are allowed only where defined by the eventual
schema. For example, `catalog_filters_applied` may contain allowlisted facet IDs
and a coarse result-count bucket, while `delivery_outcome_reported` contains the
allowlisted `outcome`. Arbitrary properties must fail validation.

### Prohibited data

No event or collector log may retain:

- raw search text, prompts, messages, transcripts, cartridge text, boundaries,
  mementos, or other free text;
- account, email, provider identity, advertising ID, fingerprint, stable user
  ID, or cross-event pseudonymous ID;
- precise location, contacts, credentials, cookies, local storage values, or
  unrelated URL parameters;
- full referrer, full user-agent string, or arbitrary error/stack text; or
- IP address beyond unavoidable request processing. The eventual processor must
  disable, redact, or expire network logs under an approved retention policy.

### Popularity semantics

- **Most acquired:** rank successful `delivery_action_recorded` events and
  `chat_elixir_selected` events by `elixir_id` and `elixir_version` within a
  declared time window.
- Report **actions**, not unique users or players.
- Keep cabinet-first, chat-first, and harness-adapter counts available as
  separate breakdowns. Do not combine them until their different triggering
  semantics are understood.
- Never add resource-delivery events to acquisition-intent totals. For example,
  copying a handoff and the agent subsequently fetching its URL is one
  acquisition action plus one resource delivery, not two acquisitions.
- HTTP requests alone cannot establish popularity because bots, link previews,
  retries, caches, and direct traffic distort them.
- A versioned URL pasted or shared outside an instrumented cabinet or chat
  integration produces resource-delivery evidence only. The Guide cannot
  truthfully attribute an acquisition-intent event to that journey.
- “Most played,” “completion rate,” “best,” and “recommended” are unsupported by
  this contract. Player-reported starts may be shown separately with response
  counts and clear self-selection caveats.

### Collection boundary

The event contract does not select an analytics provider. A later specification
must decide whether delivery:

- validates events locally only and leaves live collection to hosting;
- sends events to a minimal first-party endpoint; or
- uses a privacy-preserving third-party processor under an approved data and
  retention agreement.

If the cabinet is hosted statically, raw HTTP access logs must not be treated as
equivalent to this semantic contract.

## Scope for the delivery specification

- Cabinet-first guided handoff and direct-link journey.
- One universal cartridge artifact with file/text fallbacks.
- Named-harness capability and failure testing.
- Strict event schema, allowlist, retry/idempotency behavior, and popularity
  semantics.
- A bounded chat-first integration prototype, if one target harness and its
  installation boundary are approved.
- Clear transition from delivery tools to conversation-only gameplay.
- Accessibility, no-JavaScript fallback, subpath hosting, and immutable-version
  behavior retained from the current cabinet.

## Non-goals

- Receiving or inspecting the gameplay conversation.
- Claiming successful play from a copy, download, launch, or retrieval.
- Stable user identity, cross-device history, behavioural profiles, or
  personalised ranking.
- Universal MCP or URL-fetch compatibility.
- Letting a delivery integration call arbitrary URLs, accept arbitrary files,
  or provide gameplay tools.
- Allowing an agent to choose and start an Elixir without the player's visible
  selection and consent.
- Replacing the cabinet with an MCP server or requiring installation to play.
- Content authoring, marketplace submissions, payments, social features, or
  public deployment.

## Success signals

- A first-time player can choose an Elixir and reach agent disclosure without
  assistance using the cabinet-first route.
- A returning player with the approved integration can ask in chat, compare a
  shortlist, choose, retrieve, and reach disclosure without visiting the
  cabinet.
- Every failed URL/integration route leads to an understandable file or text
  fallback.
- The agent receives the exact immutable cartridge and never uses the delivery
  integration after play begins in evaluated cases.
- Acquisition counts identify the most obtained Elixir/version and channel
  without identifiers or player content.
- Event validation rejects unknown names, extra fields, prohibited text, stale
  versions, duplicate retry IDs, and invalid Elixir/version references.

## Dependencies

- A public or test-reachable immutable cartridge origin for named-harness URL
  evaluation.
- A second live harness class for broader compatibility evidence.
- Selection of any MCP-capable target harness before an integration prototype.
- Approval of the data processor, notice/consent model, retention, access,
  incident, and deletion behavior before live event collection.
- Resolved usage terms before wider cartridge distribution.
- Hosting workstream support for later aggregation and catalog discovery.

## Risks

- **Fetch ambiguity:** an agent claims it read a link it could not access.
  Require observable named-harness tests and explicit attachment/text fallback.
- **Double counting:** one user action creates a copy event and a later fetch.
  Keep acquisition and resource-delivery classes separate.
- **Bot inflation:** HTTP traffic is presented as popularity. Exclude raw fetch
  counts from the popularity metric.
- **Privacy drift:** search or chat text enters analytics. Use structured facets,
  strict allowlists, no arbitrary event properties, and log redaction.
- **MCP/tool confusion:** the agent continues calling tools during the game.
  Limit the server to public read-only delivery and test the transition boundary.
- **Silent curation:** the agent selects a story for the player. Require a
  visible shortlist and explicit choice before retrieval/disclosure.
- **Protocol fragmentation:** clients support different integration primitives.
  Specify the product operations and retain universal URL/file/text fallbacks.
- **Popularity bias:** prominent stories receive more actions and then rank
  higher. Keep editorial and popularity surfaces transparent and test rotation
  or exploration rules in the hosting workstream.

## Decisions needed before specification

1. Which named AI chat or agent harness should be the first cabinet-first URL
   target, and which should be the first chat-first/MCP prototype target?
2. Should the first delivery implementation send live events, or only implement
   the validated event producer for hosting to connect later?
3. Which acquisition action should be the cabinet's single primary CTA:
   copy handoff message, copy cartridge link, or a harness picker that chooses
   between methods?
4. Is a visible player-reported `started`/`did_not_start` control valuable in
   the first delivery slice, or should the contract stop at acquisition?
5. For chat-first discovery, must the player explicitly choose before the full
   cartridge is retrieved, or is presenting summaries before choice sufficient
   provided play cannot begin without consent? The recommendation is explicit
   choice before full retrieval for clearer acquisition semantics.
6. What retention period and reporting granularity are acceptable for event
   actions, and who may access the aggregate report?

## Stop conditions

- Do not implement live collection until processor, notice/consent, retention,
  access, deletion, and network-log handling are approved.
- Do not call any acquisition or retrieval event a player, start, completion,
  satisfaction result, or compatibility pass.
- Do not claim an MCP, URL-fetch, deep-link, or native-launch method works in a
  harness without complete named-version evidence.
- Do not allow any delivery service to accept gameplay text or provide tools
  after cartridge loading.
- Do not remove URL/file/text fallbacks or the visible cartridge source.
- Do not publish or deploy as a consequence of discovery or local prototyping.

## Validation required in the eventual specification

- Moderated cabinet-first and chat-first usability journeys through disclosure,
  consent, fetch failure, fallback, stop, and role release.
- Exact-byte and integrity checks across URL, file, paste, and integration
  retrieval.
- Named-harness capability tests for URL fetching, attachments, paste size,
  protocol support, permission prompts, and delivery-to-gameplay tool release.
- Strict event-schema tests covering every name/field combination, prohibited
  data, retry idempotency, reference validity, and unknown-field rejection.
- Popularity aggregation fixtures proving that acquisitions, HTTP deliveries,
  retries, failures, and optional outcomes remain separate.
- Accessibility, keyboard, no-JavaScript, offline/manual fallback, root/subpath,
  privacy, artifact-audit, and security regression checks.
