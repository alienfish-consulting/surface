# M6 AI and agent interfaces gate report

## Outcome

M6 implements and verifies all 27 accepted `react-ai` units. Registry 1.5.0 provides a serialized provider-neutral subset and renderer adapter for every unit while preserving registry fixtures 1.0.0 through 1.4.0. The catalog reaches 170 verified units with 28 M7 units remaining.

## Completed work

- Conversation workspace, lists, messages, composition, partial streaming text, attachments, and citations.
- Tool calls/results/timelines, agent rosters/activity/tasks, parallel timelines, artifacts, context, usage, model selection, prompt review, run status, and reasoning summaries.
- Explicit cancellation, retry, failed, cancelled, partial, approval, and degraded states.
- Named host intentions for all mutations and decisions; no component executes tools, calls models, persists prompts, uploads files, or authorizes work.
- Two grouped Storybook catalogs and a synthetic design-lab denial flow.

## Decisions and limitations

- The package has no model-vendor SDK and no live model/network dependency.
- `ReasoningSummaryPanel` displays user-facing summaries only; it does not expose hidden chain-of-thought.
- Token values and model choices are host-supplied display data, not billing or provider control.
- Tool and artifact content is rendered as safe text/structured data.
- `ChatWorkspace` uses canonical child nodes for serialized composition; richer JSX slots remain direct-React conveniences rather than a competing persisted schema.

## Verification

- Affected package/application typechecks — PASS.
- `pnpm exec vitest run tests/contracts.test.ts tests/renderer.test.tsx tests/ai-components.test.tsx` — PASS; 3 files, 19 tests.
- `pnpm check:generated` and `pnpm check:catalog` — PASS; 795 artifacts.
- `pnpm build:storybook` — PASS; conversation and agent catalogs discovered. Existing Vite large-chunk advisory only.
- `pnpm test:e2e:smoke` — PASS; 1 Chromium flow including explicit agent-review denial.

## Deferred

- No live model calls, API keys, usage fees, proprietary SDKs, remote actions, publishing, or cloud resources.
- No broad browser/screenshot suite or sustained streaming stress test.
- M7 designer units remain scaffolds until their owning milestone.

## Gate disposition

Standing authorization covers the scoped tests and local commit. All M6 checks passed; this report records the gate before commit and continuation to M7.
