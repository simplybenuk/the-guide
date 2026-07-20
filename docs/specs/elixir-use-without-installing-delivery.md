# The Guide — File-first Elixir Delivery and Optional Agent Skill

## Status

**READY FOR HUMAN TESTING**

Refined on 2026-07-19 from owner feedback after testing story delivery. This
revision replaces the implemented multi-option delivery design with a simpler
attachment-first model. The repository owner approved this revision for bounded
local development on 2026-07-19.

This specification supersedes the delivery-method and delivery-page requirements
in the previous revision of this file and the URL-first handoff requirements in
`docs/specs/chatgpt-first-elixir-delivery.md`. The static architecture, canonical
cartridge bytes, consent covenant, privacy boundary, fail-closed compatibility
claims, independent review, and separate deployment authority remain unchanged.

Approval would authorize bounded local development and validation only. It would
not authorize a commit, push, pull request, deployment, release, tag, npm
publication, live analytics, marketplace publication, or compatibility claim.

## Problem

The current cartridge page presents several delivery choices: a self-contained
prompt, an agent resolver prompt, raw cartridge copy, Markdown download, visible
source, and immutable URLs. Although each option has a rationale, together they
make the player decide between technical transports before they can play.

The tested and preferred pattern is simpler: the story is a portable Markdown
cartridge with a recognizable filename. The player downloads it, attaches it to
their chosen agent, and supplies one short instruction. A reusable Agent Skill
can remove even that repeated instruction for players whose agent supports
skills, but the skill must remain generic and separate from every story.

## Desired outcome

For a player without the skill:

> I download one clearly named story file, attach it to a new conversation, copy
> one short prompt, and the agent explains what will happen before asking whether
> I want to begin.

For a player with a compatible Agent Skills host:

> I install `agent-elixir` once. For any story, I invoke `/agent-elixir` and attach
> the downloaded cartridge file. The skill safely loads that cartridge and takes
> me to the same disclosure and consent point.

For the maintainer:

> Every story remains one canonical, versioned Markdown artifact. The launcher
> prompt and reusable skill contain only generic intake behavior and never embed,
> duplicate, retrieve, or silently update story content.

## Actors

- **Player:** chooses a story, downloads its cartridge, and brings it to an agent.
- **Player's agent:** receives the attached Markdown and either the short prompt
  or the installed `agent-elixir` skill invocation.
- **Publisher:** produces the static cabinet, exact cartridge files, short
  launcher prompt, and optional generic skill package.
- **Evaluator:** tests named hosts and records evidence without turning an
  attachment or skill invocation into a broad compatibility claim.

## Goals

- Make the downloadable Markdown cartridge the single primary delivery artifact.
- Give every download a deterministic, human-readable, versioned filename.
- Reduce the normal play journey to download, attach, and send one short prompt.
- Offer one reusable `agent-elixir` skill as a clearly secondary alternative to
  copying the prompt.
- Keep stories out of the skill and keep agent-specific setup out of cartridges.
- Preserve disclosure, affirmative consent, conversation-only play, stop, data,
  and role-release behavior.
- Preserve a static, private, no-account cabinet with no runtime retrieval.

## Non-goals

- Bundling any Elixir cartridge inside the skill package.
- Creating one skill per story or installing a story as persistent capability.
- Keeping the self-contained full-cartridge prompt or URL resolver as player
  choices on the cartridge page.
- Asking an agent to browse, fetch a URL, clone a repository, run a package, or
  reconstruct missing cartridge content.
- Automatically opening an agent, attaching a file, submitting a prompt, or
  detecting installed skills.
- Claiming that `/agent-elixir` works in ChatGPT or every assistant product.
- Changing canonical cartridge content, artwork, gameplay, or current versions.
- Collecting prompts, transcripts, identities, downloads, or gameplay events.
- Publishing the skill or deploying the site without separate authorization.

## Confirmed decisions

1. The cartridge attachment is the authority and primary transport.
2. The page exposes one primary **Download story** action and one short prompt to
   copy; it does not expose several equivalent technical delivery routes.
3. The filename is generated as `<title-slug>-<version>.md`, for example
   `the-regency-ball-0.1.0.md`.
4. A player uses exactly one launcher method per conversation:
   - attach the cartridge and send the copied prompt; or
   - attach the cartridge and invoke an installed `/agent-elixir` skill.
