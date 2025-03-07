import { OnException } from "../away/OnException";
/**
 * - Cannot be ""
 * - Cannot include "//"
 */
export type FileSystemPath = string;
/**
 * A path used in a file system. Not to be confused with filepath, which is the file system path of specifically a file (not a folder)
 */
export declare function ExpectFileSystemPath(path: FileSystemPath, onBadData?: OnException): void;
export declare function IsFileSystemPathAbsolute(path: FileSystemPath): boolean;
export declare function IsFileSystemPathRelative(path: FileSystemPath): boolean;
export declare function IsFileSystemPathFolderPath(path: FileSystemPath): boolean;
export declare function IsFileSystemPathFilePath(path: FileSystemPath): boolean;
/** @returns the folder path one level up from the given folder path, or undefined if the path has no parent */
export declare function MaybeGetFileSystemPathParentPath(path: FileSystemPath): string | undefined;
/** Returns undefined if the folder/file specified by the path has no name. Might return ".." or "." if that is the name used in the path. */
export declare function MaybeGetFileSystemPathName(fileSystemPath: FileSystemPath): string | undefined;
