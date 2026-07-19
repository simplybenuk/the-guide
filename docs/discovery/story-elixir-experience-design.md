# Story Elixir Experience Design — Discovery Brief

## Outcome

Evolve Story from one generic, three-scene proof of concept into a curated
family of individually authored interactive stories. Each cartridge should
prescribe the experience—premise, dramatic beats, choice grammar, consequences,
pacing, ending logic, and boundaries—while leaving the model freedom to perform
the prose, dialogue, sensory detail, and moment-to-moment transitions.

The core authoring test is:

> If two capable models play the cartridge, their sentences should differ but a
> player should recognise the same designed game and the same earned outcomes.

## Idea, problem, and opportunity

The current Story Elixir is a useful portability and lifecycle proof. It can
produce a responsive miniature fiction in one conversation, but it is too
abstract and too short to deliver the authored identity, dramatic accumulation,
meaningful replay, or satisfying closure expected of a polished interactive
story. Its title describes a content category rather than an experience, and
its only durable structure is Invitation -> Turn -> Return.

There is also a category error to avoid: improving Story should not mean asking
the model for a longer, cleverer roleplay. Unbounded generative freedom makes
the catalogue interchangeable and transfers game design to the runtime model.
At the other extreme, scripting prose and every local response would suppress
the conversational freshness that makes this medium valuable.

The opportunity is an authored-score model. The cartridge is analogous to a
playable dramatic score: it fixes what the experience promises and how its
dramatic machinery works, while the model performs that score responsively with
the player.

## Actors

- **Player:** chooses a specific experience from the cabinet, supplies bounded
  fictional choices, and expects those choices to be remembered and echoed.
- **Cartridge author / narrative designer:** owns the promise, premise, beats,
  branch topology, consequence logic, endings, content envelope, and duration.
- **Companion model:** stages the authored design conversationally, improvises
  expression within its limits, tracks compact state, and closes cleanly.
- **Curator / evaluator:** decides whether a cartridge is distinctive, complete,
  safe, replayable, and robust across supported harness classes.

## Known facts from the current product

- `content/elixirs/story.md` declares a 5–12 minute, low-energy,
  conversation-only experience and runs exactly three accepted scenes.
- Its player promise is a generic responsive fiction, not a named story premise.
- The three required scenes are Invitation, Turn, and Return; the last choice is
  followed by a concise consequence and memento.
- The current contract explicitly says it has one bounded adaptive arc, not an
  enumerated multi-ending system.
- It tracks names, fictional facts, and player choices in the current
  conversation, but defines no authored consequence variables, path identities,
  required callbacks, scene variants, or ending eligibility rules.
- The player chooses or excludes a genre at setup. This makes the model the
  effective premise and world author, weakening catalogue identity.
- The common covenant already provides valuable invariants: consent, one move
  at a time, boundaries, no gameplay tools, session-only state, immediate stop,
  groundedness, memento rules, and explicit role release.
- Existing catalogue metadata already supports duration, energy, movement,
  mechanic, tone, activity, inputs, replayability, content notes, access,
  audience, and locale, but most facets currently contain only broad alpha
  values.
- Published cartridge behavior is immutable by version, so this direction
  requires a new specification and new versions or new cartridge identities;
  it should not silently rewrite `story@0.1.0`.

## Critique of the current concept

### What is worth preserving

- **The bounded ritual works.** Consent, transformation, one decision at a time,
  stop, memento, and return give Elixirs a legible beginning and end.
- **Open-text choice suits conversation.** A player can express intent rather
  than select only from a menu.
- **Immediate consequence is required.** Scene 2 must respond specifically to
  Scene 1, which is the right foundation for agency.
- **The safety and reality boundary is unusually clear.** Fiction is never
  treated as diagnosis, recovered memory, or fact about the player.
- **A single-conversation scope is operationally elegant.** It avoids accounts,
  hidden saves, tools, and Guide-hosted transcripts.

### Where it falls short as a story product

1. **It promises a format, not a fantasy.** “A branching tale” does not tell the
   player who they will be, what they will face, or why tonight's play matters.
2. **Genre selection outsources authorship.** A model-generated fantasy after a
   genre prompt is closer to bespoke roleplay than a curated game.
3. **Three scenes allow response but not accumulation.** There is room for one
   setup, one turn, and one closure, but little escalation, reversal, intimacy,
   sacrifice, or payoff.
