"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentHyphenDate = void 0;
const GetCurrentUnixTime_1 = require("./GetCurrentUnixTime");
const HyphenDate_1 = require("./HyphenDate");
/** Returns a box with the UTC hyphenated date/ */
function GetCurrentHyphenDate() {
    return (0, HyphenDate_1.UnixTimeToHyphenDate)((0, GetCurrentUnixTime_1.GetCurrentUnixTime)());
}
exports.GetCurrentHyphenDate = GetCurrentHyphenDate;
