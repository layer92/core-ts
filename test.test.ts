import { TestArrays } from "./src/arrays/Arrays.test";
import { TestFileNames } from "./src/files/FileNames.test";
import { TestFilePaths } from "./src/files/FilePaths.test";
import { TestFolderPaths } from "./src/files/FolderPaths.test";
import { TestFractions } from "./src/math/Fractions.test";
import { TestObjects } from "./src/objects/Objects.test";
import { TestStrings } from "./src/strings/Strings.test";
import { TestAmericanSlashDate } from "./src/time/AmericanSlashDate.test";
import { TestHyphenatedDate } from "./src/time/HyphenDate.test";
import { TestUrl } from "./src/web/Url.test";


console.log("Running tests...")

TestFilePaths();
TestFileNames();
TestFolderPaths();

TestFractions();

TestObjects();

TestArrays();

TestStrings();

TestHyphenatedDate();

TestAmericanSlashDate();

TestUrl();


console.log("All tests passed.");