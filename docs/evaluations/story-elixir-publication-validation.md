# The Regency Ball experimental publication validation

Date: 2026-07-19  
Scope: production registration for owner-authorized GitHub Pages live testing  
Status: deployed and live URL verified

## Authorization and lifecycle

The repository owner explicitly authorized commit, push, and GitHub Pages
publication on 2026-07-19 so they can live-test the authored Story experience.
This release is registered as `experimental`; it is not a compatibility pass or
a `READY FOR HUMAN TESTING` verdict. The Regency Ball currently has zero live
harness runs. E07 requires its complete versioned evaluation in two named
harness classes, including at least one consumer or personal-agent class.

The publication is additive. `the-guide.elixir.story@0.1.0` remains published,
immutable, available at its existing paths, and has no successor. The Regency
Ball is a separate fourth catalogue entry. It replaces generic Story only in the
editorial “Three ways to play” collection; “Start here” contains all four.

## Immutable release evidence

- Release: `the-guide.elixir.regency-ball@0.1.0`
- Cartridge source revision:
  `838193ac6c1a49afc1f572ce222f4f0e0376606f`
- Cartridge bytes: `53,292`
- Cartridge SHA-256:
  `7ca92ecd00c04b6300f1ebc32656c208cc79f0e508bbd02732aaa48c6abf049c`
- Artwork bytes: `2,616,876`
- Artwork SHA-256:
  `5a553a6f1f384ef171a5c5d15a4c8ed26600a783ddad0ed54ed4bbc6e2abc270`
- Status at publication: `experimental`

The release audit resolves the recorded Git commit and source path, reads the
cartridge bytes from that Git object, and rejects a byte count or SHA-256 that
does not match the ledger. Against protected base
`daaa336c32699b7d6603cbb3861d8d8ffba1fd78`, the audit retains three release
records and appends exactly one; it retains zero withdrawals and appends zero.

## Validation

- `npm run validate`: passed.
- ESLint and strict TypeScript: passed.
- Vitest: 15 files, 98 tests passed.
- Static artifact: 42 allowlisted files, 9,219,996 bytes; audit passed.
- Playwright: all 13 mobile Chromium journeys passed.
- `git diff --check`: passed.
- Independent production-registration review: repeated after remediation.

## Deployment evidence

- Merged by GitHub PR `#8` at main revision
  `0d04de7231efa687a6f82b6b904a11b639a45bf0`.
- Pages workflow run `29677321017`: build and deployment succeeded.
- Cabinet verified at `https://simplybenuk.github.io/the-guide/` with four
  Elixirs and The Regency Ball present.
- Experience page verified at
  `https://simplybenuk.github.io/the-guide/elixirs/regency-ball/` with the
  30–40 minute promise and `experimental`, `untested compatibility`, and
  `published` badges.
- Canonical cartridge verified at
  `https://simplybenuk.github.io/the-guide/cartridges/the-guide/regency-ball/0.1.0/elixir.md`.
  Its served SHA-256 is exactly
  `7ca92ecd00c04b6300f1ebc32656c208cc79f0e508bbd02732aaa48c6abf049c`.

Deployment does not promote compatibility. The next activity is the explicitly
scoped E07 live-harness evaluation.
