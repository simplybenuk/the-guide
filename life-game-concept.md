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

## Primary interaction loop

1. The user chooses a Guide personality.
2. The user chooses, or accepts, a time horizon and broad constraints.
3. The user presses **Go**.
4. The Guide gives exactly one instruction.
5. The user confirms completion, refuses, or reports something unexpected.
6. The Guide adapts and gives the next instruction.
7. The adventure progresses through a deliberate narrative arc.
8. The Guide ends with a reflection explaining how the journey unfolded.

The most important interaction design decision is that **Go** means surrendering control to a particular character, not opening a blank chat box.

## Adventure structure

Every adventure follows a flexible six-part arc:

1. **Hook** — create immediate curiosity and a reason to begin.
2. **Movement** — get the user to take a concrete action.
3. **Discovery** — make the user notice, learn, or encounter something.
4. **Challenge** — introduce manageable friction or a stretch.
5. **Reward** — create a satisfying payoff, insight, artifact, or memory.
6. **Reflection** — explain the shape and purpose of the journey.

The Guide should not reveal the entire plan up front. The meaning of an earlier instruction may only become clear later.

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

The product should avoid turning setup into a questionnaire. The first instruction should arrive quickly.

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

Before writing code, settle the first demo adventure and choose the initial Guide personality that best proves the concept. The likely strongest starting point is The Detective or The Trickster because both can turn a mundane setting into an immediately visible game.
