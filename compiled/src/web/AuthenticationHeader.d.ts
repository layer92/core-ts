import { OnException } from "../away/OnException";
/**
 * A string in the form "Type value", eg "Basic username:password" or "Bearer foo"
 * Despite going into the "Authorization" header of an HTTP request, this header is actually used for authentication, so that's what we're calling it.
 * */
export type AuthenticationHeader = string;
export declare function ExpectAuthenticationHeader(authneticationHeader: string, onFail?: OnException): void;
/** eg "username:password" becomes "Basic username:password" */
export declare function BasicCredentialsStringToAuthenticationHeader(basicCredentialsString: string): string;
/** eg token "foo" becomes "Bearer foo" */
export declare function BearerTokenToAuthenticationHeader(token: string): string;
/** Returns the part of the header such as "Basic" or "Bearer" */
export declare function GetCredentialTypeFromAuthenticationHeader(header: string): string;
/** Returns the part that is usually a token, username:password, etc */
export declare function GetCredentialDataFromAuthenticationHeader(header: string): string;
