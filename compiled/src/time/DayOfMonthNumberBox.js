"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfMonthNumberBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
class DayOfMonthNumberBox extends Box_1.Box {
    constructor(data, onValidationFail) {
        super(data);
        (0, Expect_1.Expect)(!isNaN(data), `data: not a number.`, onValidationFail);
    }
    static MakeFromDate(date) {
        const dayOfMonth = date.getUTCDate();
        return new DayOfMonthNumberBox(dayOfMonth, () => { });
    }
    /* use length=2 to get a value like 09 for the 9th day of the month */
    toPaddedString(length = 2) {
        const zeroes = new Array(length).fill("0").join("");
        return (zeroes + this._data).slice(-length);
    }
    /** will return 1st, 2nd, 3rd, etc... */
    toEnglishString() {
        return this._data + this._getEnglishEnding();
    }
    _getEnglishEnding() {
        const lastDigit = this._data % 10;
        if (lastDigit === 1) {
            return `st`;
        }
        if (lastDigit === 2) {
            return `nd`;
        }
        if (lastDigit === 3) {
            return `rd`;
        }
        return `th`;
    }
    static FromString(DD, onInvalidData) {
        const data = parseInt(DD);
        (0, Expect_1.Expect)(!isNaN(data), `DD: not a number`, onInvalidData);
        return new DayOfMonthNumberBox(data, onInvalidData);
    }
}
exports.DayOfMonthNumberBox = DayOfMonthNumberBox;
