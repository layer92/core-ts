"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonEmptyAlphaNumericStringBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
const CommonCharsets_1 = require("./CommonCharsets");
const Strings_1 = require("./Strings");
class NonEmptyAlphaNumericStringBox extends Box_1.Box {
    constructor(data, onInvalidData) {
        (0, Expect_1.Expect)(data.length, `data: length cannot be 0`, onInvalidData);
        (0, Expect_1.Expect)(Strings_1.Strings.IsInCharset(data, CommonCharsets_1.AlphanumericCharacters), `data: not alphabetic`, onInvalidData);
        super(data);
    }
}
exports.NonEmptyAlphaNumericStringBox = NonEmptyAlphaNumericStringBox;
