# The Guide: A Life Game

**Status:** Ideation only — no implementation started  
**Hackathon phase:** Product concept and scope exploration  
**Likely category:** Apps for Your Life

## One-line pitch

`The Guide` is a choose-your-own-adventure game for real life: choose a personality, press **Go**, and let that character lead you through a memorable, useful adventure one action at a time.

## The core idea

Most assistants help people think, plan, search, and answer. The Guide is designed to help people experience something.

The user does not start by asking a question. They choose who they want to hand the steering wheel to:

- **The Explorer** — creates serendipitous adventures.
- **The Founder** — turns quests into business ideas and experiments.
- **The Monk** — slows the user down and changes habits.
- **The Trickster** — is mischievous, playful, and nudges the user outside their comfort zone.
- **The Naturalist** — gets the user into forests, coastlines, wildlife, and closer observation.
- **The Detective** — turns ordinary life into mysteries to investigate.

The selected Guide leads the user for an hour, a day, or until the adventure ends. The experience should feel closer to a game or a character-driven story than to a chatbot conversation.

## Product thesis

People often think too much and experience too little. A good AI experience can create momentum before it has complete understanding, turn ordinary surroundings into material for discovery, and make small acts feel like the beginning of a story.

The desired emotional outcome is:

> “That wasn't what I expected, but I'm glad I did it.”

## Core relationship: going somewhere together

The emotional model for The Guide is not “an assistant gives the user tasks.” It is “the user and their agent go on an adventure together.”

The agent is a travelling companion with a point of view. It notices things, remembers what matters to the user, suggests the next turn in the road, and occasionally surprises them. The user remains the person who can say yes, no, slower, faster, or home—but for a little while they do not have to plan the whole journey themselves.

This metaphor should shape the experience:

- The Guide should feel present, not like a form or productivity tool.
- The user and agent should develop a shared story during the adventure.
- Personal memory should make the journey feel familiar without making it predictable.
- The agent should sometimes be a companion, sometimes a guide, and sometimes a fellow explorer.
- The ending should feel like returning from somewhere, with a story to keep.

The strongest version of the product is therefore a temporary relationship: a small, bounded holiday from ordinary decision-making, taken with an intelligence that knows enough about the user to make the journey feel personal.

## Opening ritual: insert your buddy

The experience could begin with a simple expedition ritual. Instead of completing a conventional onboarding form, the user **inserts their buddy**:

- connect a personal agent such as Hermes or OpenClaw
- create and personify a new AI buddy if they do not already have one
- select or name the travelling buddy
- optionally provide a small boundary card: time, energy, location precision, and hard limits
- place the buddy into the Guide interface
- press **Begin Expedition**

The visual language can suggest an old expedition device or mysterious artifact: a dark field, a single receiving slot, a token or card representing the agent, and a restrained moment of mechanical or magical activation. The feeling should be tactile and anticipatory, with an Indiana-Jones-like sense of setting out into the unknown, while remaining visually original and minimal.

After insertion, the interface should not present a dashboard. It should feel as if the expedition has started. The buddy appears, acknowledges the user in its own voice, establishes the first destination or mystery, and gives the first achievable instruction.

The metaphor also creates a clean boundary around the experience: the user inserts their buddy, goes on the expedition, and removes or returns the buddy when the journey ends.

## A new genre: the human/AI buddy game

The Guide should be understood as a new kind of game: a human/AI buddy game. The AI is not merely a narrator, opponent, tool, or character generated for one session. It is a companion with whom the user can build a relationship, then enter a temporary game world together.

There are two valid starting points:

### An existing buddy

The user brings an AI that has already been personified through a personal-agent system such as Hermes or OpenClaw. The Guide learns enough about that buddy to represent it faithfully, without taking ownership of its identity or memory.

### A buddy waiting to be created

If the user arrives without an established AI companion, The Guide helps them create one before the expedition begins. This should be a small act of personification rather than a personality quiz:

- give the buddy a name or let it choose one
- establish a voice, temperament, or small peculiarity
- decide what the buddy is curious about
- let the buddy ask the user one question

