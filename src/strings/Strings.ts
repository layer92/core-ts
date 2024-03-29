import { AlphanumericCharacters, WhitespaceCharacters } from "./CommonCharsets";
import { Expect } from "../away/Expect";
import { Arrays } from "../arrays/Arrays";

export class Strings{
    static GetSubstringCount(string:string,substring:string){
        return string.split(substring).length-1;
    }

    static MultiReplace(string:string,replacementPairs:[string,string][]){
        for(const [remove,insert] of replacementPairs){
            string = string.split(''+remove).join(''+insert);
        }
        return string;
    }

    /**
    * Returns the substring between the first pair of left & right delimiters.
    * */
    static GetBetween({
        string,
        leftDelimiter,
        rightDelimiter,
        searchDirection,
    }:{
        string:string,
        leftDelimiter:string,
        rightDelimiter:string,
        // TODO: add "rightToLeft" as supported search direction
        searchDirection?:"leftToRight",
    }){
        searchDirection = searchDirection||"leftToRight";
        let leftIndex = string.indexOf(leftDelimiter);
        Expect(leftIndex!==-1,()=>"Delimiter not found: "+leftDelimiter);
        leftIndex += leftDelimiter.length;
        const rightIndex = string.indexOf(rightDelimiter,leftIndex);
        Expect(rightIndex!==-1,()=>"Delimiter not found: "+rightDelimiter);
        return string.slice(leftIndex,rightIndex);
    }


