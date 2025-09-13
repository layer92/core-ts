import { OnException } from "../away/OnException";
/**
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * https://en.wikipedia.org/wiki/URL
*/
export declare function ExpectUrl(url: string, onFail?: OnException): void;
/** also known as the "protocol" - does not include "://"
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * https://en.wikipedia.org/wiki/URL
*/
export declare function GetSchemeFromUrl(url: string): string;
export declare function GetAuthorityFromUrl(url: string): string;
export declare function GetHostFromUrl(url: string): string;
/** Includes the / at the start */
export declare function GetPathFromUrl(url: string): string;
/** Returns the path, and if the path has any "/" at the end, removes that from the path */
export declare function GetPathSansTrailingSlashFromUrl(url: string): string;
export declare function HasPathFromUrl(url: string): number;
export declare function GetLastPathNodeFromUrl(url: string): string;
/** The query portion of the URL, including the `?` if it has one */
export declare function GetSearchFromUrl(url: string): string;
/** Does not include the `?` */
export declare function GetQueryFromUrl(url: string): string;
/** The fragment portion of the URL, including the `#` if it has one */
export declare function GetHashFromUrl(url: string): string;
/** Does not include the `#` */
export declare function GetFragmentFromUrl(url: string): string;
/** GetNextNodeInUrl("/foo/ABC/bar/baz", "foo") returns "ABC" */
export declare function GetNextNodeInUrl(url: string, startNode: string, options?: {
    onNodeNotFound?: OnException;
}): string;
/** Returns everything to the left of the path from the URL, eg from https://www.foo.com/bar, returns https://www.foo.com */
export declare function GetLeftOfUrlPath(url: string): string;
