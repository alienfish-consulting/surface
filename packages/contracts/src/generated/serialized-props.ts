// GENERATED from canonical JSON Schemas and component registry. DO NOT EDIT.
export interface AppShellSerializedProps {
  "title": string;
}
export interface PanelSerializedProps {
  "title": string;
  "collapsible"?: boolean;
}
export interface KpiCardSerializedProps {
  "label": string;
  "format": "integer" | "currency" | "percent";
  "currency"?: string;
}
export interface DataGridSerializedProps {
  "title": string;
  "columns": Array<{ "key": string; "label": string; "sortable"?: boolean }>;
  "presentation"?: "auto" | "table" | "recordList";
  "selectable"?: boolean;
}
export interface ActivityFeedSerializedProps {
  "title": string;
  "showTimestamps"?: boolean;
}
export interface ButtonSerializedProps {
  "label": string;
  "variant"?: "primary" | "secondary" | "ghost";
  "disabled"?: boolean;
}
export interface TextFieldSerializedProps {
  "label": string;
  "placeholder"?: string;
  "value"?: string;
  "description"?: string;
  "required"?: boolean;
  "error"?: string;
}
export interface PageLayoutSerializedProps {
  "label"?: string;
}
export interface AppHeaderSerializedProps {
  "title": string;
}
export interface SidebarSerializedProps {
  "label": string;
}
export interface NavigationRailSerializedProps {
  "label": string;
  "items": Array<{ "id": string; "label": string; "disabled"?: boolean }>;
  "activeId"?: string;
}
export interface BreadcrumbsSerializedProps {
  "label"?: string;
  "items": Array<{ "label": string; "href"?: string }>;
}
export interface CardSerializedProps {
  "title"?: string;
  "footer"?: string;
}
export interface SurfaceSerializedProps {
  "elevation"?: "flat" | "raised" | "overlay";
}
export interface StackSerializedProps {
  "gap"?: "xs" | "sm" | "md" | "lg";
  "align"?: "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
}
export interface InlineSerializedProps {
  "gap"?: "xs" | "sm" | "md" | "lg";
  "align"?: "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
  "wrap"?: boolean;
}
export interface GridSerializedProps {
  "columns"?: number | string;
  "gap"?: "xs" | "sm" | "md" | "lg";
  "minColumnWidth"?: string;
}
export interface SplitPaneSerializedProps {
  "label": string;
  "defaultPercent"?: number;
  "minPercent"?: number;
  "maxPercent"?: number;
}
export interface DockWorkspaceSerializedProps {
  "label": string;
}
export interface ResizablePanelSerializedProps {
  "label": string;
  "size"?: number;
  "defaultSize"?: number;
  "minSize"?: number;
  "maxSize"?: number;
}
export interface ToolbarSerializedProps {
  "label": string;
}
export interface DividerSerializedProps {
  "orientation"?: "horizontal" | "vertical";
}
export interface ScrollAreaSerializedProps {
  "maxHeight"?: number | string;
  "label"?: string;
}
export interface VirtualListSerializedProps {
  "label": string;
  "items": Array<string>;
  "height": number;
  "rowHeight": number;
  "overscan"?: number;
}
export interface EmptyStateSerializedProps {
  "title": string;
  "description"?: string;
  "icon"?: string;
  "actionLabel"?: string;
}
export interface TextSerializedProps {
  "text": string;
  "as"?: "span" | "p" | "div";
  "tone"?: "primary" | "secondary" | "tertiary";
}
export interface HeadingSerializedProps {
  "text": string;
  "level"?: number;
}
export interface LabelSerializedProps {
  "text": string;
  "forId"?: string;
  "required"?: boolean;
}
export interface LinkSerializedProps {
  "label": string;
  "href": string;
  "external"?: boolean;
}
export interface CodeSerializedProps {
  "code": string;
  "block"?: boolean;
}
export interface BadgeSerializedProps {
  "label": string;
  "tone"?: "neutral" | "info" | "success" | "warning" | "danger";
}
export interface AvatarSerializedProps {
  "name": string;
  "src"?: string;
  "size"?: "sm" | "md" | "lg";
}
export interface IconSerializedProps {
  "name": string;
  "label"?: string;
  "decorative"?: boolean;
}
export interface TooltipSerializedProps {
  "content": string;
  "triggerLabel": string;
  "placement"?: "top" | "right" | "bottom" | "left";
}
export interface TruncateTextSerializedProps {
  "text": string;
  "lines"?: number;
}
export interface DataValueSerializedProps {
  "value": string | number | boolean | null;
  "emptyText"?: string;
  "format"?: "text" | "number" | "date" | "json";
}
export interface IconButtonSerializedProps {
  "label": string;
  "icon": string;
  "variant"?: "primary" | "secondary" | "ghost";
  "disabled"?: boolean;
}
export interface ToggleButtonSerializedProps {
  "label": string;
  "pressed"?: boolean;
  "disabled"?: boolean;
}
export interface ButtonGroupSerializedProps {
  "label": string;
  "orientation"?: "horizontal" | "vertical";
}
export interface TextAreaSerializedProps {
  "label": string;
  "value"?: string;
  "placeholder"?: string;
  "description"?: string;
  "error"?: string;
  "required"?: boolean;
  "disabled"?: boolean;
  "rows"?: number;
}
export interface PasswordFieldSerializedProps {
  "label": string;
  "value"?: string;
  "placeholder"?: string;
  "description"?: string;
  "error"?: string;
  "required"?: boolean;
  "disabled"?: boolean;
}
export interface NumberFieldSerializedProps {
  "label": string;
  "value"?: number;
  "min"?: number;
  "max"?: number;
  "step"?: number;
  "description"?: string;
  "error"?: string;
  "required"?: boolean;
  "disabled"?: boolean;
}
export interface SearchFieldSerializedProps {
  "label": string;
  "value"?: string;
  "placeholder"?: string;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface SelectSerializedProps {
  "label": string;
  "value"?: string;
  "options": Array<{ "value": string; "label": string; "disabled"?: boolean }>;
  "placeholder"?: string;
  "description"?: string;
  "error"?: string;
  "required"?: boolean;
  "disabled"?: boolean;
}
export interface MultiSelectSerializedProps {
  "label": string;
  "value"?: Array<string>;
  "options": Array<{ "value": string; "label": string; "disabled"?: boolean }>;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface ComboBoxSerializedProps {
  "label": string;
  "value"?: string;
  "options": Array<{ "value": string; "label": string; "disabled"?: boolean }>;
  "placeholder"?: string;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface AutocompleteSerializedProps {
  "label": string;
  "value"?: string;
  "options": Array<{ "value": string; "label": string; "disabled"?: boolean }>;
  "placeholder"?: string;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface CheckboxSerializedProps {
  "label": string;
  "checked"?: boolean;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface CheckboxGroupSerializedProps {
  "label": string;
  "value"?: Array<string>;
  "options": Array<{ "value": string; "label": string; "disabled"?: boolean }>;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface RadioGroupSerializedProps {
  "label": string;
  "value"?: string;
  "options": Array<{ "value": string; "label": string; "disabled"?: boolean }>;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface SwitchSerializedProps {
  "label": string;
  "checked"?: boolean;
  "description"?: string;
  "disabled"?: boolean;
}
export interface SliderSerializedProps {
  "label": string;
  "value"?: number;
  "min"?: number;
  "max"?: number;
  "step"?: number;
  "disabled"?: boolean;
}
export interface RangeSliderSerializedProps {
  "label": string;
  "value"?: Array<number>;
  "min"?: number;
  "max"?: number;
  "step"?: number;
  "disabled"?: boolean;
}
export interface DatePickerSerializedProps {
  "label": string;
  "value"?: string;
  "min"?: string;
  "max"?: string;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface DateRangePickerSerializedProps {
  "label": string;
  "value"?: Array<string>;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface TimePickerSerializedProps {
  "label": string;
  "value"?: string;
  "min"?: string;
  "max"?: string;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface ColorPickerSerializedProps {
  "label": string;
  "value"?: string;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface FileInputSerializedProps {
  "label": string;
  "accept"?: string;
  "multiple"?: boolean;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface FormFieldSerializedProps {
  "label": string;
  "description"?: string;
  "error"?: string;
  "required"?: boolean;
}
export interface FieldSetSerializedProps {
  "legend": string;
  "description"?: string;
  "disabled"?: boolean;
}
export interface ValidationMessageSerializedProps {
  "message": string;
  "tone"?: "error" | "warning" | "success" | "info";
}
export interface InputGroupSerializedProps {
  "label": string;
}
export interface SegmentedControlSerializedProps {
  "label": string;
  "value"?: string;
  "options": Array<{ "value": string; "label": string; "disabled"?: boolean }>;
  "disabled"?: boolean;
}
export interface TagInputSerializedProps {
  "label": string;
  "value"?: Array<string>;
  "placeholder"?: string;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
}
export interface OtpFieldSerializedProps {
  "label": string;
  "value"?: string;
  "length"?: number;
  "description"?: string;
  "error"?: string;
  "disabled"?: boolean;
  "inputMode"?: "numeric" | "text";
}
export interface DialogSerializedProps {
  "open"?: boolean;
  "title": string;
  "description"?: string;
}
export interface AlertDialogSerializedProps {
  "open"?: boolean;
  "title": string;
  "description"?: string;
  "confirmLabel": string;
  "cancelLabel"?: string;
  "danger"?: boolean;
}
export interface DrawerSerializedProps {
  "open"?: boolean;
  "title": string;
  "side"?: "start" | "end" | "bottom";
}
export interface PopoverSerializedProps {
  "label": string;
  "triggerLabel": string;
  "open"?: boolean;
}
export interface MenuSerializedProps {
  "label": string;
  "items": Array<{ "id": string; "label": string; "disabled"?: boolean; "danger"?: boolean; "shortcut"?: string }>;
}
export interface ContextMenuSerializedProps {
  "label": string;
  "targetLabel": string;
  "items": Array<{ "id": string; "label": string; "disabled"?: boolean; "danger"?: boolean; "shortcut"?: string }>;
}
export interface DropdownMenuSerializedProps {
  "label": string;
  "triggerLabel": string;
  "items": Array<{ "id": string; "label": string; "disabled"?: boolean; "danger"?: boolean; "shortcut"?: string }>;
}
export interface CommandMenuSerializedProps {
  "open"?: boolean;
  "title"?: string;
  "items": Array<{ "id": string; "label": string; "disabled"?: boolean; "danger"?: boolean; "shortcut"?: string }>;
}
export interface HoverCardSerializedProps {
  "triggerLabel": string;
  "content": string;
}
export interface ToastSerializedProps {
  "title": string;
  "description"?: string;
  "tone"?: "info" | "success" | "warning" | "danger";
}
export interface NotificationCenterSerializedProps {
  "title"?: string;
  "items": Array<{ "id": string; "title": string; "description"?: string; "read"?: boolean; "time"?: string }>;
}
export interface BannerSerializedProps {
  "title"?: string;
  "message": string;
  "tone"?: "info" | "success" | "warning" | "danger";
}
export interface ProgressSerializedProps {
  "label": string;
  "value"?: number;
  "max"?: number;
  "showValue"?: boolean;
}
export interface SpinnerSerializedProps {
  "label"?: string;
  "size"?: "sm" | "md" | "lg";
}
export interface SkeletonSerializedProps {
  "width"?: number | string;
  "height"?: number | string;
  "label"?: string;
}
export interface TabsSerializedProps {
  "label": string;
  "items": Array<{ "id": string; "label": string; "content": string; "disabled"?: boolean }>;
  "value"?: string;
}
export interface AccordionSerializedProps {
  "items": Array<{ "id": string; "title": string; "content": string; "disabled"?: boolean }>;
  "multiple"?: boolean;
  "value"?: Array<string>;
}
export interface TreeViewSerializedProps {
  "label": string;
  "nodes": Array<unknown>;
  "selectedId"?: string;
  "defaultExpandedIds"?: Array<string>;
}
export interface PaginationSerializedProps {
  "page": number;
  "pageCount": number;
  "label"?: string;
  "siblingCount"?: number;
}
export interface StepperSerializedProps {
  "steps": Array<{ "id": string; "label": string; "description"?: string; "status"?: "complete" | "current" | "upcoming" | "error" }>;
  "orientation"?: "horizontal" | "vertical";
}
export interface StatusIndicatorSerializedProps {
  "status": "neutral" | "info" | "success" | "warning" | "danger";
  "label": string;
  "pulse"?: boolean;
}
export interface SerializablePropsByComponent {
  "ui.AppShell": AppShellSerializedProps;
  "ui.Panel": PanelSerializedProps;
  "ui.KpiCard": KpiCardSerializedProps;
  "ui.DataGrid": DataGridSerializedProps;
  "ui.ActivityFeed": ActivityFeedSerializedProps;
  "ui.Button": ButtonSerializedProps;
  "ui.TextField": TextFieldSerializedProps;
  "ui.PageLayout": PageLayoutSerializedProps;
  "ui.AppHeader": AppHeaderSerializedProps;
  "ui.Sidebar": SidebarSerializedProps;
  "ui.NavigationRail": NavigationRailSerializedProps;
  "ui.Breadcrumbs": BreadcrumbsSerializedProps;
  "ui.Card": CardSerializedProps;
  "ui.Surface": SurfaceSerializedProps;
  "ui.Stack": StackSerializedProps;
  "ui.Inline": InlineSerializedProps;
  "ui.Grid": GridSerializedProps;
  "ui.SplitPane": SplitPaneSerializedProps;
  "ui.DockWorkspace": DockWorkspaceSerializedProps;
  "ui.ResizablePanel": ResizablePanelSerializedProps;
  "ui.Toolbar": ToolbarSerializedProps;
  "ui.Divider": DividerSerializedProps;
  "ui.ScrollArea": ScrollAreaSerializedProps;
  "ui.VirtualList": VirtualListSerializedProps;
  "ui.EmptyState": EmptyStateSerializedProps;
  "ui.Text": TextSerializedProps;
  "ui.Heading": HeadingSerializedProps;
  "ui.Label": LabelSerializedProps;
  "ui.Link": LinkSerializedProps;
  "ui.Code": CodeSerializedProps;
  "ui.Badge": BadgeSerializedProps;
  "ui.Avatar": AvatarSerializedProps;
  "ui.Icon": IconSerializedProps;
  "ui.Tooltip": TooltipSerializedProps;
  "ui.TruncateText": TruncateTextSerializedProps;
  "ui.DataValue": DataValueSerializedProps;
  "ui.IconButton": IconButtonSerializedProps;
  "ui.ToggleButton": ToggleButtonSerializedProps;
  "ui.ButtonGroup": ButtonGroupSerializedProps;
  "ui.TextArea": TextAreaSerializedProps;
  "ui.PasswordField": PasswordFieldSerializedProps;
  "ui.NumberField": NumberFieldSerializedProps;
  "ui.SearchField": SearchFieldSerializedProps;
  "ui.Select": SelectSerializedProps;
  "ui.MultiSelect": MultiSelectSerializedProps;
  "ui.ComboBox": ComboBoxSerializedProps;
  "ui.Autocomplete": AutocompleteSerializedProps;
  "ui.Checkbox": CheckboxSerializedProps;
  "ui.CheckboxGroup": CheckboxGroupSerializedProps;
  "ui.RadioGroup": RadioGroupSerializedProps;
  "ui.Switch": SwitchSerializedProps;
  "ui.Slider": SliderSerializedProps;
  "ui.RangeSlider": RangeSliderSerializedProps;
  "ui.DatePicker": DatePickerSerializedProps;
  "ui.DateRangePicker": DateRangePickerSerializedProps;
  "ui.TimePicker": TimePickerSerializedProps;
  "ui.ColorPicker": ColorPickerSerializedProps;
  "ui.FileInput": FileInputSerializedProps;
  "ui.FormField": FormFieldSerializedProps;
  "ui.FieldSet": FieldSetSerializedProps;
  "ui.ValidationMessage": ValidationMessageSerializedProps;
  "ui.InputGroup": InputGroupSerializedProps;
  "ui.SegmentedControl": SegmentedControlSerializedProps;
  "ui.TagInput": TagInputSerializedProps;
  "ui.OtpField": OtpFieldSerializedProps;
  "ui.Dialog": DialogSerializedProps;
  "ui.AlertDialog": AlertDialogSerializedProps;
  "ui.Drawer": DrawerSerializedProps;
  "ui.Popover": PopoverSerializedProps;
  "ui.Menu": MenuSerializedProps;
  "ui.ContextMenu": ContextMenuSerializedProps;
  "ui.DropdownMenu": DropdownMenuSerializedProps;
  "ui.CommandMenu": CommandMenuSerializedProps;
  "ui.HoverCard": HoverCardSerializedProps;
  "ui.Toast": ToastSerializedProps;
  "ui.NotificationCenter": NotificationCenterSerializedProps;
  "ui.Banner": BannerSerializedProps;
  "ui.Progress": ProgressSerializedProps;
  "ui.Spinner": SpinnerSerializedProps;
  "ui.Skeleton": SkeletonSerializedProps;
  "ui.Tabs": TabsSerializedProps;
  "ui.Accordion": AccordionSerializedProps;
  "ui.TreeView": TreeViewSerializedProps;
  "ui.Pagination": PaginationSerializedProps;
  "ui.Stepper": StepperSerializedProps;
  "ui.StatusIndicator": StatusIndicatorSerializedProps;
}
export type SerializableComponentType = keyof SerializablePropsByComponent;
