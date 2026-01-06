import assert from "assert";
import { MaybeGetFormatFromFileName } from "./FileNames";

export function TestFileNames() {
    console.log("\t FileNames");
    TestMaybeGetFormatFromFileName();
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