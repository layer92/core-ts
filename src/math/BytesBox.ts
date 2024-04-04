import { Box } from "../away/Box";

/** deprecated, as it has little/no validation */
export class BytesBox extends Box<number>{
    private __BytesBox__:undefined;

    toBits(){
        return this._data*8;
    }

    static FromBits(bits:number){
        return new BytesBox(bits/8);
    }

    /**
     * 1 KiB = 1024 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromKib(kibibytes:number){
        return new BytesBox(kibibytes*1024);
    }

    /**
     * 1 MiB = 1024^2 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromMib(mebibytes:number){
        return new BytesBox(mebibytes*1048576);
    }

    /**
     * 1 GiB = 1024^3 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromGiB(gibibyte:number){
        return new BytesBox(gibibyte*1073741824);
    }

    /**
     * 1 TiB = 1024^4 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromTiB(tebibyte:number){
        return new BytesBox(tebibyte*1073741824*1024);
    }

    /**
     * 1 kB = 1000 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromKb(kilobytes:number){
        return new BytesBox(kilobytes*1000);
    }

    /**
     * 1 MB = 1000^2 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromMb(megabytes:number){
        return new BytesBox(megabytes*1000000);
    }

    /**
     * 1 GB = 1000^3 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromGb(gigabytes:number){
        return new BytesBox(gigabytes*1000000000);
    }

    /**
     * 1 TB = 1000^4 bytes
     * Read more: https://en.wikipedia.org/wiki/Megabyte
     */
    static FromTb(terabytes:number){
        return new BytesBox(terabytes*1000000000000);
    }
    
}