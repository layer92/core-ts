import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { AlphebeticCharacters } from "./CommonCharsets";
import { IsInCharset } from "./Strings";

export function ExpectNonEmptyAlphabeticString(data:string,onInvalidData:OnException){
    Expect(
        data.length,
        `data: length cannot be 0`,
        onInvalidData
    );
    Expect(
        IsInCharset(data,AlphebeticCharacters),
        `data: not alphabetic`,
        onInvalidData
    );
}
