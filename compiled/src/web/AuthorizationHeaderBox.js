"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationHeaderBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
/**
 * A string in the form "Type value", eg "Basic username:password" or "Bearer foo"
 * Despite going into the "Authorization" header of an HTTP request, this header is actually used for authentication, so that's what we're calling it.
 * */
class AuthenticationHeaderBox extends Box_1.Box {
    constructor(data, onFail) {
        (0, Expect_1.Expect)(data.includes(" "), `Expected " "`, onFail);
        super(data);
    }
    static FromBasicCredentialsStringBox(credentialsStringBox) {
        return new AuthenticationHeaderBox("Basic " + credentialsStringBox.getData());
    }
}
exports.AuthenticationHeaderBox = AuthenticationHeaderBox;
