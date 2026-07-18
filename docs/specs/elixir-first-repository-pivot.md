# The Guide — Elixir-first repository pivot specification

## Status

**NOT READY FOR HUMAN TESTING**

This specification turns the owner-confirmed Elixir-first direction into a
bounded, recoverable repository cleanup. PR #3 was merged to `main` as
`27a1de7d92fd49f18c51b826c81d82cbb095b235` on 2026-07-18. The exact final
coexistence snapshot is preserved remotely by the annotated
`hosted-prototype-final` tag.

The repository owner approved this specification for development on
2026-07-18. A01–A04 and independent review completed on the same date with no
blocking or should-fix cleanup finding. The cleanup is ready for human PR
review, but product output testing remains blocked by the pre-existing
second-live-harness requirement; ChatGPT still has zero runs and no
compatibility pass.

## Problem and desired outcome

The repository currently contains two complete product paths. The newly chosen
direction is the static Elixir cabinet, but the default commands, most source
files, dependencies, context map, and historical specifications still center
the hosted Next.js expedition. This makes the retired experiment look active,
burdens every install and validation run, and obscures how to build the product
that will actually continue.

The desired outcome is an Elixir-first repository where:

- `npm start` builds and serves the cabinet from a clean checkout;
- active source, tests, documentation, and dependencies all serve cartridges,
  cabinet presentation, static packaging, or harness evaluation;
- the former hosted application is absent from the active tree but exactly
  recoverable from the documented Git tag; and
- the existing compatibility evidence and second-live-harness blocker remain
  accurate.

## Actors

- A player comparing and handing an Elixir to an existing AI companion.
- A cartridge author maintaining transparent content, mechanics, and artwork.
- A maintainer building, testing, evaluating, and statically publishing the
  cabinet.
- A historical investigator recovering the former hosted prototype when its
  implementation or decisions need review.

## Goals

- Establish the Elixir cabinet as the sole active product path.
- Make the simplest local command sequence `npm install` then `npm start`.
- Remove hosted-only runtime code, assets, provider configuration, dependencies,
  tests, and configuration from the active branch.
- Replace competing hosted documentation with concise Elixir-first sources of
  truth.
- Preserve exact hosted recovery through Git rather than a heavy in-tree code
  archive.
- Keep current cartridge schema, safety covenant, artwork, evaluation evidence,
  static artifact audit, and manual-only Pages boundary intact.

## Non-goals

- Adding or redesigning a cartridge, including the proposed fourth story.
- Changing cartridge versions, behavior, covenant, compatibility labels, or
  artwork.
- Deploying Pages, publishing a release, changing a domain, or enabling an
  automatic deployment trigger.
- Claiming ChatGPT, consumer-assistant, or personal-agent compatibility.
- Rewriting Git history, force-pushing, or deleting the recovery tag.
- Keeping the hosted application runnable on the default branch.
- Creating a second package, subtree, or vendored copy for archived hosted code.
- Introducing accounts, APIs, databases, analytics, or transcript collection.

## Confirmed decisions

- Elixirs are the product direction; the hosted expedition is retired.
- Archival uses Git history plus a small in-repository recovery index, not a
  complete moved code tree.
- The annotated `hosted-prototype-final` tag points to merge commit `27a1de7` and
  has been pushed to `origin`.
- PR #3 remains the independently reviewed cabinet implementation. Cleanup will
  be a separate branch and PR.
- Compatibility remains evidence-scoped. The archive must not turn the Codex
  coding-agent result into a broader readiness claim.

## Assumptions

- The merged `main` history and pushed tag are sufficiently durable for the
  retired prototype; no separate binary backup is required.
- Existing hosted user data is local browser data only. Repository cleanup does
  not delete data on a user's device or perform a data migration.
- Hosted-only design ideas may be recovered from Git if needed; active docs
  should retain only principles that govern Elixir cartridges or the cabinet.
- Binding the local preview server to `0.0.0.0` is intentional for headless
  remote development. Documentation must warn that it is an unauthenticated
  development server and does not itself authorize public exposure.

