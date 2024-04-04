"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BbcodeStringBox = void 0;
const Box_1 = require("../away/Box");
const Strings_1 = require("./Strings");
// TODO: finish
class BbcodeStringBox extends Box_1.Box {
    static MakeFromPlainText(text) {
        const data = Strings_1.Strings.MultiReplace(text, [
            ["\t", "[tab]"],
            ["\n", "[br]"],
            ["\r", ""],
        ]);
        return new BbcodeStringBox(data);
    }
}
exports.BbcodeStringBox = BbcodeStringBox;
