import { Relation } from "../arrays/Relation";
type PickedType<Source, Key extends keyof Source> = {
    [key in Key]: Source[key];
};
/** Returns a version of the source object that only has the picked keys. The source object must have every key specified in the keys array. */
export declare function Pick<SourceObject, Key extends keyof SourceObject>(object: Readonly<SourceObject>, keys: Readonly<Key[]>): PickedType<SourceObject, Key>;
/** Returns a version of the source object that only has picked keys, but doesn't necessarily have all of those keys. Keys that aren't in the source object won't be included in the returned object. */
export declare function PickIntersection<SourceObject, Key extends keyof any>(object: Readonly<SourceObject>, keys: Readonly<Key[]>): PickedType<any, Key & (keyof SourceObject)>;
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
export declare function Omit<SourceObject, Key extends keyof SourceObject>(object: Readonly<SourceObject>, omitKeys: Readonly<Key[]>): Omit<SourceObject, Key>;
/** Keys don't need to be in the same order. Note that {} has keys [] and {b:undefined} has keys ["b"]. */
export declare function DoObjectsHaveSameKeys(a: object, b: object): boolean;
/**
 * Returns true if a[x]===b[x] for every key x in the keys of a and b. Order of object keys doesn't matter. Compares by the value of a[x], meaning that DoObjectsHaveSameSubValues(c:undefined},{})===true   Default compare is by ===
 *
*/
export declare function DoObjectsHaveSameSubValues(a: object, b: object, compare?: Relation): boolean;
export {};
