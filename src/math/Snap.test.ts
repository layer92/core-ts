import { Expect } from "../away/Expect";
import {Snap} from "./Snap";
export function TestSnap(){
    console.log("\t Snap");
    TestSnapBasic();
}


function TestSnapBasic(){
    console.log("\t\t Basic");
    const tests = [
        {
            input: [
                30,16
            ],
            result: 32,
        },
        {
            input: [
                16,16
            ],
            result: 16,
        },
        {
            input: [
                32,16
            ],
            result: 32,
        },
        {
            input: [
                -1,16
            ],
            result: 0,
        },
        {
            input: [
                -27,16
            ],
            result: -32,
        },
    ] as const;

    for(const test of tests){
        const result = Snap(test.input[0],test.input[1]);
        const ok = result[0]===test.result[0]&&result[1]===test.result[1];
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }
}