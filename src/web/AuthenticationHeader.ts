import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { ExpectBasicAccessCredentials } from "./BasicAccessCredentials";

/**
 * A string in the form "Type value", eg "Basic username:password" or "Bearer foo"
 * Despite going into the "Authorization" header of an HTTP request, this header is actually used for authentication, so that's what we're calling it.
 * */
export type AuthenticationHeader = string;

export function ExpectAuthenticationHeader(authneticationHeader:string,onFail?:OnException){
    Expect(authneticationHeader.includes(" "),`Expected " "`,onFail);
}

/** eg "username:password" becomes "Basic username:password" */
export function BasicCredentialsStringToAuthenticationHeader(basicCredentialsString:string){
    ExpectBasicAccessCredentials(basicCredentialsString);
    return `Basic ${basicCredentialsString}`;
}

/** eg token "foo" becomes "Bearer foo" */
export function BearerTokenToAuthenticationHeader(token:string){
    return `Bearer ${token}`;
}

/** Returns the part of the header such as "Basic" or "Bearer" */
export function GetCredentialTypeFromAuthenticationHeader(header:string){
    ExpectAuthenticationHeader(header);
    return header.split(" ")[0];
}

/** Returns the part that is usually a token, username:password, etc */
export function GetCredentialFromAuthenticationHeader(header:string){
    ExpectAuthenticationHeader(header);
    return header.split(" ")[1];
}