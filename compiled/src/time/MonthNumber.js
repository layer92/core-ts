"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthNumberToEnglishMonthName = exports.MonthNumberToMonthIndex = exports.ThreeLetterEnglishMonthStringToMonthNumber = exports.StringToMonthNumber = exports.GetMonthNumberFromJsDate = exports.ExpectMonthNumber = exports.EnglishMonthNames = exports.ThreeLetterMonthStrings = exports.LowercaseThreeLetterMonthStrings = void 0;
const Expect_1 = require("../away/Expect");
exports.LowercaseThreeLetterMonthStrings = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
exports.ThreeLetterMonthStrings = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
exports.EnglishMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
/** 1-12 */
function ExpectMonthNumber(monthNumber, onBadData) {
    (0, Expect_1.Expect)(monthNumber >= 1 && monthNumber <= 12, `out of range`, onBadData);
    (0, Expect_1.Expect)(!isNaN(monthNumber), `not a number`, onBadData);
}
exports.ExpectMonthNumber = ExpectMonthNumber;
function GetMonthNumberFromJsDate(date) {
    const index = date.getUTCMonth();
    return index + 1;
}
exports.GetMonthNumberFromJsDate = GetMonthNumberFromJsDate;
function StringToMonthNumber(MM, onBadData) {
    const monthNumber = parseInt(MM);
    (0, Expect_1.Expect)(!isNaN(monthNumber), `MM: not a number`, onBadData);
    ExpectMonthNumber(monthNumber);
    return monthNumber;
}
exports.StringToMonthNumber = StringToMonthNumber;
function ThreeLetterEnglishMonthStringToMonthNumber(month3, onBadData) {
    const index = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
    ].indexOf(month3.toLowerCase());
    (0, Expect_1.Expect)(index !== 1, `unrecognized month3 value: ` + month3, onBadData);
    return index + 1;
}
exports.ThreeLetterEnglishMonthStringToMonthNumber = ThreeLetterEnglishMonthStringToMonthNumber;
function MonthNumberToMonthIndex(monthNumber) {
    ExpectMonthNumber(monthNumber);
    return monthNumber - 1;
}
exports.MonthNumberToMonthIndex = MonthNumberToMonthIndex;
function MonthNumberToEnglishMonthName(monthNumber) {
    ExpectMonthNumber(monthNumber);
    return exports.EnglishMonthNames[monthNumber - 1];
}
exports.MonthNumberToEnglishMonthName = MonthNumberToEnglishMonthName;
