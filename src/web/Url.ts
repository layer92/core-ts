import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

// note that URL is not imported in this package, it's the built-in Javascript URL

/**
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * https://en.wikipedia.org/wiki/URL
*/
export function ExpectUrl(url:string,onFail?:OnException){
    try{
        new URL(url);
    }catch(e){
        Expect(false, `Expected a valid URL: ${url}`, onFail);
    }
}



/** also known as the "protocol" - does not include "://"
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * https://en.wikipedia.org/wiki/URL
*/
export function GetSchemeFromUrl(url:string){
    const jsProtocol = new URL(url).protocol;
    if(!jsProtocol.length){
        return jsProtocol;
    }
    Expect(jsProtocol.endsWith(":"),``);
    return jsProtocol.slice(0,-1);
}

export function GetAuthorityFromUrl(url:string){
    ExpectUrl(url);
    // the authority is incorrectly called "host" in JS's URL class
    return new URL(url).host
}

export function GetHostFromUrl(url:string){
    ExpectUrl(url);
    return new URL(url).hostname;
}

/** Includes the / at the start */
export function GetPathFromUrl(url:string){
    ExpectUrl(url);
    return new URL(url).pathname;
}

/** Returns the path, and if the path has any "/" at the end, removes that from the path */
export function GetPathSansTrailingSlashFromUrl(url:string){
    ExpectUrl(url);
    const path = new URL(url).pathname;
    while(path.endsWith("/")){
        return path.slice(0,-1);
    }
    return path;
}

export function HasPathFromUrl(url:string){
    return GetPathFromUrl(url).length;
}

export function GetLastPathNodeFromUrl(url:string){
    return GetPathFromUrl(url).split("/").slice(-1)[0];
}

/** The query portion of the URL, including the `?` if it has one */
export function GetSearchFromUrl(url:string){0
    ExpectUrl(url);
    const search = new URL(url).search;
    if(search==="" && url.endsWith("?")){
        return "?";
    }
    return search;
}

/** Does not include the `?` */
export function GetQueryFromUrl(url:string){
    const search = GetSearchFromUrl(url);
    if(search.startsWith(`?`)){
        return search.slice(1);
    }
    return search;
}

/** The fragment portion of the URL, including the `#` if it has one */
export function GetHashFromUrl(url:string){
    ExpectUrl(url);
    const hash = new URL(url).hash;
    if(hash==="" && url.endsWith("#")){
        return "#";
    }
    return hash;
}

/** Does not include the `#` */
export function GetFragmentFromUrl(url:string){
    const hash = GetHashFromUrl(url);
    if(hash.startsWith(`#`)){
        return hash.slice(1);
    }
    return hash;
}

/** GetNextNodeInUrl("/foo/ABC/bar/baz", "foo") returns "ABC" */
export function GetNextNodeInUrl(url:string,startNode:string,options?:{onNodeNotFound?:OnException}){
    const nodes = GetPathFromUrl(url).split("/");
    const index = nodes.indexOf(startNode);
    Expect(index!==-1,()=>"startNode not found: "+startNode+" in url: "+url,options?.onNodeNotFound);
    const result = nodes[index+1];
    Expect(result,()=>`node after search node ${startNode} not found in url: `+url,options?.onNodeNotFound);
    return result;
}

/** Returns everything to the left of the path from the URL, eg from https://www.foo.com/bar, returns https://www.foo.com */
export function GetLeftOfUrlPath(url:string){
    const pathAndRight = GetPathFromUrl(url)+GetSearchFromUrl(url)+GetHashFromUrl(url);
    Expect(url.endsWith(pathAndRight));
    return url.slice(0,-pathAndRight.length);
}
