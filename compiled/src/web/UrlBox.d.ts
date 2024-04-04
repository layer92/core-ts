import { Box } from "../away/Box";
import { OnException } from "../away/OnException";
export declare class UrlBox extends Box<string> {
    private __UrlBox__;
    constructor(data: string, onValidationFail?: OnException);
    /** does not include "://"
     * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
     * https://en.wikipedia.org/wiki/URL
    */
    getProtocol(): string;
    getAuthority(): string;
    getHost(): string;
    /** Includes the / at the start */
    getPath(): string;
    /** Returns the path, and if the path has any "/" at the end, removes that from the path */
    getPathSansTrailingSlash(): string;
    hasPath(): number;
    getLastPathNode(): string;
    /** Given /foo/ABC/bar/baz, returns "ABC" - Useful for common API schemes. */
    getNodeAfter({ node, onNodeNotFound }: {
        node: string;
        onNodeNotFound: OnException;
    }): string;
    getBeforePath(): string;
}
