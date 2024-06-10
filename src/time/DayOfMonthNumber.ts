import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

export function ExpectDayOfMonthNumber(data:number,onValidationFail?:OnException){
    Expect(!isNaN(data),`data: not a number.`,onValidationFail);
}

export function JsDateToDayOfMonthNumber(date: Date) {
    const dayOfMonthNumber = date.getUTCDate();
    ExpectDayOfMonthNumber(dayOfMonthNumber);
    return dayOfMonthNumber;
}

export function StringToDayOfMonthNumber(DD: string, onInvalidData?:OnException) {
    const dayOfMonthNumber = parseInt(DD);
    ExpectDayOfMonthNumber(dayOfMonthNumber,onInvalidData);
    return dayOfMonthNumber;
}