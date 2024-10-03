import { Expect } from "../away/Expect";
import { PadRight, SetBetween, SplitStringByRepeatingDelimiters } from "./Strings";

export function TestStrings(){
    console.log("\t Strings");
    TestSplitByRepeatingDelimiter();
    TestSetBetween();
    TestPadRight();
}

interface SplitByRepeatingDelimiterTest{
    input:string,
    expectedResult:string[],
    delimiters:string[],
    parseDirection:"rightToLeft"|"leftToRight"
}

function TestSplitByRepeatingDelimiter(){
    console.log("\t\t .SplitStringByRepeatingDelimiters");
    const tests:SplitByRepeatingDelimiterTest[] = [

        {
            input: "ab[c]d[e]fg",
            delimiters: ["[","]"],
            parseDirection:"leftToRight",
            expectedResult: ["ab","c","d","e","fg"],
        },
        {
            input: "ab[c]d[e]fg",
            delimiters: ["b[","]"],
            parseDirection:"leftToRight",
            expectedResult: ["a","c","d[e]fg"],
        },
        {
            input: "a1b2c3",
            delimiters: ["1","2","3"],
            parseDirection:"leftToRight",
            expectedResult: ["a","b","c",""],
        },
        {
            input: "[a[b]c]",
            delimiters: ["[","]"],
            parseDirection:"leftToRight",
            expectedResult:["","a[b","c]"],
        },
        {
            input: "[a[b]c]",
            delimiters: ["[","]"],
            parseDirection:"rightToLeft",
            expectedResult:["[a","b]c",""],
        }

    ];

    for(const test of tests){
        const resultSplit = SplitStringByRepeatingDelimiters(
            test.input,
            test.delimiters,
            {
                parseDirection: test.parseDirection
            }
        );
        Expect(
            JSON.stringify(resultSplit)===JSON.stringify(test.expectedResult),
            JSON.stringify({...test,resultSplit}),
            ()=>{}
        );
    
    }
}

interface SetBetweenTest{
    input:string,
    expectedResult:string,
    args:[string,string,string,"rightToLeft"|"leftToRight"]
}

function TestSetBetween(){
    console.log("\t\t SetBetween");
    const tests:SetBetweenTest[] = [

        {
            input: "ab[c]d[e]fg",
            args: ["[","]","~","leftToRight"],
            expectedResult: "ab[~]d[~]fg",
        },
        {
            input: "ab[c]d[e]fg",
            args: ["b[","]","~","leftToRight"],
            expectedResult: "ab[~]d[e]fg",
        },
        {
            input: "ab[c]d[e]fg",
            args: ["[","]f","~","leftToRight"],
            expectedResult: "ab[~]fg",
        },
        {
            input: "ab[c]d[e]fg",
            args: ["b[","]f","~","leftToRight"],
            expectedResult: "ab[~]fg",
        },

        {
            input: "ab[c]d[e]fg",
            args: ["[","]","~","rightToLeft"],
            expectedResult: "ab[~]d[~]fg",
        },
        {
            input: "ab[c]d[e]fg",
            args: ["b[","]","~","rightToLeft"],
            expectedResult: "ab[~]fg",
        },
        {
            input: "ab[c]d[e]fg",
            args: ["[","]f","~","rightToLeft"],
            expectedResult: "ab[c]d[~]fg",
        },
        {
            input: "ab[c]d[e]fg",
            args: ["b[","]f","~","rightToLeft"],
            expectedResult: "ab[~]fg",
        },

    ];

    for(const test of tests){
        const result = SetBetween(
            test.input,
            [test.args[0],test.args[1]],
            test.args[2],
            {
                parseDirection: test.args[3],
            }
        );
        Expect(
            result===test.expectedResult,
            JSON.stringify({...test,result}),
            ()=>{}
        );
    
    }

}




function TestPadRight(){
    console.log("\t\t PadRight");
    const tests:{
        input: [string,string,number],
        result:string,
    }[] = [
        {
            input: ["abc","x",5],
            result: "abcxx",
        },
        {
            input: ["abc","x",3],
            result: "abc",
        },
        {
            input: ["abc","x",2],
            result: "abc",
        },
        {
            input: ["abc","x",0],
            result: "abc",
        },
        {
            input: ["abc","xyz",4],
            result: "abcx",
        },
        {
            input: ["abc","xyz",5],
            result: "abcxy",
        },
        {
            input: ["","0",2],
            result: "00",
        },
    ];

    for(const test of tests){
        const result = PadRight(test.input[0],test.input[1],test.input[2]);
        const ok = result===test.result;
        Expect(ok,"Test failed: "+JSON.stringify(test)+" ACTUAL RESULT:"+JSON.stringify(result));
    }

}

