import { GetCurrentUnixTime } from "./GetCurrentUnixTime";
import { HyphenatedDateBox } from "./HyphenatedDateBox";

/** Returns a box with the UTC hyphenated date/ */
export function GetCurrentHyphenatedDate() {
    return HyphenatedDateBox.FromUnixTime(GetCurrentUnixTime()).getData();
}