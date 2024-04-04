import { OnException } from "../away/OnException";
import { UrlBox } from "./UrlBox";
export declare class UrlEndingInSlashBox extends UrlBox {
    private UrlEndingInSlashBox;
    constructor(data: string, onValidationFail?: OnException);
}
