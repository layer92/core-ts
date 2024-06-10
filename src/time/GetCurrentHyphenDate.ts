import { GetCurrentUnixTime } from "./GetCurrentUnixTime";
import { UnixTimeToHyphenDate } from "./UnixTime";

/** Returns a box with the UTC hyphenated date/ */
export function GetCurrentHyphenDate() {
    return UnixTimeToHyphenDate(GetCurrentUnixTime());
}