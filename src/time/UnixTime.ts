import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { ExpectDayOfMonthNumber, JsDateToDayOfMonthNumber, StringToDayOfMonthNumber } from "./DayOfMonthNumber";
import { ExpectHyphenDate, GetYearFromHyphenDate, HyphenDateToUnixTime, MaybeGetDayOfMonthNumberFromHyphenDate, MaybeGetMonthNumberFromHyphenDate } from "./HyphenDate";
import { ExpectMonthNumber, GetMonthNumberFromJsDate, StringToMonthNumber } from "./MonthNumber";
import { GetYearFromJsDate, StringToYear } from "./Year";
import { PadNumberLeft } from "../strings/Strings";

/** Unix time: A number of seconds since Jan 1 1970     */


export function UnixTimeFromYearMonthDay(year:number,monthNumber:number,dayOfMonthNumber:number){
    ExpectMonthNumber(monthNumber);
    ExpectDayOfMonthNumber(dayOfMonthNumber);
    const monthNumberString = ("0"+monthNumber).slice(-2);
    const dayOfMonthNumberString = ("0"+dayOfMonthNumber).slice(-2);
    const isoDate = `${year}-${monthNumberString}-${dayOfMonthNumberString}`;
    const seconds = Math.floor( new Date(isoDate).getTime() / 1000 );
    Expect(!isNaN(seconds),`Invalid year/month/date.`);
    return seconds;
}

export function UnixTimeToJsDate(unixTime:number){
    return new Date(1000*unixTime);
}

    /** Returns undefined if the string is unparsable. */
export function MaybeMakeUnixTimeFromHyphenDate(
    hyphenDate:string,
    options?:{
        forbidEmptyMonthNumber?:true,
        forbidEmptyDayOfMonth?:true,
    }
){
    let catchingBadData = false;
    try{
        ExpectHyphenDate(
            hyphenDate,
            ()=>catchingBadData=true,
            {
                forbidEmptyDayOfMonth:options?.forbidEmptyDayOfMonth,
                forbidEmptyMonthNumber:options?.forbidEmptyMonthNumber,
            }
        );
        return HyphenDateToUnixTime(hyphenDate,{
            onBadData:()=>catchingBadData=true,
        });
    }catch(e){
        if(catchingBadData){
            return undefined;
        }
        throw e;
    }
}
    

export function YyyymmddToUnixTime(yyyymmdd:string,onBadData:OnException){
    Expect(yyyymmdd.length===8,"argument must be 8 characters long, received: "+yyyymmdd,onBadData);
    const year4 = yyyymmdd.slice(0,4);
    const monthNumber2 = yyyymmdd.slice(4,6);
    const dayOfMonth2 = yyyymmdd.slice(6,8);
    return DateStringsToUnixTime(year4,monthNumber2,dayOfMonth2,onBadData);
}

export function DateStringsToUnixTime(year4:string,monthNumber2:string,dayOfMonth2:string,onBadData:OnException){
    Expect(year4.length===4,()=>`year4 must be 4 characters long, received: `+year4,onBadData);
    Expect(monthNumber2.length===2,()=>`monthNumber2 must be 2 characters long, received: `+monthNumber2,onBadData);
    Expect(dayOfMonth2.length===2,()=>`dayOfMonth2 must be 2 characters long, received: `+dayOfMonth2,onBadData);
    const year = StringToYear(year4,onBadData);
    const monthNumber = StringToMonthNumber(monthNumber2,onBadData);
    const dayOfMonthNumber = StringToDayOfMonthNumber(dayOfMonth2,onBadData);
    return UnixTimeFromYearMonthDay(year,monthNumber,dayOfMonthNumber);
}

export function JsDateToUnixTime(javascriptDate:Date){
    return Math.floor(javascriptDate.getTime() / 1000);
}

export function Iso8601DateStringToUnixTime(iso8601DateString:string){
    return JsDateToUnixTime(new Date(iso8601DateString));
}