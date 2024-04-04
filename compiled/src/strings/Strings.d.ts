export declare function GetSubstringCount(string: string, substring: string): number;
export declare function MultiReplace(string: string, replacementPairs: [string, string][]): string;
/**
* Returns the substring between the first pair of left & right delimiters.
* */
export declare function GetBetween({ string, leftDelimiter, rightDelimiter, searchDirection, }: {
    string: string;
    leftDelimiter: string;
    rightDelimiter: string;
    searchDirection?: "leftToRight";
}): string;
export declare function MaybeGetBetween({ string, leftDelimiter, rightDelimiter, searchDirection, }: {
    string: string;
    leftDelimiter: string;
    rightDelimiter: string;
    searchDirection?: "leftToRight";
}): string;
/**
* Returns the substrings between the first pair of left & right delimiters.
* */
export declare function GetAnyBetween({ string, leftDelimiter, rightDelimiter, searchDirection, }: {
    string: string;
    leftDelimiter: string;
    rightDelimiter: string;
    searchDirection?: "leftToRight";
}): string[];
/** Returns the remainder of the string after the first occurence of the delimiter. */
export declare function GetRightOfSubstring({ string, delimiter, searchDirection, }: {
    string: string;
    delimiter: string;
    searchDirection?: "leftToRight";
}): string;
/**
 * Sets any substrings between the left & right delimiters.
 * By default, parses from the left, eg if you use "[" and "]" as delimiters, then "[ab[cd]" would be come "[FOO]" rather than [ab[FOO]" (of course "[ab][cd]" would become "[FOO][FOO]")
 */
export declare function SetBetween({ string, delimiters, valueToSetTo, parseDirection, }: {
    string: string;
    delimiters: string[];
    valueToSetTo: string;
    parseDirection?: "leftToRight" | "rightToLeft";
}): string;
/**
 * splits along the string, taking turns between the delimiters
 * parses left-to-right by default, but if parsing right-to-left through the string, the delimiters will also be parsed in the opposite direction (eg if the delimiters are "[","]", and you're parsing the string "[a[b]c]", you don't need to change the order of the delimiters to parse right-to-left instead of left-to-right, in other words, "[" will be considered "to the left" of "]", no matter which direction you parse in)
 * */
