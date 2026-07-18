# Elixir-first repository pivot discovery brief

Date: 2026-07-18

Status: **DISCOVERY COMPLETE — ARCHIVE METHOD TO CONFIRM**

## Idea and desired outcome

The portable Elixir cabinet is now the product direction for The Guide. The
repository should make that direction unmistakable: its default commands,
source tree, documentation, validation, and future planning should all lead to
the static cabinet and transparent cartridges. The former hosted Next.js
expedition should stop competing as an active product path.

The desired outcome is a small Elixir-first repository in which a new
contributor can install dependencies, build or start the cabinet, add a
cartridge, run the relevant checks, and understand the product without first
learning the retired hosted orchestration system.

## Actors

- **Player:** chooses an Elixir and gives it to an AI companion they already
  use.
- **Cartridge author:** creates and validates transparent, bounded game content
  and artwork.
- **Maintainer:** develops the static cabinet, evaluates harness behavior, and
  publishes reviewed artifacts.
- **Historical investigator:** may need to recover the hosted prototype or its
  design decisions without keeping it in the active build.

## Confirmed decisions and known facts

- The repository owner selected the Elixir cabinet as the direction on
  2026-07-18 and authorized archiving work that does not drive it.
- The cabinet is a standalone static artifact under `content/elixirs/`,
  `site/elixirs/`, and `scripts/elixirs/`; it does not depend on the hosted
  Next.js application.
- The hosted prototype lives primarily under `src/`, `public/assets/pixel/`,
  `tests/e2e/guide.spec.ts`, the default Playwright configuration, and its
  associated product/specification documents.
- The current default `npm start` launches the hosted Next.js application. It
  does not launch the Elixir cabinet.
- Git history already preserves every committed hosted file. A named archive
  tag or branch can make the final hosted snapshot easier to recover.
- The Elixir implementation has passed its local automated and independent
  review gates. Its second-live-harness compatibility gate remains open and
  must not be erased by this pivot.
- PR #3 contains the cabinet implementation and should remain independently
  reviewable from the follow-on archival change.

## Assumptions

- “Archived” means removed from the active product surface but recoverable,
  not permanently erased from repository history.
- The old hosted prototype does not need to remain runnable from the default
  branch after archival.
- Historical prose should be retained only when it explains the Elixir pivot,
  safety boundary, provenance, or a still-relevant product decision.
- The repository should retain development workflow files under `.agents/`,
  updated to point at the new source of truth.

## Recommended scope

### Make Elixirs the active root product

- Change `npm run build` to build the static cabinet and `npm start` to serve
  the built cabinet; retain explicit aliases such as `build:elixirs` and
  `start:elixirs` where they improve clarity.
- Make the default test and validation commands cover cartridge schema,
  content, artwork, artifact security, workflow safety, and cabinet browser
  behavior only.
- Rewrite the README, product brief, architecture, context map, and active task
  plan around cartridge authoring, handoff, static hosting, and cross-harness
  evidence.
- Keep the three canonical cartridges, cabinet source, artwork, static build,
  audit/evaluation tools, redacted evidence, Pages workflow, and relevant tests.

### Retire the hosted product from the active tree

- Remove the Next.js application and APIs under `src/`.
- Remove hosted-only pixel/audio assets, generator, environment template,
  hosted Playwright suite/configuration, and provider/orchestration tests.
- Remove Next.js, React, and hosted-only type/config dependencies after proving
  no Elixir build or test imports them.
- Move a concise index of the retired product, final snapshot reference, and
  recovery instructions under `docs/archive/hosted-prototype/`; rely on Git for
  the full code and large binary history.
- Move hosted-only specs, UX, decisions, reviews, and discovery documents under
  that archive index or remove them from the active branch when Git history is
  the clearer source. Preserve original attribution and dates.

## Non-goals

- Rewriting the cartridges or adding the proposed fourth game.
- Deploying GitHub Pages, changing domains, or releasing publicly.
- Claiming ChatGPT or a second harness class compatible.
- Deleting Git history, force-pushing, or removing recoverability.
- Redesigning the cabinet during repository cleanup.
- Building a marketplace, server, account system, or hosted transcript path.

## Material options

### Option A — Git-native archive with a small in-repo index (recommended)

Create a named final hosted snapshot tag or archive branch, add a compact
`docs/archive/hosted-prototype/README.md` with the commit reference and recovery
commands, then delete hosted code, dependencies, binaries, tests, and most
hosted-only documents from the active branch.

This gives the cleanest Elixir-first repository and keeps recovery exact. It
does require explicit authorization for the remote tag or archive branch and
makes old code browsing a Git-history operation.

### Option B — Move the complete hosted prototype under `archive/`

Move source, assets, tests, configuration, and documents into an ignored
in-repository archive tree.

This keeps history visible in a normal checkout but preserves substantial
weight and creates ongoing lint, dependency, security-scanning, and navigation
noise. Making the old app runnable would also require maintaining a second
package boundary. This is not recommended.

### Option C — Label the hosted implementation legacy but leave it in place

Change documentation and commands while retaining the current source tree.

This is the least disruptive but does not satisfy the stated goal: contributors
and automated tooling would continue to treat two products as active. This is
not recommended.

## Risks and mitigations

- **Useful safety knowledge is lost:** extract still-relevant principles into
  the Elixir architecture/covenant before retiring hosted documents.
- **Recovery is obscure:** record the exact final hosted commit and tested Git
  recovery commands in the archive index; optionally create a protected tag.
- **Cleanup breaks cabinet tooling:** remove dependencies incrementally and run
  the full Elixir suite plus a clean install before review.
- **PR #3 becomes difficult to review:** merge the cabinet first, then perform
  archival cleanup in a separate bounded PR.
- **Default server is exposed unintentionally:** make host binding explicit and
  document remote-server exposure; do not treat `0.0.0.0` as authorization to
  publish or bypass a firewall.
- **Compatibility evidence is mistaken for product readiness:** retain the E07
  matrix, experimental labels, and second-class blocker in active docs.

## Success signals

- `npm install`, `npm run build`, and `npm start` operate the Elixir cabinet by
  default, with the local URL printed clearly.
- A clean checkout contains no active Next.js route, provider credential
  configuration, hosted archive state, React runtime, or hosted browser test.
- `npm run validate` covers the complete active Elixir product and passes after
  a clean dependency install.
- Active documentation names Elixirs as the sole direction and links one
  obvious cartridge-authoring and evaluation path.
- The final hosted implementation can be recovered from the documented Git
  snapshot without ambiguity.
- PR #3 remains a focused cabinet implementation; archival cleanup lands in a
  separately reviewed change.

## Dependencies and validation

- Merge or rebase from PR #3 before beginning the archival implementation.
- Confirm the archive method and whether a remote tag/archive branch is
  authorized.
- Inventory imports before dependency removal and verify a regenerated lockfile
  from a clean install.
- Run unit/content tests, deterministic build, artifact audit, root/subpath
  Playwright journeys, workflow checks, lint/typecheck as retained, and
  `git diff --check`.
- Complete independent agent review before merging the archival PR.

## Decision needed before specification

Confirm Option A (recommended) or Option B. If Option A is selected, also
confirm whether the final hosted snapshot should be preserved by a pushed Git
tag/archive branch or only by the immutable merge history plus the in-repo
archive index.

## Stop conditions

- Do not move or delete hosted files until the archive mechanism and exact
  recovery reference are approved in a specification.
- Do not merge PR #3, publish Pages, create a remote tag/archive branch, or
  change a production domain without separate explicit authorization.
- Do not remove the open cross-harness compatibility blocker from active
  evidence.