5. `agent-elixir` is one generic, reusable skill. It contains no story files and
   accepts the attached cartridge at use time.
6. The skill is optional and visually subordinate to the default file-and-prompt
   path. Its installation is explained separately from normal play.
7. Raw source and immutable URLs may remain available for transparency or
   no-JavaScript access, but not as competing play methods.
8. Events remain local and ephemeral. No analytics or persistence is introduced.

## Assumptions

- Supported agents allow a user to attach a Markdown file to a conversation.
- Compatible Agent Skills hosts can install a portable skill package and expose
  it to the user as `/agent-elixir`; compatibility must be proven per named host.
- Browser `download` filenames can be set independently from canonical source
  paths without changing cartridge bytes or immutable URLs.
- Current cartridges are UTF-8 Markdown with validated metadata and a final line
  feed.
- The no-skill prompt can remain short because all story-specific instructions
  and safety behavior are already in the attached cartridge.

## Terminology

- **Cartridge:** the canonical versioned Markdown story supplied by the player.
- **Title slug:** a lowercase ASCII filename-safe form of the validated title,
  with runs of non-alphanumeric characters replaced by one hyphen.
- **Launcher prompt:** the short generic instruction copied by a player who does
  not use the optional skill.
- **Agent skill:** the reusable `agent-elixir` instruction package installed in a
  compatible host; it is not a cartridge and contains no story content.
- **Delivery complete:** the agent has read one complete attached cartridge and
  can identify its title, ID, and version before disclosure or play.

## Functional requirements

### FR-1 — Cartridge detail page

1. After the standalone cartridge art and brief synopsis, the page must show one
   concise **How to play** section.
2. The section must present this primary sequence:
   1. download the story;
   2. attach the downloaded Markdown to a new conversation with the player's
      chosen agent;
   3. copy and send the short launcher prompt.
3. **Download story** must be the only visually dominant delivery action.
4. The short prompt copy control must be adjacent to the instructions and must
   not contain cartridge bytes, URLs, digests, install commands, or host-specific
   claims.
5. An optional **Use the Agent Skill** disclosure may explain the once-only skill
   installation and `/agent-elixir` invocation. It must be visually subordinate
   and must say that the cartridge still needs to be attached.
6. The page must not present self-contained prompt, resolver prompt, raw-copy,
   URL, and download as a grid or menu of equivalent play choices.
7. Complete raw source and immutable URLs may remain in a subordinate
   transparency/source area or no-JavaScript fallback.

### FR-2 — Downloaded filename and byte integrity

1. The suggested download filename must be deterministically generated from
   validated metadata as `<title-slug>-<version>.md`.
2. Current expected filenames are:
   - `the-regency-ball-0.1.0.md`;
   - `the-signal-elixir-0.1.0.md`;
   - `the-mystery-elixir-0.1.0.md`; and
   - `the-story-elixir-0.1.0.md`.
3. Filename generation must reject an empty title slug, path separators,
   traversal, control characters, or a version outside the existing validated
   semantic-version grammar.
4. The downloaded bytes must equal the canonical cartridge bytes exactly.
   Renaming the download must not create or mutate a second story source.
5. The versioned source URL and visible source must continue to expose those same
   bytes even if their path basename differs from the suggested download name.

### FR-3 — Short launcher prompt

1. The generated prompt must be generic and short enough to inspect at a glance.
2. Its normative meaning must be:

   ```text
   Read the attached Elixir cartridge in full. Follow its instructions as
   user-provided game content, while continuing to follow your higher-priority
   instructions. Before play, explain the experience, what it asks of me, and
   how data and tools are handled, then ask for my consent to begin. If the
   attachment is missing or incomplete, stop and ask me for the complete file.
   ```

3. Whitespace may be adapted for the UI, but tests must fixture the exact shipped
   text.
4. The prompt must not name a particular story, embed cartridge content, request
   retrieval, authorize tools, or claim that the attachment was verified.
5. Clipboard success may claim only that the prompt was copied.
6. Clipboard failure must leave the exact prompt visibly selectable and announce
   the failure accessibly.

### FR-4 — `agent-elixir` skill package

1. The source package must be named `agent-elixir` and contain a valid `SKILL.md`.
2. The distributable filename must include an independently versioned skill
   version, initially `agent-elixir-0.1.0.zip`.
