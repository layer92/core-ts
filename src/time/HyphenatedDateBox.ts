import { OnException } from "../away/OnException";
import { Box } from "../away/Box";
import { Expect } from "../away/Expect";
import { YearBox } from "./YearBox";
import { MonthNumberBox } from "./MonthNumberBox";
import { DayOfMonthNumberBox } from "./DayOfMonthNumberBox";
import { SecondsBox } from "./SecondsBox";
import { UnixTimeBox } from "./UnixTimeBox";
import { NumericCharacters } from "../strings/CommonCharsets";
import { Strings } from "../strings/Strings";

/**
 * basically a subset of https://en.wikipedia.org/wiki/ISO_8601, with only support for year, month, and date, and hyphen required.
 * Strings in forms such as:
 * - "2023"
 * - "2023-01"
 * - "2023-01-01"
*/
export class HyphenatedDateBox extends Box<string>{
    private HyphenatedDateBox:undefined;

    constructor(
        data:string,
        onValidationFail?:OnException,
    ){
        Expect(data,``,onValidationFail);
        Expect(data.includes("-"),`data: expected a hyphen-delimited string: ${data}`,onValidationFail);
        const [yyyy,mm,dd] = data.split("-");
        Expect(yyyy.length===4,`data: did not begin with 4-digit year component: ${data}`,onValidationFail);
        Expect(mm===undefined||mm.length===2,`data: month component was not 2 digits long: ${data}`,onValidationFail);
        Expect(dd===undefined||dd.length===2,`data: day component was not 2 digits long: ${data}`,onValidationFail);
        Expect(Strings.IsInCharset(yyyy,NumericCharacters),`data: year (${yyyy}) is not a numeric value: ${data}`,onValidationFail);
        Expect(Strings.IsInCharset(mm,NumericCharacters),`data: month (${mm}) is not a numeric value: ${data}`,onValidationFail);
        Expect(Strings.IsInCharset(dd,NumericCharacters),`data: day (${dd}) is not a numeric value: ${data}`,onValidationFail);
        super(data);
        Expect(!isNaN(this.toDate().getTime()),`data: Invalid date.`,onValidationFail);
    }

    toDate(){
        return new Date(this._data);
    }

    /** Returns unix time: the number of seconds since Jan 1 1970     */
    toUnixTime(){
        return new Date(this._data).getTime() / 1000;
    }

    toUnixTimeBox(){
        return new UnixTimeBox(this.toUnixTime());
    }

    plusDays(days:number){
        const date = this.toDate();
        // a negative or overflow dateOfMonth value here will cause the month to decrement/increment accordingly
        date.setDate(date.getDate()+days);
        return HyphenatedDateBox.FromDate(date);
    }
    plusWeekdays(weekdays:number){
        // TODO: this a naive implementation - perform more efficiently by creating HyphenatedDateBox.FromUnixWeekDays()
        let result = new HyphenatedDateBox(this.getData());
        if(weekdays===0){
            return this;   
        }
        let sanityCheckCounter = weekdays*2;
        while(weekdays>0&&--sanityCheckCounter>0){
            result = result.plusDays(1);
            if(result.getDifferenceWeekdays(this)===weekdays){
                return result;
            }
        }
        while(weekdays<0&&--sanityCheckCounter>0){
            result = result.plusDays(-1);
            if(result.getDifferenceWeekdays(this)===weekdays){
                return result;
            }
        }
        throw new Error();
    }

    plusMonths(months:number){
        const date = this.toDate();
        date.setMonth(date.getMonth()+months);
        return HyphenatedDateBox.FromDate(date);
    }

    /** @returns returns the (integer) difference in days between this date and the provided start date */
    getDifferenceDays(startDate:HyphenatedDateBox){
        const differenceSeconds = this.toUnixTime()-startDate.toUnixTime();
        return new SecondsBox(differenceSeconds).toDays();
    }

    /** @returns returns the (integer) difference in weekdays between this date and the provided date. Calculates from 00:00 of each date, so the time inside of this date (the end date) is excluded.  */
    getDifferenceWeekdays(startDate:HyphenatedDateBox){
        return this.toUnixWeekDays() - startDate.toUnixWeekDays();
    }

