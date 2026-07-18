# Elixir Game Library — Discovery Brief

## Idea and opportunity

The Guide could offer a small library of portable role-play games called
**Elixirs**. A player chooses an Elixir and points their existing AI agent at
its resource. The agent ceremonially "drinks" it, temporarily adopts the role
and rules encoded by that Elixir, plays the game with the human in their usual
agent harness, and returns to its ordinary identity when the game ends or the
player stops.

Each Elixir should be a genuinely different game, not only a different voice
or character skin. It can change the shared objective, interaction pattern,
narrative arc, duration, and kind of memento while preserving a common contract
for consent, achievable actions, boundaries, stop, privacy, and return.

This reframes The Guide from one hosted AI-led expedition into a cabinet of
temporary game transformations for the agent a person already has. The web can
be the place where people discover and choose Elixirs without needing to host
their conversations or supply their model access.

## Problem and desired outcome

A single portable expedition can prove that a personal agent can become a game
companion, but it may feel like one reusable prompt rather than a product people
return to. Conversely, a large undifferentiated prompt library would make
quality, safety, choice, and trust difficult to understand.

The opportunity is to establish the Elixir as a legible, collectible game
format: a small set of authored transformations with clear promises and a
recognisable beginning and end.

The desired outcome is:

> I choose the kind of game I want tonight, show its Elixir to my own agent,
> watch my familiar buddy transform for a while, and play something that feels
> meaningfully different before the Elixir wears off.

## Actors

### Primary actor

A person who has access to a conversational AI or personal agent and wants a
short, bounded game they can play together without connecting that agent to The
Guide.

### Companion actor

The user's existing agent. It reads the selected Elixir, confirms the player's
boundaries, performs the temporary role, runs the interaction loop, and exits
the role cleanly. Its underlying identity, model, tools, memory, and provider
remain controlled by the user and their harness.

### Maintainer actor

The Guide's author or curator, who creates, versions, tests, describes, and
retires Elixirs while keeping their shared contract coherent.

### Later actor, outside initial scope

A third-party game author who might eventually publish an Elixir. Supporting
untrusted or community-authored Elixirs would introduce moderation, provenance,
permissions, compatibility, and distribution questions that should not be
folded into the first experiment.

## Known facts

- The existing concept already makes the fictional elixir a consensual,
  temporary transformation of a buddy into an expedition persona.
- The product thesis is a human/AI buddy game in which the agent and human go on
  an adventure together.
- The current prototype has one tested signal-shaped, three-turn stay-here game
  with refusal, pause, stop, return, and a grounded memento.
- The agent-harness pivot discovery recommends testing a portable game resource
  that requires no Guide-hosted provider credential, transcript, or agent API.
- The existing concept considered several Guide personalities, but also states
  that meaningful personalities must change more than tone.
- The current application can enforce state and validate model proposals. A
  portable Elixir can state rules and compatibility expectations but cannot
  guarantee compliance by an arbitrary third-party agent.
- Existing project guardrails treat archives and mementos as private and
  user-owned and prohibit ambient agent tool use in the bounded game.

## Assumptions

- "Elixir" is understandable as both the fictional transformation object and
  the distributable game unit once the web copy explains it once.
- The initial audience will tolerate telling an agent to open a URL, read an
  attachment, or consume pasted text.
- A common session contract can create a recognisable Guide experience across
  different games even when the conversations differ.
- Three authored Elixirs are enough to test meaningful choice without creating
  a content marketplace or large library.
- The player's agent remains itself beneath the role; an Elixir does not claim
  to replace, permanently modify, jailbreak, or own the agent.
- Elixir effects last for one explicit session and do not silently persist into
  later conversation or memory.
- The first Elixirs can all work in a stay-here mode and require no agent tools,
  precise location, purchases, contact with other people, or background action.
- This discovery extends the agent-harness pivot but does not supersede approved
  product or architecture documents before a specification is approved.

## What makes an Elixir a different game

Every Elixir should declare and materially vary at least these elements:

- **fantasy and role:** what the buddy temporarily becomes;
- **player promise:** the experience the human is choosing;
- **objective:** what the pair are trying to discover, create, solve, or change;
- **interaction grammar:** the repeated kind of move the agent and player make;
- **arc and ending:** how the experience develops and what counts as a complete
  return;
- **duration and demands:** expected time, energy, movement, and sensory input;
  and
- **memento:** what grounded artifact or reflection remains afterward.

Changing only prose style, character name, or visual color is a variant, not a
new Elixir.

## Candidate first cabinet

The first catalog should contain a small set of deliberately contrasting,
low-risk games. Working concepts are:

1. **The Signal Elixir — a noticing expedition.** The transformed agent gives
   one concrete observation prompt at a time. The player follows a thread in
   their immediate surroundings, and the pair return with a field note grounded
   in what the player actually noticed. This can derive from the existing tested
   signal expedition.
