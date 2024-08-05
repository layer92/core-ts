import { OnException } from "../away/OnException";
/**
 * Holds a string in the form username:password
 * See https://en.wikipedia.org/wiki/Basic_access_authentication
 *  */
export declare function ExpectBasicCredentialsString(credentials: string, onFail?: OnException): void;
export declare function MakeBasicCredentialsString(id: string, password: string): string;
export declare function GetIdFromBasicCredentials(credentials: string): string;
export declare function GetPasswordFromBasicCredentials(credentials: string): string;
