"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUnixTime = void 0;
function GetCurrentUnixTime() {
    return Math.floor(Date.now() / 1000);
}
exports.GetCurrentUnixTime = GetCurrentUnixTime;