4. **The branch is rhetorical rather than structural.** A choice changes the
   next narration, but no authored path guarantees a genuinely different scene
   or later consequence.
5. **The ending is structurally singular.** Different wording may result, but
   there are no designed ending families with eligibility and thematic cost.
6. **Replayability is accidental.** Variation comes from model invention and
   player wording, not discoverable content or alternate authored routes.
7. **The model owns too much causal authority.** It invents the situation,
   obstacle, relationship, goal, and resolution, so authorial quality is hard to
   evaluate or reproduce across harnesses.
8. **Pacing is counted in scenes rather than dramatic function.** Equal-sized
   turns do not create intentional rhythm.
9. **No failure-recovery design exists for lost state.** A short run can survive
   this; a richer story needs compact recaps and explicit priority rules.
10. **The metadata cannot yet communicate the authored promise.** It lacks
    premise role, story shape, ending profile, emotional arc, intensity, and a
    useful replayability description.

The current cartridge should remain legible as a proof-of-concept or sampler.
It should not be stretched into the universal engine for every story. A strong
catalogue is better served by specific cartridges such as *One Night at
Blackwood Manor* than by one cartridge that asks the player to select “gothic.”

## Duration recommendation

There should be no universal Story Elixir duration. Duration is an authored
property of the premise and dramatic shape, not a player-selected quantity.

For the first polished story collection, the recommended flagship band is
**25–45 minutes**, usually **7–10 beats plus resolution**. This is long enough
for setup, two or three consequential decisions, escalation, reversal, a quiet
or relational beat, crisis, climax, and payoff, while still fitting comfortably
inside one normal conversation without a formal save system. A cartridge should
declare a narrower honest estimate within that band, such as 25–35 or 35–45.

Additional authored bands can exist:

- **Prelude, 10–20 minutes:** one sharp dilemma or chamber piece; 4–6 beats.
- **Feature, 25–45 minutes:** the default polished single-session story; 7–10
  beats.
- **Long feature, 50–90 minutes:** suitable only when the premise earns the
  length and the cartridge includes act breaks, in-world recaps, and context
  recovery. Long text exchanges can make actual play much slower than estimated.
- **Serial, multiple sessions:** a later format, not merely a long feature. It
  needs an explicit player-visible state capsule that can be copied between
  sessions and a design for safe re-entry; this is a product capability decision.

The time estimate should be based on representative playtests, not word-count
aspiration. Authors should specify a target turn budget and response-length
envelope. The model may compress description when time is short, but it must not
delete defining beats or change the ending logic to fit an arbitrary request.
If the player lacks the declared time, offer a different cartridge or let them
stop; do not silently produce an abridged imitation unless the author designed
an explicit short route.

## Design principle: prescribe the experience, not the prose

### The cartridge should prescribe

- the exact player promise and distinctive premise;
- the player's fictional role and the companion's dramatic role;
- the story's central question, themes, motifs, and forbidden contradictions;
- the opening situation and inciting event;
- required beats, their purpose, ordering constraints, and pace budget;
- branch points, the meaningful intent behind each choice, and the tradeoffs;
- consequence variables, thresholds, locks, and mandatory callbacks;
- which alternate scenes must be substantively different on replay;
- climax variants, ending families, eligibility, cost, and closure obligations;
- information economy: what is true, when it can be revealed, and what remains
  ambiguous;
- interaction grammar, allowed inputs, handling of off-menu choices, refusal,
  pause, stop, recap, and state repair;
- content boundaries, intensity ceiling, and any genre-specific safety rules;
- approximate response length and overall duration;
- memento form and what prior choices it must encode; and
- validation scenarios and observable acceptance criteria.

### The model should be free to perform

- sentence-level prose, cadence, metaphor, and sensory detail;
- dialogue wording and incidental character mannerisms;
- connective tissue between specified dramatic events;
- bounded environmental details consistent with the world bible;
- how an allowed open-text action is mapped to an authored choice intent;
- minor callbacks that do not invent new state or alter eligibility;
- moment-to-moment warmth, humour, suspense, and descriptive density within the
  declared tone and pace; and
- names or cosmetic details only where the author explicitly marks a slot as
  variable.

### The model should not be free to

