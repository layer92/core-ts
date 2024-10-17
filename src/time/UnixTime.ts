import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { ExpectDayOfMonthNumber, JsDateToDayOfMonthNumber, StringToDayOfMonthNumber } from "./DayOfMonthNumber";
import { GetCurrentUnixTime } from "./GetCurrentUnixTime";
import { ExpectHyphenDate, GetDifferenceMonthsFromHyphenDate, GetDifferenceYearsBetweenHyphenDates, GetYearFromHyphenDate, HyphenDateToUnixTime, MaybeGetDayOfMonthNumberFromHyphenDate, MaybeGetMonthNumberFromHyphenDate, UnixTimeToHyphenDate } from "./HyphenatedDate";
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

/** Returns how the targetTime relates to the reference time (current time). For example "5 days ago" or "60 seconds from now" If not referenceTime is not defined, defaults to the current unix time. */
export function UnixTimeToRelativeEnglishPhrase(targetTime:number,referenceTime?:number){
    referenceTime = referenceTime ?? GetCurrentUnixTime();
    if(targetTime===referenceTime){
        return "now";
    }
    if(targetTime < referenceTime){
        return _UnixTimeToEnglishAgoString(targetTime,referenceTime);
    }
    return _UnixTimeToEnglishFromNowString(targetTime,referenceTime)
}
function _UnixTimeToEnglishFromNowString(targetTime:number,referenceTime:number){
    const secondsFromNow = targetTime-referenceTime;
    if(secondsFromNow<60){
        return `${secondsFromNow} seconds from now`;
    }
    const minutesFromNow = Math.round(secondsFromNow/60);
    if(minutesFromNow < 60){
        return `${minutesFromNow} minutes from now`;
    }
    const hoursFromNow = Math.round(minutesFromNow/60);
    if(hoursFromNow < 24){
        return `${hoursFromNow} hours from now`;
    }
    const startDate = UnixTimeToHyphenDate(referenceTime);
    const endDate = UnixTimeToHyphenDate(targetTime);

    const yearsFromNow =  GetDifferenceYearsBetweenHyphenDates(endDate,startDate);
    const monthsFromNow = GetDifferenceMonthsFromHyphenDate(endDate,startDate);
    if(monthsFromNow<1){
        const daysFromNow = Math.round(hoursFromNow/24);
        return `${daysFromNow} days from now`;
    }
    if(yearsFromNow < 1){
        return `${monthsFromNow} months from now`;
    }
    return `${yearsFromNow} years from now`;
}
function _UnixTimeToEnglishAgoString(targetTime:number,referenceTime:number){
    const secondsAgo = referenceTime-targetTime;
    if(secondsAgo<60){
        return `${secondsAgo} seconds ago`;
    }
    const minutesAgo = Math.round(secondsAgo/60);
    if(minutesAgo < 60){
        return `${minutesAgo} minutes ago`;
    }
    const hoursAgo = Math.round(minutesAgo/60);
    if(hoursAgo < 24){
        return `${hoursAgo} hours ago`;
    }
    const startDate = UnixTimeToHyphenDate(targetTime);
    const endDate = UnixTimeToHyphenDate(referenceTime);

    const yearsAgo =  GetDifferenceYearsBetweenHyphenDates(endDate,startDate);
    const monthsAgo = GetDifferenceMonthsFromHyphenDate(endDate,startDate);
    if(monthsAgo<1){
        const daysAgo = Math.round(hoursAgo/24);
        return `${daysAgo} days ago`;
    }
    if(yearsAgo < 1){
        return `${monthsAgo} months ago`;
    }
    return `${yearsAgo} years ago`;
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