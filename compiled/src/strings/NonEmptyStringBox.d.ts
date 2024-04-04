import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
export declare class NonEmptyStringBox extends Box<string> {
    private readonly __NonEmptyStringBox__;
    constructor(data: string, onInvalidData: OnException);
}
