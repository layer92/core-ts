import { GetCurrentUnixTime } from "./GetCurrentUnixTime";
import { HyphenatedDateBox } from "./HyphenatedDateBox";

export function GetCurrentHyphenatedDateBox() {
    return HyphenatedDateBox.FromUnixTime(GetCurrentUnixTime());
}