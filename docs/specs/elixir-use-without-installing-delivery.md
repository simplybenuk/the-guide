# The Guide — Elixir “Use Without Installing” Delivery Specification

## Status

**NOT READY FOR HUMAN TESTING**

The repository owner approved this specification for development on
2026-07-18. It defines the second ChatGPT-first delivery iteration and responds
to one owner-observed ChatGPT run in which the public Pages cartridge URL could
not be retrieved and ChatGPT correctly refused to guess. The run used the
ChatGPT mobile app on a Plus account in Instant mode; the underlying model
identifier was not exposed. That observation is a failed URL-delivery result,
not a complete compatibility run.

Local implementation, full validation, adversarial audit hardening, and
independent review completed on 2026-07-18 with no remaining blocking or
should-fix implementation finding. Human output testing remains blocked solely
by E07: the required complete second named live harness class is unavailable.
Commit, push, deployment, release, analytics, MCP, and compatibility claims
remain outside this development authorization.

This specification supersedes the URL-first primary handoff
requirements in `docs/specs/chatgpt-first-elixir-delivery.md`. The existing
event privacy boundary, static architecture, cartridge integrity, fallbacks,
consent behavior, and compatibility gates remain authoritative except where
this specification explicitly versions or replaces a delivery method.

Approval authorizes bounded local development and validation only. It does not
authorize a commit, push, pull request, Pages deployment, release/tag, npm
publication, live analytics, MCP service, or compatibility claim.

## Problem

The current primary **Copy for ChatGPT** action copies a compact instruction
containing an immutable Pages URL. This keeps the clipboard payload small, but
the first owner-observed consumer ChatGPT attempt could not retrieve the linked
Markdown. The failure behavior was honest, yet the player had to return to the
cabinet and choose a second transport.

skills.sh demonstrates a useful adjacent pattern: its “use without installing”
flow copies or generates a retrieval procedure that identifies a canonical
source, lets a capable agent resolve the complete content, and retains fallback
behavior. The Guide should borrow that presentation and resolver concept
without treating Elixirs as skills, installing persistent capability, or asking
consumer ChatGPT to execute downloaded packages.

## Desired outcome

For a ChatGPT player:

> I choose an Elixir, copy one self-contained prompt, paste it into a fresh
> ChatGPT conversation, and reach complete disclosure and the consent question
> without depending on URL retrieval or returning to the cabinet.

For a tool-capable agent player:

> I can copy a secondary resolver prompt that identifies exact Pages and pinned
> GitHub sources, and my agent either loads the verified cartridge or asks for
> the complete file/text fallback without guessing.

For the maintainer:

> Both routes are deterministically generated from the same cartridge bytes,
> locally observable through the versioned delivery-event contract, and add no
> transcript collection, persistent installation, or gameplay tool access.

## Actors

- **ChatGPT player:** uses a consumer chat that may have no shell, browsing,
  connector, or reliable public-URL retrieval.
- **Tool-capable agent player:** uses a coding or personal agent that may have
  already-authorized read-only browsing, HTTP, shell, or file capabilities.
- **Player's agent:** reads the delivered cartridge, discloses the game, asks
  for affirmative consent, plays conversation-only, and releases its role.
- **Publisher:** generates immutable delivery payloads and transparent source
  without receiving the player's prompt, transcript, identity, or memento.
- **Evaluator:** records only redacted, named-harness results and does not infer
  broad compatibility from a copy or retrieval action.

## Work type

Static product UX, deterministic text-envelope generation, event-contract
versioning, supply-chain and authority-boundary design, browser/accessibility
testing, and named external-harness evaluation.

## Goals

- Make a complete self-contained ChatGPT prompt the single dominant action.
- Preserve raw cartridge copy, download, visible source, and versioned URL.
- Add a secondary, clearly experimental resolver prompt for capable agents.
- Bind both prompt forms to exact cartridge identity, version, UTF-8 byte count,
  and SHA-256 digest.
