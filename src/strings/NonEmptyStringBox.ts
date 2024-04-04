import { Box } from "../away/Box";
import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

export class NonEmptyStringBox extends Box<string>{
    private readonly __NonEmptyStringBox__:undefined;
    
    constructor(data:string,onInvalidData:OnException){
        Expect(
            data.length,
            `data: length cannot be 0`,
            onInvalidData
        );
        super(data);
    }
    
}