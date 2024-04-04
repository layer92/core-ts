import { GetCurrentUnixTime } from "./GetCurrentUnixTime";
import { HyphenatedDateBox } from "./HyphenatedDateBox";

/** Returns a box with the current UTC hyphenated date/ */
export function GetCurrentHyphenatedDateBox() {
    return HyphenatedDateBox.FromUnixTime(GetCurrentUnixTime());
}