## Requirements

### R1 — Active repository boundary

1. Active product code must be limited to canonical Elixir content, the static
   cabinet, its deterministic build/audit/evaluation tooling, and their tests.
2. The active tree must contain no Next.js route, React component, hosted
   expedition domain, provider adapter, archive implementation, local
   installation identity, or hosted API health route.
3. No active file may import or reference the retired runtime as a dependency or
   fallback product path.
4. The existing manual-only Pages workflow must remain manual and must continue
   to upload only the audited static artifact.

### R2 — Default commands and dependencies

1. From a clean checkout, `npm install` followed by `npm start` must build and
   serve the cabinet without requiring a separate build command.
2. `npm run build` must mean the deterministic Elixir static build.
3. `npm run dev` may alias the one-shot local build/server path until live
   rebuilding is separately justified; it must not launch Next.js.
4. Explicit `build:elixirs`, `start:elixirs`, `audit:elixirs`, and
   `test:e2e:elixirs` aliases may remain for workflow readability.
5. `npm run test:e2e` and `npm run validate` must target the active cabinet.
6. `npm run validate` must run lint/type checks where applicable, static/content
   tests, deterministic build, artifact audit, and cabinet browser tests.
7. Remove Next.js, React, React DOM, their type packages, and any other
   hosted-only dependency. Regenerate and verify the lockfile from the resulting
   package manifest.

### R3 — Hosted implementation archival

1. Remove `src/`, hosted pixel/audio assets under `public/`, the hosted browser
   test, hosted Playwright configuration, provider environment template, and
   hosted-only generation scripts from the active branch.
2. Remove Next.js-specific configuration and generated type entrypoints.
3. Add `docs/archive/hosted-prototype/README.md` containing:
   - the exact tag and commit;
   - what the snapshot contains;
   - commands to inspect, branch from, and restore the snapshot without
     rewriting current history;
   - a warning that the snapshot is retired and unmaintained; and
   - a list of the main removed source and documentation areas.
4. Do not copy large hosted source or binary assets into the archive directory.
5. The archive index must be reachable from active documentation without
   presenting the hosted prototype as a supported runtime.

### R4 — Documentation authority

1. Rewrite `README.md`, `docs/product-brief.md`, and `docs/architecture.md` so
   Elixirs are the sole active product and static handoff is the primary journey.
2. Replace the active task plan with Elixir maintenance, evaluation, and future
   cartridge work; retain the unresolved second-live-harness gate.
3. Update `.agents/context-map.md` and `.agents/project-adapter.md` so future
   work loads Elixir sources and uses the new default commands.
4. Keep these active historical/current artifacts:
   - the agent-harness, Elixir-library, and Elixir-first pivot discovery briefs;
   - the cartridge/cabinet specification and this pivot specification;
   - redacted Elixir evaluation records and final validation artifact; and
   - the canonical content documentation.
5. Remove hosted-only decisions, specifications, reviews, UX documents,
   top-level concepts, and planning indexes from the active tree after listing
   them in the archive index. Git remains their authoritative archive.
6. Documentation must continue to state that ChatGPT evaluation is
   environment-blocked with zero runs and is not passed.

### R5 — Security and recovery

1. Cleanup must not alter cartridge bytes, their versioned paths, artwork bytes,
   evidence records, or the canonical covenant.
2. The preview server may remain bound to all interfaces for the authorized
   remote workflow, but its documentation must state that it is unauthenticated,
   intended for development, and should be protected by host firewall or SSH
   access controls.
3. No provider credential, hosted environment field, archive data, transcript,
   or local storage behavior may enter the cabinet artifact.
4. Recovery instructions must use non-destructive Git operations. Restoring the
   hosted prototype for investigation must create a separate branch or worktree,
   not reset the active branch.
5. The cleanup PR must not deploy, release, modify Pages settings, or change the
   `hosted-prototype-final` tag.

## Proposed design

### Active tree

