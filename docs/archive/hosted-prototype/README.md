# Retired hosted prototype archive

The former Next.js expedition prototype is retired and unmaintained. Its exact
final snapshot is preserved by the annotated Git tag
`hosted-prototype-final`, resolving to commit
`27a1de7d92fd49f18c51b826c81d82cbb095b235`.

That snapshot contains the hosted Next.js UI and APIs, provider adapter,
application-owned expedition state and safety validation, local browser archive,
pixel-art room and audio assets, hosted Playwright suite, product concepts,
decisions, specifications, UX documents, and review records.

## Safe recovery

Inspect the snapshot without changing the current branch:

```bash
git show hosted-prototype-final
git ls-tree -r --name-only hosted-prototype-final
```

Create an investigation branch:

```bash
git switch --create investigate-hosted-prototype hosted-prototype-final
```

Or keep the active checkout untouched with a separate worktree:

```bash
git worktree add ../the-guide-hosted-prototype hosted-prototype-final
```

Do not reset the active branch to this tag or copy the retired runtime back
during unrelated maintenance. Reintroducing hosted functionality requires a new
human-approved specification.

## Areas retired from the active tree

- `src/` and its Next.js routes, components, domain, adapters, and libraries
- `public/assets/pixel/`, `scripts/generate-audio.mjs`, and `.env.example`
- the hosted `playwright.config.ts` and `tests/e2e/guide.spec.ts`
- `life-game-concept.md`, `user-experience.md`, and hosted-only planning docs
- hosted-only decisions, discovery, reviews, specifications, and UX documents

The active Elixir cabinet, cartridges, artwork, and evaluation evidence remain
under normal development on `main`.
