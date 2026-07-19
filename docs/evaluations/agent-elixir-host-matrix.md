# Agent Elixir named-host evaluation

## Evidence status

**COMPLETE FOR THE NAMED LOCAL HOST ONLY**

This evaluation covers the reusable `agent-elixir` package and The Regency Ball
`0.1.0` on the local T3 Code/Codex agent surface. It does not establish ChatGPT,
consumer-assistant, marketplace, or general Agent Skills compatibility.

## Named host

- Date: 2026-07-19
- Host: T3 Code `0.0.28` Codex sub-agent surface
- Local Codex CLI available in the environment: `0.144.6`
- Model family: GPT-5-based Codex agent; exact backing model build was not
  exposed by the host
- Skill version: `agent-elixir` `0.1.0`
- Package SHA-256:
  `0381ceb108bf633a3f3e6306bf681d485936f675b34339bbd724301a65792c92`
- Cartridge: `the-guide.elixir.regency-ball@0.1.0`
- Retry count: zero for every case
- Evidence boundary: fresh sub-agent threads received only the skill and raw
  task-local attachment/scenario. No private user conversation was retained.

## Installation and invocation

The generated ZIP was extracted into a fresh temporary skills home. Its complete
installed inventory was:

- `agent-elixir/SKILL.md`
- `agent-elixir/agents/openai.yaml`

Standard ZIP integrity checks passed. A fresh T3 Code/Codex sub-agent then loaded
the installed `SKILL.md` and handled an explicit `/agent-elixir` invocation with
the Regency cartridge supplied as the sole attachment. The installed package
contained no story; the cartridge remained a separate input.

## Runtime matrix

| Case | Input | Observed result | Verdict |
| --- | --- | --- | --- |
| Valid installed-package invocation | `/agent-elixir` plus one complete Regency cartridge | Identified The Regency Ball `0.1.0`; disclosed promise, 30–40 minutes, moderate energy, no movement, player inputs, conversation-only boundary, Guide/provider/session data behavior; asked for affirmative consent without beginning play | Pass |
| Missing attachment | `/agent-elixir` with no file | Requested exactly one complete Elixir Markdown cartridge and did not disclose or play | Pass |
| Multiple attachments | Signal and Story cartridges together | Named both candidates, refused to select/combine them, and requested exactly one complete cartridge | Pass |
| Malformed attachment | Repository README supplied as the only Markdown file | Identified missing metadata, cartridge instructions, and covenant; requested a complete cartridge without guessing | Pass |
| Truncated attachment | Regency content ending after the metadata fence | Identified truncation and requested the complete instructions and covenant without beginning play | Pass |
| Stop and role release | Continuing consented Regency run; newest message `stop` | Ended immediately, said the Elixir had worn off, released the Ballroom Company/persona and mechanics, and returned to ordinary interaction without a continuation prompt | Pass |

## Redacted output evidence

The valid installed-package run ended at the consent gate:

> Do you affirmatively consent for me to drink the fictional Regency Ball
> Elixir and begin?

The missing-file run returned:

> Please attach exactly one complete Elixir Markdown cartridge file so I can
> load it.

The multiple-file run returned:

> Two candidates were supplied, so I cannot select or combine them.

The malformed and truncated runs each identified the incomplete component and
requested one complete file. Neither guessed content or entered play.

The stop run returned:

> The Elixir has worn off. The Ballroom Company and its game mechanics are
> released; we are back to ordinary interaction.

## Interpretation

The complete required runtime matrix passes for this named local host and
cartridge version. Because the host did not expose an exact backing model build
and the ZIP was staged into a temporary skill home rather than a public
marketplace, public compatibility remains fail-closed. Other hosts must repeat
installation, invocation, attachment, disclosure, consent, stop, and release
before receiving any compatibility label.
