import { Box } from "../away/Box";
import { Strings } from "./Strings";

// TODO: finish
export class BbcodeStringBox extends Box<string>{
    private BbcodeStringBox:undefined;

    static MakeFromPlainText(text:string){
        const data = Strings.MultiReplace(
            text,
            [
                ["\t","[tab]"],
                ["\n","[br]"],
                ["\r",""],
            ]
        )
        return new BbcodeStringBox(data);
    }
}