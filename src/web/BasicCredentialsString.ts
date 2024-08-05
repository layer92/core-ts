import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

/**
 * Holds a string in the form username:password
 * See https://en.wikipedia.org/wiki/Basic_access_authentication
 *  */
export function ExpectBasicCredentialsString(credentials:string,onFail?:OnException){
    const split = credentials.split(":")
    Expect(split.length===2,`Expected exactly one occurence of ":", in the form <id>:<password> for basic authentication credentials.`,onFail)
    const [id,password] = split;
    Expect(id?.length,`Basic authentication id cannot be empty. The header value should be in the form "Basic <id>:<password>"`,onFail);
    Expect(password?.length,`Basic authentication password cannot be empty. The header value should be in the form "Basic <id>:<password>"`,onFail);
}

export function MakeBasicCredentialsString(id:string,password:string){
    return `${id}:${password}`;
}

export function GetIdFromBasicCredentials(credentials:string){
    ExpectBasicCredentialsString(credentials);
    return credentials.split(":")[0];
}

export function GetPasswordFromBasicCredentials(credentials:string){
    ExpectBasicCredentialsString(credentials);
    return credentials.split(":")[1];
}