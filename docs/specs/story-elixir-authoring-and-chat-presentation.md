# The Guide — Authored Story Elixirs and Chat Presentation Specification

## Status

**NOT READY FOR HUMAN TESTING**

The repository owner approved this specification for development on 2026-07-19.
S01–S07 local implementation and independent review completed on 2026-07-19
with no remaining local blocking or should-fix finding. The exact candidate is
ready for owner code/content review. Formal human output testing remains blocked
solely by the separately authorized Regency-specific live-harness evidence in
E07. The Regency Ball currently has zero live harness runs; it requires complete
versioned evaluation in two named harness classes, including at least one
consumer or personal-agent class.

On 2026-07-19 the repository owner explicitly authorized commit, push, and an
experimental GitHub Pages publication so they can collect the missing live
harness evidence. This is a narrow lifecycle refinement: local and independent
review plus immutable source/provenance binding are sufficient for an
`experimental` live-test release. E07 remains mandatory before any compatibility
promotion or `READY FOR HUMAN TESTING` verdict. The generic Story release remains
published and is not superseded by this refinement.

## Objective and scope

Define a reusable first-party authoring contract for curated Story Elixirs and
prove it with one complete reference cartridge, **The Regency Ball**.

The format must prescribe the experience—premise, dramatic beats, cast,
interaction grammar, state, branch topology, consequences, pacing, endings,
content limits, and completion—while leaving the companion model freedom to
perform the prose, dialogue, sensory detail, and connective narration.

The work also establishes a portable chat presentation contract for Story
Elixirs. A story may contain a narrator and multiple speaking characters. On any
player turn, the player may participate through:

- **speech:** answer or address a character in their own words;
- **action:** describe what their fictional character does; or
- **decision:** choose or state a course of action, including an authored option.

These modes may be combined in one response. They are equally valid inputs to
the authored story; formal choices are not the only source of agency.

The Guide remains a static publisher. The story runs in a third-party harness,
so this specification controls semantic Markdown composition and plain-text
fallbacks, not harness-owned bubbles, avatars, fonts, colours, or layout.

## Problem and desired outcome

The current Story Elixir is a useful 5–12 minute portability proof, but it asks
the model to invent a genre, situation, relationship, conflict, and resolution
inside exactly three scenes. It can respond to a player's words, but it does not
contain authored alternate scenes, consequence state, ending eligibility, or a
distinctive catalogue promise. Its replayability comes mainly from generation,
not discoverable designed content.

Extending that generic prompt would produce longer roleplay without reliably
producing a curated game. Scripting every line would create the opposite
problem: the conversational model would add little value and player speech
would be difficult to honour naturally.

The desired player outcome is:

> I choose a particular story, enter a clearly staged world with a narrator and
> recognisable characters, and take part by speaking, acting, or deciding. The
> story responds without losing its authored shape, remembers what mattered,
> and reaches an earned ending within its promised time.

## Work type

This is product-design, narrative-design, cartridge-content, schema, catalogue,
static presentation, accessibility, safety, and cross-harness evaluation work.
It does not add a hosted chat interface, application runtime, database, model
provider, or gameplay tool capability.

## Actors

### Player

Chooses a specific authored experience, consents to play, sets a content
boundary, and participates as a fictional character through natural dialogue,
described action, explicit decisions, or a mixture of these.

### Companion model

Temporarily performs the Story Elixir's narrator and non-player characters,
stages the authored beat map, interprets player intent, maintains compact state,
and returns to its ordinary identity at completion or stop.

### Cartridge author / narrative designer

Owns the experience promise, fictional role, cast, world truths, dramatic
question, beat purposes, branch graph, choice and conversation intents,
consequences, ending families, pacing, content envelope, and evaluation deck.

### Catalogue curator / evaluator

Publishes honest discovery metadata and verifies that the same designed game is
recognisable across supported harnesses even though its prose varies.

## Governing constraints

- The current common covenant continues to govern authority, consent, privacy,
  tools, grounding, boundaries, pause, stop, and role release.
- Gameplay remains conversation-only after cartridge loading.
- The Guide receives no transcript, provider credential, boundary, state, or
  memento.
- The harness owns rendering, context capacity, model behaviour, memory, and
  ambient permissions.
- Cartridges remain self-contained transparent Markdown with no remote includes,
  executable content, hidden semantics, or model-specific control tokens.
- Published cartridge bytes are immutable. Behaviour changes require a new
  version or identity and release-ledger entry.
- Compatibility claims remain scoped to named cartridge versions and completed
  evidence.
- Public release, external publication, live deployment, and external harness
  testing require the existing human authorization gates.
- The current Story Elixir `the-guide.elixir.story@0.1.0` must not be rewritten.

## Goals

- Make each Story Elixir a named, authored experience rather than a generic
  genre prompt.
- Establish “prescribe the experience, not the prose” as an enforceable
  authoring boundary.
- Support player agency through speech, action, decision, or combined responses.
- Present narrator and character voices consistently in ordinary chat Markdown.
- Use intentional beats and pacing rather than a universal three-scene arc.
- Make earlier choices and meaningful statements recur as later consequences.
- Provide substantively different replay routes without exponential branching.
- Produce a complete dramatic arc and earned ending inside an author-declared
  duration.
- Keep story state compact, inspectable in the cartridge, and recoverable in
  conversation without external saves.
- Extend catalogue metadata so a player can choose by promise, demands,
  interaction style, emotional tone, replay design, and endings.
- Validate designed-experience consistency separately from prose variation.
- Prove the format with *The Regency Ball*, a dialogue-rich single-session
  reference story.

## Non-goals

- A generic prompt that generates arbitrary premises or complete stories
- Player-selected arbitrary duration or automatic story stretching
- A hosted or custom chat UI
- Control over third-party chat bubbles, avatars, fonts, colours, or Markdown
  rendering details
- A complicated save system, account, central state, or Guide-hosted transcript
- Multi-session stories in this iteration
- More than one new production Story cartridge
- Production of the other nineteen discovery concepts
- Community publishing, a creator SDK, marketplace, ratings, or moderation
- Procedural branch generation or model-authored ending rules
- Full binary choice trees, dozens of ending labels, scoring, or achievements
- Multiplayer, tools, real-world activity, or external side effects
- Psychological, personality, morality, or diagnostic scoring of the player
- Rewriting or deleting published Story version `0.1.0`

