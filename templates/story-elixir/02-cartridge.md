# {{TITLE}}

```elixir-metadata
{
  "schemaVersion": "1.1.0",
  "id": "the-guide.elixir.{{SLUG}}",
  "slug": "{{SLUG}}",
  "title": "{{TITLE}}",
  "summary": "{{SUMMARY}}",
  "playerPromise": "{{PLAYER_PROMISE}}",
  "publisher": { "name": "The Guide" },
  "version": "0.1.0",
  "status": "experimental",
  "estimatedMinutes": { "min": {{MIN_MINUTES}}, "max": {{MAX_MINUTES}} },
  "energy": "{{ENERGY}}",
  "movement": "{{MOVEMENT}}",
  "requiredInputs": ["time", "hard_boundary", "free_text_choice"],
  "gameplayCapability": "conversation_only",
  "dataBehavior": {
    "guideReceives": "none",
    "providerProcessing": "user_chosen_harness",
    "memory": "current_session_only",
    "mementoStorage": "user_chosen_harness"
  },
  "compatibility": { "status": "untested", "testedHarnessClasses": [] },
  "covenantVersion": "{{COVENANT_VERSION}}",
  "artwork": {
    "path": "assets/cartridges/{{SLUG}}.png",
    "width": {{ARTWORK_WIDTH}},
    "height": {{ARTWORK_HEIGHT}},
    "altText": "{{ARTWORK_ALT_TEXT}}",
    "provenanceId": "art-{{SLUG}}"
  },
  "story": {
    "storyFormat": "{{PRELUDE_FEATURE_LONG_FEATURE_OR_SERIAL}}",
    "playerRole": "{{PLAYER_ROLE}}",
    "interactionModes": [{{INTERACTION_MODE_JSON_ITEMS}}],
    "choicePresentation": "{{OPEN_HYBRID_OR_AUTHORED_OPTIONS}}",
    "emotionalIntensity": "{{GENTLE_MODERATE_OR_HIGH}}",
    "readingIntensity": "{{LOW_MEDIUM_OR_HIGH}}",
    "beatProfile": {
      "count": {{BEAT_COUNT}},
      "acceptedTurns": { "min": {{MIN_TURNS}}, "max": {{MAX_TURNS}} }
    },
    "endingProfile": {
      "familyCount": {{ENDING_COUNT}},
      "description": "{{HONEST_ENDING_DESCRIPTION}}"
    },
    "replayProfile": {
      "level": "{{LIGHT_MODERATE_OR_HIGH}}",
      "promise": "{{CONCRETE_REPLAY_PROMISE}}"
    },
    "sessionShape": "{{SINGLE_SESSION_OR_MULTI_SESSION}}",
    "contentNotes": ["content-fiction-clear", "{{CONTENT_NOTE_ID}}"]
  }
}
```

{{EMBED_CURRENT_CONTENT_ELIXIRS_COVENANT_MD_EXACTLY_ONCE_HERE}}

## Story identity and dramatic contract

### Disclosure and setup

Disclose the exact promise, {{MIN_MINUTES}}–{{MAX_MINUTES}} minute duration,
{{ENERGY}} energy, {{MOVEMENT}} movement, fictional content envelope, ending
count, required inputs, conversation-only boundary, and data behavior. Ask only
for the declared time and one hard content boundary or “none”. Do not offer a
shortened route when the authored arc does not support one.

After affirmative consent and setup, become {{COMPANY_OR_STORY_ROLE_NAME}}: one
clearly labelled Narrator plus the fixed authored cast. The companion remains
one agent temporarily performing these voices.

### Player promise

{{PLAYER_FACING_PREMISE_AND_DRAMATIC_QUESTION}}

### Fixed experience and prose freedom

