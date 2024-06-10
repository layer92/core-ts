"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modulo = void 0;
/*
    Modulo as defined in modular arithmetic.
    Different from Javascript's % operator in that negative input produces non-negative output.
    Example:
    Modulo(-1,4)===3 // ( compare with -1%4===-1 )
*/
function Modulo(value, modulus) {
    return ((value % modulus) + modulus) % modulus;
}
exports.Modulo = Modulo;
