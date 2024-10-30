"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnixTimeToRelativeEnglishPhrase = void 0;
const GetCurrentUnixTime_1 = require("./GetCurrentUnixTime");
const HyphenDate_1 = require("./HyphenDate");
///// Moved to separate file from UnixTime.ts to avoid circular dependency issue in a downstream create-react-app project
/** Returns how the targetTime relates to the reference time (current time). For example "5 days ago" or "60 seconds from now" If not referenceTime is not defined, defaults to the current unix time. */
function UnixTimeToRelativeEnglishPhrase(targetTime, referenceTime) {
    referenceTime = referenceTime ?? (0, GetCurrentUnixTime_1.GetCurrentUnixTime)();
    if (targetTime === referenceTime) {
        return "now";
    }
    if (targetTime < referenceTime) {
        return _UnixTimeToEnglishAgoString(targetTime, referenceTime);
    }
    return _UnixTimeToEnglishFromNowString(targetTime, referenceTime);
}
exports.UnixTimeToRelativeEnglishPhrase = UnixTimeToRelativeEnglishPhrase;
function _UnixTimeToEnglishFromNowString(targetTime, referenceTime) {
    const secondsFromNow = targetTime - referenceTime;
    if (secondsFromNow < 60) {
        return `${secondsFromNow} seconds from now`;
    }
    const minutesFromNow = Math.round(secondsFromNow / 60);
    if (minutesFromNow < 60) {
        return `${minutesFromNow} minutes from now`;
    }
    const hoursFromNow = Math.round(minutesFromNow / 60);
    if (hoursFromNow < 24) {
        return `${hoursFromNow} hours from now`;
    }
    const startDate = (0, HyphenDate_1.UnixTimeToHyphenDate)(referenceTime);
    const endDate = (0, HyphenDate_1.UnixTimeToHyphenDate)(targetTime);
    const yearsFromNow = (0, HyphenDate_1.GetDifferenceYearsBetweenHyphenDates)(endDate, startDate);
    const monthsFromNow = (0, HyphenDate_1.GetDifferenceMonthsFromHyphenDate)(endDate, startDate);
    if (monthsFromNow < 1) {
        const daysFromNow = Math.round(hoursFromNow / 24);
        return `${daysFromNow} days from now`;
    }
    if (yearsFromNow < 1) {
        return `${monthsFromNow} months from now`;
    }
    return `${yearsFromNow} years from now`;
}
function _UnixTimeToEnglishAgoString(targetTime, referenceTime) {
    const secondsAgo = referenceTime - targetTime;
    if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
    }
    const minutesAgo = Math.round(secondsAgo / 60);
    if (minutesAgo < 60) {
        return `${minutesAgo} minutes ago`;
    }
    const hoursAgo = Math.round(minutesAgo / 60);
    if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`;
    }
    const startDate = (0, HyphenDate_1.UnixTimeToHyphenDate)(targetTime);
    const endDate = (0, HyphenDate_1.UnixTimeToHyphenDate)(referenceTime);
    const yearsAgo = (0, HyphenDate_1.GetDifferenceYearsBetweenHyphenDates)(endDate, startDate);
    const monthsAgo = (0, HyphenDate_1.GetDifferenceMonthsFromHyphenDate)(endDate, startDate);
    if (monthsAgo < 1) {
        const daysAgo = Math.round(hoursAgo / 24);
        return `${daysAgo} days ago`;
    }
    if (yearsAgo < 1) {
        return `${monthsAgo} months ago`;
    }
    return `${yearsAgo} years ago`;
}