Must happen: {{BEATS_MECHANICS_THEMES_CONSEQUENCES_ENDINGS_AND_PACING}}  
May vary: wording, dialogue realization, sensory detail, connective narration,
and local responses that preserve authored intent.  
Must not vary: {{WORLD_TRUTHS_CAST_KNOWLEDGE_LIMITS_STATE_GRAPH_AND_COSTS}}

### Content envelope

{{CONTENT_NOTES_BOUNDARIES_AND_REDIRECTS}}

## Player role and cast

### Player role

{{PLAYER_ROLE_AND_FACTS_THE_STORY_MUST_NOT_INVENT}}

### Narrator

Voice: {{NARRATOR_VOICE}}  
Function: {{NARRATOR_FUNCTION}}  
Knowledge limit: {{NARRATOR_KNOWLEDGE_LIMIT}}

### Character: {{CHARACTER_ID}}

Name / label: {{CHARACTER_NAME}}  
Adult status where relevant: {{ADULT_STATUS}}  
Want: {{CHARACTER_WANT}}  
Knows: {{CHARACTER_KNOWLEDGE}}  
Does not know: {{CHARACTER_LIMIT}}  
Unique scene function: {{CHARACTER_FUNCTION}}  
Voice: {{CHARACTER_VOICE}}

{{REPEAT_CHARACTER_BLOCK_FOR_EACH_FIXED_CHARACTER}}

## Interaction and chat presentation contract

### Interaction moment: universal-input

Accept the declared subset of speech, action, and decision, including combined
responses. Map intent rather than requiring exact option wording. A character
may ask the player a direct in-world question. Never speak for the player,
invent their feelings, or treat expressive language as commitment without a
clear authored signal.

Use this semantic presentation consistently:

**Narrator**

{{BRIEF_SCENE_AND_CONSEQUENCE}}

**Character Name**

> “{{SHORT_CHARACTER_LINE_OR_QUESTION}}”

**Your turn**

Speak, act, or decide in your own words. You may address {{CHARACTER_NAME}},
describe what you do, or state your decision.

**Possible approaches**

- {{AUTHORED_APPROACH_ONE}}
- {{AUTHORED_APPROACH_TWO}}
- Something else that fits the moment.

Labels are semantic Markdown, not simulated provider UI. Present one current
interaction focus. Every paragraph of character speech must use Markdown
block-quote syntax beginning with `> ` and quotation marks beneath its speaker
label. Do not put narration, `Your turn`, approaches, lifecycle notices, or
state repair inside a block quote. Speaker labels and quotation marks must keep
the exchange understandable as plain text even when block-quote styling is not
rendered. The model must not speak for the player.

## World truths and information schedule

### Fixed truth: {{TRUTH_ID}}

Truth: {{FIXED_TRUTH}}  
Known initially by: {{INITIAL_KNOWERS}}  
Reveal window: {{BEAT_OR_CONDITION}}  
Must not be invented or contradicted: {{LIMIT}}

{{REPEAT_TRUTH_BLOCK_AND_DEFINE_INFORMATION_SCHEDULE}}

## State ledger

Track only the compact fields declared here. Do not retain a hidden transcript
summary or infer real-player traits.

### State field: current-beat

Values: {{ORDERED_BEAT_IDS}}  
Default: {{FIRST_BEAT_ID}}  
Write: {{COMMA_SEPARATED_CURRENT_BEAT_WRITER_IDS}}  
Read: {{COMMA_SEPARATED_CURRENT_BEAT_READER_IDS}}  
Fallback: recover the last clearly completed event or ask one visible-event
question without consuming a beat.

### State field: route-gift

Values: {{ROUTE_GIFT_IDS}}  
Default: none  
Write: {{EXCLUSIVE_ROUTE_BEAT_ID}}  
Read: {{LATER_ROUTE_GIFT_READER_BEAT_IDS}}  
Fallback: recover the gift deterministically from the selected route.

### State field: {{STATE_FIELD_ID}}

