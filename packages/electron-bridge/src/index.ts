import type {Host,HostActionRequest} from '@alienfishconsulting/surface-contracts';

export type DesktopCapability='menu'|'file-dialog'|'notification'|'shortcut'|'window';
export type DesktopRequest={capability:DesktopCapability;action:string;payload?:unknown};
export type DesktopResult={ok:true;value?:unknown}|{ok:false;code:'unavailable'|'not-allowed'|'invalid-request'|'host-error';message:string};
export type DesktopInvoke=(request:DesktopRequest)=>Promise<DesktopResult>;

export interface DesktopBridge {
  readonly available:boolean;
  readonly capabilities:readonly DesktopCapability[];
  request(request:DesktopRequest):Promise<DesktopResult>;
}

const capabilities=new Set<DesktopCapability>(['menu','file-dialog','notification','shortcut','window']);
const isRecord=(value:unknown):value is Record<string,unknown>=>typeof value==='object'&&value!==null&&!Array.isArray(value);
const isSerializable=(value:unknown)=>{try{return JSON.stringify(value).length<=64_000;}catch{return false;}};
export function isDesktopRequest(value:unknown):value is DesktopRequest{
  if(!isRecord(value)||typeof value.capability!=='string'||!capabilities.has(value.capability as DesktopCapability)||typeof value.action!=='string'||value.action.length<1||value.action.length>100)return false;
  return !Object.hasOwn(value,'payload')||isSerializable(value.payload);
}

export function createBrowserBridge():DesktopBridge{
  return {available:false,capabilities:[],request:async()=>({ok:false,code:'unavailable',message:'Desktop capabilities are unavailable in this browser host.'})};
}

export function createDesktopBridge(options:{invoke:DesktopInvoke;allowedCapabilities:readonly DesktopCapability[]}):DesktopBridge{
  const allowed=new Set(options.allowedCapabilities);
  return {available:true,capabilities:[...allowed],async request(request){
    if(!isDesktopRequest(request))return {ok:false,code:'invalid-request',message:'Desktop request is invalid or exceeds the payload limit.'};
    if(!allowed.has(request.capability))return {ok:false,code:'not-allowed',message:`Desktop capability is not allowed: ${request.capability}`};
    try{return await options.invoke(request);}catch{return {ok:false,code:'host-error',message:'The desktop host rejected the request.'};}
  }};
}

export function createRendererHost(options:{data?:Record<string,unknown>;onAction:(request:HostActionRequest)=>void|Promise<void>}):Host{
  return {data:options.data??{},requestAction:request=>options.onAction(request)};
}
