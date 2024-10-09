"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpectFolderName = void 0;
const Expect_1 = require("../away/Expect");
function ExpectFolderName(data) {
    (0, Expect_1.Expect)(data.length, "data: cannot be empty.");
    (0, Expect_1.Expect)(!data.includes("/"), "data: cannot have a slash in it.");
}
exports.ExpectFolderName = ExpectFolderName;
