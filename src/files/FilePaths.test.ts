import assert from "assert";
import { AppendToFilePathBaseFileName } from "./FilePaths";

export function TestFilePaths() {
    console.log("\t FilePaths");
    TestAppendToFilePathBaseFileName();
}

function TestAppendToFilePathBaseFileName(){
    console.log(`\t\t .AppendToFilePathBaseFileName`);
    for(const [input,input2,expected] of [
        ["foo.zip","BAR","fooBAR.zip"],
        ["foo","BAR","fooBAR"],
        ["foo.","BAR","foo.BAR"],
        ["f/o/o.tar.gz","BAR","f/o/o.tarBAR.gz"],
    ] as const){
        const result = AppendToFilePathBaseFileName(input,input2);
        assert.equal(result,expected,`Failed: input:${input===undefined?`undefined`:`"${input}"`} expected:${expected===undefined?`undefined`:`"${expected}"`} result:${result===undefined?`undefined`:`"${result}"`}`);
    }
}