```text
.agents/                         Elixir-first workflow context
.github/workflows/               manual static Pages workflow
content/elixirs/                 canonical covenant and cartridges
docs/
  archive/hosted-prototype/      compact recovery index only
  discovery/                     Elixir direction discovery
  evaluations/                   redacted harness evidence
  specs/                         active cartridge and pivot specs
  tasks/                         current Elixir work
scripts/elixirs/                 schema, build, audit, serve, evaluation
site/elixirs/                    static presentation and original artwork
tests/elixirs/                   cabinet browser journeys
package.json / lockfile          Elixir-only toolchain and commands
```

### Command design

The intended command behavior is:

```text
npm start
  -> deterministic cabinet build
  -> artifact audit
  -> static preview server

npm run build
  -> deterministic cabinet build

npm run validate
  -> lint/typecheck as retained
  -> all Elixir unit/content/security/workflow tests
  -> deterministic build and artifact audit
  -> cabinet Playwright journeys
```

The server should print both the local URL and a concise all-interfaces warning.
No production server semantics, authentication, TLS, caching policy, or daemon
management are implied.

### Git-native recovery

The archive index will document commands equivalent to:

```text
git show hosted-prototype-final
git switch --create investigate-hosted-prototype hosted-prototype-final
git worktree add <separate-path> hosted-prototype-final
```

It must not recommend resetting or checking out archived files over active work.

## Rollout

1. Preserve the final hosted snapshot tag before any removal — complete.
2. Add the archive index and rewrite active source-of-truth documents.
3. Normalize package commands and cabinet test configuration.
4. Remove hosted source, assets, dependencies, tests, configuration, and
   hosted-only documents.
5. Perform a clean dependency install and full active-product validation.
6. Run independent agent review against this specification.
7. Commit and push the bounded cleanup branch, then open a separate draft PR to
   `main`.
8. Human reviews and merges the cleanup PR. No deployment occurs automatically.

## Recovery

- Before merge, close the cleanup PR and retain `main` unchanged.
- After merge, use a new branch or worktree at `hosted-prototype-final` to
  inspect or run the retired snapshot.
- Reintroducing hosted functionality into the active product requires a new
  human-approved specification; do not silently copy it back during unrelated
  maintenance.
- The static cabinet can also be restored to the last reviewed merge commit if
  cleanup validation exposes an unforeseen dependency.

## Risks and mitigations

- **Hidden hosted dependency:** inventory imports and run clean-install/full
  validation after dependency removal.
- **Historical safety guidance disappears:** retain applicable Elixir covenant
  and architecture rules; list removed documents in the recovery index.
- **Archive becomes hard to find:** link the archive index from README and the
  context map, with exact tag/commit and tested commands.
- **Default preview is network-reachable:** print and document the
  unauthenticated-server warning; rely on firewall/SSH controls for remote use.
- **Large deletion hides unrelated changes:** use a dedicated branch and PR,
  stage by bounded area, and include an explicit removal inventory.
- **Validation narrows too far:** ensure every active schema, content, artwork,
  artifact, workflow, and browser suite remains in the default validation path.
- **Compatibility blocker is lost in cleanup:** retain the evaluation matrix,
  final validation artifact, metadata labels, and active task entry.

## Acceptance criteria

1. A clean checkout succeeds with `npm install` followed by `npm start`, and the
   resulting root cabinet is usable.
2. `npm run build` emits the same deterministic 14-file static artifact expected
   by the current audit.
3. `npm run validate` passes all active Elixir schema, content, artwork,
   artifact, workflow, and root/subpath browser checks.
4. The active dependency graph contains no Next.js, React, or hosted-provider
   runtime package.
5. The active tree contains no `src/` hosted app, hosted public assets, provider
   environment template, hosted API/browser suite, or Next.js configuration.
6. Signal, Mystery, and Story cartridge bytes and artwork hashes are unchanged
   from merge commit `27a1de7`.
7. The Pages workflow remains manual-only, least-privilege, and limited to the
   audited static artifact.
8. README, product brief, architecture, context map, adapter, and task plan all
   identify Elixirs as the sole active direction and contain no default hosted
   run path.