## Product decisions

1. **Story is a family, not one universal cartridge.** Individually titled
   cartridges carry specific promises. “Story Elixir” is the product type.
2. **The first reference is *The Regency Ball*.** This is a labelled assumption
   resolved by human approval of this specification.
3. **Duration is author-owned.** The reference targets 30–40 minutes; the
   reusable format permits other declared bands.
4. **The reference is single-session.** It uses current-conversation state and
   one in-world recap, with no external save.
5. **Interaction is multimodal within text.** Speech, action, and decisions are
   first-class and may all change authored state.
6. **Hybrid prompts are the default.** The model may show 2–3 authored approaches
   when useful, but the player may always respond naturally unless a deliberately
   closed ritual choice is clearly identified by the author.
7. **The transcript standard is semantic Markdown.** Speaker labels and turn
   labels must remain understandable when styling is stripped.
8. **Narrator and cast are separate performed voices.** The model may perform
   both but must not blur who is speaking or speak for the player.
9. **Branching uses a braided branch-and-bottleneck graph.** Reconvergence must
   preserve visible residue.
10. **Ending families are authored.** The model resolves eligibility from
    explicit state and final action; it does not invent or favour an ending.
11. **The generic Story proof remains historical.** Implementation adds a new
    ID for *The Regency Ball* and supersedes the generic Story only in mutable
    catalogue recommendation/lifecycle state, preserving all immutable bytes and
    version paths.

## Functional requirements

### FR-1: Story identity and promise

1. Every new Story Elixir must have a distinctive proper title, premise, player
   role, central dramatic question, and completion promise.
2. A title must identify the particular experience rather than only its genre or
   mechanic.
3. The cartridge must fix the story's genre and core premise. Setup may collect
   exclusions and boundaries but must not ask the player to generate the genre.
4. The catalogue promise must state what the player will do and what kind of arc
   they can expect without revealing protected twists or optimal routes.
5. The cartridge must declare an honest author-owned time range and session
   shape.
6. A player who lacks the declared time must be allowed to decline or choose a
   different Elixir. The model must not silently remove defining beats or alter
   ending logic to fit a shorter request.
7. An author may define an explicit abridged route only when it has its own beat
   map, promise, duration, and evaluation coverage. The reference cartridge has
   no abridged route.

### FR-2: Authored experience contract

1. Every Story cartridge must prescribe:
   - player and companion roles;
   - cast and relationship functions;
   - central dramatic question;
   - world truths and reveal timing;
   - themes, motifs, emotional arc, and content envelope;
   - required, conditional, alternate, merge, climax, and resolution beats;
   - player interaction moments and their valid intent classes;
   - state mutations, later reads, and mandatory callbacks;
   - branch graph, reconvergence residue, ending eligibility, and ending cost;
   - pacing and response-length envelope;
   - recap and state-repair behaviour;
   - memento form; and
   - evaluation paths.
2. The companion model may freely perform sentence-level prose, dialogue
   wording, consistent sensory detail, incidental mannerisms, and connective
   transitions inside those constraints.
3. The model must not replace the premise, skip defining beats, retcon world
   truth, nullify tradeoffs, invent a new branch or ending, select a preferred
   ending, introduce an unauthored twist, or force a sequel.
4. Slots that permit model invention, such as a minor name or cosmetic object,
   must be explicitly marked. Unmarked story facts are fixed or player-created.
5. The player character's thoughts, emotions, motives, identity, appearance,
   dialogue, and unchosen actions must never be authored by the model as fact.

### FR-3: Player interaction modes

1. Every interactive beat must accept one or more of these text modes:
   - `speech`: the player says something in character;
   - `action`: the player describes a fictional action;
   - `decision`: the player selects or states a course; and
   - `combined`: one response contains speech plus action or decision.
2. The player must not be required to label or format their mode. Plain natural
   language is sufficient.
3. A direct answer to a character's question must be treated as valid in-world
   speech unless the player clearly speaks out of character.
4. Quotation marks, first-person phrasing, stage directions, an option number,
   an option phrase, or ordinary prose may all communicate valid intent.
5. The model must not insist that the player choose a displayed option when a
   free-text response maps to an authored intent.
6. The model may ask at most one concise clarifying question when the response
   maps to multiple materially different authored intents. Clarification does
   not consume a beat or interaction moment.
7. A novel valid response may alter local performance but must map to the
   nearest authored intent and consequence. It must not create an unplanned
   route, bypass a fixed cost, contradict a world invariant, or grant an
   unavailable resource.
8. If no mapping is honest, the model must explain the immediate fictional
   constraint in character or narrator voice and invite a nearby valid response.
9. A conversation response may be:
   - **expressive**, affecting dialogue, callback language, or relationship
     texture without exiting the beat; or
   - **committing**, changing path state or satisfying the beat exit.
10. The author must identify every committing interaction and its stakes. Casual
    dialogue must not secretly lock an ending or consume a scarce resource.
11. A beat may contain up to two expressive exchanges before its committing
    interaction when the author budgets them. The model must not prolong
    dialogue indefinitely or repeatedly ask for more detail.
12. The player may speak to any present character. If the addressed character is
    not the beat's committing interlocutor, the model may answer briefly and
    return the unresolved pressure without pretending the beat is complete.

### FR-4: Narrator and character performance

1. The companion model may perform one narrator and multiple non-player
   characters defined by the cartridge.
2. The narrator owns scene framing, transitions, sensory context, consequence
   narration, and concise recaps. The narrator must not become an additional
   decision-making character unless explicitly authored as one.
3. Each character must have a stable name, pronouns, public desire, hidden or
   developing knowledge where relevant, relationship function, voice cues, and
   boundaries on what they can know or do.
4. Character speech must remain consistent with authored knowledge. A character
   cannot reveal information before its permitted beat or know private player
   intent that was not spoken or enacted.
5. The model must never generate the player's dialogue or claim that the player
   agreed, felt, remembered, intended, or acted when they did not.