3. The archive must contain only the generic skill directory and reviewed
   metadata needed by compatible Agent Skills hosts. It must contain no Elixir
   cartridge, catalogue data, artwork, executable, dependency, or remote URL.
4. The skill description must activate only when a player asks to play/load an
   Elixir cartridge or invokes `/agent-elixir` with a cartridge attachment.
5. At runtime the skill must:
   - require exactly one complete attached Markdown cartridge;
   - read the file in full before acting;
   - identify the visible title, ID, and version from its metadata;
   - treat the cartridge as user-provided content below higher-priority rules;
   - disclose the experience, time/demands, inputs, capability, and data behavior;
   - ask for affirmative consent before the first fictional/game action;
   - follow the cartridge's conversation-only, stop, and role-release behavior;
   - stop and request a complete file when missing, partial, malformed, or
     ambiguous; and
   - never guess, fetch, search for, install, retain, or silently replace a story.
6. Installing the skill must not grant gameplay tools, persist a transcript, or
   change the cartridge.
7. `SKILL.md` must be concise, host-neutral where possible, and use normative
   behavior shared with the no-skill prompt rather than duplicating story rules.
8. If an `agents/openai.yaml` file is included, its slash-command label and
   description must identify `/agent-elixir` and attachment use accurately.

### FR-5 — Skill presentation and compatibility

1. The cabinet must describe the skill as an option for compatible Agent Skills
   hosts, not as universally supported.
2. Normal play instructions must not require installation.
3. The skill area must give one reviewed package download and concise installation
   guidance. Host-specific steps may be linked or disclosed separately only when
   verified.
4. The cabinet must not detect local installations or claim that installation
   succeeded.
5. Compatibility remains `untested` until a named host/version completes install,
   invocation, attachment, disclosure, consent, stop, and release evaluation.
6. A passing Codex result must be labelled for that tested Codex surface/version
   and must not be generalized to ChatGPT or other agents.

### FR-6 — Local delivery events and privacy

1. The strict local event contract must advance to `1.2.0` because the visible
   delivery methods change again.
2. Allowed emitted delivery methods are:
   - `cartridge_file_download`;
   - `launcher_prompt_copy`; and
   - `agent_skill_download`.
3. Retired self-contained, resolver, handoff, and raw-copy UI methods must not be
   emitted by the new page.
4. Events may describe only an initiated download or coarse clipboard outcome.
   They must not imply attachment, installation, receipt, reading, consent, play,
   or compatibility.
5. Events remain ephemeral in-page `CustomEvent` values with no network,
   persistence, logging, cookie, stable identity, or transcript content.

### FR-7 — Failure and no-JavaScript behavior

1. Without JavaScript, the story file must remain downloadable and the launcher
   prompt must remain visible and selectable.
2. If the browser ignores the suggested filename, instructions must still make
   clear which selected story/version the downloaded Markdown represents.
3. If there is no attachment, more than one candidate cartridge, invalid
   metadata, or visibly incomplete content, both launcher methods must fail
   closed before play.
4. Skill download or installation failure must direct the player to the normal
   file-and-prompt path; it must not block play.
5. The page must remain keyboard operable, screen-reader understandable, usable
   at 320 CSS pixels and 200% text, and accurate under clipboard denial.

## Proposed design

The default **How to play** block is deliberately linear:

```text
How to play

1. Download the story.                         [Download story]
2. Attach the Markdown file to a new chat.
3. Send this prompt.                            [Copy prompt]

Read the attached Elixir cartridge in full…

Already use Agent Skills? Use agent-elixir instead ▸
```

Opening the optional disclosure explains that the player installs one generic
skill once, then starts any story by attaching its Markdown and invoking
`/agent-elixir`. It does not add another story-specific download or launch
button. Source inspection, legal/privacy information, and technical provenance
remain lower on the page and are not framed as steps needed to play.

The build derives the filename from validated cartridge metadata and emits a
byte-identical named download artifact as the primary link target. Canonical and
legacy `elixir.md` paths remain immutable source/transparency URLs. The reusable
skill is maintained as source in the repository and deterministically archived
as a separately audited static artifact.

## Security, privacy, and trust boundaries

