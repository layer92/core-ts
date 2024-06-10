import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

/** Holds a string in the form username:password */
export function ExpectBasicCredentialsString(data:string,onFail?:OnException){
    Expect(data.includes(":"),`Expected ":"`,onFail);
}

export function MakeBasicCredentialsString(id:string,password:string){
    return `${id}:${password}`;
}
