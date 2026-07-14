# Expedition State Specification

## Purpose

The application maintains explicit state so the model cannot turn the game into an unbounded chat.

## State model

```ts
type ExpeditionState = {
  id: string;
  userId: string;
  buddyId: string;
  status: "setup" | "ritual" | "active" | "paused" | "complete" | "stopped";
  mode: "stay_here" | "wander_nearby" | "go_somewhere";
  timeBudgetMinutes: number;
  energy: "low" | "medium" | "high";
  boundaries: string[];
  phase: "hook" | "movement" | "discovery" | "challenge" | "reward" | "reflection";
  turnNumber: number;
  maxTurns: number;
  currentInstruction?: Instruction;
  observations: Observation[];
  memento?: Memento;
  startedAt?: string;
  completedAt?: string;
};
```

## Instruction contract

```ts
type Instruction = {
  id: string;
  text: string;
  expectedMinutes: number;
  physicalEffort: "none" | "light" | "moderate";
  locationRequirement: "none" | "indoors" | "nearby" | "destination";
  safetyNotes: string[];
  responsePrompt?: string;
};
```

## Turn rules

- Only one current instruction may exist.
- The user must respond before the next instruction is generated.
- A refusal clears the current instruction and creates a branch.
- Pause preserves state and prevents new model calls.
- Stop ends the expedition and creates a partial record without requiring a memento.
- The orchestrator rejects instructions that exceed the remaining time or violate boundaries.
- The final reflection cannot be generated until the expedition is complete or intentionally stopped.

## Persistence

Persist after every user response and every status change. Store model output separately from the accepted instruction so rejected proposals remain auditable without becoming user-facing content.

## Recommendation: cap the first MVP at three turns

Rationale: three turns are enough to demonstrate adaptation while keeping cost, safety, and testing manageable. The state model can support longer expeditions later.
