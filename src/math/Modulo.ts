/**
    Modulo as defined in modular arithmetic.
    Different from Javascript's % operator in that negative input produces non-negative output.
    Example:
    `Modulo(-1,4)===3`
    Compare with:
    `-1%4===-1`
*/
export function Modulo(value:number,modulus:number){
    return ( (value%modulus)+modulus ) % modulus;
}