import assert from "assert";
import { MaybeGetFolderPathFolderName } from "./FolderPaths";

export function TestFolderPaths() {
    console.log("\t FolderPaths");
    TestMaybeGetFolderPathFolderName();
}

function TestMaybeGetFolderPathFolderName(){
    console.log(`\t\t .MaybeGetFolderPathFolderName`);
    for(const [input,expected] of [
        ["foo/bar/","bar"],
        ["/",undefined],
        ["foo/bar/../",".."],
        ["foo/bar/./","."],
        ["a/b/c/","c"],
    ] as const){
        const result = MaybeGetFolderPathFolderName(input);
        assert.equal(result,expected,`Failed: input:${input===undefined?`undefined`:`"${input}"`} expected:${expected===undefined?`undefined`:`"${expected}"`} result:${result===undefined?`undefined`:`"${result}"`}`);
    }
}