import * as React from 'react';
import type {DesignNode,SerializableComponentType,SerializablePropsByComponent} from '@enterprise-ui/contracts';
import * as Data from '@enterprise-ui/react-data';
import type {Adapter,Host} from './core-adapters.js';

type Props=Record<string,unknown>;
const adapt=<K extends SerializableComponentType>(type:K,render:(props:SerializablePropsByComponent[K]&Props,children:React.ReactNode,node:DesignNode,host:Host)=>React.ReactNode):[string,Adapter]=>[type,render as unknown as Adapter];
const action=(node:DesignNode,host:Host,event:string,payload?:unknown)=>{const actionId=node.intents?.[event]?.actionId;if(actionId)void host.requestAction({actionId,nodeId:node.id,event,payload})};
const records=(value:unknown):Data.DataRecord[]=>Array.isArray(value)?value.filter(item=>item!==null&&typeof item==='object'&&!Array.isArray(item)) as Data.DataRecord[]:[];

export const dataAdapters:ReadonlyMap<string,Adapter>=new Map<string,Adapter>([
 adapt('ui.DataGrid',(p,_c,n,h)=><Data.DataGrid title={p.title} columns={p.columns} rows={records(p.rows)} presentation={p.presentation} selectable={p.selectable} onRowActivate={(row,index)=>action(n,h,'onRowActivate',{row,index})}/>),
 adapt('ui.GridCellEditor',(p,_c,n,h)=><Data.GridCellEditor label={p.label} value={p.value} type={p.type} onCommit={value=>action(n,h,'onCommit',{value})} onCancel={()=>action(n,h,'onCancel')}/>),
 adapt('ui.GridToolbar',(p,children,n,h)=><Data.GridToolbar label={p.label} query={p.query} onQueryChange={value=>action(n,h,'onQueryChange',{value})}>{children}</Data.GridToolbar>),
 adapt('ui.ColumnChooser',(p,_c,n,h)=><Data.ColumnChooser label={p.label} columns={p.columns} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.FilterBuilder',(p,_c,n,h)=><Data.FilterBuilder label={p.label} fields={p.fields} value={p.value} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.SortBuilder',(p,_c,n,h)=><Data.SortBuilder fields={p.fields} value={p.value} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.GroupPanel',(p,_c,n,h)=><Data.GroupPanel fields={p.fields} groupedKeys={p.groupedKeys} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.TreeGrid',(p,_c,n,h)=><Data.TreeGrid title={p.title} columns={p.columns} rows={(p.rows??[]) as Data.TreeGridRow[]} defaultExpandedIds={p.defaultExpandedIds} presentation={p.presentation} onRowActivate={(row,index)=>action(n,h,'onRowActivate',{row,index})}/>),
 adapt('ui.PivotTable',p=><Data.PivotTable title={p.title} rowLabels={p.rowLabels} columnLabels={p.columnLabels} values={p.values??[]}/>),
 adapt('ui.PivotFieldWell',(p,_c,n,h)=><Data.PivotFieldWell rows={p.rows} columns={p.columns} values={p.values} onRemove={(area,field)=>action(n,h,'onRemove',{area,field})}/>),
 adapt('ui.DataTable',(p,_c,n,h)=><Data.DataTable title={p.title} columns={p.columns} rows={records(p.rows)} emptyText={p.emptyText} onRowActivate={(row,index)=>action(n,h,'onRowActivate',{row,index})}/>),
 adapt('ui.DataList',(p,_c,n,h)=><Data.DataList label={p.label} items={records(p.items)} primaryKey={p.primaryKey} secondaryKey={p.secondaryKey} onActivate={(item,index)=>action(n,h,'onActivate',{item,index})}/>),
 adapt('ui.SavedViewSelector',(p,_c,n,h)=><Data.SavedViewSelector label={p.label} views={p.views} value={p.value} onChange={id=>action(n,h,'onChange',{id})} onSave={name=>action(n,h,'onSave',{name})}/>),
 adapt('ui.Chart',p=><Data.Chart title={p.title} data={p.data??[]} type={p.type} height={p.height} valueLabel={p.valueLabel} emptyText={p.emptyText}/>),
 adapt('ui.Sparkline',p=><Data.Sparkline label={p.label} values={p.values??[]} width={p.width} height={p.height} tone={p.tone}/>),
 adapt('ui.KpiCard',p=><Data.KpiCard label={p.label} value={typeof p.value==='number'||typeof p.value==='string'?p.value:null} format={p.format} currency={p.currency??'USD'} trend={typeof p.trend==='number'?p.trend:undefined}/>),
 adapt('ui.StatGroup',p=><Data.StatGroup label={p.label} items={(p.items??[]) as Data.StatItem[]}/>),
 adapt('ui.FacetedFilter',(p,_c,n,h)=><Data.FacetedFilter facets={p.facets.map(facet=>({...facet,values:facet.values??[]}))} value={p.value} onChange={value=>action(n,h,'onChange',{value})}/>),
 adapt('ui.QueryBuilder',(p,_c,n,h)=><Data.QueryBuilder fields={p.fields} value={p.value} conjunction={p.conjunction} onChange={value=>action(n,h,'onChange',{value})} onConjunctionChange={value=>action(n,h,'onConjunctionChange',{value})}/>),
 adapt('ui.Calendar',(p,_c,n,h)=><Data.Calendar label={p.label} month={p.month} events={p.events??[]} onEventActivate={id=>action(n,h,'onEventActivate',{id})}/>),
 adapt('ui.Scheduler',(p,_c,n,h)=><Data.Scheduler label={p.label} resources={p.resources} events={(p.events??[]) as Array<Data.CalendarEvent&{resourceId:string}>} onEventActivate={id=>action(n,h,'onEventActivate',{id})}/>),
 adapt('ui.Timeline',(p,_c,n,h)=><Data.Timeline label={p.label} items={p.items??[]} onActivate={id=>action(n,h,'onActivate',{id})}/>),
 adapt('ui.GanttChart',(p,_c,n,h)=><Data.GanttChart label={p.label} tasks={p.tasks??[]} range={p.range} onTaskActivate={id=>action(n,h,'onTaskActivate',{id})}/>),
 adapt('ui.GanttTaskEditor',(p,_c,n,h)=><Data.GanttTaskEditor task={p.task} onChange={task=>action(n,h,'onChange',{task})} onDelete={()=>action(n,h,'onDelete')}/>),
 adapt('ui.Heatmap',p=><Data.Heatmap label={p.label} rows={p.rows} columns={p.columns} cells={p.cells??[]}/>),
 adapt('ui.DataInspector',(p,_c,n,h)=><Data.DataInspector label={p.label} value={p.value} path={p.path} onPathChange={path=>action(n,h,'onPathChange',{path})}/>),
 adapt('ui.DiffViewer',p=><Data.DiffViewer label={p.label} before={p.before} after={p.after} mode={p.mode}/>),
 adapt('ui.JsonViewer',p=><Data.JsonViewer label={p.label} value={p.value} defaultExpandedDepth={p.defaultExpandedDepth} copyLabel={p.copyLabel}/>),
 adapt('ui.CodeViewer',p=><Data.CodeViewer label={p.label} code={p.code} language={p.language} lineNumbers={p.lineNumbers} highlightLines={p.highlightLines}/>),
 adapt('ui.FileTree',(p,_c,n,h)=><Data.FileTree label={p.label} nodes={p.nodes as Data.FileTreeNode[]} selectedId={p.selectedId} defaultExpandedIds={p.defaultExpandedIds} onSelect={id=>action(n,h,'onSelect',{id})}/>),
]);
