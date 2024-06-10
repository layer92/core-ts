"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonEmptyStringBox = void 0;
const Expect_1 = require("../away/Expect");
function NonEmptyStringBox(data, onInvalidData) {
    (0, Expect_1.Expect)(data.length, `data: length cannot be 0`, onInvalidData);
}
exports.NonEmptyStringBox = NonEmptyStringBox;