- replace the premise, central conflict, required beats, or authored reveal;
- invent a third solution that nullifies a designed tradeoff;
- reward all choices equally or steer toward a preferred “correct” ending;
- retcon established facts, relationships, costs, clues, or state;
- skip consequences because a smoother paragraph is easier;
- introduce an unplanned villain, twist, deus ex machina, sequel hook, or moral;
- infer facts or traits about the real player from fictional decisions; or
- extend play after the authored resolution and release.

This boundary should be machine- and human-reviewable. “Be dramatic” is prose
direction; “the rejected invitation returns as evidence during the accusation”
is experience direction.

## Proposed authoring template

### 1. Catalogue promise

- Title and one-sentence player promise
- Hook: role + situation + consequential verb
- Estimated duration band and turn budget
- Energy, movement, reading intensity, emotional intensity
- Genre, themes, tone, and content notes
- Replay promise stated concretely
- Ending count and ending structure

### 2. Dramatic contract

- Player's fictional role and what the cartridge must never decide about them
- Companion role and relationship to the player character
- Central dramatic question
- Desired emotional arc
- World truths and premise invariants
- Motifs or images to echo
- Content envelope and excluded devices
- Completion condition and intended aftertaste

### 3. Interaction contract

- Primary choice grammar, such as allegiance, investigation, sacrifice, or
  interpretation
- Whether choices are open text, authored options, or hybrid
- How to map unexpected but valid actions to a choice intent
- What counts as an accepted beat
- Response-length target and one-decision-at-a-time rule
- Boundary change, refusal, pause, stop, and clarification handling
- Recap trigger and in-world recap device

### 4. State model

Keep the state small and semantically named. A typical feature should use:

- 2–4 **path variables**, usually ordinal or categorical rather than scores;
- 0–3 **relationship or resource flags**;
- 2–5 **knowledge / object / promise flags**; and
- a short **callback ledger** containing player-authored phrases or decisions.

For every state item define: allowed values, which beat can change it, which
later beats must read it, whether it gates a scene or ending, and how it can be
restated in-world. Do not track personality scores or diagnose the player.

### 5. Beat map

For each beat specify:

- ID and dramatic function
- entry requirements
- facts that must be established
- pressure or question introduced
- allowed model improvisation
- player decision and underlying choice intents
- immediate state changes
- required later echo
- exit condition
- target turn count and pace
- fallback if state is missing, ambiguous, or contradictory

Beats may be required, conditional, alternate, or merge beats. They need not be
called “scenes” to the player.

### 6. Branch topology

- Draw the authored route graph
- Identify branch points, alternate beats, merge points, and locked content
- State which branches must produce different scenes rather than cosmetic text
- List reconvergence invariants and the state that survives reconvergence
- Cap the number of simultaneously live route distinctions

### 7. Climax and endings

For each ending family define:

- eligibility rule
- final choice or consequence that earns it
- cost: what cannot also be preserved
- required callbacks from earlier play
- relationship/world outcome
- emotional note
- closure facts that must be explicit
- permitted prose variation
- memento variant

Count ending families, not every cosmetic epilogue combination. Three or four
strong families with state-shaped variants are normally better than dozens of
labels.

### 8. Performance direction

- Voice, tense, viewpoint, dialogue ratio, and descriptive density
- Tone range and intensity ceiling
- Examples of acceptable variation, not scripts to copy
- Words, tropes, exposition habits, or stylistic contradictions to avoid
- Rules for reminding the player of actionable context without dumping state

### 9. Evaluation deck

- representative path to every ending family
- two replays that must expose substantively different beats
- off-menu choice mapping
- early choice callback test
- lost/contradictory state recovery
- premature solution or climax attempt
- refusal, pause, changed boundary, stop, and role-release tests
- no-win tradeoff integrity test
- harness comparison: same designed experience, varied prose

## Branching without exponential complexity

Use a **braided branch-and-bottleneck** structure rather than a full binary tree.
The story alternates between authored divergence and purposeful reconvergence:

```text
Common opening
  -> route choice A / B / C
  -> one route-specific beat
  -> shared pressure beat that reads route state
  -> relationship or method choice
  -> one of two alternate crisis beats
  -> shared climax frame with state-dependent options
  -> 3–4 ending families with tailored epilogues
```

Reconvergence is not erasure. A shared beat must visibly acknowledge how the
player arrived, preserve at least one consequence, and alter available language,
assets, relationships, knowledge, or climax options. If all routes lead to the
same scene with adjectives changed, the branch is not meaningful.

Recommended constraints for a 25–45 minute feature:

