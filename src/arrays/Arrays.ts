
import { Relation } from "./Relation";
import { EqualsByThreeEquals } from "./EqualsByThreeEquals";
import { Box } from "../away/Box";
import { Expect } from "../away/Expect";

export class Arrays{

    static UnboxArray<Item extends Box<any>>(array:Item[]) {
        return array.map(a=>a.getData());
    }
    
    static Includes<Item>(
        array:Item[],
        item:Item,
        doCompare:Relation=EqualsByThreeEquals,
    ){
        return array.some(
            a=>doCompare(a,item)
        );
    }

    static PushIfNotIncludes<Item>(
        array:Item[],
        item:Item,
        doCompare:Relation=EqualsByThreeEquals,
    ){
        if(!Arrays.Includes(array,item,doCompare)){
            array.push(item);
        }
    }
    
    static GetFirst<Item>(array:Item[]){
        Expect(array.length,"Array was empty.");
        return array[0];
    }

    static GetLast<Item>(array:Item[]){
        Expect(array.length,"Array was empty.");
        return array.slice(-1)[0];
    }

    static MaybeGetLast<Item>(array:Item[]){
        return array.slice(-1)[0];
    }

    static RemoveAnyFromEnd<Item>(array:Item[],removeItem:Item, doCompare:Relation=EqualsByThreeEquals){
        if(array.length===0){
            return [];
        }
        let rightIndex = array.length-1;
        while(doCompare(array[rightIndex],removeItem)){
            --rightIndex;
        }
        return array.slice(0,rightIndex);
    }

    static GetRandom<Item>(array:Item[]){
        Expect(array.length,"Array was empty.");
        const index = Math.floor(Math.random()*array.length);
        return array[index];
    }

    static PushManyIfNotIncludes<Item>(array:Item[],itemsToPush:Item[],doCompare:Relation=EqualsByThreeEquals){
        for(const aItem of itemsToPush){
            Arrays.PushIfNotIncludes(array,aItem,doCompare);
        }
    }

    /** Return a version of the array without duplicates. */
    static MakeUnique<Item>(array:Item[], doCompare:Relation<Item>=EqualsByThreeEquals){
        const result:Item[] = [];
        for(const a of array){
            Arrays.PushIfNotIncludes(result,a,doCompare);
        }
        return result;
    }

    /** Returns this array, excluding any items that appear in itemsToExclude. */
    static GetExclusion<Item>(array:Item[], itemsToExclude:any[],doCompare:Relation=EqualsByThreeEquals){
        const exclusion:Item[] = [];
        for(const a of array){
            if(!Arrays.Includes(itemsToExclude,a,doCompare)){
                exclusion.push(a);
            }
        }
        return exclusion;
    }

    /** Returns the elements that are present in both arrays. */
    static GetIntersection<Item>(array:Item[], b:any[],doCompare:Relation=EqualsByThreeEquals) {
        const intersection:Item[] = [];
        for(const a of array){
            if(Arrays.Includes(b,a,doCompare)){
                intersection.push(a);
            }
        }
        return intersection;
    }
    static Intersects<Item>(array:Item[], b:any[],doCompare:Relation=EqualsByThreeEquals) {
        return Arrays.GetIntersection(array,b,doCompare).length!==0;
    }

    static GetItem<Item>(array:Item[], index:number){
        const item = array[index];
        Expect(item,`Index out of range.`);
        return item;
    }
    
    static ContainsDuplicates(array:any[], doCompare:Relation=EqualsByThreeEquals){
        for(const aItem of array){
            const matchingItems = array.filter(
                b=>doCompare(aItem,b)
            );
            if(matchingItems.length>1){
                return true;
            }
        }    
        return false;
    }

    static GetSum(array:any[]){
        Expect(array.length,"Array was empty.");
        return array.reduce(
            (sum,current)=>sum+current,
            0
        )
    }

    static GetAverage(array:any[]){
        Expect(array.length,"Array was empty.");
        return Arrays.GetSum(array)/array.length;
    }
    
    static GetMax(array:any[]){
        Expect(array.length,"Array was empty.");
        let max:number = array[0];
        for(const a of array){
            if(a>max){
                max=a;
            }
        }
        return max;
    }

    static GetMin(array:any[]){
        Expect(array.length,"Array was empty.");
        let min:number = array[0];
        for(const a of array){
            if(a<min){
                min=a;
            }
        }
        return min;
    }
    
}