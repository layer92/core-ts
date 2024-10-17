"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iso8601DateStringToUnixTime = exports.JsDateToUnixTime = exports.DateStringsToUnixTime = exports.YyyymmddToUnixTime = exports.MaybeMakeUnixTimeFromHyphenDate = exports.UnixTimeToJsDate = exports.UnixTimeFromYearMonthDay = void 0;
const Expect_1 = require("../away/Expect");
const DayOfMonthNumber_1 = require("./DayOfMonthNumber");
const HyphenatedDate_1 = require("./HyphenatedDate");
const MonthNumber_1 = require("./MonthNumber");
const Year_1 = require("./Year");
/** Unix time: A number of seconds since Jan 1 1970     */
function UnixTimeFromYearMonthDay(year, monthNumber, dayOfMonthNumber) {
    (0, MonthNumber_1.ExpectMonthNumber)(monthNumber);
    (0, DayOfMonthNumber_1.ExpectDayOfMonthNumber)(dayOfMonthNumber);
    const monthNumberString = ("0" + monthNumber).slice(-2);
    const dayOfMonthNumberString = ("0" + dayOfMonthNumber).slice(-2);
    const isoDate = `${year}-${monthNumberString}-${dayOfMonthNumberString}`;
    const seconds = Math.floor(new Date(isoDate).getTime() / 1000);
    (0, Expect_1.Expect)(!isNaN(seconds), `Invalid year/month/date.`);
    return seconds;
}
exports.UnixTimeFromYearMonthDay = UnixTimeFromYearMonthDay;
function UnixTimeToJsDate(unixTime) {
    return new Date(1000 * unixTime);
}
exports.UnixTimeToJsDate = UnixTimeToJsDate;
/** Returns undefined if the string is unparsable. */
function MaybeMakeUnixTimeFromHyphenDate(hyphenDate, options) {
    let catchingBadData = false;
    try {
        (0, HyphenatedDate_1.ExpectHyphenDate)(hyphenDate, () => catchingBadData = true, {
            forbidEmptyDayOfMonth: options?.forbidEmptyDayOfMonth,
            forbidEmptyMonthNumber: options?.forbidEmptyMonthNumber,
        });
        return (0, HyphenatedDate_1.HyphenDateToUnixTime)(hyphenDate, {
            onBadData: () => catchingBadData = true,
        });
    }
    catch (e) {
        if (catchingBadData) {
            return undefined;
        }
        throw e;
    }
}
exports.MaybeMakeUnixTimeFromHyphenDate = MaybeMakeUnixTimeFromHyphenDate;
function YyyymmddToUnixTime(yyyymmdd, onBadData) {
    (0, Expect_1.Expect)(yyyymmdd.length === 8, "argument must be 8 characters long, received: " + yyyymmdd, onBadData);
    const year4 = yyyymmdd.slice(0, 4);
    const monthNumber2 = yyyymmdd.slice(4, 6);
    const dayOfMonth2 = yyyymmdd.slice(6, 8);
    return DateStringsToUnixTime(year4, monthNumber2, dayOfMonth2, onBadData);
}
exports.YyyymmddToUnixTime = YyyymmddToUnixTime;
function DateStringsToUnixTime(year4, monthNumber2, dayOfMonth2, onBadData) {
    (0, Expect_1.Expect)(year4.length === 4, () => `year4 must be 4 characters long, received: ` + year4, onBadData);
    (0, Expect_1.Expect)(monthNumber2.length === 2, () => `monthNumber2 must be 2 characters long, received: ` + monthNumber2, onBadData);
    (0, Expect_1.Expect)(dayOfMonth2.length === 2, () => `dayOfMonth2 must be 2 characters long, received: ` + dayOfMonth2, onBadData);
    const year = (0, Year_1.StringToYear)(year4, onBadData);
    const monthNumber = (0, MonthNumber_1.StringToMonthNumber)(monthNumber2, onBadData);
    const dayOfMonthNumber = (0, DayOfMonthNumber_1.StringToDayOfMonthNumber)(dayOfMonth2, onBadData);
    return UnixTimeFromYearMonthDay(year, monthNumber, dayOfMonthNumber);
}
exports.DateStringsToUnixTime = DateStringsToUnixTime;
function JsDateToUnixTime(javascriptDate) {
    return Math.floor(javascriptDate.getTime() / 1000);
}
exports.JsDateToUnixTime = JsDateToUnixTime;
function Iso8601DateStringToUnixTime(iso8601DateString) {
    return JsDateToUnixTime(new Date(iso8601DateString));
}
exports.Iso8601DateStringToUnixTime = Iso8601DateStringToUnixTime;
