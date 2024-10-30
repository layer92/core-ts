"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDayOfWeekJapaneseAbbreviationFromHyphenDate = exports.GetDayOfWeekEnglishAbbreviationFromHyphenDate = exports.GetDayOfWeekEnglishNameFromHyphenDate = exports.GetDayOfWeekNumberFromHyphenDate = exports.HyphenDateToAmericanSlashDate = exports.GetEarliestHyphenDate = exports.GetLatestHyphenDate = exports.UnixTimeToHyphenDate = exports.SetHyphenDateDayOfMonthNumber = exports.MaybeGetDayOfMonthNumberFromHyphenDate = exports.MaybeGetMonthNumberFromHyphenDate = exports.GetYearFromHyphenDate = exports.HyphenDateToUnixWeekDays = exports.GetNetWorkDaysBetweenHyphenDates = exports.GetDifferenceYearsBetweenHyphenDates = exports.GetDifferenceMonthsFromHyphenDate = exports.GetDifferenceWeekdaysBetweenHyphenDates = exports.GetDifferenceDaysBetweenHyphenDates = exports.AddMonthsToHyphenDate = exports.JsDateToHyphenDate = exports.AddWeekdaysToHyphenDate = exports.AddDaysToHyphenDate = exports.HyphenDateToUnixTime = exports.HyphenDateToJsDate = exports.ExpectHyphenDate = void 0;
const Expect_1 = require("../away/Expect");
const CommonCharsets_1 = require("../strings/CommonCharsets");
const Strings_1 = require("../strings/Strings");
const Seconds_1 = require("./Seconds");
const UnixTime_1 = require("./UnixTime");
/**
 * basically a subset of https://en.wikipedia.org/wiki/ISO_8601, with only support for year, month, and date, and hyphen required.
 * Strings in forms such as:
 * - "2023"
 * - "2023-01"
 * - "2023-01-01"
*/
function ExpectHyphenDate(data, onBadData, options) {
    (0, Expect_1.Expect)(data, ``, onBadData);
    (0, Expect_1.Expect)(data.includes("-"), `Expected a hyphen-delimited string: ${data}`, onBadData);
    const [yyyy, mm, dd] = data.split("-");
    // The year must be four characters long, as per https://en.wikipedia.org/wiki/ISO_8601#Years in the basic representation
    (0, Expect_1.Expect)(yyyy.length === 4, `Did not begin with 4-digit year component: ${data}`, onBadData);
    // ISO 8601 specifies two characters for mm and dd, eg "02" for February, never "2", see: https://en.wikipedia.org/wiki/ISO_8601
    const emptyMonthCheckSuccess = mm !== undefined || !options?.forbidEmptyMonthNumber;
    (0, Expect_1.Expect)(emptyMonthCheckSuccess && mm?.length == 2, `Month component was not 2 digits long: ${data}`, onBadData);
    const emptyDayOfMonthCheckSuccess = dd !== undefined || !options?.forbidEmptyDayOfMonth;
    (0, Expect_1.Expect)(emptyDayOfMonthCheckSuccess && dd?.length === 2, `Day component was not 2 digits long: ${data}`, onBadData);
    (0, Expect_1.Expect)((0, Strings_1.IsInCharset)(yyyy, CommonCharsets_1.NumericCharacters), `Year (${yyyy}) is not a numeric value: ${data}`, onBadData);
    (0, Expect_1.Expect)((0, Strings_1.IsInCharset)(mm, CommonCharsets_1.NumericCharacters), `Month (${mm}) is not a numeric value: ${data}`, onBadData);
    (0, Expect_1.Expect)((0, Strings_1.IsInCharset)(dd, CommonCharsets_1.NumericCharacters), `Day (${dd}) is not a numeric value: ${data}`, onBadData);
    (0, Expect_1.Expect)(!isNaN(new Date(data).getTime()), `Invalid date.`, onBadData);
}
exports.ExpectHyphenDate = ExpectHyphenDate;
function HyphenDateToJsDate(hyphenDate) {
    ExpectHyphenDate(hyphenDate);
    return new Date(hyphenDate);
}
exports.HyphenDateToJsDate = HyphenDateToJsDate;
/**
 * Throws an error if there is no month/day in the hyphenated string, unless you specifically allow for it.
 */