- Make incomplete delivery observable through delimiters and fail-closed text.
- Preserve the transition from optional delivery tools to tool-free gameplay.
- Version the local delivery-event contract for the new methods without live
  collection or persistence.
- Evaluate full-paste and resolver behavior honestly in one named ChatGPT
  product/model before changing compatibility evidence.

## Non-goals

- Installing an Agent Skill or modifying agent configuration.
- Publishing or running an Elixir CLI, npm package, `npx` command, executable
  script, custom GPT, connector, extension, plugin, or MCP server.
- Live analytics, event transmission, storage, cookies, accounts, or identity.
- Changing cartridge bytes, metadata, covenant behavior, gameplay, artwork, or
  currently published Elixir versions.
- Automatically opening ChatGPT, detecting the player's installed apps, reading
  another tab, or confirming that a paste was submitted.
- Making URL retrieval the default consumer ChatGPT path.
- Treating an acquisition action as a retrieval, game start, completion,
  satisfaction result, unique player, or compatibility pass.
- Deploying the resulting static artifact without separate explicit authority.

## Confirmed decisions

1. Consumer ChatGPT remains the first named target.
2. The default action copies the launcher envelope and complete cartridge; it
   requires no network or tool after the player pastes it.
3. A secondary **Agent prompt (experimental)** may describe ordered read-only
   retrieval from Pages and commit-pinned GitHub.
4. The first implementation contains no command execution. A transient CLI is a
   future option requiring a separate threat model and specification.
5. Elixirs remain user-provided game content, not installed skills or
   higher-priority instructions.
6. File, raw-text, URL, visible-source, accessibility, no-JavaScript, privacy,
   and root/subpath behavior remain supported.
7. Local events remain in-page only; live analytics stays out of scope.
8. Public rollout remains manual and separately authorized.

## Assumptions

- The current complete cartridges, each approximately 8 KB, fit comfortably in
  one clipboard write and one ChatGPT user message; named live testing must
  verify that assumption.
- All canonical cartridge files remain UTF-8 and end with a line feed.
- The public GitHub repository remains readable at commit-addressed blob and raw
  URLs. Whether a given agent can retrieve those URLs is unknown until tested.
- A Pages build can receive the checked-out 40-character commit SHA. Local
  builds can resolve the current commit or receive an explicit fixture SHA.
- A digest is useful provenance and tool-capable verification metadata. The
  consumer prompt must not claim ChatGPT verified it unless verification
  actually occurred.

## Terminology

- **Self-contained prompt:** launcher instructions followed by the complete
  canonical cartridge within explicit delivery delimiters.
- **Resolver prompt:** launcher instructions plus exact ordered public sources,
  identity metadata, digest, and failure behavior, without embedded cartridge
  bytes.
- **Delivery envelope:** the deterministic metadata and instructions wrapping
  either embedded bytes or retrieval sources.
- **Delivery complete:** the agent has the complete cartridge and has checked
  its identity/version and closing boundary. After this transition, the
  covenant's conversation-only no-tool rules apply.
- **Pinned GitHub source:** a URL containing an exact 40-character commit SHA,
  never `main`, `HEAD`, or another moving branch.

## Functional requirements

### FR-1 — Primary self-contained ChatGPT action

1. Every Elixir detail page must present one visually dominant action labelled
   **Copy for ChatGPT** or **Copy ChatGPT prompt**.
2. Activating it must copy one deterministic self-contained prompt containing:
   - a short statement that this is complete user-provided game content;
   - the exact Elixir ID, title, semantic version, publisher, UTF-8 cartridge
     byte count, and lowercase SHA-256 cartridge digest;
   - the exact opening and closing delivery delimiters;
   - every canonical cartridge byte exactly once between those delimiters;
   - instructions to read the complete enclosed cartridge before acting;
   - instructions to stop and report incomplete delivery if the closing
     delimiter or declared identity/version is absent or mismatched;
   - instructions to explain the promise, duration/demands, required inputs,
     capability boundary, and data behavior; and
   - instructions to ask for affirmative consent before the fictional drink,
     temporary role, or first game move.
