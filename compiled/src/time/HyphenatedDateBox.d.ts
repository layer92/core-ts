import { OnException } from "../away/OnException";
import { Box } from "../away/Box";
import { YearBox } from "./YearBox";
import { MonthNumberBox } from "./MonthNumberBox";
import { DayOfMonthNumberBox } from "./DayOfMonthNumberBox";
import { UnixTimeBox } from "./UnixTimeBox";
/**
 * basically a subset of https://en.wikipedia.org/wiki/ISO_8601, with only support for year, month, and date, and hyphen required.
 * Strings in forms such as:
 * - "2023"
 * - "2023-01"
 * - "2023-01-01"
*/
export declare class HyphenatedDateBox extends Box<string> {
    private HyphenatedDateBox;
    constructor(data: string, onValidationFail?: OnException);
    toDate(): Date;
    /** Returns unix time: the number of seconds since Jan 1 1970     */
    toUnixTime(): number;
    toUnixTimeBox(): UnixTimeBox;
    plusDays(days: number): HyphenatedDateBox;
    plusWeekdays(weekdays: number): HyphenatedDateBox;
    plusMonths(months: number): HyphenatedDateBox;
    /** @returns returns the (integer) difference in days between this date and the provided start date */
    getDifferenceDays(startDate: HyphenatedDateBox): number;
    /** @returns returns the (integer) difference in weekdays between this date and the provided date. Calculates from 00:00 of each date, so the time inside of this date (the end date) is excluded.  */
    getDifferenceWeekdays(startDate: HyphenatedDateBox): number;
    /** WARNING: UNTESTED Returns the number of complete months that have elapsed from the startDate. A month is defined as when the same numeric date of the next month is reached, for example, February 15 is exactly 1 month after January 15. In a situation where the next date doesn't fall on the month, the first of the next month is treated as the day when the month elapses. For example, March 1 is exactly 1 month after January 30, and March 1 is exactly 1 month after January 31. */
    getDifferenceMonths(startDate: HyphenatedDateBox): any;
    /** WARNING: UNTESTED Returns the number of complete years that have elapsed since the start date. A year is treated as when the same day of the same month has been reached, for example March 15 1991 is exactly 1 year after March 15 1990. In a situation where the next year doesn't have that date, full year has elapsed when the next date has been reached. For example, March 1, 1993 is exactly 1 year after February 29, 1992. March 1, 1993 is also exactly 1 year after March 1, 1992. */
    getDifferenceYears(startDate: HyphenatedDateBox): any;
    /**
     * Functions exactly the same as the GETNETWORKDAYS() function in Excel/LibreOffice Calc/etc
     * @returns the number of workdays in the period, starting from this date (inclusive) and including the specified end date.
     *
     * */
    getNetWorkDays(afterEndDate: HyphenatedDateBox): number;
    /** Returns the number of weekdays that have passed since the Unix epoch (a Thursday) */
    toUnixWeekDays(): number;
    getYear(): number;
    getYearBox(): YearBox;
    maybeGetMonthNumber(): number;
    maybeGetMonthNumberBox(): MonthNumberBox;
    maybeGetDayOfMonthNumber(): number;
    setDayOfMonthNumber(dayOfMonthNumber: number): HyphenatedDateBox;
    maybeGetDayOfMonthNumberBox(): DayOfMonthNumberBox;
    static FromUnixTime(seconds: number): HyphenatedDateBox;
    static FromDate(date: Date): HyphenatedDateBox;
    private getUndelimitedString;
    static LaterOf(a: HyphenatedDateBox, b: HyphenatedDateBox): HyphenatedDateBox;
    static EarlierOf(a: HyphenatedDateBox, b: HyphenatedDateBox): HyphenatedDateBox;
    toAmericanSlashString(): string;
    /** The clearest way to write a day (in English) such that it isn't misinterpreted, regardless of which culture the reader comes from. */
    toExplicitString(): string;
    /**
     * 0: Sunday
     * 1: Monday
     * 2: Tuesday
     * 3: Wednesday
     * 4: Thursday
     * 5: Friday
     * 6: Saturday
     **/
    getDayOfWeekNumber(): number;
    getDayOfWeekEnglishName(): "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
    /** A 3-character abbreviation of the weekday. */
    getDayOfWeekEnglishAbbreviation(): "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
    getDayOfWeekJapaneseAbbreviation(): "日" | "月" | "火" | "水" | "木" | "金" | "土";
}
