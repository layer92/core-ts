import { OnException } from "../away/OnException";
import { DayOfMonthNumberBox } from "./DayOfMonthNumberBox";
import { HyphenatedDateBox } from "./HyphenatedDateBox";
import { MonthNumberBox } from "./MonthNumberBox";
import { YearBox } from "./YearBox";
import { SecondsBox } from "./SecondsBox";
import { Box } from "../away/Box";
/** A number of seconds since Jan 1 1970     */
export declare class UnixTimeBox extends Box<number> {
    private __UnixTimeBox__;
    static MaybeMake(data: number | undefined): UnixTimeBox;
    static MakeNow(): UnixTimeBox;
    static MakeFromYearMonthDayBoxes(year: YearBox, monthNumber: MonthNumberBox, dayOfMonthNumber: DayOfMonthNumberBox): UnixTimeBox;
    static MakeFromYearMonthDay(year: number, monthNumber: number, dayOfMonthNumber: number): UnixTimeBox;
    toSecondsBox(): SecondsBox;
    toDate(): Date;
    /**
     * returns a nice string in YYYY-MM-DD format, useful for naming files and folders
     * this is also a valid ISO-8601 value
     * */
    toHyphenatedDateString(): string;
    toHyphenatedDateStringBox(): HyphenatedDateBox;
    /**
     * Returns a string such as "5 days ago", "1 week ago", "30 seconds ago", etc...
     * By default, fromTime will be the current unix time
     * */
    getEnglishAgoString(fromTime?: number): string;
    /** Returns undefined if the string is unparsable. */
    static MaybeFromHyphenatedDateString({ hyphenatedDateString, allowEmptyDayOfMonth, allowEmptyMonthNumber, }: {
        hyphenatedDateString: string;
        allowEmptyMonthNumber?: true;
        allowEmptyDayOfMonth?: true;
    }): UnixTimeBox;
    /**
     * Throws an error if there is no month/day in the hyphenated string, unless you specifically allow for it.
     */
    static FromHyphenatedDateString({ hyphenatedDateString, allowEmptyDayOfMonth, allowEmptyMonthNumber, onBadData, }: {
        hyphenatedDateString: string;
        allowEmptyMonthNumber?: true;
        allowEmptyDayOfMonth?: true;
        onBadData: OnException;
    }): UnixTimeBox;
    static FromYyyymmdd(yyyymmdd: string, onBadData: OnException): UnixTimeBox;
    static FromDateStrings(year4: string, monthNumber2: string, dayOfMonth2: string, onBadData: OnException): UnixTimeBox;
    static FromDate(javascriptDate: Date): UnixTimeBox;
    static FromIso8601DateString(iso8601DateString: string): UnixTimeBox;
}