- 2–3 major decision axes, each about a real dramatic value;
- 2–3 route-specific mid-story beats total per run, selected from a larger pool;
- no more than 3 simultaneously live route identities;
- 3–4 authored ending families;
- 1–2 cosmetic epilogue variants per family;
- every major choice receives an immediate response and at least one later echo;
- at least one early choice changes a later scene, not just the final paragraph;
- endings are resolved from explicit state and the final choice, never model
  taste.

Useful compression patterns:

- **Foldback with residue:** routes reconverge, but a flag changes the shared
  scene and climax affordances.
- **Hub and spokes:** the player chooses which two of several authored locations
  or relationships to explore; unvisited content drives replay.
- **Role substitution:** the same functional beat is staged with a different
  ally, rival, or resource based on earlier allegiance.
- **Delayed consequence:** an early promise, lie, gift, or omission returns at a
  fixed later beat.
- **Resource tradeoff:** one scarce token—time, trust, evidence, invitation—can
  solve different problems but not all of them.
- **Ending matrix:** combine one dominant path variable with the final decision,
  then author only the meaningful cells and merge equivalent ones.

Open-text choices should be classified by intent. The model may ask one concise
clarifying question when an action maps to multiple materially different
intents; it must not create a new branch casually. Truly novel actions should
be honoured through local prose and mapped to the closest valid consequence,
unless they violate a premise invariant or bypass a necessary tradeoff.

## Metadata every Story Elixir should expose

Separate player-facing discovery metadata from authoring/runtime metadata. The
cabinet should remain legible; the full cartridge can expose deeper design data.

### Required player-facing metadata

- Title, cover art, version, publisher, lifecycle, compatibility evidence
- One-sentence player promise and short premise
- Estimated minutes as an author-declared range
- Session shape: single sitting, long sitting, or serial
- Mental energy and reading intensity
- Movement / physical demands
- Player role and interaction style
- Genre and themes
- Emotional tone and intensity
- Content notes and configurable boundaries
- Replayability level plus a plain-language replay promise
- Number of ending families and whether any are failure / bittersweet endings
- Choice mode: open text, authored options, or hybrid
- Required player inputs and data/memory behavior
- Gameplay capability and accessibility considerations
- Language / locale

### Required cartridge/runtime metadata

- Beat count range and target turn budget
- State complexity class
- Branch topology class
- authored route and alternate-scene counts
- ending family IDs and count
- recap strategy
- save / resume support, normally `current_conversation_only`
- response-length envelope
- covenant and content-schema versions
- evaluation coverage status

Avoid presenting “20 endings” when these are combinatorial epilogue permutations.
Use honest labels such as “3 distinct endings, each reflecting your alliances.”
Replayability should be an editorial claim backed by authored alternate content,
not inferred from the fact that model wording changes.

## Library taxonomy

Browsing should begin with the experience a player wants, not a literary filing
system. Use facets plus a small number of curated shelves.

### Primary facets

1. **What you do / choice grammar:** investigate, negotiate, protect, explore,
   create, perform, survive, reconcile, deceive, judge.
2. **Time and session shape:** Prelude (10–20), Feature (25–45), Long feature
   (50–90), Serial.
3. **Emotional promise:** cosy, wondrous, romantic, tense, eerie, melancholy,
   comic, hopeful, morally thorny.
4. **Mental energy / reading intensity:** low, moderate, high.
5. **Genre:** romance, mystery, fantasy, science fiction, gothic, historical,
   adventure, comedy, folklore, drama.
6. **Social shape:** solo protagonist, duo with companion, ensemble, rivals,
   caretaker relationship.
7. **Story shape:** chamber drama, one-night event, journey, investigation,
   heist, ritual, rescue, competition.
8. **Replay structure:** alternate routes, different allies, hidden scenes,
   variable culprit, moral endings, serial continuity.
9. **Content and intensity:** transparent notes, threat level, romance level,
   loss / grief, conflict, and user-selectable boundaries.
10. **Access and input:** conversation only, no movement, audio-unnecessary,
    short responses accepted, language / locale.

### Curated shelves

- Finish tonight
- Gentle mysteries
- One extraordinary evening
- Difficult choices, no wrong answer
- Play twice: the other side changes everything
- Low-energy adventures
- Stories for two: you and your companion
- Bittersweet endings
- Start with Story Elixirs

Genre and theme remain useful filters but should not dominate the cabinet.
“Attend a dangerous ball and decide whose secret survives the night” is a
stronger discovery promise than “Regency / romance.”