2. **The Mystery Elixir — a collaborative micro-mystery.** The agent frames
   ordinary details supplied by the player as clues, offers bounded deductions,
   and invites the player to choose which theory to test through observation.
   The ending reveals a jointly authored explanation rather than claiming a
   factual hidden truth.
3. **The Story Elixir — a shared role-play tale.** The agent and human become
   characters in a short branching fiction shaped by the player's real words
   and choices. It requires no real-world action, making it a contrasting
   low-energy mode. The memento is a short artifact from the completed tale.

These are discovery examples, not approved content. The specification should
choose names and define enough mechanical contrast to test whether players
experience them as separate games.

## Common Elixir contract

All first-party Elixirs should share a visible, versioned contract:

- identify the Elixir, publisher, version, game promise, expected duration,
  physical demands, required inputs, memory behavior, and requested
  capabilities before play;
- request explicit player consent before the agent enters the role;
- ask for current time, energy, access, and hard boundaries when relevant;
- present one turn or decision at a time;
- treat player-authored observations as untrusted descriptions, not verified
  facts or permission to expand scope;
- respect refusal, changed boundaries, pause, and stop immediately;
- require no browsing, shell, messaging, purchasing, precise location,
  external writes, or background tools in the first catalog;
- never claim that the Elixir overrides the harness, system instructions, or
  the agent's underlying identity;
- end after a declared bound or at the player's request, explicitly release the
  role, and return the ordinary buddy; and
- keep transcripts and mementos within the user's harness unless the player
  deliberately exports them.

The contract is a behavioural promise and evaluation target, not an enforceable
sandbox inside third-party software.

## Decisions needed

1. **Is an Elixir a complete game or a module for one common engine?** A
   self-contained resource is easiest to hand to an agent; a shared engine plus
   thin game definitions reduces duplication but may require multiple fetches
   and more reliable harness behavior.
2. **What does the web cabinet do?** Decide whether it only displays and links
   Elixirs, performs the existing point-and-click selection ritual, or also
   gathers boundaries and produces a personalised handoff resource.
3. **How many games prove the model?** Three contrasting first-party Elixirs are
   recommended. One does not prove a library; many would obscure whether the
   underlying format works.
4. **How does the player hand over an Elixir?** URL, downloadable file, copied
   prompt, QR code, and installable harness-specific skill have different reach
   and trust properties. The first release needs a lowest-common-denominator
   path and can offer convenience variants.
5. **Can an agent remember prior games?** The recommended default is session-only
   transformation with an optional, explicit user-owned memento. Cross-game
   memory needs a later consent and portability decision.
6. **How much adaptation is allowed?** Each game should personalise from the
   current conversation without silently reading unrelated memory or changing
   its declared duration, demands, safety boundary, or objective.
7. **How are compatibility and quality communicated?** Decide which harnesses
   are tested, what "works with" means, and whether untested harnesses receive a
   clear experimental label.
8. **Is community publishing part of the product vision?** It may be valuable,
   but the first specification should explicitly remain first-party-only.

## Likely scope

The smallest useful library experiment would:

- define one portable, versioned Elixir contract;
- author three mechanically distinct first-party Elixirs, including the
  existing signal expedition as one candidate;
- provide each Elixir as a transparent resource that can be opened by URL,
  attached, or pasted without giving The Guide agent credentials;
- create a simple web cabinet showing the promise, duration, energy, movement,
  input, privacy, capability, and tested-harness labels for each game;
- require an explicit drink/consent moment and an explicit "Elixir has worn
  off" return in every game;
- keep all first-catalog games short, stay-here, foreground-only, and tool-free;
- run representative happy-path, refusal, stop, boundary-change, hallucination,
  prompt-injection, and role-release evaluations in a small harness matrix; and
- collect only privacy-preserving catalog and handoff signals if measurement is
  included at all.

## Non-goals for the first experiment

- An open marketplace, creator SDK, public uploads, ratings, or moderation.
- User-generated Elixirs or arbitrary remote resources presented as trusted
  first-party games.
- An unlimited catalog, procedural game generation, or recommendation engine.
- Long campaigns, multiplayer, competitive scoring, streaks, or economies.
- Permanent personality replacement or modification of the user's agent.
- Agent autonomy, external side effects, tool use, background activity, precise
  location, travel, or contact with third parties.
- Guide-hosted transcripts, cross-harness account sync, or central long-term
  memory.
- A separate native application or custom integration for every harness.
- Monetisation decisions before repeatable play and player trust are proven.

## Materially different options

### Option A — Self-contained Elixir cartridges

Each Elixir is one transparent, standalone game resource containing the common
contract and its game-specific role, rules, arc, and ending. The player gives
that resource directly to their agent.

This is the simplest mental model and most portable handoff. Shared rules are
duplicated, so updates require version discipline and old copied cartridges may
retain outdated safety language.

