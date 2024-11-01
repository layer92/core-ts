"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickIntersection = exports.Pick = void 0;
/** Returns a version of the source object that only has the picked keys. The source object must have every key specified in the keys array. */
function Pick(object, keys) {
    const result = {};
    for (const key of keys) {
        result[key] = object[key];
    }
    return result;
}
exports.Pick = Pick;
/** Returns a version of the source object that only has picked keys, but doesn't necessarily have all of those keys, or fewer. Keys that aren't in the source object won't be included in the returned object. */
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
