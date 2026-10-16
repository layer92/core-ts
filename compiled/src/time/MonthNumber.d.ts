import { OnException } from "../away/OnException";
export declare const LowercaseThreeLetterMonthStrings: readonly ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
export declare const ThreeLetterMonthStrings: readonly ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
export type LowercaseThreeLetterMonthString = typeof LowercaseThreeLetterMonthStrings[number];
export declare const MonthNames: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** DEPRECATED - use MonthNames */
export declare const EnglishMonthNames: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export type MonthName = typeof MonthNames[number];
/** DEPRECATED - use MonthName */
export type EnglishMonthName = MonthName;
/** 1-12 */
export declare function ExpectMonthNumber(monthNumber: number, onBadData?: OnException): void;
export declare function GetMonthNumberFromJsDate(date: Date): number;
export declare function StringToMonthNumber(MM: string, onBadData?: OnException): number;
/** DEPRECATED - use ThreeLetterMonthStringToMonthNumber */
export declare function ThreeLetterEnglishMonthStringToMonthNumber(month3: string, onBadData?: OnException): number;
export declare function ThreeLetterMonthStringToMonthNumber(month3: string, onBadData?: OnException): number;
export declare function MonthNumberToMonthIndex(monthNumber: number): number;
/** DEPRECATED - use MonthNumberToMonthName */
export declare function MonthNumberToEnglishMonthName(monthNumber: number): "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
export declare function MonthNumberToMonthName(monthNumber: number): "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
