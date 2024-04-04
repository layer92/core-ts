import { Box } from "../away/Box";
export declare class SecondsBox extends Box<number> {
    private __SecondsBox__;
    static FromWeeks(weeks: number): SecondsBox;
    toWeeks(): number;
    toDays(): number;
    static FromDays(days: number): SecondsBox;
    toHours(): number;
    static FromHours(hours: number): SecondsBox;
    toMinutes(): number;
    static FromMinutes(minutes: number): SecondsBox;
    toMilliseconds(): number;
    /** will return something like 24 seconds, 3 minutes, 4 days, etc... depending on the length of time */
    toEnglishApproximateTimeString(): string;
    static FromMilliseconds(ms: number): SecondsBox;
}
