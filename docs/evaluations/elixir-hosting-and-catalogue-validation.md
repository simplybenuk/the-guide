# Elixir Hosting and Catalogue — Development Validation

## Status

**READY FOR INDEPENDENT REVIEW**

Local H01–H07 implementation is complete against
`docs/specs/elixir-hosting-and-catalogue.md`. H08 independent review and any
required remediation remain before human output review.

## Scope completed

- Strict publisher, immutable release, mutable catalogue, taxonomy, collection,
  and withdrawal contracts with cross-record validation.
- Exact migration ledger for Signal, Mystery, and Story `0.1.0`.
- Registry-driven deterministic build and exact-tree artifact audit.
- Byte-identical publisher-qualified and permanent legacy cartridge paths.
- Metadata-only catalogue index, static collection/version pages, local search,
  filters, controlled share state, factual trust records, and explainable
  related items.
- Deterministic withdrawal tombstone and append-only ledger fixtures.
- Fail-closed protected-base release and withdrawal ledger enforcement in the
  manual Pages workflow; publication requires externally controlled base,
  bootstrap-release, and exact-withdrawal digests with no candidate-tree fallback.
- Audited 500-entry production-shaped scale artifact outside production output.

## Immutable migration evidence

| Source | SHA-256 |
| --- | --- |
| Signal cartridge | `1c371b5813f6d93f37cabe486337f2680928f3e2ae5c19d4e86d40328f597cbb` |
| Mystery cartridge | `f02cc863fb1a7cabd137c7980c2206e947313fa0e010926d1754bb5cb7f2b093` |
| Story cartridge | `48f4cb4f2b9cbca8c4ce04ba844b12cfb28a6a2e5398cb211ad827e04d6874d9` |
| Signal artwork | `bc91387fba453db6efcea7c5cb1464c9fcf4271672c467806d1973535fb51f5c` |
| Mystery artwork | `11951585da65e906b2c94488598bf72eca6d1e4a4a5b40b1d49d0437253d022e` |
| Story artwork | `be8da2a8d9fa5e8a723d1cdb6f72ef37526201f6602e21e5b9607f7278fed4ba` |

Build and browser fixtures confirm current legacy URLs, self-contained prompt
bytes, resolver URLs, raw copy, download filenames, local event references,
covenant, and compatibility state remain unchanged. New namespaced cartridge
paths equal the same validated source buffer.

## Production artifact evidence

- Prior reviewed delivery artifact: 16 files, 6,205,296 bytes.
- Current catalogue artifact: 33 files, 6,323,373 bytes.
- Increase: 17 files and 118,077 bytes (approximately 1.9%).
- Public `catalogue-index.json`: 8,813 bytes.
- Initial `index.html`: 17,977 bytes.
- Audit rejects unexpected/missing files, namespaced or legacy byte divergence,
  public-index tampering, remote origins/assets, runtime/server markers,
  collectors, persistence, credentials, package commands, symlinks, and
  unapproved pinned-source placement.

## Hundreds-scale evidence

The deterministic 500-entry fixture now creates strict publisher, taxonomy,
release-ledger, catalogue, collection, withdrawal, cartridge, and artwork
records and passes them through `loadCatalogue`, the production build, and the
production exact-tree audit. It produced:

- 21 static catalogue pages with at most 24 cards per page;
- 3,030 allowlisted production-shaped files;
- 18,562,233 total bytes;
- 1,217,992-byte metadata index;
- 874,267-byte initial root HTML containing 24 cards;
- 487.7 ms strict registry validation;
- 1,230.3 ms production build;
- 1,113.4 ms production audit;
- 3.3 ms browser exact-title search; and
- 2.3 ms browser one-facet filtering.

The fixture covers collection rendering, related-item rules, path-collision
rejection, complete detail/version paths, static no-JavaScript pagination, and
mobile browser search/filter/show-more behaviour. Its compact listing index is
strict, identity-unique, metadata-only, and contains no cartridge delimiter.
Initial root HTML contains exactly 24 entries. Fixture files never enter
`dist/elixirs-pages/`.

