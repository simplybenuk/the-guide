# Agent-Harness Gameplay Pivot — Discovery Brief

## Idea and opportunity

The Guide could become a game that is primarily played through the user's
existing AI agent rather than a web application that hosts the expedition and
calls a model provider.

The player would point an agent in OpenClaw, Hermes, ChatGPT, VS Code, or
another capable harness at a Guide-owned game resource. The agent would read
the resource, enter the game with the player, drink the fictional elixir, adopt
the temporary expedition persona, and conduct the expedition in the harness
where the relationship already exists. The user supplies the intelligence,
memory, interface, and model access by choosing their own agent.

The web experience could then have a smaller role. It might introduce the
premise, show lightweight participation signals, provide the game resource, or
retain the existing point-and-click room as the ritual through which a player
obtains or hands the resource to their agent.

This direction could make the original human/AI buddy-game thesis more literal:
the game travels to the buddy instead of asking the buddy to be recreated or
connected inside The Guide.

## Problem and desired outcome

The current prototype owns the web interaction, game state, validation, archive,
and provider call. Although this creates a controlled and consistent
experience, a real player still needs an operator-configured provider or a
future connection flow. That introduces credentials, API compatibility,
inference cost, privacy disclosure, network failure, and a weaker connection to
the personal agent the user already knows.

The opportunity is to make The Guide distributable as a bounded game resource
or protocol that personal agents can play directly. The desired outcome is:

> I point my own agent at The Guide, it recognisably enters the game and drinks
> the elixir, and we go on a short, surprising, safe expedition together—without
> giving The Guide an API key or replacing my existing buddy.

## Actors

### Primary actor

A person who already uses an AI through an agent harness and wants to turn that
existing relationship into a playful real-world expedition.

### Companion actor

The user's chosen agent. It interprets the game resource, adopts a temporary
persona, paces the expedition, and returns to its ordinary identity afterward.
Its model, memory, interface, permissions, and tool access are owned by the user
and the harness, not by The Guide.

### Secondary actors

- A curious visitor who encounters the web experience before deciding how to
  play.
- A player whose harness cannot fetch a URL but can accept pasted text or an
  attached/downloaded resource.
- The Guide maintainer, who publishes versioned game resources and needs to know
  whether they produce a coherent experience across materially different
  harnesses.

## Known facts

- The core product thesis is already a game for a human and an AI buddy, not an
  assistant that merely assigns tasks.
- The repository describes The Guide as an AI harness for play and treats the
  elixir as the ritual that temporarily transforms an existing buddy.
- The current implementation is a mobile-first web game with a playable
  point-and-click opening, application-owned state and safety validation, local
  archives, a deterministic provider, and a server-configured OpenAI-compatible
  adapter.
- The approved live-adapter iteration deliberately keeps credentials on the
  server, rejects agent tools, limits provider context, validates structured
  proposals, and owns state transitions outside the model.
- The project has already identified bring-your-own-agent as a core promise and
  OpenClaw and Hermes as candidate personal-agent environments.
- A ChatGPT subscription is not an API credential. Letting the user play inside
  their chosen harness avoids treating it as one.
- The existing web room, transformation, expedition presentation, memento, and
  archive provide tested product material; this pivot does not start from an
  unproven theme or ritual.

## Assumptions

- "Point the agent at the game" can have a lowest-common-denominator form such
  as opening a public URL, attaching a small file, or pasting a bounded prompt.
- At least one target harness can reliably read the resource, retain short
  session state, and converse with the player without a custom API integration.
- The earliest experiment can target technically confident users and a small
  compatibility set rather than claiming support for every conversational AI.
- The expedition can remain valuable without The Guide receiving the transcript
  or centrally storing the memento.
- Participation counts, if retained, can be approximate and privacy-preserving;
  a public leaderboard or identity system is not implied.
- The existing web implementation remains useful as a reference experience and
  optional ritual while the harness-native loop is tested.
