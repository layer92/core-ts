import { Box } from "../away/Box";
/** deprecated, as it has little/no validation */
export declare class BytesBox extends Box<number> {
    private __BytesBox__;
    toBits(): number;
    static FromBits(bits: number): BytesBox;
    /**
     * 1 KiB = 1024 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromKib(kibibytes: number): BytesBox;
    /**
     * 1 MiB = 1024^2 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromMib(mebibytes: number): BytesBox;
    /**
     * 1 GiB = 1024^3 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromGiB(gibibyte: number): BytesBox;
    /**
     * 1 TiB = 1024^4 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromTiB(tebibyte: number): BytesBox;
    /**
     * 1 kB = 1000 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromKb(kilobytes: number): BytesBox;
    /**
     * 1 MB = 1000^2 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromMb(megabytes: number): BytesBox;
    /**
     * 1 GB = 1000^3 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromGb(gigabytes: number): BytesBox;
    /**
     * 1 TB = 1000^4 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromTb(terabytes: number): BytesBox;
}