## Independent-review remediation

The first independent review returned four blocking and two should-fix
findings. Development then:

- strictly validated the full artwork manifest and added independent source and
  destination containment plus malicious traversal/unknown/duplicate/
  unreferenced tests;
- added the local protected-base release-ledger command and required it in the
  manual publication workflow using a repository-controlled variable rather
  than candidate input;
- made build and audit share supplied lifecycle state, exercised exact
  canonical/legacy tombstones and delivery/discovery removal, and added
  deprecated/superseded successor guidance before delivery;
- replaced the miniature scale helper with a full production-stack fixture and
  bounded production rendering to 24 initial cards plus complete static pages;
  and
- exposed maintenance, review/compatibility evidence references, artwork
  provenance, rights, source revision, and lifecycle facts on detail/version
  surfaces.

The fresh review then found three deeper blockers and two evidence gaps.
Development additionally:

- validated every artwork `referenceAsset`, rejected symlinks in every path
  component, enforced realpath containment in validation and build, and added
  dangling-reference and parent-symlink probes;
- removed the bootstrap fallback and made the manual workflow fail closed until
  both externally controlled ledger variables are configured; local bootstrap
  comparison now requires the external digest explicitly;
- separated recommended-entry lifecycle from release-version lifecycle and
  added real two-version, same-ID supersession and withdrawal build/audit
  fixtures in which `0.2.0` remains discoverable and deliverable;
- copied complete redacted review/compatibility evidence into the exact audited
  tree and linked evidence, provenance, and terms from detail/version pages;
  and
- refreshed all production and 500-entry measurements below from the final
  remediation tree.

The third review then found that withdrawal history itself could still be
removed by an ordinary edit and that successor records could disagree.
Development additionally:

- added append-only protected-base withdrawal comparison to the same required
  publication command, plus an external digest authorizing the exact candidate
  withdrawal ledger; deletion, mutation, reorder, missing authority, and an
  ordinary reinstatement attempt now fail closed;
- made the withdrawal and per-release successor one authoritative matching
  relationship, rejected self or non-published targets, emitted an exact-version
  Markdown successor link in the deterministic tombstone, and exposed the same
  exact-version link on the withdrawn version page; and
- extended the two-version same-ID fixture through mismatch, unsafe target,
  tombstone link, version link, build, and audit behavior.

The fourth review verified those controls but found that one unqualified
relative Markdown target could not resolve from both the canonical and
shallower legacy cartridge paths. The final renderer keeps the tombstone bytes
identical while emitting clearly labelled publisher-qualified and permanent-
legacy navigation links, each calculated from its declared public-path depth.
URL-resolution tests cover successor and no-successor catalogue fallback links
from canonical/legacy locations at both host root and `/the-guide/` subpath.

The fifth review verified the complete lifecycle and ledger boundary but found
that an interim manifest edit mislabeled a generic validation document as the
artwork generation reference. The final provenance model now distinguishes an
active reference file from an archived Git reference. Signal, Mystery, and
Story name the true retired expedition-atlas path, exact preserved revision,
Git blob, byte count, and SHA-256, backed by a dedicated recovery record. A test
resolves that revision/path to the declared blob and hashes its 1,604,953 bytes;
the three published artwork digests remain unchanged.

## Required validation

`npm run validate` passed on 2026-07-18:

- ESLint: passed with zero warnings.
- TypeScript strict typecheck: passed.
- Vitest: 13 files, 78 tests passed.
- Static build: passed.
- Artifact audit: 33 files, 6,323,373 bytes passed.
- Playwright: 13 mobile Chromium journeys passed at root and `/the-guide/`,
  including 320 CSS pixels, 200% text, reduced motion, keyboard use, local
  search/filter/sort/clear, controlled filter URLs, collections, related items,
  version facts, canonical/legacy equality, clipboard outcomes, event privacy,
  no-JavaScript browse/delivery, and bounded 500-entry browser discovery.
