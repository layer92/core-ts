import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
export declare class DayOfMonthNumberBox extends Box<number> {
    private __DayOfMonthNumberBox__;
    constructor(data: number, onValidationFail?: OnException);
    static MakeFromDate(date: Date): DayOfMonthNumberBox;
    toPaddedString(length?: number): string;
    /** will return 1st, 2nd, 3rd, etc... */
    toEnglishString(): string;
    private _getEnglishEnding;
    static FromString(DD: string, onInvalidData?: OnException): DayOfMonthNumberBox;
}
