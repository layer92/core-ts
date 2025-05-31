import { AlphanumericCharacters, AlphebeticCharacters, LowercaseAlphabetCharacters, NumericCharacters, UppercaseAlphabetCharacters, WhitespaceCharacters } from "./CommonCharsets";
import { Expect } from "../away/Expect";
import { GetRandomItem } from "../arrays/Arrays";
import { OnException } from "../away/OnException";
import { sep } from "path";


export function GetSubstringCount(string:string,substring:string){
    return string.split(substring).length-1;
}

export function MultiReplace(string:string,replacementPairs:[string,string][]){
    for(const [remove,insert] of replacementPairs){
        string = string.split(''+remove).join(''+insert);
    }
    return string;
}

/**
* Returns the substring between the first pair of left & right delimiters.
* */
export function GetBetween(
    string:string,
    leftDelimiter:string,
    rightDelimiter:string,
    options?:{
        // TODO: add "rightToLeft" as a supported search direction
        searchDirection?:"leftToRight",
    }
){
    const searchDirection = options?.searchDirection||"leftToRight";
    let leftIndex = string.indexOf(leftDelimiter);
    Expect(leftIndex!==-1,()=>"Delimiter not found: "+leftDelimiter);
    leftIndex += leftDelimiter.length;
    const rightIndex = string.indexOf(rightDelimiter,leftIndex);
    Expect(rightIndex!==-1,()=>"Delimiter not found: "+rightDelimiter);
    return string.slice(leftIndex,rightIndex);
}


export function MaybeGetBetween(
    string:string,
    leftDelimiter:string,
    rightDelimiter:string,
    options?:{
        // TODO: add "rightToLeft" as a supported search direction
        searchDirection?:"leftToRight",
    }
){
    const searchDirection = options?.searchDirection||"leftToRight";
    let leftIndex = string.indexOf(leftDelimiter);
    if(leftIndex==-1){
        return undefined;
    }
    leftIndex += leftDelimiter.length;
    const rightIndex = string.indexOf(rightDelimiter,leftIndex);
    if(rightIndex==-1){
        return undefined;
    }
    return string.slice(leftIndex,rightIndex);
}


/**
* Returns any substrings that occur between the left & right delimiters.
* */
export function GetAnyBetween(
    string:string,
    leftDelimiter:string,
    rightDelimiter:string,
    options?:{
        // TODO: add "rightToLeft" as a supported search direction
        searchDirection?:"leftToRight",
    }
){
    const searchDirection = options?.searchDirection||"leftToRight";
    const results:string[] = [];
    let remainder = string;
    while(true){
        const leftDelimiterIndex = remainder.indexOf(leftDelimiter);
        if(leftDelimiterIndex===-1){
            break;
        }
        const segmentStartIndex = leftDelimiterIndex+leftDelimiter.length;
        const segmentEndIndex = remainder.indexOf(rightDelimiter,segmentStartIndex);
        if(segmentEndIndex===-1){
            break;
        }
        const segment = remainder.slice(segmentStartIndex,segmentEndIndex);
        results.push(segment);
        remainder = remainder.slice(segmentEndIndex+rightDelimiter.length);
    }
    return results;
}

/** Returns the remainder of the string after the first occurence of the delimiter. */
export function GetRightOfSubstring(
    string:string,
    delimiter:string,
    options?:{
        // TODO: add "rightToLeft" as a supported search direction
        searchDirection?:"leftToRight",
    }
){
    const searchDirection = options?.searchDirection||"leftToRight";
    let leftIndex = string.indexOf(delimiter);
    Expect(leftIndex!==-1,()=>"Delimiter not found: "+delimiter);
    leftIndex += delimiter.length;
    return string.slice(leftIndex);
}

/**
 * Sets any substrings between the left & right delimiters.
 * By default, parses from the left, eg if you use "[" and "]" as delimiters, then "[ab[cd]" would be come "[FOO]" rather than [ab[FOO]" (of course "[ab][cd]" would become "[FOO][FOO]")
 */