3. The copied text must state that higher-priority harness instructions and
   safety policies remain authoritative.
4. The copied text must not ask ChatGPT to browse, execute code, install
   anything, elevate permissions, compute a digest, or use a tool.
5. The page instructions must be a three-step journey: copy, paste into a fresh
   ChatGPT conversation, then wait for disclosure before consenting.
6. Copy success may claim only that the prompt reached the clipboard. It must
   not claim that ChatGPT received, read, verified, accepted, or started it.

### FR-2 — Delivery-envelope integrity

1. The generator must compute byte length using the canonical UTF-8 cartridge
   bytes and compute SHA-256 over those same bytes.
2. Envelope metadata must derive from validated cartridge metadata rather than
   duplicated hand-authored values.
3. Delimiter strings must be constant, versioned, unambiguous, and rejected if
   they occur inside canonical cartridge content.
4. The generated embedded region must equal the downloadable, visible, raw-copy,
   and versioned-URL cartridge byte-for-byte.
5. The generator must fail if a cartridge does not end with a line feed, cannot
   be represented as UTF-8, or contains a reserved delivery delimiter.
6. The envelope must not imply that the receiving agent cryptographically
   verified the digest. A later evaluator may record verification only when the
   named harness actually performed it.

### FR-3 — Secondary agent resolver prompt

1. Each detail page must expose **Agent prompt (experimental)** as a secondary
   route, visually subordinate to the self-contained ChatGPT action.
2. Its copied resolver prompt must contain the same identity, byte-count, digest,
   authority, disclosure, consent, and failure fields as the self-contained
   envelope, but no embedded cartridge bytes.
3. The resolver must provide this ordered retrieval sequence:
   1. the current host's absolute immutable Pages cartridge URL;
   2. an exact commit-pinned `raw.githubusercontent.com` source URL; and
   3. the corresponding human-inspectable `github.com/.../blob/<sha>/...` URL.
4. The prompt may authorize only read-only retrieval of those exact public
   sources during delivery. It must not ask for general search, package
   execution, installation, authentication, repository checkout, writes, or
   unrelated file access.
5. If none of the exact sources can be fully retrieved, the agent must say so
   and ask the player to attach the Markdown or paste the self-contained prompt.
   It must not infer or reconstruct missing content.
6. Once delivery is complete, the resolver must explicitly close the retrieval
   phase and prohibit further tool use for gameplay under the covenant.
7. Public/release builds must fail unless the source revision is exactly 40
   lowercase hexadecimal characters. Unit/local fixture builds may inject a
   documented 40-character test revision.
8. Moving branch names, URL query parameters, redirects authored by The Guide,
   arbitrary repository owners, and arbitrary paths are prohibited.

### FR-4 — Detail-page presentation and fallbacks

1. The page may use a skills.sh-inspired Prompt/Agent Prompt selector, adjacent
   panels, or progressive disclosure, but the default and dominant route must
   be the self-contained ChatGPT prompt.
2. The UI must describe the resolver as experimental and suitable only when the
   player's agent already has an authorized retrieval capability.
3. **Copy raw cartridge**, **Download Markdown**, versioned URL, and complete
   visible source must remain available and subordinate.
4. Clipboard denial/unavailability must focus and select the exact attempted
   payload when practical and expose an assistive-technology status message.
5. If selecting the full generated payload is impractical, failure must open the
   complete source and present file/raw-copy instructions without losing focus.
6. Without JavaScript, users must still be able to inspect/select the complete
   cartridge, follow the versioned URL, and download Markdown. Copy controls may
   be absent, but their fallback instructions must remain accurate.
7. Labels and explanatory interface copy outside the fail-closed resolver
   instructions must not describe an Elixir as an install, plugin, skill,
   extension, or persistent capability.

### FR-5 — Source-revision and URL generation

1. Build code must accept or resolve one source revision for the whole artifact.
2. The workflow build must pass the checked-out `github.sha` explicitly.
3. The repository owner/name and canonical content path must be first-party
   constants validated against each allowlisted slug.
