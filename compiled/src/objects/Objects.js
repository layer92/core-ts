"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pick = void 0;
function Pick(object, keys) {
    const result = {};
    for (const key of keys) {
        result[key] = object[key];
    }
    return result;
}
exports.Pick = Pick;
