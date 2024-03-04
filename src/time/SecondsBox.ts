import { Box } from "../away/Box";

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

    static FromMilliseconds(ms:number){
        return new SecondsBox(ms/1000);
    }
}