4. Generated GitHub URLs must be HTML-escaped when rendered and treated as text;
   no browser request may occur until a user or receiving agent follows them.
5. The static audit may allow only the exact first-party GitHub blob/raw URL
   patterns required by this specification. No remote script, stylesheet,
   image, API, beacon, collector, or runtime dependency is allowed.
6. A source revision changes provenance metadata only; it must not change the
   canonical cartridge bytes, identity, semantic version, or digest.

### FR-6 — Delivery event contract v1.1

1. The local event contract must advance from `1.0.0` to `1.1.0` because this
   iteration adds delivery-method values.
2. The only event name remains `delivery_action_recorded`; its exact 12-field
   envelope, random single-event ID, canonical UTC timestamp, reference
   validation, and unknown-field rejection remain unchanged.
3. Allowed delivery methods become:
   - `self_contained_prompt_copy`;
   - `resolver_prompt_copy`;
   - `cartridge_text_copy`; and
   - `cartridge_file_download`.
4. `self_contained_prompt_copy` must use target `chatgpt`.
   `resolver_prompt_copy`, `cartridge_text_copy`, and
   `cartridge_file_download` must use target `unspecified`.
5. Copy results remain `succeeded`, `denied`, `unavailable`, or `failed`.
   Download results remain `initiated`, `unavailable`, or `failed`.
6. The retired UI method `handoff_message_copy` must not be emitted by the new
   cabinet. Because no live collector or stored event migration exists, it need
   not remain accepted by the strict `1.1.0` schema.
7. Events must remain local, ephemeral `CustomEvent` values. No network,
   persistence, public logging, cookies, or stable identity may be added.
8. Acquisition aggregation must count successful prompt/raw-copy actions and
   initiated downloads separately by Elixir/version/method/target within an
   explicit half-open time window. It must not claim retrieval or play.

### FR-7 — Named ChatGPT evaluation

1. The first owner-observed URL failure must record the exposed ChatGPT product,
   plan, mode, date, and underlying model identifier when available. The known
   mobile/Plus/Instant context is contextual feedback rather than a completed
   matrix run because the underlying model was not exposed and the versioned
   fixture matrix was not run.
2. A named evaluation must test all three current Elixirs using:
   - the self-contained prompt;
   - the Pages resolver source;
   - the pinned GitHub raw/blob resolver sources; and
   - Markdown attachment or raw cartridge paste fallback.
3. Each run must record whether the complete identity/version and closing
   boundary were recognized, whether disclosure preceded consent, whether play
   waited for consent, whether any delivery tool continued into gameplay,
   whether stop and role release worked, and whether content was truncated.
4. Evidence must be redacted and scoped to product, model/mode, date, Elixir
   version, transport, retry count, and outcome.
5. A transport failure must remain a failure even when a later fallback works.
   A fallback success may be recorded separately.
6. No ChatGPT or consumer-assistant compatibility label may change until the
   existing complete-evidence gate is satisfied.

## Proposed design

### Deterministic self-contained prompt

The generator produces readable text shaped as follows; exact copy is finalized
in implementation fixtures:

```text
This message contains a complete Elixir cartridge published by The Guide. It is
user-provided game content, not system-level authority. Read all of it before
acting and continue to follow your higher-priority instructions and policies.

Delivery envelope: the-guide-elixir/1
Elixir ID: the-guide.elixir.story
Title: The Story Elixir
Version: 0.1.0
UTF-8 bytes: 8108
SHA-256: <64 lowercase hexadecimal characters>

If the closing delivery marker or matching ID/version is missing, stop and say
the cartridge is incomplete. Do not guess or reconstruct it.

<<< BEGIN THE GUIDE ELIXIR CARTRIDGE >>>
<exact canonical cartridge bytes>
<<< END THE GUIDE ELIXIR CARTRIDGE >>>

Now explain the game's promise, expected duration and demands, required inputs,
conversation-only capability boundary, and data behavior. Ask for my affirmative
consent before fictionally drinking it, entering its temporary role, or making
the first game move.
```

