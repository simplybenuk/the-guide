# Buddy Adapter Specification

## Purpose

The adapter allows The Guide to work with a created buddy, a user-owned personal agent, or a hosted model without changing the game engine.

## Adapter interface

```ts
type BuddyAdapter = {
  createBuddy(input: CreateBuddyInput): Promise<Buddy>;
  getBuddy(id: string): Promise<Buddy>;
  proposeInstruction(input: InstructionRequest): Promise<InstructionProposal>;
  interpretResponse(input: ResponseRequest): Promise<ResponseInterpretation>;
  createReflection(input: ReflectionRequest): Promise<Reflection>;
  createMemento(input: MementoRequest): Promise<Memento>;
};
```

## Rules

- The adapter returns structured JSON validated against schemas.
- The adapter does not advance expedition state.
- The adapter cannot pause, stop, or bypass safety validation.
- Tool use is disabled by default.
- Personal memory is passed explicitly, not assumed.
- The adapter must support a deterministic mock implementation for tests.

## Provider modes

### Mock provider

Returns scripted but parameterised responses. Required for UI development, demos, and automated tests.

### OpenAI-compatible endpoint

Supports a user-controlled key, local proxy, Hermes gateway, OpenClaw gateway, or another compatible server. The endpoint URL and credentials remain outside the browser.

### Native provider adapters

Deferred until a real need exists. Add only when an endpoint cannot reasonably support the required contract.

## Buddy creation

The create flow should produce:

```ts
type Buddy = {
  id: string;
  name: string;
  voiceDescription: string;
  curiosities: string[];
  peculiarities: string[];
  memoryPolicy: "session_only" | "archive_with_consent";
};
```

## Recommendation: start with one adapter and one mock

Implement the interface once, then build the UI against the mock provider. Add an OpenAI-compatible adapter only after the full loop is testable.
