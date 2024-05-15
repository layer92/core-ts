
import { Relation } from "./Relation";
import { EqualsByThreeEquals } from "./EqualsByThreeEquals";
import { Box } from "../away/Box";
import { Expect } from "../away/Expect";
import { Modulo } from "../math/Modulo";
import { OnException } from "../away/OnException";

export function UnboxArray<Item extends Box<any>>(array:Item[]) {
    return array.map(a=>a.getData());
}
export function DoesArrayInclude<Item>(
    array:Item[],
    item:Item,
    compare:Relation=EqualsByThreeEquals,
){
    return array.some(
        a=>compare(a,item)
    );
}

export function PushIfNotIncludes<Item>(
    array:Item[],
    item:Item,
    compare:Relation=EqualsByThreeEquals,
){
    if(!DoesArrayInclude(array,item,compare)){
        array.push(item);
    }
}

export function PushManyIfNotIncludes<Item>(array:Item[],itemsToPush:Item[],compare:Relation=EqualsByThreeEquals){
    for(const aItem of itemsToPush){
        PushIfNotIncludes(array,aItem,compare);
    }
}

export function GetFirstItem<Item>(array:Item[]){
    Expect(array.length,"Array was empty.");
    return array[0];
}

export function GetLastItem<Item>(array:Item[]){
    Expect(array.length,"Array was empty.");
    return array.slice(-1)[0];
}

export function MaybeGetLastItem<Item>(array:Item[]){
    return array.slice(-1)[0];
}

export function GetRandomItem<Item>(array:Item[]){
    Expect(array.length,"Array was empty.");
    const index = Math.floor(Math.random()*array.length);
    return array[index];
}

export function RemoveAnyFromEndOfArray<Item>(array:Item[],removeItem:Item, compare:Relation=EqualsByThreeEquals){
    if(array.length===0){
        return [];
    }
    let rightIndex = array.length-1;
    while(compare(array[rightIndex],removeItem)){
        --rightIndex;
    }
    return array.slice(0,rightIndex);
}

/** Return a version of the array without duplicates. Array is in the same order, and in the case of a duplicate, all occurrences after the first are removed. */
export function MakeUniqueArray<Item>(array:Item[], compare:Relation<Item>=EqualsByThreeEquals){
    const result:Item[] = [];
    for(const a of array){
        PushIfNotIncludes(result,a,compare);
    }
    return result;
}

/** Returns this array, excluding any items that appear in itemsToExclude. */
export function GetArrayExclusion<Item>(array:Item[], itemsToExclude:any[],compare:Relation=EqualsByThreeEquals){
    const exclusion:Item[] = [];
    for(const a of array){
        if(!DoesArrayInclude(itemsToExclude,a,compare)){
            exclusion.push(a);
        }
    }
    return exclusion;
}
/** Returns the elements that are present in both arrays. */
export function GetArrayIntersection<Item>(array:Item[], b:any[],compare:Relation=EqualsByThreeEquals) {
    const intersection:Item[] = [];
    for(const a of array){
        if(DoesArrayInclude(b,a,compare)){
            intersection.push(a);
        }
    }
    return intersection;
}

export function DoArraysIntersect(a:any[], b:any[],compare:Relation=EqualsByThreeEquals) {
    return GetArrayIntersection(a,b,compare).length!==0;
}

export function GetItemByIndex<Item>(array:Item[], index:number){
    this.ExpectIndexIsInRange(array,index);
    return array[index];
}

export function ExpectIndexIsInRange(array:any[],index:number,onOutOfRange?:OnException){
    const makeMessage = ()=>`Index out of range: ${index}`;
    Expect(index>=0, makeMessage, onOutOfRange);
    Expect(index<array.length, makeMessage, onOutOfRange);
}

export function DoesArrayContainDuplicates(array:any[], compare:Relation=EqualsByThreeEquals){
    for(const aItem of array){
        const matchingItems = array.filter(
            b=>compare(aItem,b)
        );
        if(matchingItems.length>1){
            return true;
        }
    }    
    return false;
}

export function GetArraySum(array:any[]){
    Expect(array.length,"Array was empty.");
    return array.reduce(
        (sum,current)=>sum+current,
        0
    )
}

