# {{TITLE}} experimental publication validation

Date: {{YYYY_MM_DD}}  
Scope: {{REGISTRATION_OR_DEPLOYMENT_SCOPE}}  
Status: {{VALIDATION_STATUS}}

## Authorization and lifecycle

Authorization: {{EXPLICIT_OWNER_AUTHORIZATION_OR_NOT_AUTHORIZED}}  
Compatibility state: {{ZERO_RUNS_OR_EXACT_NAMED_EVIDENCE}}  
Required evidence before promotion: {{VERSION_SCOPED_HARNESS_EXIT_RULE}}

This record must distinguish permission to publish an experimental live-test
release from evidence that the cartridge is compatible or ready for testing.
Publication does not promote compatibility.

Predecessor handling: {{NONE_OR_EXACT_IMMUTABLE_PREDECESSOR_AND_SUCCESSOR_RULE}}
  
Collection changes: {{CURATED_COLLECTION_CHANGES_OR_NONE}}

## Immutable release evidence

- Release: `the-guide.elixir.{{SLUG}}@0.1.0`
- Cartridge source revision: `{{REVIEWED_40_CHARACTER_COMMIT}}`
- Cartridge bytes: `{{CARTRIDGE_BYTES}}`
- Cartridge SHA-256: `{{CARTRIDGE_SHA256}}`
- Artwork bytes: `{{ARTWORK_BYTES}}`
- Artwork SHA-256: `{{ARTWORK_SHA256}}`
- Status at publication: `experimental`

Append-only release audit: {{RETAINED_AND_APPENDED_RESULT}}  
Withdrawal audit: {{WITHDRAWAL_RESULT}}

## Validation

- Focused Story contract and fixture validation: {{RESULT}}
- `npm run validate`: {{RESULT}}
- Static artifact and audit: {{FILE_COUNT_AND_BYTES}}
- Independent review: {{VERDICT_AND_REFERENCE}}
- Exact cartridge and artwork digest checks: {{RESULT}}

## Deployment evidence

- Merge PR and main revision: {{PR_AND_MAIN_REVISION}}
- Pages workflow: {{RUN_ID_AND_RESULT}}
- Cabinet host and path: {{HOST_AND_PATH}}
- Experience path: `/the-guide/elixirs/{{SLUG}}/`
- Canonical cartridge path:
  `/the-guide/cartridges/the-guide/{{SLUG}}/0.1.0/elixir.md`
- Served cartridge SHA-256: `{{SERVED_CARTRIDGE_SHA256}}`

## Residual gate

{{EXACT_REMAINING_VERSION_SCOPED_EVIDENCE_AND_HUMAN_TEST_FOCUS}}