6. When a character asks a question, the interactive turn may simply invite the
   player to answer them. It does not need to append a menu of choices.
7. Character questions must have a dramatic purpose defined in the beat map:
   reveal, relationship pressure, information choice, promise, challenge, or
   commitment.
8. Minor incidental characters may be narrated collectively only when they do
   not make decisions, hold clues, or require state tracking.
9. No assistant message should use more than three named speaking-character
   blocks unless the cartridge marks an exceptional ensemble beat and testing
   shows it remains legible.

### FR-5: Portable chat presentation contract

1. Every Story Elixir must use the following semantic blocks when applicable:
   - `**Narrator**` on its own line before narrated prose;
   - `**Character Name**` on its own line before that character's spoken words;
   - `**Your turn**` on its own line before the current question, pressure, or
     invitation to respond; and
   - `**Possible approaches**` before optional authored approaches.
2. Each block label must be followed by content on a new line. A new speaker
   requires a new labelled block.
3. Character dialogue must use quotation marks. Narration must not use quotation
   marks merely to simulate another unlabeled speaker.
4. The format must remain understandable when Markdown renders as plain text.
   Styling may aid scanning but cannot carry speaker identity by itself.
5. Colour, emoji, icons, tables, HTML, images, custom components, alignment, and
   font styling must not be required to distinguish narrator, characters,
   choices, or player action.
6. The model must not prefix every paragraph with a label. Consecutive paragraphs
   from the same narrator or character belong under one label.
7. Optional location/time datelines may appear in italics after `**Narrator**`,
   but must not expose internal beat IDs, state, ending eligibility, or future
   branches.
8. `**Your turn**` must contain one current interaction focus. It may explicitly
   say that the player can answer, act, or decide when this helps onboarding.
9. `**Possible approaches**` must contain 2–3 concise bullet items. They are
   affordances, not exhaustive commands, unless the author has declared a
   closed ritual choice and the narrative explains why it is closed.
10. When approaches are shown, the message must also permit a response in the
    player's own words. The standard invitation is: “Or respond in your own
    words—speak, act, or decide.” It may be shortened after the first use.
11. A character's question and `**Your turn**` must not redundantly ask two
    different questions. The turn label may repeat or briefly clarify the same
    interaction focus.
12. Out-of-character lifecycle notices, consent, safety redirection, pause,
    stop, state-repair disclosure, and release must not be attributed to a
    fictional character. They remain ordinary companion voice as required by
    the covenant.
13. The first active story turn must teach the three interaction modes in no
    more than one sentence. Later turns need not repeat the full instruction
    unless the player appears unsure.
14. The following is the normative structural example; its prose is illustrative
    and not a script:

   ```markdown
   **Narrator**

   The orchestra falls quiet as the final invitation is placed in your hand.

   **Lady Harcourt**

   “Tell me plainly: did you come tonight for your family, or for yourself?”

   **Your turn**

   Answer Lady Harcourt, describe what you do, or decide where your loyalty
   lies.

   **Possible approaches**

   - Protect your family's arrangement.
   - Admit what you privately hoped for.
   - Deflect and ask what she stands to gain.

   Or respond in your own words—speak, act, or decide.
   ```

15. A direct character exchange may omit `**Possible approaches**`:

   ```markdown
   **Mr Vale**

   “If I asked you to leave before the final waltz, would you trust me?”

   **Your turn**

   What do you say or do?
   ```

### FR-6: Beat and pacing model

1. A Story cartridge must define beats by dramatic function, not require a
   universal scene count.
2. Each beat must specify ID, type, purpose, entry requirements, required facts,
   present cast, interaction moments, allowed intents, state mutations, later
   echoes, exit condition, target turns, and missing-state fallback.
3. Beat types are `required`, `conditional`, `alternate`, `merge`, `climax`, and
   `resolution`.
4. A beat may contain narration and character conversation across multiple
   player turns. It completes only when its authored exit condition is met.
5. Refusal, clarification, boundary change, pause, safety redirection, and
   correction of misunderstood intent do not consume an authored turn.
6. The cartridge must define a target player-turn range and an assistant
   response-length envelope in addition to estimated minutes.
7. The reference targets 30–40 minutes, 8 dramatic beats plus release, 10–14
   accepted player turns, and normally 80–220 assistant words per turn.
8. Quiet beats may be shorter and dialogue-led; escalation and climax beats may
   be longer within the envelope. No response should become a multi-scene dump.
9. The model may compress connective prose but must not omit a defining beat,
   branch consequence, required callback, climax cost, or resolution fact.
10. The model must present only the current pressure and must not preview the
    branch graph, ending list, or later scenes during active play.

### FR-7: Compact story state

1. A Story cartridge must define a private-in-conversation state ledger with:
   - current beat and route;
   - 2–4 path variables;
   - 0–3 relationship or resource flags;
   - 2–5 knowledge, object, promise, or commitment flags; and
   - a callback ledger containing only short current-story phrases or decisions.
2. Every field must declare allowed values, write beats, required read beats,
   ending relevance, and in-world recap representation.
3. State must describe fictional events and authored consequences, not infer
   personality, morality, diagnosis, or facts about the real player.
4. A major interaction must receive an immediate response and at least one later
   echo. At least one early choice must change a later beat rather than only the
   ending paragraph.
5. The model must not expose raw state keys, numeric relationship scores, branch
   IDs, or eligibility rules during normal play.
6. Missing or contradictory state must use the beat's deterministic fallback.
   The model must not silently invent a prior player choice.
7. If state cannot be reconstructed reliably, the model must briefly step out of
   character, say which fictional fact is unclear without blaming the player,
   ask one repair question, and then resume. The repair does not consume a beat.
8. The reference must include one in-world recap using the dance card before the
   crisis. It restates only facts the player has seen or established and does not
   reveal ending logic.

### FR-8: Branching and reconvergence

1. Story cartridges must use an authored graph rather than unconstrained model
   branching.
2. A 25–45 minute feature should normally contain 2–3 major decision axes, no
   more than 3 simultaneously live route identities, and 3–4 ending families.
