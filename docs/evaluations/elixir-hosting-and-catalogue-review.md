# Elixir Hosting and Catalogue — Independent Agent Reviews

## Seventh review — H09–H11 collection-led refinement

### Status

**READY FOR HUMAN TESTING**

The approved H09–H11 catalogue refinement is ready for human output testing.
No blocking or should-fix finding remains. This verdict covers the
collection-led landing page, compact shelves and cards, dedicated browse
surface, scale behaviour, and regressions to the existing static delivery and
privacy contracts. It does not establish gameplay compatibility or satisfy the
separate E07 second-harness gate.

### Findings

#### Blocking

None.

#### Should-fix

None.

#### Informational

- The three-entry production catalogue intentionally repeats entries across
  truthful editorial shelves. The 100- and 500-entry production-shaped
  fixtures are the stronger structural evidence that catalogue growth does not
  turn the root into an exhaustive vertical feed; subjective usefulness and
  visual density remain appropriate human-test questions.
- T3 collaborative preview remained unavailable after both status and open
  attempts. Repository Playwright supplied the independent browser evidence;
  this is a tooling limitation, not a product fallback or implementation gap.

### Independent evidence

- The root renderer emits one deterministic spotlight, omits search controls
  and the exhaustive catalogue grid, and maps each published collection to a
  labelled semantic shelf with visible rationale and complete-collection link.
- Landing, shelf, collection, and browse listings share the compact card
  projection: artwork, title, promise, exactly three controlled fit signals,
  and factual lifecycle/status treatment. Full fact grids remain on detail and
  version pages.
- `/browse/` statically exposes 24 entries per page and complete relative
  pagination while progressively enhancing page one with local search,
  allowlisted facet URLs, deterministic sorting, clear recovery, and bounded
  show-more rendering. Search text is absent from URLs and persistence.
- Shelf enhancement uses native horizontal overflow plus labelled previous and
  next buttons, respects reduced motion, and adds no autoplay, loop, carousel
  dependency, focus trap, or document-level overflow. Item, collection, browse,
  detail, source, and delivery links remain usable without JavaScript.
- The 100- and 500-entry fixture assertions keep root card rendering bounded by
  the three-member fixture collection while retaining every entry across the
  complete browse pages. Listing artwork below the spotlight is lazy-loaded.

### Validation performed

- Focused build and scale validation passed: 2 files and 13 tests.
- Independent `npm run validate` passed on 2026-07-19: ESLint, strict
  TypeScript, 13 Vitest files with 79 tests, deterministic build, exact
  34-file/6,333,353-byte artifact audit, and all 13 mobile Chromium root,
  repository-subpath, 320-pixel, 200%-text, reduced-motion, no-JavaScript,
  privacy, delivery, and 500-entry journeys.
- The independent 500-entry browser run measured 2.5 ms search and 1.4 ms
  filtering, below one animation frame in the project environment.
- The implementation inspection found no backend, analytics collector,
  persistence, remote runtime dependency, service worker, delivery-event
  change, cartridge mutation, or publication action introduced by H09–H11.
- `git diff --check` passed after persisting this review. Changes remain
  uncommitted and undeployed.

### Residual risk and human testing focus

Human catalogue testing should focus on whether the spotlight and shelves feel
like useful editorial discovery rather than three repeated products; whether a
partially visible next card and shelf controls are understandable on mobile;
whether `/browse/` is easy to find and effective for deliberate lookup; and
whether compact cards provide enough fit information before opening a detail
page. Overall product testing remains gated by E07.

### Context and handoff

This review used the approved hosting/catalogue specification, active MVP plan,
H09–H11 validation record, collection records, static build/runtime/styles,
focused build and scale tests, and catalogue browser journeys. The catalogue
refinement handoff state is **READY FOR HUMAN TESTING**.

---

## Sixth review — pre-refinement hosting and catalogue implementation

## Status

**READY FOR HUMAN TESTING**

The hosting/catalogue implementation now satisfies the approved specification
and is ready for human catalogue output testing. No blocking or should-fix
implementation finding remains. The fifth-review artwork-provenance blocker is
resolved without changing the three published artwork or cartridge bytes.

This verdict is scoped to the hosting/catalogue workstream. The active plan
remains **NOT READY FOR HUMAN TESTING** because the separate E07 gate still
requires a complete second live harness class; catalogue readiness does not
establish gameplay compatibility.

