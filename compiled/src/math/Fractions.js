"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGreatestCommonFactor = exports.SimplifyFraction = exports.AddFractions = exports.MultiplyFractions = exports.FractionToString = exports.StringToFraction = exports.ExpectFraction = void 0;
const Expect_1 = require("../away/Expect");
const Strings_1 = require("../strings/Strings");
/** An array in the form [numerator,denominator] */
function ExpectFraction(fraction) {
    (0, Expect_1.Expect)(fraction.length === 2);
}
exports.ExpectFraction = ExpectFraction;
function StringToFraction(string) {
    const [numeratorString, denominatorString] = string.split("/");
    const numerator = (0, Strings_1.StringToInteger)(numeratorString);
    if (denominatorString === undefined) {
        return [numerator, 1];
    }
    const denominator = (0, Strings_1.StringToInteger)(denominatorString);
    return [numerator, denominator];
}
exports.StringToFraction = StringToFraction;
function FractionToString(fraction) {
    ExpectFraction(fraction);
    if (fraction[1] === 1) {
        return "" + fraction[0];
    }
    return `${fraction[0]}/${fraction[1]}`;
}
exports.FractionToString = FractionToString;
function MultiplyFractions(a, b) {
    ExpectFraction(a);
    ExpectFraction(b);
    const result = [a[0] * b[0], a[1] * b[1]];
    return SimplifyFraction(result);
}
exports.MultiplyFractions = MultiplyFractions;
function MultiplyFraction(a, b) {
    ExpectFraction(a);
    const result = [a[0] * b, a[1] * b];
    return SimplifyFraction(result);
}
function AddFractions(a, b) {
    ExpectFraction(a);
    ExpectFraction(b);
    if (a[1] === b[1]) {
        const result = [a[0] + b[0], a[1]];
        return SimplifyFraction(result);
    }
    // can also optimize by checking if denominators are instead divisible
    // ...
    // multiple a and b like by multiplying each by 1
    // const likeDivisor = a[1]*b[1];
    // const aLike = [, likeDivisor];
    // const bLike = [b[0]*a[1], likeDivisor];
    // const result = [aLike[0]+bLike[0], likeDivisor];
    // ... optimization:
    const result = [a[0] * b[1] + b[0] * a[1], a[1] * b[1]];
    return SimplifyFraction(result);
}
exports.AddFractions = AddFractions;
function SimplifyFraction(a) {
    ExpectFraction(a);
    if (a[1] === 1) {
        return a;
    }
    if (a[1] === 0) {
        return a;
    }
    if (a[0] === 0) {
        return a;
    }
    const gcf = GetGreatestCommonFactor(a[0], a[1]);
    return [a[0] / gcf, a[1] / gcf];
}
exports.SimplifyFraction = SimplifyFraction;
/** https://en.wikipedia.org/wiki/Euclidean_algorithm */
function GetGreatestCommonFactor(a, b) {
    (0, Expect_1.Expect)(!isNaN(a));
    (0, Expect_1.Expect)(!isNaN(b));
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
exports.GetGreatestCommonFactor = GetGreatestCommonFactor;
