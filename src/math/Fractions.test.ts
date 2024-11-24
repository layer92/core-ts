import { Expect } from "../away/Expect";
import {AddFractions, GetGreatestCommonFactor, MultiplyFractions, SimplifyFraction} from "./Fractions";
export function TestFractions(){
    console.log("\t Fractions");
    TestGetGreatestCommonFactor();
    TestSimplifyFraction();
    TestMultiplyFractions();
    TestAddFractions();
}


function TestAddFractions(){
    console.log("\t\t AddFractions");
    const tests = [
        {
            input: [
                [1,1],[1,1]
            ],
            result: [2,1],
        },
        {
            input: [
                [1,2],[1,2]
            ],
            result: [1,1],
        },
        {
            input: [
                [1,2],[3,4]
            ],
            result: [5,4],
        },
        {
            input: [
                [1,4],[1,3]
            ],
            result: [7,12],
        },
    ] as const;

    for(const test of tests){
        const result = AddFractions(test.input[0],test.input[1]);
        const ok = result[0]===test.result[0]&&result[1]===test.result[1];
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }
}


function TestMultiplyFractions(){
    console.log("\t\t MultiplyFractions");
    const tests = [
        {
            input: [
                [3,4],[1,2]
            ],
            result: [3,8],
        },
        {
            input: [
                [3,4],[5,2]
            ],
            result: [15,8],
        },
        {
            input: [
                [3,4],[2,1]
            ],
            result: [3,2],
        },
        {
            input: [
                [3,4],[4,2]
            ],
            result: [3,2],
        },
    ] as const;

    for(const test of tests){
        const result = MultiplyFractions(test.input[0],test.input[1]);
        const ok = result[0]===test.result[0]&&result[1]===test.result[1];
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }
}

function TestSimplifyFraction(){
    console.log("\t\t SimplifyFraction");
    const tests = [
        {
            input: [
                12,15
            ],
            result: [4,5],
        },
        {
            input: [
                1,1
            ],
            result: [1,1],
        },
        {
            input: [
                2,2
            ],
            result: [1,1],
        },
        {
            input: [
                10,1
            ],
            result: [10,1],
        },
        {
            input: [
                1,7
            ],
            result: [1,7],
        },
        {
            input: [
                1003,51
            ],
            result: [59,3],
        },
    ] as const;

    for(const test of tests){
        const result = SimplifyFraction(test.input);
        const ok = result[0]===test.result[0]&&result[1]===test.result[1];
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }
}

function TestGetGreatestCommonFactor(){
    console.log("\t\t GetGreatestCommonFactor");
    const tests = [
        {
            input: [
                12,15
            ],
            result: 3,
        },
        {
            input: [
                1,1
            ],
            result: 1,
        },
        {
            input: [
                1,7
            ],
            result: 1,
        },
    ] as const;

    for(const test of tests){
        const result = GetGreatestCommonFactor(test.input[0],test.input[1]);
        const ok = result===test.result;
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }
}

