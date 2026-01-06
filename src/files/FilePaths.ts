import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";
import { FileFormatToExtension, IsFileFormatProbablyAudioFile } from "./FileFormats/FileFormats";
import { ExpectFileName, FileName } from "./FileNames";
import { ExpectFileSystemPath, IsFileSystemPathAbsolute, IsFileSystemPathRelative, MaybeGetFileSystemPathParentPath } from "./FileSystemPaths";

/**
 * - Cannot end with "/"
 */
export type FilePath = string;

/**
 * The path of a file, not a folder.
 */
export function ExpectFilePath(
    filePath:FilePath,
    onFail?:OnException
){
    ExpectFileSystemPath(filePath,onFail);
    Expect(!filePath.endsWith("/"),`value: ends with "/"`,onFail);
}

export function IsFilePathAbsolute(filePath:FilePath){
    ExpectFilePath(filePath);
    return IsFileSystemPathAbsolute(filePath);
}

export function IsFilePathRelative(filePath:FilePath){
    ExpectFilePath(filePath);
    return IsFileSystemPathRelative(filePath);
}

export function MaybeGetFilePathFileExtension(filePath:FilePath):string|undefined{
    ExpectFilePath(filePath);
    const format = MaybeGetFilePathFileFormat(filePath);
    if(format===undefined){
        return undefined;
    }
    return FileFormatToExtension(format);
}

export function MaybeGetFilePathFileFormat(filePath:FilePath):string|undefined{
    ExpectFilePath(filePath);
    const [lastNode] = filePath.split("/").slice(-1);
    const lastNodeSplit = lastNode.split(".");
    if(lastNodeSplit.length===1){
        return undefined;
    }
    const format = lastNodeSplit.slice(-1)[0] as string|undefined;
    if( format===undefined || format==="" ){
        return undefined;
    }
    return format;
}

export function IsFilePathProbablyAudioFile(filePath:FilePath){
    const format = MaybeGetFilePathFileFormat(filePath);
    if(!format){
        return false;
    }
    return IsFileFormatProbablyAudioFile(format);
}

/** Returns the fileName at the end of the filePath */
export function GetFilePathFileName(filePath:FilePath):FileName{
    ExpectFilePath(filePath);
    const lastNode = filePath.split("/").slice(-1)[0];
    ExpectFileName(lastNode);
    return lastNode;
}

/** @returns the folder path one level up from the given file path, or undefined if the path has no parent */
export function MaybeGetFilePathParentPath(filePath:FilePath):string|undefined{
    ExpectFilePath(filePath);
    return MaybeGetFileSystemPathParentPath(filePath);
}

/** Returns a filepath with the filename renamed  */
export function RenameFilePathFileName(filePath:FilePath,toFileName:string):string{
    ExpectFilePath(filePath);
    ExpectFileName(toFileName);
    const toFolder = MaybeGetFilePathParentPath(filePath);
    return toFolder+toFileName;
}


/** changes, eg ("foo/bar/baz.buzz","ABC") --> "/foo/bar/bazABC.buzz" Note that ("foo/bar.tar.gz","ABC")-->("foo/bar.tarABC.gz")*/
export function AppendToFilePathBaseFileName(filePath:string,append:string){
    const extension = MaybeGetFilePathFileExtension(filePath);
    if(!extension?.length){
        return filePath+append;
    }
    const pathUpToExtension = filePath.slice(0,-extension.length);
    return pathUpToExtension+append+extension;
}