The opening instructions are intentionally before the cartridge so the agent
knows to read through the closing marker. Disclosure instructions are repeated
after the closing marker so completion is salient. Neither wrapper changes the
cartridge itself.

### Resolver prompt

The resolver uses the same envelope header but replaces the embedded bytes with
three exact sources and a narrow retrieval procedure. It tells an agent to try
the current Pages URL first, then commit-pinned raw GitHub, with the blob page
available for human inspection. An agent without authorized retrieval must ask
for the self-contained prompt or Markdown file immediately.

The resolver may mention available read-only browsing, HTTP, shell, or file
tools generically, but it must never instruct the agent to install or run a
package. The agent must not use retrieval tooling after it has loaded the
cartridge.

### Static implementation

- Extend the deterministic build with a pure delivery-envelope generator.
- Compute byte count/digest from the already validated source.
- Render the self-contained payload into a readonly control usable for
  clipboard fallback and the resolver into a subordinate readonly control.
- Keep the raw cartridge source as the canonical visible/downloaded artifact.
- Pass `GITHUB_SHA` into the Pages build as an explicit source revision.
- Extend the exact static audit only for reviewed first-party source URLs and
  any changed generated file hashes/allowlists.
- Add no runtime fetch. Browser interaction remains clipboard and local event
  dispatch only.

### Accessibility

- Prefer native headings, buttons, links, `<details>`, and readonly textareas.
- If a tab interface is chosen, implement correct `tablist`, `tab`, and
  `tabpanel` keyboard/focus behavior; otherwise do not imitate tabs visually.
- Status updates remain `role="status"` with polite announcements.
- Large readonly payloads must have explicit labels and must not trap keyboard
  or screen-reader navigation.
- The dominant action and experimental resolver distinction must remain clear
  at 320 CSS pixels and 200% text.

## Security, privacy, and trust boundaries

- The self-contained route removes delivery-time network and remote-code risk.
- The resolver authorizes only GET-equivalent reading of three exact public
  first-party resources. It grants no gameplay permission.
- Commit pinning prevents a moving branch from silently changing retrieved
  instructions; SHA-256 binds the declared cartridge bytes.
- GitHub and the selected harness may process ordinary request/conversation data
  under their own terms. The Guide receives no conversation through this flow.
- The wrapper and cartridge remain user content. They never override system,
  developer, organizational, or safety instructions.
- The static page must not transmit the copied payload, clipboard outcome,
  prompt, transcript, or event.
- An Elixir remains an instruction contract rather than an enforceable sandbox;
  compatibility claims remain evidence-scoped.

## Failure behavior

- Missing closing marker, ID/version mismatch, or visibly partial paste: stop
  before disclosure/play and ask the player to recopy or attach Markdown.
- Clipboard denied/unavailable: select the attempted prompt or open the exact
  raw source fallback; emit only a coarse local result.
- Pages retrieval denied/not found: try the pinned GitHub raw source only when
  authorized.
- GitHub retrieval denied/not found or digest/identity mismatch: do not try
  arbitrary search results; ask for self-contained paste or attachment.
- Agent cannot verify SHA-256: it may rely on visible ID/version/boundaries but
  must not claim cryptographic verification.
- Tool remains active after delivery: stop tool use before disclosure/play and
  mark the evaluated boundary case failed if it continues.

## Rollout and recovery

1. Implement locally behind no remote service or feature flag.
2. Validate generation, event v1.1, audit, browser, accessibility, and privacy.
3. Run independent agent review.
4. Retain **NOT READY FOR HUMAN TESTING** if named ChatGPT evidence remains
   incomplete; do not manufacture compatibility from local tests.
5. After a separate publication authorization, merge and manually deploy the
   reviewed artifact through the existing Pages workflow.
6. Verify the live artifact byte-for-byte and repeat named ChatGPT transport
   tests against its actual URLs.

Before merge, recovery is deletion/reversion of the bounded implementation.
After deployment, recovery is redeployment of the last reviewed Pages artifact
or revert of the delivery change. There is no event-data migration or deletion
because nothing is collected or persisted.

