"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YearToString = exports.StringToYear = exports.GetYearFromJsDate = void 0;
const Expect_1 = require("../away/Expect");
function GetYearFromJsDate(date) {
    return date.getUTCFullYear();
}
exports.GetYearFromJsDate = GetYearFromJsDate;
function StringToYear(yyyy, onBadData) {
    const data = parseInt(yyyy);
    (0, Expect_1.Expect)(!isNaN(data), `bad argument: yyyy: not a number, received: ` + yyyy, onBadData);
    return data;
}
exports.StringToYear = StringToYear;
/* use length=2 to get a value like 92 for 1992, of length=4 to get a value like 0123 for 123 */
function YearToString(year, length = 4) {
    const zeroes = new Array(length).fill("0").join("");
    return (zeroes + year).slice(-length);
}
exports.YearToString = YearToString;
