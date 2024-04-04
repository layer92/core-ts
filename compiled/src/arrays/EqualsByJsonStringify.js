"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EqualsByJsonStringify = void 0;
const EqualsByJsonStringify = (a, b) => JSON.stringify(a) === JSON.stringify(b);
exports.EqualsByJsonStringify = EqualsByJsonStringify;
