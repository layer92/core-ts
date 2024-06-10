"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64StringToPlaintText = exports.PlaintextToBase64String = void 0;
function PlaintextToBase64String(plaintext) {
    return Buffer.from(plaintext, "utf-8").toString("base64");
}
exports.PlaintextToBase64String = PlaintextToBase64String;
function Base64StringToPlaintText(base64) {
    return Buffer.from(base64, "base64").toString("utf-8");
}
exports.Base64StringToPlaintText = Base64StringToPlaintText;
