import { Box } from "../away/Box";
import { Expect } from "../away/Expect";
import { NumericCharacters, JavascriptIdentifierCharacters } from "./CommonCharsets";
import { Strings } from "./Strings";

export class JavascriptIdentifierStringBox extends Box<string>{
    private readonly __JavascriptIdentifierStringBox__:undefined;
    
    constructor(data:string){
        Expect(
            data.length,
            `data: length cannot be 0`
        );
        Expect(
            !Strings.IsInCharset(data[0],NumericCharacters),
            `data: cannot start with a number: `+data
        );
        Expect(
            Strings.IsInCharset(data,JavascriptIdentifierCharacters),
            `data: invalid character(s): `+data
        );
        super(data);
    }
    
}