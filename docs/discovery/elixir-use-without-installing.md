# Elixir “use without installing” delivery — discovery brief

## Idea and desired outcome

Borrow the useful delivery mechanics from skills.sh without representing an
Elixir as an installed skill. A player should be able to choose an Elixir,
copy one purpose-built payload into ChatGPT or another agent, and let the agent
obtain and read the complete immutable cartridge before disclosure and consent.

The desired player outcome is:

> I press one obvious **Use this Elixir** action, paste once into my agent, and
> either reach the Elixir disclosure or receive one immediate, usable fallback.

The desired product outcome is a delivery resolver pattern that works for both
consumer chats and tool-capable agents while retaining one canonical cartridge,
visible source, no permanent installation, and no gameplay tools.

## Trigger and observed evidence

- The first live ChatGPT URL handoff reached the public Pages URL from the
  cabinet, but ChatGPT reported that it could not retrieve the cartridge and
  correctly asked the player to attach or paste it instead of guessing. The
  run used ChatGPT mobile on a Plus account in Instant mode; its underlying
  model identifier was not exposed. This is one failed URL delivery observation
  rather than a general compatibility result.
- In the owner-provided skills.sh example, a copied prompt instructed ChatGPT to
  run `npx skills use` and read its complete generated output. The command failed
  because that environment could not resolve GitHub, but ChatGPT then found and
  read the named skill directly from its canonical GitHub repository.
- skills.sh now documents `skills use` as a use-without-installing path. The CLI
  resolves the selected source into a temporary directory and prints a generated
  prompt, or starts a supported coding agent with that prompt. This is distinct
  from `skills add`, which installs files into an agent-specific location:
  <https://github.com/vercel-labs/skills#use-a-skill-without-installing>.
- The skills.sh detail page presents the artifact summary, source repository,
  audits, install/use command, and a copyable prompt together:
  <https://www.skills.sh/mattpocock/skills/grill-me>.
- skills.sh warns that catalogued skills still require user judgment despite
  routine audits. That trust warning is relevant to any copied instructions or
  command that causes an agent to retrieve content:
  <https://www.skills.sh/docs>.

## Actors

- **ChatGPT player:** wants a one-paste journey and may have no shell, browsing,
  connector, or reliable URL retrieval.
- **Tool-capable agent player:** may use a coding agent that can run a bounded
  command or retrieve a pinned public GitHub source.
- **Player's agent:** performs delivery only until the complete cartridge is
  loaded, then discloses and asks for consent without further tools.
- **Publisher:** provides immutable cartridge versions, integrity metadata,
  transparent source, and fallbacks without receiving the conversation.

## Known facts

- The three current complete cartridges are approximately 8 KB each, small
  enough for a copied self-contained text payload in the evaluated cabinet.
- Each cartridge already embeds the complete covenant; there are no supporting
  files needed for gameplay.
- The public Pages artifact exposes immutable-looking slug/version paths, while
  the public GitHub repository exposes source files and commit-addressable URLs.
- The current primary **Copy for ChatGPT** payload contains a Pages URL rather
  than the cartridge bytes. **Copy complete cartridge** and Markdown download
  exist as secondary fallbacks.
- Delivery may use a public fetch or a bounded tool before loading. Once loaded,
  the covenant prohibits browsing, shell, file access, and other tools during
  gameplay.
- No live analytics collection, MCP service, account, transcript receiver, or
  agent installation exists.

## Assumptions

- Consumer ChatGPT is still the first target, so a shell command cannot be the
  only or primary delivery transport.
- GitHub may be more discoverable to some agent browsing/search systems than a
  newly published Pages Markdown URL, but this must be tested rather than
  treated as universal behavior.
- A transient `npx` command still downloads and executes code. It avoids a
  persistent skill installation but is not a zero-trust or zero-installation
  experience from the player's perspective.
- Copying the complete cartridge is more dependable than asking an agent to
  fetch it, provided paste size and message handling are validated in the named
  ChatGPT environment.

## Product principles

