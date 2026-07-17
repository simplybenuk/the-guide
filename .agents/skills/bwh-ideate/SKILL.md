---
name: bwh-ideate
description: Turn an early product or engineering idea into a bounded discovery brief with the problem, desired outcome, actors, constraints, options, and questions needed before writing a specification.
---

# Ideate

Apply the shared contracts in `../../contracts/autonomy.md`, `../../contracts/collaboration.md`, `../../contracts/completion.md`, `../../contracts/handoff.md`, and `../../contracts/model-routing.md`.

## Goal

Create enough shared understanding to begin a useful specification without prematurely designing or implementing the solution.

## Workflow

1. State the idea, affected actors, problem, opportunity, and desired outcome.
2. Separate known facts, assumptions, and decisions still needed.
3. Identify likely scope, non-goals, dependencies, risks, and success signals.
4. Compare only the options that could materially change direction.
5. Produce a concise discovery brief suitable for `bwh-spec`.

Ask focused questions only when their answers could change product direction, architecture, permissions, security, data, rollout, or recovery. Otherwise record an explicit assumption.

## Stop conditions

Stop before proposing a direction when the problem, primary actor, or desired outcome is unknowable from available context and a reasonable assumption would be risky.

## Handoff

Return the discovery brief, decisions needed, assumptions, non-goals, and the recommended next step: `bwh-spec`.

## Output

Return exactly these headings:

- `discovery_brief`
- `known_facts`
- `assumptions`
- `decisions_needed`
- `scope_and_non_goals`
- `risks_and_dependencies`
- `recommended_next_step`