- The player explicitly transfers the selected Markdown to their chosen agent.
- The Guide receives no attachment, prompt, transcript, identity, or play data.
- Neither launcher grants authority above user-provided content.
- The skill performs no network retrieval and includes no executable code.
- The skill package and cartridge are independently versioned and audited.
- Cartridge content remains subject to the chosen host's higher-priority rules.
- Agent behavior is not a sandbox guarantee; compatibility claims remain
  evidence-scoped.

## Acceptance criteria

1. Every story detail page presents one dominant **Download story** action, a
   three-step attachment journey, and one short prompt copy control.
2. The page no longer presents full-prompt, resolver, raw-copy, and URL choices
   as alternative ways to play.
3. Suggested filenames match the four exact expected names in FR-2.
4. Each download is byte-identical to its canonical cartridge.
5. Unsafe or empty generated filenames fail the build.
6. The shipped prompt matches its fixture and contains no cartridge bytes, URL,
   digest, install instruction, tool authorization, or story-specific value.
7. Clipboard allowed, denied, unavailable, and throwing behavior is accurate and
   accessible.
8. The optional skill area is subordinate, states that attachment is still
   required, and makes no universal compatibility claim.
9. `agent-elixir-0.1.0.zip` is deterministic, contains valid skill metadata, and
   contains no story, art, executable, dependency, or remote URL.
10. `/agent-elixir` with one valid attached cartridge reaches accurate disclosure
    and an affirmative consent question before play in each named passing host.
11. Missing, multiple, malformed, and truncated attachment cases stop before
    disclosure/play and request one complete cartridge.
12. Stop and role release work after both the prompt and skill launch paths.
13. Contract `1.2.0` accepts only the three new method/result combinations and
    rejects retired emissions, unknown fields, and invalid references.
14. No action creates an unexpected request, storage entry, cookie, service
    worker, console payload, analytics call, or collector call.
15. Source/transparency access and no-JavaScript download/prompt fallback remain
    available without competing with the play journey.
16. Canonical cartridges, covenant, artwork, and versioned source URLs are
    unchanged.
17. Root and `/the-guide/`, mobile, 200% text, keyboard, reduced-motion, and
    assistive-technology checks pass.
18. `npm run validate` and `git diff --check` pass.
19. Independent review finds no blocking or should-fix issue before human output
    testing or deployment is considered.
20. No publication, commit, push, deployment, release, analytics, or compatibility
    claim occurs without its separate authority and evidence gate.

## Development-readiness bundle

### Proposed task outline

#### U01 — Generate file-first delivery artifacts

- Add deterministic title-slug filename generation and negative validation.
- Replace the full and resolver prompt generators with one exact short prompt.
- Preserve canonical cartridge bytes and source URLs.

#### U02 — Simplify the cartridge page

- Implement the three-step **How to play** block and dominant download.
- Add the short copy action and subordinate skill disclosure.
- Move raw source and provenance out of the primary play journey while
  preserving transparency and no-JavaScript access.

#### U03 — Build the reusable skill

- Create the generic `agent-elixir/SKILL.md` and minimal reviewed metadata.
- Generate and audit `agent-elixir-0.1.0.zip` deterministically.
- Add valid, missing, multiple, malformed, and truncated attachment fixtures.

#### U04 — Version events and audit the artifact

- Implement local contract `1.2.0` and remove retired UI emissions.
- Audit the skill archive inventory, digest, absence of story content, and lack
  of remote/runtime dependencies.

#### U05 — Validate and independently review

- Run unit, build, audit, browser, accessibility, privacy, and repository tests.
- Evaluate both launcher methods in named available hosts without inflating
  compatibility.
- Complete independent agent review before human output testing.

### Dependencies

- Existing static generator, canonical cartridge validator, local event runtime,
  audit, browser suite, and Pages workflow.
- Standard deterministic ZIP tooling already available to the build or a
  reviewed development-only implementation; no browser runtime dependency.
- A named compatible Agent Skills host for external skill evaluation. Its
  absence does not block local implementation but does block compatibility
  claims.
- Separate owner approval for development and later external publication.

### Affected areas

