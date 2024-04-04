import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
import { BasicCredentialsStringBox } from "./BasicCredentialsStringBox";
/**
 * A string in the form "Type value", eg "Basic username:password" or "Bearer foo"
 * Despite going into the "Authorization" header of an HTTP request, this header is actually used for authentication, so that's what we're calling it.
 * */
export declare class AuthenticationHeaderBox extends Box<string> {
    private readonly __AuthorizationHeaderBox__;
    constructor(data: string, onFail?: OnException);
    static FromBasicCredentialsStringBox(credentialsStringBox: BasicCredentialsStringBox): AuthenticationHeaderBox;
}
