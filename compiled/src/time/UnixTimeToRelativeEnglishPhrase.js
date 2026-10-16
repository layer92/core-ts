"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnixTimeToRelativePhrase = exports.UnixTimeToRelativeEnglishPhrase = void 0;
const Strings_1 = require("../strings/Strings");
const GetCurrentUnixTime_1 = require("./GetCurrentUnixTime");
const HyphenDate_1 = require("./HyphenDate");
///// Moved to separate file from UnixTime.ts to avoid circular dependency issue in a downstream create-react-app project
/** DEPERECATED NAME ue UnixTimeToRelativePhrase isntead */
function UnixTimeToRelativeEnglishPhrase(targetTime, referenceTime) {
    return UnixTimeToRelativePhrase(targetTime, referenceTime);
}
exports.UnixTimeToRelativeEnglishPhrase = UnixTimeToRelativeEnglishPhrase;
/** Returns how the targetTime relates to the reference time (current time). For example "5 days ago" or "60 seconds from now" If not referenceTime is not defined, defaults to the current unix time. */
function UnixTimeToRelativePhrase(targetTime, referenceTime) {
    referenceTime = referenceTime ?? (0, GetCurrentUnixTime_1.GetCurrentUnixTime)();
    if (targetTime === referenceTime) {
        return "now";
    }
    if (targetTime < referenceTime) {
        return _UnixTimeToAgoString(targetTime, referenceTime);
    }
    return _UnixTimeToFromNowString(targetTime, referenceTime);
}
exports.UnixTimeToRelativePhrase = UnixTimeToRelativePhrase;
function _UnixTimeToFromNowString(targetTime, referenceTime) {
    const makePhrase = (number, singular) => {
        const noun = (0, Strings_1.Pluralize)(singular, singular + "s", number);
        return `${number} ${noun} from now`;
    };
    const secondsFromNow = targetTime - referenceTime;
    if (secondsFromNow < 60) {
        return makePhrase(secondsFromNow, "second");
    }
    const minutesFromNow = Math.round(secondsFromNow / 60);
    if (minutesFromNow < 60) {
        return makePhrase(minutesFromNow, "minute");
    }
    const hoursFromNow = Math.round(minutesFromNow / 60);
    if (hoursFromNow < 24) {
        return makePhrase(hoursFromNow, "hour");
    }
    const startDate = (0, HyphenDate_1.UnixTimeToHyphenDate)(referenceTime);
    const endDate = (0, HyphenDate_1.UnixTimeToHyphenDate)(targetTime);
    const yearsFromNow = (0, HyphenDate_1.GetDifferenceYearsBetweenHyphenDates)(endDate, startDate);
    const monthsFromNow = (0, HyphenDate_1.GetDifferenceMonthsFromHyphenDate)(endDate, startDate);
    if (monthsFromNow < 1) {
        const daysFromNow = Math.round(hoursFromNow / 24);
        return makePhrase(daysFromNow, "day");
    }
    if (yearsFromNow < 1) {
        return makePhrase(monthsFromNow, "month");
    }
    return makePhrase(yearsFromNow, "year");
}
function _UnixTimeToAgoString(targetTime, referenceTime) {
    const makePhrase = (number, singular) => {
        const noun = (0, Strings_1.Pluralize)(singular, singular + "s", number);
        return `${number} ${noun} ago`;
    };
    const secondsAgo = referenceTime - targetTime;
    if (secondsAgo < 60) {
        return makePhrase(secondsAgo, "second");
    }
    const minutesAgo = Math.round(secondsAgo / 60);
    if (minutesAgo < 60) {
        return makePhrase(minutesAgo, "minute");
    }
    const hoursAgo = Math.round(minutesAgo / 60);
    if (hoursAgo < 24) {
        return makePhrase(hoursAgo, "hour");
    }
    const startDate = (0, HyphenDate_1.UnixTimeToHyphenDate)(targetTime);
    const endDate = (0, HyphenDate_1.UnixTimeToHyphenDate)(referenceTime);
    const yearsAgo = (0, HyphenDate_1.GetDifferenceYearsBetweenHyphenDates)(endDate, startDate);
    const monthsAgo = (0, HyphenDate_1.GetDifferenceMonthsFromHyphenDate)(endDate, startDate);
    if (monthsAgo < 1) {
        const daysAgo = Math.round(hoursAgo / 24);
        return makePhrase(daysAgo, "day");
    }
    if (yearsAgo < 1) {
        return makePhrase(monthsAgo, "month");
    }
    return makePhrase(yearsAgo, "year");
}