- Protected-base release audit: with the exact external bootstrap revision and
  digest supplied explicitly, the command retained zero existing entries and
  admitted the three owner-approved initial entries; absent external digest,
  absent/abbreviated/false base, mutation, deletion, and reordering are rejected.
- Protected-base withdrawal audit: the exact external empty-ledger digest
  retained zero entries; missing/mismatched authority, mutation, deletion,
  reordering, and removal from a committed withdrawn base are rejected.
- `git diff --check`: passed.
- Canonical cartridge and artwork SHA-256 checks: passed.

The T3 collaborative preview returned an explicit no-automation-host error for
both status and open. The project Playwright suite was therefore used as the
documented browser fallback.

## Privacy and authority result

No search query, gameplay content, boundary, transcript, prompt, memento,
credential, provider identity, stable user/device ID, or event leaves the page
or enters persistent browser storage. Delivery event contract `1.1.0` remains
local, ephemeral, strict, and unchanged in meaning. No backend, API, account,
analytics collector, creator intake, third-party runtime script, remote asset,
or deployment was added.

## Commit and external-state status

Changes are uncommitted. No push, pull request, deployment, publication,
withdrawal, release/tag, domain change, analytics collection, account system,
creator submission, or compatibility claim occurred.

The repository variables `ELIXIR_LEDGER_BASE_REVISION`,
`ELIXIR_BOOTSTRAP_LEDGER_SHA256`, and
`ELIXIR_APPROVED_WITHDRAWALS_SHA256` are not configured under this local
development authority. This is an intentional fail-closed deployment
precondition, not a development bypass; configuring them requires separate
external-state and publication authority.

## Next handoff

Run `bwh-agent-review` against the approved specification, this evidence, the
active plan, and the implementation. Resolve all blocking and should-fix
findings before human review.

## H09–H11 collection-led refinement evidence

Human catalogue review found that the original root page still behaved like an
exhaustive three-card catalogue and would become an overlong vertical feed. The
approved refinement changes presentation only: one deterministic editorial
spotlight, collection-backed horizontal shelves, compact listing cards, and a
dedicated `/browse/` search/filter/pagination surface.

Full `npm run validate` passed on 2026-07-19 after the refinement:

- ESLint and strict TypeScript typecheck passed with zero warnings or errors.
- Vitest passed 13 files and 79 tests, including both 100- and 500-entry
  production-shaped fixtures. At either scale, the root renders one spotlight
  plus the three members of the fixture collection rather than the complete
  catalogue; `/browse/` retains all entries in 24-item static pages.
- The deterministic production artifact audit passed exactly 34 allowlisted
  files and 6,333,353 bytes. The additional file is the dedicated
  `browse/index.html`; no backend, collector, persistence, remote asset, service
  worker, third-party runtime, or carousel dependency was introduced.
- All 13 mobile Chromium journeys passed at host root and `/the-guide/`, with
  local search/filter/sort on `/browse/`, shelf controls, 320 CSS pixels, 200%
  text, reduced motion, no document overflow, no-JavaScript root/browse/
  collection/detail/delivery navigation, unchanged exact cartridge delivery,
  and zero authored off-origin requests or browser storage.
- The 500-entry browser fixture measured 2.4 ms search and 1.4 ms filtering,
  below one animation frame in the project environment.
- Direct Playwright visual captures at 1440×1000 and Pixel 5 dimensions showed
  the editorial feature, compact shelves, visible next-card cues on mobile, and
  a separate denser browse view. T3 preview explicitly reported no automation
  host; the installed browser fallback skill had no executable, so the working
  repository Playwright browser supplied the direct visual evidence.
- `git diff --check` passed for the refinement. Changes remain uncommitted and
  undeployed; cartridge/artwork bytes, event contract `1.1.0`, compatibility,
  privacy boundaries, and external publication authority are unchanged.

The next required handoff is an independent `bwh-agent-review` of H09–H11.