## Twenty candidate Story Elixir concepts

These are product concepts, not generic setting prompts. Each has a fixed
dramatic promise, an authored branch engine, and a bounded ending profile.

| Title | Promise and authored shape | Duration / replay structure |
| --- | --- | --- |
| **The Last Lighthouse** | Keep one impossible final watch while three ships signal contradictory truths. Choose what the light guides home and what remains in the dark. Beats move from routine to signals, an old logbook reversal, storm crisis, and dawn reckoning. | 30–40 min; routes centre on which signal is trusted; 3 endings: rescue, revelation, release. |
| **One Night at Blackwood Manor** | As the only guest without an alibi, navigate a dinner, a vanished portrait, and a midnight accusation. The culprit is fixed by the cartridge; the player's alliances determine which clues and confrontation become available. | 45–60 min; ally-specific investigation scenes; 4 endings with truth, loyalty, and reputation in tension. |
| **The Regency Ball** | Arrive with one family obligation and one private hope; spend five dances choosing between affection, duty, and scandal before the final waltz makes one cost unavoidable. | 25–40 min; different dance partners reveal exclusive scenes; 4 romantic/social endings, none universally best. |
| **The Clockmaker's Apprentice** | Repair a clock that removes one regret from the town each time it strikes, then decide whether your master's missing memory should be restored. | 30–45 min; repair-method and confidant branches; 3 endings shaped by mercy, truth, and inheritance. |
| **The Empty Railway Station** | At a station omitted from every timetable, decide which of three waiting passengers may board the last train—and whether you belong among them. | 25–35 min; passenger-focused quiet scenes; 4 endings with early acts of attention echoed in the ticket inspection. |
| **A Feast for the Sleeping Giant** | Prepare a ceremonial meal from three impossible ingredients while rival villages disagree about whether the giant should wake. | 35–45 min; ingredient choices alter journey beats and the giant's need; 3 civic endings plus tailored village epilogues. |
| **The Museum After Midnight** | As a new night curator, return one escaped exhibit before dawn while deciding whether the museum's version of its history deserves preservation. | 30–45 min; choose two of four galleries; unvisited exhibits and curator alliances create replay; 4 endings. |
| **Seven Minutes on the Moon** | During a communications blackout, choose how to use seven narrated minutes before an irreversible launch decision. The companion plays mission control with incomplete but authored information. | 15–20 min; compact real-time-feeling dilemma; 3 endings based on evidence, trust, and risk. |
| **The Orchard of Borrowed Names** | Recover your fictional name from trees bearing other people's abandoned identities without taking a name that still belongs to someone. | 25–35 min; three grove routes expose different rules; 3 identity endings without interpreting the real player. |
| **The Dragon's Retirement Interview** | Interview a dragon applying to become village librarian while a heroic inspector tries to prove monsters cannot change. | 20–30 min; comic questioning mechanics and evidence callbacks; 4 endings balancing belonging, safety, and dignity. |
| **Dinner at the End of Tomorrow** | Host a final dinner for three future versions of the same city, each asking you to preserve a different object tonight. | 30–40 min; guest order changes revelations; final preservation choice yields 3 futures and relationship variants. |
| **The Cartographer of Vanishing Roads** | Complete one last map as roads disappear behind you; decide whether maps should preserve lost places or allow them to be forgotten. | 40–55 min; choose two routes from four; map marks recur at the crisis; 3 endings and distinct travel scenes. |
| **The Choir Beneath the Ice** | Decode a song heard through a frozen observatory floor before the thaw silences it. Choose whether it is warning, invitation, or memorial. | 35–50 min; investigation method unlocks different verses; 3 interpretation endings grounded as fiction. |
| **The Smallest Kingdom's Election** | Serve as neutral keeper of a one-room kingdom while three household objects make persuasive claims to the tiny throne. | 20–30 min; playful debate and precedent-setting choices; 4 governance endings with recurring legal consequences. |
| **Letters from the House That Never Was** | Receive three letters from rooms erased from your fictional family home and decide which room may return at the cost of the others. | 25–40 min; reading order and replies unlock different room scenes; 3 bittersweet endings, no real-memory claims. |
| **The Midnight Ferry for Monsters** | Inspect five unusual passengers on the last ferry, knowing one carries a curse that may instead be a plea for sanctuary. | 35–50 min; passenger trust and limited inspection tokens; 4 endings shaped by whom the player protected or exposed. |
| **A Duel of Impossible Etiquette** | Win a diplomatic duel where compliments wound, insults heal, and silence changes the rules. Prevent a war without conceding the point that brought you there. | 20–35 min; conversation tactics alter leverage; 3 endings: accord, principled loss, elegant stalemate. |
| **The Weather Shop's Final Day** | Sell the last bottled weathers to customers whose needs conflict, then choose what climate the abandoned shop releases into the street. | 25–35 min; limited inventory creates recurring consequences; 4 endings and customer-specific return scenes. |
| **The Astronomer's Last Guest** | Help an astronomer decide which newly discovered constellation will replace one the empire has outlawed. Every naming choice preserves one history and obscures another. | 30–45 min; archive, court, and rooftop routes; 3 endings shaped by truth, safety, and public memory. |
| **The Door in Seat 14B** | On an overnight train, a door appears where the window should be. Choose two fellow passengers to consult before deciding whether to open it, seal it, or send something through. | 25–40 min; companion selection produces genuinely different scenes and climax options; 4 endings. |

