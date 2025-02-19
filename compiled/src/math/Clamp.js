"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clamp = void 0;
function Clamp(value, min, max) {
    if (value <= min) {
        return min;
    }
    if (value >= max) {
        return max;
    }
    return value;
}
exports.Clamp = Clamp;
