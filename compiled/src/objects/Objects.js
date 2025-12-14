"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectsToMatrix = exports.DoObjectsHaveSameSubValues = exports.DoObjectsHaveSameKeys = exports.Omit = exports.PickIntersection = exports.Pick = void 0;
const Arrays_1 = require("../arrays/Arrays");
const EqualsByThreeEquals_1 = require("../arrays/EqualsByThreeEquals");
/** Returns a version of the source object that only has the picked keys. The source object must have every key specified in the keys array. */
function Pick(object, keys) {
    const result = {};
    for (const key of keys) {
        result[key] = object[key];
    }
    return result;
}
exports.Pick = Pick;
/** Returns a version of the source object that only has picked keys, but doesn't necessarily have all of those keys. Keys that aren't in the source object won't be included in the returned object. */
function PickIntersection(object, keys) {
    const result = {};
    for (const key of keys) {
        if (key in object) {
            result[key] = object[key];
        }
    }
    return result;
}
exports.PickIntersection = PickIntersection;
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
function Omit(object, omitKeys) {
    const result = { ...object };
    for (const omitKey of omitKeys) {
        delete result[omitKey];
    }
    return result;
}
exports.Omit = Omit;
/** Keys don't need to be in the same order. Note that {} has keys [] and {b:undefined} has keys ["b"]. */
function DoObjectsHaveSameKeys(a, b) {
    console.debug(Object.keys(a), Object.keys(b));
    return (0, Arrays_1.UnsortedArrayEquals)(Object.keys(a), Object.keys(b));
}
exports.DoObjectsHaveSameKeys = DoObjectsHaveSameKeys;
/**
 * Returns true if a[x]===b[x] for every key x in the keys of a and b. Order of object keys doesn't matter. Compares by the value of a[x], meaning that DoObjectsHaveSameSubValues(c:undefined},{})===true   Default compare is by ===
 *
*/
function DoObjectsHaveSameSubValues(a, b, compare) {
    // for ===, it's faster to simply go through both sides
    if (!compare || compare === EqualsByThreeEquals_1.EqualsByThreeEquals) {
        for (const [aKey, aValue] of Object.entries(a)) {
            if (aValue !== b[aKey]) {
                return false;
            }
        }
        for (const [bKey, bValue] of Object.entries(b)) {
            if (a[bKey] !== bValue) {
                return false;
            }
        }
        return true;
    }
    // optimization for other compares, as compare may be expensive
    const commonKeys = Object.keys(a);
    (0, Arrays_1.PushManyIfNotIncludes)(commonKeys, Object.keys(b));
    for (const key of commonKeys) {
        if (!compare(a[key], b[key])) {
            return false;
        }
    }
    return true;
}
exports.DoObjectsHaveSameSubValues = DoObjectsHaveSameSubValues;
function ObjectsToMatrix(objects) {
    const keys = (0, Arrays_1.MakeUniqueArray)(objects.flatMap(a => Object.keys(a)));
    const matrix = [keys];
    for (const object of objects) {
        matrix.push(keys.map(key => object[key] ?? ""));
    }
    return matrix;
}
exports.ObjectsToMatrix = ObjectsToMatrix;