The first production slate should select 3–5 concepts that deliberately differ
in choice grammar, tone, duration, and branch topology. Producing twenty at once
would dilute evaluation and curation.

## Where the current Story cartridge should be more prescriptive

- Replace player-selected genre generation with one authored premise per
  cartridge. Genre boundaries can remain as exclusions, not premise selection.
- Specify the player's fictional role without assigning internal motives,
  identity traits, or a detailed personality.
- Define a beat map rather than exactly three generic scenes.
- Give every decision an authored dramatic axis and consequence mapping.
- Track compact named state, with required later reads and callbacks.
- Define route-specific scenes and what makes each substantively distinct.
- Fix world truths, reveals, culprit / cause logic, and information timing.
- Define climax eligibility and 3–4 ending families with tradeoffs.
- Require closure of the central question and a memento that reflects earned
  state.
- Set pacing and response-length budgets so “25–35 minutes” is credible.
- Add in-world recap / state-repair rules for longer features.
- Specify how off-menu choices map into the authored graph.
- Evaluate branch integrity and cross-model experience consistency, not only
  safety and completion.

## Where it should deliberately leave creative freedom

- Exact narration, dialogue, imagery, transitions, and incidental details
- The player's appearance, motives, feelings, and voice unless they volunteer
  them in the current fiction
- Cosmetic names and details explicitly designated as variable slots
- Local reactions that honour the state without changing causal structure
- Tone modulation inside the declared range
- Concision and descriptive density inside the beat's pace budget
- Natural phrasing of recaps inside authored devices such as a dance card,
  captain's log, case board, letter, inventory, or companion conversation
- Graceful interpretation of free-text player intent, including one clarifying
  question when necessary

The rule is not “specific structure, arbitrary prose.” Performance freedom is
still bounded by viewpoint, tone, world truth, content limits, and pace. The
model is an actor, narrator, and responsive scene partner—not an uncredited game
designer changing the score during performance.

## Scope and non-goals for the next specification

### Recommended scope

- Define a Story Elixir authoring schema and conformance model.
- Select one 25–45 minute flagship premise and author its full beat map, state,
  branch graph, endings, recap, and evaluation deck.
- Decide whether the generic Story Elixir remains a sampler, is renamed, or is
  superseded in catalogue recommendations without mutating version `0.1.0`.
- Extend metadata and taxonomy only as needed to publish and compare that
  flagship honestly.
- Test experience invariance and prose variability across at least two supported
  harness/model configurations, subject to the project's evidence rules.

### Non-goals

- An unlimited prompt generator or player-built premise generator
- Twenty simultaneous production cartridges
- A community author marketplace or creator SDK
- Long-term hidden memory, accounts, or Guide-hosted transcripts
- An arbitrary player-selectable duration slider
- A universal runtime that guarantees perfect state tracking in every model
- Multi-session campaigns until portable state and re-entry are separately
  specified
- Scoring player personality, morality, or psychological traits

## Assumptions

- The primary near-term actor wants a complete single-session story with their
  existing conversational agent.
- First-party curation remains the product strategy during this phase.
- Conversation-only, tool-free play and the common covenant remain invariants.
- A 25–45 minute feature can remain reliable with compact explicit state and one
  or two natural recaps, but this must be tested rather than assumed.
