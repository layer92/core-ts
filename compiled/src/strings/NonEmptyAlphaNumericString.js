"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpectNonEmptyAlphaNumericString = void 0;
const Expect_1 = require("../away/Expect");
const CommonCharsets_1 = require("./CommonCharsets");
const Strings_1 = require("./Strings");
function ExpectNonEmptyAlphaNumericString(data, onInvalidData) {
    (0, Expect_1.Expect)(data.length, `data: length cannot be 0`, onInvalidData);
    (0, Expect_1.Expect)((0, Strings_1.IsInCharset)(data, CommonCharsets_1.AlphanumericCharacters), `data: not alphabetic`, onInvalidData);
}
exports.ExpectNonEmptyAlphaNumericString = ExpectNonEmptyAlphaNumericString;
