import assert from "assert";
import { GetBaseNameFromFileName, MaybeGetFormatFromFileName } from "./FileNames";

export function TestFileNames() {
    console.log("\t FileNames");
    TestMaybeGetFormatFromFileName();
    TestGetBaseNameFromFileName();
}

function TestMaybeGetFormatFromFileName(){
    console.log(`\t\t .MaybeGetFormatFromFileName`);
    for(const [input,expected] of [
        ["foo.bar","bar"],
        ["foo",undefined],
        ["foo.",undefined],
    ] as const){
        const result = MaybeGetFormatFromFileName(input);
        assert.equal(result,expected,`Failed: input:${input===undefined?`undefined`:`"${input}"`} expected:${expected===undefined?`undefined`:`"${expected}"`} result:${result===undefined?`undefined`:`"${result}"`}`);
    }
}

function TestGetBaseNameFromFileName(){
    console.log(`\t\t .GetBaseNameFromFileName`);
    for(const [input,expected] of [
        ["foo.bar","foo"],
        ["foo","foo"],
        ["foo.","foo."],
    ] as const){
        const result = GetBaseNameFromFileName(input);
        assert.equal(result,expected,`Failed: input:${input===undefined?`undefined`:`"${input}"`} expected:${expected===undefined?`undefined`:`"${expected}"`} result:${result===undefined?`undefined`:`"${result}"`}`);
    }
}