# File-first Elixir delivery — independent agent review

## Verdict

**READY FOR HUMAN TESTING**

Independent re-review on 2026-07-19 found no remaining blocking or should-fix
issue against `docs/specs/elixir-use-without-installing-delivery.md`. The prior
filename validation, collision, source-description, and named-host evidence
findings are resolved. This verdict authorizes the next human output-testing
gate only; it does not authorize publication, deployment, release, or a broader
compatibility claim.

## Scope and authority

- Authoritative specification:
  `docs/specs/elixir-use-without-installing-delivery.md` (`IN DEVELOPMENT`,
  owner-approved for bounded local development on 2026-07-19).
- Active tasks: F01–F05 in `docs/tasks/mvp.md`; this artifact supplies the F05
  independent-review result but does not edit planning state.
- Project guardrails: `.agents/project-adapter.md`, `.agents/context-map.md`,
  `docs/architecture.md`, and `content/elixirs/covenant.md`.
- Review boundary: current file-first delivery implementation and tests, local
  event contract `1.2.0`, `skills/agent-elixir/`, the generated skill archive,
  and `docs/evaluations/agent-elixir-host-matrix.md`. Existing catalogue and
  artwork work was considered only where the full artifact or immutable
  cartridge boundary depends on it.

## Re-review findings

No blocking or should-fix finding remains.

### Prior finding resolved — runtime acceptance evidence

`docs/evaluations/agent-elixir-host-matrix.md` now records a complete redacted
run on the named T3 Code `0.0.28` Codex sub-agent surface, with local Codex CLI
`0.144.6`, skill `0.1.0`, archive digest, cartridge identity, zero retries, and
an explicit scope limitation. A staged install from the generated ZIP exercised:

- one valid cartridge through accurate disclosure and the affirmative-consent
  gate without beginning play;
- missing, multiple, malformed, and truncated attachment failures before play;
- immediate stop and explicit role release after a consented run.

The recorded outputs show no guessing, retrieval, tool use, premature play, or
continuation prompt. The evidence is correctly limited to that local host and
does not claim ChatGPT, consumer-assistant, marketplace, or general Agent Skills
compatibility. This satisfies the file-first specification's AC10–12 evidence
requirement without weakening its fail-closed compatibility boundary.

### Prior finding resolved — filename controls and collisions

`scripts/elixirs/delivery-envelope.mjs` now rejects Unicode `Cc` and `Cf`
characters before slugging and validates the uniqueness of every active
`<title-slug>-<version>.md` name before the build removes or writes output.
Focused tests cover U+0085, U+009F, U+202E, path separators, traversal-like
inputs, empty slugs, invalid semantic versions, normalization collisions, and a
full build-level collision failure.

Independent probes confirmed that all three previously accepted hidden
characters are now rejected and that `Cafe` / `Café` at the same version fails
with a filename-collision error. All four current expected filenames remain
unchanged and their emitted bytes remain identical to the canonical cartridges.

### Prior finding resolved — source disclosure accuracy

`scripts/elixirs/build.mjs` now describes the visible source as the complete
story file served by the versioned link and download; it no longer says the
cartridge backs the launcher-prompt copy action. `scripts/elixirs/build.test.mjs`
fixtures both the corrected wording and absence of the inaccurate phrase. The
generated detail page matches the source.

## Confirmed implementation evidence

- Each detail page presents one primary `Download story` action, one linear
  attachment-and-prompt journey, exact visible launcher text, and one
  subordinate optional skill disclosure. Retired full-prompt, resolver, and
  raw-copy methods are not offered as equivalent play routes.
- The four suggested names are exactly `the-signal-elixir-0.1.0.md`,
  `the-mystery-elixir-0.1.0.md`, `the-story-elixir-0.1.0.md`, and
  `the-regency-ball-0.1.0.md`. Generated delivery paths are byte-identical to
  their canonical sources.
- `skills/agent-elixir/SKILL.md` remains generic and story-free, preserves
  higher-priority authority, requires exactly one complete attachment, gates
  play on affirmative consent, forbids retrieval and gameplay tools, and
  requires immediate stop and role release.
- `agent-elixir-0.1.0.zip` remains 2,697 bytes with SHA-256
  `0381ceb108bf633a3f3e6306bf681d485936f675b34339bbd724301a65792c92`.
  It contains only `agent-elixir/SKILL.md` and
  `agent-elixir/agents/openai.yaml`; archive integrity passes.
- Event contract `1.2.0` accepts only the current delivery methods and valid
  result/target combinations. Browser coverage confirms local ephemeral events,
  no analytics request, and no persistent browser state.
- Canonical cartridge and covenant files have no working-tree diff from `HEAD`.

## Validation performed

- Independently ran `npm run validate`: ESLint and TypeScript passed; all 17
  Vitest files / 111 tests passed; build and audit passed for 44 allowlisted
  files / 11,634,107 bytes; all 12 Playwright journeys passed.
- Independently ran the build and audit as the non-root `node` user after
  restoring ownership of the disposable `dist/elixirs-pages` tree created by
  the reviewer's preceding root run. Two consecutive node-user builds produced
  the identical aggregate file hash
  `e6436bcf43ddd5821000a586db88206ffee32b7d50deb91476e220745d1c46a6`;
  the node-user audit passed the same 44-file / 11,634,107-byte artifact.
- Ran focused hidden-control and normalization-collision probes: all failed
  closed with the intended validation errors.
- Ran `unzip -t` and SHA-256 verification on the generated skill archive: both
  passed and the reviewed digest was unchanged.
- Ran `git diff --check`: passed.

The line `fatal: Needed a single revision` printed during Vitest is output from
an intentional negative Git-revision fixture; the test command completed with
all 111 tests passing.

## Informational residual risks

- The skill is an instruction contract whose behavior depends on the selected
  host. The named local pass does not establish public marketplace installation
  or compatibility on another Codex surface, ChatGPT, or another agent.
- The named T3 Code surface did not expose its exact backing model build. The
  matrix records the visible host and CLI versions and keeps claims scoped
  accordingly.
- Browser download filenames are advisory and may be ignored by a browser; the
  selected title/version and immutable source remain visible when that occurs.
- Generated `dist/elixirs-pages/` output is disposable and must remain
  uncommitted. Running a root-owned build can leave it unwritable to the normal
  node user until the generated tree is removed or its ownership is restored;
  the implementation itself builds and audits successfully as `node`.
- No commit, push, deployment, publication, skill marketplace release,
  analytics, or compatibility promotion is authorized by this review.

## Human output-testing focus and handoff

Human testing should now focus on the subjective clarity of the download,
attachment, and short-prompt journey; whether the optional skill remains
visually subordinate and understandable; real browser filename behavior; and
the disclosure/consent/stop experience in the human's chosen harness. Preserve
the named-host evidence boundary when reporting results.

The next workflow state is **READY FOR HUMAN TESTING**. Any later public release
or compatibility promotion remains a separate human-authorized gate.
