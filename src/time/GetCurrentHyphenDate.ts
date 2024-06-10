import { GetCurrentUnixTime } from "./GetCurrentUnixTime";
import { UnixTimeToHyphenDate } from "./HyphenatedDate";

/** Returns a box with the UTC hyphenated date/ */
export function GetCurrentHyphenDate() {
    return UnixTimeToHyphenDate(GetCurrentUnixTime());
}