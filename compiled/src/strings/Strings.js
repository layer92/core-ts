"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringToFloat = exports.StringToInteger = exports.IsUppercaseAlphabetic = exports.IsLowercaseAlphabetic = exports.IsNumeric = exports.IsAlphanumeric = exports.IsAlphabetic = exports.PadRight = exports.PadNumberLeft = exports.PadLeft = exports.GetIndexOfMulti = exports.GetIndicesOfMulti = exports.GetIndicesOf = exports.IsInCharset = exports.JoinArrayByRepeatingDelimiters = exports.ReplaceCharactersOutsideCharset = exports.ReplaceCharacters = exports.RemoveCharacters = exports.ReplaceSubstrings = exports.ReplaceSubstringExactlyOnce = exports.ReplaceFirstSubstring = exports.MaybeReplaceEnding = exports.ReplaceSubstring = exports.RemoveSubstring = exports.SplitStringOnce = exports.SplitStringByMany = exports.RemoveWhitespaceFromEnds = exports.CanBeParsedAsFloat = exports.MakeRandom = exports.RemoveCharactersFromStart = exports.RemoveCharactersFromEnds = exports.RemoveCharactersFromEnd = exports.RemoveWord = exports.IsLowerCase = exports.StringIntersects = exports.MultiRemoveAnyFromStart = exports.RemoveAnyFromEnds = exports.RemoveExactlyOnceFromStart = exports.RemoveAnyFromStart = exports.RemoveExactlyOnceFromEnd = exports.RemoveAnyFromEnd = exports.ReverseString = exports.SplitStringByRepeatingDelimiters = exports.SetBetween = exports.GetRightOfSubstring = exports.GetAnyBetween = exports.MaybeGetBetween = exports.GetBetween = exports.MultiReplace = exports.GetSubstringCount = void 0;
const CommonCharsets_1 = require("./CommonCharsets");
const Expect_1 = require("../away/Expect");
const Arrays_1 = require("../arrays/Arrays");
function GetSubstringCount(string, substring) {
    return string.split(substring).length - 1;
}
exports.GetSubstringCount = GetSubstringCount;
function MultiReplace(string, replacementPairs) {
    for (const [remove, insert] of replacementPairs) {
        string = string.split('' + remove).join('' + insert);
    }
    return string;
}
exports.MultiReplace = MultiReplace;
/**
* Returns the substring between the first pair of left & right delimiters.
* */
function GetBetween(string, leftDelimiter, rightDelimiter, options) {
    const searchDirection = options?.searchDirection || "leftToRight";
    let leftIndex = string.indexOf(leftDelimiter);
    (0, Expect_1.Expect)(leftIndex !== -1, () => "Delimiter not found: " + leftDelimiter);
    leftIndex += leftDelimiter.length;
    const rightIndex = string.indexOf(rightDelimiter, leftIndex);
    (0, Expect_1.Expect)(rightIndex !== -1, () => "Delimiter not found: " + rightDelimiter);
    return string.slice(leftIndex, rightIndex);
}
exports.GetBetween = GetBetween;
function MaybeGetBetween(string, leftDelimiter, rightDelimiter, options) {
    const searchDirection = options?.searchDirection || "leftToRight";
    let leftIndex = string.indexOf(leftDelimiter);
    if (leftIndex == -1) {
        return undefined;
    }
    leftIndex += leftDelimiter.length;
    const rightIndex = string.indexOf(rightDelimiter, leftIndex);
    if (rightIndex == -1) {
        return undefined;
    }
    return string.slice(leftIndex, rightIndex);
}
exports.MaybeGetBetween = MaybeGetBetween;
/**
* Returns any substrings that occur between the left & right delimiters.
* */
function GetAnyBetween(string, leftDelimiter, rightDelimiter, options) {
    const searchDirection = options?.searchDirection || "leftToRight";
    const results = [];
    let remainder = string;
    while (true) {
        const leftDelimiterIndex = remainder.indexOf(leftDelimiter);
        if (leftDelimiterIndex === -1) {
            break;
        }
        const segmentStartIndex = leftDelimiterIndex + leftDelimiter.length;
        const segmentEndIndex = remainder.indexOf(rightDelimiter, segmentStartIndex);
        if (segmentEndIndex === -1) {
            break;
        }
        const segment = remainder.slice(segmentStartIndex, segmentEndIndex);
        results.push(segment);
        remainder = remainder.slice(segmentEndIndex + rightDelimiter.length);
    }
    return results;
}
exports.GetAnyBetween = GetAnyBetween;
/** Returns the remainder of the string after the first occurence of the delimiter. */
function GetRightOfSubstring(string, delimiter, options) {
    const searchDirection = options?.searchDirection || "leftToRight";
    let leftIndex = string.indexOf(delimiter);
    (0, Expect_1.Expect)(leftIndex !== -1, () => "Delimiter not found: " + delimiter);
    leftIndex += delimiter.length;
    return string.slice(leftIndex);
}
exports.GetRightOfSubstring = GetRightOfSubstring;
/**
 * Sets any substrings between the left & right delimiters.
 * By default, parses from the left, eg if you use "[" and "]" as delimiters, then "[ab[cd]" would be come "[FOO]" rather than [ab[FOO]" (of course "[ab][cd]" would become "[FOO][FOO]")
 */
