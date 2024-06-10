import { OnException } from "../away/OnException";
/** Unix time: A number of seconds since Jan 1 1970     */
export declare function UnixTimeFromYearMonthDay(year: number, monthNumber: number, dayOfMonthNumber: number): number;
export declare function UnixTimeToJsDate(unixTime: number): Date;
/**
 * Returns a string such as "5 days ago", "1 week ago", "30 seconds ago", etc...
 * By default, fromTime will be the current unix time
 * */
export declare function UnixTimeToEnglishAgoString(fromTime: number | undefined, toTime: number): string;
/** Returns undefined if the string is unparsable. */
export declare function MaybeMakeUnixTimeFromHyphenDate(hyphenDate: string, options?: {
    forbidEmptyMonthNumber?: true;
    forbidEmptyDayOfMonth?: true;
}): number;
export declare function YyyymmddToUnixTime(yyyymmdd: string, onBadData: OnException): number;
export declare function DateStringsToUnixTime(year4: string, monthNumber2: string, dayOfMonth2: string, onBadData: OnException): number;
export declare function JsDateToUnixTime(javascriptDate: Date): number;
export declare function Iso8601DateStringToUnixTime(iso8601DateString: string): number;
