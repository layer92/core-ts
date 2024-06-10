import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

export const LowercaseThreeLetterMonthStrings = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"] as const;
export const ThreeLetterMonthStrings = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"] as const;


export type LowercaseThreeLetterMonthString = typeof LowercaseThreeLetterMonthStrings[number];

export const EnglishMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
] as const;

export type EnglishMonthName = typeof EnglishMonthNames[number];


/** 1-12 */
export function ExpectMonthNumber(monthNumber:number,onBadData?:OnException){
    Expect( monthNumber>=1 && monthNumber<=12, `out of range`, onBadData );
    Expect(!isNaN(monthNumber), `not a number`, onBadData);
}

export function GetMonthNumberFromJsDate(date:Date){
    const index = date.getUTCMonth();
    return index+1;
}

export function StringToMonthNumber(MM:string,onBadData?:OnException){
    const monthNumber = parseInt(MM);
    Expect(!isNaN(monthNumber),`MM: not a number`,onBadData);
    ExpectMonthNumber(monthNumber);
    return monthNumber;
}

export function ThreeLetterEnglishMonthStringToMonthNumber(month3:string,onBadData?:OnException){
    const index = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
    ].indexOf(month3.toLowerCase());
    Expect(index!==1,`unrecognized month3 value: `+month3,onBadData);
    return index+1;
}

export function MonthNumberToMonthIndex(monthNumber:number){
    ExpectMonthNumber(monthNumber);
    return monthNumber-1;
}

export function MonthNumberToEnglishMonthName(monthNumber:number){
    ExpectMonthNumber(monthNumber);
    return EnglishMonthNames[monthNumber-1];
}