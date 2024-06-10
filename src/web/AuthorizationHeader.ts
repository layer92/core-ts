import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { ExpectBasicCredentialsString } from "./BasicCredentialsString";

/**
 * A string in the form "Type value", eg "Basic username:password" or "Bearer foo"
 * Despite going into the "Authorization" header of an HTTP request, this header is actually used for authentication, so that's what we're calling it.
 * */
export type AuthenticationHeader = string;

export function ExpectAuthenticationHeader(data:string,onFail?:OnException){
    Expect(data.includes(" "),`Expected " "`,onFail);
}

export function BasicCredentialsStringToAuthenticationHeader(basicCredentialsString:string){
    ExpectBasicCredentialsString(basicCredentialsString);
    return `Basic ${basicCredentialsString}`;
}
