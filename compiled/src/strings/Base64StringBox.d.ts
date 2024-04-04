import { Box } from "../away/Box";
export declare class Base64StringBox extends Box<string> {
    private __Base64StringBox__;
    static FromPlaintext(plaintext: string): Base64StringBox;
    toPlaintext(): string;
}
