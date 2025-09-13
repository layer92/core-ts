"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLeftOfUrlPath = exports.GetNextNodeInUrl = exports.GetFragmentFromUrl = exports.GetHashFromUrl = exports.GetQueryFromUrl = exports.GetSearchFromUrl = exports.GetLastPathNodeFromUrl = exports.HasPathFromUrl = exports.GetPathSansTrailingSlashFromUrl = exports.GetPathFromUrl = exports.GetHostFromUrl = exports.GetAuthorityFromUrl = exports.GetSchemeFromUrl = exports.ExpectUrl = void 0;
const Expect_1 = require("../away/Expect");
// note that URL is not imported in this package, it's the built-in Javascript URL
/**
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * https://en.wikipedia.org/wiki/URL
*/
function ExpectUrl(url, onFail) {
    try {
        new URL(url);
    }
    catch (e) {
        (0, Expect_1.Expect)(false, `Expected a valid URL: ${url}`, onFail);
    }
}
exports.ExpectUrl = ExpectUrl;
/** also known as the "protocol" - does not include "://"
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * https://en.wikipedia.org/wiki/URL
*/
function GetSchemeFromUrl(url) {
    const jsProtocol = new URL(url).protocol;
    if (!jsProtocol.length) {
        return jsProtocol;
    }
    (0, Expect_1.Expect)(jsProtocol.endsWith(":"), ``);
    return jsProtocol.slice(0, -1);
}
exports.GetSchemeFromUrl = GetSchemeFromUrl;
function GetAuthorityFromUrl(url) {
    ExpectUrl(url);
    // the authority is incorrectly called "host" in JS's URL class
    return new URL(url).host;
}
exports.GetAuthorityFromUrl = GetAuthorityFromUrl;
function GetHostFromUrl(url) {
    ExpectUrl(url);
    return new URL(url).hostname;
}
exports.GetHostFromUrl = GetHostFromUrl;
/** Includes the / at the start */
function GetPathFromUrl(url) {
    ExpectUrl(url);
    return new URL(url).pathname;
}
exports.GetPathFromUrl = GetPathFromUrl;
/** Returns the path, and if the path has any "/" at the end, removes that from the path */
function GetPathSansTrailingSlashFromUrl(url) {
    ExpectUrl(url);
    const path = new URL(url).pathname;
    while (path.endsWith("/")) {
        return path.slice(0, -1);
    }
    return path;
}
exports.GetPathSansTrailingSlashFromUrl = GetPathSansTrailingSlashFromUrl;
function HasPathFromUrl(url) {
    return GetPathFromUrl(url).length;
}
exports.HasPathFromUrl = HasPathFromUrl;
function GetLastPathNodeFromUrl(url) {
    return GetPathFromUrl(url).split("/").slice(-1)[0];
}
exports.GetLastPathNodeFromUrl = GetLastPathNodeFromUrl;
/** The query portion of the URL, including the `?` if it has one */
function GetSearchFromUrl(url) {
    0;
    ExpectUrl(url);
    const search = new URL(url).search;
    if (search === "" && url.endsWith("?")) {
        return "?";
    }
    return search;
}
exports.GetSearchFromUrl = GetSearchFromUrl;
/** Does not include the `?` */
function GetQueryFromUrl(url) {
    const search = GetSearchFromUrl(url);
    if (search.startsWith(`?`)) {
        return search.slice(1);
    }
    return search;
}
exports.GetQueryFromUrl = GetQueryFromUrl;
/** The fragment portion of the URL, including the `#` if it has one */
function GetHashFromUrl(url) {
    ExpectUrl(url);
    const hash = new URL(url).hash;
    if (hash === "" && url.endsWith("#")) {
        return "#";
    }
    return hash;
}
exports.GetHashFromUrl = GetHashFromUrl;
/** Does not include the `#` */
function GetFragmentFromUrl(url) {
    const hash = GetHashFromUrl(url);
    if (hash.startsWith(`#`)) {
        return hash.slice(1);
    }
    return hash;
}
exports.GetFragmentFromUrl = GetFragmentFromUrl;
/** GetNextNodeInUrl("/foo/ABC/bar/baz", "foo") returns "ABC" */
function GetNextNodeInUrl(url, startNode, options) {
    const nodes = GetPathFromUrl(url).split("/");
    const index = nodes.indexOf(startNode);
    (0, Expect_1.Expect)(index !== -1, () => "startNode not found: " + startNode + " in url: " + url, options?.onNodeNotFound);
    const result = nodes[index + 1];
    (0, Expect_1.Expect)(result, () => `node after search node ${startNode} not found in url: ` + url, options?.onNodeNotFound);
    return result;
}
exports.GetNextNodeInUrl = GetNextNodeInUrl;
/** Returns everything to the left of the path from the URL, eg from https://www.foo.com/bar, returns https://www.foo.com */
function GetLeftOfUrlPath(url) {
    const pathAndRight = GetPathFromUrl(url) + GetSearchFromUrl(url) + GetHashFromUrl(url);
    (0, Expect_1.Expect)(url.endsWith(pathAndRight));
    return url.slice(0, -pathAndRight.length);
}
exports.GetLeftOfUrlPath = GetLeftOfUrlPath;
