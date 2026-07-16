---
name: bwh-spec
description: Turn a rough product or engineering idea into a bounded specification with development-readiness artifacts for human approval and downstream execution.
---

# Spec

Apply the shared contracts in `../../contracts/autonomy.md`, `../../contracts/collaboration.md`, `../../contracts/completion.md`, `../../contracts/context-loading.md`, `../../contracts/handoff.md`, `../../contracts/model-routing.md`, and `../../contracts/states.md`.

## Goal

Produce a decision-ready spec and a readiness bundle that another agent can translate into independently verifiable implementation tasks after human approval.

## Workflow

1. Establish the problem, affected actors, desired outcome, constraints, and work type.
2. Inspect only the smallest useful set of project planning and source-of-truth artifacts.
3. Ask only questions whose answers could materially change scope or design. Otherwise record explicit assumptions.
4. Define goals, non-goals, requirements, proposed design, risks, security, rollout, tests, acceptance criteria, decisions, and material open questions.
5. Add development-readiness artifacts: proposed task outline, dependencies, affected areas, acceptance criteria, validation plan, risks, and an explicit status of `DRAFT`, `NEEDS REFINEMENT`, `READY FOR HUMAN APPROVAL`, or human-set `APPROVED FOR DEVELOPMENT`.

Use the consuming project's spec conventions. Keep the spec model-agnostic and proportional to the work. This is the human approval gate before development planning.

## Stop conditions

Stop for user input when a missing decision would materially change product direction, architecture, permissions, tenancy, security, migration, rollout, or recovery. Otherwise continue with a labelled assumption.

## Handoff

Return the spec path or artifact, readiness status, confirmed decisions, assumptions, open questions, proposed task outline, and recommended next step: human spec approval or `bwh-refine-spec`. Do not edit execution plans unless explicitly requested.

## Output

Return exactly these headings:

- `artifact_path`
- `status`
- `problem_and_outcome`
- `actors`
- `goals_and_non_goals`
- `requirements`
- `design_and_constraints`
- `decisions`
- `assumptions`
- `open_questions`
- `task_outline`
- `validation_plan`
- `recommended_next_step`
- `context_files_read`
- `source_of_truth_decisions`
- `conflicts_found`