- This discovery brief proposes a direction for specification; it does not
  supersede the approved architecture or live-adapter specification.

## Decisions needed

1. **Where is the authoritative game runtime?** Decide whether the agent harness
   owns the full expedition, whether the web app retains authoritative session
   state, or whether both are supported as separate modes.
2. **What is the minimum portable game resource?** Decide whether the primary
   artifact is a public Markdown page, a downloadable prompt/skill bundle, a
   machine-readable manifest, or a small combination of human- and
   agent-readable files.
3. **What role does the web ritual play?** Decide whether it is an optional
   introduction, a resource-acquisition game, a session configurator, or no
   longer part of the main play path.
4. **What safety claim can The Guide honestly make?** The current application
   can reject unsafe proposals and own pause, stop, and state transitions. A
   portable resource can specify those rules but cannot necessarily enforce
   them inside a third-party harness.
5. **Are agent tools part of play?** The recommended first experiment requires
   no browsing, shell, messaging, purchasing, location, or background tools
   after the resource is loaded. Tool-enabled play would create a materially
   larger permissions and safety problem.
6. **Where do state and mementos live?** Decide whether they remain only in the
   harness conversation/workspace, can be exported back to the browser, or use
   an optional user-owned archive format.
7. **What does a player count measure?** Opening the site, requesting the
   resource, explicitly starting a game, and finishing an expedition are
   different signals. Counting should not require transcripts or persistent
   identity unless separately justified.
8. **What compatibility promise is realistic?** Named harnesses differ in URL
   access, attachments, system-prompt priority, memory, tools, and support for
   installable skills. The first specification needs an explicit tested matrix.

## Likely scope

The smallest useful experiment would:

- publish one versioned, portable stay-here expedition resource;
- let a player hand it to an existing agent by URL, file, or paste;
- preserve the elixir, temporary persona, three-beat signal arc, one achievable
  instruction at a time, free-text response, refusal, pause, stop, return, and
  grounded memento;
- require no provider credential, account, agent API, transcript upload, or
  tool execution by The Guide;
- define an explicit start and end marker so ordinary-agent identity is
  separated from expedition play;
- test the same representative scenarios in a deliberately small set of
  harnesses;
- retain a simple web entry point that explains the ritual and provides the
  resource, with the existing playable room considered as an optional handoff
  path; and
- collect only coarse, consented product signals needed to learn whether people
  start and complete the game.

## Non-goals for the first experiment

- Universal compatibility across all models, agents, IDEs, and chat products.
- Calling or controlling a user's agent through an API.
- Receiving API keys or paying players' inference costs.
- Importing private agent memory into The Guide.
- Giving the game shell, web resource, or expedition persona ambient access to
  the agent's tools.
- Proving travel, precise location, autonomous actions, multiplayer, social
  sharing, or competitive leaderboards.
- Synchronising full transcripts or archives between a harness and the web app.
- Replacing the existing implementation before the harness-native experience
  has been tested with real users.

## Materially different options

### Option A — Portable game resource; the agent harness is the runtime

The web publishes a versioned resource and explains how to hand it to an agent.
All conversation, session state, model access, and mementos stay in the user's
harness.

This most directly proves the pivot and eliminates provider integration for The
Guide. It also produces the least consistent experience and moves enforceable
safety, state integrity, and recovery outside The Guide's control.

### Option B — Playable web ritual with a harness-native expedition handoff

The existing point-and-click room remains the front door. The player discovers
or configures a resource there, then hands it to their agent for the expedition.
The web may issue a bounded session card containing preferences and boundaries,
but it does not call the agent.

This preserves the distinctive visual ritual and gives the player clearer setup
while avoiding agent APIs. The cross-interface handoff could be cumbersome,
especially on mobile, and any return path for completion or mementos needs an
explicit low-trust format.

### Option C — Two explicit products: hosted reference game and agent-native kit

