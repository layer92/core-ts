"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyphenDateToExplicitString = exports.ExpectAmericanSlashDate = exports.GetYearFromAmericanSlashDate = exports.AmericanSlashDateToHyphenDate = void 0;
const Expect_1 = require("../away/Expect");
const NumberToEnglishOrdinalIndicator_1 = require("../english/NumberToEnglishOrdinalIndicator");
const Strings_1 = require("../strings/Strings");
const HyphenDate_1 = require("./HyphenDate");
const MonthNumber_1 = require("./MonthNumber");
function AmericanSlashDateToHyphenDate(slashString) {
    ExpectAmericanSlashDate(slashString);
    let [month, day, _year] = slashString.split("/");
    let year = (0, Strings_1.PadNumberLeft)(GetYearFromAmericanSlashDate(slashString), 4);
    month = (0, Strings_1.PadNumberLeft)(month, 2);
    day = (0, Strings_1.PadNumberLeft)(day, 2);
    return `${year}-${month}-${day}`;
}
exports.AmericanSlashDateToHyphenDate = AmericanSlashDateToHyphenDate;
/** Does the best to get the year from the string. Note that some dates may be ambiguous, for example the '21 could be 2021 or 1921. If number is less than 70, it is assumed to be that many years after 2000. If number is 70~99, is assumed to be that many years after 1900. */
function GetYearFromAmericanSlashDate(slashString) {
    ExpectAmericanSlashDate(slashString);
    let [_month, _day, year] = slashString.split("/");
    const yearNumber = (0, Strings_1.StringToInteger)(year);
    if (yearNumber < 70) {
        return 2000 + yearNumber;
    }
    if (yearNumber >= 70 && yearNumber <= 99) {
        return 1900 + yearNumber;
    }
    return yearNumber;
}
exports.GetYearFromAmericanSlashDate = GetYearFromAmericanSlashDate;
/** A string in the form "MM/DD/YY" or "MM/DD/YYYY", as (unfortunately) used in American dates around the time of writing (2024). If number is less than 70, it is assumed to be that many years after 2000. If number is 70~99, is assumed to be that many years after 1900. */
function ExpectAmericanSlashDate(slashString, onBadData) {
    (0, Expect_1.Expect)(slashString.split("/").length === 3, `Expected exactly 2 occurences of "/".`, onBadData);
    const [month, day, year] = slashString.split("/");
    (0, Expect_1.Expect)(month.length > 0, `Month was empty.`, onBadData);
    (0, Expect_1.Expect)(month.length <= 2, `Expected month to have 2 or less characters.`, onBadData);
    (0, Expect_1.Expect)(day.length > 0, `Day was empty.`, onBadData);
    (0, Expect_1.Expect)(day.length <= 2, `Expected day to have 2 or less characters.`, onBadData);
    (0, Expect_1.Expect)(year.length >= 0, `Year was empty.`, onBadData);
}
exports.ExpectAmericanSlashDate = ExpectAmericanSlashDate;
/** The clearest way to write a day (in English) such that it isn't misinterpreted, regardless of which culture the reader comes from. */
function HyphenDateToExplicitString(hyphenDate) {
    const monthNumber = (0, HyphenDate_1.MaybeGetMonthNumberFromHyphenDate)(hyphenDate);
    let result = monthNumber ? (0, MonthNumber_1.MonthNumberToEnglishMonthName)(monthNumber) : ``;
    const dayOfMonthNumberBox = (0, HyphenDate_1.MaybeGetDayOfMonthNumberFromHyphenDate)(hyphenDate);
    if (dayOfMonthNumberBox) {
        (0, Expect_1.Expect)(monthNumber, `Cannot make a clear string from this date: ${hyphenDate}`);
        result += ` ` + dayOfMonthNumberBox + (0, NumberToEnglishOrdinalIndicator_1.NumberToOrdinalIndicator)(dayOfMonthNumberBox);
    }
    result += `, ${(0, HyphenDate_1.GetYearFromHyphenDate)(hyphenDate)}`;
    return result;
}
exports.HyphenDateToExplicitString = HyphenDateToExplicitString;