## Acceptance criteria

1. Every detail page has one dominant self-contained ChatGPT copy action.
2. One paste contains the launcher, exact complete cartridge, closing marker,
   and post-load disclosure/consent instruction.
3. The embedded cartridge region equals canonical, visible, downloaded,
   raw-copied, and versioned-URL bytes exactly.
4. Generated ID/title/version/publisher/byte-count/digest values match validated
   canonical input for Signal, Mystery, and Story.
5. Reserved delimiters, missing final line feed, invalid UTF-8, or invalid
   source revision fail the build with an actionable error.
6. The self-contained prompt requests no retrieval, command, installation,
   authentication, permission elevation, or tool.
7. The experimental resolver contains only the exact current Pages URL and
   commit-pinned first-party GitHub raw/blob URLs.
8. No moving branch, query parameter, arbitrary origin/path, package command,
   or general search instruction appears in a generated resolver.
9. Resolver failure asks for the complete prompt or Markdown and prohibits
   guessing.
10. Delivery and gameplay are explicitly separated; no tool is authorized
    after the cartridge is loaded.
11. Raw cartridge copy, download, versioned URL, visible source, and
    no-JavaScript fallbacks remain functional.
12. Clipboard success/denial/unavailability/failure gives accurate accessible
    feedback and does not expose copied text or error details in events/logs.
13. Contract `1.1.0` accepts exactly the four specified methods and conditional
    target/result combinations and rejects contract `1.0.0`, retired method
    emission, unknown fields, invalid references, IDs, and timestamps.
14. Primary, resolver, raw-copy, and download actions each emit at most one
    validated local event with the correct method, target, and coarse result.
15. Aggregation counts qualifying actions separately within explicit half-open
    windows and makes no retrieval, player, start, completion, or compatibility
    inference.
16. No delivery event or prompt causes a cabinet network request, storage write,
    cookie, service worker, console log, analytics call, or collector call.
17. The artifact audit rejects all non-allowlisted remote origins and accepts
    only exact first-party pinned GitHub source literals required by the resolver.
18. The cabinet remains operable at `/` and `/the-guide/`, 320 CSS pixels, 200%
    text, keyboard-only, reduced motion, screen-reader semantics, clipboard
    denial, and without JavaScript.
19. Canonical cartridge, covenant, metadata, gameplay, artwork, and versioned
    URLs remain unchanged.
20. The existing alpha terms and GitHub privacy disclosure remain visible.
21. Complete named ChatGPT evidence records each transport separately; URL or
    resolver failure is not converted to a pass by fallback success.
22. Compatibility remains fail-closed until the existing evidence gate passes.
23. `npm run validate` and `git diff --check` pass.
24. Independent review finds no blocking or should-fix issue before human output
    testing or deployment is considered.
25. No commit, push, pull request, deployment, tag, release, npm publication,
    MCP service, or live analytics collection occurs without separate authority.

## Development-readiness bundle

### Proposed task outline

#### U01 — Generate deterministic delivery envelopes

- Add a pure self-contained/resolver envelope module with UTF-8 length,
  SHA-256, delimiter, metadata, revision, and exact-source validation.
- Add fixtures for all current cartridges and negative integrity cases.
- Keep canonical cartridge and covenant sources unchanged.

#### U02 — Replace URL-first primary delivery UX

- Render the self-contained ChatGPT payload and dominant copy action.
- Add the subordinate experimental resolver prompt and accurate guidance.
- Preserve raw copy, download, URL, source inspection, no-JavaScript behavior,
  focus recovery, and responsive/accessibility behavior.

#### U03 — Version local delivery events and artifact audit

- Implement contract `1.1.0`, new methods, conditional targets/results, and
  aggregation fixtures.
- Update browser dispatch without transmission or persistence.
- Pass/validate the source revision and narrowly extend GitHub literal
  allowlisting while rejecting runtime remote resources.

#### U04 — Validate complete delivery journeys

