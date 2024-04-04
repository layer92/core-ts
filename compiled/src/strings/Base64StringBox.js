"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64StringBox = void 0;
const Box_1 = require("../away/Box");
class Base64StringBox extends Box_1.Box {
    static FromPlaintext(plaintext) {
        const buffer = Buffer.from(plaintext, "utf-8");
        const data = buffer.toString("base64");
        return new Base64StringBox(data);
    }
    toPlaintext() {
        const buffer = Buffer.from(this._data, "base64");
        return buffer.toString("utf-8");
    }
}
exports.Base64StringBox = Base64StringBox;
