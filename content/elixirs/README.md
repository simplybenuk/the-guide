# Elixir cartridge sources

Each cartridge is a self-contained Markdown document with exactly one visible
JSON metadata fence:

````markdown
```elixir-metadata
{
  "schemaVersion": "1.0.0"
}
```
````

The complete contents of `covenant.md` must appear exactly once and its declared
version must equal the cartridge metadata's `covenantVersion`. Cartridge source
must remain readable as plain text and must not contain executable code, hidden
instructions, remote includes, or model-specific control tokens.

Artwork is added in E04, but its eventual static path, dimensions, accessible
description, and provenance record are required metadata from E01 onward.

Published sources are registered under `content/catalogue/`. The release ledger
binds each exact ID/version to its byte count, SHA-256, source revision,
publisher-qualified path, and permanent legacy paths. Catalogue metadata may
improve discovery, but it must not contradict or silently mutate these embedded
cartridge facts.