export function SetBetween(
    string:string,
    delimiters:string[],
    valueToSetTo:string,
    options?:{
        parseDirection?:"leftToRight"|"rightToLeft",
    }
){
    const split = SplitStringByRepeatingDelimiters(
        string,
        delimiters,
        options,
    );
    for(let i=1;i<split.length;i+=2){
        split[i] = valueToSetTo
    }
    const result = JoinArrayByRepeatingDelimiters(split,delimiters);
    return result;
}

/**
 * splits along the string, taking turns between the delimiters
 * parses left-to-right by default, but if parsing right-to-left through the string, the delimiters will also be parsed in the opposite direction (eg if the delimiters are "[","]", and you're parsing the string "[a[b]c]", you don't need to change the order of the delimiters to parse right-to-left instead of left-to-right, in other words, "[" will be considered "to the left" of "]", no matter which direction you parse in)
 * */
export function SplitStringByRepeatingDelimiters(
    string:string,
    delimiters:string[],
    options?:{
        parseDirection?:"leftToRight"|"rightToLeft",
    }
){
    const parseRightToLeft = options?.parseDirection==="rightToLeft";
    let value = string;
    /** If parsing right-to-left, simply reverse the string, delimiters, and (at the end) the result. */
    if( parseRightToLeft ){
        value = ReverseString(string);
        delimiters = delimiters.map(
            a=>ReverseString(a)
        ).reverse();
    }
    let result:string[] = [];
    let repeatingDelimitersIndex = -1;
    let segmentStartIndex = 0;
    while(true){
        repeatingDelimitersIndex = (repeatingDelimitersIndex+1)%delimiters.length;
        const delimiter = ''+delimiters[repeatingDelimitersIndex];
        const segmentEndIndex = value.indexOf(
            delimiter,
            segmentStartIndex
        );
        const endIndexNotFound = (segmentEndIndex === -1);
        if( endIndexNotFound ){
            const finalSegment = value.slice(segmentStartIndex);
            result.push( finalSegment );
            break;
        }
        const segment = value.slice(segmentStartIndex,segmentEndIndex);
        result.push( segment );
        // prepare for next segment
        segmentStartIndex = segmentEndIndex+delimiter.length;
    }
    if( parseRightToLeft ){
        /** Reverse the result */
        result = result.map(
            a=>ReverseString(a)
        ).reverse();
    }
    return result;
}

export function ReverseString(string:string){
    return string.split("").reverse().join("");
}

export function RemoveAnyFromEnd(string:string,removeString:string){
    const removeStringLength = removeString.length;
    if(removeStringLength===0){
        return string;
    }
    while(string.endsWith(removeString)){
        string = string.slice(0,-removeStringLength);
    }
    return string;
}

export function RemoveExactlyOnceFromEnd(
    string:string,
    removeString:string
){
    if(!string.endsWith(removeString)){
        throw new Error(`String didn't end with the substring to remove.`);
    }
    return string.slice(0,-removeString.length);
}


export function RemoveAnyFromStart(
    string:string,
    removeString:string
){
    const removeStringLength = removeString.length;
    if(removeStringLength===0){
        return string;
    }
    while(string.startsWith(removeString)){
        string = string.slice(removeStringLength);
    }
    return string;
}

export function RemoveExactlyOnceFromStart(
    string:string,
    removeString:string
){
    if(!string.startsWith(removeString)){
        throw new Error(`String didn't start with the substring to remove.`);
    }
    return string.slice(removeString.length);
}

export function RemoveAnyFromEnds(
    string:string,
    removeString:string
){
    const removeStringLength = removeString.length;
    if(removeStringLength===0){
        return string;
    }
    while(string.startsWith(removeString)){
        string = string.slice(removeStringLength);
    }
    while(string.endsWith(removeString)){
        string = string.slice(0,-removeStringLength);
    }
    return string;
}


