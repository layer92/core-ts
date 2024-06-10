"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepAsync = void 0;
async function SleepAsync(ms) {
    return new Promise((accept) => setTimeout(accept, ms));
}
exports.SleepAsync = SleepAsync;
