import { OnException } from "../away/OnException";
export declare function GetSubstringCount(string: string, substring: string): number;
export declare function MultiReplace(string: string, replacementPairs: [string, string][]): string;
/**
* Returns the substring between the first pair of left & right delimiters.
* */
export declare function GetBetween(string: string, leftDelimiter: string, rightDelimiter: string, options?: {
    searchDirection?: "leftToRight";
}): string;
export declare function MaybeGetBetween(string: string, leftDelimiter: string, rightDelimiter: string, options?: {
    searchDirection?: "leftToRight";
}): string;
/**
* Returns any substrings that occur between the left & right delimiters.
* */
export declare function GetAnyBetween(string: string, leftDelimiter: string, rightDelimiter: string, options?: {
    searchDirection?: "leftToRight";
}): string[];
/** Returns the remainder of the string after the first occurence of the delimiter. */
export declare function GetRightOfSubstring(string: string, delimiter: string, options?: {
    searchDirection?: "leftToRight";
}): string;
/**
 * Sets any substrings between the left & right delimiters.
 * By default, parses from the left, eg if you use "[" and "]" as delimiters, then "[ab[cd]" would be come "[FOO]" rather than [ab[FOO]" (of course "[ab][cd]" would become "[FOO][FOO]")
 */
export declare function SetBetween(string: string, delimiters: string[], valueToSetTo: string, options?: {
    parseDirection?: "leftToRight" | "rightToLeft";
}): string;
/**
 * splits along the string, taking turns between the delimiters
 * parses left-to-right by default, but if parsing right-to-left through the string, the delimiters will also be parsed in the opposite direction (eg if the delimiters are "[","]", and you're parsing the string "[a[b]c]", you don't need to change the order of the delimiters to parse right-to-left instead of left-to-right, in other words, "[" will be considered "to the left" of "]", no matter which direction you parse in)
 * */
export declare function SplitStringByRepeatingDelimiters(string: string, delimiters: string[], options?: {
    parseDirection?: "leftToRight" | "rightToLeft";
}): string[];
export declare function ReverseString(string: string): string;
export declare function RemoveAnyFromEnd(string: string, removeString: string): string;
export declare function RemoveExactlyOnceFromEnd(string: string, removeString: string): string;
export declare function RemoveAnyFromStart(string: string, removeString: string): string;
export declare function RemoveExactlyOnceFromStart(string: string, removeString: string): string;
export declare function RemoveAnyFromEnds(string: string, removeString: string): string;
export declare function MultiRemoveAnyFromStart(string: string, removeStrings: string[]): string;
export declare function StringIntersects(a: string, b: string): boolean;
export declare function IsLowerCase(string: string): boolean;
/** words are strings that are delimited by spaces */
export declare function RemoveWord(string: string, word: string): string;
export declare function RemoveCharactersFromEnd(string: string, characters: string): string;
export declare function RemoveCharactersFromEnds(string: string, characters: string): string;
export declare function RemoveCharactersFromStart(string: string, characters: string): string;
export declare function MakeRandom(length: number, charset?: string): string;
export declare function CanBeParsedAsFloat(string: string): boolean;
export declare function RemoveWhitespaceFromEnds(string: string): string;
/**
 * TODO: TEST
 *
 * If there is ambiguity among the delimiters, the earlier delimiters in the array will take precedence.
 * Example: SplitStringbyMany("abcabc", ["ab","bc"]) returns ["c","c"], instead of ["ca"]
*/
export declare function SplitStringByMany(string: string, delimiters: string[]): string[];
/** Splits by the first occurence of the delimiter */
export declare function SplitStringOnce(string: string, delimiter: string, options?: {
    parseDirection?: "rightToLeft" | "leftToRight";
}): [string, string];
export declare function RemoveSubstring(string: string, remove: string): string;
export declare function ReplaceSubstring(string: string, remove: string, insert: string): string;
export declare function MaybeReplaceEnding(string: string, remove: string, insert: string): string;
export declare function ReplaceFirstSubstring(string: string, remove: string, insert: string): string;
export declare function ReplaceSubstringExactlyOnce(string: string, remove: string, insert: string): string;
export declare function ReplaceSubstrings(string: string, remove: string[], insert: string[]): string;
/**
 * Within the string, removes any of the speicified characters.
 * @param remove: the characters to remove
 */
export declare function RemoveCharacters(string: string, remove: string): string;
/**
 * Within the string, finds and replaces multiple characters.
 * @param remove: the characters to remove
 * @param insert: what to insert whenever one of the characters is encountered
 * */
export declare function ReplaceCharacters(string: string, remove: string, 
/** you can provide multiple characters to replace with, in which case the length must be the same as the characters you're removing */
insert: string): string;
export declare function ReplaceCharactersOutsideCharset(string: string, charset: string, 
/** characters outside the charset will be replaced with this (entire) string */
insert: string): string;
export declare function JoinArrayByRepeatingDelimiters(array: string[], delimiters: string[]): string;
export declare function IsInCharset(string: string, charset: string): boolean;
/**
 * Returns an array of all indices of the string's occurence.
 * If the string is not found, returns an empty array.
 *
 * Searches left to right and doesn't skip over the word when found, so will truly return each place the word occurs.
 * For example, if you search for the substring "yo-yo" inside of the string "yo-yo-yo-yo", you will get [0, 3, 6], not [0, 6].
 */
export declare function GetIndicesOf(string: string, substring: string): any[];
export declare function GetIndicesOfMulti(string: string, substrings: string[], startPosition?: number): any[];
/** Returns the position of the first occurrence of one of the provided substrings. */
export declare function GetIndexOfMulti(string: string, substrings: string[], startPosition?: number): number;
/** Adds characters to the left side of the string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
export declare function PadLeft(string: string, pad: string, length: number): string;
/** Adds zeroes to the left side of the number/string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
export declare function PadNumberLeft(numberOrString: number | string, length: number): string;
/** Adds characters to the right side of the string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
export declare function PadRight(string: string, pad: string, length: number): string;
export declare function IsAlphabetic(string: string): boolean;
export declare function IsAlphanumeric(string: string): boolean;
export declare function IsNumeric(string: string): boolean;
export declare function IsLowercaseAlphabetic(string: string): boolean;
export declare function IsUppercaseAlphabetic(string: string): boolean;
/**
 * Converts a string to an integer number, throwing an error if the string doesn't contain an integer.
 * @returns An integer number, never returns NaN
 * @param options.coerce Will attempt to create a result even if the string isn't an integer expression using Javascript's parseInt(), but will still throw an error if parseInt() returns NaN. Examples: "2.0"=2, "2.9"=2, "5/2"=5
 * */
export declare function StringToInteger(string: string, options?: {
    onBadData?: OnException;
    coerce?: boolean;
}): number;
/**
 * Converts a string to a float number, throwing an error if the string can't be parsed as a float value.
 * @returns A float number, never returns NaN
 * */
export declare function StringToFloat(string: string, options?: {
    onBadData?: OnException;
}): number;
export declare function CapitalizeFirstLetter(string: string): string;
/** Adds another item to a (probably) joined string. If both strings are non-empty, will put the separator between the current content. */
export declare function JoinStrings(a: string, b: string, separator: string): string;
