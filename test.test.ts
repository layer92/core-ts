import { TestArrays } from "./src/arrays/Arrays.test";
import { TestStrings } from "./src/strings/Strings.test";
import { TestHyphenatedDate } from "./src/time/HyphenatedDate.test";
import { TestUrl } from "./src/web/Url.test";


console.log("Running tests...")

TestArrays();

TestStrings();

TestHyphenatedDate();

TestUrl();


console.log("All tests passed.");