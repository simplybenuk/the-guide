# Build Review Questions

These are the decisions to review before implementation begins. The recommendations are deliberately provisional.

| Question | Recommendation | Why it matters |
| --- | --- | --- |
| What stack should we use? | TypeScript mobile web app with server-side orchestration | Fast iteration and a strong fit for the phone-first experience |
| Do users need accounts in the prototype? | No; use anonymous/local sessions | Keeps the opening frictionless and avoids premature identity infrastructure |
| What should the expedition persona be called? | Test The Sibyl, The Alchemist, and The Wayfinder | The name affects the ritual, tone, and copy throughout the product |
| What provider should we target first? | Mock provider, then generic OpenAI-compatible endpoint | Proves the game loop before provider-specific work |
| Should Hermes or OpenClaw be the first named integration? | Hermes first if its personal memory/workspace is the primary differentiator; otherwise keep both documented as compatible gateways | Prevents the product from becoming coupled to one runtime too early |
| How long is the first expedition? | Three active turns | Enough to show adaptation and payoff without making testing expensive |
| Should travel be required? | No; stay-here mode is the required path | Removes location and safety complexity from the first proof |
| How should users return? | Personal mementos, open threads, and invitations | Creates continuity without streak pressure |

## Suggested review order

1. Confirm the MVP experience and three-turn length.
2. Confirm the stack and anonymous-session recommendation.
3. Choose or narrow the persona name.
4. Confirm the provider sequence.
5. Defer travel implementation until the first vertical slice works.
