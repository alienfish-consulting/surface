# Agentic Change Transactions — Proposed Contract

## Strict lifecycle

1. **Draft** proposal names `documentId`, `schemaVersion`, `registryVersion`, `baseRevision`, rationale and JSON Patch operations.
2. **Static checks** validate proposal syntax. Enforce a host-defined limits policy for length, operation count, document depth and path access.
3. **Revision guard** uses `baseRevision` and first RFC 6902 `test /revision` operation. Verify the *current host revision* still equals `baseRevision` on both preview and application.
4. **Dry-run** patch against a clone of the document. Deny modifications to `/schemaVersion`, `/registryVersion`, `/revision`, `/id`, document capability declarations (`/dataSources`, `/actionIds`), and protected workflow/state fields. Enforce path allowlist, permitted ops and component-level schema validation.
5. **Before/after diff** displays affected nodes, bindings and intentions with clear implications. Host supplies a scoped preview using non-sensitive fixtures where possible.
6. **Explicit decision** from a human is recorded as a review **intent** and attributed to the proposal/revision; it is not execution authorization.
7. **Authorize + recheck** immediately before persistence; host checks identity, data/action scopes, revision and policy. Reject stale/conflicting proposals with an intelligible diff.
8. **Apply atomically** only after the host's authorization; persist the post-change document with host-incremented revision. Record audit metadata.
9. **Undo/rollback** restores a stored, authorized prior snapshot or a validated inverse transaction. Never claim reversibility if the host did not retain a safe rollback artifact.

## Sample patch

The sample modifies only `/root/children/0/children/1/props/selectable`, following tests of the current document revision and target component ID. It deliberately doesn't change action registrations, data access, or protected fields.

## RFC 6902 scope

The JSON Schema recognizes `add`, `remove`, `replace`, `move`, `copy` and `test`. The v0.1 **illustrative verifier implements only `test`, `add`, `replace`, `remove`** and rejects `move`/`copy` until safe behavior, pointer handling and change-visualization contracts are verified. This is a scoped demonstrator, not a claim of full RFC 6902 implementation.

## Failure conditions

- Unsupported schema/registry version → refuse preview/application with migration guidance.
- Invalid payload, path, or node/prop capability → validation error, no mutation.
- Stale revision or changed target ID → conflict, offer refreshed diff and re-review.
- Expired/revoked review request or denied authorization → no mutation.
- Data source no longer available → report broken binding and prevent unauthorized resolution.
- Approval confirmed but backend save fails → show `failed`/`retryable` intent result, never `Applied`.

## Security notes

Component registry metadata is a *capabilities specification*, **not** a grant of capabilities. On top of schemas the host enforces RBAC/ABAC, auditability, data scoping, CSP/HTML sanitization, resource limits, and non-executable templates. Sample content must not be treated as a sandbox or a security boundary.
