export async function SleepAsync(ms:number){
    return new Promise(
        (accept)=>setTimeout(accept,ms)
    );
}