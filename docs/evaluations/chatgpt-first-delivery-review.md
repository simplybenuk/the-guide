# ChatGPT-first Elixir delivery — independent review

Date: 2026-07-18

Status: **NOT READY FOR HUMAN TESTING**

## Verdict

The local ChatGPT-first delivery implementation satisfies the approved
specification with no remaining blocking or should-fix implementation finding.
Human output testing remains blocked solely by the existing live-evidence gate:
ChatGPT has zero runs and remains `untested`, so the project still has only one
completed live harness class.

## Review findings and resolution

The initial independent review found:

1. a blocking artifact-audit gap for arbitrary third-party scripts, unexpected
   origins, and alternative collector mechanisms;
2. weaker duplicate browser validation for event IDs and timestamps; and
3. acquisition aggregation without a declared time window.

Development resolved all three findings. Re-review confirmed:

- the artifact audit allowlists the sole expected absolute GitHub privacy URL
  and rejects unapproved origins, remote resources, collector paths, refresh
  redirects, common analytics markers, and representative network-capable APIs;
- Node and generated browser validation share strict UUIDv4 and canonical UTC
  patterns and reject malformed or impossible timestamps; and
- aggregation requires a valid half-open time window, excludes events outside
  it, and returns the declared bounds with each action group.

Canonical timestamps use the producer's millisecond UTC form (`.sssZ`). This is
narrower than the specification's illustrative timestamp but is internally
consistent and does not weaken the privacy, identity, or popularity semantics.

## Validation evidence

- Independent `npm run validate` passed: lint, strict TypeScript checking, 9
  Vitest files with 51 tests, deterministic static build, artifact audit, and 8
  Playwright journeys.
- `npm run audit:elixirs` passed for exactly 15 allowlisted static files totaling
  6,167,559 bytes.
- `git diff --check` passed.
- Browser coverage verifies ChatGPT-first copy, exact immutable URL resolution,
  complete-cartridge copy, download initiation, local event shape, denied
  clipboard fallback, no event-network request, empty browser storage,
  root/subpath operation, accessibility, and no-JavaScript fallbacks.
- Canonical cartridge, covenant, and artwork sources are unchanged.
- No live analytics collection, MCP implementation, deployment, publication,
  release, domain change, tag change, commit, or push occurred.

## Acceptance assessment

The locally testable acceptance criteria are materially satisfied. Delivery
actions are strictly validated and dispatched in-page without transmission or
persistence; future popularity means declared-window acquisition actions rather
than users or plays; the static trust and fallback paths remain intact.

The external ChatGPT criteria are not passed or failed because no authenticated
consumer session is available. The collaborative browser reported no automation
host for both status and open attempts. URL, file, and paste therefore remain at
zero ChatGPT runs, with no delivery or compatibility claim.

## Resume condition

In an authorized environment with an authenticated ChatGPT session and a
test-reachable immutable cartridge origin, run the approved URL, file, and paste
delivery cases plus the complete consumer-assistant conformance matrix. Persist
only redacted version-scoped evidence, derive compatibility fail-closed, repeat
independent review, and only then reconsider human output testing.
