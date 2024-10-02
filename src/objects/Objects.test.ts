import { Expect } from "../away/Expect";
import { Pick } from "./Objects";
import {EqualsByJsonStringify} from "../arrays/EqualsByJsonStringify";
export function TestObjects(){
    console.log("\t Objects");
    TestPick();
}

function TestPick(){
    console.log("\t\t Pick");
    const tests = [
        {
            input: [
                {a:1,b:2,c:3},
                ["a"]
            ],
            result: {a:1},
        },
        {
            input: [
                {a:1,b:2,c:3},
                ["a","c"]
            ],
            result: {a:1,c:3},
        },
        {
            input: [
                {a:1,b:2,c:3},
                []
            ],
            result: {},
        },
        {
            input: [
                {a:1,b:2,c:3},
                ["a","b","c"]
            ],
            result: {a:1,b:2,c:3},
        },
        // {
        //     input: [
        //         {a:1,b:2,c:3},
        //         ["a","d"]
        //     ],
        //     result: {a:1},
        // },
    ] as const;

    for(const test of tests){
        const result = Pick(test.input[0],test.input[1]);
        const ok = EqualsByJsonStringify(result,test.result);
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }
}
