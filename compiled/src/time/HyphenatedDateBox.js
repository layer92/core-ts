"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyphenatedDateBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
const YearBox_1 = require("./YearBox");
const MonthNumberBox_1 = require("./MonthNumberBox");
const DayOfMonthNumberBox_1 = require("./DayOfMonthNumberBox");
const SecondsBox_1 = require("./SecondsBox");
const UnixTimeBox_1 = require("./UnixTimeBox");
const CommonCharsets_1 = require("../strings/CommonCharsets");
const Strings_1 = require("../strings/Strings");
/**
 * basically a subset of https://en.wikipedia.org/wiki/ISO_8601, with only support for year, month, and date, and hyphen required.
 * Strings in forms such as:
 * - "2023"
 * - "2023-01"
 * - "2023-01-01"
*/
class HyphenatedDateBox extends Box_1.Box {
    constructor(data, onValidationFail) {
        (0, Expect_1.Expect)(data, ``, onValidationFail);
        (0, Expect_1.Expect)(data.includes("-"), `data: expected a hyphen-delimited string: ${data}`, onValidationFail);
        const [yyyy, mm, dd] = data.split("-");
        (0, Expect_1.Expect)(yyyy.length === 4, `data: did not begin with 4-digit year component: ${data}`, onValidationFail);
        (0, Expect_1.Expect)(mm === undefined || mm.length === 2, `data: month component was not 2 digits long: ${data}`, onValidationFail);
        (0, Expect_1.Expect)(dd === undefined || dd.length === 2, `data: day component was not 2 digits long: ${data}`, onValidationFail);
        (0, Expect_1.Expect)(Strings_1.Strings.IsInCharset(yyyy, CommonCharsets_1.NumericCharacters), `data: year (${yyyy}) is not a numeric value: ${data}`, onValidationFail);
        (0, Expect_1.Expect)(Strings_1.Strings.IsInCharset(mm, CommonCharsets_1.NumericCharacters), `data: month (${mm}) is not a numeric value: ${data}`, onValidationFail);
        (0, Expect_1.Expect)(Strings_1.Strings.IsInCharset(dd, CommonCharsets_1.NumericCharacters), `data: day (${dd}) is not a numeric value: ${data}`, onValidationFail);
        super(data);
        (0, Expect_1.Expect)(!isNaN(this.toDate().getTime()), `data: Invalid date.`, onValidationFail);
    }
    toDate() {
        return new Date(this._data);
    }
    /** Returns unix time: the number of seconds since Jan 1 1970     */
    toUnixTime() {
        return new Date(this._data).getTime() / 1000;
    }
    toUnixTimeBox() {
        return new UnixTimeBox_1.UnixTimeBox(this.toUnixTime());
    }
    plusDays(days) {
        const date = this.toDate();
        // a negative or overflow dateOfMonth value here will cause the month to decrement/increment accordingly
        date.setDate(date.getUTCDate() + days);
        return HyphenatedDateBox.FromDate(date);
    }
    plusWeekdays(weekdays) {
        // TODO: this a naive implementation - perform more efficiently by creating HyphenatedDateBox.FromUnixWeekDays()
        let result = new HyphenatedDateBox(this.getData());
        if (weekdays === 0) {
            return this;
        }
        let sanityCheckCounter = weekdays * 2;
        while (weekdays > 0 && --sanityCheckCounter > 0) {
            result = result.plusDays(1);
            if (result.getDifferenceWeekdays(this) === weekdays) {
                return result;
            }
        }
        while (weekdays < 0 && --sanityCheckCounter > 0) {
            result = result.plusDays(-1);
            if (result.getDifferenceWeekdays(this) === weekdays) {
                return result;
            }
        }
        throw new Error();
    }
    plusMonths(months) {
        const date = this.toDate();
        date.setMonth(date.getUTCMonth() + months);
        return HyphenatedDateBox.FromDate(date);
    }
    /** @returns returns the (integer) difference in days between this date and the provided start date */
    getDifferenceDays(startDate) {
        const differenceSeconds = this.toUnixTime() - startDate.toUnixTime();
        return new SecondsBox_1.SecondsBox(differenceSeconds).toDays();
    }
    /** @returns returns the (integer) difference in weekdays between this date and the provided date. Calculates from 00:00 of each date, so the time inside of this date (the end date) is excluded.  */
    getDifferenceWeekdays(startDate) {
        return this.toUnixWeekDays() - startDate.toUnixWeekDays();
    }
    /** WARNING: UNTESTED Returns the number of complete months that have elapsed from the startDate. A month is defined as when the same numeric date of the next month is reached, for example, February 15 is exactly 1 month after January 15. In a situation where the next date doesn't fall on the month, the first of the next month is treated as the day when the month elapses. For example, March 1 is exactly 1 month after January 30, and March 1 is exactly 1 month after January 31. */
    getDifferenceMonths(startDate) {
        if (startDate.toUnixTime() > this.toUnixTime()) {
            return -startDate.getDifferenceMonths(this);
        }
        const startYear = startDate.getYear();
        const endYear = this.getYear();
        const startMonth = startDate.maybeGetMonthNumber() || 1;
        const endMonth = this.maybeGetMonthNumber() || 1;
        const startDayNumber = startDate.maybeGetDayOfMonthNumber() || 1;
        const endDayNumber = startDate.maybeGetDayOfMonthNumber() || 1;
        let months = (endYear - startYear) * 12 + (endMonth - startMonth);
        // eg if you started on January 15 and ended on February 14, that's not an entire month, so subtract 1 from the result to make up for calculating February(2)-January(1)
        if (endDayNumber < startDayNumber) {
            months -= 1;
        }
        return months;
    }
    /** WARNING: UNTESTED Returns the number of complete years that have elapsed since the start date. A year is treated as when the same day of the same month has been reached, for example March 15 1991 is exactly 1 year after March 15 1990. In a situation where the next year doesn't have that date, full year has elapsed when the next date has been reached. For example, March 1, 1993 is exactly 1 year after February 29, 1992. March 1, 1993 is also exactly 1 year after March 1, 1992. */
    getDifferenceYears(startDate) {
        if (startDate.toUnixTime() > this.toUnixTime()) {
            return -startDate.getDifferenceYears(this);
        }
        const startYear = startDate.getYear();
        const endYear = this.getYear();
        const startMonth = startDate.maybeGetMonthNumber() || 1;
        const endMonth = this.maybeGetMonthNumber() || 1;
        const startDayNumber = startDate.maybeGetDayOfMonthNumber() || 1;
        const endDayNumber = startDate.maybeGetDayOfMonthNumber() || 1;
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
    /**
     * Functions exactly the same as the GETNETWORKDAYS() function in Excel/LibreOffice Calc/etc
     * @returns the number of workdays in the period, starting from this date (inclusive) and including the specified end date.
     *
     * */
    getNetWorkDays(afterEndDate) {
        const afterEndDateSeconds = afterEndDate.toUnixTime() + SecondsBox_1.SecondsBox.FromDays(1).getData();
        afterEndDate = HyphenatedDateBox.FromUnixTime(afterEndDateSeconds);
        // TODO: implement a holidays list, removing 1 for each holiday that's inside the range (dont repeat over years, as some holidays were invented in the 2010s, etc...)
        return afterEndDate.toUnixWeekDays() - this.toUnixWeekDays();
    }
    /** Returns the number of weekdays that have passed since the Unix epoch (a Thursday) */
    toUnixWeekDays() {
        const days = this.toUnixTimeBox().toSecondsBox().toDays();
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
    getYear() {
        const raw = this.getUndelimitedString();
        const yyyy = raw.slice(0, 4);
        const yearNumber = parseInt(yyyy);
        return yearNumber;
    }
    getYearBox() {
        return new YearBox_1.YearBox(this.getYear(), () => { });
    }
    maybeGetMonthNumber() {
        const raw = this.getUndelimitedString();
        if (raw.length <= 4) {
            return undefined;
        }
        const mm = raw.slice(4, 6);
        const monthNumber = parseInt(mm);
        return monthNumber;
    }
    maybeGetMonthNumberBox() {
        const monthNumber = this.maybeGetMonthNumber();
        if (monthNumber === undefined) {
            return undefined;
        }
        return new MonthNumberBox_1.MonthNumberBox(monthNumber, () => { });
    }
    maybeGetDayOfMonthNumber() {
        const raw = this.getUndelimitedString();
        if (raw.length <= 6) {
            return undefined;
        }
        const dd = raw.slice(6, 8);
        const dayNumber = parseInt(dd);
        return dayNumber;
    }
    setDayOfMonthNumber(dayOfMonthNumber) {
        const date = this.toDate();
        date.setDate(dayOfMonthNumber);
        return HyphenatedDateBox.FromDate(date);
    }
    maybeGetDayOfMonthNumberBox() {
        const dayOfMonthNumber = this.maybeGetDayOfMonthNumber();
        if (dayOfMonthNumber === undefined) {
            return undefined;
        }
        return new DayOfMonthNumberBox_1.DayOfMonthNumberBox(dayOfMonthNumber, () => { });
    }
    static FromUnixTime(seconds) {
        const date = new Date(1000 * seconds);
        return HyphenatedDateBox.FromDate(date);
    }
    static FromDate(date) {
        const year = date.getUTCFullYear();
        const yyyy = ("0000" + year).slice(-4);
        const monthNumber = date.getUTCMonth() + 1;
        const mm = ("00" + monthNumber).slice(-2);
        const dayOfMonthNumber = date.getUTCDate();
        const dd = ("00" + dayOfMonthNumber).slice(-2);
        return new HyphenatedDateBox(`${yyyy}-${mm}-${dd}`, () => { });
    }
    getUndelimitedString() {
        return Strings_1.Strings.RemoveCharacters(this._data, "-");
    }
    static LaterOf(a, b) {
        if (a.toUnixTime() >= b.toUnixTime()) {
            return a;
        }
        return b;
    }
    static EarlierOf(a, b) {
        if (a.toUnixTime() <= b.toUnixTime()) {
            return a;
        }
        return b;
    }
    toAmericanSlashString() {
        const year = this.getYear();
        const month = this.maybeGetMonthNumber();
        const day = this.maybeGetDayOfMonthNumber();
        return `${month}/${day}/${year}`;
    }
    /** The clearest way to write a day (in English) such that it isn't misinterpreted, regardless of which culture the reader comes from. */
    toExplicitString() {
        const monthBox = this.maybeGetMonthNumberBox();
        let result = monthBox ? monthBox.toEnglishMonthName() : ``;
        const dayOfMonthNumberBox = this.maybeGetDayOfMonthNumberBox();
        if (dayOfMonthNumberBox) {
            (0, Expect_1.Expect)(monthBox, `Cannot make a clear string from this date: ${this._data}`);
            result += ` ` + dayOfMonthNumberBox.toEnglishString();
        }
        result += `, ${this.getYear()}`;
        return result;
    }
    /**
     * 0: Sunday
     * 1: Monday
     * 2: Tuesday
     * 3: Wednesday
     * 4: Thursday
     * 5: Friday
     * 6: Saturday
     **/
    getDayOfWeekNumber() {
        return this.toDate().getUTCDay();
    }
    getDayOfWeekEnglishName() {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDayOfWeekNumber()];
    }
    /** A 3-character abbreviation of the weekday. */
    getDayOfWeekEnglishAbbreviation() {
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][this.getDayOfWeekNumber()];
    }
    getDayOfWeekJapaneseAbbreviation() {
        return ["日", "月", "火", "水", "木", "金", "土"][this.getDayOfWeekNumber()];
    }
}
exports.HyphenatedDateBox = HyphenatedDateBox;