function HyphenDateToUnixTime(hyphenDate, options) {
    ExpectHyphenDate(hyphenDate, options?.onBadData);
    const jsDate = HyphenDateToJsDate(hyphenDate);
    return (0, UnixTime_1.JsDateToUnixTime)(jsDate);
}
exports.HyphenDateToUnixTime = HyphenDateToUnixTime;
/** Adds days to the hyphen date. You can supply a negative number to subtract. */
function AddDaysToHyphenDate(hyphenDate, days) {
    const jsDate = HyphenDateToJsDate(hyphenDate);
    // a negative or overflow dateOfMonth value here will cause the month to decrement/increment accordingly
    jsDate.setDate(jsDate.getUTCDate() + days);
    return JsDateToHyphenDate(jsDate);
}
exports.AddDaysToHyphenDate = AddDaysToHyphenDate;
/** Adds weekdays to the hyphen date. You can supply a negative number to subtract. */
function AddWeekdaysToHyphenDate(hyphenDate, weekdays) {
    ExpectHyphenDate(hyphenDate);
    // TODO: this a naive implementation - perform more efficiently by creating HyphenDateBox.FromUnixWeekDays()
    let result = hyphenDate;
    if (weekdays === 0) {
        return this;
    }
    let sanityCheckCounter = weekdays * 2;
    while (weekdays > 0 && --sanityCheckCounter > 0) {
        result = AddDaysToHyphenDate(result, 1);
        if (GetDifferenceWeekdaysBetweenHyphenDates(result, hyphenDate) === weekdays) {
            return result;
        }
    }
    while (weekdays < 0 && --sanityCheckCounter > 0) {
        result = AddDaysToHyphenDate(result, -1);
        if (GetDifferenceWeekdaysBetweenHyphenDates(result, hyphenDate) === weekdays) {
            return result;
        }
    }
    throw new Error();
}
exports.AddWeekdaysToHyphenDate = AddWeekdaysToHyphenDate;
function JsDateToHyphenDate(jsDate) {
    const year = jsDate.getUTCFullYear();
    const yyyy = (0, Strings_1.PadNumberLeft)(year, 4);
    const monthNumber = jsDate.getUTCMonth() + 1;
    const mm = (0, Strings_1.PadNumberLeft)(monthNumber, 2);
    const dayOfMonthNumber = jsDate.getUTCDate();
    const dd = (0, Strings_1.PadNumberLeft)(dayOfMonthNumber, 2);
    return `${yyyy}-${mm}-${dd}`;
}
exports.JsDateToHyphenDate = JsDateToHyphenDate;
function AddMonthsToHyphenDate(hyphenDate, months) {
    ExpectHyphenDate(hyphenDate);
    const jsDate = HyphenDateToJsDate(hyphenDate);
    jsDate.setMonth(jsDate.getUTCMonth() + months);
    return JsDateToHyphenDate(jsDate);
}
exports.AddMonthsToHyphenDate = AddMonthsToHyphenDate;
/** @returns returns the (float) difference in days between this date and the provided start date */
function GetDifferenceDaysBetweenHyphenDates(endDate, startDate) {
    const differenceSeconds = HyphenDateToUnixTime(endDate) - HyphenDateToUnixTime(startDate);
    return (0, Seconds_1.SecondsToDays)(differenceSeconds);
}
exports.GetDifferenceDaysBetweenHyphenDates = GetDifferenceDaysBetweenHyphenDates;
/** @returns returns the (float) difference in weekdays between this date and the provided date. Calculates from 00:00 of each date, so the time inside of this date (the end date) is excluded.  */
function GetDifferenceWeekdaysBetweenHyphenDates(endDate, startDate) {
    return HyphenDateToUnixWeekDays(endDate) - HyphenDateToUnixWeekDays(startDate);
}
exports.GetDifferenceWeekdaysBetweenHyphenDates = GetDifferenceWeekdaysBetweenHyphenDates;
/** WARNING: UNTESTED Returns the number of complete months that have elapsed from the startDate. A month is defined as when the same numeric date of the next month is reached, for example, February 15 is exactly 1 month after January 15. In a situation where the next date doesn't fall on the month, the first of the next month is treated as the day when the month elapses. For example, March 1 is exactly 1 month after January 30, and March 1 is exactly 1 month after January 31. */
function GetDifferenceMonthsFromHyphenDate(endDate, startDate) {
    ExpectHyphenDate(endDate);
    ExpectHyphenDate(startDate);
    if (HyphenDateToUnixTime(startDate) > HyphenDateToUnixTime(endDate)) {
        return -GetDifferenceMonthsFromHyphenDate(startDate, endDate);
    }
    const startYear = GetYearFromHyphenDate(startDate);
    const endYear = GetYearFromHyphenDate(endDate);
    const startMonth = MaybeGetMonthNumberFromHyphenDate(startDate) || 1;
    const endMonth = MaybeGetMonthNumberFromHyphenDate(endDate) || 1;
    const startDayNumber = MaybeGetDayOfMonthNumberFromHyphenDate(startDate) || 1;
    const endDayNumber = MaybeGetDayOfMonthNumberFromHyphenDate(endDate) || 1;
    let months = (endYear - startYear) * 12 + (endMonth - startMonth);
    // eg if you started on January 15 and ended on February 14, that's not an entire month, so subtract 1 from the result to make up for calculating February(2)-January(1)
    if (endDayNumber < startDayNumber) {
        months -= 1;
    }
    return months;
}
exports.GetDifferenceMonthsFromHyphenDate = GetDifferenceMonthsFromHyphenDate;
/** WARNING: UNTESTED Returns the number of complete years that have elapsed since the start date. A year is treated as when the same day of the same month has been reached, for example March 15 1991 is exactly 1 year after March 15 1990. In a situation where the next year doesn't have that date, full year has elapsed when the next date has been reached. For example, March 1, 1993 is exactly 1 year after February 29, 1992. March 1, 1993 is also exactly 1 year after March 1, 1992. */
function GetDifferenceYearsBetweenHyphenDates(endDate, startDate) {
    ExpectHyphenDate(endDate);
    ExpectHyphenDate(startDate);
    if (HyphenDateToUnixTime(startDate) > HyphenDateToUnixTime(endDate)) {
        return -GetDifferenceYearsBetweenHyphenDates(startDate, endDate);
    }
    const startYear = GetYearFromHyphenDate(startDate);
    const endYear = GetYearFromHyphenDate(endDate);
    const startMonth = MaybeGetMonthNumberFromHyphenDate(startDate) || 1;
    const endMonth = MaybeGetMonthNumberFromHyphenDate(endDate) || 1;
    const startDayNumber = MaybeGetDayOfMonthNumberFromHyphenDate(startDate) || 1;
    const endDayNumber = MaybeGetDayOfMonthNumberFromHyphenDate(endDate) || 1;
    let years = endYear - startYear;
    const startDistanceIntoYear = startMonth * 1000
        + startDayNumber;
    const endDistanceIntoYear = endMonth * 1000 + endDayNumber;
    // eg if you started on February 1990 and ended on January 1991, or started on January 2 1990 and ended on January 1 1991, that's not an entire year, so subtract 1 from the result to make up for it.
    if (endDistanceIntoYear < startDistanceIntoYear) {
        years -= 1;
    }
    return years;
}
exports.GetDifferenceYearsBetweenHyphenDates = GetDifferenceYearsBetweenHyphenDates;
/**
 * Functions exactly the same as the GETNETWORKDAYS() function in Excel/LibreOffice Calc/etc
 * @returns the number of workdays in the period, starting from this date (inclusive) and including the specified end date.
 *
 * */
