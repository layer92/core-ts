import { OnException } from "../away/OnException";
import { Box } from "../away/Box";
export declare class NonEmptyAlphabeticStringBox extends Box<string> {
    private readonly __NonEmptyAlphabeticStringBox__;
    constructor(data: string, onInvalidData: OnException);
}