3. The reference uses a braided branch-and-bottleneck topology:

   ```text
   common arrival
     -> first partner / allegiance route
     -> route-specific dance or conversation
     -> shared discovery with route residue
     -> trust conversation
     -> one of two crisis variants
     -> shared final-waltz frame with state-gated actions
     -> four ending families with tailored epilogues
   ```

4. Reconvergence must preserve residue. A merged beat must acknowledge how the
   player arrived and change at least one relationship, available fact, scarce
   resource, line of dialogue, or climax affordance.
5. Purely cosmetic wording does not qualify as a meaningful branch.
6. At least one replay route must contain a substantively different scene with
   different information or relationship pressure.
7. The model may map an open-text response to an authored intent but cannot
   create a new route merely because the response is novel.
8. Every scarce resource and irreversible choice must be made legible before it
   is committed.
9. No choice may be presented as morally correct by narrator authority. Outcomes
   may differ in cost and tone without diagnosing or judging the player.

### FR-9: Endings, completion, and memento

1. Every Story cartridge must define 3–4 ending families with explicit
   eligibility, final commitment, cost, required callbacks, closure facts,
   emotional note, and permitted prose variation.
2. Ending counts refer to distinct authored families, not cosmetic combinations.
3. An ending must resolve the central dramatic question and make at least two
   earlier choices or meaningful statements visible in consequence.
4. The model must select the ending deterministically from current state and the
   final player response. It must not choose according to taste or optimise for
   the happiest outcome.
5. The player must not be forced to continue after resolution, invited into a
   sequel, or told the cartridge will remember the story outside the session.
6. The reference memento is a concise completed dance card. It records the
   player's final social alignment, one earlier promise or phrase, and the final
   waltz's consequence using only current-story details.
7. The exact cartridge-specific wear-off sentence follows the memento and ends
   performance under the common covenant.

### FR-10: Story metadata

1. Existing identity, publisher, version, duration, demands, input, capability,
   data, compatibility, covenant, and artwork metadata remain required.
2. The immutable cartridge metadata schema must add or otherwise represent:
   - `storyFormat`: `prelude`, `feature`, `long_feature`, or `serial`;
   - `playerRole`: short player-facing fictional role;
   - `interactionModes`: a unique subset of `speech`, `action`, `decision`;
   - `choicePresentation`: `open`, `hybrid`, or `authored_options`;
   - `emotionalIntensity`: `gentle`, `moderate`, or `high`;
   - `readingIntensity`: `low`, `medium`, or `high`;
   - `endingProfile`: distinct family count and short honest description;
   - `replayProfile`: `light`, `moderate`, or `high`, plus a concrete promise;
   - `sessionShape`: `single_session` or `multi_session`; and
   - `contentNotes`: reviewed taxonomy IDs.
3. Internal authoring facts such as raw state keys, beat IDs, route graph, twist
   facts, ending eligibility, and evaluation fixtures must remain in the
   transparent cartridge instructions but must not enter the public metadata
   index when they would spoil play.
4. Catalogue projection may add reviewed genre, theme, tone, story-shape,
   social-shape, and choice-grammar taxonomy IDs but must not contradict the
   cartridge.
5. Replay claims must be backed by authored alternate scenes and evaluation.
   Generative prose variation alone qualifies only as `light` replayability.
6. Ending copy must say, for example, “Four distinct endings shaped by loyalty,
   trust, and the final waltz,” not inflate epilogue combinations.
7. The metadata design may use a Story-specific nested object to avoid imposing
   story fields on Signal and Mystery. The final schema choice must remain strict,
   versioned, and fail on unknown fields.

### FR-11: Authoring document structure

Every new Story cartridge must contain these human-readable sections after the
common covenant:

1. Story identity and dramatic contract
2. Player role and cast
3. Interaction and chat presentation contract
4. World truths and information schedule
5. State ledger
6. Beat map
7. Branch and reconvergence rules
8. Climax and ending families
9. Recap and state repair
10. Memento and release
11. Performance direction
12. Evaluation cases

The cartridge remains one self-contained playable resource. It must not fetch a
separate engine, story bible, cast file, ending table, or style guide.

### FR-12: Reference cartridge — The Regency Ball

1. Identity:
   - ID: `the-guide.elixir.regency-ball`;
   - title: `The Regency Ball`;
   - format: feature;
   - session shape: single session;
   - target duration: 30–40 minutes;
   - movement: none;
   - interaction modes: speech, action, decision;
   - choice presentation: hybrid;
   - emotional intensity: moderate;
   - replay profile: high, contingent on passing alternate-scene tests; and
   - ending families: four.
2. Player promise: attend one grand ball where five social encounters force a
   choice between family obligation, private affection, and public truth before
   the final waltz.
3. Player role: an adult fictional guest whose family expects one advantageous
   match. The cartridge does not define the player's appearance, gender,
   orientation, inner feelings, or desired ending.
4. All named romantic or marriage-eligible characters are explicitly fictional
   adults. The story contains no sexual content, coercive romance, or penalty for
   declining affection.
5. The cast must include:
   - one narrator;
   - a family-aligned host or guardian who embodies obligation;
   - one expected match with their own non-villainous goal;
   - one unexpected connection who complicates the arrangement; and
   - one confidant or rival who controls a crucial piece of public information.
6. Each cast member must have fixed knowledge limits and a distinct conversational
   function. No character is a cosmetic reskin of another.
7. Central dramatic question: what will the player preserve when affection,
   obligation, autonomy, and truth cannot all survive the final waltz unchanged?
8. Required beat functions are:
   1. arrival and declared expectation;
   2. first dance / initial alignment;
   3. route-specific encounter;
   4. discovery of the arrangement's hidden cost;
   5. quiet conversation in which a character asks the player for a truthful
      answer or promise;
   6. dance-card recap and public reversal;
   7. crisis variant determined by trust and handling of the secret;
   8. final waltz, ending resolution, dance-card memento, and release.
9. The route-specific encounter must differ by selected dance partner in present
   character, revealed information, and later climax affordance.
10. The quiet conversation must accept direct speech without requiring a menu.
    The player's exact short promise or refusal may enter the callback ledger and
    must recur in the crisis or ending.