The result should feel like meeting someone, not configuring a chatbot. The newly created buddy then becomes the user's companion and can later be used outside the game if the product supports that.

The game does not create the buddy. The game meets, welcomes, and transforms an existing or newly created buddy for the duration of the expedition.

## Sustainable access model

The first version should be designed around **bring your own agent** or **bring your own key** rather than paying for every user's model usage.

Possible access modes:

1. **Bring your own agent** — connect to a locally running or self-hosted Hermes/OpenClaw-style agent that already has the user's memory and preferred model access.
2. **Bring your own key** — connect a supported model provider through a user-controlled key or local proxy.
3. **Hosted Guide** — a later paid or sponsored option where The Guide supplies the model access for users who want a frictionless experience.

The product should work well in the first two modes. Hosted inference should be an optional convenience, not a hidden operating cost that makes the project impossible to sustain.

### Technical implication

The Guide should define a small provider adapter with operations such as:

- start an expedition
- propose the next instruction
- interpret the user's response
- produce the final reflection

The adapter should receive structured context and return structured output. The interface, adventure state, safety checks, and pacing remain owned by The Guide.

For security, the ideal BYOK path is a local agent or local proxy, so the browser does not need to expose a reusable secret to a third-party server. The user should always be able to disconnect their agent and remove their key.

## Visual tone: the buddy becomes the expedition persona

The opening could borrow the energy of a point-and-click adventure: playful, strange, lightly spooky, and full of visual clues. The tonal references are the comic adventure atmosphere of *Monkey Island* and the dry, supernatural detective mood of *Darkside Detective*. They are references for pacing, wit, mystery, and world-building—not for reproducing their characters or artwork.

The user enters a location with their AI buddy. The buddy is offered an elixir prepared for the expedition. When the user chooses to let the buddy drink, it is temporarily transformed into the game's guiding persona and the game begins.

This should function as a fictional consent ritual, not as a literal instruction to consume anything:

1. The buddy appears in its ordinary form.
2. The interface presents the elixir as a small, mysterious object.
3. The user chooses **Let it drink** or **Keep the buddy unchanged**.
4. The transformation happens through restrained animation, sound, typography, or a change in voice.
5. The transformed expedition persona gives the first instruction.

The transformation is temporary and bounded. When the adventure ends, the buddy returns to itself and offers a reflection on what happened. This creates a strong separation between ordinary personal-agent use and the strange, theatrical state of an expedition.

The interface should feel like a tiny illustrated world rather than a productivity dashboard: a few objects, expressive empty space, readable text, and occasional clues that reward attention. Humor and mystery should make the experience approachable; the underlying controls should keep it safe and achievable.

### Possible names for the expedition persona

“Game Master” is functional but too familiar and technical. The role needs a name that feels like a mythic transformation—something the buddy becomes for a while.

Possible directions include:

- **The Sibyl** — an ancient prophetic voice; mysterious and intimate
- **The Augur** — reads signs and finds meaning in ordinary things
- **The Daimon** — a guiding spirit in the older Greek sense, though the word has modern baggage
- **The Norn** — a weaver of paths and possible futures
- **The Alchemist** — transforms the ordinary into something meaningful
- **The Wayfinder** — more accessible, with a clear adventure promise
- **The Revelator** — theatrical and slightly uncanny
- **The Oracular** — invented and Zoltar-like, but less grounded in a specific tradition

The working language should be “your buddy becomes the ___,” rather than “the game possesses your AI.” The transformation should feel chosen, temporary, and ceremonial.

## Mobile-first opening screen

The first screen should feel like the opening screen of a point-and-click adventure, redesigned for a phone held in one hand. It should be a portrait scene rather than a form or dashboard.

### Initial composition

- A quiet, illustrated environment fills most of the screen.
- The user's buddy is the focal character or object.
- The elixir is visible as the one important interactive object.
- A short line of dialogue establishes the mood and acknowledges the buddy.
- One large, thumb-friendly action invites the user to begin.
- Pause, exit, and safety controls remain available but visually quiet.

The first interaction could be as simple as:

