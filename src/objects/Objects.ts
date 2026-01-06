import { MakeUniqueArray, PushManyIfNotIncludes, UnsortedArrayEquals } from "../arrays/Arrays";
import { EqualsByThreeEquals } from "../arrays/EqualsByThreeEquals";
import { Relation } from "../arrays/Relation";

type PickedType<Source,Key extends keyof Source> = {
    [key in Key]:Source[key]
};

/** Returns a version of the source object that only has the picked keys. The source object must have every key specified in the keys array. */
export function Pick<SourceObject,Key extends keyof SourceObject>(object:Readonly<SourceObject>,keys:Readonly<Key[]>):PickedType<SourceObject,Key>{
    const result:Partial<PickedType<SourceObject,Key>> = {};
    for(const key of keys){
        result[key] = object[key];
    }
    return result as PickedType<SourceObject,Key>;
}


/** Returns a version of the source object that only has picked keys, but doesn't necessarily have all of those keys. Keys that aren't in the source object won't be included in the returned object. */
export function PickIntersection<SourceObject,Key extends keyof any>(object:Readonly<SourceObject>,keys:Readonly<Key[]>):PickedType<any,Key&(keyof SourceObject)>{
    const result:Partial<PickedType<any,Key>> = {};
    for(const key of keys){
        if(key in object){
            result[key] = object[key as any];
        }
    }
    return result as PickedType<SourceObject,Key&(keyof SourceObject)>;
}




/** Returns a version of the source object, but without the omitted keys. The source object must have every key specified in the keys array. 
 * This is useful because simply doing {...foo,a:undefined} will fail type check against Omit<Foo,"a">.
 * For example:
 * type Foo = {a:number,b:number};
 * const foo = {a:1,b:2}
 * // ERROR: `Object literal may only specify known properties, and 'a' does not exist in type 'Omit<Foo, "a">'.`
 * const bar:Omit<Foo,"a"> = {...foo,a:undefined};
 * // instead do this
 * const bar:Omit<Foo,"a"> = Omit(foo,["a"]);
*/
export function Omit<SourceObject,Key extends keyof SourceObject>(object:Readonly<SourceObject>,omitKeys:Readonly<Key[]>):Omit<SourceObject,Key>{
    const result = {...object};
    for(const omitKey of omitKeys){
        delete result[omitKey];
    }
    return result;
}

/** Keys don't need to be in the same order. Note that {} has keys [] and {b:undefined} has keys ["b"]. */
export function DoObjectsHaveSameKeys(a:object,b:object){
    return UnsortedArrayEquals(Object.keys(a),Object.keys(b));
}

/**
 * Returns true if a[x]===b[x] for every key x in the keys of a and b. Order of object keys doesn't matter. Compares by the value of a[x], meaning that DoObjectsHaveSameSubValues(c:undefined},{})===true   Default compare is by ===
 * 
*/
export function DoObjectsHaveSameSubValues(a:object,b:object,compare?:Relation){
    // for ===, it's faster to simply go through both sides
    if( !compare || compare===EqualsByThreeEquals ){
        for(const [aKey,aValue] of Object.entries(a)){
            if(aValue!==b[aKey]){
                return false;
            }
        }
        for(const [bKey,bValue] of Object.entries(b)){
            if(a[bKey]!==bValue){
                return false;
            }
        }
        return true;
    }
    // optimization for other compares, as compare may be expensive
    const commonKeys = Object.keys(a);
    PushManyIfNotIncludes(commonKeys,Object.keys(b));
    for(const key of commonKeys){
        if(!compare(a[key],b[key])){
            return false;
        }
    }
    return true;
}


export function ObjectsToMatrix(objects:any[]){
    const keys = MakeUniqueArray(
        objects.flatMap(a=>Object.keys(a))
    );
    const matrix = [keys];
    for(const object of objects){
        matrix.push(
            keys.map(key=>object[key]??"")
        );
    }
    return matrix;
}