"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Omit = exports.PickIntersection = exports.Pick = void 0;
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
 * const bar:Omit<Foo,"a"> = Omit(foo,"a");
*/
function Omit(object, omitKeys) {
    const result = { ...object };
    for (const omitKey of omitKeys) {
        delete result[omitKey];
    }
    return result;
}
exports.Omit = Omit;
