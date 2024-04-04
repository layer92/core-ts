"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
// note that URL is not imported
class UrlBox extends Box_1.Box {
    constructor(data, onValidationFail) {
        try {
            new URL(data);
        }
        catch (e) {
            onValidationFail?.();
            throw new Error(`data: note a valid URL: ${data}`);
        }
        super(data);
    }
    /** does not include "://"
     * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
     * https://en.wikipedia.org/wiki/URL
    */
    getProtocol() {
        const jsProtocol = new URL(this._data).protocol;
        if (!jsProtocol.length) {
            return jsProtocol;
        }
        (0, Expect_1.Expect)(jsProtocol.endsWith(":"), ``);
        return jsProtocol.slice(0, -1);
    }
    getAuthority() {
        // the authority is incorrectly called "host" in JS's URL class
        return new URL(this._data).host;
    }
    getHost() {
        return new URL(this._data).hostname;
    }
    /** Includes the / at the start */
    getPath() {
        return new URL(this._data).pathname;
    }
    /** Returns the path, and if the path has any "/" at the end, removes that from the path */
    getPathSansTrailingSlash() {
        const path = new URL(this._data).pathname;
        while (path.endsWith("/")) {
            return path.slice(0, -1);
        }
        return path;
    }
    hasPath() {
        return this.getPath().length;
    }
    getLastPathNode() {
        return this.getPath().split("/").slice(-1)[0];
    }
    /** Given /foo/ABC/bar/baz, returns "ABC" - Useful for common API schemes. */
    getNodeAfter({ node, onNodeNotFound }) {
        const nodes = this.getPath().split("/");
        const index = nodes.indexOf(node);
        (0, Expect_1.Expect)(index !== -1, () => "search node not found: " + node + " in url: " + this._data, onNodeNotFound);
        const result = nodes[index + 1];
        (0, Expect_1.Expect)(result, () => `node after search node ${node} not found in url: ` + this._data, onNodeNotFound);
        return result;
    }
    getBeforePath() {
        if (!this.hasPath()) {
            return this.getData();
        }
        const path = this.getPath();
        return this.getData().slice(0, -path.length);
    }
}
exports.UrlBox = UrlBox;
