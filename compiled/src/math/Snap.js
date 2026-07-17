"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snap = void 0;
function Snap(value, grid) {
    return Math.round(value / grid) * grid;
}
exports.Snap = Snap;
