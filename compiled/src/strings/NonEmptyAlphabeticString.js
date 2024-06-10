"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpectNonEmptyAlphabeticString = void 0;
const Expect_1 = require("../away/Expect");
const CommonCharsets_1 = require("./CommonCharsets");
const Strings_1 = require("./Strings");
function ExpectNonEmptyAlphabeticString(data, onInvalidData) {
    (0, Expect_1.Expect)(data.length, `data: length cannot be 0`, onInvalidData);
    (0, Expect_1.Expect)((0, Strings_1.IsInCharset)(data, CommonCharsets_1.AlphebeticCharacters), `data: not alphabetic`, onInvalidData);
}
exports.ExpectNonEmptyAlphabeticString = ExpectNonEmptyAlphabeticString;