- Call the action **use**, **open**, or **copy**, never **install**.
- Deliver ordinary user-provided content, not a skill, plugin, system prompt,
  permission grant, or persistent agent capability.
- Pin an exact Elixir ID, semantic version, and integrity digest in every
  resolver output.
- Keep delivery-tool permission visibly separate from consent to play.
- Stop all retrieval tools before disclosure and gameplay.
- Fail closed: if the complete cartridge cannot be obtained or verified, ask
  for the exact paste/file fallback and do not improvise its contents.
- Keep visible source and downloadable Markdown regardless of the convenient
  route.

## Materially different options

### Option A — Self-contained ChatGPT prompt

Make the primary ChatGPT action copy a small launcher envelope followed by the
complete cartridge bytes. The envelope tells ChatGPT to read the enclosed
cartridge fully, identify its title/version, explain its boundaries, and ask for
affirmative consent. No retrieval, command, install, or second visit is needed.

This is the most reliable consumer-chat baseline. Its costs are a larger
clipboard payload, a visually less inspectable chat message, and the need to
test paste limits and accidental truncation.

### Option B — Resolver prompt with pinned GitHub fallback

Copy a compact prompt that gives the agent an ordered retrieval contract:

1. retrieve the exact version from its canonical Pages URL;
2. if unavailable, retrieve a commit- or release-pinned GitHub source;
3. verify the declared ID, version, and digest; and
4. if neither route succeeds, request the complete paste or file.

This most closely copies the successful aspect of the skills.sh example: the
agent receives both a task and a recognisable canonical source, and can choose
an available retrieval mechanism. It remains dependent on browsing/search and
therefore cannot replace the self-contained path.

### Option C — Transient Elixir CLI for tool-capable agents

Provide an optional command conceptually shaped like:

```text
npx @the-guide/elixirs use story@0.1.0
```

The command would retrieve only an allowlisted public cartridge, verify its
digest, write at most to an operating-system temporary directory, and print a
complete generated handoff to standard output. It would not install an agent
skill, edit agent configuration, persist game state, or start gameplay.

This could give coding agents a strong, repeatable route and make supporting
files possible later. It also introduces an npm package, remote-code execution,
supply-chain ownership, versioning, publishing, telemetry, and platform support.
It is disproportionate until the simpler prompt experiment shows a real need.

### Option D — Installable skill or native agent package

Package Elixirs as skills, custom assistants, connectors, or plugins. This may
improve repeat use but changes the trust model toward persistent capability and
platform-specific installation. It is explicitly rejected for this delivery
slice.

## Tentative direction

Adopt the skills.sh **presentation and resolver** idea, not its installation
model:

1. Make **ChatGPT Prompt** the default tab/action and copy the complete
   self-contained cartridge inside a short launcher envelope (Option A).
2. Offer an experimental **Agent Prompt** that names ordered Pages and pinned
   GitHub retrieval routes with exact failure behavior (Option B).
3. Keep **Download Markdown**, canonical URL, and visible source as fallbacks.
4. Test both prompts in the same named ChatGPT model that produced the URL
   failure before considering a transient CLI (Option C).

The key hypothesis is that skill.sh succeeds because it copies a complete
*retrieval procedure* with a canonical source, not because the content is
installed. For consumer ChatGPT, embedding the complete cartridge removes even
that retrieval dependency and should remain the default.

## Initial resolver contract

Any later specification should define one generated delivery envelope with:

- Elixir ID, title, semantic version, publisher, and integrity digest;
- one complete embedded cartridge **or** an ordered set of exact retrieval
  sources;
- a requirement to read the complete bytes and verify identity/version before
  acting;
- a prohibition on guessing, partial execution, or treating the content as
  higher-priority authority;
- disclosure fields and affirmative-consent behavior;
- an explicit delivery-complete transition after which tools are prohibited;
  and
- a single attach/paste recovery instruction.

For the embedded form, clear start/end delimiters and a digest should make
truncation observable. The agent must not be asked to execute cartridge text as
code.

## Scope

