import * as React from 'react';

const classes = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ');

export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}
export function PageLayout({header,sidebar,children,className,...rest}:PageLayoutProps){
  return <div {...rest} className={classes('ui-page-layout',className)}>
    {header && <div className="ui-page-layout-header">{header}</div>}
    {sidebar && <div className="ui-page-layout-sidebar">{sidebar}</div>}
    <main className="ui-page-layout-main">{children}</main>
  </div>;
}

export interface AppHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>,'title'> {
  title: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}
export function AppHeader({title,leading,trailing,className,...rest}:AppHeaderProps){
  return <header {...rest} className={classes('ui-app-header',className)}>
    {leading}<strong className="ui-app-header-title">{title}</strong>
    {trailing && <div className="ui-app-header-trailing">{trailing}</div>}
  </header>;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {label:string;children:React.ReactNode}
export function Sidebar({label,children,className,...rest}:SidebarProps){
  return <aside {...rest} aria-label={label} className={classes('ui-sidebar',className)}>{children}</aside>;
}

export interface NavigationRailItem {id:string;label:string;icon?:React.ReactNode;disabled?:boolean}
export interface NavigationRailProps extends Omit<React.HTMLAttributes<HTMLElement>,'onSelect'> {
  label:string;items:readonly NavigationRailItem[];activeId?:string;onSelect?:(id:string)=>void;
}
export function NavigationRail({label,items,activeId,onSelect,className,...rest}:NavigationRailProps){
  return <nav {...rest} aria-label={label} className={classes('ui-navigation-rail',className)}>
    {items.map(item=><button key={item.id} type="button" disabled={item.disabled} aria-current={item.id===activeId?'page':undefined} onClick={()=>onSelect?.(item.id)}>
      {item.icon && <span aria-hidden="true">{item.icon}</span>}<span>{item.label}</span>
    </button>)}
  </nav>;
}

export interface BreadcrumbItem {label:string;href?:string;onSelect?:()=>void}
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {items:readonly BreadcrumbItem[];label?:string}
export function Breadcrumbs({items,label='Breadcrumbs',className,...rest}:BreadcrumbsProps){
  return <nav {...rest} aria-label={label} className={classes('ui-breadcrumbs',className)}><ol>
    {items.map((item,index)=><li key={`${item.label}-${index}`}>
      {index===items.length-1?<span aria-current="page">{item.label}</span>:item.href?<a href={item.href}>{item.label}</a>:<button type="button" onClick={item.onSelect}>{item.label}</button>}
    </li>)}
  </ol></nav>;
}

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {elevation?:'flat'|'raised'|'overlay'}
export function Surface({elevation='flat',className,...rest}:SurfaceProps){return <div {...rest} className={classes('ui-surface',`ui-surface-${elevation}`,className)}/>}
export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>,'title'> {title?:React.ReactNode;footer?:React.ReactNode}
export function Card({title,footer,children,className,...rest}:CardProps){return <article {...rest} className={classes('ui-card',className)}>{title&&<header>{title}</header>}<div className="ui-card-body">{children}</div>{footer&&<footer>{footer}</footer>}</article>}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {gap?:'xs'|'sm'|'md'|'lg';align?:React.CSSProperties['alignItems']}
export function Stack({gap='md',align,className,style,...rest}:StackProps){return <div {...rest} className={classes('ui-stack',`ui-gap-${gap}`,className)} style={{...style,alignItems:align}}/>}
export interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {gap?:'xs'|'sm'|'md'|'lg';align?:React.CSSProperties['alignItems'];wrap?:boolean}
export function Inline({gap='md',align='center',wrap=true,className,style,...rest}:InlineProps){return <div {...rest} className={classes('ui-inline',`ui-gap-${gap}`,className)} style={{...style,alignItems:align,flexWrap:wrap?'wrap':'nowrap'}}/>}
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {columns?:number|string;gap?:'xs'|'sm'|'md'|'lg';minColumnWidth?:string}
export function Grid({columns=2,gap='md',minColumnWidth,className,style,...rest}:GridProps){
 const template=minColumnWidth?`repeat(auto-fit,minmax(min(100%, ${minColumnWidth}),1fr))`:typeof columns==='number'?`repeat(${columns},minmax(0,1fr))`:columns;
 return <div {...rest} className={classes('ui-grid',`ui-gap-${gap}`,className)} style={{...style,gridTemplateColumns:template}}/>;
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label:string;size?:number;defaultSize?:number;minSize?:number;maxSize?:number;onSizeChange?:(size:number)=>void;
}
export function ResizablePanel({label,size,defaultSize=320,minSize=160,maxSize=720,onSizeChange,children,className,style,...rest}:ResizablePanelProps){
 const [internal,setInternal]=React.useState(defaultSize);const current=size??internal;
 const update=(next:number)=>{const bounded=Math.min(maxSize,Math.max(minSize,next));if(size===undefined)setInternal(bounded);onSizeChange?.(bounded)};
 return <div {...rest} className={classes('ui-resizable-panel',className)} style={{...style,inlineSize:current}}>
  <div className="ui-resizable-panel-content">{children}</div>
  <div role="separator" aria-label={`Resize ${label}`} aria-orientation="vertical" aria-valuemin={minSize} aria-valuemax={maxSize} aria-valuenow={current} tabIndex={0} className="ui-resize-handle" onKeyDown={event=>{
    const delta=event.key==='ArrowLeft'?-16:event.key==='ArrowRight'?16:event.key==='Home'?minSize-current:event.key==='End'?maxSize-current:0;
    if(delta){event.preventDefault();update(current+delta)}
  }}/>
 </div>;
}

export interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  label:string;start:React.ReactNode;end:React.ReactNode;defaultPercent?:number;minPercent?:number;maxPercent?:number;
}
export function SplitPane({label,start,end,defaultPercent=50,minPercent=20,maxPercent=80,className,style,...rest}:SplitPaneProps){
 const [percent,setPercent]=React.useState(defaultPercent);const update=(value:number)=>setPercent(Math.min(maxPercent,Math.max(minPercent,value)));
 return <div {...rest} className={classes('ui-split-pane',className)} style={{...style,gridTemplateColumns:`minmax(0,${percent}fr) auto minmax(0,${100-percent}fr)`}}>
  <div className="ui-split-pane-region">{start}</div>
  <div role="separator" aria-label={label} aria-orientation="vertical" aria-valuemin={minPercent} aria-valuemax={maxPercent} aria-valuenow={percent} tabIndex={0} className="ui-resize-handle" onKeyDown={event=>{
    const delta=event.key==='ArrowLeft'?-5:event.key==='ArrowRight'?5:event.key==='Home'?minPercent-percent:event.key==='End'?maxPercent-percent:0;
    if(delta){event.preventDefault();update(percent+delta)}
  }}/>
  <div className="ui-split-pane-region">{end}</div>
 </div>;
}

