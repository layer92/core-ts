import assert from "assert";
import {UrlBox} from "./UrlBox";

export function TestUrlBox(){
    console.log("\t UrlBox");
    TestBasic();
}

function TestBasic(){
    const urlBox = new UrlBox(`https://test.com/foo/bar`);
    assert.equal(urlBox.getProtocol(),`https`);
    assert.equal(urlBox.getAuthority(),`test.com`);
    assert.equal(urlBox.getPath(),`/foo/bar`);
}
