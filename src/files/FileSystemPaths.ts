import { Expect } from "../away/Expect";
import { OnException } from "../away/OnException";

/**
 * - Cannot be ""
 * - Cannot include "//"
 */
export type FileSystemPath = string;

/**
 * A path used in a file system. Not to be confused with filepath, which is the file system path of specifically a file (not a folder)
 */
export function ExpectFileSystemPath(path:FileSystemPath,onBadData?:OnException){
    Expect(path!=="",`A file system path cannot be an empty string. Perhaps you meant ".." or "."?`,onBadData);
    Expect(!path.includes("//"),`File system path cannot not have a "//". This may indicate a buggy concatenation.`);
}

export function IsFileSystemPathAbsolute(path:FileSystemPath):boolean{
    ExpectFileSystemPath(path);
    if(path===""){
        return false;
    }
    return path.startsWith("/");
}

export function IsFileSystemPathRelative(path:FileSystemPath):boolean{
    ExpectFileSystemPath(path);
    if(path===""){
        return true;
    }
    return !path.startsWith("/");
}

export function IsFileSystemPathFolderPath(path:FileSystemPath):boolean{
    ExpectFileSystemPath(path);
    if(path===""){
        return true;
    }
    return path.endsWith("/");
}

export function IsFileSystemPathFilePath(path:FileSystemPath):boolean{
    return !IsFileSystemPathFolderPath(path);
}

/** @returns the folder path one level up from the given folder path, or undefined if the path has no parent */
export function MaybeGetFileSystemPathParentPath(path:FileSystemPath):string|undefined{
    ExpectFileSystemPath(path);
    if(path==="/"){
        return undefined;
    }
    const name = MaybeGetFileSystemPathName(path);
    Expect(name!==undefined);
    const parentPath = path.slice(0,-name.length);
    Expect(parentPath!=="");
    return parentPath;
}

/** Returns undefined if the folder/file specified by the path has no name. Might return ".." or "." if that is the name used in the path. */
export function MaybeGetFileSystemPathName(fileSystemPath:FileSystemPath):string|undefined{
    ExpectFileSystemPath(fileSystemPath);
    if(fileSystemPath==="/"){
        return undefined;
    }
    if(!fileSystemPath.endsWith("/")){
        fileSystemPath += "/";
    }
    // because the path ends in "/", we take the second to last item of the split
    const lastNode = fileSystemPath.split("/").slice(-2)[0];
    Expect(lastNode!=="");
    return lastNode;
}