function SetBetween(string, delimiters, valueToSetTo, options) {
    const split = SplitStringByRepeatingDelimiters(string, delimiters, options);
    for (let i = 1; i < split.length; i += 2) {
        split[i] = valueToSetTo;
    }
    const result = JoinArrayByRepeatingDelimiters(split, delimiters);
    return result;
}
exports.SetBetween = SetBetween;
/**
 * splits along the string, taking turns between the delimiters
 * parses left-to-right by default, but if parsing right-to-left through the string, the delimiters will also be parsed in the opposite direction (eg if the delimiters are "[","]", and you're parsing the string "[a[b]c]", you don't need to change the order of the delimiters to parse right-to-left instead of left-to-right, in other words, "[" will be considered "to the left" of "]", no matter which direction you parse in)
 * */
function SplitStringByRepeatingDelimiters(string, delimiters, options) {
    const parseRightToLeft = options?.parseDirection === "rightToLeft";
    let value = string;
    /** If parsing right-to-left, simply reverse the string, delimiters, and (at the end) the result. */
    if (parseRightToLeft) {
        value = ReverseString(string);
        delimiters = delimiters.map(a => ReverseString(a)).reverse();
    }
    let result = [];
    let repeatingDelimitersIndex = -1;
    let segmentStartIndex = 0;
    while (true) {
        repeatingDelimitersIndex = (repeatingDelimitersIndex + 1) % delimiters.length;
        const delimiter = '' + delimiters[repeatingDelimitersIndex];
        const segmentEndIndex = value.indexOf(delimiter, segmentStartIndex);
        const endIndexNotFound = (segmentEndIndex === -1);
        if (endIndexNotFound) {
            const finalSegment = value.slice(segmentStartIndex);
            result.push(finalSegment);
            break;
        }
        const segment = value.slice(segmentStartIndex, segmentEndIndex);
        result.push(segment);
        // prepare for next segment
        segmentStartIndex = segmentEndIndex + delimiter.length;
    }
    if (parseRightToLeft) {
        /** Reverse the result */
        result = result.map(a => ReverseString(a)).reverse();
    }
    return result;
}
exports.SplitStringByRepeatingDelimiters = SplitStringByRepeatingDelimiters;
function ReverseString(string) {
    return string.split("").reverse().join("");
}
exports.ReverseString = ReverseString;
function RemoveAnyFromEnd(string, removeString) {
    const removeStringLength = removeString.length;
    if (removeStringLength === 0) {
        return string;
    }
    while (string.endsWith(removeString)) {
        string = string.slice(0, -removeStringLength);
    }
    return string;
}
exports.RemoveAnyFromEnd = RemoveAnyFromEnd;
function RemoveExactlyOnceFromEnd(string, removeString) {
    if (!string.endsWith(removeString)) {
        throw new Error(`String didn't end with the substring to remove.`);
    }
    return string.slice(0, -removeString.length);
}
exports.RemoveExactlyOnceFromEnd = RemoveExactlyOnceFromEnd;
function RemoveAnyFromStart(string, removeString) {
    const removeStringLength = removeString.length;
    if (removeStringLength === 0) {
        return string;
    }
    while (string.startsWith(removeString)) {
        string = string.slice(removeStringLength);
    }
    return string;
}
exports.RemoveAnyFromStart = RemoveAnyFromStart;
function RemoveExactlyOnceFromStart(string, removeString) {
    if (!string.startsWith(removeString)) {
        throw new Error(`String didn't start with the substring to remove.`);
    }
    return string.slice(removeString.length);
}
exports.RemoveExactlyOnceFromStart = RemoveExactlyOnceFromStart;
function RemoveAnyFromEnds(string, removeString) {
    const removeStringLength = removeString.length;
    if (removeStringLength === 0) {
        return string;
    }
    while (string.startsWith(removeString)) {
        string = string.slice(removeStringLength);
    }
    while (string.endsWith(removeString)) {
        string = string.slice(0, -removeStringLength);
    }
    return string;
}
exports.RemoveAnyFromEnds = RemoveAnyFromEnds;
function MultiRemoveAnyFromStart(string, removeStrings) {
    removeStrings = removeStrings.filter(a => a.length);
    if (!removeStrings.length) {
        return string;
    }
    while (removeStrings.some(a => string.startsWith(a))) {
        const removeString = removeStrings.find(a => string.startsWith(a));
        // sanity check to crash instead of infinite loop
        (0, Expect_1.Expect)(removeString?.length, "Something went wrong.");
        string = string.slice(removeString.length);
    }
    return string;
}
exports.MultiRemoveAnyFromStart = MultiRemoveAnyFromStart;
function StringIntersects(a, b) {
    return a.split("").some(character => b.includes(character));
}
exports.StringIntersects = StringIntersects;
function IsLowerCase(string) {
    return string === string.toLowerCase();
}
exports.IsLowerCase = IsLowerCase;
/** words are strings that are delimited by spaces */
function RemoveWord(string, word) {
    return string.split(" ").filter(a => a !== word).join(" ");
}
exports.RemoveWord = RemoveWord;
function RemoveCharactersFromEnd(string, characters) {
    if (characters === "") {
        return string;
    }
    while (characters.includes(string[string.length - 1])) {
        string = string.slice(0, -1);
    }
    return string;
}
exports.RemoveCharactersFromEnd = RemoveCharactersFromEnd;
function RemoveCharactersFromEnds(string, characters) {
    if (characters === "") {
        return string;
    }
    while (characters.includes(string[string.length - 1])) {
        string = string.slice(0, -1);
    }
    while (characters.includes(string[0])) {
        string = string.slice(1);
    }
    return string;
}
exports.RemoveCharactersFromEnds = RemoveCharactersFromEnds;
function RemoveCharactersFromStart(string, characters) {
    if (characters === "") {
        return string;
    }
    while (characters.includes(string[0])) {
        string = string.slice(1);
    }
    return string;
}
exports.RemoveCharactersFromStart = RemoveCharactersFromStart;
function MakeRandom(length, charset) {
    charset = charset || CommonCharsets_1.AlphanumericCharacters;
    (0, Expect_1.Expect)(charset?.length, "bad argument: empty charset");
    const charsetArray = charset.split("");
    let result = "";
    while (result.length < length) {
        result += (0, Arrays_1.GetRandomItem)(charsetArray);
    }
    return result;
}
exports.MakeRandom = MakeRandom;
function CanBeParsedAsFloat(string) {
    return !isNaN(parseFloat(string));
}
exports.CanBeParsedAsFloat = CanBeParsedAsFloat;
function RemoveWhitespaceFromEnds(string) {
    return RemoveCharactersFromEnds(string, CommonCharsets_1.WhitespaceCharacters);
}
exports.RemoveWhitespaceFromEnds = RemoveWhitespaceFromEnds;
/**
 * TODO: TEST
 *
 * If there is ambiguity among the delimiters, the earlier delimiters in the array will take precedence.
 * Example: SplitStringbyMany("abcabc", ["ab","bc"]) returns ["c","c"], instead of ["ca"]
*/
function SplitStringByMany(string, delimiters) {
    let result = [string];
    for (const delimiter of delimiters) {
        result = result.flatMap(a => a.split(delimiter));
    }
    return result;
}
exports.SplitStringByMany = SplitStringByMany;
/** Splits by the first occurence of the delimiter */
function SplitStringOnce(string, delimiter, options) {
    const parseDirection = options?.parseDirection || "leftToRight";
    const index = parseDirection === "leftToRight" ? string.indexOf(delimiter) : string.lastIndexOf(delimiter);
    const left = string.slice(0, index);
    const right = string.slice(index + delimiter.length);
    return [left, right];
}
exports.SplitStringOnce = SplitStringOnce;
function RemoveSubstring(string, remove) {
    return ReplaceSubstring(string, remove, "");
}
exports.RemoveSubstring = RemoveSubstring;
/* Within the string, finds and replaces a substring. */
function ReplaceSubstring(string, remove, insert) {
    return string.split(remove).join(insert);
}
exports.ReplaceSubstring = ReplaceSubstring;
function MaybeReplaceEnding(string, remove, insert) {
    if (!string.endsWith(remove)) {
        return string;
    }
    string = string.slice(0, -remove.length);
    string += insert;
    return string;
}
exports.MaybeReplaceEnding = MaybeReplaceEnding;
/* Within the string, finds and replaces the first occurence of the substring. */
function ReplaceFirstSubstring(string, remove, insert) {
    const split = string.split(remove);
    (0, Expect_1.Expect)(split.length >= 2, `String didn't contain the substring to remove.`);
    const shiftedFirstItem = split.shift();
    // from this point onward, split is shifted
    split[0] = shiftedFirstItem + insert + split[0];
    return split.join(remove);
}
exports.ReplaceFirstSubstring = ReplaceFirstSubstring;
/* Within the string, finds and replaces the first occurence of the substring. */
function ReplaceSubstringExactlyOnce(string, remove, insert) {
    const split = string.split(remove);
    if (split.length !== 2) {
        const nInstances = split.length - 1;
        throw new Error(`String didn't contain exactly 1 instance of the substring to remove (found ${nInstances} instances).`);
    }
    return split.join(insert);
}
exports.ReplaceSubstringExactlyOnce = ReplaceSubstringExactlyOnce;
/* Within the string, finds and replaces multiple substrings. If you provide a single string in the insert array, will use that string for all insertions. */
function ReplaceSubstrings(string, remove, insert) {
    if (insert.length == 1) {
        const [insertString] = insert;
        for (const removeString of remove) {
            string = string.split('' + removeString).join('' + insertString);
        }
        return string;
    }
    (0, Expect_1.Expect)(remove.length === insert.length, "If you provide mulitple strings to insert, the number of those strings must be the same as the number of strings to replace.");
    const removeLength = remove.length;
    for (let i = 0; i < removeLength; ++i) {
        string = string.split('' + remove[i]).join('' + insert[i]);
    }
    return string;
}
exports.ReplaceSubstrings = ReplaceSubstrings;
/**
 * Within the string, removes any of the speicified characters.
 * @param remove: the characters to remove
 */
