export function PlaintextToBase64String(plaintext:string){
    return Buffer.from(plaintext,"utf-8").toString("base64");
}

export function Base64StringToPlaintText(base64:string){
    return Buffer.from(base64,"base64").toString("utf-8");
}