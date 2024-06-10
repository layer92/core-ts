
export function BitsToBytes(bits:number){
    return bits/8;
}

export function BytesToBits(bytes:number){
    return bytes*8;
}

/**
 * 1 KiB = 1024 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function KibToBytes(kibibytes:number){
    kibibytes*1024;
}

/**
 * 1 KiB = 1024 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function BytesToKib(kibibytes:number){
    kibibytes/1024;
}

/**
 * 1 MiB = 1024^2 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function MibToBytes(mebibytes:number){
    return mebibytes*1048576;
}

/**
 * 1 MiB = 1024^2 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function BytesToMib(mebibytes:number){
    return mebibytes/1048576;
}

/**
 * 1 GiB = 1024^3 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function GibToBytes(gibibyte:number){
    return gibibyte*1073741824;
}

/**
 * 1 GiB = 1024^3 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function BytesToGib(gibibyte:number){
    return gibibyte/1073741824;
}

/**
 * 1 TiB = 1024^4 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function TibToBytes(tebibyte:number){
    return tebibyte*1073741824*1024;
}

/**
 * 1 TiB = 1024^4 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function BytesToTib(tebibyte:number){
    return tebibyte/(1073741824*1024);
}

/**
 * 1 kB = 1000 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function KbToBytes(kilobytes:number){
    return kilobytes*1000;
}

/**
 * 1 kB = 1000 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function BytesToKb(kilobytes:number){
    return kilobytes/1000;
}

/**
 * 1 MB = 1000^2 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function MbToBytes(megabytes:number){
    return megabytes*1000000;
}

/**
 * 1 MB = 1000^2 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function BytesToMb(megabytes:number){
    return megabytes/1000000;
}

/**
 * 1 GB = 1000^3 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function GbToBytes(gigabytes:number){
    return gigabytes*1000000000;
}

/**
 * 1 GB = 1000^3 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function BytesToGb(gigabytes:number){
    return gigabytes/1000000000;
}

/**
 * 1 TB = 1000^4 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function TbToBytes(terabytes:number){
    return terabytes*1000000000000;
}

/**
 * 1 TB = 1000^4 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
export function BytesToTb(terabytes:number){
    return terabytes/1000000000000;
}