9. Active docs retain the coding-agent-only experimental label, the ChatGPT
   environment blocker, and the required second live harness class.
10. `docs/archive/hosted-prototype/README.md` names tag
    `hosted-prototype-final`, commit `27a1de7`, the retired areas, and safe
    branch/worktree recovery commands.
11. Hosted-only documentation is absent from active source-of-truth locations
    and remains retrievable from the tagged snapshot.
12. The preview server clearly warns that its all-interface binding is an
    unauthenticated development convenience rather than a public deployment.
13. No Pages deployment, release, domain change, data migration, force push, or
    tag mutation occurs.
14. Independent agent review reports no blocking or should-fix finding before
    the cleanup is handed to the human PR review.

## Development-readiness bundle

### Proposed task outline

1. **A01 — Establish archive and Elixir-first documentation**
   - Add the tagged-snapshot recovery index.
   - Rewrite active overview, product, architecture, context, adapter, and plan
     documents.
   - Remove hosted-only documentation from active locations.
2. **A02 — Make Elixirs the default toolchain**
   - Normalize package commands and Playwright/Vitest/TypeScript/ESLint
     configuration around the cabinet.
   - Add a clear preview-server exposure warning and local run documentation.
3. **A03 — Remove the hosted runtime**
   - Remove hosted source, assets, environment template, generator, browser
     suite, configurations, and dependencies.
   - Regenerate the lockfile and verify cartridge/artwork immutability.
4. **A04 — Validate, independently review, and publish the cleanup PR**
   - Perform a clean install, full active validation, artifact audit, recovery
     checks, and independent review.
   - Commit/push the cleanup branch and open a separate draft PR without
     deploying.

### Dependencies

- Merged cabinet implementation at `27a1de7` — complete.
- Pushed `hosted-prototype-final` recovery tag — complete.
- Human approval of this specification before A01.
- Node.js 20.9 or later and npm for clean-install validation.
- Browser dependencies required by the cabinet Playwright suite.

### Affected areas

- Root package manifest, lockfile, commands, Next.js/TypeScript/ESLint/Vitest and
  Playwright configuration.
- `.agents/context-map.md` and `.agents/project-adapter.md`.
- `README.md`, active product/architecture/task documents, and new archive
  index.
- Removal of hosted-only top-level concepts and documentation.
- Removal of `src/`, `public/`, hosted tests, environment template, and
  hosted-only scripts.
- No cartridge, artwork, evaluation record, Pages permission, or deployment
  setting is an intended behavioral change.

### Validation plan

- Record SHA-256 hashes for all three canonical cartridge sources and artwork
  files before cleanup; compare them after every task and at final review.
- Verify the recovery tag locally and remotely resolves to `27a1de7`.
- Regenerate dependencies from the edited manifest and run an unused/import
  inventory before removing framework packages.
- Run focused Vitest suites after each task.
- Run deterministic build and artifact audit after toolchain changes.
- Run cabinet Playwright journeys at root and `/the-guide/`, including 320px,
  200% text, keyboard, reduced motion, clipboard denial, no JavaScript,
  same-origin requests, and no storage.
- Test `npm start` from a state with no `dist/elixirs-pages` artifact and confirm
  it builds, audits, serves, and prints the exposure warning.
- Verify the workflow remains manual-only and cannot deploy from pull requests.
- Verify removal inventory and archived-document retrieval from the tag.
- Run `git diff --check`, the final `npm run validate`, and independent
  `bwh-agent-review` before publication of the cleanup PR.

## Open questions

None. Any discovery of an Elixir dependency on hosted runtime code, or any need
to alter cartridge/evidence bytes, returns the specification to human review.

## Stop conditions

- Stop if the remote recovery tag does not resolve to the documented commit.
- Stop if cleanup requires changing cartridge, artwork, covenant, or evaluation
  evidence bytes.
- Stop if the static artifact requires a hosted runtime dependency.
- Stop before deployment, release, domain configuration, force push, tag
  mutation, or user-data migration.
- Stop and return to human approval if implementation materially expands beyond
  repository archival and default-command normalization.