    static MaybeGetBetween({
        string,
        leftDelimiter,
        rightDelimiter,
        searchDirection,
    }:{
        string:string,
        leftDelimiter:string,
        rightDelimiter:string,
        // TODO: add "rightToLeft" as supported search direction
        searchDirection?:"leftToRight",
    }){
        searchDirection = searchDirection||"leftToRight";
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
    * Returns the substrings between the first pair of left & right delimiters.
    * */
    static GetAnyBetween({
        string,
        leftDelimiter,
        rightDelimiter,
        searchDirection,
    }:{
        string:string,
        leftDelimiter:string,
        rightDelimiter:string,
        // TODO: add "rightToLeft" as supported search direction
        searchDirection?:"leftToRight",
    }){
        searchDirection = searchDirection||"leftToRight";
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
    static GetRightOfSubstring({
        string,
        delimiter,
        searchDirection,
    }:{
        string:string,
        delimiter:string,
        searchDirection?:"leftToRight",
    }){
        searchDirection = searchDirection||"leftToRight";
        let leftIndex = string.indexOf(delimiter);
        Expect(leftIndex!==-1,()=>"Delimiter not found: "+delimiter);
        leftIndex += delimiter.length;
        return string.slice(leftIndex);
    }

    /**
     * Sets any substrings between the left & right delimiters.
     * By default, parses from the left, eg if you use "[" and "]" as delimiters, then "[ab[cd]" would be come "[FOO]" rather than [ab[FOO]" (of course "[ab][cd]" would become "[FOO][FOO]")
     */
    static SetBetween({
        string,
        delimiters,
        valueToSetTo,
        parseDirection,
    }:{
        string:string,
        delimiters:string[],
        valueToSetTo:string,
        parseDirection?:"leftToRight"|"rightToLeft",
    }){
        const split = Strings.SplitStringByRepeatingDelimiters({
            string,
            delimiters,
            parseDirection,
        });
        for(let i=1;i<split.length;i+=2){
            split[i] = valueToSetTo
        }
        const result = Strings.JoinArrayByRepeatingDelimiters({array:split,delimiters});
        return result;
    }

    /**
     * splits along the string, taking turns between the delimiters
     * parses left-to-right by default, but if parsing right-to-left through the string, the delimiters will also be parsed in the opposite direction (eg if the delimiters are "[","]", and you're parsing the string "[a[b]c]", you don't need to change the order of the delimiters to parse right-to-left instead of left-to-right, in other words, "[" will be considered "to the left" of "]", no matter which direction you parse in)
     * */
    static SplitStringByRepeatingDelimiters({
        string,
        delimiters,
        parseDirection,
    }:{
        string:string,
        delimiters:string[],
        parseDirection?:"leftToRight"|"rightToLeft",
    }){
        const parseRightToLeft = parseDirection==="rightToLeft";
        let value = string;
        /** If parsing right-to-left, simply reverse the string, delimiters, and (at the end) the result. */
        if( parseRightToLeft ){
            value = Strings.Reverse(string);
            delimiters = delimiters.map(
                a=>Strings.Reverse(a)
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
                a=>Strings.Reverse(a)
            ).reverse();
        }
        return result;
    }

    static Reverse(string:string){
        return string.split("").reverse().join("");
    }

    static RemoveAnyFromEnd(string:string,removeString:string){
        const removeStringLength = removeString.length;
        if(removeStringLength===0){
            return string;
        }
        while(string.endsWith(removeString)){
            string = string.slice(0,-removeStringLength);
        }
        return string;
    }

    static RemoveExactlyOnceFromEnd(
        string:string,
        removeString:string
    ){
        if(!string.endsWith(removeString)){
            throw new Error(`String didn't end with the substring to remove.`);
        }
        return string.slice(0,-removeString.length);
    }


    static RemoveAnyFromStart(
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

    static RemoveExactlyOnceFromStart(
        string:string,
        removeString:string
    ){
        if(!string.startsWith(removeString)){
            throw new Error(`String didn't start with the substring to remove.`);
        }
        return string.slice(removeString.length);
    }

    static RemoveAnyFromEnds(
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


    static MultiRemoveAnyFromStart(
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

    static HasIntersection(
        a:string,
        b:string
    ){
        return a.split("").some(character=>b.includes(character));
    }

    static IsLowerCase(string:string){
        return string===string.toLowerCase();
    }

    /** words are strings that are delimited by spaces */
    static RemoveWord(
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

    static RemoveCharactersFromEnd(
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


    static RemoveCharactersFromEnds(
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

    static MakeRandom(
        length:number,
        charset?:string
    ){
        charset=charset||AlphanumericCharacters;
        Expect(charset?.length,"bad argument: empty charset")
        const charsetArray = charset.split("");
        let result = "";
        while(result.length<length){
            result += Arrays.GetRandom(charsetArray);
        }
        return result;
    }

    static CanBeParsedAsFloat(string:string){
        return !isNaN( parseFloat(string) );
    }

    static RemoveWhitespaceFromEnds(string:string){
        return Strings.RemoveCharactersFromEnds(string,WhitespaceCharacters);
    }

    /**
     * TODO: TEST
     * 
     * If there is ambiguity among the delimiters, the earlier delimiters in the array will take precedence.
     * Example: SplitStringbyMany("abcabc", ["ab","bc"]) returns ["c","c"], instead of ["ca"]
    */
    static SplitStringByMany(string:string,delimiters:string[]){
        let result = [string];
        for(const delimiter of delimiters){
            result = result.flatMap( a=>a.split(delimiter) )
        }
        return result;
    }

    /** Splits by the first occurence of the delimiter */
    static SplitStringOnce({
        string,
        delimiter,
        parseDirection
    }:{
        string:string,
        delimiter:string,
        parseDirection?:"rightToLeft"|"leftToRight"
    }):[string,string]{
        parseDirection = parseDirection||"leftToRight";
        const index = parseDirection === "leftToRight" ? string.indexOf(delimiter) : string.lastIndexOf(delimiter);
        const left = string.slice(0,index);
        const right = string.slice(index+delimiter.length);
        return [left,right];
    }

    static RemoveSubstring(string:string,remove:string){
        return Strings.ReplaceSubstring({string,remove,insert:""});
    }

    /* Within the string, finds and replaces a substring. */
    static ReplaceSubstring(
        {
            string,remove,insert
        }:{
            string:string,
            remove:string,
            insert:string,
        }
    ){
        return string.split(remove).join(insert);
    }


    static MaybeReplaceEnding(string:string,remove:string,insert:string){
        if(!string.endsWith(remove)){
            return string;
        }
        string = string.slice(0,-remove.length);
        string += insert;
        return string;
    }

    /* Within the string, finds and replaces the first occurence of the substring. */
    static ReplaceFirstSubstring(
        {
            string,remove,insert
        }:{
            string:string,
            remove:string,
            insert:string
        }
    ){
        const split = string.split(remove);
        Expect(split.length>=2,`String didn't contain the substring to remove.`);
        const shiftedFirstItem = split.shift();
        // from this point onward, split is shifted
        split[0] = shiftedFirstItem+insert+split[0];
        return split.join(remove);
    }


    /* Within the string, finds and replaces the first occurence of the substring. */
    static ReplaceSubstringExactlyOnce(
        {
            string,remove,insert,
        }:{
            string:string,
            remove:string,
            insert:string,
        }
    ){
        const split = string.split(remove);
        if( split.length!==2 ){
            const nInstances = split.length - 1;
            throw new Error(`String didn't contain exactly 1 instance of the substring to remove (found ${nInstances} instances).`);
        }
        return split.join(insert);
    }




    /* Within the string, finds and replaces multiple substrings. If you provide a single string in the insert array, will use that string for all insertions. */
    static ReplaceSubstrings({
        string,remove,insert
    }:{
        string:string,
        remove:string[],
        insert:string[],
    }){
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
    static RemoveCharacters(string:string,remove:string){
        return Strings.ReplaceCharacters({string,remove,insert:""});
    }
    /**
     * Within the string, finds and replaces multiple characters.
     * @param remove: the characters to remove
     * @param insert: what to insert whenever one of the characters is encountered
     * */
    static ReplaceCharacters({
        string,
        remove,
        insert,
    }:{
        string:string,
        remove:string,
        /** you can provide multiple characters to replace with, in which case the length must be the same as the characters you're removing */
        insert:string,
    }){
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
    static ReplaceCharactersOutsideCharset({
        string,
        charset,
        insert,
    }:{
        string:string,
        charset:string,
        /** characters outside the charset will be replaced with this (entire) string */
        insert:string,
    }){
        const stringArray = string.split("");
        const stringArrayLength = stringArray.length;
        for(let i=0;i<stringArrayLength;++i){
            if( !charset.includes(stringArray[i]) ){
                stringArray[i] = insert;
            }
        }
        return stringArray.join("");
    }

    static JoinArrayByRepeatingDelimiters({
        array,
        delimiters,
    }:{
        array:string[],
        delimiters:string[]
    }){
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


    static IsInCharset(string:string,charset:string){
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
    static GetIndicesOf(string:string,substring:string){
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

    static GetIndicesOfMulti(string:string,substrings:string[],startPosition:number=0){
        const indices = [];
        let currentIndex = startPosition;
        while(currentIndex>=0){
            currentIndex = Strings.GetIndexOfMulti(string,substrings,currentIndex);
            if(currentIndex===-1){
                break;
            }
            indices.push(currentIndex);
            ++currentIndex;
        }
        return indices;
    }

    /** Returns the position of the first occurrence of one of the provided substrings. */
    static GetIndexOfMulti(string:string,substrings:string[],startPosition:number=0){
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

    // Adds characters to the left side of the string until it is the specified length. If the string is already the specified length or longer, returns the string as-is.
    static PadLeft({string,pad,length}:{string:string,pad:string,length:number}){
        const deficit = length-string.length;
        if(deficit<=0){
            return string;
        }
        const repetitions = Math.ceil(deficit/pad.length);
        return (pad.repeat(repetitions)+string).slice(-length);
    }
}