# Authored Story Elixir template kit

Copy this directory for each new authored Story Elixir. Replace every
`{{UPPER_SNAKE_CASE}}` token; do not edit the templates in place. The numbered
files are authoring and review artifacts, not production records.

Files ending in `.tmpl` are intentionally not valid JSON while numeric
placeholders remain. After copying, replace tokens, expand repeated records,
then parse and validate the destination JSON. The cartridge template is not
playable until the exact current covenant replaces its covenant marker.

## Per-story files

| Template | Copy to | Purpose |
| --- | --- | --- |
| `01-story-design-brief.md` | `docs/discovery/{{SLUG}}-story-design.md` | Locks the experience promise and branch budget before prose. |
| `02-cartridge.md` | `content/elixirs/{{SLUG}}.md` | Self-contained playable cartridge with the common covenant embedded. |
| `03-evaluation-fixtures.json.tmpl` | `scripts/elixirs/story-evaluation-fixtures/{{SLUG}}.json` | Executable interaction, route, ending, repair, and lifecycle cases. |
| `04-catalogue-candidate.json.tmpl` | `content/catalogue/candidates/{{SLUG}}-entry.json` | Reviewed public discovery proposal. |
| `05-release-candidate.json.tmpl` | `content/catalogue/candidates/{{SLUG}}-release.json` | Exact source, artwork, review, compatibility, and activation evidence. |
| `06-artwork-provenance.md` | `content/catalogue/provenance/{{SLUG}}-artwork.md` | Human-readable authorship, rights, dimensions, references, and digest. |
| `07-publication-validation.md` | `docs/evaluations/{{SLUG}}-publication-validation.md` | Immutable registration, validation, deployment, and compatibility record. |

The fixture destination is the intended scalable convention. Until the Story
evaluator is generalized beyond the Regency reference, add the new fixture to
its test loader as part of the story implementation.

## Authoring order

1. Complete the design brief. Fix the promise, duration, player role, cast,
   truths, beat functions, branch budget, state budget, endings, content limits,
   and replay differences before writing scene prose.
2. Copy the current `content/elixirs/covenant.md` exactly into the covenant slot
   in the cartridge. Never paraphrase it. Set the same covenant version in
   metadata.
3. Complete the cartridge and its transparent `story-score` together. Every
   state field needs a writer and reader; every route needs an exclusive scene
   and later recurrence; every ending needs eligibility, cost, callbacks, and
   closure; exactly one ending is the deterministic fallback.
4. Complete executable fixtures from the authored score, not from an idealized
   summary. Exercise speech, action, decisions, combined input, ambiguity,
   off-menu intent, every route, crisis variant, ending, repair, stop, boundary,
   tool refusal, and post-release behavior. Mirror the exact declared interaction
   subset across cartridge metadata, every scored beat, catalogue discovery,
   and fixtures. When multiple modes express one intent, include equivalence
   cases; include a combined case only when the declared modes support it.
5. Create original artwork and complete provenance before referring to it from
   a release candidate. Do not invent a digest: measure final bytes.
6. Prepare catalogue and release candidates. Candidate files omit a publication
   revision and date until a reviewed commit exists.
7. Run focused validation, full `npm run validate`, independent review, and the
   explicitly authorized live-harness matrix. Record facts in the publication
   validation file without promoting compatibility prematurely.

## Shared registries updated at publication

These are existing shared files, not copied templates:

- append the reviewed release to `content/catalogue/releases.json`;
- add the reviewed entry to `content/catalogue/catalogue.json`;
- add artwork provenance to `site/elixirs/assets/cartridges/manifest.json`;
- update editorial collections only where the curator intends;
- append a withdrawal only through the separately authorized withdrawal flow.

The production release binds the exact reviewed commit, source path, byte count,
SHA-256, permanent paths, artwork digest, rights, review evidence, compatibility
evidence, publication date, and experimental status. Publication never rewrites
an older release and never implies compatibility.

## Completion check

- No unresolved `{{...}}` tokens remain in copied artifacts.
- The title communicates one distinctive experience rather than a genre prompt.
- Duration follows the authored arc; there is no shortened or stretched mode.
- Players can participate by speech, action, decision, or the declared subset.
- Narrator, character, `Your turn`, and optional approach labels remain semantic
  and readable without provider-specific chat UI.
- Every character-spoken paragraph is displayed as a Markdown block quote beneath
  its standalone speaker label; narration, prompts, and lifecycle notices remain
  outside block quotes, and quotation marks preserve plain-text clarity.
- The cartridge prescribes experience, state, consequences, pacing, and endings,
  while leaving prose realization to the model.
- The original Story and all published releases remain byte-for-byte immutable.