function RemoveCharacters(string, remove) {
    return ReplaceCharacters(string, remove, "");
}
exports.RemoveCharacters = RemoveCharacters;
/**
 * Within the string, finds and replaces multiple characters.
 * @param remove: the characters to remove
 * @param insert: what to insert whenever one of the characters is encountered
 * */
function ReplaceCharacters(string, remove, 
/** you can provide multiple characters to replace with, in which case the length must be the same as the characters you're removing */
insert) {
    if (insert.length <= 1) {
        for (const removeChar of remove) {
            if (!string.includes(removeChar)) {
                continue;
            }
            string = string.split(removeChar).join(insert);
        }
        return string;
    }
    (0, Expect_1.Expect)(remove.length === insert.length, "bad argument: If you provide mulitple characters to insert, the number of those characters must be the same as the number of characters to replace.");
    const removeLength = remove.length;
    for (let i = 0; i < removeLength; ++i) {
        string = string.split(remove[i]).join(insert[i]);
    }
    return string;
}
exports.ReplaceCharacters = ReplaceCharacters;
/* Within the string, finds and replaces any characters that aren't in the charset. */
function ReplaceCharactersOutsideCharset(string, charset, 
/** characters outside the charset will be replaced with this (entire) string */
insert) {
    const stringArray = string.split("");
    const stringArrayLength = stringArray.length;
    for (let i = 0; i < stringArrayLength; ++i) {
        if (!charset.includes(stringArray[i])) {
            stringArray[i] = insert;
        }
    }
    return stringArray.join("");
}
exports.ReplaceCharactersOutsideCharset = ReplaceCharactersOutsideCharset;
function JoinArrayByRepeatingDelimiters(array, delimiters) {
    (0, Expect_1.Expect)(delimiters.every(a => a.length), `delimiters: cannot have empty values`);
    let result = "";
    let repeatingDelimitersIndex = -1;
    for (let i = 0, n = array.length; i < n; ++i) {
        if (i > 0) {
            repeatingDelimitersIndex = (repeatingDelimitersIndex + 1) % delimiters.length;
            const delimiter = delimiters[repeatingDelimitersIndex];
            result += delimiter;
        }
        result += array[i];
    }
    return result;
}
exports.JoinArrayByRepeatingDelimiters = JoinArrayByRepeatingDelimiters;
function IsInCharset(string, charset) {
    return string.split("").every(character => charset.includes(character));
}
exports.IsInCharset = IsInCharset;
/**
 * Returns an array of all indices of the string's occurence.
 * If the string is not found, returns an empty array.
 *
 * Searches left to right and doesn't skip over the word when found, so will truly return each place the word occurs.
 * For example, if you search for the substring "yo-yo" inside of the string "yo-yo-yo-yo", you will get [0, 3, 6], not [0, 6].
 */
