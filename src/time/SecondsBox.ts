import { Box } from "../away/Box";
import { PadLeft } from "../strings/Strings";

export class SecondsBox extends Box<number>{
    
    private __SecondsBox__:undefined;

    static FromWeeks(weeks:number) {
        return SecondsBox.FromDays(weeks*7);
    }

    toWeeks(){
        return this.toDays()/7;
    }

    toDays(){
        return this.toHours()/24;
    }

    static FromDays(days:number){
        return SecondsBox.FromHours(days*24);
    }

    toHours(){
        return this.toMinutes()/60;
    }

    static FromHours(hours:number){
        return SecondsBox.FromMinutes(hours*60);
    }

    toMinutes(){
        return this._data/60;
    }

    static FromMinutes(minutes:number){
        return new SecondsBox(minutes*60);
    }

    toMilliseconds(){
        return this._data*1000;
    }

    /** will return something like 24 seconds, 3 minutes, 4 days, etc... depending on the length of time */
    toEnglishApproximateTimeString(){
        const seconds = this._data;
        let unit:string;
        let value:number;
        if(seconds < 60){
            unit = "second";
            value = seconds;
        }else if(this.toMinutes()<60){
            unit = "minute";
            value = Math.floor(this.toMinutes());
        }else if(this.toDays()<1){
            unit = "hour";
            value = Math.floor(this.toHours());
        }else{
            unit = "day";
            value = Math.floor(this.toDays());
        }
        const isPlural = value>1||value===0;
        if(isPlural){
            unit += `s`;
        }
        return `${value} ${unit}`;
    }

    /**
     *  Returns hh:mm:ss, omitting hours if empty, not omitting minutes if not empty
     *  This is the same format found in several places, such as on Wikipedia when listing album length and track length.
     */
    toTypicalHoursMinutesSecondsString(){
        const hours = Math.floor(this.toHours());
        const minutes = Math.floor(this.toMinutes()) - hours*60;
        const seconds = Math.floor(this.getData()) - minutes*60;
        let result = PadLeft(""+seconds,"0",2);
        if(hours>0){
            result = hours+":"+PadLeft(""+minutes,"0",2)+":"+result;
        }else if(minutes>0){
            result = minutes+":"+result;
        }else{
            result = "0:"+result;
        }
        return result;
    }


    static FromMilliseconds(ms:number){
        return new SecondsBox(ms/1000);
    }
}