    /**
     * Functions exactly the same as the GETNETWORKDAYS() function in Excel/LibreOffice Calc/etc
     * @returns the number of workdays in the period, starting from this date (inclusive) and including the specified end date.
     * 
     * */
    getNetWorkDays(afterEndDate:HyphenatedDateBox){
        const afterEndDateSeconds = afterEndDate.toUnixTime()+SecondsBox.FromDays(1).getData()
        afterEndDate = HyphenatedDateBox.FromUnixTime(afterEndDateSeconds);
        // TODO: implement a holidays list, removing 1 for each holiday that's inside the range (dont repeat over years, as some holidays were invented in the 2010s, etc...)
        return afterEndDate.toUnixWeekDays() - this.toUnixWeekDays();
    }

    /** Returns the number of weekdays that have passed since the Unix epoch (a Thursday) */
    toUnixWeekDays(){
        const days = this.toUnixTimeBox().toSecondsBox().toDays();
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


    getYear(){  
        const raw = this.getUndelimitedString();
        const yyyy = raw.slice(0,4);
        const yearNumber = parseInt(yyyy);
        return yearNumber;
    }

    getYearBox(){
        return new YearBox(this.getYear(),()=>{});
    }

    maybeGetMonthNumber(){
        const raw = this.getUndelimitedString();
        if(raw.length<=4){
            return undefined;
        }
        const mm = raw.slice(4,6);
        const monthNumber = parseInt(mm);
        return monthNumber;
    }

    maybeGetMonthNumberBox(){
        const monthNumber = this.maybeGetMonthNumber();
        if(monthNumber===undefined){
            return undefined;
        }
        return new MonthNumberBox(monthNumber,()=>{});
    }

    maybeGetDayOfMonthNumber(){
        const raw = this.getUndelimitedString();
        if(raw.length<=6){
            return undefined;
        }
        const dd = raw.slice(6,8);
        const dayNumber = parseInt(dd);
        return dayNumber;
    }

    setDayOfMonthNumber(dayOfMonthNumber:number){
        const date = this.toDate();
        date.setDate(dayOfMonthNumber);
        return HyphenatedDateBox.FromDate(date);
    }

    maybeGetDayOfMonthNumberBox(){
        const dayOfMonthNumber = this.maybeGetDayOfMonthNumber();
        if(dayOfMonthNumber===undefined){
            return undefined;
        }
        return new DayOfMonthNumberBox(dayOfMonthNumber,()=>{});
    }

    static FromUnixTime(seconds:number){
        const date = new Date(1000*seconds);
        return HyphenatedDateBox.FromDate(date);
    }

    static FromDate(date: Date) {
        const year = date.getUTCFullYear();
        const yyyy = ("0000"+year).slice(-4);
        const monthNumber = date.getUTCMonth()+1;
        const mm = ("00"+monthNumber).slice(-2);
        const dayOfMonthNumber = date.getDate();
        const dd = ("00"+dayOfMonthNumber).slice(-2);
        return new HyphenatedDateBox(`${yyyy}-${mm}-${dd}`,()=>{});
    }

    private getUndelimitedString(){
        return Strings.RemoveCharacters(this._data,"-");
    }

    static LaterOf(a:HyphenatedDateBox,b:HyphenatedDateBox){
        if(a.toUnixTime()>=b.toUnixTime()){
            return a;
        }
        return b;
    }
    static EarlierOf(a:HyphenatedDateBox,b:HyphenatedDateBox){
        if(a.toUnixTime()<=b.toUnixTime()){
            return a;
        }
        return b;
    }

    toAmericanSlashString(){
        const year = this.getYear();
        const month = this.maybeGetMonthNumber();
        const day = this.maybeGetDayOfMonthNumber();
        return `${month}/${day}/${year}`;
    }

    /** The clearest way to write a day (in English) such that it isn't misinterpreted, regardless of which culture the reader comes from. */
    toExplicitString(){
        const monthBox = this.maybeGetMonthNumberBox();
        let result = monthBox ? monthBox.toEnglishMonthName() : ``;
        const dayOfMonthNumberBox = this.maybeGetDayOfMonthNumberBox();
        if(dayOfMonthNumberBox){
            Expect(monthBox,`Cannot make a clear string from this date: ${this._data}`);
            result += ` `+dayOfMonthNumberBox.toEnglishString();
        }
        result += `, ${this.getYear()}`;
        return result;
    }
}
