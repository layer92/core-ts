"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCredentialDataFromAuthenticationHeader = exports.GetCredentialTypeFromAuthenticationHeader = exports.BearerTokenToAuthenticationHeader = exports.BasicCredentialsStringToAuthenticationHeader = exports.ExpectAuthenticationHeader = void 0;
const Expect_1 = require("../away/Expect");
const BasicCredentialsString_1 = require("./BasicCredentialsString");
function ExpectAuthenticationHeader(authneticationHeader, onFail) {
    (0, Expect_1.Expect)(authneticationHeader.includes(" "), `Expected " "`, onFail);
}
exports.ExpectAuthenticationHeader = ExpectAuthenticationHeader;
/** eg "username:password" becomes "Basic username:password" */
function BasicCredentialsStringToAuthenticationHeader(basicCredentialsString) {
    (0, BasicCredentialsString_1.ExpectBasicCredentialsString)(basicCredentialsString);
    return `Basic ${basicCredentialsString}`;
}
exports.BasicCredentialsStringToAuthenticationHeader = BasicCredentialsStringToAuthenticationHeader;
/** eg token "foo" becomes "Bearer foo" */
function BearerTokenToAuthenticationHeader(basicCredentialsString) {
    (0, BasicCredentialsString_1.ExpectBasicCredentialsString)(basicCredentialsString);
    return `Bearer ${basicCredentialsString}`;
}
exports.BearerTokenToAuthenticationHeader = BearerTokenToAuthenticationHeader;
/** Returns the part of the header such as "Basic" or "Bearer" */
function GetCredentialTypeFromAuthenticationHeader(header) {
    ExpectAuthenticationHeader(header);
    return header.split(" ")[0];
}
exports.GetCredentialTypeFromAuthenticationHeader = GetCredentialTypeFromAuthenticationHeader;
/** Returns the part that is usually a token, username:password, etc */
function GetCredentialDataFromAuthenticationHeader(header) {
    ExpectAuthenticationHeader(header);
    return header.split(" ")[1];
}
exports.GetCredentialDataFromAuthenticationHeader = GetCredentialDataFromAuthenticationHeader;
