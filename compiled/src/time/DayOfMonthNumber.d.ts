import { OnException } from "../away/OnException";
export declare function ExpectDayOfMonthNumber(data: number, onValidationFail?: OnException): void;
export declare function JsDateToDayOfMonthNumber(date: Date): number;
export declare function StringToDayOfMonthNumber(DD: string, onInvalidData?: OnException): number;
