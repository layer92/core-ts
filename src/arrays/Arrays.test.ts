import { Expect } from "../away/Expect";
import { UnsortedArrayEquals, MakePowerSet, MakeRotatedArray, SortedArrayEquals } from "./Arrays";
import { EqualsByThreeEquals } from "./EqualsByThreeEquals";

export function TestArrays(){
    console.log("\t Arrays");
    TestUnsortedArrayEquals();
    TestMakePowerSet();
    TestMakeRotatedArray();
}

function TestUnsortedArrayEquals(){
    console.log("\t\t UnsortedArrayEquals");
    const tests = [
        {
            input: [
                [],
                []
            ],
            result: true,
        },
        {
            input: [
                [],
                [1]
            ],
            result: false,
        },
        {
            input: [
                [1],
                [1]
            ],
            result: true,
        },
        {
            input: [
                [1,2,3],
                [1,2,3]
            ],
            result: true,
        },
        {
            input: [
                [1,2,3],
                [1,3,2]
            ],
            result: true,
        },
        {
            input: [
                [1,2,3],
                [1,2]
            ],
            result: false,
        },
        {
            input: [
                [1,2,3],
                []
            ],
            result: false,
        },
    ] as const;

    for(const test of tests){
        const result = UnsortedArrayEquals(test.input[0],test.input[1]);
        Expect(result===test.result,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+result);
    }
}


function TestMakePowerSet(){
    console.log("\t\t MakePowerSet");
    const tests = [
        {
            input: [],
            result: [ [] ],
        },
        {
            input: [1],
            result: [ [],[1] ],
        },
        {
            input: [1,2,3],
            result: [ [],[1], [2],[1,2], [3],[1,3],[2,3],[1,2,3] ],
        },
    ] as const;

    for(const test of tests){
        const result = MakePowerSet(test.input);
        Expect(result.length===test.result.length);
        for(const expectedSubset of test.result){
            const occurences = result.filter(
                resultSubset=>UnsortedArrayEquals(resultSubset,expectedSubset,EqualsByThreeEquals)
            );
            Expect(occurences.length===1,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+result);
        }
    }
}

function TestMakeRotatedArray(){
    console.log("\t\t MakeRotatedArray");
    const tests = [
        {
            array: [1,2,3],
            offset: undefined,
            result: [2,3,1],
        },
        {
            array: [1,2,3],
            offset: -1,
            result: [2,3,1],
        },
        {
            array: [1,2,3],
            offset: 1,
            result: [3,1,2],
        },
        {
            array: [1,2,3],
            offset: 2,
            result: [2,3,1],
        },
        {
            array: [1,2,3],
            offset: -2,
            result: [3,1,2],
        },
        {
            array: [1,2,3],
            offset: -30,
            result: [1,2,3],
        },
    ] as const;

    for(const test of tests){
        const result = MakeRotatedArray(test.array,test.offset);
        const isSame = SortedArrayEquals(test.result,result);
        Expect(isSame,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }
}