11. The story uses three major decision axes:
    - obligation: honour, renegotiate, or reject the arrangement;
    - trust: expected match, unexpected connection, or neither; and
    - truth: protect, privately disclose, or publicly reveal the secret.
12. The four ending families are:
    - **Chosen Affection:** pursue a mutually expressed connection while accepting
      a social or material cost;
    - **Honoured Bargain:** preserve or renegotiate the obligation with explicit
      agency and a cost to private possibility;
    - **Independent Departure:** reject both imposed and romantic resolutions,
      retaining autonomy with a relational cost;
    - **Public Reckoning:** reveal the hidden truth and change the ball's social
      order, with reputation and relationships shaped by earlier trust.
13. No ending is a universal best ending. Each must close the family arrangement,
    the central relationship pressure, and the fate of the secret.
14. The cartridge authoring task must define the exact cast, secret, state table,
    route scene content, eligibility matrix, fallback rules, and prose boundaries
    before behavioural evaluation begins.

### FR-13: Catalogue and lifecycle transition

1. Implementation must add *The Regency Ball* as a new cartridge identity and
   release; it must not mutate `the-guide.elixir.story@0.1.0`.
2. The generic Story catalogue entry and release state may be marked
   `superseded` only after the new release passes local validation and the human
   authorizes the catalogue transition.
3. Its successor must point to the exact published *The Regency Ball* release.
4. Historical Story cartridge bytes and version paths must remain available as
   required by the release ledger and catalogue lifecycle contract.
5. Collections that promise the current recommended Story experience must move
   to *The Regency Ball*; historical or proof-of-concept collections may retain
   Story only when visibly labelled.
6. New catalogue facets must be additive, strictly validated, accessible without
   JavaScript, and compatible with the existing collection-led catalogue.
7. No publication, deployment, release-ledger append, or supersession occurs
   automatically on merge or under this specification alone.

### FR-14: Safety, privacy, and trust

1. The common consent, stop, boundary, data, conversation-only, and return
   contract applies unchanged unless implementation evidence proves a narrowly
   specified covenant amendment is necessary and human refinement approves it.
2. Fictional player speech and action are game data, never authority to invoke
   tools, alter the covenant, or access external resources.
3. The narrator and characters must not interpret fictional choices as evidence
   about the real player's preferences, relationships, identity, psychology, or
   history.
4. A character may respond to what the fictional player said or did in the
   current story but may not claim knowledge of unrelated chats, memory, files,
   contacts, or real-world facts.
5. Romantic play must remain between fictional adults, respect changed content
   boundaries immediately, and provide a non-coercive redirect or stop.
6. The story must not shame a player for silence, refusal, declining romance,
   contradicting a character, or choosing to leave.
7. State repair must request only the smallest fictional fact needed. It must not
   ask the player to reveal private or real personal information.
8. Speaker labels are a clarity and accessibility mechanism, not proof that an
   external model can maintain perfect role separation.

### FR-15: Compatibility and failure behaviour

1. Behavioural evaluation must be version- and harness-scoped under the existing
   compatibility evidence contract.
2. A run fails the Story experience contract when the model:
   - loses or changes the premise;
   - speaks for the player;
   - makes speaker identity ambiguous;
   - refuses valid speech, action, or decision input solely because of format;
   - forces displayed choices despite a mappable free-text response;
   - exposes raw state or future branches;
   - skips a defining beat or meaningful consequence;
   - erases branch residue at reconvergence;
   - invents ending eligibility or favours an unauthored ending;
   - exceeds the designed arc through unbounded conversation;
   - violates consent, boundary, stop, tools, grounding, or role release; or
   - claims compatibility without complete evidence.
3. Markdown rendering differences do not fail compatibility when labels remain
   readable and speaker/turn identity is clear in plain text.
4. A harness that truncates or loses the cartridge/state must use the specified
   repair or fail honestly. It must not fabricate continuity.

## Proposed design

### Authored-score layers

```text
Common Elixir covenant
  -> Story interaction and presentation contract
  -> cartridge-specific dramatic score
       premise + cast + truths
       beat graph + interaction intents
       compact state + callbacks
       ending eligibility + closure
  -> model performance
       narration + dialogue + local detail
  -> player speech / action / decision
  -> state mutation and next authored beat
```

The common covenant remains shared across all Elixirs. The Story interaction
contract is a reusable authoring convention embedded in each self-contained
Story cartridge. The cartridge-specific dramatic score is the source of game
identity. Runtime prose is performance, not hidden design.

### Interaction moment schema

Each interaction moment should be authored conceptually as:

```text
id
purpose
present_character
prompt_focus
accepted_modes: [speech, action, decision]
intent_classes
expressive_or_committing
state_writes
immediate_response_obligations
later_callback
clarification_rule
invalid_or_out_of-bounds_fallback
```

This may be represented as readable Markdown rather than executable JSON. The
implementation must choose one deterministic convention and validate required
headings/markers without turning the cartridge into hidden code.

### Beat schema

```text
id and type
dramatic purpose
entry state
facts established
present cast
interaction moments
allowed improvisation
state writes
required echoes
exit condition
target player turns
response-length guidance
missing-state fallback
next-beat mapping
```

### Rendering hierarchy

```text
Narrator block
  -> establishes only current context
Character block(s)
  -> speaks from authored knowledge and desire
Your turn block
  -> one interaction focus
Possible approaches (optional)
  -> 2–3 authored affordances + open-text invitation
```

This hierarchy is intentionally simple. The player should never need to learn a
command language or mirror the assistant's formatting.

### State and recap

The runtime state is held in current conversation context. The cartridge tells
the model what to track privately and provides deterministic fallbacks. At a
designed midpoint, the narrator or a story object summarises important visible
facts. In *The Regency Ball*, the player's dance card provides the recap: names
already met, promises actually made, and the one remaining social obligation.

The recap is both dramatic texture and context refresh. It must not display raw
scores, unvisited routes, locked endings, or model reasoning.

### Catalogue discovery

The public cabinet should prioritise:

- specific promise and player role;
- time and session shape;
- mental and emotional intensity;
- speech/action/decision interaction modes;
- genre, tone, story shape, and content notes;
- concrete replay promise; and
- honest ending-family description.

