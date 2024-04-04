"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthNumberBox = exports.EnglishMonthNames = exports.ThreeLetterMonthStrings = exports.LowercaseThreeLetterMonthStrings = void 0;
const Box_1 = require("../away/Box");
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
class MonthNumberBox extends Box_1.Box {
    constructor(monthNumberData, onValidationFail) {
        (0, Expect_1.Expect)(monthNumberData >= 1 && monthNumberData <= 12, `data: out of range`, onValidationFail);
        (0, Expect_1.Expect)(!isNaN(monthNumberData), `data: not a number`, onValidationFail);
        super(monthNumberData);
    }
    static MakeFromDate(date) {
        const index = date.getUTCMonth();
        return new MonthNumberBox(index + 1, () => { });
    }
    static FromString(MM, onBadData) {
        const data = parseInt(MM);
        (0, Expect_1.Expect)(!isNaN(data), `MM: not a number`, onBadData);
        return new MonthNumberBox(data, onBadData);
    }
    static MakeFromThreeLetterEnglishMonthString(month3, onBadData) {
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
        return new MonthNumberBox(1 + index, onBadData);
    }
    /** 0-11 */
    getMonthIndex() {
        return this._data - 1;
    }
    /* use length=2 to get a value like 02 for February */
    toPaddedString(length = 2) {
        const zeroes = new Array(length).fill("0").join("");
        return (zeroes + this._data).slice(-length);
    }
    toEnglishMonthName() {
        return exports.EnglishMonthNames[this.getMonthIndex()];
    }
}
exports.MonthNumberBox = MonthNumberBox;
