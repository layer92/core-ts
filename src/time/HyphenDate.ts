import { OnException } from "../away/OnException";
import { Expect } from "../away/Expect";
import { NumericCharacters } from "../strings/CommonCharsets";
import { IsInCharset, PadNumberLeft, RemoveCharacters } from "../strings/Strings";
import { GetMonthNumberFromJsDate } from "./MonthNumber";
import { DaysToSeconds, SecondsToDays } from "./Seconds";
import { JsDateToUnixTime, UnixTimeToJsDate } from "./UnixTime";
import { GetYearFromJsDate } from "./Year";
import { JsDateToDayOfMonthNumber } from "./DayOfMonthNumber";

/**
 * basically a subset of https://en.wikipedia.org/wiki/ISO_8601, with only support for year, month, and date, and hyphen required.
 * Strings in forms such as:
 * - "2023"
 * - "2023-01"
 * - "2023-01-01"
*/
export function ExpectHyphenDate(data:string,onBadData?:OnException,options?:{
    forbidEmptyMonthNumber?:true,
    forbidEmptyDayOfMonth?:true,
}){
    Expect(data,``,onBadData);
    Expect(data.includes("-"),`Expected a hyphen-delimited string: ${data}`,onBadData);
    const [yyyy,mm,dd] = data.split("-");
    // The year must be four characters long, as per https://en.wikipedia.org/wiki/ISO_8601#Years in the basic representation
    Expect(yyyy.length===4,`Did not begin with 4-digit year component: ${data}`,onBadData);

    // ISO 8601 specifies two characters for mm and dd, eg "02" for February, never "2", see: https://en.wikipedia.org/wiki/ISO_8601
    const emptyMonthCheckSuccess = mm!==undefined||!options?.forbidEmptyMonthNumber;
    Expect(emptyMonthCheckSuccess && mm?.length==2,`Month component was not 2 digits long: ${data}`,onBadData);
    const emptyDayOfMonthCheckSuccess = dd!==undefined||!options?.forbidEmptyDayOfMonth;
    Expect(emptyDayOfMonthCheckSuccess && dd?.length===2,`Day component was not 2 digits long: ${data}`,onBadData);

    Expect(IsInCharset(yyyy,NumericCharacters),`Year (${yyyy}) is not a numeric value: ${data}`,onBadData);
    Expect(IsInCharset(mm,NumericCharacters),`Month (${mm}) is not a numeric value: ${data}`,onBadData);
    Expect(IsInCharset(dd,NumericCharacters),`Day (${dd}) is not a numeric value: ${data}`,onBadData);
    Expect(!isNaN(new Date(data).getTime()),`Invalid date.`,onBadData);
}

export function HyphenDateToJsDate(hyphenDate:string){
    ExpectHyphenDate(hyphenDate);
    return new Date(hyphenDate);
}


/**
 * Throws an error if there is no month/day in the hyphenated string, unless you specifically allow for it.
 */
export function HyphenDateToUnixTime(
    hyphenDate:string,
    options?:{
        onBadData:OnException,
    }
){
    ExpectHyphenDate(hyphenDate,options?.onBadData);
    const jsDate = HyphenDateToJsDate(hyphenDate);
    return JsDateToUnixTime(jsDate);
}

/** Adds days to the hyphen date. You can supply a negative number to subtract. */
export function AddDaysToHyphenDate(hyphenDate:string,days:number){
    const jsDate = HyphenDateToJsDate(hyphenDate);
    // a negative or overflow dateOfMonth value here will cause the month to decrement/increment accordingly
    jsDate.setUTCDate(jsDate.getUTCDate()+days);
    return JsDateToHyphenDate(jsDate);
}

