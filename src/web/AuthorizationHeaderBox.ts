import { Box } from "../away/Box";
import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { BasicCredentialsStringBox } from "./BasicCredentialsStringBox";

/**
 * A string in the form "Type value", eg "Basic username:password" or "Bearer foo"
 * Despite going into the "Authorization" header of an HTTP request, this header is actually used for authentication, so that's what we're calling it.
 * */
export class AuthenticationHeaderBox extends Box<string>{
    private readonly __AuthorizationHeaderBox__:undefined;
    constructor(data:string,onFail?:OnException){
        Expect(data.includes(" "),`Expected " "`,onFail);
        super(data);
    }

    static FromBasicCredentialsStringBox(credentialsStringBox:BasicCredentialsStringBox){
        return new AuthenticationHeaderBox("Basic "+credentialsStringBox.getData());
    }
}