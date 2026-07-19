# {{TITLE}} — Story design brief

Status: DRAFT  
Author: {{AUTHOR}}  
Date: {{YYYY_MM_DD}}

## Experience promise

- Distinctive title: {{TITLE}}
- One-sentence catalogue promise: {{PLAYER_PROMISE}}
- Dramatic question: {{DRAMATIC_QUESTION}}
- Genre and theme: {{GENRE_AND_THEME}}
- Emotional tone: {{EMOTIONAL_TONE}}
- Author-declared duration: {{MIN_MINUTES}}–{{MAX_MINUTES}} minutes
- Mental energy / movement: {{ENERGY}} / {{MOVEMENT}}
- Session shape: {{SINGLE_OR_MULTI_SESSION}}
- Why this duration fits the arc: {{DURATION_RATIONALE}}
- What completion should feel like: {{COMPLETION_FEELING}}

## Player and participation

- Fictional player role: {{PLAYER_ROLE}}
- Facts deliberately left for the player: {{OPEN_PLAYER_FACTS}}
- Supported modes: {{SPEECH_ACTION_DECISION_SUBSET}}
- Choice presentation: {{OPEN_HYBRID_OR_AUTHORED_OPTIONS}}
- What an off-menu response can change: {{OFF_MENU_AGENCY}}
- What the story must never decide for the player: {{PLAYER_AUTONOMY_LIMITS}}

## Fixed authored contract

- Premise: {{PREMISE}}
- World truths: {{FIXED_TRUTHS}}
- Information schedule: {{WHO_CAN_REVEAL_WHAT_AND_WHEN}}
- Content envelope: {{CONTENT_NOTES_AND_HARD_LIMITS}}
- Prose freedoms: {{MODEL_MAY_IMPROVISE}}
- Prose prohibitions: {{MODEL_MUST_NOT_INVENT}}

## Cast

For each narrator or character record: role, want, pressure on the player,
knowledge limits, voice distinction, and the scene function only they can serve.

| ID | Name / label | Want | Knows | Must not know | Unique function |
| --- | --- | --- | --- | --- | --- |
| narrator | Narrator | {{NARRATOR_WANT}} | {{NARRATOR_KNOWLEDGE}} | {{NARRATOR_LIMIT}} | {{NARRATOR_FUNCTION}} |
| {{CHARACTER_ID}} | {{CHARACTER_NAME}} | {{CHARACTER_WANT}} | {{CHARACTER_KNOWLEDGE}} | {{CHARACTER_LIMIT}} | {{CHARACTER_FUNCTION}} |

## Beat map and pacing

Use intentional functions, not a universal scene count. Mark which beats branch,
reconverge, recap state, provide quiet reflection, force crisis, and release.

| # | Beat ID | Type / purpose | Required fact or pressure | Player agency | State written | Exit |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | {{BEAT_ID}} | {{TYPE_AND_PURPOSE}} | {{REQUIRED_FACT}} | {{AGENCY}} | {{STATE_WRITE}} | {{EXIT_RULE}} |

Accepted player turns: {{MIN_TURNS}}–{{MAX_TURNS}}  
Typical response envelope: {{RESPONSE_LENGTH_RULE}}

## Branch budget and recurrence

- Number of meaningful routes: {{ROUTE_COUNT}}
- Reconvergence points: {{RECONVERGENCE_POINTS}}
- Crisis variants: {{CRISIS_VARIANTS}}
- Why the graph remains bounded: {{BRANCH_BUDGET_RATIONALE}}

| Route ID | Exclusive scene | Unique information / relationship | State residue | Later changed scene or affordance |
| --- | --- | --- | --- | --- |
| {{ROUTE_ID}} | {{EXCLUSIVE_SCENE}} | {{ROUTE_GIFT}} | {{ROUTE_STATE}} | {{LATER_RECURRENCE}} |

## Compact state ledger

Every field needs an authored writer, reader, allowed values, default, and repair
rule. Prefer consequence-bearing facts over transcript summaries.

| Field | Allowed values | Default | Written at | Read at | Repair fallback |
| --- | --- | --- | --- | --- | --- |
| current-beat | {{BEAT_IDS}} | {{FIRST_BEAT}} | every beat exit | pacing / recap | last confirmed beat |
| {{STATE_FIELD}} | {{VALUES}} | {{DEFAULT}} | {{WRITER}} | {{READER}} | {{FALLBACK}} |

## Ending families

Keep the family count bounded. Variations inside a family do not count as new
endings unless eligibility, cost, and closure materially differ.

| Priority | Ending ID | Eligibility | Cost | Required callbacks | Closure | Fallback? |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | {{ENDING_ID}} | {{ELIGIBILITY}} | {{COST}} | {{CALLBACKS}} | {{CLOSURE}} | no |
| {{LAST_PRIORITY}} | {{FALLBACK_ENDING_ID}} | otherwise | {{FALLBACK_COST}} | {{FALLBACK_CALLBACKS}} | {{FALLBACK_CLOSURE}} | yes |

## Replay proof

- Promise exposed to players: {{REPLAY_PROMISE}}
- Scene that changes on replay: {{ALTERNATE_SCENE}}
- Information that changes: {{ALTERNATE_INFORMATION}}
- Later affordance that changes: {{ALTERNATE_AFFORDANCE}}
- Ending path affected: {{ALTERNATE_ENDING_PATH}}

## Recap, repair, memento, and release

- In-world recap device: {{RECAP_DEVICE}}
- Smallest repair question: {{REPAIR_QUESTION}}
- Memento form and permitted facts: {{MEMENTO}}
- Exact worn-off line: **The {{SHORT_TITLE}} Elixir has worn off.**
- Post-release behavior: ordinary agent voice; no new story prompt.

## Evaluation outline

List one canonical path per ending, at least two substantively different route
replays, input-equivalence cases, ambiguity and off-menu cases, state repair,
changed boundary, pause, stop, tool refusal, grounded memento, and post-release.

{{EVALUATION_OUTLINE}}

