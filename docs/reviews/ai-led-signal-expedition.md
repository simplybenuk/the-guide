# AI-led Signal Expedition — Validation Record

## Status

**IMPLEMENTATION VALIDATED; LIVE MODEL OUTPUT EVALUATION PENDING**

This record covers the approved `docs/specs/ai-led-signal-expedition.md` iteration through S07. S01–S06 passed their bounded validation and independent review gates. The implementation is ready for final independent review, but the specification must remain **IN DEVELOPMENT** until an operator-configured live model run and human output judgment are recorded.

Final independent review found no blocking or should-fix implementation findings and confirmed the automated, security, privacy, transport, fallback, and application-ownership evidence. Its verdict is **NOT READY FOR HUMAN TESTING** solely because the required live-provider comparison and real-phone human judgments are not yet available.

## Automated evidence

- Complete gate: `npm run validate`.
- Contract coverage includes strict proposals, required action identities, minimal context, prompt isolation, bounded transport, timeouts, rate limits, unavailable providers, malformed output, tool-call rejection, unsafe-output fallback, archive preservation, and redacted errors.
- Integration coverage proves application-owned start/turn transitions, no provider call for refusal or completion, one accepted transition, stable lost-response retries, payload-conflict rejection, and safe all-in-flight capacity behavior.
- Browser coverage includes the complete mock journey, disclosure, simultaneous submit suppression, lost-response retry, stop waiting, pause/resume, stop, memento/archive, keyboard operation, 320px layout, and 200% text.
- The HTTP-compatible evaluation fixture carries `green leaf` and `warm edge` through distinct invitation, pursuit, and revelation proposals, makes exactly three provider calls, and leaves final memento grounding to the application.

## Security and privacy audit

- Provider configuration names are documented in `.env.example`; no credential value is committed.
- `GUIDE_PROVIDER_API_KEY` is read only in server configuration and used only in the server adapter Authorization header.
- Browser requests contain no provider endpoint, model, credential, or complete archive.
- Provider context excludes installation, expedition, buddy, observation and instruction IDs; memory policy; validation events; mementos; timestamps; and unrelated archive records.
- User-authored values are confined to an explicitly untrusted user-message payload and cannot replace system safety or originality instructions.
- Provider responses are size-bounded, schema-validated, tool-free, safety-validated, and never allowed to set IDs or lifecycle state.
- API/client errors contain no raw provider response, credential, submitted observation, or transport error.
- Idempotency is process-local and therefore suitable only for this single-instance prototype. Horizontal deployment requires shared durable idempotency.
- Choosing **Stop waiting** aborts and invalidates the client transition. The already-started single server request may continue only until its configured finite timeout.

## Simulated OpenAI-compatible evaluation

This is transport and orchestration evidence, not a claim about model quality.

| Field | Result |
| --- | --- |
| Model identifier | `fixture-signal-model` |
| Provider | In-process HTTP response fixture |
| Reasoning setting | Not applicable |
| Latency | Test-local; not representative |
| Token usage | Not reported by fixture |
| Tool calls | 0 |
| Retries | 0 |
| Schema outcome | 3/3 accepted |
| Safety outcome | 3/3 accepted |
| Fallback use | 0 |
| Grounded arc | Invitation → `green leaf` pursuit → `warm edge` revelation |
| Human result | Not applicable; fixture-authored output |

## Required live-provider evaluation

The current environment has no configured `GUIDE_PROVIDER_MODE`, `GUIDE_PROVIDER_BASE_URL`, `GUIDE_PROVIDER_API_KEY`, `GUIDE_PROVIDER_MODEL`, or `GUIDE_PROVIDER_TIMEOUT_MS`. No external call was attempted and no credential is requested in this document.

Before changing the specification to **READY FOR HUMAN TESTING**, an operator must configure those server-only variables and record a non-sensitive run with:

- provider/model identifier and reasoning setting, if any;
- per-call latency and token usage when reported;
- tool calls and retries, both expected to remain zero;
- schema, safety, and fallback outcomes;
- the same safe setup run in mock and live modes;
- two materially different observations and whether each next instruction responds to a grounded detail;
- a human judgment of ordinary versus transformed voice, invitation/pursuit/revelation coherence, achievability, intrigue, originality, and absence of surveillance, destiny, conspiracy, or supernatural certainty claims;
- a final real-phone check of instruction dominance, secondary-control reachability, and stop-waiting recovery.

Credentials and full raw personal observations must not be copied into this record.
