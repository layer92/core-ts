import { GetCurrentUnixTime } from "./GetCurrentUnixTime";
import { HyphenatedDateBox } from "./HyphenatedDateBox";

export function GetCurrentHyphenatedDate() {
    return HyphenatedDateBox.FromUnixTime(GetCurrentUnixTime()).getData();
}