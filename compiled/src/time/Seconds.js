"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MillisecondsToSeconds = exports.SecondsToTypicalHoursMinutesSecondsString = exports.SecondsToEnglishApproximateTimeString = exports.SecondsToMilliseconds = exports.MinutesToSeconds = exports.SecondsToMinutes = exports.HoursToSeconds = exports.SecondsToHours = exports.DaysToSeconds = exports.SecondsToDays = exports.SecondsToWeeks = exports.FromWeeks = void 0;
const Strings_1 = require("../strings/Strings");
function FromWeeks(weeks) {
    return DaysToSeconds(weeks * 7);
}
exports.FromWeeks = FromWeeks;
function SecondsToWeeks(seconds) {
    return SecondsToDays(seconds) / 7;
}
exports.SecondsToWeeks = SecondsToWeeks;
function SecondsToDays(seconds) {
    return SecondsToHours(seconds) / 24;
}
exports.SecondsToDays = SecondsToDays;
function DaysToSeconds(days) {
    return HoursToSeconds(days * 24);
}
exports.DaysToSeconds = DaysToSeconds;
function SecondsToHours(seconds) {
    return SecondsToMinutes(seconds) / 60;
}
exports.SecondsToHours = SecondsToHours;
function HoursToSeconds(hours) {
    return MinutesToSeconds(hours * 60);
}
exports.HoursToSeconds = HoursToSeconds;
function SecondsToMinutes(seconds) {
    return seconds / 60;
}
exports.SecondsToMinutes = SecondsToMinutes;
function MinutesToSeconds(minutes) {
    return minutes * 60;
}
exports.MinutesToSeconds = MinutesToSeconds;
function SecondsToMilliseconds(seconds) {
    return seconds * 1000;
}
exports.SecondsToMilliseconds = SecondsToMilliseconds;
/** will return something like 24 seconds, 3 minutes, 4 days, etc... depending on the length of time */
function SecondsToEnglishApproximateTimeString(seconds) {
    let unit;
    let value;
    if (seconds < 60) {
        unit = "second";
        value = seconds;
    }
    else if (SecondsToMinutes(seconds) < 60) {
        unit = "minute";
        value = Math.floor(SecondsToMinutes(seconds));
    }
    else if (SecondsToDays(seconds) < 1) {
        unit = "hour";
        value = Math.floor(SecondsToHours(seconds));
    }
    else {
        unit = "day";
        value = Math.floor(SecondsToDays(seconds));
    }
    const isPlural = value > 1 || value === 0;
    if (isPlural) {
        unit += `s`;
    }
    return `${value} ${unit}`;
}
exports.SecondsToEnglishApproximateTimeString = SecondsToEnglishApproximateTimeString;
/**
 *  Returns hh:mm:ss, omitting hours if empty, not omitting minutes if not empty
 *  This is the same format found in several places, such as on Wikipedia when listing album length and track length.
 */
function SecondsToTypicalHoursMinutesSecondsString(seconds) {
    const hours = Math.floor(SecondsToHours(seconds));
    const minutesRemainder = Math.floor(SecondsToMinutes(seconds)) - hours * 60;
    const secondsRemainder = Math.floor(seconds) - minutesRemainder * 60;
    let result = (0, Strings_1.PadNumberLeft)(secondsRemainder, 2);
    if (hours > 0) {
        result = hours + ":" + (0, Strings_1.PadNumberLeft)(minutesRemainder, 2) + ":" + result;
    }
    else if (minutesRemainder > 0) {
        result = minutesRemainder + ":" + result;
    }
    else {
        result = "0:" + result;
    }
    return result;
}
exports.SecondsToTypicalHoursMinutesSecondsString = SecondsToTypicalHoursMinutesSecondsString;
function MillisecondsToSeconds(ms) {
    return ms / 1000;
}
exports.MillisecondsToSeconds = MillisecondsToSeconds;
