import { TestStrings } from "./src/strings/Strings.test";
import { TestHyphenatedDateBox } from "./src/time/HyphenatedDateBox.test";
import { TestUrlBox } from "./src/web/UrlBox.test";

console.log("Running tests...")

TestStrings();

TestHyphenatedDateBox();

TestUrlBox();

console.log("All tests passed.");