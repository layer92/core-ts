"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentHyphenatedDateBox = void 0;
const GetCurrentUnixTime_1 = require("./GetCurrentUnixTime");
const HyphenatedDateBox_1 = require("./HyphenatedDateBox");
/** Returns a box with the current UTC hyphenated date/ */
function GetCurrentHyphenatedDateBox() {
    return HyphenatedDateBox_1.HyphenatedDateBox.FromUnixTime((0, GetCurrentUnixTime_1.GetCurrentUnixTime)());
}
exports.GetCurrentHyphenatedDateBox = GetCurrentHyphenatedDateBox;
