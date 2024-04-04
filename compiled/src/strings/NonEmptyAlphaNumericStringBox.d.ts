import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
export declare class NonEmptyAlphaNumericStringBox extends Box<string> {
    private readonly __NonEmptyAlphaNumericStringBox__;
    constructor(data: string, onInvalidData: OnException);
}
