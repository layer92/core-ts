"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlEndingInSlashBox = void 0;
const Expect_1 = require("../away/Expect");
const UrlBox_1 = require("./UrlBox");
class UrlEndingInSlashBox extends UrlBox_1.UrlBox {
    constructor(data, onValidationFail) {
        (0, Expect_1.Expect)(data.endsWith("/"), `data: expected data to end with "/": ${data}`, onValidationFail);
        super(data, onValidationFail);
    }
}
exports.UrlEndingInSlashBox = UrlEndingInSlashBox;
