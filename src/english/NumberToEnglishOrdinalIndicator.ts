/**
 * https://en.wikipedia.org/wiki/Ordinal_indicator
 * @returns the ordinal indicator, as a lowercase alphabetic string (not superscript)
 */
export function NumberToOrdinalIndicator(number:number){
    const lastDigit = number%10;
    if(number==11 || number===12 || number===13){
        return "th";
    }
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