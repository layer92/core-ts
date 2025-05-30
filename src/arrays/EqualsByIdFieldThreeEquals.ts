import { Relation } from "./Relation";

export const EqualsByIdFieldThreeEquals:Relation = (a:{id:any},b:{id:any})=>a.id===b.id;