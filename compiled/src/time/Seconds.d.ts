export declare function FromWeeks(weeks: number): number;
export declare function SecondsToWeeks(seconds: number): number;
export declare function SecondsToDays(seconds: number): number;
export declare function DaysToSeconds(days: number): number;
export declare function SecondsToHours(seconds: number): number;
export declare function HoursToSeconds(hours: number): number;
export declare function SecondsToMinutes(seconds: number): number;
export declare function MinutesToSeconds(minutes: number): number;
export declare function SecondsToMilliseconds(seconds: number): number;
/** will return something like 24 seconds, 3 minutes, 4 days, etc... depending on the length of time */
export declare function SecondsToEnglishApproximateTimeString(seconds: number): string;
/**
 *  Returns hh:mm:ss, omitting hours if empty, not omitting minutes if not empty
 *  This is the same format found in several places, such as on Wikipedia when listing album length and track length.
 */
export declare function SecondsToTypicalHoursMinutesSecondsString(seconds: number): string;
export declare function MillisecondsToSeconds(ms: number): number;
