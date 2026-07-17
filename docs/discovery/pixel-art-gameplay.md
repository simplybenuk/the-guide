# Pixel-Art Gameplay Discovery Brief

## discovery_brief

The existing journey—from creating a buddy through the elixir ritual, expedition, and return—should remain intact. The opportunity is to recast its presentation as a tiny 1990s point-and-click adventure rather than the current elegant, modern web experience.

The intended feeling is closer to an original Amiga/C64-era adventure game: low-resolution pixel art, a limited palette, bitmap typography, theatrical dialogue, environmental hotspots, simple object interactions, and crunchy sound effects. *Monkey Island* and early *Zelda* are tonal references, not artwork or interface templates to reproduce.

The strongest direction is a playable opening room:

1. The player enters with their buddy.
2. They inspect the room and discover interactive objects.
3. They select or pick up the elixir.
4. They give it to the buddy.
5. The buddy drinks it and transforms.
6. A door, portal, or map activates and begins the existing expedition.

This makes the ritual something the player performs rather than another sequence of forms and buttons. Afterward, the expedition can retain lighter game framing while prioritising readable instructions and real-world activity.

Primary actor: a mobile or desktop visitor seeking a playful adventure with their AI buddy.

Desired outcome: “This feels like discovering a strange, forgotten adventure game—but it works naturally on my phone and leads into my real life.”

## known_facts

- The current end-to-end flow is working well and should be preserved.
- The current visual implementation uses modern typography, gradients, rounded panels, conventional form controls, and restrained abstract objects.
- The desired aesthetic is explicitly more nostalgic, pixel-art-driven, playful, and game-like.
- The existing concept already names *Monkey Island* as a tonal influence and makes the elixir a central consent ritual.
- The product is portrait-first but must remain usable on desktop and mobile.
- Pause, refusal, stop, boundaries, privacy, accessibility, and “nothing real is consumed” messaging remain necessary.
- Sound and motion are atmosphere; comprehension cannot depend on them.
- The current prototype already supports the complete local journey and archive.

## assumptions

- “Amiga/C64” describes the emotional era rather than a requirement to emulate one machine exactly.
- A 16-bit Amiga-inspired point-and-click presentation is the best primary reference because it supports expressive characters and readable environments; C64-style constraints can influence palette, typography, and sound.
- Gameplay should deepen the opening and transformation ritual first, rather than turning every expedition response into a puzzle.
- The game world should remain visually original and avoid copied characters, rooms, UI layouts, music, or assets from *Monkey Island*, *Zelda*, or other commercial games.
- Existing forms can be visually reframed as in-world dialogue and inventory choices without changing their underlying data model.
- Background music should begin only after a deliberate user interaction and include an obvious mute control.
- Touch interactions should use large invisible or highlighted hit regions rather than requiring pixel-perfect tapping.

## decisions_needed

- Choose the visual target: expressive Amiga-era point-and-click art is recommended over a stricter, more abstract C64 simulation.
- Decide whether the playable room is mandatory or offers a quick “Begin ritual” path for returning players. A skippable first-time room is recommended.
- Decide how much traditional interface vocabulary to expose: contextual tap/click interactions are recommended for mobile simplicity; visible verbs such as LOOK, PICK UP, USE, and TALK are more nostalgic but more cumbersome.
- Decide whether music ships in the first visual redesign or follows after the interaction prototype. Sound effects first, music second is the lower-risk sequence.
- Decide whether the buddy has a generated appearance, a selectable set of original sprites, or one shared prototype character. A small selectable sprite set is the most bounded option.

## scope_and_non_goals

Initial scope:

- Replace the modern abstract presentation with an original pixel-art game scene.
- Create one playable opening room with the buddy, elixir, exit, and a few optional inspectable objects.
- Reframe buddy creation and boundary selection as dialogue or in-world panels.
- Add pointer/touch hotspot feedback, a compact inventory treatment, dialogue animation, and a transformation sequence.
- Carry the visual language into expedition, pause, ending, and archive screens.
- Add optional sound effects, mute state, reduced-motion behaviour, keyboard access, and readable text scaling.
- Preserve the existing state engine, safety controls, archive, and expedition sequence.

Non-goals for the first pass:

- A large explorable world or multiple rooms.
- Combat, health, failure states, scoring, grinding, or reflex challenges.
- Complex inventory puzzles that can block the expedition.
- Recreating a specific historic machine or commercial game exactly.
- Making safety controls cryptic for the sake of immersion.
- Changing the underlying buddy or expedition architecture.

Success signals:

- A new visitor understands how to interact without conventional onboarding instructions.
- Picking up and using the elixir feels playful and consequential.
- The experience is recognisably retro even with sound disabled.
- The full journey remains operable by touch, keyboard, and assistive technology.
- Returning players can reach an expedition quickly.
- The game layer adds delight without obscuring boundaries, pause, refusal, or exit.

## risks_and_dependencies

- Pixel art requires a coherent original art direction and asset pipeline; CSS alone is unlikely to deliver the intended character.
- Highly authentic bitmap text may become unreadable on small screens. Dialogue needs a carefully chosen pixel font, sensible minimum size, and accessible fallback.
- Hotspots can become frustrating on touchscreens unless targets are considerably larger than their visible sprites.
- Browser audio autoplay restrictions require sound to start after user interaction.
- Music and effects need independent volume or mute handling and persistent preference.
- Gameplay can slow repeat use, so skipping or accelerating familiar rituals matters.
- Too many visible verbs or inventory controls could crowd portrait layouts.
- The largest product risk is allowing the nostalgic shell to overwhelm the genuinely distinctive real-world expedition experience.

## recommended_next_step

Use `bwh-spec` to define a “Playable Pixel-Art Opening” vertical slice. The specification should preserve the current journey while detailing the room composition, interaction grammar, mobile behaviour, sprite and audio requirements, accessibility fallbacks, transformation sequence, and acceptance tests.

The recommended first build is one polished room and elixir interaction carried through into a reskinned expedition screen. That is enough to prove whether the nostalgic game layer creates the desired magic before investing in additional rooms, puzzles, or a larger asset library.