export interface DockWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  label:string;main:React.ReactNode;start?:React.ReactNode;end?:React.ReactNode;bottom?:React.ReactNode;
}
export function DockWorkspace({label,main,start,end,bottom,className,...rest}:DockWorkspaceProps){
 const [visible,setVisible]=React.useState({start:Boolean(start),end:Boolean(end),bottom:Boolean(bottom)});
 return <section {...rest} aria-label={label} className={classes('ui-dock-workspace',className)}>
  <div className="ui-dock-controls" role="toolbar" aria-label={`${label} panels`}>
   {start&&<button type="button" aria-pressed={visible.start} onClick={()=>setVisible(value=>({...value,start:!value.start}))}>Start panel</button>}
   {end&&<button type="button" aria-pressed={visible.end} onClick={()=>setVisible(value=>({...value,end:!value.end}))}>End panel</button>}
   {bottom&&<button type="button" aria-pressed={visible.bottom} onClick={()=>setVisible(value=>({...value,bottom:!value.bottom}))}>Bottom panel</button>}
  </div>
  <div className="ui-dock-grid">
   {start&&visible.start&&<aside className="ui-dock-start">{start}</aside>}
   <div className="ui-dock-main">{main}</div>
   {end&&visible.end&&<aside className="ui-dock-end">{end}</aside>}
   {bottom&&visible.bottom&&<div className="ui-dock-bottom">{bottom}</div>}
  </div>
 </section>;
}

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {label:string}
export function Toolbar({label,className,...rest}:ToolbarProps){return <div {...rest} role="toolbar" aria-label={label} className={classes('ui-toolbar',className)}/>}
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {orientation?:'horizontal'|'vertical'}
export function Divider({orientation='horizontal',className,...rest}:DividerProps){return <hr {...rest} aria-orientation={orientation} className={classes('ui-divider',`ui-divider-${orientation}`,className)}/>}
export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {maxHeight?:number|string;label?:string}
export function ScrollArea({maxHeight=320,label,className,style,...rest}:ScrollAreaProps){return <div {...rest} role={label?'region':undefined} aria-label={label} tabIndex={label?0:undefined} className={classes('ui-scroll-area',className)} style={{...style,maxHeight}}/>}

export interface VirtualListProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>,'children'> {
  items:readonly T[];height:number;rowHeight:number;renderItem:(item:T,index:number)=>React.ReactNode;getKey?:(item:T,index:number)=>React.Key;overscan?:number;label:string;
}
export function VirtualList<T>({items,height,rowHeight,renderItem,getKey,overscan=3,label,className,...rest}:VirtualListProps<T>){
 const [scrollTop,setScrollTop]=React.useState(0);const visible=Math.ceil(height/rowHeight);const start=Math.max(0,Math.floor(scrollTop/rowHeight)-overscan);const end=Math.min(items.length,start+visible+overscan*2);
 return <div {...rest} role="list" aria-label={label} className={classes('ui-virtual-list',className)} style={{height}} onScroll={event=>setScrollTop(event.currentTarget.scrollTop)}>
  <div style={{height:items.length*rowHeight,position:'relative'}}>{items.slice(start,end).map((item,offset)=>{const index=start+offset;return <div role="listitem" key={getKey?.(item,index)??index} className="ui-virtual-row" style={{height:rowHeight,transform:`translateY(${index*rowHeight}px)`}}>{renderItem(item,index)}</div>})}</div>
 </div>;
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {title:string;description?:React.ReactNode;action?:React.ReactNode;icon?:React.ReactNode}
export function EmptyState({title,description,action,icon,className,...rest}:EmptyStateProps){return <div {...rest} className={classes('ui-empty-state',className)}>{icon&&<div aria-hidden="true" className="ui-empty-state-icon">{icon}</div>}<h2>{title}</h2>{description&&<p>{description}</p>}{action}</div>}