export function MultiRemoveAnyFromStart(
    string:string,
    removeStrings:string[]
){
    removeStrings = removeStrings.filter(a=>a.length);
    if(!removeStrings.length){
        return string;
    }
    while( removeStrings.some(a=>string.startsWith(a)) ){
        const removeString = removeStrings.find(a=>string.startsWith(a));
        // sanity check to crash instead of infinite loop
        Expect(removeString?.length,"Something went wrong.");
        string = string.slice(removeString.length);
    }
    return string;
}

export function StringIntersects(
    a:string,
    b:string
){
    return a.split("").some(character=>b.includes(character));
}

export function IsLowerCase(string:string){
    return string===string.toLowerCase();
}

/** words are strings that are delimited by spaces */
export function RemoveWord(
    string:string,
    word:string
){
    return string.split(
        " "
    ).filter(
        a=>a!==word
    ).join(
        " "
    );
}

export function RemoveCharactersFromEnd(
    string:string,
    characters:string,
){
    if(characters===""){
        return string;
    }
    while( characters.includes(string[string.length-1]) ){
        string = string.slice(0,-1);
    }
    return string;
}


export function RemoveCharactersFromEnds(
    string:string,
    characters:string,
){
    if(characters===""){
        return string;
    }
    while( characters.includes(string[string.length-1]) ){
        string = string.slice(0,-1);
    }
    while( characters.includes(string[0]) ){
        string = string.slice(1);
    }
    return string;
}

export function RemoveCharactersFromStart(
    string:string,
    characters:string,
){
    if(characters===""){
        return string;
    }
    while( characters.includes(string[0]) ){
        string = string.slice(1);
    }
    return string;
}

export function MakeRandom(
    length:number,
    charset?:string
){
    charset=charset||AlphanumericCharacters;
    Expect(charset?.length,"bad argument: empty charset")
    const charsetArray = charset.split("");
    let result = "";
    while(result.length<length){
        result += GetRandomItem(charsetArray);
    }
    return result;
}

export function CanBeParsedAsFloat(string:string){
    return !isNaN( parseFloat(string) );
}

export function RemoveWhitespaceFromEnds(string:string){
    return RemoveCharactersFromEnds(string,WhitespaceCharacters);
}

/**
 * TODO: TEST
 * 
 * If there is ambiguity among the delimiters, the earlier delimiters in the array will take precedence.
 * Example: SplitStringbyMany("abcabc", ["ab","bc"]) returns ["c","c"], instead of ["ca"]
*/
export function SplitStringByMany(string:string,delimiters:string[]){
    let result = [string];
    for(const delimiter of delimiters){
        result = result.flatMap( a=>a.split(delimiter) )
    }
    return result;
}

/** Splits by the first occurence of the delimiter */
export function SplitStringOnce(
    string:string,
    delimiter:string,
    options?:{
        parseDirection?:"rightToLeft"|"leftToRight"
    }
):[string,string]{
    const parseDirection = options?.parseDirection||"leftToRight";
    const index = parseDirection === "leftToRight" ? string.indexOf(delimiter) : string.lastIndexOf(delimiter);
    const left = string.slice(0,index);
    const right = string.slice(index+delimiter.length);
    return [left,right];
}

export function RemoveSubstring(string:string,remove:string){
    return ReplaceSubstring(string,remove,"");
}

/* Within the string, finds and replaces a substring. */
export function ReplaceSubstring(
    string:string,
    remove:string,
    insert:string,
){
    return string.split(remove).join(insert);
}


export function MaybeReplaceEnding(string:string,remove:string,insert:string){
    if(!string.endsWith(remove)){
        return string;
    }
    string = string.slice(0,-remove.length);
    string += insert;
    return string;
}

/* Within the string, finds and replaces the first occurence of the substring. */
export function ReplaceFirstSubstring(
    string:string,
    remove:string,
    insert:string
){
    const split = string.split(remove);
    Expect(split.length>=2,`String didn't contain the substring to remove.`);
    const shiftedFirstItem = split.shift();
    // from this point onward, split is shifted
    split[0] = shiftedFirstItem+insert+split[0];
    return split.join(remove);
}


