import * as React from 'react';

const classes = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ');

export interface TextProps extends React.HTMLAttributes<HTMLElement> {as?:'span'|'p'|'div';tone?:'primary'|'secondary'|'tertiary'}
export function Text({as='span',tone='primary',className,...rest}:TextProps):React.ReactElement{return React.createElement(as,{...rest,className:classes('ui-text',`ui-text-${tone}`,className)})}
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {level?:1|2|3|4|5|6}
export function Heading({level=2,className,...rest}:HeadingProps):React.ReactElement{return React.createElement(`h${level}`,{...rest,className:classes('ui-heading',className)})}
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {required?:boolean}
export function Label({required,children,className,...rest}:LabelProps){return <label {...rest} className={classes('ui-label',className)}>{children}{required&&<span aria-hidden="true"> *</span>}</label>}
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {external?:boolean}
export function Link({external,children,className,...rest}:LinkProps){return <a {...rest} className={classes('ui-link',className)} target={external?'_blank':rest.target} rel={external?'noreferrer':rest.rel}>{children}{external&&<span className="ui-sr-only"> (opens in a new tab)</span>}</a>}
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {block?:boolean}
export function Code({block=false,className,...rest}:CodeProps){return block?<pre className={classes('ui-code-block',className)}><code {...rest}/></pre>:<code {...rest} className={classes('ui-code',className)}/>}
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {tone?:'neutral'|'info'|'success'|'warning'|'danger'}
export function Badge({tone='neutral',className,...rest}:BadgeProps){return <span {...rest} className={classes('ui-badge',`ui-badge-${tone}`,className)}/>}
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {name:string;src?:string;size?:'sm'|'md'|'lg'}
export function Avatar({name,src,size='md',className,...rest}:AvatarProps){const initials=name.split(/\s+/).slice(0,2).map(part=>part[0]?.toUpperCase()).join('');return <span {...rest} className={classes('ui-avatar',`ui-avatar-${size}`,className)}>{src?<img src={src} alt={name}/>:<span aria-label={name}>{initials}</span>}</span>}
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {label?:string;decorative?:boolean}
export function Icon({label,decorative=!label,className,...rest}:IconProps){return <span {...rest} role={decorative?undefined:'img'} aria-hidden={decorative||undefined} aria-label={decorative?undefined:label} className={classes('ui-icon',className)}/>}
export interface TooltipProps {content:string;children:React.ReactElement;placement?:'top'|'right'|'bottom'|'left'}
export function Tooltip({content,children,placement='top'}:TooltipProps){const id=React.useId();return <span className={classes('ui-tooltip-anchor',`ui-tooltip-${placement}`)}>{React.cloneElement(children as React.ReactElement<Record<string,unknown>>,{'aria-describedby':id})}<span role="tooltip" id={id} className="ui-tooltip-content">{content}</span></span>}
export interface TruncateTextProps extends React.HTMLAttributes<HTMLSpanElement> {text:string;lines?:1|2|3}
export function TruncateText({text,lines=1,className,style,...rest}:TruncateTextProps){return <span {...rest} title={text} className={classes('ui-truncate',className)} style={{...style,'--ui-truncate-lines':lines} as React.CSSProperties}>{text}</span>}
export interface KeyboardShortcutProps extends React.HTMLAttributes<HTMLElement> {keys:readonly string[];label?:string}
export function KeyboardShortcut({keys,label,className,...rest}:KeyboardShortcutProps){return <kbd {...rest} aria-label={label??keys.join(' plus ')} className={classes('ui-shortcut',className)}>{keys.map((key,index)=><React.Fragment key={`${key}-${index}`}>{index>0&&<span aria-hidden="true">+</span>}<span>{key}</span></React.Fragment>)}</kbd>}
export interface DataValueProps extends React.HTMLAttributes<HTMLSpanElement> {value:unknown;emptyText?:string;format?:'text'|'number'|'date'|'json'}
export function DataValue({value,emptyText='—',format='text',className,...rest}:DataValueProps){let display=emptyText;if(value!==null&&value!==undefined&&value!==''){if(format==='number'&&typeof value==='number')display=new Intl.NumberFormat().format(value);else if(format==='date'&&(typeof value==='string'||value instanceof Date)){const date=value instanceof Date?value:new Date(value);display=Number.isNaN(date.valueOf())?String(value):new Intl.DateTimeFormat().format(date)}else if(format==='json')display=JSON.stringify(value);else display=String(value)}return <span {...rest} className={classes('ui-data-value',className)}>{display}</span>}
