import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { AlphanumericCharacters } from "./CommonCharsets";
import { IsInCharset } from "./Strings";

export function ExpectNonEmptyAlphaNumericString(data:string,onInvalidData:OnException){
    Expect(
        data.length,
        `data: length cannot be 0`,
        onInvalidData
    );
    Expect(
        IsInCharset(data,AlphanumericCharacters),
        `data: not alphabetic`,
        onInvalidData
    );
}