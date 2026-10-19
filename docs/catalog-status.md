# Component catalog status

Generated from `catalog/components.v1.json`. Do not edit this dashboard directly.

## Lifecycle summary

| Status | Count |
|---|---:|
| planned | 0 |
| scaffolded | 112 |
| implemented | 1 |
| verified | 85 |
| released | 0 |
| **Total** | **198** |

## Classification summary

| Classification | Count |
|---|---:|
| public-component | 159 |
| feature/workstream | 21 |
| compositional-subcomponent | 13 |
| internal-primitive | 5 |

## Package summary

| Target package | Units | Scaffolded | Implemented |
|---|---:|---:|---:|
| `react-core` | 85 | 0 | 0 |
| `react-data` | 33 | 32 | 1 |
| `react-operations` | 25 | 25 | 0 |
| `react-ai` | 27 | 27 | 0 |
| `react-designers` | 28 | 28 | 0 |

## Runtime and compatibility boundary

- Registry `1.0.0` remains preserved with 5 entries.
- Active foundational registry `1.2.0` contains 86 schema entries; prior registry fixtures remain preserved.
- Renderer adapters exist for the registered lifecycle-implemented or verified units: `ui.AppShell`, `ui.PageLayout`, `ui.AppHeader`, `ui.Sidebar`, `ui.NavigationRail`, `ui.Breadcrumbs`, `ui.Panel`, `ui.Card`, `ui.Surface`, `ui.Stack`, `ui.Inline`, `ui.Grid`, `ui.SplitPane`, `ui.DockWorkspace`, `ui.ResizablePanel`, `ui.Toolbar`, `ui.Divider`, `ui.ScrollArea`, `ui.VirtualList`, `ui.EmptyState`, `ui.Text`, `ui.Heading`, `ui.Label`, `ui.Link`, `ui.Code`, `ui.Badge`, `ui.Avatar`, `ui.Icon`, `ui.Tooltip`, `ui.TruncateText`, `ui.DataValue`, `ui.Button`, `ui.IconButton`, `ui.ToggleButton`, `ui.ButtonGroup`, `ui.TextField`, `ui.TextArea`, `ui.PasswordField`, `ui.NumberField`, `ui.SearchField`, `ui.Select`, `ui.MultiSelect`, `ui.ComboBox`, `ui.Autocomplete`, `ui.Checkbox`, `ui.CheckboxGroup`, `ui.RadioGroup`, `ui.Switch`, `ui.Slider`, `ui.RangeSlider`, `ui.DatePicker`, `ui.DateRangePicker`, `ui.TimePicker`, `ui.ColorPicker`, `ui.FileInput`, `ui.FormField`, `ui.FieldSet`, `ui.ValidationMessage`, `ui.InputGroup`, `ui.SegmentedControl`, `ui.TagInput`, `ui.OtpField`, `ui.Dialog`, `ui.AlertDialog`, `ui.Drawer`, `ui.Popover`, `ui.Menu`, `ui.ContextMenu`, `ui.DropdownMenu`, `ui.CommandMenu`, `ui.HoverCard`, `ui.Toast`, `ui.NotificationCenter`, `ui.Banner`, `ui.Progress`, `ui.Spinner`, `ui.Skeleton`, `ui.Tabs`, `ui.Accordion`, `ui.TreeView`, `ui.Pagination`, `ui.Stepper`, `ui.StatusIndicator`, `ui.KpiCard`.
- `ui.DataGrid` and `ui.ActivityFeed` remain schema-only compatibility entries and fail closed at the renderer boundary.
- `ui.KpiCard` remains temporarily implemented in `react-core`; its accepted target boundary is `react-data`. M2 does not move it.

No scaffold is a public export, a runtime registration, a Storybook story, or evidence of implementation.
