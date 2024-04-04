import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
export declare const LowercaseThreeLetterMonthStrings: readonly ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
export declare const ThreeLetterMonthStrings: readonly ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
export type LowercaseThreeLetterMonthString = typeof LowercaseThreeLetterMonthStrings[number];
export declare const EnglishMonthNames: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export type EnglishMonthName = typeof EnglishMonthNames[number];
/** 1-12 */
export declare class MonthNumberBox extends Box<number> {
    private __MonthNumberBox__;
    constructor(monthNumberData: number, onValidationFail?: OnException);
    static MakeFromDate(date: Date): MonthNumberBox;
    static FromString(MM: string, onBadData?: OnException): MonthNumberBox;
    static MakeFromThreeLetterEnglishMonthString(month3: string, onBadData?: OnException): MonthNumberBox;
    /** 0-11 */
    getMonthIndex(): number;
    toPaddedString(length?: number): string;
    toEnglishMonthName(): "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
}