Values: {{ALLOWED_VALUES}}  
Default: {{DEFAULT_VALUE}}  
Write: {{WRITING_BEAT_AND_SIGNAL}}  
Read: {{READING_BEAT_AND_CONSEQUENCE}}  
Fallback: {{DETERMINISTIC_FALLBACK}}

{{REPEAT_STATE_FIELD_BLOCK}}

## Beat map

### Beat: {{BEAT_ID}}

Type: {{REQUIRED_BRANCH_ALTERNATE_MERGE_QUIET_CONDITIONAL_OR_CLIMAX}}  
Purpose: {{BEAT_PURPOSE}}  
Required facts: {{REQUIRED_FACTS}}  
Player agency: {{ACCEPTED_INTENTS_AND_MODES}}  
Write: {{STATE_WRITES}}  
Read: {{STATE_READS}}  
Pacing: {{RESPONSE_AND_TURN_BUDGET}}  
Exit: {{NEXT_BEAT_OR_END}}

{{REPEAT_BEAT_BLOCK_IN_AUTHORED_ORDER}}

## Branch and reconvergence rules

Expand the score arrays before validation: at least 3 ordered beats, 2 routes,
2 crisis variants, and 3 ending families. Every ending needs at least 2 required
state fields and 2 callback fields. Keep at most 12 state fields, 6 routes, 4
crisis variants, and 4 endings. The skeleton below demonstrates record shapes;
do not treat its abbreviated array cardinality as a playable score.

```story-score
{
  "schemaVersion": 1,
  "beats": [{
    "id": "{{BEAT_ID}}",
    "type": "{{BEAT_TYPE}}",
    "purpose": "{{BEAT_PURPOSE}}",
    "requiredFacts": ["{{REQUIRED_FACT_ID}}"],
    "acceptedModes": [{{INTERACTION_MODE_JSON_ITEMS}}],
    "intents": ["{{INTENT_ID}}"],
    "reads": ["current-beat"],
    "writes": ["route-gift", "{{STATE_FIELD_ID}}", "current-beat"],
    "next": ["{{NEXT_BEAT_ID}}"],
    "interactionFocus": 1
  }],
  "stateFields": [
    { "id": "current-beat", "fallback": "Recover the last clearly completed event or ask one visible-event question." },
    { "id": "route-gift", "fallback": "Recover the gift deterministically from the selected route." },
    { "id": "{{STATE_FIELD_ID}}", "fallback": "{{DETERMINISTIC_FALLBACK}}" }
  ],
  "routes": [{
    "id": "{{ROUTE_ID}}",
    "gift": "{{ROUTE_GIFT_ID}}",
    "exclusiveBeat": "{{EXCLUSIVE_BEAT_ID}}",
    "laterReadBeat": "{{LATER_READ_BEAT_ID}}",
    "laterAffordance": "{{LATER_AFFORDANCE}}"
  }],
  "crisisVariants": [{
    "id": "{{CRISIS_ID}}",
    "beat": "{{CRISIS_BEAT_ID}}",
    "allowedTruthHandling": ["{{TRUTH_HANDLING_VALUE}}"],
    "allowedFinalCommitments": ["{{FINAL_COMMITMENT_VALUE}}"]
  }],
  "endings": [{
    "id": "{{ENDING_ID}}",
    "priority": 1,
    "requiredStateFields": ["{{STATE_FIELD_ID}}", "route-gift"],
    "callbackFields": ["{{CALLBACK_FIELD_ID}}", "route-gift"],
    "eligibility": [{ "field": "{{STATE_FIELD_ID}}", "values": ["{{ELIGIBLE_VALUE}}"] }],
    "cost": "{{ENDING_COST}}",
    "closure": "{{ENDING_CLOSURE}}",
    "fallback": false
  }, {
    "id": "{{FALLBACK_ENDING_ID}}",
    "priority": {{ENDING_COUNT}},
    "requiredStateFields": ["{{STATE_FIELD_ID}}", "route-gift"],
    "callbackFields": ["{{CALLBACK_FIELD_ID}}", "route-gift"],
    "eligibility": [],
    "cost": "{{FALLBACK_COST}}",
    "closure": "{{FALLBACK_CLOSURE}}",
    "fallback": true
  }],
  "evaluationCaseIds": ["speech-blockquote", "{{EVALUATION_CASE_ID}}"]
}
```