/** Adds weekdays to the hyphen date. You can supply a negative number to subtract. */
export function AddWeekdaysToHyphenDate(hyphenDate:string,weekdays:number){
    ExpectHyphenDate(hyphenDate);
    // TODO: this a naive implementation - perform more efficiently by creating HyphenDateBox.FromUnixWeekDays()
    let result = hyphenDate;
    if(weekdays===0){
        return this;   
    }
    let sanityCheckCounter = weekdays*2;
    while(weekdays>0&&--sanityCheckCounter>0){
        result = AddDaysToHyphenDate(result,1);
        if(GetDifferenceWeekdaysBetweenHyphenDates(result,hyphenDate)===weekdays){
            return result;
        }
    }
    while(weekdays<0&&--sanityCheckCounter>0){
        result = AddDaysToHyphenDate(result,-1);
        if(GetDifferenceWeekdaysBetweenHyphenDates(result,hyphenDate)===weekdays){
            return result;
        }
    }
    throw new Error();
}

export function JsDateToHyphenDate(jsDate: Date) {
    const year = jsDate.getUTCFullYear();
    const yyyy = PadNumberLeft(year,4);
    const monthNumber = jsDate.getUTCMonth()+1;
    const mm = PadNumberLeft(monthNumber,2);
    const dayOfMonthNumber = jsDate.getUTCDate();
    const dd = PadNumberLeft(dayOfMonthNumber,2);
    return `${yyyy}-${mm}-${dd}`;
}

export function AddMonthsToHyphenDate(hyphenDate:string,months:number){
    ExpectHyphenDate(hyphenDate);
    const jsDate = HyphenDateToJsDate(hyphenDate);
    jsDate.setMonth(jsDate.getUTCMonth()+months);
    return JsDateToHyphenDate(jsDate);
}

/** @returns returns the (float) difference in days between this date and the provided start date */
export function GetDifferenceDaysBetweenHyphenDates(endDate:string,startDate:string){
    const differenceSeconds = HyphenDateToUnixTime(endDate) - HyphenDateToUnixTime(startDate);
    return SecondsToDays(differenceSeconds);
}

/** @returns returns the (float) difference in weekdays between this date and the provided date. Calculates from 00:00 of each date, so the time inside of this date (the end date) is excluded.  */
export function GetDifferenceWeekdaysBetweenHyphenDates(endDate:string,startDate:string){
    return HyphenDateToUnixWeekDays(endDate) - HyphenDateToUnixWeekDays(startDate);
}

/** WARNING: UNTESTED Returns the number of complete months that have elapsed from the startDate. A month is defined as when the same numeric date of the next month is reached, for example, February 15 is exactly 1 month after January 15. In a situation where the next date doesn't fall on the month, the first of the next month is treated as the day when the month elapses. For example, March 1 is exactly 1 month after January 30, and March 1 is exactly 1 month after January 31. */
export function GetDifferenceMonthsFromHyphenDate(endDate:string,startDate:string){
    ExpectHyphenDate(endDate);
    ExpectHyphenDate(startDate);
    if(HyphenDateToUnixTime(startDate)>HyphenDateToUnixTime(endDate)){
        return -GetDifferenceMonthsFromHyphenDate(startDate,endDate);
    }
    const startYear = GetYearFromHyphenDate(startDate);
    const endYear = GetYearFromHyphenDate(endDate);
    const startMonth = MaybeGetMonthNumberFromHyphenDate(startDate)||1;
    const endMonth = MaybeGetMonthNumberFromHyphenDate(endDate)||1;
    const startDayNumber = MaybeGetDayOfMonthNumberFromHyphenDate(startDate)||1;
    const endDayNumber = MaybeGetDayOfMonthNumberFromHyphenDate(endDate)||1;
    let months = (endYear-startYear)*12+(endMonth-startMonth);
    // eg if you started on January 15 and ended on February 14, that's not an entire month, so subtract 1 from the result to make up for calculating February(2)-January(1)
    if(endDayNumber<startDayNumber){
        months -= 1;
    }
    return months;
}

