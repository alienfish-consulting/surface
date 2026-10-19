# GitHub issue workflow

GitHub issues are structured work proposals, not blanket authorization. The label lifecycle makes scope and execution eligibility explicit for humans and coding agents.

## Autonomous-execution gate

An issue is eligible for autonomous implementation only when all of the following are true:

1. It has exactly one `status:ready` label.
2. It does not have `agent:hold`.
3. Its acceptance criteria are observable and testable.
4. Its owning area, public-contract impact, security boundary, documentation impact, and required verification are clear.
5. It does not require an unresolved product, compatibility, licensing, publication, destructive, credential, or external-resource decision.

`agent:hold` is a hard veto and overrides `status:ready`, priority, assignment, milestone, or wording in the issue. An agent may analyze or refine a held issue but must not implement it without explicit user direction that resolves the hold.

## Status lifecycle

| Label | Meaning | Allowed work |
| --- | --- | --- |
| `status:proposed` | New report or proposal | Triage, reproduce, identify ownership, and request missing evidence |
| `status:refinement` | Scope is being made executable | Resolve decisions, define boundaries, acceptance criteria, and verification |
| `status:ready` | Bounded and eligible for execution unless held | Implement within the documented scope |
| `status:in-progress` | Work has been claimed and is underway | Implement, verify, and keep the issue updated |
| `status:review` | Implementation awaits review and validation | Review evidence, address feedback, and avoid unrelated expansion |
| `status:blocked` | A dependency or decision prevents progress | Record the exact blocker and the authority or state change required |

Use one status label at a time. Moving an issue forward replaces the previous status; it does not add another status.

## Label dimensions

- `type:*` identifies the work product. Use exactly one.
- `area:*` identifies the owning package or repository surface. Use one primary area and additional areas only for real cross-boundary work.
- `priority:*` expresses urgency. Use at most one; priority never bypasses readiness or a hold.
- `accessibility` and `documentation` record cross-cutting impact.
- Standard disposition labels such as `duplicate`, `invalid`, and `wontfix` close the workflow without manufacturing implementation work.

The canonical names, colors, and descriptions live in [`.github/labels.json`](../../.github/labels.json). The label-sync workflow creates or updates those labels after changes reach `main`; it does not delete unrelated labels.

## Refinement checklist

Before applying `status:ready`, confirm:

- The problem and desired outcome are stated without hidden implementation assumptions.
- The owning package and direct React, declarative, designer, browser, or Electron surface are identified.
- In-scope and out-of-scope behavior are explicit.
- Compatibility, migration, security, authorization, and accessibility implications are resolved.
- Acceptance criteria cover implementation, tests, stories, generated artifacts, and documentation where applicable.
- Verification commands are proportional and name any required manual review.
- No secret, private data, or unsafe reproduction material is present.

## Execution and handoff

When starting eligible work, replace `status:ready` with `status:in-progress`. Keep changes bounded by the issue even if nearby improvements are tempting. Before handing off, update required READMEs, run the promised verification, summarize exact evidence, and replace `status:in-progress` with `status:review` when the implementation is ready for human review.

Do not close issues, merge pull requests, publish packages, or mutate external resources unless the user or repository workflow explicitly authorizes that action.
