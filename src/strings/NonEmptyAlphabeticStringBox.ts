import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { Box } from "../away/Box";
import { Strings } from "./Strings";
import { AlphebeticCharacters } from "./CommonCharsets";

export class NonEmptyAlphabeticStringBox extends Box<string>{
    private readonly __NonEmptyAlphabeticStringBox__:undefined;
    
    constructor(data:string,onInvalidData:OnException){
        Expect(
            data.length,
            `data: length cannot be 0`,
            onInvalidData
        );
        Expect(
            Strings.IsInCharset(data,AlphebeticCharacters),
            `data: not alphabetic`,
            onInvalidData
        );
        super(data);
    }
    
}