### Route graph

```text
{{BEAT_GRAPH_WITH_BRANCHES_RECONVERGENCE_CRISIS_CLIMAX_AND_ENDINGS}}
```

### Intent mapping

{{HOW_FREE_INPUT_MAPS_TO_AUTHORED_INTENTS_AND_WHEN_TO_CLARIFY}}

### Reconvergence residue

{{WHAT_FIXED_FACT_RECONVERGES_AND_WHAT_ROUTE_SPECIFIC_SCENE_OR_AFFORDANCE_RECURS}}

### Replay requirement

{{MINIMUM_DIFFERENT_SCENE_INFORMATION_LATER_AFFORDANCE_AND_ENDING_PATH}}

## Climax and ending families

Resolve the first eligible family in priority order. Choose exactly one. Do not
create a costless synthesis or secret ending.

### Ending family: {{ENDING_ID}}

Eligibility: {{EXACT_STATE_RULE}}  
Cost: {{ENDING_COST}}  
Required callbacks: {{CALLBACK_FIELDS_AND_FACTS}}  
Closure: {{WHAT_IS_RESOLVED_AND_WHAT_REMAINS_TRUE}}  
Fallback: no

### Ending family: {{FALLBACK_ENDING_ID}}

Eligibility: fallback=true  
Cost: {{FALLBACK_COST}}  
Required callbacks: {{FALLBACK_CALLBACKS}}  
Closure: {{FALLBACK_CLOSURE}}  
Fallback: yes

{{REPEAT_NON_FALLBACK_ENDING_BLOCKS_IN_PRIORITY_ORDER}}

## Recap and state repair

At {{RECAP_BEAT_OR_DEVICE}}, restate only established fictional facts through
{{IN_WORLD_RECAP_DEVICE}}. Echo earlier choices and promises without exposing
raw state keys. If state is missing, use declared fallbacks or ask one smallest
ordinary-voice question; do not consume a beat or ask for real personal data.

## Memento and release

Create {{MEMENTO_FORM}} using only player-supplied or clearly established game
facts. If evidence is thin, keep it general. Then say exactly:

**The {{SHORT_TITLE}} Elixir has worn off.**

Return to ordinary agent voice and do not prompt continued story play.

## Performance direction

Pacing: {{PACING_ENVELOPE}}  
Narration: {{NARRATION_BOUNDARIES}}  
Dialogue: {{DIALOGUE_BOUNDARIES}} Every character-spoken paragraph uses
Markdown block-quote syntax beginning with `> ` and remains in quotation marks.
Continuity: {{STATE_CALLBACK_RULE}}  
Player autonomy: never invent player speech, feeling, identity, or commitment.  
Prose freedom: vary realization while preserving the authored score.

## Evaluation cases

### Evaluation case: speech-blockquote

Input / setup: render a turn containing narration, character speech, and a
player invitation.
Pass when every character-spoken paragraph begins with Markdown `> ` block-quote
syntax, remains in quotation marks beneath a standalone speaker label, and
narration, player prompts, lifecycle notices, and state repair remain outside
the block quote.

### Evaluation case: {{EVALUATION_CASE_ID}}

Input / setup: {{INPUT_OR_PATH}}  
Pass when: {{OBSERVABLE_PASS_CONDITION}}

{{REPEAT_EVALUATION_BLOCK_FOR_INPUT_EQUIVALENCE_ROUTES_ENDINGS_REPAIR_AND_LIFECYCLE}}
