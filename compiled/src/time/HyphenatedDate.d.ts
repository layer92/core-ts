import { OnException } from "../away/OnException";
/**
 * basically a subset of https://en.wikipedia.org/wiki/ISO_8601, with only support for year, month, and date, and hyphen required.
 * Strings in forms such as:
 * - "2023"
 * - "2023-01"
 * - "2023-01-01"
*/
export declare function ExpectHyphenDate(data: string, onBadData?: OnException, options?: {
    forbidEmptyMonthNumber?: true;
    forbidEmptyDayOfMonth?: true;
}): void;
export declare function HyphenDateToJsDate(hyphenDate: string): Date;
/**
 * Throws an error if there is no month/day in the hyphenated string, unless you specifically allow for it.
 */
export declare function HyphenDateToUnixTime(hyphenDate: string, options?: {
    onBadData: OnException;
}): number;
/** Adds days to the hyphen date. You can supply a negative number to subtract. */
export declare function AddDaysToHyphenDate(hyphenDate: string, days: number): string;
/** Adds weekdays to the hyphen date. You can supply a negative number to subtract. */
export declare function AddWeekdaysToHyphenDate(hyphenDate: string, weekdays: number): any;
export declare function JsDateToHyphenDate(jsDate: Date): string;
export declare function AddMonthsToHyphenDate(hyphenDate: string, months: number): string;
/** @returns returns the (float) difference in days between this date and the provided start date */
export declare function GetDifferenceDaysBetweenHyphenDates(endDate: string, startDate: string): number;
/** @returns returns the (float) difference in weekdays between this date and the provided date. Calculates from 00:00 of each date, so the time inside of this date (the end date) is excluded.  */
export declare function GetDifferenceWeekdaysBetweenHyphenDates(endDate: string, startDate: string): number;
/** WARNING: UNTESTED Returns the number of complete months that have elapsed from the startDate. A month is defined as when the same numeric date of the next month is reached, for example, February 15 is exactly 1 month after January 15. In a situation where the next date doesn't fall on the month, the first of the next month is treated as the day when the month elapses. For example, March 1 is exactly 1 month after January 30, and March 1 is exactly 1 month after January 31. */
export declare function GetDifferenceMonthsFromHyphenDate(endDate: string, startDate: string): any;
/** WARNING: UNTESTED Returns the number of complete years that have elapsed since the start date. A year is treated as when the same day of the same month has been reached, for example March 15 1991 is exactly 1 year after March 15 1990. In a situation where the next year doesn't have that date, full year has elapsed when the next date has been reached. For example, March 1, 1993 is exactly 1 year after February 29, 1992. March 1, 1993 is also exactly 1 year after March 1, 1992. */
export declare function GetDifferenceYearsBetweenHyphenDates(endDate: string, startDate: string): any;
/**
 * Functions exactly the same as the GETNETWORKDAYS() function in Excel/LibreOffice Calc/etc
 * @returns the number of workdays in the period, starting from this date (inclusive) and including the specified end date.
 *
 * */
export declare function GetNetWorkDaysBetweenHyphenDates(startDate: string, afterEndDate: string): number;
/** Returns the number of weekdays that have passed since the Unix epoch (a Thursday) */
export declare function HyphenDateToUnixWeekDays(hyphenDate: string): number;
export declare function GetYearFromHyphenDate(hyphenDate: string): number;
export declare function MaybeGetMonthNumberFromHyphenDate(hyphenDate: string): number;
export declare function MaybeGetDayOfMonthNumberFromHyphenDate(hyphenDate: string): number;
export declare function SetHyphenDateDayOfMonthNumber(hyphenDate: string, dayOfMonthNumber: number): string;
export declare function UnixTimeToHyphenDate(seconds: number): string;
export declare function GetLatestHyphenDate(a: string, b: string): string;
export declare function GetEarliestHyphenDate(a: string, b: string): string;
export declare function HyphenDateToAmericanSlashString(hyphenDate: string): string;
export declare function AmericanSlashStringToHyphenDate(slashString: string): string;
/** Does the best to get the year from the string. Note that some dates may be ambiguous, for example the '21 could be 2021 or 1921. If number is less than 70, it is assumed to be that many years after 2000. If number is 70~99, is assumed to be that many years after 1900. */
export declare function GetYearFromAmericanSlashString(slashString: string): number;
/** A string in the form "MM/DD/YY" or "MM/DD/YYYY", as (unfortunately) used in American dates around the time of writing (2024). If number is less than 70, it is assumed to be that many years after 2000. If number is 70~99, is assumed to be that many years after 1900. */
export declare function ExpectAmericanSlashString(slashString: string, onBadData?: OnException): void;
/** The clearest way to write a day (in English) such that it isn't misinterpreted, regardless of which culture the reader comes from. */
export declare function HyphenDateToExplicitString(hyphenDate: string): string;
/**
 * 0: Sunday
 * 1: Monday
 * 2: Tuesday
 * 3: Wednesday
 * 4: Thursday
 * 5: Friday
 * 6: Saturday
 **/
export declare function GetDayOfWeekNumberFromHyphenDate(hyphenDate: string): number;
export declare function GetDayOfWeekEnglishNameFromHyphenDate(hyphenDate: string): "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
/** A 3-character abbreviation of the weekday. */
export declare function GetDayOfWeekEnglishAbbreviationFromHyphenDate(hyphenDate: string): "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
export declare function GetDayOfWeekJapaneseAbbreviationFromHyphenDate(hyphenDate: string): "日" | "月" | "火" | "水" | "木" | "金" | "土";
