import { OnException } from "../away/OnException";
/**
 * A string in the form "Type value", eg "Basic username:password" or "Bearer foo"
 * Despite going into the "Authorization" header of an HTTP request, this header is actually used for authentication, so that's what we're calling it.
 * */
export type AuthenticationHeader = string;
export declare function ExpectAuthenticationHeader(data: string, onFail?: OnException): void;
export declare function BasicCredentialsStringToAuthenticationHeader(basicCredentialsString: string): string;
