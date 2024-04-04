"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonEmptyAlphabeticStringBox = void 0;
const Expect_1 = require("../away/Expect");
const Box_1 = require("../away/Box");
const Strings_1 = require("./Strings");
const CommonCharsets_1 = require("./CommonCharsets");
class NonEmptyAlphabeticStringBox extends Box_1.Box {
    constructor(data, onInvalidData) {
        (0, Expect_1.Expect)(data.length, `data: length cannot be 0`, onInvalidData);
        (0, Expect_1.Expect)(Strings_1.Strings.IsInCharset(data, CommonCharsets_1.AlphebeticCharacters), `data: not alphabetic`, onInvalidData);
        super(data);
    }
}
exports.NonEmptyAlphabeticStringBox = NonEmptyAlphabeticStringBox;