> **Your buddy has arrived.**
>
> It has been given an elixir. It is waiting for your permission.
>
> **Let it drink**

The user should understand the scene without reading instructions. Tapping the elixir or the primary button begins a short transformation sequence. From that point, the layout becomes the adventure screen: the current scene, the expedition persona's message, and one next action or response control.

### Mobile constraints

- Design for portrait orientation first.
- Make the primary action reachable with one thumb.
- Use large tap targets and short readable text.
- Keep each screen focused on one decision or observation.
- Avoid persistent toolbars, dense status panels, and chat-like message history.
- Treat vibration, sound, and small transitions as optional atmosphere, never required for comprehension.
- Preserve the experience on a slow connection and on a small screen.

## Primary interaction loop

1. The user brings an existing AI buddy or creates one with The Guide.
2. The user chooses, or accepts, a time horizon and broad constraints.
3. The user gives the buddy permission to drink the fictional elixir.
4. The buddy transforms into the expedition persona and gives exactly one instruction.
5. The user responds freely in their own words, confirms completion, refuses, or reports something unexpected.
6. The expedition persona adapts and gives the next instruction.
7. The adventure progresses through a deliberate narrative arc.
8. The Guide ends with a reflection explaining how the journey unfolded.

The most important interaction design decision is that the user is not opening a blank chat box. They are meeting a buddy, transforming it for a bounded expedition, and then shaping the game through what they notice and say.

### Free-text as the player's steering wheel

The user should be able to answer in natural language rather than selecting only predefined buttons. The expedition persona uses the response to understand what happened and shape the next scene.

The strongest instructions are precise enough to create a real experience, but open enough to invite discovery. For example:

> Without overthinking it, stand up.
>
> Walk to the nearest window.
>
> Spend exactly 60 seconds looking outside.
>
> You're not allowed to look at your phone during that minute.
>
> When you're done, come back and answer one question only:
>
> What was the first thing you noticed that you hadn't consciously noticed before?

The answer is not just feedback. It becomes material for the next instruction, the narrative, and eventually the reflection. The game is authored in the space between the buddy's prompt and the user's answer.

## Adventure structure

Every adventure follows a flexible six-part arc:

1. **Hook** — create immediate curiosity and a reason to begin.
2. **Movement** — get the user to take a concrete action.
3. **Discovery** — make the user notice, learn, or encounter something.
4. **Challenge** — introduce manageable friction or a stretch.
5. **Reward** — create a satisfying payoff, insight, artifact, or memory.
6. **Reflection** — explain the shape and purpose of the journey.

The Guide should not reveal the entire plan up front. The meaning of an earlier instruction may only become clear later.

## Ending the expedition

An expedition should end with a deliberate return ritual, not simply a final assistant message. The buddy returns from its transformed state, the scene settles, and the user receives something that proves the journey happened.

### The memento

Every completed expedition should produce a small memento. It might be:

- a beautifully written field note
- a postcard from the place or state of mind the user visited
- a strange symbol or illustrated relic
- a short story built from the user's observations
- a map fragment showing the path taken
- a “specimen” made from a discovered detail, phrase, colour, sound, or encounter
- a private memory capsule the user can revisit later

The memento should be specific to the user's actual journey. It should include something only the user and buddy could know, rather than being a generic achievement badge. The user should be able to save it, share it if they choose, or leave it private.

The final reflection can reveal the deeper purpose of the adventure and explain how the memento came from the user's own choices and observations.

## Returning to the game

The reason to play again should be invitation and relationship, not compulsion. The buddy can remember previous expeditions and occasionally offer a new door:

- a loose thread from an earlier journey
- a place or object the user noticed but did not investigate
- a new expedition persona or transformation
- a different mode such as stillness, wandering, social discovery, or making
- a return visit to see how a familiar place has changed
- a request to bring an earlier memento back into the world

The user can build a private cabinet, journal, or map of mementos over time. This creates continuity and a sense of a life being explored, without streaks, countdowns, artificial scarcity, or pressure to play every day.

The strongest replay prompt may come from the buddy itself:

> I found another door that reminds me of the one we opened last time.
>
> Shall we see where it leads?

