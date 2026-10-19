# Declarative UI, designers, and proposals

## Canonical model

A design document pins `schemaVersion`, `registryVersion`, stable document/node IDs, revision, theme, density, declared data sources, declared action IDs, and a registered node tree. Each node has data-only props and may declare registered bindings, named intentions, and allowed children.

The active contract is the schema and registry code under `packages/contracts`; never infer a document shape from rendered DOM or a screenshot.

## Safe lifecycle

1. Parse input as data and enforce transport/body limits.
2. Call `validateDocument` or `assertDesignDocument` before rendering or editing.
3. Render through explicit adapters and an application-supplied host.
4. Resolve bindings only from declared host data sources.
5. Translate named intentions into requests; authorize them independently in the host.
6. For changes, create a proposal against the exact document ID, registry version, schema version, and base revision.
7. Preview with `previewProposal`; show rationale and differences to the decision maker.
8. Re-authorize, persist, and audit in the host, then reconcile the authoritative revision.

Validation does not grant permission. Preview does not mutate the authoritative document. A designer is an editor of this model, not a separate source of truth.

## Contract changes

When adding or changing a serializable component, keep this chain coherent:

```text
catalog source
  -> component contract source
  -> generated schema/registry/types
  -> React implementation
  -> explicit renderer adapter
  -> deterministic fixture/story
  -> contract + renderer tests
```

Shared JSX props may be richer than serialized props. If a capability cannot be represented safely as data—such as an arbitrary callback, React node, or imperative handle—keep it JSX-only and record the exception rather than weakening the schema.

Registry versions are exact compatibility contracts. Do not silently accept or rewrite an unknown version. Add a deterministic, fixture-backed migration when migration is in scope.

## Proposal constraints

Current guarded proposals are revision-tested RFC 6902 operations limited to approved property paths. Do not expand patch scope to component identity, tree structure, permissions, data sources, action declarations, or host configuration without an explicit architecture and security review.
