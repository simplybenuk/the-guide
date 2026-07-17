---
name: bwh-adopt
description: Install the BWH AI workflow into a project or safely update an existing installation, preserving project-specific adapters, rules, and customisations while recording the pinned source revision.
---

# BWH Workflow Adopt

Use this skill from the root of the consuming project when the user asks to add, install, adopt, sync, upgrade, or update the BWH workflow from this repository.

The workflow source package consists of `skills/bwh-*`, `contracts/`, and the two project templates. The consuming project remains authoritative for its own `AGENTS.md`, adapter, source-of-truth files, schemas, validation commands, permissions, and release policy.

## Source resolution

Resolve the source in this order:

1. If the user supplied a source path, use it.
2. If the current repository is this workflow repository and contains `contracts/` plus `skills/bwh-*`, use it directly.
3. Otherwise clone the public source into a temporary directory:

   `https://github.com/simplybenuk/bwh-ai-workflow.git`

Use the requested commit, tag, or branch when specified. Otherwise pin the resolved commit SHA. Never use an unrecorded floating checkout for an install or update.

## Install a new workflow

1. Confirm the target is a project root and inspect `AGENTS.md`, `.agents/`, and any project adapter/context files.
2. Create `.agents/skills` and `.agents/contracts` if absent.
3. Copy every source `skills/bwh-*` directory into `.agents/skills/` and copy the contents of source `contracts/` into `.agents/contracts/`. Do not replace `AGENTS.md` or project documentation.
4. If no adapter exists, create one from `templates/project-adapter.md` at the project’s documented adapter location. If no context map exists, create or adapt one from `templates/project-context.md`. Fill in project-specific values only when supported by repository evidence; otherwise leave explicit placeholders and report them.
5. Write `.agents/bwh-ai-workflow.lock` with the source URL/path, resolved revision, install date, and installed directories. A minimal format is:

   ```text
   source: https://github.com/simplybenuk/bwh-ai-workflow.git
   revision: <commit-sha-or-tag>
   installed_at: <yyyy-mm-dd>
   installed_paths: .agents/skills/bwh-*, .agents/contracts/
   ```

   Do not overwrite an existing lock during a new install without inspecting it first.
6. Validate that all installed skills have valid frontmatter, all referenced shared contracts exist, and the adapter names the required validation and source-of-truth locations.

## Update an existing workflow

1. Read `.agents/bwh-ai-workflow.lock` and resolve the current installed revision. Compare it with the requested source revision.
2. Inspect the source diff for changes to skill triggers, output headings, stop conditions, contracts, and state names. Summarise material changes before applying them.
3. Compare source and target with a temporary checkout or `diff -ru`. Identify target files that differ from the installed revision. Treat differences in `.agents/skills/bwh-*` and `.agents/contracts/` as possible local customisations, not permission to overwrite blindly.
4. Preserve project adapters, `AGENTS.md`, source-of-truth documents, PRDs, and unrelated local files. If a managed file has local edits, show the conflict and ask whether to replace, merge, or skip it when the choice could lose project intent.
5. Apply the approved source changes. Remove stale managed files only when the diff proves they were removed upstream and they have no local edits; otherwise leave them and report them.
6. Update the lock file only after the copy succeeds, then run the project’s relevant checks and one representative end-to-end workflow smoke test.

## Safety and completion

- Do not run destructive cleanup such as recursive deletion or reset commands.
- Do not commit, push, publish, or open a pull request unless separately requested.
- Do not invent adapter values, validation commands, permissions, or domain rules.
- If the source cannot be resolved, the target has conflicting local edits, or required project checks are unknown, stop with the exact blocker and the smallest safe next action.
- A successful handoff states whether this was an install or update, source and pinned revision, directories changed, adapter/context status, conflicts preserved or resolved, validation evidence, smoke-test result, and remaining actions.
