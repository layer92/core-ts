"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YearBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
class YearBox extends Box_1.Box {
    constructor(data, onValidationFail) {
        super(data);
        (0, Expect_1.Expect)(!isNaN(data), `data: not a number`, onValidationFail);
    }
    static FromString(yyyy, onBadData) {
        const data = parseInt(yyyy);
        (0, Expect_1.Expect)(!isNaN(data), `bad argument: yyyy: not a number, received: ` + yyyy, onBadData);
        return new YearBox(data, onBadData);
    }
    static MakeFromDate(date) {
        const year = date.getUTCFullYear();
        return new YearBox(year, () => { });
    }
    /* use length=2 to get a value like 92 for 1992, of length=4 to get a value like 0123 for 123 */
    toPaddedString(length = 4) {
        const zeroes = new Array(length).fill("0").join("");
        return (zeroes + this._data).slice(-length);
    }
}
exports.YearBox = YearBox;