function GetIndicesOf(string, substring) {
    const indices = [];
    let currentIndex = 0;
    while (currentIndex >= 0) {
        currentIndex = string.indexOf(substring, currentIndex);
        if (currentIndex === -1) {
            break;
        }
        indices.push(currentIndex);
        ++currentIndex;
    }
    return indices;
}
exports.GetIndicesOf = GetIndicesOf;
function GetIndicesOfMulti(string, substrings, startPosition = 0) {
    const indices = [];
    let currentIndex = startPosition;
    while (currentIndex >= 0) {
        currentIndex = GetIndexOfMulti(string, substrings, currentIndex);
        if (currentIndex === -1) {
            break;
        }
        indices.push(currentIndex);
        ++currentIndex;
    }
    return indices;
}
exports.GetIndicesOfMulti = GetIndicesOfMulti;
/** Returns the position of the first occurrence of one of the provided substrings. */
function GetIndexOfMulti(string, substrings, startPosition = 0) {
    const stringLength = string.length;
    for (let i = startPosition; i < stringLength; ++i) {
        for (const substring of substrings) {
            if (string.startsWith(substring, i)) {
                return i;
            }
        }
    }
    return -1;
    // return Arrays.GetMin(
    //     substrings.map(
    //         a=>string.indexOf(a)
    //     )
    // );
}
exports.GetIndexOfMulti = GetIndexOfMulti;
/** Adds characters to the left side of the string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
function PadLeft(string, pad, length) {
    const deficit = length - string.length;
    if (deficit <= 0) {
        return string;
    }
    const requiredRepetitions = Math.ceil(deficit / pad.length);
    return (pad.repeat(requiredRepetitions) + string).slice(-length);
}
exports.PadLeft = PadLeft;
/** Adds zeroes to the left side of the number/string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
function PadNumberLeft(numberOrString, length) {
    return PadLeft("" + numberOrString, '0', length);
}
exports.PadNumberLeft = PadNumberLeft;
/** Adds characters to the right side of the string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
function PadRight(string, pad, length) {
    const deficit = length - string.length;
    if (deficit <= 0) {
        return string;
    }
    const requiredRepetitions = Math.ceil(deficit / pad.length);
    return (string + pad.repeat(requiredRepetitions)).slice(0, length);
}
exports.PadRight = PadRight;
function IsAlphabetic(string) {
    return IsInCharset(string, CommonCharsets_1.AlphebeticCharacters);
}
exports.IsAlphabetic = IsAlphabetic;
function IsAlphanumeric(string) {
    return IsInCharset(string, CommonCharsets_1.AlphanumericCharacters);
}
exports.IsAlphanumeric = IsAlphanumeric;
function IsNumeric(string) {
    return IsInCharset(string, CommonCharsets_1.NumericCharacters);
}
exports.IsNumeric = IsNumeric;
function IsLowercaseAlphabetic(string) {
    return IsInCharset(string, CommonCharsets_1.LowercaseAlphabetCharacters);
}
exports.IsLowercaseAlphabetic = IsLowercaseAlphabetic;
function IsUppercaseAlphabetic(string) {
    return IsInCharset(string, CommonCharsets_1.UppercaseAlphabetCharacters);
}
exports.IsUppercaseAlphabetic = IsUppercaseAlphabetic;
/**
 * Converts a string to an integer number, throwing an error if the string doesn't contain an integer.
 * @returns An integer number, never returns NaN
 * @param options.coerce Will attempt to create a result even if the string isn't an integer expression using Javascript's parseInt(), but will still throw an error if parseInt() returns NaN. Examples: "2.0"=2, "2.9"=2, "5/2"=5
 * */
function StringToInteger(string, options) {
    const int = parseInt(string);
    (0, Expect_1.Expect)(!isNaN(int), "Unable to convert string to integer (received expression that was not a number).", options?.onBadData);
    if (!options?.coerce) {
        (0, Expect_1.Expect)(IsInCharset(string, CommonCharsets_1.NumericCharacters), "Unable to convert string to integer (received non-integer numeric expression).", options?.onBadData);
    }
    return int;
}
exports.StringToInteger = StringToInteger;
/**
 * Converts a string to a float number, throwing an error if the string can't be parsed as a float value.
 * @returns A float number, never returns NaN
 * */
function StringToFloat(string, options) {
    const float = parseFloat(string);
    (0, Expect_1.Expect)(!isNaN(float), "Unable to convert string to integer (received expression that was not a number).", options?.onBadData);
    return float;
}
exports.StringToFloat = StringToFloat;
