# Component contract scaffolds

These directories contain planning and acceptance metadata for the 198 accepted tracking units. They are deliberately outside production package source.

- A scaffold is not a React implementation, public export, runtime registry entry, Storybook story, or verification result.
- `pnpm scaffold:components` is dry-run by default.
- `pnpm scaffold:components -- --write` creates missing standard scaffold files only.
- `pnpm scaffold:components -- --component ui.AppHeader` previews the focused type/schema/story drafts for one unit.
- Add `--write` to that focused command only after the owning implementation milestone is authorized.
- Existing files are left unchanged when their content matches and cause a hard failure when their content differs.
- `pnpm check:catalog` checks committed scaffold, ledger, and dashboard drift without writing.

Lifecycle status is owned by `catalog/components.v1.json`; `catalog/catalog-status.json` and `docs/catalog-status.md` are generated views.