### Option B — One Guide runtime with thin Elixir recipes

The agent first loads a common Guide runtime resource and then consumes a small
Elixir definition that configures the role and mechanics.

This makes shared behavior easier to evolve and clarifies which parts are
invariant. It asks third-party harnesses to load, relate, and retain multiple
resources correctly, making onboarding and failure recovery more fragile.

### Option C — The web mixes a personalised Elixir handoff

The player chooses a game and boundaries in the existing visual cabinet. The
web generates a bounded session resource for the player to give their agent,
without calling that agent or receiving the later transcript.

This preserves the strongest ritual and lets the handoff carry explicit current
limits. It creates more browser state and a cumbersome cross-interface transfer,
and any embedded personal data needs clear handling and expiry.

### Option D — Harness-specific installs

The Guide publishes native skills, extensions, or packages for supported
harnesses, with the Elixirs exposed through their local interfaces.

This can create the smoothest repeat-play experience and stronger local
structure. It introduces platform-specific maintenance, permission review,
installation friction, and a narrower initial audience.

## Tentative direction to test

Start with Option A: three self-contained, first-party Elixir cartridges behind
a simple web cabinet. Treat URL, file, and paste as representations of the same
transparent versioned content. This tests whether people understand, trust, and
enjoy the Elixir model without first building a shared loader or harness-specific
integration.

Author the common contract once as a source artifact and embed a versioned copy
into each distributed cartridge. Automated checks should detect divergence.
Consider Option B only if duplication becomes a real maintenance problem, and
Option C only if players need a richer ritual or boundary handoff to understand
the experience.

## Success signals

- A visitor understands that each Elixir is a temporary game for their existing
  agent, not a consumable product, model provider, or permanent persona change.
- A player can compare the initial games and choose one based on its promise and
  demands without reading its full instruction resource.
- The agent asks permission, enters the declared role, runs the selected game,
  and visibly returns to ordinary conversation at completion or stop.
- Players perceive the initial Elixirs as different games rather than different
  writing styles.
- The same Elixir preserves its defining interaction and arc across the tested
  harnesses while allowing personal conversational variation.
- Refusal, pause, stop, changed boundaries, and role release work in
  representative adversarial tests for every Elixir.
- No first-catalog Elixir invokes ambient tools or asks The Guide to receive
  credentials, transcripts, private memory, or mementos.
- After one game, players can identify another Elixir they would plausibly play
  next; repeat interest is stronger evidence than catalog browsing alone.

## Risks

- **Prompt-library perception:** without distinct mechanics and ritual, the
  cabinet may look like a themed prompt directory rather than a game platform.
- **Role leakage:** an agent may retain an Elixir persona or rules after the
  declared ending, especially in long-lived conversations or memory-enabled
  harnesses.
- **Weak enforcement:** a common contract cannot guarantee safe behavior inside
  arbitrary models or harnesses.
- **Remote-instruction trust:** users and agents need a transparent way to know
  who published an Elixir, what it asks for, and which version they consumed.
- **Catalog paralysis:** too many similar choices weaken the ritual and make
  quality harder to communicate.
- **Compatibility variance:** some agents cannot fetch resources, prioritise
  them differently, or lose multi-turn state and game rules.
- **Safety fragmentation:** duplicated self-contained Elixirs can drift from the
  common contract unless source generation and conformance checks are reliable.
- **Misleading fiction:** mystery or oracle-like games could imply factual,
  psychological, supernatural, or diagnostic authority. Fictional framing and
  grounded claims must remain explicit.
- **Ambient permissions:** tool-capable agents may act on game language unless
  each Elixir explicitly prohibits side effects and evaluations verify this.
- **Content burden:** several genuinely replayable games require stronger game
  design and testing than several persona prompts.

## Dependencies

- The portable agent-harness expedition contract proposed by the prior discovery
  brief.
- A canonical Elixir schema covering identity, version, publisher, promise,
  mechanics, demands, inputs, capabilities, data behavior, entry, stop, ending,
  and memento.
- A shared safety and return covenant derived from the existing safety model.
- Three bounded game designs with visibly different mechanics and acceptance
  cases.
- A threat model for remote resources entering memory- and tool-capable agents.
- A small harness compatibility matrix and repeatable conformance/evaluation
  suite.
- A versioned public distribution path with file and paste fallbacks.
- A decision on whether the existing pixel-art room becomes the cabinet or stays
  a separate reference implementation during the experiment.

## Specification readiness

This idea is ready for a bounded specification if the human confirms that
Elixirs are the primary product unit, the first catalog is first-party and
tool-free, and three distinct games are the target. The recommended next
specification is an **Elixir Cartridge and First Cabinet** experiment covering
the common contract, three game definitions, transparent distribution, the web
catalog, cross-harness conformance, and explicit role release.
