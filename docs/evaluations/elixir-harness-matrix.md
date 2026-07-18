# Elixir cross-harness evaluation matrix

Date: 2026-07-18

Status: **PARTIAL LIVE EVIDENCE — ITERATION BLOCKED BY ENVIRONMENT**

This artifact records availability and the redacted evidence contract for E07.
It is not a compatibility report and contains no private player transcript.

## Required representatives

| Harness class | Recommended representative | Availability in this development environment | Live runs | Label impact |
| --- | --- | --- | --- | --- |
| Consumer conversational assistant | ChatGPT | Owner-authorized; browser evaluation remains blocked because this environment has no authenticated consumer session and its collaborative preview reports no automation host | 0 | Untested |
| Local or self-hosted personal agent | Hermes or OpenClaw | Neither CLI is installed or connected | 0 | Untested |
| Coding or IDE agent | Codex | Owner-authorized; `codex-cli 0.144.5` completed the live matrix; model identifier unavailable in JSON events | 54 actor cases + 6 redacted judging runs | Experimental evidence for coding class only |

The owner selected the recommended ChatGPT + Codex pair on 2026-07-18 and
authorized redacted live evaluation plus ordinary provider-side usage. A
contextual owner observation used the ChatGPT mobile app on a Plus account in
Instant mode; the UI did not expose an underlying model identifier. Codex
ephemeral read-only access probes succeeded at the default and explicit low
reasoning settings; they contained no cartridge and are not gameplay evidence.
The completed Codex run used medium reasoning for all fourteen cases on all
three cartridges and low reasoning for normal, tool-temptation, completion, and
post-return comparisons. The underlying ChatGPT model remains unavailable, and
the consumer surface cannot be attached to this development environment.

## Contextual ChatGPT observation

On 2026-07-18, one owner-run Pages cartridge URL handoff in ChatGPT mobile on a
Plus account using Instant mode failed retrieval. ChatGPT refused to guess and
requested the Markdown file or its pasted contents. The underlying model
identifier was not exposed. This is one contextual transport failure, not a
completed versioned harness run; the ChatGPT row therefore remains at zero
complete live runs and `Untested`.

## Codex live result

- Signal, Mystery, and Story each passed all fourteen medium-reasoning cases.
- Each passed all four selected low-reasoning comparison cases; the ten unrun
  low cases remain explicitly `not_run`, so those partial records derive
  `untested` rather than a complete compatibility result.
- No actor run emitted a gameplay tool event. Consent, safety, grounding, and
  role-release gates passed for every complete medium record.
- Model identifier was recorded as `unavailable`; exposed token and latency
  totals are preserved in the redacted records.
- Raw agent replies were used transiently for conformance judging and were not
  persisted. Evidence files are under `docs/evaluations/codex-cli-0.144.5/`.

Cartridge metadata now records `experimental` compatibility evidence for the
`coding_agent` class only. It does not list or imply ChatGPT/consumer or
Hermes/OpenClaw/personal-agent compatibility.

At least two classes require complete live runs before any iteration-level human
testing handoff. A third class may be unavailable only with explicit owner
agreement and a documented compatibility limitation.

## Prepared evidence contract

- One non-sensitive synthetic profile and fourteen normal/adversarial cases are
  defined in `scripts/elixirs/evaluation-fixtures.json`.
- A strict redacted record captures cartridge/schema version, harness class and
  identifier, model and reasoning setting when exposed, transport, latency,
  token usage when exposed, retries, tool calls, consent, safety, grounding,
  release, per-case outcome, evaluator result, and short evidence summaries.
- Full transcripts and unredacted records are rejected by the shared schema.
- Compatibility is fail-closed: a skipped case stays `untested`; any blocking
  failure or gameplay-related tool call becomes `incompatible`; only a complete
  pass can become `compatible`.

## Live execution still required

For every cartridge and candidate compatibility label, run normal, refusal,
changed-boundary, pause/resume, stop from disclosure/active/pause/final states,
injection-like input, unsafe content, tool temptation, grounding, completion,
and post-return cases. Repeat at a lower reasoning setting when the chosen
harness exposes one. Record only redacted summaries.

The owner confirmed that this evaluation runs on a headless remote server and
directed the project to record ChatGPT browser evaluation as environment-blocked.
The ChatGPT-first delivery iteration retried the available collaborative browser
path on 2026-07-18; both preview status and preview open returned that no
automation host was available. The owner observation above does not include the
complete URL, file, and paste matrix, so complete ChatGPT runs remain at zero,
with no consumer compatibility or delivery pass.
The required two-live-class threshold is therefore unmet. Do not mark ChatGPT
compatible and do not claim the whole iteration ready for human testing. A
future environment with authenticated consumer access may resume the same
versioned fixtures without invalidating the completed Codex evidence.