export function GetArrayAverage(array:any[]){
    Expect(array.length,"Array was empty.");
    return GetArraySum(array)/array.length;
}

export function GetArrayMax(array:any[]){
    Expect(array.length,"Array was empty.");
    let max:number = array[0];
    for(const a of array){
        if(a>max){
            max=a;
        }
    }
    return max;
}

export function GetArrayMin(array:any[]){
    Expect(array.length,"Array was empty.");
    let min:number = array[0];
    for(const a of array){
        if(a<min){
            min=a;
        }
    }
    return min;
}

export function GetRelativeItem<Item>(array:Item[], fromItem:Item, offset:number, loop:boolean){
    let index = GetIndexByItem(array,fromItem) + offset;
    if(loop){
        index = Modulo(index,array.length);
    }else{
        this.ExpectIndexIsInRange(array,index);
    }
    return array[index];
}


export function GetNextItemInCycle<Item>(array:Item[], fromItem:Item){
    return this.GetRelativeItem(array,fromItem,1,true);
}

export function GetPreviousItemInCycle<Item>(array:Item[], fromItem:Item){
    return this.GetRelativeItem(array,fromItem,-1,true);
}
/** Throws an error if the item isn't in the array. */
export function GetIndexByItem<Item>(array:Item[], item:Item){
    const oldIndex = array.indexOf(item);
    Expect(oldIndex!==-1,`Item not found in array.`);
    return oldIndex;
}
/** If the item is included in the array, removes it from the array. If the item isn't include in the array, pushes it to the array. */
export function ToggleInclusion<Item>(array:Item[], item:Item, compare:Relation=EqualsByThreeEquals){
    if( DoesArrayInclude(array,item,compare) ){
        array = array.filter(a=>!compare(a,item));
    }else{
        array = array.slice();
        array.push(item);
    }
    return array;
}

/** faster than ArrayEquals, but requires the arrays to be sorted */
export function SortedArrayEquals<Item>(a:Item[], b:Item[], compare:Relation=EqualsByThreeEquals){
    if(a.length!==b.length){
        return false;
    }
    const length = a.length;
    for(let i=0;i<length;++i){
        if(!compare(a[i],b[i])){
            return false;
        }
    }
    return true;
}

/** if the arrays are sorted, use SortedArrayEquals, which is faster */
export function ArrayEquals<Item>(a:Item[], b:Item[], compare:Relation=EqualsByThreeEquals){
    if(a.length!==b.length){
        return false;
    }
    a = a.slice();
    b = b.slice();
    while(a.length){
        const itemA = a.pop();
        const matchIndex = b.findIndex(itemB=>compare(itemA,itemB));
        if(matchIndex===-1){
            return false;
        }
        b.splice(matchIndex,1);
    }
    return true;
}

/** DEPRECATED: Use individual utility functions instead to encourage better tree-shaking. */
export class Arrays{

    static UnboxArray=UnboxArray;
    static Includes=DoesArrayInclude;
    static PushIfNotIncludes=PushIfNotIncludes;
    static GetFirst=GetFirstItem;
    static GetLast=GetLastItem;
    static MaybeGetLast=MaybeGetLastItem;
    static RemoveAnyFromEnd=RemoveAnyFromEndOfArray;
    static GetRandom=GetRandomItem;
    static PushManyIfNotIncludes=PushManyIfNotIncludes;
    static MakeUnique=MakeUniqueArray;
    static GetExclusion=GetArrayExclusion
    static GetIntersection=GetArrayIntersection;
    static Intersects=DoArraysIntersect;
    static GetItem=GetItemByIndex;
    static ExpectIndexIsInRange=ExpectIndexIsInRange;
    static ContainsDuplicates=DoesArrayContainDuplicates;
    static GetSum=GetArraySum;
    static GetAverage=GetArrayAverage;
    static GetMax=GetArrayMax;
    static GetMin=GetArrayMin;
    static GetRelativeItem=GetRelativeItem;
    static GetNextItemInCycle=GetNextItemInCycle;
    static GetPreviousItemInCycle=GetPreviousItemInCycle;    
    static GetIndex=GetIndexByItem;
    static ToggleInclusion=ToggleInclusion;
}