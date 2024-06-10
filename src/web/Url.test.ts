import assert from "assert";
import { GetAuthorityFromUrl, GetFragmentFromUrl, GetHashFromUrl, GetPathFromUrl, GetQueryFromUrl, GetSchemeFromUrl, GetSearchFromUrl } from "./Url";

export function TestUrl(){
    console.log("\t Url");
    TestBasic();
}

function TestBasic(){
    let url:string;
    
    url = `https://test.com/foo/bar`;
    assert.equal(GetSchemeFromUrl(url),`https`);
    assert.equal(GetAuthorityFromUrl(url),`test.com`);
    assert.equal(GetPathFromUrl(url),`/foo/bar`);
    assert.equal(GetSearchFromUrl(url),``);
    assert.equal(GetQueryFromUrl(url),``);
    assert.equal(GetHashFromUrl(url),``);
    assert.equal(GetFragmentFromUrl(url),``);

    url = `https://test.com/foo/bar?baz=buzz#biz`;
    assert.equal(GetSearchFromUrl(url),`?baz=buzz`);
    assert.equal(GetQueryFromUrl(url),`baz=buzz`);
    assert.equal(GetHashFromUrl(url),`#biz`);
    assert.equal(GetFragmentFromUrl(url),`biz`);

    assert.equal(GetSearchFromUrl(`https://test.com/foo/bar?`),`?`);
    assert.equal(GetQueryFromUrl(`https://test.com/foo/bar?`),``);

    assert.equal(GetHashFromUrl(`https://test.com/foo/bar#`),`#`);
    assert.equal(GetFragmentFromUrl(`https://test.com/foo/bar#`),``);

    
}