export declare function SplitStringByRepeatingDelimiters({ string, delimiters, parseDirection, }: {
    string: string;
    delimiters: string[];
    parseDirection?: "leftToRight" | "rightToLeft";
}): string[];
export declare function Reverse(string: string): string;
export declare function RemoveAnyFromEnd(string: string, removeString: string): string;
export declare function RemoveExactlyOnceFromEnd(string: string, removeString: string): string;
export declare function RemoveAnyFromStart(string: string, removeString: string): string;
export declare function RemoveExactlyOnceFromStart(string: string, removeString: string): string;
export declare function RemoveAnyFromEnds(string: string, removeString: string): string;
export declare function MultiRemoveAnyFromStart(string: string, removeStrings: string[]): string;
export declare function HasIntersection(a: string, b: string): boolean;
export declare function IsLowerCase(string: string): boolean;
/** words are strings that are delimited by spaces */
export declare function RemoveWord(string: string, word: string): string;
export declare function RemoveCharactersFromEnd(string: string, characters: string): string;
export declare function RemoveCharactersFromEnds(string: string, characters: string): string;
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
export declare function SplitStringOnce({ string, delimiter, parseDirection }: {
    string: string;
    delimiter: string;
    parseDirection?: "rightToLeft" | "leftToRight";
}): [string, string];
export declare function RemoveSubstring(string: string, remove: string): string;
export declare function ReplaceSubstring({ string, remove, insert }: {
    string: string;
    remove: string;
    insert: string;
}): string;
export declare function MaybeReplaceEnding(string: string, remove: string, insert: string): string;
export declare function ReplaceFirstSubstring({ string, remove, insert }: {
    string: string;
    remove: string;
    insert: string;
}): string;
export declare function ReplaceSubstringExactlyOnce({ string, remove, insert, }: {
    string: string;
    remove: string;
    insert: string;
}): string;
export declare function ReplaceSubstrings({ string, remove, insert }: {
    string: string;
    remove: string[];
    insert: string[];
}): string;
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
export declare function ReplaceCharacters({ string, remove, insert, }: {
    string: string;
    remove: string;
    /** you can provide multiple characters to replace with, in which case the length must be the same as the characters you're removing */
    insert: string;
}): string;
export declare function ReplaceCharactersOutsideCharset({ string, charset, insert, }: {
    string: string;
    charset: string;
    /** characters outside the charset will be replaced with this (entire) string */
    insert: string;
}): string;
export declare function JoinArrayByRepeatingDelimiters({ array, delimiters, }: {
    array: string[];
    delimiters: string[];
}): string;
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
export declare function PadLeft(string: string, pad: string, length: number): string;
export declare function IsAlphabetic(string: string): boolean;
export declare function IsAlphanumeric(string: string): boolean;
export declare function IsNumeric(string: string): boolean;
export declare function IsLowercaseAlphabetic(string: string): boolean;
export declare function IsUppercaseAlphabetic(string: string): boolean;
/** DEPRECATED: Use individual utility functions instead to encourage better tree-shaking. */
export declare class Strings {
    static GetSubstringCount: typeof GetSubstringCount;
    static MultiReplace: typeof MultiReplace;
    static GetBetween: typeof GetBetween;
    static MaybeGetBetween: typeof MaybeGetBetween;
    static GetAnyBetween: typeof GetAnyBetween;
    static GetRightOfSubstring: typeof GetRightOfSubstring;
    static SetBetween: typeof SetBetween;
    static SplitStringByRepeatingDelimiters: typeof SplitStringByRepeatingDelimiters;
    static Reverse: typeof Reverse;
    static RemoveAnyFromEnd: typeof RemoveAnyFromEnd;
    static RemoveExactlyOnceFromEnd: typeof RemoveExactlyOnceFromEnd;
    static RemoveAnyFromStart: typeof RemoveAnyFromStart;
    static RemoveExactlyOnceFromStart: typeof RemoveExactlyOnceFromStart;
    static RemoveAnyFromEnds: typeof RemoveAnyFromEnds;
    static MultiRemoveAnyFromStart: typeof MultiRemoveAnyFromStart;
    static HasIntersection: typeof HasIntersection;
    static IsLowerCase: typeof IsLowerCase;
    static RemoveWord: typeof RemoveWord;
    static RemoveCharactersFromEnd: typeof RemoveCharactersFromEnd;
    static RemoveCharactersFromEnds: typeof RemoveCharactersFromEnds;
    static MakeRandom: typeof MakeRandom;
    static CanBeParsedAsFloat: typeof CanBeParsedAsFloat;
    static RemoveWhitespaceFromEnds: typeof RemoveWhitespaceFromEnds;
    static SplitStringByMany: typeof SplitStringByMany;
    static SplitStringOnce: typeof SplitStringOnce;
    static RemoveSubstring: typeof RemoveSubstring;
    static ReplaceSubstring: typeof ReplaceSubstring;
    static MaybeReplaceEnding: typeof MaybeReplaceEnding;
    static ReplaceFirstSubstring: typeof ReplaceFirstSubstring;
    static ReplaceSubstringExactlyOnce: typeof ReplaceSubstringExactlyOnce;
    static ReplaceSubstrings: typeof ReplaceSubstrings;
    static RemoveCharacters: typeof RemoveCharacters;
    static ReplaceCharacters: typeof ReplaceCharacters;
    static ReplaceCharactersOutsideCharset: typeof ReplaceCharactersOutsideCharset;
    static JoinArrayByRepeatingDelimiters: typeof JoinArrayByRepeatingDelimiters;
    static IsInCharset: typeof IsInCharset;
    static GetIndicesOf: typeof GetIndicesOf;
    static GetIndicesOfMulti: typeof GetIndicesOfMulti;
    static GetIndexOfMulti: typeof GetIndexOfMulti;
    static PadLeft: typeof PadLeft;
    static IsAlphabetic: typeof IsAlphabetic;
    static IsAlphanumeric: typeof IsAlphanumeric;
    static IsNumeric: typeof IsNumeric;
    static IsLowercaseAlphabetic: typeof IsLowercaseAlphabetic;
    static IsUppercaseAlphabetic: typeof IsUppercaseAlphabetic;
}