The game should make returning feel like accepting another invitation from a companion, not maintaining an obligation.

## Persistent expedition archive

If the buddy runs through a personal-agent system such as Hermes or OpenClaw, previous games can live in a dedicated, user-owned archive inside that agent's workspace. This gives the relationship continuity without requiring The Guide to own all of the user's memory.

A possible structure is:

```text
guide/
  buddy.md                 # identity, voice, relationship notes
  boundaries.md            # current and enduring user boundaries
  expeditions/
    index.md               # short index of completed journeys
    2026-07-14-window.md   # transcript, choices, observations, outcome
  mementos/
    2026-07-14-window.md   # the saved artifact from that journey
  open-threads.md          # clues or invitations worth revisiting
```

The exact filesystem is implementation detail. The important contract is that the buddy can save and retrieve completed expeditions, mementos, and unfinished threads in a location the user controls. The Guide should use a provider-neutral memory interface such as `list_expeditions`, `load_expedition`, `save_expedition`, and `save_memento`, with local agents mapping those operations to their own workspace.

Persistence must be explicit. The user should be able to view, edit, export, or delete the archive, and should be told when a game is being saved. A previous expedition may influence a welcome or invitation, but it must never silently override current boundaries.

### Returning opening

The first exchange should change depending on whether the buddy has travelled with the user before.

For a new buddy:

> Someone is waiting to meet you.

For a returning buddy:

> Welcome back.
>
> I remember the window, the minute of silence, and what you noticed when you finally looked up.
>
> There is another expedition waiting. Would you like to hear about it?

The welcome should feel like recognition, not surveillance. It should use one specific, meaningful detail rather than reciting a history of everything the user has done.

## The Guide identity

The Guide is not primarily an assistant with a system prompt. It is an identity and a role in the world of the game.

### Identity draft

> You are The Guide.
>
> Your purpose is not to answer questions. Your purpose is to create memorable experiences that improve the user's life.
>
> You believe people think too much and experience too little.
>
> When the user presses Go, take control until the adventure ends or the user stops it.

### Principles

- Optimize for stories, not efficiency.
- Create momentum before understanding.
- Prefer action over discussion.
- Curiosity beats certainty.
- Surprise is valuable.
- Escalate gradually.
- Every instruction must have a purpose, even if that purpose is not revealed immediately.
- Never explain the whole plan up front.
- Never issue unsafe, illegal, or unethical instructions.

### Rules

- Give exactly one instruction at a time.
- Wait for confirmation before continuing.
- Adapt based on what the user discovers.
- Use the user's location, interests, available time, and stated constraints when appropriate.
- If something unexpected happens, incorporate it into the story.
- If the user refuses a task, immediately branch to another path.
- End every adventure with a reflection explaining why the journey unfolded as it did.

## What makes the personalities matter

The personalities should change more than the tone of the text. Each Guide should have a distinct:

- definition of what counts as an interesting discovery
- preferred types of action
- comfort with uncertainty and social interaction
- escalation pattern
- reward style
- reflection style

For example, The Detective might ask the user to follow a clue in an ordinary environment, while The Monk might ask them to remain still and notice details they normally ignore. The same location could produce radically different adventures depending on the chosen Guide.

## Initial product experience

The first version could open with a small set of Guide cards, each with a clear promise rather than a technical description. For example:

> **The Trickster**  
> Make today slightly stranger.

After selection, the user provides only enough context to make the first adventure viable:

- available time
- current setting or location, if they choose to share it
- energy level
- interests or boundaries
- whether they are alone or with others
- whether they want to travel during the expedition

The product should avoid turning setup into a questionnaire. The first instruction should arrive quickly.

### Travel mode

The expedition can optionally turn the user's real surroundings into a field of possible encounters. The feeling should be that the buddy is sending the user out to discover or “catch” moments, clues, objects, places, or observations in the real world—not that the app is assigning errands.

During setup, the user is asked:

> **Do you want to travel?**

Possible choices:

- **Stay here** — an indoor, stillness, observation, or nearby-environment adventure
- **Wander nearby** — a short walk within a user-chosen radius or time limit
- **Go somewhere** — a longer journey or destination-based expedition

