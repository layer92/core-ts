import { OnException } from "../away/OnException";
/** Holds a string in the form username:password */
export declare function ExpectBasicCredentialsString(data: string, onFail?: OnException): void;
export declare function MakeBasicCredentialsString(id: string, password: string): string;
