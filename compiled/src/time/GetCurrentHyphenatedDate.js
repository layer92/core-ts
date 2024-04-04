"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentHyphenatedDate = void 0;
const GetCurrentUnixTime_1 = require("./GetCurrentUnixTime");
const HyphenatedDateBox_1 = require("./HyphenatedDateBox");
/** Returns a box with the UTC hyphenated date/ */
function GetCurrentHyphenatedDate() {
    return HyphenatedDateBox_1.HyphenatedDateBox.FromUnixTime((0, GetCurrentUnixTime_1.GetCurrentUnixTime)()).getData();
}
exports.GetCurrentHyphenatedDate = GetCurrentHyphenatedDate;
