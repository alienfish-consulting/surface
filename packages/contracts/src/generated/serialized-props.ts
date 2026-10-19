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
export interface SerializablePropsByComponent {
  "ui.AppShell": AppShellSerializedProps;
  "ui.Panel": PanelSerializedProps;
  "ui.KpiCard": KpiCardSerializedProps;
  "ui.DataGrid": DataGridSerializedProps;
  "ui.ActivityFeed": ActivityFeedSerializedProps;
  "ui.Button": ButtonSerializedProps;
  "ui.TextField": TextFieldSerializedProps;
}
export type SerializableComponentType = keyof SerializablePropsByComponent;
