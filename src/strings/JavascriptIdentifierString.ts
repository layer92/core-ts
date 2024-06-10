import { Expect } from "../away/Expect";
import { NumericCharacters, JavascriptIdentifierCharacters } from "./CommonCharsets";
import { IsInCharset } from "./Strings";

export function ExpectJavascriptIdentifierString(data:string){
    Expect(
        data.length,
        `data: length cannot be 0`
    );
    Expect(
        !IsInCharset(data[0],NumericCharacters),
        `data: cannot start with a number: `+data
    );
    Expect(
        IsInCharset(data,JavascriptIdentifierCharacters),
        `data: invalid character(s): `+data
    );
}