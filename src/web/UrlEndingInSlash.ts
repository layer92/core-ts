import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { ExpectUrl } from "./Url";

export function ExpectUrlEndingInSlash(
        url:string,
        onBadData?:OnException,
){
    ExpectUrl(url,onBadData);
    Expect(url.endsWith("/"),()=>`data: expected data to end with "/": ${url}`,onBadData);
}