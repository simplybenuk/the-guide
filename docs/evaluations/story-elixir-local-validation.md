# Authored Story Elixir local validation

Date: 2026-07-19  
Scope: S01–S06 local implementation  
Status: passed locally; not published and not compatibility-promoted

## Exact candidate evidence

- Cartridge: `content/elixirs/regency-ball.md`
- Identity: `the-guide.elixir.regency-ball@0.1.0`
- Bytes: `53,292`
- SHA-256: `7ca92ecd00c04b6300f1ebc32656c208cc79f0e508bbd02732aaa48c6abf049c`
- Artwork: `site/elixirs/assets/cartridges/regency-ball.png`
- Artwork bytes: `2,616,876`
- Artwork SHA-256: `5a553a6f1f384ef171a5c5d15a4c8ed26600a783ddad0ed54ed4bbc6e2abc270`
- Release preparation: `content/catalogue/candidates/regency-ball-release.json`
- Catalogue preparation: `content/catalogue/candidates/regency-ball-entry.json`

The release preparation is intentionally `prepared_not_publishable`, and its
catalogue candidate is `pending_owner_review`. It has no
`sourceRevision` or `publishedAt` field and requires independent review, a
reviewed commit revision, live-harness evidence, and explicit publication
authorization before it can be translated into production records.

## Immutable predecessor evidence

The existing `the-guide.elixir.story@0.1.0` remains present at 8,108 bytes with
SHA-256 `48f4cb4f2b9cbca8c4ce04ba844b12cfb28a6a2e5398cb211ad827e04d6874d9`,
exactly matching `content/catalogue/releases.json`. Signal and Mystery also
retain their ledger digests. No production release, catalogue entry, collection,
withdrawal, or artwork-manifest record was changed.

The candidate transition proposes retaining the predecessor while marking its
catalogue lifecycle `superseded`, naming the Regency release as its exact
successor, and replacing the predecessor in `start-here` and
`three-ways-to-play`. The candidate build/audit test exercises that collection
placement without modifying the production catalogue.

## Validation results

`npm run validate` passed on 2026-07-19:

- ESLint: passed with zero warnings.
- TypeScript: strict no-emit check passed.
- Vitest: 15 files, 98 tests passed after review remediation.
- Static build: completed.
- Artifact audit: 34 allowlisted files, 6,333,568 bytes.
- Playwright: all 13 mobile Chromium journeys passed for root/subpath,
  accessibility, local-only discovery, no-JavaScript use, clipboard fallbacks,
  collections, immutable release facts, and bounded 500-entry browsing.
- `git diff --check`: passed.
- Focused candidate catalogue build/audit and release-drift tests: passed.

The post-review suite additionally rejects mismatched declared counts, labelled
blocks, graph exits, unreachable or unknown references, state without both a
writer and reader, lost route-gift recurrence, ending-priority/fallback drift,
and prose/score disagreement. Executable fixtures cover 13 natural input forms,
all eight beats, three routes, both crisis variants, all four endings,
deterministic repair, and pause/boundary/stop/tool/post-release outcomes.

No live ChatGPT or other external harness run was performed. Compatibility
remains experimental and scoped to existing evidence.

## Rollback evidence

Before publication the work is additive. Rollback consists of removing the new
Regency source/artwork/provenance/candidate records and reverting schema,
evaluation, taxonomy, presentation, documentation, and test additions. The
three production releases and their paths remain untouched throughout.

After any future authorized publication, rollback must use the existing
deprecation, supersession, or separately authorized withdrawal flow. Published
bytes and append-only ledger history must never be rewritten.