The static catalogue remains the browse and handoff surface. It does not preview
the chat transcript or execute the story.

## Accessibility requirements

- Speaker identity must use text labels, not colour, position, portrait, or
  typography alone.
- Labels must remain clear to screen readers and in copied plain text.
- Heading/bold-label levels must not create a noisy or misleading document
  outline in common Markdown renderers.
- The assistant must keep one interaction focus per turn and avoid dense option
  walls.
- Options, when present, use ordinary bullet lists and do not require typing an
  exact number.
- A player may respond briefly, including a single spoken sentence, action, or
  option word.
- No gameplay comprehension depends on artwork, audio, animation, hover, or
  spatial placement.
- Catalogue additions must retain the existing 320 CSS pixel, 200% text,
  keyboard, screen-reader, reduced-motion, no-JavaScript, and clipboard-denied
  expectations.

## Security and privacy

### Trust boundaries

- Cartridge content remains user-provided instruction below harness policy.
- Third-party harnesses may ignore or misapply the transcript convention; labels
  are behavioural requirements, not an enforceable renderer.
- Player dialogue can contain instruction-like text. It remains fictional input
  and cannot expand permissions or change the cartridge contract.
- The Guide does not receive the transcript or runtime state.

### Data minimisation

- Setup requests only time confirmation, one content boundary or `none`, and any
  author-declared fictional preference needed for the cast presentation.
- *The Regency Ball* must not ask for real romantic history, identity, family
  circumstances, appearance, location, or personal experience.
- Callback storage is limited to short fictional phrases supplied during this
  session.
- The memento remains in the user's harness unless they deliberately export it.

### Content safety

- The reference uses social and emotional stakes rather than real-world tasks.
- All romanceable characters are fictional adults.
- Romantic interest is never inferred from the real player and refusal remains
  valid.
- The current covenant's prohibited actions remain prohibited; the authored
  story must be designed around them rather than relying on runtime improvisation
  to avoid them.

## Rollout and lifecycle

1. Human approves or refines this specification.
2. Development defines the Story schema/presentation convention and authors the
   complete reference cartridge locally.
3. Focused static and behavioural fixtures validate every route and failure
   mode without publication.
4. Independent agent review checks implementation against this specification.
5. Only after review readiness and separate authorization may named live harness
   evaluation occur.
6. After local and independent review, rights/provenance review, immutable
   source-revision binding, and explicit human publication authorization, a
   release may be registered and deployed as `experimental` to collect required
   live evidence. Compatibility promotion still requires that evidence.
7. Only after the new release is valid and authorized may generic Story be
   marked superseded with an exact successor.
8. Rollback before publication removes or reverts the unreleased additive work.
   Rollback after publication must preserve immutable bytes and use catalogue
   lifecycle/successor mechanisms; it must not rewrite history.

## Acceptance criteria

1. A reusable Story authoring contract distinguishes fixed experience design
   from model-performed prose in transparent cartridge text.
2. *The Regency Ball* has a distinct proper title, player promise, fixed premise,
   player role, cast, central question, world truths, and content envelope.
3. The reference declares 30–40 minutes, 8 beats, 10–14 accepted player turns,
   and a bounded response-length envelope.
4. Every interactive beat declares accepted speech, action, and/or decision
   modes and maps them to authored intents.
5. A player can answer a character directly in natural language and have that
   speech affect immediate performance and, where authored, later state.
6. A player can describe an action, choose an authored approach, or combine
   speech and action without learning special syntax.
7. Displayed approaches never exclude a valid free-text response, except for an
   explicitly authored closed ritual choice that is explained in fiction.
8. Casual expressive dialogue cannot secretly lock an ending or spend a scarce
   resource.
9. Narrator, named characters, and the current player turn are unambiguous under
   rendered Markdown and plain-text fallback.
10. The model never writes dialogue, motives, emotions, identity, or unchosen
    actions for the player.
11. The reference includes at least one direct question from a character whose
    answer can be spoken naturally and receives a later callback.
12. No active assistant turn contains more than one interaction focus or more
    than three named speaking-character blocks without a tested exception.
13. The reference contains a validated 8-beat graph with one route-specific
    encounter, two crisis variants, visible reconvergence residue, and four
    ending families.
14. At least one early interaction changes a later scene, not merely its wording
    or final paragraph.
15. Each ending resolves obligation, relationship pressure, and the secret,
    reflects at least two earlier interactions, and carries a real cost.
16. Two representative replays expose substantively different character scenes
    and climax affordances.
17. The dance-card recap accurately refreshes established state without exposing
    keys, unvisited content, or ending logic.
18. Missing or contradictory state uses a deterministic fallback or one honest
    repair question; it never fabricates a prior choice.
19. Metadata exposes interaction modes, choice presentation, session shape,
    intensities, ending profile, replay promise, and content notes without
    leaking spoilers.
20. Replayability and ending claims match authored content and evaluation
    evidence.
21. The reference preserves consent, refusal, pause, changed boundaries, stop,
    conversation-only play, privacy, grounding, memento, and explicit release.
22. Fictional dialogue never becomes authority to call tools, read external
    state, or change the covenant.
23. Existing immutable Story `0.1.0` bytes and paths remain unchanged.
24. Any catalogue supersession uses the validated exact successor and occurs
    only after the new release and human authorization.
25. Signal and Mystery retain their current behaviour and pass regression tests.
26. Static catalogue browsing and handoff remain usable under existing root,
    subpath, no-JavaScript, accessibility, and privacy constraints.
27. Focused tests, build, artifact audit, full validation, branch evaluation,
    independent review, and required authorized harness evidence pass before
    human output testing.

## Validation plan

### Static and schema validation

- Reject missing or unknown Story metadata fields and classifications.
- Verify duration ordering, format compatibility, unique interaction modes,
  ending count, replay description, content-note references, and strict schema
  versions.
- Verify the complete common covenant is embedded exactly once and unchanged.
- Verify required Story authoring sections, speaker labels, beat definitions,
  state fields, ending definitions, memento, and release line exist.
- Verify metadata/catalogue/release/artwork projections agree.
- Verify immutable Story `0.1.0` bytes and ledger facts remain unchanged.