/** WARNING: UNTESTED Returns the number of complete years that have elapsed since the start date. A year is treated as when the same day of the same month has been reached, for example March 15 1991 is exactly 1 year after March 15 1990. In a situation where the next year doesn't have that date, full year has elapsed when the next date has been reached. For example, March 1, 1993 is exactly 1 year after February 29, 1992. March 1, 1993 is also exactly 1 year after March 1, 1992. */
export function GetDifferenceYearsBetweenHyphenDates(endDate:string,startDate:string){
    ExpectHyphenDate(endDate);
    ExpectHyphenDate(startDate);
    if(HyphenDateToUnixTime(startDate) > HyphenDateToUnixTime(endDate)){
        return -GetDifferenceYearsBetweenHyphenDates(startDate,endDate);
    }
    const startYear = GetYearFromHyphenDate(startDate);
    const endYear = GetYearFromHyphenDate(endDate);
    const startMonth = MaybeGetMonthNumberFromHyphenDate(startDate)||1;
    const endMonth = MaybeGetMonthNumberFromHyphenDate(endDate)||1;
    const startDayNumber = MaybeGetDayOfMonthNumberFromHyphenDate(startDate)||1;
    const endDayNumber = MaybeGetDayOfMonthNumberFromHyphenDate(endDate)||1;
    let years = endYear-startYear;
    const startDistanceIntoYear = startMonth*1000
    +startDayNumber;
    const endDistanceIntoYear = endMonth*1000+endDayNumber;
    // eg if you started on February 1990 and ended on January 1991, or started on January 2 1990 and ended on January 1 1991, that's not an entire year, so subtract 1 from the result to make up for it.
    if(endDistanceIntoYear<startDistanceIntoYear){
        years -= 1;
    }
    return years;
}

/**
 * Functions exactly the same as the GETNETWORKDAYS() function in Excel/LibreOffice Calc/etc
 * @returns the number of workdays in the period, starting from this date (inclusive) and including the specified end date.
 * 
 * */
export function GetNetWorkDaysBetweenHyphenDates(startDate:string,afterEndDate:string){
    ExpectHyphenDate(startDate);
    ExpectHyphenDate(afterEndDate);
    const afterEndDateSeconds = HyphenDateToUnixTime(afterEndDate)+DaysToSeconds(1)
    afterEndDate = UnixTimeToHyphenDate(afterEndDateSeconds);
    // TODO: implement a holidays list, removing 1 for each holiday that's inside the range (dont repeat over years, as some holidays were invented in the 2010s, etc...)
    return HyphenDateToUnixWeekDays(afterEndDate) - HyphenDateToUnixWeekDays(startDate);
}

/** Returns the number of weekdays that have passed since the Unix epoch (a Thursday) */
export function HyphenDateToUnixWeekDays(hyphenDate:string){
    const unixTime = HyphenDateToUnixTime(hyphenDate);
    const days = SecondsToDays(unixTime);
    const weeksQuotient = Math.floor(days/7);
    const daysRemainder = days%7;
    // each entire passed week is worth 5 weekdays
    const daysFromQuotient = weeksQuotient*5;
    // the first week of unix time:
    // name remainder -> weekdays passed (remainder part)
    // Thu 0 -> 0
    // Fri 1 -> 1
    // Sat 2 -> 2
    // Sun 3 -> 2
    // Mon 4 -> 2
    // Tue 5 -> 3
    // Wed 6 -> 4
    // Thu 0 -> 0
    const daysFromRemainder = [0,1,2,2,2,3,4][daysRemainder];
    return daysFromQuotient+daysFromRemainder;
}


export function GetYearFromHyphenDate(hyphenDate:string){  
    const raw = HyphenDateToUndelimitedString(hyphenDate);
    const yyyy = raw.slice(0,4);
    const yearNumber = parseInt(yyyy);
    return yearNumber;
}

