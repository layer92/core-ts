import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

export function NonEmptyStringBox(data:string,onInvalidData:OnException){
    Expect(
        data.length,
        `data: length cannot be 0`,
        onInvalidData
    );
}
