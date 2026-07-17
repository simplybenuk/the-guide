# The Guide — Opening and Expedition UX

## Design target

The opening should feel like the start of a minimal point-and-click adventure on a phone. It should not look like onboarding, settings, or a blank chat window.

## First visit flow

### Arrival

One illustrated portrait scene. A buddy or an empty receiving place is visible. The primary action is obvious and thumb-friendly.

Suggested copy:

> Someone is waiting to meet you.

### Buddy choice

Offer two paths:

- **Bring my buddy** — connect Hermes, OpenClaw, or a compatible endpoint.
- **Help me create one** — name and personify a new buddy in a few conversational turns.

The create path should establish name, voice, curiosity, and one small peculiarity. It should not ask the user to complete a personality inventory.

### Boundary card

Collect only:

- available time
- energy level
- travel preference
- hard limits

Keep the card editable and visible before the first instruction.

### Elixir ritual

The buddy is shown an elixir and asked for permission to drink. The user chooses **Let it drink** or **Keep the buddy unchanged**. The transformation is short, optional in sound/motion, and understandable without animation.

### First instruction

The first instruction should be concrete, low-risk, and immediately achievable. It should not require a long explanation or reveal the whole arc.

## Returning flow

If an archive exists, open with recognition:

> Welcome back.
>
> I remember the window, the minute of silence, and what you noticed when you finally looked up.

Then offer a new invitation without pressure.

## Expedition screen

The screen should contain:

- current illustrated scene or atmosphere
- short persona message
- one instruction
- large free-text response field
- quiet pause/stop affordance
- optional small status cue such as “Expedition 1 of 3” only if testing shows it helps

Avoid a conventional scrolling chat transcript during the active expedition.

## Free-text interaction

Buttons may support **Done**, **Not possible**, **Pause**, and **Stop**, but the response field is the primary player control after an instruction.

Example:

> Without overthinking it, stand up.
>
> Walk to the nearest window.
>
> Spend exactly 60 seconds looking outside.
>
> When you're done, answer one question only:
>
> What was the first thing you noticed that you hadn't consciously noticed before?

The user's answer should visibly influence the next turn.

## Ending flow

1. Persona announces that the expedition is complete.
2. Buddy returns to its ordinary voice or appearance.
3. Reflection explains the shape of the journey.
4. Memento is revealed.
5. User can save, edit, share, replay, or return home.

## UX recommendations

- Start with stay-here mode.
- Use free text as the main interaction, not a hidden advanced feature.
- Keep the elixir ritual under 10 seconds.
- Give the user a visible stop action on every active screen.
- Test the first instruction with people unfamiliar with the concept.
