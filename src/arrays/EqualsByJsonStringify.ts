import { Relation } from "./Relation";

/** WARNING: JSON.stringify can be pretty slow! */
export const EqualsByJsonStringify:Relation = (a:any,b:any)=>JSON.stringify(a)===JSON.stringify(b);