import { PadNumberLeft } from "../strings/Strings";

export function FromWeeks(weeks:number) {
    return DaysToSeconds(weeks*7);
}

export function SecondsToWeeks(seconds:number){
    return SecondsToDays(seconds)/7;
}

export function SecondsToDays(seconds:number){
    return SecondsToHours(seconds)/24;
}

export function DaysToSeconds(days:number){
    return HoursToSeconds(days*24);
}

export function SecondsToHours(seconds:number){
    return SecondsToMinutes(seconds)/60;
}

export function HoursToSeconds(hours:number){
    return MinutesToSeconds(hours*60);
}

export function SecondsToMinutes(seconds:number){
    return seconds/60;
}

export function MinutesToSeconds(minutes:number){
    return minutes*60;
}

export function SecondsToMilliseconds(seconds:number){
    return seconds*1000;
}

/** will return something like 24 seconds, 3 minutes, 4 days, etc... depending on the length of time */
export function SecondsToEnglishApproximateTimeString(seconds:number){
    let unit:string;
    let value:number;
    if(seconds < 60){
        unit = "second";
        value = seconds;
    }else if(SecondsToMinutes(seconds)<60){
        unit = "minute";
        value = Math.floor(SecondsToMinutes(seconds));
    }else if(SecondsToDays(seconds)<1){
        unit = "hour";
        value = Math.floor(SecondsToHours(seconds));
    }else{
        unit = "day";
        value = Math.floor(SecondsToDays(seconds));
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
export function SecondsToTypicalHoursMinutesSecondsString(seconds:number){
    const hours = Math.floor(SecondsToHours(seconds));
    const minutesRemainder = Math.floor(SecondsToMinutes(seconds)) - hours*60;
    const secondsRemainder = Math.floor(seconds) - minutesRemainder*60;
    let result = PadNumberLeft(secondsRemainder,2);
    if(hours>0){
        result = hours+":"+PadNumberLeft(minutesRemainder,2)+":"+result;
    }else if(minutesRemainder>0){
        result = minutesRemainder+":"+result;
    }else{
        result = "0:"+result;
    }
    return result;
}

export function MillisecondsToSeconds(ms:number){
    return ms/1000;
}