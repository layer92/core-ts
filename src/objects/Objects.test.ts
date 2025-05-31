import { Expect } from "../away/Expect";
import { DoObjectsHaveSameSubValues, Omit, Pick, PickIntersection } from "./Objects";
import {EqualsByJsonStringify} from "../arrays/EqualsByJsonStringify";
export function TestObjects(){
    console.log("\t Objects");
    TestPick();
    TestOmit();
    TestDoObjectsHaveSameSubValues();
}


// compile-time test
{
    const ABC_to_AC = ["a","c"] as const;
    const abc = {a:1,b:"b",c:[3]};
    const ac = Pick(abc,ABC_to_AC);
    ac.a;
    // ac.b;//should give compiler error
    ac.c;
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



// compile-time test
{
    const ABC_to_CD = ["c","d"] as const;
    const abc = {a:1,b:"b",c:[3]};
    const ac = PickIntersection(abc,ABC_to_CD);
    // ac.a;//should give compiler error
    // ac.b;//should give compiler error
    ac.c;
    // ac.d;//should give compiler error
}




function TestOmit(){
    console.log("\t\t Omit");
    const tests = [
        {
            input: [
                {a:1,b:2,c:3},
                ["a"]
            ],
            result: {b:2,c:3},
        },
        {
            input: [
                {a:1,b:2,c:3},
                ["a","c"]
            ],
            result: {b:2},
        },
        {
            input: [
                {a:1,b:2,c:3},
                []
            ],
            result: {a:1,b:2,c:3},
        },
        {
            input: [
                {a:1,b:2,c:3},
                ["a","b","c"]
            ],
            result: {},
        },
    ] as const;

    for(const test of tests){
        const result = Omit(test.input[0],test.input[1]);
        const ok = EqualsByJsonStringify(result,test.result);
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }
}

function TestDoObjectsHaveSameSubValues(){
    console.log("\t\t DoObjectsHaveSameSubValues");
    const tests = [
        {
            input: [
                {a:1,b:2,c:3},
                {a:1,b:2,c:3},
            ],
            result: true,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {b:2,a:1,c:3},
            ],
            result: true,
        },
        {
            name:"{} vs {}",
            input: [
                {},
                {},
            ],
            result: true,
        },
        {
            name:"{} vs {a:undefined,b:undefined,c:undefined}",
            input: [
                {},
                {a:undefined,b:undefined,c:undefined},
            ],
            result: true,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {a:1,b:3,c:2},
            ],
            result: false,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {b:1,a:2,c:3},
            ],
            result: false,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {a:1,b:2},
            ],
            result: false,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {a:1,c:3},
            ],
            result: false,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {c:3,a:1,},
            ],
            result: false,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {a:1,b:2,c:4},
            ],
            result: false,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {c:4,a:1,},
            ],
            result: false,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {c:1,a:1,},
            ],
            result: false,
        },
        {
            input: [
                {a:1,b:2,c:3},
                {a:1,b:2,c:1},
            ],
            result: false,
        },
        {
            input: [
                {},
                {a:1,b:2,c:3},
            ],
            result: false,
        },
    ] as const;

    for(const test of tests){
        const result = DoObjectsHaveSameSubValues(test.input[0],test.input[1]);
        const ok = EqualsByJsonStringify(result,test.result);
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
        const result2 = DoObjectsHaveSameSubValues(test.input[0],test.input[1],EqualsByJsonStringify);
        const ok2 = EqualsByJsonStringify(result2,test.result);
        Expect(ok2,"Test failed: "+JSON.stringify(test)+"+EqualsByJsonStringify ACTUAL RESULT:"+JSON.stringify(result));
    }
}