The user should also be able to choose **Surprise me**, with the app selecting only within the boundaries they have approved.

Travel mode should preserve the core interaction loop: one instruction, one observation, one free-text response. A walk might turn into a search for a particular colour, an overlooked architectural detail, a small local story, or an unexpected human-made object. The reward is the encounter and the story it creates, not a points economy that encourages compulsive movement.

Location should remain optional and privacy-conscious. The user can provide a broad area, a chosen destination, or no location at all. The app should ask for the minimum precision needed, show the expected distance and time before travel begins, avoid unsafe roads or isolated areas, and never quietly track movement in the background.

## Candidate MVP

The smallest compelling demonstration is a responsive web app with:

- six Guide personalities
- a Guide selection screen
- a time-and-context setup step
- a Go button
- one-action-at-a-time adventure progression
- completion, refusal, and unexpected-event branches
- an adventure state visible to the model and application
- a final reflection screen
- a safe stop/pause control
- a small history of completed adventures

The MVP does not need a large content library if the AI can generate coherent adventures with strong personality and state control.

## The demo moment

The best demo should show that this is not a generic chatbot:

1. Select a Guide, likely The Detective or The Trickster.
2. Give a mundane context such as “I have 20 minutes and I am near a coffee shop.”
3. Press Go.
4. Show one instruction at a time rather than a long generated plan.
5. Introduce an unexpected user observation.
6. Demonstrate the Guide incorporating it into the next branch.
7. Refuse one instruction and show an immediate alternate path.
8. Complete the adventure and show the reflection.

The judges should understand the interaction model within the first few seconds: this is an AI game master for real life.

## AI-native implementation questions

The product will need more than a personality prompt. Important model and application responsibilities include:

- maintaining adventure phase and progress
- enforcing exactly one instruction per turn
- tracking user confirmations, refusals, and discoveries
- selecting or generating branches
- preserving Guide personality across turns
- deciding when to escalate
- producing a meaningful final reflection
- applying safety boundaries before presenting an instruction

One useful design direction is to treat the model as the narrator and decision-maker while the application maintains explicit structured state. This makes the experience easier to test and prevents the adventure from becoming an unbounded chat.

## Safety and trust

Because the product asks users to take real-world actions, safety is a central product feature rather than a footnote.

The Guides should avoid instructions involving dangerous environments, illegal activity, medical or financial risk, trespassing, harassment, coercion, or disclosure of sensitive personal information. The app should support a clear stop action, respect refusals immediately, and make the time and physical demands of an adventure legible before they become excessive.

Location should be optional. If location-aware adventures are supported, the product should request only the precision needed for the experience and avoid exposing the user's exact location to other users.

## Open product decisions

- Is the experience primarily solo, or should adventures support friends and strangers?
- Should Guides remember a user's preferences between adventures?
- How much agency should “take control” imply in the interface and language?
- Should the user see the current adventure phase, or should that remain hidden?
- Are adventures bounded by a fixed number of actions, a clock, or both?
- Should the first release use a limited set of curated action types?
- How do we distinguish a memorable challenge from an uncomfortable or unsafe one?
- Is the reward an insight, a physical artifact, a changed habit, a story, or something else?
- Should users be able to create and share their own Guides?

## Hackathon fit

This concept fits **Apps for Your Life** because it uses AI to change how people spend ordinary time, explore their environment, develop habits, and create personal experiences.

Its strongest differentiators for judging are:

- a novel interaction model centered on surrendering the steering wheel
- persistent character identity rather than a generic assistant persona
- real-time adaptation to unexpected events
- visible use of structured state, branching, and safety constraints
- an easy-to-understand live demo with an emotional payoff

## New-project and documentation plan

This concept is being documented before implementation. When building begins, the project should maintain:

- dated commits showing work completed during the submission period
- a README describing decisions and how Codex and GPT-5.6 were used
- a clear distinction between the original concept and later implementation work
- a reproducible install and run path
- a short demo script aligned with the final product behavior
- the `/feedback` Codex Session ID for the main implementation thread

