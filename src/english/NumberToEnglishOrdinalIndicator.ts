/**
 * https://en.wikipedia.org/wiki/Ordinal_indicator
 * @returns the ordinal indicator, as a lowercase alphabetic string (not superscript)
 */
export function NumberToOrdinalIndicator(number:number){
    const lastDigit = number%10;
    if(lastDigit===1){
        return `st`;
    }
    if(lastDigit===2){
        return `nd`;
    }
    if(lastDigit===3){
        return `rd`;
    }
    return `th`;
}