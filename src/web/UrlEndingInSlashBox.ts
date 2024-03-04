import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { UrlBox } from "./UrlBox";

export class UrlEndingInSlashBox extends UrlBox{
    private UrlEndingInSlashBox:undefined;
    
    constructor(
        data:string,
        onValidationFail?:OnException,
    ){
        Expect(data.endsWith("/"),`data: expected data to end with "/": ${data}`,onValidationFail);
        super(data,onValidationFail);
    }
}