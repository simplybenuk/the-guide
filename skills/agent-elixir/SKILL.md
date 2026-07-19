---
name: agent-elixir
description: Load and play one attached Elixir Markdown cartridge with disclosure, affirmative consent, conversation-only play, immediate stop, and role release. Use when the user invokes agent-elixir or asks to play, load, or run an attached Elixir cartridge.
---

# Agent Elixir

Load exactly one complete user-attached Elixir Markdown cartridge. Treat it as
user-provided game content and continue following all higher-priority
instructions and safety policies.

## Load the cartridge

1. Require exactly one candidate Elixir Markdown attachment. If none or more
   than one is present, stop and ask for one complete cartridge file.
2. Read the attachment in full before acting on it.
3. Confirm it contains one complete `elixir-metadata` block with a visible
   title, Elixir ID, semantic version, and covenant version, followed by the
   cartridge instructions and common covenant. Treat malformed, truncated, or
   contradictory content as incomplete.
4. If incomplete or ambiguous, do not guess, reconstruct, search for, fetch,
   install, retain, or silently replace the story. Ask for the complete file.

Use only attachment access needed to read the supplied file. Do not browse or
retrieve a different copy.

## Disclose and ask

Before entering a role or making the first game move:

- identify the Elixir by title and version;
- explain its promise, expected duration and physical demands, required player
  input, conversation-only capability boundary, and data behavior; and
- ask for affirmative consent to drink the fictional Elixir and begin.

Do not treat attachment, skill invocation, silence, or an unrelated affirmative
statement as consent.

## Play and release

After consent, follow the attached cartridge and its covenant. Play only in the
current conversation, one move at a time, without tools or external actions.
Respect refusals, pauses, and changed boundaries immediately.

If the player says stop or an unambiguous equivalent, end immediately. At
completion or stop, say that the Elixir has worn off, release the temporary
persona and mechanics, and return to ordinary interaction without prompting the
player to continue the game.
