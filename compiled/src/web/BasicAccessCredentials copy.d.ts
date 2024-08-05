import { OnException } from "../away/OnException";
/**
 * Holds a string in the form username:password
 * See https://en.wikipedia.org/wiki/Basic_access_authentication
 *  */
export declare function ExpectBasicAccessCredentials(credentials: string, onFail?: OnException): void;
export declare function MakeBasicAccessCredentials(id: string, password: string): string;
export declare function GetIdFromBasicAccessCredentials(credentials: string): string;
export declare function GetPasswordFromBasicAccessCredentials(credentials: string): string;
