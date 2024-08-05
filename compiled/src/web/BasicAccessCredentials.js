"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPasswordFromBasicAccessCredentials = exports.GetIdFromBasicAccessCredentials = exports.MakeBasicAccessCredentials = exports.ExpectBasicAccessCredentials = void 0;
const Expect_1 = require("../away/Expect");
/**
 * Holds a string in the form username:password
 * See https://en.wikipedia.org/wiki/Basic_access_authentication
 *  */
function ExpectBasicAccessCredentials(credentials, onFail) {
    const split = credentials.split(":");
    (0, Expect_1.Expect)(split.length === 2, `Expected exactly one occurence of ":", in the form <id>:<password> for basic authentication credentials.`, onFail);
    const [id, password] = split;
    (0, Expect_1.Expect)(id?.length, `Basic authentication id cannot be empty. The header value should be in the form "Basic <id>:<password>"`, onFail);
    (0, Expect_1.Expect)(password?.length, `Basic authentication password cannot be empty. The header value should be in the form "Basic <id>:<password>"`, onFail);
}
exports.ExpectBasicAccessCredentials = ExpectBasicAccessCredentials;
function MakeBasicAccessCredentials(id, password) {
    return `${id}:${password}`;
}
exports.MakeBasicAccessCredentials = MakeBasicAccessCredentials;
function GetIdFromBasicAccessCredentials(credentials) {
    ExpectBasicAccessCredentials(credentials);
    return credentials.split(":")[0];
}
exports.GetIdFromBasicAccessCredentials = GetIdFromBasicAccessCredentials;
function GetPasswordFromBasicAccessCredentials(credentials) {
    ExpectBasicAccessCredentials(credentials);
    return credentials.split(":")[1];
}
exports.GetPasswordFromBasicAccessCredentials = GetPasswordFromBasicAccessCredentials;
