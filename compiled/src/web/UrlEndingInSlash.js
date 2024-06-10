"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpectUrlEndingInSlash = void 0;
const Expect_1 = require("../away/Expect");
const Url_1 = require("./Url");
function ExpectUrlEndingInSlash(url, onBadData) {
    (0, Url_1.ExpectUrl)(url, onBadData);
    (0, Expect_1.Expect)(url.endsWith("/"), () => `data: expected data to end with "/": ${url}`, onBadData);
}
exports.ExpectUrlEndingInSlash = ExpectUrlEndingInSlash;
