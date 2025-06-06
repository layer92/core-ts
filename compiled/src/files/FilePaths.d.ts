import { OnException } from "../away/OnException";
import { FileName } from "./FileNames";
/**
 * - Cannot end with "/"
 */
export type FilePath = string;
/**
 * The path of a file, not a folder.
 */
export declare function ExpectFilePath(filePath: FilePath, onFail?: OnException): void;
export declare function IsFilePathAbsolute(filePath: FilePath): boolean;
export declare function IsFilePathRelative(filePath: FilePath): boolean;
export declare function MaybeGetFilePathFileExtension(filePath: FilePath): string;
export declare function MaybeGetFilePathFileFormat(filePath: FilePath): string;
export declare function IsFilePathProbablyAudioFile(filePath: FilePath): boolean;
/** Returns the fileName at the end of the filePath */
export declare function GetFilePathFileName(filePath: FilePath): FileName;
/** @returns the folder path one level up from the given file path, or undefined if the path has no parent */
export declare function MaybeGetFilePathParentPath(filePath: FilePath): string | undefined;
/** Returns a filepath with the filename renamed  */
export declare function RenameFilePathFileName(filePath: FilePath, toFileName: string): string;
