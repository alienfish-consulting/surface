import * as React from 'react';
export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> { title: string; children?: React.ReactNode }
export function AppShell({title,children,className='',...rest}:AppShellProps){
  return <div {...rest} className={`ui-shell ${className}`}><header className="ui-shell-header"><span className="ui-logo-mark" aria-hidden="true">◈</span><strong>{title}</strong><span className="ui-version">POC v0.1</span></header><main className="ui-workspace">{children}</main></div>;
}
export interface PanelProps extends React.HTMLAttributes<HTMLElement> {title:string;collapsible?:boolean;children?:React.ReactNode}
export function Panel({title,collapsible=false,children,className='',...rest}:PanelProps){
  const [open,setOpen]=React.useState(true);
  return <section {...rest} className={`ui-panel ${className}`} aria-label={title}>
    <div className="ui-panel-heading"><h2>{title}</h2>{collapsible && <button type="button" className="ui-icon-control" aria-expanded={open} onClick={()=>setOpen(x=>!x)}>{open?'−':'+'}<span className="ui-sr-only"> {open?'Collapse':'Expand'} {title}</span></button>}</div>
    {open && <div className="ui-panel-body">{children}</div>}
  </section>;
}
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,'onClick'> {label:string;variant?:'primary'|'secondary'|'ghost';onPress?:()=>void;busy?:boolean}
export function Button({label,variant='primary',onPress,busy=false,disabled=false,className='',...rest}:ButtonProps){
 return <button {...rest} type="button" className={`ui-button ui-button-${variant} ${className}`} disabled={disabled||busy} aria-busy={busy} onClick={onPress}>{label}</button>;
}
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'onChange'> {label:string;description?:string;error?:string;onValueChange?:(value:string)=>void}
export function TextField({label,description,error,id,required,className='',onValueChange,...rest}:TextFieldProps){
 const generated=React.useId();const controlId=id??generated;
 return <div className={`ui-field ${className}`}><label htmlFor={controlId}>{label}{required?' *':''}</label>
  <input {...rest} id={controlId} required={required} aria-invalid={Boolean(error)} aria-describedby={description||error?`${controlId}-help`:undefined} onChange={event=>onValueChange?.(event.currentTarget.value)}/>
  {(description||error)&&<p id={`${controlId}-help`} className={error?'ui-error':'ui-hint'}>{error||description}</p>}</div>;
}
export interface KpiCardProps extends React.HTMLAttributes<HTMLElement> {label:string;value?:number|string|null;format:'integer'|'currency'|'percent';currency?:string;loading?:boolean;freshness?:'current'|'stale'|'unknown'}
export function KpiCard({label,value,format,currency='USD',loading=false,freshness='current',...rest}:KpiCardProps){
 let display='—';
 if(typeof value==='number' && Number.isFinite(value)){
   try{display=new Intl.NumberFormat(undefined,format==='currency'?{style:'currency',currency}:format==='percent'?{style:'percent',maximumFractionDigits:1}:{maximumFractionDigits:0}).format(value)}
   catch{display=String(value)}
 }else if(typeof value==='string')display=value;
 return <article {...rest} className="ui-kpi" aria-busy={loading}><div className="ui-kpi-label">{label}</div><strong>{loading?'Loading…':display}</strong>{freshness==='stale' && <small className="ui-status-stale">Stale data</small>}</article>;
}