- `scripts/elixirs/build.mjs` and focused generator tests
- `scripts/elixirs/delivery-events.mjs` and tests
- `scripts/elixirs/audit.mjs` and tests
- `site/elixirs/cabinet.js` and `site/elixirs/styles.css`
- a new reviewed `agent-elixir` skill source directory
- `tests/elixirs/cabinet.spec.ts`
- architecture/evaluation documentation where delivery behavior changes

Canonical cartridge content, covenant, artwork, dependency manifests, and
hosting architecture are not expected to change.

### Validation plan

- Unit-test title slugging, unsafe filename rejection, exact prompt text, event
  contract `1.2.0`, skill metadata, and archive inventory.
- Build twice from the same inputs and compare the story files, skill archive,
  and audited manifest for deterministic output.
- Compare each downloaded artifact byte-for-byte with its canonical cartridge.
- Browser-test copy and download behavior, root/subpath, no JavaScript, clipboard
  failure, focus/status, mobile, 200% text, keyboard, and reduced motion.
- Confirm zero unexpected requests, storage, cookies, service workers, logs, or
  event transmission.
- In named skill hosts, test install, `/agent-elixir`, valid attachment,
  disclosure, consent, play, stop, role release, and all fail-closed attachment
  cases.
- Run `npm test`, `npm run build`, `npm run audit:elixirs`,
  `npm run test:e2e`, `npm run validate`, and `git diff --check`.
- Complete independent review against this approved specification before human
  output testing.

## Risks and mitigations

- **Attachment support varies:** label only tested hosts and keep the visible
  prompt/file path generic.
- **Skill portability varies:** maintain one minimal host-neutral skill and avoid
  universal claims.
- **Skill and cartridge authority blur:** keep them independently versioned and
  state that the attached cartridge supplies story content.
- **Stale installed skill:** give the skill its own visible version and keep its
  behavior generic so story releases do not require skill updates.
- **Filename collisions:** include semantic version and fail generation on
  duplicate output names.
- **ZIP nondeterminism:** normalize archive ordering, paths, timestamps, modes,
  and compression settings, then fixture its digest.
- **Technical transparency becomes hidden:** preserve a subordinate source area
  and no-JavaScript access without turning it into a play-choice menu.
- **Compatibility inflation:** record named host/version evidence for each launch
  method and retain fail-closed labels.

## Decisions and rationale

- **Use the file as the product:** it is inspectable, portable, versioned, and
  worked in the tested delivery pattern without remote retrieval.
- **Keep the prompt short:** story instructions already belong in the cartridge;
  duplicating them in a wrapper creates more surface and more choices.
- **Offer one reusable skill:** frequent players can replace repeated prompt
  copying without installing stories or coupling releases to a host.
- **Require attachment with the skill:** `/agent-elixir` selects generic handling;
  the attached file selects the exact story and version.
- **Remove resolver and full-prompt choices:** they solve transport edge cases at
  the cost of a confusing primary journey.
- **Version filenames and the skill independently:** a saved file remains
  identifiable while the generic launcher can evolve on its own cadence.

## Open questions

None blocking. Exact host-specific installation instructions and compatibility
labels must be derived from named evaluation during development; until then the
cabinet uses only generic, fail-closed language.

## Stop conditions

- Stop and refine if a compatible host cannot invoke `/agent-elixir` with an
  attached Markdown file without bundling or copying story content into the
  skill.
- Stop if a suggested filename cannot be produced without changing canonical
  bytes or weakening path validation.
- Stop before claiming host compatibility without the complete named evidence.
- Stop before introducing runtime retrieval, executable code, package
  installation, persistence, analytics, or a story-specific skill.
- Stop before any commit, push, deployment, release, marketplace publication, or
  other external write without separate authorization.

## Source-of-truth relationship

- This specification extends `docs/product-brief.md` and
  `docs/architecture.md`; The Guide remains a static publisher and gameplay
  remains in the player's chosen harness.
- It preserves `content/elixirs/covenant.md` unchanged, including disclosure,
  affirmative consent, conversation-only play, stop, data, and role release.
- On human approval, it supersedes the previous multi-option requirements in
  this file and the URL-first primary handoff in
  `docs/specs/chatgpt-first-elixir-delivery.md`.
- It does not supersede the approved minimalist catalogue/detail-page visual
  direction in `docs/specs/elixir-hosting-and-catalogue.md`.
- If another document still describes the self-contained full prompt or resolver
  as the primary journey, this specification governs delivery once approved.