function GetNetWorkDaysBetweenHyphenDates(startDate, afterEndDate) {
    ExpectHyphenDate(startDate);
    ExpectHyphenDate(afterEndDate);
    const afterEndDateSeconds = HyphenDateToUnixTime(afterEndDate) + (0, Seconds_1.DaysToSeconds)(1);
    afterEndDate = UnixTimeToHyphenDate(afterEndDateSeconds);
    // TODO: implement a holidays list, removing 1 for each holiday that's inside the range (dont repeat over years, as some holidays were invented in the 2010s, etc...)
    return HyphenDateToUnixWeekDays(afterEndDate) - HyphenDateToUnixWeekDays(startDate);
}
exports.GetNetWorkDaysBetweenHyphenDates = GetNetWorkDaysBetweenHyphenDates;
/** Returns the number of weekdays that have passed since the Unix epoch (a Thursday) */
function HyphenDateToUnixWeekDays(hyphenDate) {
    const unixTime = HyphenDateToUnixTime(hyphenDate);
    const days = (0, Seconds_1.SecondsToDays)(unixTime);
    const weeksQuotient = Math.floor(days / 7);
    const daysRemainder = days % 7;
    // each entire passed week is worth 5 weekdays
    const daysFromQuotient = weeksQuotient * 5;
    // the first week of unix time:
    // name remainder -> weekdays passed (remainder part)
    // Thu 0 -> 0
    // Fri 1 -> 1
    // Sat 2 -> 2
    // Sun 3 -> 2
    // Mon 4 -> 2
    // Tue 5 -> 3
    // Wed 6 -> 4
    // Thu 0 -> 0
    const daysFromRemainder = [0, 1, 2, 2, 2, 3, 4][daysRemainder];
    return daysFromQuotient + daysFromRemainder;
}
exports.HyphenDateToUnixWeekDays = HyphenDateToUnixWeekDays;
function GetYearFromHyphenDate(hyphenDate) {
    const raw = HyphenDateToUndelimitedString(hyphenDate);
    const yyyy = raw.slice(0, 4);
    const yearNumber = parseInt(yyyy);
    return yearNumber;
}
exports.GetYearFromHyphenDate = GetYearFromHyphenDate;
function MaybeGetMonthNumberFromHyphenDate(hyphenDate) {
    const raw = HyphenDateToUndelimitedString(hyphenDate);
    if (raw.length <= 4) {
        return undefined;
    }
    const mm = raw.slice(4, 6);
    const monthNumber = parseInt(mm);
    return monthNumber;
}
exports.MaybeGetMonthNumberFromHyphenDate = MaybeGetMonthNumberFromHyphenDate;
function MaybeGetDayOfMonthNumberFromHyphenDate(hyphenDate) {
    const raw = HyphenDateToUndelimitedString(hyphenDate);
    if (raw.length <= 6) {
        return undefined;
    }
    const dd = raw.slice(6, 8);
    const dayNumber = parseInt(dd);
    return dayNumber;
}
exports.MaybeGetDayOfMonthNumberFromHyphenDate = MaybeGetDayOfMonthNumberFromHyphenDate;
function SetHyphenDateDayOfMonthNumber(hyphenDate, dayOfMonthNumber) {
    const date = HyphenDateToJsDate(hyphenDate);
    date.setDate(dayOfMonthNumber);
    return JsDateToHyphenDate(date);
}
exports.SetHyphenDateDayOfMonthNumber = SetHyphenDateDayOfMonthNumber;
function UnixTimeToHyphenDate(seconds) {
    const jsDate = new Date(1000 * seconds);
    return JsDateToHyphenDate(jsDate);
}
exports.UnixTimeToHyphenDate = UnixTimeToHyphenDate;
function HyphenDateToUndelimitedString(hyphenDate) {
    ExpectHyphenDate(hyphenDate);
    return (0, Strings_1.RemoveCharacters)(hyphenDate, "-");
}
function GetLatestHyphenDate(a, b) {
    if (HyphenDateToUnixTime(a) >= HyphenDateToUnixTime(b)) {
        return a;
    }
    return b;
}
exports.GetLatestHyphenDate = GetLatestHyphenDate;
function GetEarliestHyphenDate(a, b) {
    if (HyphenDateToUnixTime(a) <= HyphenDateToUnixTime(b)) {
        return a;
    }
    return b;
}
exports.GetEarliestHyphenDate = GetEarliestHyphenDate;
function HyphenDateToAmericanSlashDate(hyphenDate) {
    const year = GetYearFromHyphenDate(hyphenDate);
    const month = MaybeGetMonthNumberFromHyphenDate(hyphenDate);
    const day = MaybeGetDayOfMonthNumberFromHyphenDate(hyphenDate);
    return `${month}/${day}/${year}`;
}
exports.HyphenDateToAmericanSlashDate = HyphenDateToAmericanSlashDate;
/**
 * 0: Sunday
 * 1: Monday
 * 2: Tuesday
 * 3: Wednesday
 * 4: Thursday
 * 5: Friday
 * 6: Saturday
 **/
