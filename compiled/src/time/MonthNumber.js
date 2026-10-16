"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthNumberToMonthName = exports.MonthNumberToEnglishMonthName = exports.MonthNumberToMonthIndex = exports.ThreeLetterMonthStringToMonthNumber = exports.ThreeLetterEnglishMonthStringToMonthNumber = exports.StringToMonthNumber = exports.GetMonthNumberFromJsDate = exports.ExpectMonthNumber = exports.EnglishMonthNames = exports.MonthNames = exports.ThreeLetterMonthStrings = exports.LowercaseThreeLetterMonthStrings = void 0;
const Expect_1 = require("../away/Expect");
exports.LowercaseThreeLetterMonthStrings = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
exports.ThreeLetterMonthStrings = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
exports.MonthNames = [
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
/** DEPRECATED - use MonthNames */
exports.EnglishMonthNames = exports.MonthNames;
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
/** DEPRECATED - use ThreeLetterMonthStringToMonthNumber */
function ThreeLetterEnglishMonthStringToMonthNumber(month3, onBadData) {
    return ThreeLetterMonthStringToMonthNumber(month3, onBadData);
}
exports.ThreeLetterEnglishMonthStringToMonthNumber = ThreeLetterEnglishMonthStringToMonthNumber;
function ThreeLetterMonthStringToMonthNumber(month3, onBadData) {
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
exports.ThreeLetterMonthStringToMonthNumber = ThreeLetterMonthStringToMonthNumber;
function MonthNumberToMonthIndex(monthNumber) {
    ExpectMonthNumber(monthNumber);
    return monthNumber - 1;
}
exports.MonthNumberToMonthIndex = MonthNumberToMonthIndex;
/** DEPRECATED - use MonthNumberToMonthName */
function MonthNumberToEnglishMonthName(monthNumber) {
    return MonthNumberToMonthName(monthNumber);
}
exports.MonthNumberToEnglishMonthName = MonthNumberToEnglishMonthName;
function MonthNumberToMonthName(monthNumber) {
    ExpectMonthNumber(monthNumber);
    return exports.MonthNames[monthNumber - 1];
}
exports.MonthNumberToMonthName = MonthNumberToMonthName;
