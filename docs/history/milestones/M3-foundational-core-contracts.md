# Foundational core contracts

Milestone M3 implements the accepted 85-unit `react-core` catalog as real React APIs. The direct JSX APIs may accept `ReactNode`, render callbacks, and browser objects where those are useful. Persisted design documents use the narrower registry 1.2.0 JSON contracts, named bindings, and named action intents.

## Declarative coverage

- 83 units have JSON Schema 2020-12 props contracts and renderer adapters in registry 1.2.0.
- `ui.KeyboardShortcut` remains an inline JSX helper. Persisting it as an independent node would detach the shortcut from the control or menu action it explains; owning components serialize shortcut text where applicable.
- `ui.ToastViewport` remains runtime infrastructure. Documents serialize `ui.Toast` content while the application owns the live-region viewport, notification queue, and announcement policy.
- Registry fixtures 1.0.0 and 1.1.0 remain supported and unchanged. Registry 1.2.0 is additive and does not migrate stored documents automatically.

The schemas deliberately expose only JSON-safe presentation state. Callbacks, arbitrary elements, render functions, `File` objects, and executable behavior are excluded. Events resolve through declared action IDs; applications retain authorization, persistence, networking, and host execution.

## Interaction decisions and bounded alternatives

- ComboBox and Autocomplete use the browser `datalist` model in M3. This provides native text entry and suggestions without introducing a second focus engine. It does not promise remote querying, rich option templates, or full ARIA 1.2 listbox behavior; those require a reviewed primitive before expansion.
- DatePicker, DateRangePicker, and TimePicker use native date/time inputs. Locale display is browser-owned; persisted values remain ISO-compatible strings. A calendar engine is intentionally deferred.
- TreeView supports hierarchical expansion and selection with semantic tree roles. Rich multi-selection, drag reparenting, and filesystem-specific commands are outside this foundational contract.
- DockWorkspace is a responsive, keyboard-operable panel-visibility workspace. It does not claim freeform docking, persistence, detachable windows, or pointer drag rearrangement. Applications may persist panel visibility through their own state layer.
- SplitPane and ResizablePanel expose keyboard separators with bounded values. Pointer dragging is not part of the M3 contract; keyboard operation is the reliable baseline.
- Dialog and AlertDialog use the native dialog surface with explicit initial focus and Escape handling. The application controls open state and any consequential action.

## Controlled and uncontrolled state

Form controls with compound state accept controlled values and change callbacks; ToggleButton, RangeSlider, MultiSelect, RadioGroup, SegmentedControl, TagInput, OtpField, Popover, Tabs, and Accordion also provide defaults for uncontrolled use. Native single-value inputs follow normal React `value`/`defaultValue` behavior. Component callbacks report intentions and never persist values themselves.

## Responsive, touch, theme, and density behavior

All components consume the shared light, dark, high-contrast, compact, and comfortable token variables. Controls retain coarse-pointer minimum targets. Layout grids collapse at narrow widths, DockWorkspace stacks its regions, overlays constrain to the viewport, and scroll/virtual-list surfaces remain keyboard reachable when labelled. Reduced-motion preferences disable nonessential transitions and pulsing indicators.

## Story organization

The component explorer groups M3 stories by layout, typography/display, forms, and overlays/feedback/navigation. Stories exercise default, disabled, validation, dark/compact, high-contrast, controlled, and narrow-friendly states without registering placeholder implementations.
