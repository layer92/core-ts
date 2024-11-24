import { Expect } from "../away/Expect";
import { StringToInteger } from "../strings/Strings";

/** An array in the form [numerator,denominator] */
export function ExpectFraction(fraction:Readonly<number[]>){
    Expect(fraction.length===2);
}

export function StringToFraction(string:string){
    const [numeratorString,denominatorString] = string.split("/");
    const numerator = StringToInteger(numeratorString);
    if(denominatorString===undefined){
        return [numerator,1];
    }
    const denominator = StringToInteger(denominatorString);
    return [numerator,denominator];
}

export function FractionToString(fraction:Readonly<number[]>){
    ExpectFraction(fraction);
    if(fraction[1]===1){
        return ""+fraction[0];
    }
    return `${fraction[0]}/${fraction[1]}`;
}

export function MultiplyFractions(a:Readonly<number[]>,b:Readonly<number[]>){
    ExpectFraction(a);
    ExpectFraction(b);
    const result = [a[0]*b[0],a[1]*b[1]];
    return SimplifyFraction(result);
}

function MultiplyFraction(a:Readonly<number[]>,b:number){
    ExpectFraction(a);
    const result = [a[0]*b, a[1]*b];
    return SimplifyFraction(result);
}

export function AddFractions(a:Readonly<number[]>,b:Readonly<number[]>){
    ExpectFraction(a);
    ExpectFraction(b);
    if(a[1]===b[1]){
        const result = [a[0]+b[0], a[1]];
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
    const result = [a[0]*b[1]+b[0]*a[1], a[1]*b[1]];
    return SimplifyFraction(result);
}

export function SimplifyFraction(a:Readonly<number[]>){
    ExpectFraction(a);
    if(a[1]===1){
        return a;
    }
    if(a[1]===0){
        return a;
    }
    if(a[0]===0){
        return a;
    }
    const gcf = GetGreatestCommonFactor(a[0],a[1]);
    return [a[0]/gcf, a[1]/gcf];
}

/** https://en.wikipedia.org/wiki/Euclidean_algorithm */
export function GetGreatestCommonFactor(a:number,b:number){
    Expect(!isNaN(a));
    Expect(!isNaN(b));
    while(b!==0){
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}