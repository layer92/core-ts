"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringToDayOfMonthNumber = exports.JsDateToDayOfMonthNumber = exports.ExpectDayOfMonthNumber = void 0;
const Expect_1 = require("../away/Expect");
function ExpectDayOfMonthNumber(data, onValidationFail) {
    (0, Expect_1.Expect)(!isNaN(data), `data: not a number.`, onValidationFail);
}
exports.ExpectDayOfMonthNumber = ExpectDayOfMonthNumber;
function JsDateToDayOfMonthNumber(date) {
    const dayOfMonthNumber = date.getUTCDate();
    ExpectDayOfMonthNumber(dayOfMonthNumber);
    return dayOfMonthNumber;
}
exports.JsDateToDayOfMonthNumber = JsDateToDayOfMonthNumber;
function StringToDayOfMonthNumber(DD, onInvalidData) {
    const dayOfMonthNumber = parseInt(DD);
    ExpectDayOfMonthNumber(dayOfMonthNumber, onInvalidData);
    return dayOfMonthNumber;
}
exports.StringToDayOfMonthNumber = StringToDayOfMonthNumber;
