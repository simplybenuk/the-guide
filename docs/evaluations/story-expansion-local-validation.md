# Authored Story catalogue expansion — local validation

Date: 2026-07-19  
Specification: `docs/specs/authored-story-catalogue-expansion.md`  
Scope: X01–X07 local candidate implementation  
Status: REMEDIATION VALIDATED — awaiting independent re-review

## Candidate outcome

- Added one 4–6 minute authored taster, *The Last Light*, and nine authored
  features. With unchanged *The Regency Ball*, the proposed active slate is one
  taster plus ten features.
- Each new Story has a design brief, schema `1.1.0` cartridge, discovered
  executable fixture deck, catalogue candidate, exact release candidate,
  original 1536×1024 RGB cover, provenance, and publication-validation record.
- Candidate metadata and taxonomy cover science fiction, comic creature horror,
  Wild West, haunted horror, steampunk heist, high fantasy, golden-age mystery,
  cyberpunk noir, and folk horror.
- The proposed transition retires Signal, Mystery, and generic Story from future
  active discovery while retaining their immutable releases and paths. It is
  explicitly `proposed_not_active`; the production catalogue remains unchanged.

## Claws review

Two original concepts were generated without image references. The selected
close claw-versus-lantern concept beat the harbour-wide alternative at card
size: the threat, lobster anatomy, practical human response, and dry humour
remain legible. Full-size and 360×240 review found no shark, fin, swimmer, gore,
copied *Jaws* poster structure, readable text, OpenClaw logo, UI, or affiliation
claim. The cartridge uses an original harbour, fixed bell-resonance cause,
community logistics, three non-required-lethal outcomes, and no *Jaws* or
OpenClaw name in player-facing content.

## Validation evidence

- `npm test`: passed 18 files and 124 tests.
- The corrected full validation passed lint, strict typecheck, 18 Vitest files
  with 124 tests, a deterministic 44-file/11,634,107-byte build and audit, and
  all 12 mobile Chromium browser journeys. Browser output had to be regenerated
  in fresh ignored directories because earlier sandbox-owned result files were
  read-only; the fresh run passed.
- Focused expansion, cartridge, catalogue, artwork, and template checks passed.
- The expansion checks now traverse one of three exclusive route beats per
  feature, including asymmetric one-, two-, and three-beat route chains that
  produce nine distinct ID-independent graph signatures; apply story-specific state writes and crisis rules beat by beat,
  resolve route- and pressure-aware endings, map exact and equivalent natural
  inputs at the current beat, execute every declared per-story case, and cover
  Last Light's executed three-turn concise-response and four-turn slow-reader
  clarification journeys. Independent free-text ending and route probes plus
  numbered decisions now cover every new Story.
- Published cartridge SHA-256 values remain exactly:
  - Signal: `1c371b5813f6d93f37cabe486337f2680928f3e2ae5c19d4e86d40328f597cbb`
  - Mystery: `f02cc863fb1a7cabd137c7980c2206e947313fa0e010926d1754bb5cb7f2b093`
  - Story: `48f4cb4f2b9cbca8c4ce04ba844b12cfb28a6a2e5398cb211ad827e04d6874d9`
  - The Regency Ball: `7ca92ecd00c04b6300f1ebc32656c208cc79f0e508bbd02732aaa48c6abf049c`

## Authority and residual gates

The owner has explicitly authorized commit, direct push, publication, and Pages
deployment for the hackathon. Changes remain local and uncommitted pending the
required independent re-review. The built-in collaboration service could not
create a review thread, so a separate ephemeral Codex process is being used to
preserve reviewer independence. No release ledger, production catalogue,
collection, withdrawal, or production artwork manifest changed. No publication,
deployment, live-harness run, compatibility promotion, push, or external
outreach occurred.

Independent `bwh-agent-review` is the active gate. A reviewed commit revision,
production activation, and version-scoped live-harness evidence remain outside
this local candidate.