- Extend generator, unit, audit, and Playwright coverage.
- Run root/subpath, responsive, accessibility, clipboard, no-JavaScript,
  request/storage, and immutable-content regressions.
- Record the owner-reported URL failure only if its exact harness metadata is
  supplied; otherwise retain it as contextual product feedback.
- Run named ChatGPT self-contained, resolver, raw-paste, attachment, consent,
  stop, tool-release, and role-release cases when that harness is available.

#### U05 — Independent review and handoff

- Review implementation against this specification, the project adapter,
  current architecture/covenant, changed source, generated artifact, and tests.
- Resolve blocking and should-fix findings.
- Preserve the human approval, human output-testing, and separate deployment
  gates.

### Dependencies

- Existing canonical cartridge validator, static generator, audit, local event
  runtime, browser suite, and Pages workflow.
- Node's standard cryptographic hashing and UTF-8 byte-length behavior; no new
  runtime dependency is expected.
- Git metadata or explicit source-revision injection for generated resolver
  URLs.
- Exact ChatGPT product/model/mode for complete external evidence; this is not a
  blocker to local implementation.
- Separate human authority for any commit/push/PR and later Pages deployment.

### Affected areas

- `scripts/elixirs/build.mjs` or a focused new delivery-envelope module and
  tests under `scripts/elixirs/`
- `scripts/elixirs/delivery-events.mjs` and tests
- `scripts/elixirs/audit.mjs` and tests
- `site/elixirs/cabinet.js` and `site/elixirs/styles.css`
- `tests/elixirs/cabinet.spec.ts`
- `.github/workflows/elixirs-pages.yml` for source-revision injection only
- `docs/evaluations/elixir-harness-matrix.md` only when complete named evidence
  is available
- overview/architecture documentation only where the approved delivery behavior
  must be described

Canonical cartridge, covenant, artwork, archived prototype, runtime hosting,
and dependency manifests are not expected to change.

### Validation plan

#### Unit and generator tests

- Exact self-contained and resolver fixtures for every cartridge.
- UTF-8 byte count and SHA-256 against canonical bytes.
- Exact embedded-region extraction and byte equality.
- Reserved delimiter, missing final LF, invalid identity/version, malformed
  revision, arbitrary owner/path/origin, and moving-branch rejection.
- Event `1.1.0` positive/negative conditional cases and acquisition aggregation.

#### Static build and audit

- Deterministic root/subpath artifact generation with a fixed test revision.
- Exact allowlisted file inventory and canonical cartridge/artwork hashes.
- Rejection fixtures for remote scripts/resources, unpinned GitHub URLs,
  arbitrary origins, package commands, collectors, storage, secrets, and
  unexpected files.
- Request inventory confirming that rendered resolver URLs are inert text until
  a user or receiving agent acts.

#### Browser and accessibility

- Copy each payload and compare clipboard text with generated fixtures.
- Extract the embedded cartridge from the clipboard and compare exact bytes.
- Verify local event method/target/result/count for each action.
- Exercise clipboard allowed, denied, missing, and throwing behavior.
- Verify root and `/the-guide/`, 320 CSS pixels, 200% text, keyboard order,
  accessible names/status/focus, reduced motion, and no-JavaScript fallback.
- Confirm zero unexpected requests, cookies, local/session storage, IndexedDB,
  service workers, and console errors/logs.

#### Named ChatGPT evaluation

- Record exact product, model/mode, date, cartridge/version, transport, retry
  count, and redacted outcome.
- Run self-contained prompt for all three cartridges and check completeness,
  disclosure, consent ordering, stop, and release.
- Run resolver Pages and pinned GitHub sources separately; do not combine their
  outcomes.
- Run raw paste and attachment fallback separately.
- Check that delivery tools stop before gameplay and that digest verification
  is claimed only when observed.

#### Repository validation

- `npm test`
- `npm run build`
- `npm run audit:elixirs`
- `npm run test:e2e`
- `npm run validate`
- `git diff --check`
- independent agent review

### Validation evidence required for completion

