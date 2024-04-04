import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
export declare class YearBox extends Box<number> {
    private __YearBox__;
    constructor(data: number, onValidationFail?: OnException);
    static FromString(yyyy: string, onBadData?: OnException): YearBox;
    static MakeFromDate(date: Date): YearBox;
    toPaddedString(length?: number): string;
}
