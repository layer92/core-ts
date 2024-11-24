/** An array in the form [numerator,denominator] */
export declare function ExpectFraction(fraction: Readonly<number[]>): void;
export declare function StringToFraction(string: string): number[];
export declare function FractionToString(fraction: Readonly<number[]>): string;
export declare function MultiplyFractions(a: Readonly<number[]>, b: Readonly<number[]>): readonly number[];
export declare function AddFractions(a: Readonly<number[]>, b: Readonly<number[]>): readonly number[];
export declare function SimplifyFraction(a: Readonly<number[]>): readonly number[];
/** https://en.wikipedia.org/wiki/Euclidean_algorithm */
export declare function GetGreatestCommonFactor(a: number, b: number): number;