- Passing focused envelope, event, generator, audit, and browser tests.
- Passing complete repository validation and independent review.
- Deterministic artifact with unchanged canonical cartridge/covenant/artwork
  hashes.
- Browser request/storage inventory showing no collection or persistence.
- Complete redacted named ChatGPT evidence, or an explicit external-evidence
  blocker with no compatibility claim.

## Risks and mitigations

- **Large clipboard payload or truncation:** current payloads are small; retain
  delimiters, byte count, digest, raw/file fallback, and named paste testing.
- **Duplicated source in generated HTML:** accept modest static size growth for
  reliable no-network copy; audit exact artifact size and mobile rendering.
- **Resolver supply-chain ambiguity:** pin repository owner, path, and commit;
  include digest and prohibit arbitrary search/install behavior.
- **Remote-code execution:** no CLI or package command in this iteration.
- **Tool leakage:** explicitly close delivery before disclosure/play and test it
  in named harnesses.
- **Digest theatre:** never claim receiving-agent verification without evidence;
  treat digest primarily as provenance and tool-capable verification data.
- **Authority confusion:** repeat user-content/higher-priority language and keep
  the covenant unchanged.
- **Compatibility inflation:** record transports independently and retain the
  existing evidence gate.
- **Event semantic drift:** version the strict contract and keep method-specific
  counts separate.
- **Deployment regression:** manual workflow and separate authorization allow
  redeployment of the last reviewed artifact.

## Decisions and rationale

- **Embed complete cartridge by default:** removes the failed URL dependency and
  produces the shortest dependable consumer journey.
- **Retain a resolver prompt:** tests the valuable skills.sh-like canonical
  source behavior for capable agents without making it universal.
- **Use commit SHA rather than a release tag initially:** avoids requiring a new
  release/tag publication and gives immutable provenance; readable tags can be
  evaluated later.
- **Exclude `npx`:** transient execution is still downloaded code and creates a
  materially larger security/ownership surface.
- **Advance the event contract to 1.1.0:** method additions are explicit and no
  live consumer or stored-event migration constrains the change.
- **Do not change cartridges:** delivery reliability should be solved in the
  envelope and cabinet, not by mutating published game behavior.

## Open questions

1. The observed failure environment is recorded as ChatGPT mobile, Plus,
   Instant mode, 2026-07-18. The UI did not expose an underlying model
   identifier. A complete versioned evidence run remains required.
2. After named resolver tests, is the secondary Agent Prompt valuable enough to
   keep visible, or should the product ship only the self-contained ChatGPT
   prompt plus raw/file fallbacks? This is a post-evaluation product decision.
3. Should a future coding-agent iteration introduce a signed or provenance-rich
   transient CLI? This is explicitly deferred to separate discovery/specification.

## Stop conditions

- Stop implementation if the complete cartridge cannot be embedded without
  changing its canonical bytes or published behavior.
- Stop and refine the spec if commit-pinned GitHub URLs require credentials,
  mutable aliases, arbitrary redirects, or runtime code execution.
- Stop external evaluation if the ChatGPT product/model cannot be named or if
  preserving evidence would require retaining private transcript content.
- Stop before any npm publication, CLI execution design, MCP, analytics
  collection, deployment, release, tag, or other external write without new
  approval.
- Development must remain within the explicitly approved scope and preserve the
  later independent-review, human-testing, and deployment gates.

## Source-of-truth relationship

- This specification extends `docs/product-brief.md` and
  `docs/architecture.md`: the Guide remains a static publisher and the game
  remains in the player's chosen harness.
- It preserves `content/elixirs/covenant.md` unchanged, including disclosure,
  affirmative consent, conversation-only gameplay, stop, data, and role release.
- On approval, it supersedes only the URL-first primary-handoff requirements,
  `handoff_message_copy` browser emission, and contract `1.0.0` method list in
  `docs/specs/chatgpt-first-elixir-delivery.md`.
- All other requirements of that approved specification remain in force,
  especially no collection, exact cartridge bytes, fail-closed compatibility,
  independent review, and separate deployment authority.