export function MaybeGetMonthNumberFromHyphenDate(hyphenDate:string){
    const raw = HyphenDateToUndelimitedString(hyphenDate);
    if(raw.length<=4){
        return undefined;
    }
    const mm = raw.slice(4,6);
    const monthNumber = parseInt(mm);
    return monthNumber;
}

export function MaybeGetDayOfMonthNumberFromHyphenDate(hyphenDate:string){
    const raw = HyphenDateToUndelimitedString(hyphenDate);
    if(raw.length<=6){
        return undefined;
    }
    const dd = raw.slice(6,8);
    const dayNumber = parseInt(dd);
    return dayNumber;
}

export function SetHyphenDateDayOfMonthNumber(hyphenDate:string,dayOfMonthNumber:number){
    const date = HyphenDateToJsDate(hyphenDate);
    date.setDate(dayOfMonthNumber);
    return JsDateToHyphenDate(date);
}

export function UnixTimeToHyphenDate(seconds:number){
    const jsDate = new Date(1000*seconds);
    return JsDateToHyphenDate(jsDate);
}

function HyphenDateToUndelimitedString(hyphenDate:string){
    ExpectHyphenDate(hyphenDate);
    return RemoveCharacters(hyphenDate,"-");
}

export function GetLatestHyphenDate(a:string,b:string){
    if(HyphenDateToUnixTime(a)>=HyphenDateToUnixTime(b)){
        return a;
    }
    return b;
}
export function GetEarliestHyphenDate(a:string,b:string){
    if(HyphenDateToUnixTime(a)<=HyphenDateToUnixTime(b)){
        return a;
    }
    return b;
}

export function HyphenDateToAmericanSlashDate(hyphenDate:string){
    const year = GetYearFromHyphenDate(hyphenDate);
    const month = MaybeGetMonthNumberFromHyphenDate(hyphenDate);
    const day = MaybeGetDayOfMonthNumberFromHyphenDate(hyphenDate);
    return `${month}/${day}/${year}`;
}


/**
 * Same as Javascript's date's UTCDay:
 * 0: Sunday
 * 1: Monday
 * 2: Tuesday
 * 3: Wednesday
 * 4: Thursday
 * 5: Friday
 * 6: Saturday
 **/
export function GetWeekdayIndexFromHyphenDate(hyphenDate:string){
    return HyphenDateToJsDate(hyphenDate).getUTCDay();
}

export function GetDayOfWeekEnglishNameFromHyphenDate(hyphenDate:string){
    const weekdayIndex= GetWeekdayIndexFromHyphenDate(hyphenDate);
    return (["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] as const)[weekdayIndex];
}

/** A 3-character abbreviation of the weekday. */
export function GetDayOfWeekEnglishAbbreviationFromHyphenDate(hyphenDate:string){
    const weekdayIndex= GetWeekdayIndexFromHyphenDate(hyphenDate);
    return (["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] as const)[weekdayIndex];
}

export function GetDayOfWeekJapaneseAbbreviationFromHyphenDate(hyphenDate:string){
    const weekdayIndex= GetWeekdayIndexFromHyphenDate(hyphenDate);
    return (["日","月","火","水","木","金","土"] as const)[weekdayIndex];
}


/** Eg, if it's the first friday of the month, returns 1, if it's the 3rd thursday, returns 3*/
export function GetWeekdayOrdinalInMonth(hyphenDate:string){
    let count = 0;
    const weekdayIndex = GetWeekdayIndexFromHyphenDate(hyphenDate);
    const monthNumber = MaybeGetMonthNumberFromHyphenDate(hyphenDate);
    Expect(monthNumber);
    while( MaybeGetMonthNumberFromHyphenDate(hyphenDate) == monthNumber ){
        if( GetWeekdayIndexFromHyphenDate(hyphenDate) === weekdayIndex){
            ++count;
        }
        hyphenDate = AddDaysToHyphenDate(hyphenDate,-1);
    }
    return count;
}