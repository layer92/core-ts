import { Box } from "../away/Box";
import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { AuthenticationHeaderBox } from "./AuthorizationHeaderBox";

/** Holds a string in the form username:password */
export class BasicCredentialsStringBox extends Box<string>{
    private readonly __BasicCredentialsString__:undefined;
    constructor(data:string,onValidationFail?:OnException){
        Expect(data.includes(":"),`Expected ":"`,onValidationFail);
        super(data);
    }
    static Make({
        id,
        password
    }:{
        id:string,
        password:string,
    }){
        return new BasicCredentialsStringBox(id+":"+password);
    }

    toBasicAuthorizationHeader(){
        return AuthenticationHeaderBox.FromBasicCredentialsStringBox(this);
    }
}