## Findings

### Blocking

None.

### Should-fix

None.

## Fifth-review provenance remediation

- Artwork manifest schema v2 distinguishes an `active` reference, whose digest
  is checked against a contained live regular file, from an `archived_git`
  reference with exact path, revision, Git object, bytes, digest, and recovery
  record. Both variants are strict and reject unknown fields.
- Signal, Mystery, and Story all retain the truthful generation reference
  `public/assets/pixel/expedition-atlas.png` at revision
  `397135ef6495aef29f1c4df6805c0619ba1df28e`, Git blob
  `c5c8be90378f1cdd6403c5c4a26d62d8ef07de35`, 1,604,953 bytes, and SHA-256
  `d9ce9af9cf088319e599184595d32fe70e5a33e5d42b4e9b8067b671f28a68cc`.
  The previous unrelated validation-document substitution is absent.
- The dedicated checked-in recovery record at
  `content/catalogue/provenance/expedition-atlas.md` identifies every declared
  archive fact and the `hosted-prototype-final` recovery label. Registry
  validation cross-checks every archived reference against that record;
  independent probes confirmed that an unrelated recovery file, changed
  revision, or changed digest is rejected.
- The migration test resolves `revision:path` to the declared Git blob, reads
  the blob, checks its exact byte count, and hashes its bytes. Independent Git
  probes reproduced the same object, byte count, and SHA-256.
- Published artwork SHA-256 values remain exactly
  `bc91387fba453db6efcea7c5cb1464c9fcf4271672c467806d1973535fb51f5c`,
  `11951585da65e906b2c94488598bf72eca6d1e4a4a5b40b1d49d0437253d022e`,
  and `be8da2a8d9fa5e8a723d1cdb6f72ef37526201f6602e21e5b9607f7278fed4ba`;
  immutable release-ledger artwork bindings match them.

## Reconfirmed lifecycle and publication controls

- The T3 tombstone remediation remains correct: one digest-bound,
  byte-identical tombstone body contains separately labelled relative links
  that resolve from both publisher-qualified and permanent legacy paths, at a
  host root or repository subpath, to the exact published successor or the
  catalogue fallback.
- A withdrawal must match one append-only withdrawal-ledger record and the
  per-release lifecycle successor. Self, missing, withdrawn, mismatched, and
  non-published successors fail. The same-ID two-version fixture keeps `0.2.0`
  discoverable and deliverable while `0.1.0` is superseded or replaced at all
  cartridge paths by the audited tombstone.
- Protected release and withdrawal comparison remains fail closed without the
  externally controlled base and exact ledger digests. Existing entries cannot
  be changed, reordered, or removed through the candidate tree.
- Earlier path traversal and symlink defenses, registry-derived build/audit,
  bounded 500-entry pagination and local search, navigable trust evidence,
  privacy boundaries, and unchanged private delivery behavior remain covered
  and passed.

## Validation performed

- Focused provenance, catalogue, scale, lifecycle, ledger, and artwork Vitest
  passed: 4 files and 19 tests.
- Full `npm run validate` passed on 2026-07-19: ESLint, strict TypeScript,
  13 Vitest files with 78 tests, deterministic build, exact 33-file/
  6,323,373-byte artifact audit, and all 13 mobile Chromium root, subpath,
  no-JavaScript, and 500-entry journeys. Browser scale timing was 3.4 ms search
  and 2.1 ms filtering.
- `git diff --check` passed. Signal, Mystery, and Story cartridge and artwork
  hashes match the approved baselines. The independent Git archive checks and
  adversarial recovery-record probes passed.

## Residual risk and human testing focus

The three external publication variables remain intentionally unconfigured and
fail closed; configuring them, publishing, or withdrawing content still needs
separate owner authority. No commit, push, PR, deployment, publication,
withdrawal, analytics, backend, account, creator intake, or compatibility claim
was made during review.

Human catalogue testing should focus on whether artwork provenance and archive
recovery facts are understandable, exact-version withdrawal/successor
navigation is clear, mobile shortlisting remains usable, no-JavaScript
pagination is complete, and the existing private delivery paths feel unchanged.
Overall gameplay output testing remains gated by E07.
