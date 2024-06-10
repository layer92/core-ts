"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCredentialsStringToAuthenticationHeader = exports.ExpectAuthenticationHeader = void 0;
const Expect_1 = require("../away/Expect");
const BasicCredentialsString_1 = require("./BasicCredentialsString");
function ExpectAuthenticationHeader(data, onFail) {
    (0, Expect_1.Expect)(data.includes(" "), `Expected " "`, onFail);
}
exports.ExpectAuthenticationHeader = ExpectAuthenticationHeader;
function BasicCredentialsStringToAuthenticationHeader(basicCredentialsString) {
    (0, BasicCredentialsString_1.ExpectBasicCredentialsString)(basicCredentialsString);
    return `Basic ${basicCredentialsString}`;
}
exports.BasicCredentialsStringToAuthenticationHeader = BasicCredentialsStringToAuthenticationHeader;
