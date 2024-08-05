"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCredentialFromAuthenticationHeader = exports.GetCredentialTypeFromAuthenticationHeader = exports.BearerTokenToAuthenticationHeader = exports.BasicCredentialsStringToAuthenticationHeader = exports.ExpectAuthenticationHeader = void 0;
const Expect_1 = require("../away/Expect");
const BasicAccessCredentials_1 = require("./BasicAccessCredentials");
function ExpectAuthenticationHeader(authneticationHeader, onFail) {
    (0, Expect_1.Expect)(authneticationHeader.includes(" "), `Expected " "`, onFail);
}
exports.ExpectAuthenticationHeader = ExpectAuthenticationHeader;
/** eg "username:password" becomes "Basic username:password" */
function BasicCredentialsStringToAuthenticationHeader(basicCredentialsString) {
    (0, BasicAccessCredentials_1.ExpectBasicAccessCredentials)(basicCredentialsString);
    return `Basic ${basicCredentialsString}`;
}
exports.BasicCredentialsStringToAuthenticationHeader = BasicCredentialsStringToAuthenticationHeader;
/** eg token "foo" becomes "Bearer foo" */
function BearerTokenToAuthenticationHeader(token) {
    return `Bearer ${token}`;
}
exports.BearerTokenToAuthenticationHeader = BearerTokenToAuthenticationHeader;
/** Returns the part of the header such as "Basic" or "Bearer" */
function GetCredentialTypeFromAuthenticationHeader(header) {
    ExpectAuthenticationHeader(header);
    return header.split(" ")[0];
}
exports.GetCredentialTypeFromAuthenticationHeader = GetCredentialTypeFromAuthenticationHeader;
/** Returns the part that is usually a token, username:password, etc */
function GetCredentialFromAuthenticationHeader(header) {
    ExpectAuthenticationHeader(header);
    return header.split(" ")[1];
}
exports.GetCredentialFromAuthenticationHeader = GetCredentialFromAuthenticationHeader;
