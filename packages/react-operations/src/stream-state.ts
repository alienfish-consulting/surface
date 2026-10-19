export type ConnectionState='loading'|'live'|'stale'|'reconnecting'|'failed';
export interface StreamItem {id:string;sequence:number;timestamp:string;message:string;tone?:'neutral'|'success'|'warning'|'danger'}
export interface StreamState {connection:ConnectionState;items:StreamItem[];lastSequence:number;error?:string}
export type StreamEvent={type:'connected'}|{type:'disconnected'}|{type:'failed';error:string}|{type:'snapshot';items:StreamItem[]}|{type:'event';item:StreamItem};
const ordered=(items:readonly StreamItem[])=>[...new Map(items.map(item=>[item.id,item])).values()].sort((a,b)=>a.sequence-b.sequence);
export function reduceStream(state:StreamState,event:StreamEvent):StreamState{
 if(event.type==='connected')return {...state,connection:'live',error:undefined};
 if(event.type==='disconnected')return {...state,connection:'reconnecting'};
 if(event.type==='failed')return {...state,connection:'failed',error:event.error};
 if(event.type==='snapshot'){const items=ordered(event.items);return {...state,items,lastSequence:items.at(-1)?.sequence??0};}
 const items=ordered([...state.items,event.item]);return {...state,items,lastSequence:Math.max(state.lastSequence,event.item.sequence)};
}