- Narrative variation in wording is valuable only after the designed identity
  and causal structure remain stable.
- Some players prefer shorter or longer work; the library should satisfy that
  through different authored cartridges, not runtime stretching.

## Decisions still needed

1. Which one concept should become the flagship reference cartridge?
2. Should “The Story Elixir” remain a 5–12 minute sampler, be retired from the
   recommended catalogue, or become a format-level label rather than a title?
3. Is 25–45 minutes acceptable as the first flagship band, or should the first
   production test deliberately stay at 20–30 to reduce context risk?
4. Should authored choices be presented as hybrid prompts—2–3 legible options
   plus “or act in your own words”—or remain open-text only?
5. Which metadata belongs in the immutable cartridge versus editorial catalogue
   projection, especially subjective intensity and replay claims?
6. Is multi-session Story a near-term product direction or explicitly deferred?
7. What level of alternate content qualifies for labels such as “highly
   replayable”?

## Materially different directions

### A. One generic adaptive Story engine

Keep one Story Elixir and add a richer universal beat grammar. This preserves a
small catalogue and maximises bespoke variation, but premise identity and
quality remain model-authored. It is the weakest fit for curated-game positioning.

### B. Individually authored story cartridges — recommended

Publish each title as a complete dramatic score with a shared Story authoring
contract. This creates the strongest promises, cleanest evaluation, and most
meaningful replay. Its cost is real narrative design and content testing per
title, which is appropriate if The Guide intends to curate games.

### C. Authored story worlds with generated episodes

Fix a world, cast, themes, and mechanics while the model generates a new episode
within them. This can support repeat play with less authored content, but it
reintroduces variable plot quality and makes earned endings harder to guarantee.
It may be a later distinct Elixir type, not the default Story format.

### D. Modular authored beat packs

Build stories from interchangeable invitations, reversals, crises, and endings
tagged by compatibility. This scales content but risks visible formula and
combinatorial continuity failures. It is premature before one hand-authored
reference proves the design language.

## Success signals

- Before play, a visitor can state the specific fantasy and likely activity in
  one sentence without reading the cartridge.
- A representative first play reaches a resolved central dramatic question
  inside the declared time range.
- Players can identify at least two earlier choices in the climax or resolution.
- Replays expose at least one genuinely different scene and a meaningfully
  different ending route, not only different wording.
- Most players describe choices as consequential and endings as earned rather
  than arbitrary or model-favoured.
- Across evaluated models, premise, beats, truths, consequence logic, and ending
  eligibility remain stable while prose and local performance noticeably vary.
- The model does not bypass tradeoffs, invent ending rules, retcon state, or
  continue after release in representative adversarial paths.
- Duration estimates fall within a defined tolerance in playtests; outliers lead
  to pacing edits or metadata changes rather than runtime stretching.
- Catalogue replayability claims correspond to authored alternate content and
  evaluation evidence.

## Risks and dependencies

### Risks

- Longer conversations increase state loss, instruction drift, verbosity, and
  incomplete-play risk.
- Over-prescription can make the model sound like a clumsy script reader;
  under-prescription returns the product to generic roleplay.
- Reconvergence can create false agency if residue is merely cosmetic.
- Open-text actions can appear to promise limitless simulation that the authored
  graph cannot honour.
- A large catalogue creates a writing, sensitivity, maintenance, and branch-test
  burden.
- “Number of endings” and “replayability” can become misleading marketing metrics.
- Model/harness changes can alter pacing and instruction adherence even when the
  cartridge is immutable.
- Content-note and emotional-intensity taxonomies require editorial consistency.

### Dependencies

- A versioned Story authoring schema distinct from the common safety covenant
- A compact, inspectable in-conversation state convention
- Catalogue schema and taxonomy changes for the new discovery metadata
- A branch coverage and narrative conformance evaluation approach
- Representative timed playtests across named harness configurations
- A selected flagship concept and human-approved creative direction
- Version/provenance handling for any new or superseding cartridge

## Specification readiness and recommended next step

The direction is ready for `bwh-spec` once the owner selects a flagship concept
and confirms the first target duration band. The recommended default is Option
B, a 25–45 minute single-session feature with hybrid choice presentation, 7–10
beats, 2–3 major decision axes, 3–4 ending families, and a visible in-world recap.
The specification should define the reusable Story authoring contract and one
complete reference cartridge; it should not yet implement the other concepts.
