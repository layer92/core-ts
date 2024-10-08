import { TestArrays } from "./src/arrays/Arrays.test";
import { TestObjects } from "./src/objects/Objects.test";
import { TestStrings } from "./src/strings/Strings.test";
import { TestHyphenatedDate } from "./src/time/HyphenatedDate.test";
import { TestUrl } from "./src/web/Url.test";


console.log("Running tests...")

TestObjects();

TestArrays();

TestStrings();

TestHyphenatedDate();

TestUrl();


console.log("All tests passed.");