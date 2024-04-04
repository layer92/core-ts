"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytesBox = void 0;
const Box_1 = require("../away/Box");
/** deprecated, as it has little/no validation */
class BytesBox extends Box_1.Box {
    toBits() {
        return this._data * 8;
    }
    static FromBits(bits) {
        return new BytesBox(bits / 8);
    }
    /**
     * 1 KiB = 1024 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromKib(kibibytes) {
        return new BytesBox(kibibytes * 1024);
    }
    /**
     * 1 MiB = 1024^2 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromMib(mebibytes) {
        return new BytesBox(mebibytes * 1048576);
    }
    /**
     * 1 GiB = 1024^3 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromGiB(gibibyte) {
        return new BytesBox(gibibyte * 1073741824);
    }
    /**
     * 1 TiB = 1024^4 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromTiB(tebibyte) {
        return new BytesBox(tebibyte * 1073741824 * 1024);
    }
    /**
     * 1 kB = 1000 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromKb(kilobytes) {
        return new BytesBox(kilobytes * 1000);
    }
    /**
     * 1 MB = 1000^2 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromMb(megabytes) {
        return new BytesBox(megabytes * 1000000);
    }
    /**
     * 1 GB = 1000^3 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromGb(gigabytes) {
        return new BytesBox(gigabytes * 1000000000);
    }
    /**
     * 1 TB = 1000^4 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromTb(terabytes) {
        return new BytesBox(terabytes * 1000000000000);
    }
}
exports.BytesBox = BytesBox;
