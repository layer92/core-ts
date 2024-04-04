"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonEmptyStringBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
class NonEmptyStringBox extends Box_1.Box {
    constructor(data, onInvalidData) {
        (0, Expect_1.Expect)(data.length, `data: length cannot be 0`, onInvalidData);
        super(data);
    }
}
exports.NonEmptyStringBox = NonEmptyStringBox;