/* Within the string, finds and replaces the first occurence of the substring. */
export function ReplaceSubstringExactlyOnce(
    string:string,
    remove:string,
    insert:string,
){
    const split = string.split(remove);
    if( split.length!==2 ){
        const nInstances = split.length - 1;
        throw new Error(`String didn't contain exactly 1 instance of the substring to remove (found ${nInstances} instances).`);
    }
    return split.join(insert);
}




/* Within the string, finds and replaces multiple substrings. If you provide a single string in the insert array, will use that string for all insertions. */
export function ReplaceSubstrings(
    string:string,
    remove:string[],
    insert:string[],
){
    if(insert.length==1){
        const [insertString] = insert; 
        for(const removeString of remove){
            string = string.split(''+removeString).join(''+insertString);
        }
        return string;
    }

    Expect(remove.length===insert.length,"If you provide mulitple strings to insert, the number of those strings must be the same as the number of strings to replace.")
    const removeLength=remove.length;
    for(let i=0; i<removeLength; ++i){
        string = string.split( ''+remove[i] ).join( ''+insert[i] );
    }
    return string;
}


/**
 * Within the string, removes any of the speicified characters.
 * @param remove: the characters to remove
 */
export function RemoveCharacters(string:string,remove:string){
    return ReplaceCharacters(string,remove,"");
}
/**
 * Within the string, finds and replaces multiple characters.
 * @param remove: the characters to remove
 * @param insert: what to insert whenever one of the characters is encountered
 * */
export function ReplaceCharacters(
    string:string,
    remove:string,
    /** you can provide multiple characters to replace with, in which case the length must be the same as the characters you're removing */
    insert:string,
){
    if(insert.length<=1){
        for(const removeChar of remove){
            if(!string.includes(removeChar)){
                continue;
            }
            string = string.split(removeChar).join(insert);
        }
        return string;
    }

    Expect(remove.length===insert.length,"bad argument: If you provide mulitple characters to insert, the number of those characters must be the same as the number of characters to replace.")
    const removeLength=remove.length;
    for(let i=0; i<removeLength; ++i){
        string = string.split( remove[i] ).join( insert[i] );
    }
    return string;
}

/* Within the string, finds and replaces any characters that aren't in the charset. */
export function ReplaceCharactersOutsideCharset(
    string:string,
    charset:string,
    /** characters outside the charset will be replaced with this (entire) string */
    insert:string,
){
    const stringArray = string.split("");
    const stringArrayLength = stringArray.length;
    for(let i=0;i<stringArrayLength;++i){
        if( !charset.includes(stringArray[i]) ){
            stringArray[i] = insert;
        }
    }
    return stringArray.join("");
}

export function JoinArrayByRepeatingDelimiters(
    array:string[],
    delimiters:string[]
){
    Expect(delimiters.every(a=>a.length),`delimiters: cannot have empty values`);
    let result = "";
    let repeatingDelimitersIndex = -1;
    for(let i=0,n=array.length;i<n;++i){
        if( i > 0 ){
            repeatingDelimitersIndex = (repeatingDelimitersIndex+1)%delimiters.length;
            const delimiter = delimiters[repeatingDelimitersIndex];
            result += delimiter;
        }
        result += array[i];
    }
    return result;
}


export function IsInCharset(string:string,charset:string){
    return string.split("").every(
        character=>charset.includes(character)
    );
}

/**
 * Returns an array of all indices of the string's occurence.
 * If the string is not found, returns an empty array.
 * 
 * Searches left to right and doesn't skip over the word when found, so will truly return each place the word occurs.
 * For example, if you search for the substring "yo-yo" inside of the string "yo-yo-yo-yo", you will get [0, 3, 6], not [0, 6].
 */
export function GetIndicesOf(string:string,substring:string){
    const indices = [];
    let currentIndex = 0;
    while(currentIndex>=0){
        currentIndex = string.indexOf(substring,currentIndex);
        if(currentIndex===-1){
            break;
        }
        indices.push(currentIndex);
        ++currentIndex;
    }
    return indices;
}

