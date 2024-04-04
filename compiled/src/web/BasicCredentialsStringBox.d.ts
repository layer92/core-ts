import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
import { AuthenticationHeaderBox } from "./AuthorizationHeaderBox";
/** Holds a string in the form username:password */
export declare class BasicCredentialsStringBox extends Box<string> {
    private readonly __BasicCredentialsString__;
    constructor(data: string, onValidationFail?: OnException);
    static Make({ id, password }: {
        id: string;
        password: string;
    }): BasicCredentialsStringBox;
    toBasicAuthorizationHeader(): AuthenticationHeaderBox;
}