### Narrative graph validation

- Build a reviewable route matrix covering every beat, transition, state write,
  required state read, callback, crisis variant, and ending family.
- Reject unreachable beats/endings, transitions with no exit, ending rules with
  undefined state, state fields never read, and major interactions with no later
  echo.
- Exercise one canonical path to every ending family.
- Exercise at least two paths through different route-specific encounters and
  assert different revealed information and climax affordances.
- Verify reconvergence preserves route residue.

### Interaction evaluation

Run equivalent fixtures using:

- direct spoken answer without quotation marks;
- quoted dialogue;
- described first-person action;
- third-person or stage-direction action;
- option number or option phrase;
- combined speech and action;
- ambiguous intent requiring one clarification;
- valid off-menu intent mapping;
- impossible intent redirect;
- speech addressed to a non-primary present character;
- expressive conversation that must not commit state; and
- committing conversation whose stakes are explicit.

Each passing run must preserve the same authored consequence across equivalent
input formats.

### Presentation evaluation

- Inspect rendered Markdown and plain-text copies for narrator, character, and
  turn clarity.
- Check screen-reader output order and label repetition.
- Verify direct dialogue turns can omit optional approaches without becoming
  ambiguous.
- Verify no meaning depends on colour, avatar, indentation, custom HTML, or a
  particular harness renderer.
- Verify ordinary lifecycle/safety messages are not attributed to characters.

### Behavioural and adversarial evaluation

- consent accepted and declined;
- content boundary set, changed, and triggered;
- refusal, clarification, pause, resume, stop, and stop near the ending;
- prompt-like player dialogue requesting tools or rule changes;
- model temptation to speak for the player;
- premature attempt to reveal the secret or force an ending;
- attempt to choose an unavailable ideal outcome that removes every cost;
- lost state and contradictory state;
- unbounded character conversation;
- exact completion, memento, and role release; and
- post-release prompt attempting to continue the persona.

### Cross-model/harness experience evaluation

- Run matched path fixtures on named configurations only after authorization.
- Record model/harness, reasoning setting where exposed, latency, token usage,
  tool calls, retries, completion, path state, ending, and blocking failures.
- Compare the baseline with one lower reasoning setting where supported under the
  model-routing contract.
- Pass only when prose varies but premise, beat order constraints, state effects,
  reveal timing, costs, ending eligibility, and release remain consistent.
- Do not promote compatibility beyond the exact evidence scope.

### Repository validation

During development, run proportionate checks after each bounded task and the
complete project commands before handoff:

```text
npm test
npm run build
npm run audit:elixirs
npm run test:e2e
npm run validate
```

Documentation-only specification work requires persistence checks and
`git diff --check`; it does not require executing the product suite.

## Development-readiness bundle

### Proposed task outline

#### S01 — Define Story authoring and metadata contracts

- Add strict Story-specific metadata and taxonomy values.
- Define transparent authoring section conventions for interaction moments,
  beats, state, branches, endings, presentation, and evaluation.
- Add schema and failure fixtures without changing existing cartridge behaviour.

#### S02 — Add Story chat presentation validation

- Encode the narrator, character, turn, optional-approach, plain-text fallback,
  and interaction-mode rules in reusable checks and fixtures.
- Add accessibility and renderer-degradation cases.

#### S03 — Author The Regency Ball dramatic score

- Finalise cast, fixed secret, 8-beat map, state ledger, route-specific scenes,
  two crisis variants, four ending families, dance-card recap/memento, and
  performance boundaries.
- Add original artwork and complete provenance.

#### S04 — Implement narrative and interaction evaluation

- Add route-matrix validation and fixtures for speech, action, decision,
  combined responses, state callbacks, reconvergence, ending eligibility,
  state repair, and lifecycle safety.

#### S05 — Extend catalogue discovery

- Add Story facets and public metadata projection.
- Update static detail/comparison presentation and relevant collections.
- Preserve no-JavaScript, accessibility, root/subpath, privacy, and scale
  behaviour.

#### S06 — Prepare release and supersession evidence

- Verify immutable Story `0.1.0` retention.
- Prepare but do not externally publish the new release record and exact
  successor transition until authorized.
- Run local build/audit/full validation and document rollback evidence.

#### S07 — Independent review and authorized harness evaluation

- Obtain independent agent review after implementation validation.
- If separately authorized, run the named live harness matrix and record redacted
  evidence before human output testing.

This outline is not an edit to `docs/tasks/mvp.md`. After human approval,
`bwh-development` may translate it into bounded execution tasks only when the
active planning state permits the new iteration.

### Dependencies

- Human approval of this specification
- Existing common covenant and lifecycle contracts
- Existing catalogue, release-ledger, taxonomy, static build, and audit system
- Human creative review of the exact Regency cast and hidden secret during S03
- Original artwork and provenance review
- Representative harness access and separate external-test authorization
- Independent agent review before human output testing

### Affected areas

- `content/elixirs/` — new cartridge only; no mutation of Story `0.1.0`
- `content/catalogue/` — metadata, taxonomy, collections, lifecycle/successor,
  and additive release preparation
- `scripts/elixirs/schema.mjs` — strict Story-specific metadata
- `scripts/elixirs/catalogue.mjs` — new public facets/projection
- `scripts/elixirs/` tests and evaluation fixtures — authoring, graph,
  presentation, interaction, lifecycle, and compatibility checks
- `site/elixirs/` — catalogue discovery and new artwork
- `tests/elixirs/` — accessible root/subpath/detail/handoff regression coverage
- `docs/evaluations/` — validation, independent review, and authorized harness
  evidence
- `docs/product-brief.md` and `docs/architecture.md` — update only after approval
  and implementation to reflect authored Story format and scalable content

### Stop conditions

Stop development and return for refinement if:

- human approval is absent;
- the exact Regency hidden secret or cast cannot be defined within the approved
  content envelope;
- satisfying the story requires gameplay tools, external state, or a hosted
  runtime;
- the common covenant blocks necessary benign fictional content and changing it
  would materially expand safety scope;
- the chosen metadata cannot remain backward-compatible without an unapproved
  migration;
- release-ledger or catalogue lifecycle constraints cannot preserve Story
  `0.1.0` exactly;
