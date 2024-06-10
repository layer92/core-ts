import { Box } from "../away/Box";
import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

export function GetYearFromJsDate(date:Date){
    return date.getUTCFullYear();
}

export function StringToYear(yyyy: string,onBadData?:OnException) {
    const data = parseInt(yyyy);
    Expect(!isNaN(data),`bad argument: yyyy: not a number, received: `+yyyy,onBadData);
    return data;
}

/* use length=2 to get a value like 92 for 1992, of length=4 to get a value like 0123 for 123 */
export function YearToString(year:number,length:number=4){
    const zeroes = new Array(length).fill("0").join("");
    return (zeroes+year).slice(-length);
}