"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpectJavascriptIdentifierString = void 0;
const Expect_1 = require("../away/Expect");
const CommonCharsets_1 = require("./CommonCharsets");
const Strings_1 = require("./Strings");
function ExpectJavascriptIdentifierString(data) {
    (0, Expect_1.Expect)(data.length, `data: length cannot be 0`);
    (0, Expect_1.Expect)(!(0, Strings_1.IsInCharset)(data[0], CommonCharsets_1.NumericCharacters), `data: cannot start with a number: ` + data);
    (0, Expect_1.Expect)((0, Strings_1.IsInCharset)(data, CommonCharsets_1.JavascriptIdentifierCharacters), `data: invalid character(s): ` + data);
}
exports.ExpectJavascriptIdentifierString = ExpectJavascriptIdentifierString;