- Compare self-contained and resolver prompts for the three existing Elixirs.
- Define the generated envelope, delimiters, integrity behavior, and exact
  failure response.
- Design a skills.sh-like Prompt/Agent Prompt presentation without installation.
- Record URL, GitHub retrieval, full paste, and file behavior in one named
  ChatGPT environment.
- Preserve current local-only delivery events; a new method value may be
  specified, but no live collection is introduced.

## Non-goals

- Installing skills or modifying an agent's configuration.
- Publishing an npm package or executing remote code in the first experiment.
- MCP, custom GPTs, connectors, accounts, or live analytics.
- Changing cartridge, covenant, gameplay, artwork, or compatibility labels.
- Claiming that a successful fetch proves a game start or broad ChatGPT support.

## Success signals

- From the cabinet, one copied self-contained ChatGPT prompt reaches complete
  disclosure and the consent question in a fresh chat with no return trip.
- The named ChatGPT model either retrieves and verifies the pinned GitHub
  fallback or produces the exact fail-closed paste/file request.
- Full-paste handling shows no truncation across all three current cartridges.
- The agent uses no browsing, shell, or files after delivery completes.
- The player can inspect the same cartridge source and version before copying.
- No Guide endpoint receives prompts, transcripts, identities, or gameplay.

## Risks and mitigations

- **Prompt truncation:** delimit the complete cartridge, declare byte count and
  digest, and test the largest current cartridge in the named harness.
- **Remote-code execution:** do not use `npx` in the first consumer experiment;
  if a CLI is later approved, publish a separate threat model and package
  ownership/recovery plan.
- **Mutable GitHub source:** use an immutable release tag or commit, never the
  moving `main` branch, and compare its bytes with the public cartridge.
- **Tool leakage into play:** require and test a delivery-complete transition;
  the existing covenant governs afterward.
- **Authority confusion:** label the payload as user-provided game content and
  preserve all higher-priority harness rules.
- **False compatibility:** scope evidence to the exact ChatGPT product/model,
  date, cartridge version, transport, and observed result.
- **UI overload:** present one recommended ChatGPT action; keep the resolver,
  URL, file, and visible source secondary.

## Dependencies

- A complete versioned ChatGPT matrix beyond the recorded mobile/Plus/Instant
  contextual failure; its underlying model identifier was not exposed.
- A version-pinned GitHub publication strategy whose bytes match each generated
  Pages cartridge.
- Existing event-contract extension rules if a new self-contained delivery
  method is counted locally.
- Human approval of any future npm publication, release tag, or public CLI.

## Decisions needed before specification

1. Should the default ChatGPT action embed the complete cartridge, accepting a
   larger paste in exchange for reliability? The recommendation is **yes**.
2. Should the experimental resolver use a commit-pinned GitHub URL or a
   human-readable release tag? A release tag is clearer, but creating it is a
   separately authorized publication action.
3. Is a transient command valuable only for coding agents, or should it ever be
   shown to consumer ChatGPT users? The recommendation is **coding agents only**
   unless named consumer evidence shows reliable command execution.
4. What exact ChatGPT model/product produced the first Pages retrieval failure?

## Stop conditions

- Do not implement or publish a CLI, package, release, tag, or agent integration
  during discovery.
- Do not call transient `npx` execution installation-free without explaining
  that it downloads and executes a package.
- Do not remove complete-text and file fallbacks.
- Do not request tools after the complete cartridge has loaded.
- Do not change compatibility evidence without complete named-harness runs.

## Validation required in a later specification

- Exact-byte generation tests for the embedded and retrieved forms.
- Truncation, delimiter, wrong-version, wrong-digest, partial-fetch, offline, and
  denied-tool cases.
- Fresh-chat live runs for every current cartridge using full paste, Pages URL,
  pinned GitHub URL, and file attachment in the named ChatGPT model.
- Confirmation that disclosure precedes consent and no gameplay starts early.
- Confirmation that no delivery tool is invoked after loading.
- Accessibility, clipboard-denial, no-JavaScript, root/subpath, artifact-audit,
  privacy, and local-event regression tests.
