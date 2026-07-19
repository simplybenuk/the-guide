# Elixir cartridge sources

Each cartridge is a self-contained Markdown document with exactly one visible
JSON metadata fence:

````markdown
```elixir-metadata
{
  "schemaVersion": "1.0.0"
}
```
````

The complete contents of `covenant.md` must appear exactly once and its declared
version must equal the cartridge metadata's `covenantVersion`. Cartridge source
must remain readable as plain text and must not contain executable code, hidden
instructions, remote includes, or model-specific control tokens.

Artwork is added in E04, but its eventual static path, dimensions, accessible
description, and provenance record are required metadata from E01 onward.

Published sources are registered under `content/catalogue/`. The release ledger
binds each exact ID/version to its byte count, SHA-256, source revision,
publisher-qualified path, and permanent legacy paths. Catalogue metadata may
improve discovery, but it must not contradict or silently mutate these embedded
cartridge facts.

## Authored Story cartridges

Existing schema `1.0.0` cartridges retain their exact metadata and behaviour.
New authored Story cartridges use schema `1.1.0` and add one strict `story`
object containing:

- story format and single- or multi-session shape;
- a short player role;
- supported speech, action, and decision interaction modes;
- open, hybrid, or authored-option choice presentation;
- emotional and reading intensity;
- declared beat count and accepted-player-turn range;
- honest ending-family and replay profiles; and
- reviewed content-note taxonomy IDs.

Schema `1.1.0` is reserved for authored Story cartridges and requires the
`story` object. A `story` object is invalid in schema `1.0.0`, preventing a
metadata addition from silently changing a published cartridge's contract.

After the embedded covenant, an authored Story source contains exactly one of
each of these level-two sections in this order:

1. `Story identity and dramatic contract`
2. `Player role and cast`
3. `Interaction and chat presentation contract`
4. `World truths and information schedule`
5. `State ledger`
6. `Beat map`
7. `Branch and reconvergence rules`
8. `Climax and ending families`
9. `Recap and state repair`
10. `Memento and release`
11. `Performance direction`
12. `Evaluation cases`

Every section must contain readable authoring instructions. The interaction,
state, beat, ending, and evaluation sections additionally use stable labelled
level-three blocks:

```markdown
### Interaction moment: first-dance
### State field: obligation
### Beat: arrival
### Ending family: chosen-affection
### Evaluation case: direct-speech
```

Block identifiers use lower-case kebab case. State blocks declare `Write` and
`Read`; beat blocks declare `Type`, `Purpose`, and `Exit`; ending blocks declare
`Eligibility`, `Cost`, `Required callbacks`, and `Closure`; evaluation blocks
state an explicit pass condition.

The Branch section also contains exactly one transparent `story-score` JSON
fence. It declares the same ordered beats, state fields, routes, crisis
variants, ending families, and evaluation IDs, including accepted interaction
modes, intents, state reads/writes, exits, route recurrence, ending priority,
costs, callbacks, and one deterministic fallback. Validation rejects count or
label drift, duplicate or unreachable nodes, missing exits, unknown state or
beat references, state without both a writer and reader, cosmetic-only route
residue, and disagreement between prose and scored exits. The JSON is an
inspectable authoring contract, not executable content or generated prose.

The interaction section includes a portable semantic example with standalone
`**Narrator**`, `**Character Name**`, `**Your turn**`, and optional
`**Possible approaches**` labels. It explicitly requires quoted character
dialogue, one current interaction focus, plain-text readability, an invitation
to speak, act, or decide, and the rule that the model never speaks for the
player. These are authoring and runtime instructions rather than assumptions
about third-party chat bubbles, colours, portraits, or layout.