function GetDayOfWeekNumberFromHyphenDate(hyphenDate) {
    return HyphenDateToJsDate(hyphenDate).getUTCDay();
}
exports.GetDayOfWeekNumberFromHyphenDate = GetDayOfWeekNumberFromHyphenDate;
function GetDayOfWeekEnglishNameFromHyphenDate(hyphenDate) {
    const dayOfWeekNumber = GetDayOfWeekNumberFromHyphenDate(hyphenDate);
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeekNumber];
}
exports.GetDayOfWeekEnglishNameFromHyphenDate = GetDayOfWeekEnglishNameFromHyphenDate;
/** A 3-character abbreviation of the weekday. */
function GetDayOfWeekEnglishAbbreviationFromHyphenDate(hyphenDate) {
    const dayOfWeekNumber = GetDayOfWeekNumberFromHyphenDate(hyphenDate);
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeekNumber];
}
exports.GetDayOfWeekEnglishAbbreviationFromHyphenDate = GetDayOfWeekEnglishAbbreviationFromHyphenDate;
function GetDayOfWeekJapaneseAbbreviationFromHyphenDate(hyphenDate) {
    const dayOfWeekNumber = GetDayOfWeekNumberFromHyphenDate(hyphenDate);
    return ["日", "月", "火", "水", "木", "金", "土"][dayOfWeekNumber];
}
exports.GetDayOfWeekJapaneseAbbreviationFromHyphenDate = GetDayOfWeekJapaneseAbbreviationFromHyphenDate;
