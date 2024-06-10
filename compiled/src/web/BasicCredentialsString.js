"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeBasicCredentialsString = exports.ExpectBasicCredentialsString = void 0;
const Expect_1 = require("../away/Expect");
/** Holds a string in the form username:password */
function ExpectBasicCredentialsString(data, onFail) {
    (0, Expect_1.Expect)(data.includes(":"), `Expected ":"`, onFail);
}
exports.ExpectBasicCredentialsString = ExpectBasicCredentialsString;
function MakeBasicCredentialsString(id, password) {
    return `${id}:${password}`;
}
exports.MakeBasicCredentialsString = MakeBasicCredentialsString;
