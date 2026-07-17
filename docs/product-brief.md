# The Guide — Product Brief

## Product summary

The Guide is a mobile-first human/AI buddy game. A user brings an existing personal AI buddy—or creates one—then enters a short, bounded expedition together. The buddy drinks a fictional elixir and temporarily becomes an expedition persona that gives one achievable instruction at a time. The user responds in free text, and their observations shape what happens next.

The experience should feel like a strange, funny, lightly spooky point-and-click adventure for real life: a small holiday from ordinary decision-making, taken with an intelligence that knows enough about the user to make the journey personal.

## Product promise

> Let your buddy take you somewhere unexpected, one real-world moment at a time.

The user hands over the burden of deciding what happens next, but never their autonomy. They can refuse, pause, change direction, or go home at any time.

## Target user

People who enjoy games, playful rituals, reflective experiences, personal AI, or discovering more from ordinary surroundings. The first audience is technically curious enough to connect a local agent or provider key, but the product should eventually help less technical users create a buddy without knowing anything about agent infrastructure.

## MVP experience

The first compelling vertical slice is one short expedition:

1. Open the mobile web app.
2. Create a simple buddy or connect a compatible agent.
3. Set time, energy, travel preference, and hard boundaries.
4. Let the buddy drink the elixir.
5. Receive one concrete instruction.
6. Respond in free text.
7. Complete two or three adaptive steps.
8. Return home and receive a personalised memento.

The MVP should work fully in “stay here” mode. Travel mode is an optional second path, not a dependency for proving the core experience.

## Product principles

- Experience over efficiency.
- One meaningful moment at a time.
- Agency is surrendered temporarily, never removed.
- The user's own words are game input.
- The buddy exists before the game transforms it.
- The model proposes; the harness validates and paces.
- Surprise is valuable when it remains achievable and safe.
- Memory should create recognition, not surveillance.
- Returning should feel like accepting an invitation, not maintaining a streak.

## Success criteria for the first prototype

- A new user understands the premise within 30 seconds.
- The elixir ritual feels meaningful rather than decorative.
- The first instruction is achievable without explanation.
- Free-text responses visibly affect the next step.
- Refusal and pause work immediately.
- The ending feels like a return, not a chat session stopping.
- The memento contains details from the actual expedition.

## Explicit non-goals

- A general-purpose autonomous assistant
- A large content library
- Competitive scoring or social leaderboards
- Background location tracking
- A full mobile-native app before the interaction is proven
- Supporting every agent provider in the first release

## Open decisions and recommendations

### Recommendation: start with a hosted demo adapter plus a local-compatible adapter

Use a deterministic mock/demo provider first so the experience can be tested without API cost. Define the adapter around an OpenAI-compatible endpoint so Hermes/OpenClaw-style agents can be connected later.

Rationale: this lets us prove the game loop before solving every provider's authentication and memory model.

### Recommendation: make stay-here mode the required MVP path

Rationale: it lowers safety, location, and testing complexity while preserving the core magic. Travel becomes a powerful extension once the one-step loop is working.

### Recommendation: use “expedition persona” as a temporary placeholder

Keep the architecture and copy tokenised so the final name can change. Shortlist The Sibyl, The Augur, The Alchemist, and The Wayfinder for review.

### Recommendation: private archive by default

Mementos and prior expeditions should belong to the user, be visible to them, and be deletable. Sharing can be added later as an explicit action.