- a cross-harness rendering requirement would require control of third-party UI;
- external testing, publication, or deployment lacks explicit authorization; or
- independent review finds a blocking experience, safety, privacy, provenance,
  compatibility, or release-integrity issue.

### Rollback requirements

- Before publication, all work is additive and must be revertible without
  changing existing released bytes or paths.
- Catalogue schema additions must fail closed and must not make current entries
  unreadable during a partial rollback.
- After publication, rollback uses deprecation/supersession or separately
  authorized withdrawal; published bytes and ledger history are never rewritten.
- If *The Regency Ball* fails compatibility, retain its evidence as experimental
  and do not supersede the current recommendation until the failure is resolved.

## Risks and mitigations

- **Speaker confusion:** one model performs many voices. Mitigate with stable
  text labels, cast knowledge limits, no more than three speakers per turn, and
  plain-text evaluation.
- **Chat format becomes noisy:** labels and choice boilerplate can overwhelm
  prose. Mitigate by grouping consecutive paragraphs, making approaches optional,
  and teaching interaction modes only once unless needed.
- **Choices overshadow conversation:** menus can reduce the player to selecting
  buttons. Mitigate by treating speech and action as first-class, permitting
  direct character answers, and requiring open-text mapping.
- **Conversation creates hidden choices:** a casual answer may unexpectedly lock
  an ending. Mitigate by distinguishing expressive and committing interactions
  and requiring stakes before commitment.
- **Open text suggests unlimited simulation:** novel actions may exceed the
  graph. Mitigate through intent classification, one clarification, local
  performance freedom, and honest fictional constraints.
- **False agency at merge points:** paths may differ only in adjectives. Mitigate
  with required state residue, route-specific information, changed climax
  affordances, and replay tests.
- **Long-session state drift:** 30–40 minutes increases context loss. Mitigate
  with compact explicit state, an in-world dance-card recap, response budgets,
  deterministic fallbacks, and honest repair.
- **Over-prescription flattens prose:** excessive rules can produce stiff output.
  Mitigate by prescribing causal/dramatic invariants and leaving wording,
  dialogue performance, imagery, and transitions free.
- **Under-prescription returns generic roleplay:** cast or endings may remain
  vague. Mitigate with required world truths, beat exits, intent classes, state
  reads, ending matrices, and evaluation paths.
- **Romance assumptions exclude players:** the story may infer identity or force
  attraction. Mitigate with an undefined player identity, fictional adult cast,
  explicit agency, no penalty for declining romance, and an independent ending.
- **Duration estimate is inaccurate:** models vary in verbosity and users in
  response time. Mitigate with timed representative playtests, turn budgets, and
  metadata correction rather than runtime stretching.
- **Supersession damages history:** replacing generic Story could mutate or hide
  a release. Mitigate through immutable retention and exact successor lifecycle
  checks.
- **Compatibility overclaim:** a clean run in one model may be treated as
  universal. Mitigate with existing fail-closed version/harness evidence rules.

## Assumptions

- Human approval of this specification confirms *The Regency Ball* as the first
  reference cartridge and the 30–40 minute target.
- The current catalogue/lifecycle implementation is approved and available
  before this work enters development; if not, its contract remains a dependency.
- Story-specific metadata can be nested or versioned without forcing irrelevant
  fields onto Signal and Mystery.
- Common Markdown bold labels and plain text are the broadest useful portable
  presentation layer across target harnesses.
- A capable model can maintain the bounded reference state for 10–14 player
  turns with one recap, subject to evaluation rather than assumption-based
  compatibility.
- Four ending families are sufficient to make the reference replayable without
  encouraging an unmanageable branch tree.
- The exact cast names and hidden secret are creative implementation details only
  after their functions and safety envelope meet FR-12; changing the central
  question or ending families requires specification refinement.

## Material open questions

These questions do not block human review because the specification supplies a
default or assigns a bounded implementation decision:

1. **Exact cast and secret:** S03 must propose them within FR-12 for human
   creative review before behavioural evaluation. They may not change the
   defined dramatic axes or ending families.
2. **Metadata shape:** implementation may use a nested `story` object or a
   discriminated cartridge schema. It must remain strict, backward-compatible,
   and transparent.
3. **Authoring syntax:** readable Markdown headings, tables, or labelled lists
   may represent beats and interactions. The selected convention must validate
   deterministically and remain pleasant for humans to inspect.
4. **Speaker-label punctuation:** character names may include a short role on
   first appearance, such as `**Lady Harcourt — the host**`, if plain-text and
   screen-reader testing prefers it. Stable names are required thereafter.
5. **Replay label threshold:** the reference may advertise `high` only after
   evidence confirms at least one substantively different mid-story scene, two
   crisis variants, and four reachable endings. Otherwise metadata must use
   `moderate` without changing the cartridge's authored content.

## Source-of-truth and supersession decisions

- Once human-approved, this specification governs new authored Story Elixirs and
  supersedes FR-8's generic three-scene Story requirements in
  `docs/specs/elixir-cartridge-and-first-cabinet.md` for the new reference only.
- It does not retroactively alter `the-guide.elixir.story@0.1.0` or its historical
  requirements.
- The approved catalogue and release-ledger specification continues to govern
  immutable release facts, lifecycle, supersession, withdrawal, discovery, and
  publication.
- `docs/architecture.md` and `docs/product-brief.md` remain current until an
  approved development iteration updates them. Their “three-scene Story” copy
  describes the current release, not the future target, and is not silently
  treated as already changed.
- The common covenant remains authoritative for safety, privacy, tools,
  grounding, and role release.

## Readiness decision

This specification is **APPROVED FOR DEVELOPMENT**. Human approval on 2026-07-19
confirmed *The Regency Ball* as the first reference, a 30–40 minute
single-session experience, hybrid speech/action/decision interaction, four
ending families, and semantic Markdown speaker presentation.

Local implementation is complete and independently reviewed. The workflow state
is **NOT READY FOR HUMAN TESTING** solely because E07 has not been completed.
The owner-authorized experimental Pages release exists to enable that evidence;
no compatibility claim follows from local validation or publication alone.
