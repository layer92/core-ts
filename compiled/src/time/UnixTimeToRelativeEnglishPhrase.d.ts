/** Returns how the targetTime relates to the reference time (current time). For example "5 days ago" or "60 seconds from now" If not referenceTime is not defined, defaults to the current unix time. */
export declare function UnixTimeToRelativeEnglishPhrase(targetTime: number, referenceTime?: number): string;