export function GetIndicesOfMulti(string:string,substrings:string[],startPosition:number=0){
    const indices = [];
    let currentIndex = startPosition;
    while(currentIndex>=0){
        currentIndex = GetIndexOfMulti(string,substrings,currentIndex);
        if(currentIndex===-1){
            break;
        }
        indices.push(currentIndex);
        ++currentIndex;
    }
    return indices;
}

/** Returns the position of the first occurrence of one of the provided substrings. */
export function GetIndexOfMulti(string:string,substrings:string[],startPosition:number=0){
    const stringLength = string.length;
    for(let i=startPosition;i<stringLength;++i){
        for(const substring of substrings){
            if(string.startsWith(substring,i)){
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

/** Adds characters to the left side of the string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
export function PadLeft(string:string,pad:string,length:number){
    const deficit = length-string.length;
    if(deficit<=0){
        return string;
    }
    const requiredRepetitions = Math.ceil(deficit/pad.length);
    return (pad.repeat(requiredRepetitions)+string).slice(-length);
}

/** Adds zeroes to the left side of the number/string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
export function PadNumberLeft(numberOrString:number|string,length:number){
    return PadLeft(""+numberOrString,'0',length);
}

/** Adds characters to the right side of the string until it is the specified length. If the string is already the specified length or longer, returns the string as-is. If the pad is longer than 1 character, the result will still be at exactly the correct length (in which the last time the pad is added, it may be trunacated) */
export function PadRight(string:string,pad:string,length:number){
    const deficit = length-string.length;
    if(deficit<=0){
        return string;
    }
    const requiredRepetitions = Math.ceil(deficit/pad.length);
    return (string+pad.repeat(requiredRepetitions)).slice(0,length);
}

export function IsAlphabetic(string:string){
    return IsInCharset(string,AlphebeticCharacters);
}

export function IsAlphanumeric(string:string){
    return IsInCharset(string,AlphanumericCharacters);
}

export function IsNumeric(string:string){
    return IsInCharset(string,NumericCharacters);
}

export function IsLowercaseAlphabetic(string:string){
    return IsInCharset(string,LowercaseAlphabetCharacters);
}

export function IsUppercaseAlphabetic(string:string){
    return IsInCharset(string,UppercaseAlphabetCharacters);
}

/**
 * Converts a string to an integer number, throwing an error if the string doesn't contain an integer.
 * @returns An integer number, never returns NaN
 * @param options.coerce Will attempt to create a result even if the string isn't an integer expression using Javascript's parseInt(), but will still throw an error if parseInt() returns NaN. Examples: "2.0"=2, "2.9"=2, "5/2"=5
 * */
export function StringToInteger(string:string,options?:{onBadData?:OnException,coerce?:boolean}){
    const int = parseInt(string);
    Expect(!isNaN(int),"Unable to convert string to integer (received expression that was not a number).",options?.onBadData);
    if(!options?.coerce){
        Expect(IsInCharset(string,NumericCharacters),"Unable to convert string to integer (received non-integer numeric expression).",options?.onBadData);
    }
    return int;
}

/**
 * Converts a string to a float number, throwing an error if the string can't be parsed as a float value.
 * @returns A float number, never returns NaN
 * */
export function StringToFloat(string:string,options?:{onBadData?:OnException}){
    const float = parseFloat(string);
    Expect(!isNaN(float),"Unable to convert string to integer (received expression that was not a number).",options?.onBadData);
    return float;
}

export function CapitalizeFirstLetter(string:string){
    if(string.length===0){
        return "";
    }
    return string[0].toUpperCase()+string.slice(1);
}



/** Adds another item to a (probably) joined string. If both strings are non-empty, will put the separator between the current content. */
export function JoinStrings(a:string,b:string,separator:string){
    if(a.length&&b.length){
        return a+separator+b;
    }
    return a+b;
}