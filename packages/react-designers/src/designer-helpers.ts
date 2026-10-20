import type {DesignDocument,DesignNode,Proposal} from '@alienfishconsulting/surface-contracts';

export interface HistoryState {past:DesignDocument[];present:DesignDocument;future:DesignDocument[]}
export const pushHistory=(state:HistoryState,next:DesignDocument):HistoryState=>({past:[...state.past,state.present],present:next,future:[]});
export const undoHistory=(state:HistoryState):HistoryState=>state.past.length?{past:state.past.slice(0,-1),present:state.past.at(-1)!,future:[state.present,...state.future]}:state;
export const redoHistory=(state:HistoryState):HistoryState=>state.future.length?{past:[...state.past,state.present],present:state.future[0]!,future:state.future.slice(1)}:state;
export const proposalForProperty=(document:DesignDocument,nodePath:string,key:string,value:unknown):Proposal=>({proposalId:`designer-${document.revision}`,documentId:document.id,schemaVersion:document.schemaVersion,registryVersion:document.registryVersion,baseRevision:document.revision,rationale:`Change ${key}`,operations:[{op:'test',path:'/revision',value:document.revision},{op:'replace',path:`${nodePath}/props/${key.replaceAll('~','~0').replaceAll('/','~1')}`,value}]});

export function flattenNodes(root:DesignNode):{node:DesignNode;path:string}[]{
 const result:{node:DesignNode;path:string}[]=[];
 const visit=(node:DesignNode,path:string)=>{result.push({node,path});node.children?.forEach((child,i)=>visit(child,`${path}/children/${i}`));};
 visit(root,'/root');return result;
}
