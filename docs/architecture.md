# The Guide — System Architecture

## Architectural stance

The Guide is an AI harness for play. It wraps a model or personal agent with a controlled game world, explicit state, memory, pacing, and safety validation.

The model is not the system of record. It proposes and interprets. The application owns the expedition state and decides what can be shown to the user.

## Logical layers

```text
Mobile UI
  ↓
Expedition Orchestrator
  ├── State Store
  ├── Buddy Adapter
  ├── Action Validator
  ├── Memento Builder
  └── Archive Adapter
       ↓
Personal agent / model provider
```

### Mobile UI

Owns the illustrated scene, elixir ritual, free-text response, pause/stop controls, progress cues, and memento presentation. It should not contain provider secrets or make unvalidated model decisions.

### Expedition Orchestrator

Owns the turn loop:

1. Load expedition state.
2. Ask the buddy adapter for a proposed next step.
3. Validate the proposal.
4. Present one instruction.
5. Receive the user's response.
6. Update state and archive the turn.
7. Decide whether to continue, branch, or end.

### State Store

Stores structured current state separately from narrative text. The state should remain usable if the model changes.

### Buddy Adapter

Normalises different backends into a small interface. The first implementation should support a mock provider and an OpenAI-compatible HTTP endpoint. A future Hermes/OpenClaw adapter may map these calls to a local gateway or workspace.

### Action Validator

Checks proposed instructions for safety, effort, time, location, privacy, social risk, and clarity. It can reject, rewrite, or request a safer alternative.

### Memento Builder

Creates a structured and presentable souvenir from the expedition state, user observations, and final reflection. It should never invent a discovery that is not supported by the transcript.

### Archive Adapter

Reads and writes buddies, expeditions, mementos, and open threads. It should support an app database initially and map to a user-owned Hermes/OpenClaw workspace later.

## Recommended MVP deployment shape

- Mobile-first web app
- Small server-side API for orchestration
- SQLite or equivalent simple database for local development
- Mock provider as the default development backend
- Environment-configured provider endpoint for real model testing
- No background jobs, location tracking, or tool execution in the first slice

## Trust boundaries

- The browser is untrusted for secrets and validation.
- The model is untrusted for safety decisions.
- A personal agent may have tools that The Guide must not inherit automatically.
- User archive data must be scoped to the authenticated or local user.
- Provider responses must be schema-validated before state changes.

## Recommendation: server-side orchestration, local-first provider access

Use server-side orchestration for consistent state and validation, but allow the model call to target a user-controlled local or self-hosted endpoint where feasible.

Rationale: safety and state need one reliable home, while BYOA remains a core product promise. A later fully local mode can move orchestration into a local app if privacy or offline use becomes central.

## Deferred architecture questions

- Whether the first app needs accounts or can use a local expedition ID
- Whether the archive is database-backed, filesystem-backed, or both
- Whether the web app can safely reach a user's local agent across networks
- Whether voice, images, maps, or tools are needed after the text loop is proven
