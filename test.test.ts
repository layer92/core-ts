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
import { MaybeGetIso31661A2CountryCodeEnglishName } from "./src/iso/Iso6391CountryCode";
import { TestSnap } from "./src/math/Snap.test";


console.log("Running tests...")

TestSnap();

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


MaybeGetIso31661A2CountryCodeEnglishName("US");