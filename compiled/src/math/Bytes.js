"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytesToTb = exports.TbToBytes = exports.BytesToGb = exports.GbToBytes = exports.BytesToMb = exports.MbToBytes = exports.BytesToKb = exports.KbToBytes = exports.BytesToTib = exports.TibToBytes = exports.BytesToGib = exports.GibToBytes = exports.BytesToMib = exports.MibToBytes = exports.BytesToKib = exports.KibToBytes = exports.BytesToBits = exports.BitsToBytes = void 0;
function BitsToBytes(bits) {
    return bits / 8;
}
exports.BitsToBytes = BitsToBytes;
function BytesToBits(bytes) {
    return bytes * 8;
}
exports.BytesToBits = BytesToBits;
/**
 * 1 KiB = 1024 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function KibToBytes(kibibytes) {
    kibibytes * 1024;
}
exports.KibToBytes = KibToBytes;
/**
 * 1 KiB = 1024 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function BytesToKib(kibibytes) {
    kibibytes / 1024;
}
exports.BytesToKib = BytesToKib;
/**
 * 1 MiB = 1024^2 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function MibToBytes(mebibytes) {
    return mebibytes * 1048576;
}
exports.MibToBytes = MibToBytes;
/**
 * 1 MiB = 1024^2 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function BytesToMib(mebibytes) {
    return mebibytes / 1048576;
}
exports.BytesToMib = BytesToMib;
/**
 * 1 GiB = 1024^3 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function GibToBytes(gibibyte) {
    return gibibyte * 1073741824;
}
exports.GibToBytes = GibToBytes;
/**
 * 1 GiB = 1024^3 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function BytesToGib(gibibyte) {
    return gibibyte / 1073741824;
}
exports.BytesToGib = BytesToGib;
/**
 * 1 TiB = 1024^4 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function TibToBytes(tebibyte) {
    return tebibyte * 1073741824 * 1024;
}
exports.TibToBytes = TibToBytes;
/**
 * 1 TiB = 1024^4 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function BytesToTib(tebibyte) {
    return tebibyte / (1073741824 * 1024);
}
exports.BytesToTib = BytesToTib;
/**
 * 1 kB = 1000 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function KbToBytes(kilobytes) {
    return kilobytes * 1000;
}
exports.KbToBytes = KbToBytes;
/**
 * 1 kB = 1000 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function BytesToKb(kilobytes) {
    return kilobytes / 1000;
}
exports.BytesToKb = BytesToKb;
/**
 * 1 MB = 1000^2 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function MbToBytes(megabytes) {
    return megabytes * 1000000;
}
exports.MbToBytes = MbToBytes;
/**
 * 1 MB = 1000^2 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function BytesToMb(megabytes) {
    return megabytes / 1000000;
}
exports.BytesToMb = BytesToMb;
/**
 * 1 GB = 1000^3 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function GbToBytes(gigabytes) {
    return gigabytes * 1000000000;
}
exports.GbToBytes = GbToBytes;
/**
 * 1 GB = 1000^3 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function BytesToGb(gigabytes) {
    return gigabytes / 1000000000;
}
exports.BytesToGb = BytesToGb;
/**
 * 1 TB = 1000^4 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function TbToBytes(terabytes) {
    return terabytes * 1000000000000;
}
exports.TbToBytes = TbToBytes;
/**
 * 1 TB = 1000^4 bytes
 * Read more: https://en.wikipedia.org/wiki/Megabyte
 */
function BytesToTb(terabytes) {
    return terabytes / 1000000000000;
}
exports.BytesToTb = BytesToTb;