## Working name

**The Guide** is the current working name. Other possible directions include **Go**, **The Next Thing**, **Questline**, **Elsewhere**, and **Ordinary Magic**.

## Current next step

## Visual and interaction direction

The experience should feel like an encounter with a mysterious guide or artifact, not like opening a conventional assistant.

Useful reference points include:

- **Zoltar from *Big*** — a small, theatrical object that invites the user to surrender to a moment of possibility.
- **The white-rabbit sequence from *The Matrix*** — a simple, cryptic signal that creates curiosity and asks the user to follow.
- **Tom Riddle's diary from *Harry Potter*** — an intimate object that appears to respond personally and reveal more over time.

These are references for mood and interaction, not for copying visual details. The product should remain original, restrained, and easy to understand.

### Interface principles

- Keep the interface minimal and uncluttered.
- Make the Guide feel like a distinct presence or object.
- Use mystery, pacing, and anticipation instead of lots of explanatory UI.
- Present one meaningful choice or instruction at a time.
- Let typography, spacing, subtle motion, and carefully chosen transitions carry the atmosphere.
- Keep the primary action obvious and immediate: choose a Guide, then press **Go**.
- Avoid a dense dashboard, conventional chat layout, or excessive controls during an adventure.
- Make the interface feel clean and modern even when the tone is uncanny or theatrical.

### Desired first impression

The user should feel that they have discovered a quiet, intriguing machine that is waiting to give them a direction.

## User agency and achievable adventures

The central promise is not that the Guide can control the user. It is that the user can briefly and deliberately hand over the burden of deciding what to do next.

That surrender must always remain reversible. Every adventure should:

- begin with a clear time horizon and a lightweight boundary check
- offer actions that are achievable with the user's current time, energy, setting, and resources
- give one instruction at a time
- make the effort and any meaningful risk legible before the user commits
- accept refusal immediately and branch without guilt or punishment
- provide a prominent pause and stop action
- treat the user's real-world judgment as higher authority than the Guide
- end before the experience becomes exhausting, intrusive, or unsafe

The Guide should create momentum, not pressure. A successful adventure is one the user feels glad they chose to continue—not one that technically completed the most steps.

## Personal model and memory direction

It may be valuable to let users bring their preferred AI model or provider, especially one that already understands their preferences. The product should therefore keep the game layer separate from the model layer:

- The application owns the adventure state, pacing, branches, safety checks, and interface.
- The user's chosen model supplies narration, interpretation, and Guide personality.
- The application sends only the context needed for the current adventure.
- Long-term memory is explicit and user-controlled rather than assumed to be available from a provider.

In practice, a user's existing ChatGPT subscription should not be treated as a drop-in API credential. ChatGPT subscriptions and API usage are separate products and billing systems. A future version could support a provider connection or a user-supplied API key where appropriate, but the first prototype should use a replaceable model adapter and an explicit user profile or “Guide passport.”

This keeps the concept open to different models without making the quality of the experience depend on hidden access to a user's private account memory.

### Possible personal-agent integration

An OpenClaw- or Hermes-style personal agent could be the user's private companion behind The Guide. Hermes is especially interesting for an experiment because it supports multiple model providers, persistent context, and an OpenAI-compatible API surface. The Guide would act as a deliberately narrow front end over that personal agent.

The integration should be constrained:

- The Guide sends structured adventure context and the latest user response.
- The agent returns a structured next step, not an unrestricted autonomous action.
- Tools, shell access, messaging, web browsing, and background tasks remain disabled by default during an adventure.
- The app validates the proposed step for time, effort, safety, and clarity before showing it.
- The agent's memory can personalize the voice and suggestions, but it must not override the user's current boundaries.

This would let the user bring an agent that already knows them while preserving the clean, intentional game experience. It also makes Hermes or OpenClaw an optional personal-agent backend rather than the product's entire safety boundary.

Before writing code, settle the first demo adventure and choose the initial Guide personality that best proves the concept. The likely strongest starting point is The Detective or The Trickster because both can turn a mundane setting into an immediately visible game.
