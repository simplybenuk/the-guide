# Context Loading Contract

Read the project adapter before making repository decisions. Load only the smallest relevant context for the current phase.

- Distinguish active source-of-truth documents from archives and notes.
- Verify architecture, schema, permissions, and domain claims against their authoritative artifacts.
- If sources conflict, report the conflict and do not silently choose.
- Do not read the entire repository by default.
- Record the context files that informed the result.
