import { Box } from "../away/Box";
import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { AlphanumericCharacters } from "./CommonCharsets";
import { Strings } from "./Strings";

export class NonEmptyAlphaNumericStringBox extends Box<string>{
    private readonly __NonEmptyAlphaNumericStringBox__:undefined;
    
    constructor(data:string,onInvalidData:OnException){
        Expect(
            data.length,
            `data: length cannot be 0`,
            onInvalidData
        );
        Expect(
            Strings.IsInCharset(data,AlphanumericCharacters),
            `data: not alphabetic`,
            onInvalidData
        );
        super(data);
    }
    
}