The current web game remains a controlled reference/demo, while a separate
portable resource lets existing agents play the same expedition contract.

This retains an accessible demonstration and a test oracle for expected
behaviour. It increases product and maintenance surface, and the two experiences
could drift unless they share a versioned content and acceptance-test contract.

### Current direction — Hosted web orchestration with provider adapters

The application continues to own the expedition and calls a configured model
through its adapter boundary.

This offers the strongest enforcement and most consistent UX, but retains
provider configuration, server cost and privacy concerns, and does not fully
realise the idea that the player brings the agent relationship itself.

## Tentative direction to test

Start with Option A as the product-thesis experiment and use the existing web
app only as a landing page and behavioural reference. Make the resource usable
by URL, file, and paste so the experiment tests the gameplay premise rather than
one harness's integration surface.

If the elixir ritual loses too much emotional weight outside the browser, test
Option B next by turning the existing room into a resource handoff. Do not build
two maintained production modes (Option C) until cross-harness tests show that
agent-native play is compelling but materially benefits from a hosted reference.

## Success signals

- A player can begin with an existing agent without entering a credential or
  configuring an endpoint for The Guide.
- The agent recognisably changes from ordinary buddy to temporary expedition
  persona and returns at the end.
- A player reaches the first concrete instruction within roughly two minutes of
  encountering the resource.
- The same core arc works in the initial supported harnesses without
  harness-specific application code.
- Instructions remain achievable and grounded; refusal, pause, stop, and changed
  boundaries are respected immediately in representative adversarial tests.
- The final memento uses details the player actually supplied and remains in a
  user-controlled location by default.
- Players describe the experience as doing something with their agent, not
  pasting a large role prompt into an ordinary chat.
- The experiment yields useful start/completion feedback without collecting
  conversation content.

## Risks

- **Loss of enforcement:** a remote prompt or skill cannot guarantee that a
  third-party model obeys safety, state, or stop rules.
- **Prompt-injection boundary:** asking an agent to ingest a web resource is
  itself a trust decision. The resource must be transparent, versioned, minimal,
  and free of hidden instructions; players need to know what capabilities it
  requests.
- **Ambient agent permissions:** an OpenClaw, IDE, or personal-agent session may
  already have powerful tools. The expedition must not inherit or exercise them
  merely because they are available.
- **Compatibility variance:** models may ignore role boundaries, lose state,
  invent observations, expose hidden resource text, or interpret the same game
  differently.
- **Product dilution:** without the visual room and application pacing, the
  experience may feel like a reusable prompt rather than a game.
- **Onboarding friction:** "point your agent at this" is not one universal
  action. ChatGPT, IDE agents, local agents, and mobile clients offer different
  affordances.
- **Measurement gap:** privacy-preserving static distribution provides little
  evidence of starts, completions, failures, or unsafe output.
- **Resource tampering and version drift:** copied prompts can be modified or
  become incompatible while still appearing to be The Guide.
- **Platform policy and availability:** third-party harness capabilities and
  restrictions can change independently of the project.

## Dependencies

- A documented portable expedition contract derived from the existing state,
  safety, transformation, signal-arc, and memento rules.
- A threat model for remote instructions entering tool-capable personal agents.
- A small representative harness matrix and repeatable cross-harness evaluation
  cases.
- A public, stable, versioned distribution location plus a copy/paste or file
  fallback.
- Original web copy that explains what the resource asks the agent to do and
  what data remains with the user's provider.
- A decision on whether lightweight analytics are necessary and, if so, a
  privacy-preserving event definition.

## Specification readiness

The idea is ready for a bounded specification once the human confirms the
runtime and web-role choices. The recommended first specification is a
"Portable Agent-Harness Expedition" experiment: Option A, no agent tools, a
stay-here three-beat arc, and a small explicit compatibility matrix. Whether the
existing point-and-click room becomes the handoff in the same iteration should
remain a separate scope decision.
