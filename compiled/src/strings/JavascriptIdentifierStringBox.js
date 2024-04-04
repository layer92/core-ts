"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavascriptIdentifierStringBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
const CommonCharsets_1 = require("./CommonCharsets");
const Strings_1 = require("./Strings");
class JavascriptIdentifierStringBox extends Box_1.Box {
    constructor(data) {
        (0, Expect_1.Expect)(data.length, `data: length cannot be 0`);
        (0, Expect_1.Expect)(!Strings_1.Strings.IsInCharset(data[0], CommonCharsets_1.NumericCharacters), `data: cannot start with a number: ` + data);
        (0, Expect_1.Expect)(Strings_1.Strings.IsInCharset(data, CommonCharsets_1.JavascriptIdentifierCharacters), `data: invalid character(s): ` + data);
        super(data);
    }
}
exports.JavascriptIdentifierStringBox = JavascriptIdentifierStringBox;
