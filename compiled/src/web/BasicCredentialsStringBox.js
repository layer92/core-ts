"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCredentialsStringBox = void 0;
const Box_1 = require("../away/Box");
const Expect_1 = require("../away/Expect");
const AuthorizationHeaderBox_1 = require("./AuthorizationHeaderBox");
/** Holds a string in the form username:password */
class BasicCredentialsStringBox extends Box_1.Box {
    constructor(data, onValidationFail) {
        (0, Expect_1.Expect)(data.includes(":"), `Expected ":"`, onValidationFail);
        super(data);
    }
    static Make({ id, password }) {
        return new BasicCredentialsStringBox(id + ":" + password);
    }
    toBasicAuthorizationHeader() {
        return AuthorizationHeaderBox_1.AuthenticationHeaderBox.FromBasicCredentialsStringBox(this);
    }
}
exports.BasicCredentialsStringBox = BasicCredentialsStringBox;
