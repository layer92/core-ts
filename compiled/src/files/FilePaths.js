"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendToFilePathBaseFileName = exports.RenameFilePathFileName = exports.MaybeGetFilePathParentPath = exports.GetFilePathFileName = exports.IsFilePathProbablyAudioFile = exports.MaybeGetFilePathFileFormat = exports.MaybeGetFilePathFileExtension = exports.IsFilePathRelative = exports.IsFilePathAbsolute = exports.ExpectFilePath = void 0;
const Expect_1 = require("../away/Expect");
const FileFormats_1 = require("./FileFormats/FileFormats");
const FileNames_1 = require("./FileNames");
const FileSystemPaths_1 = require("./FileSystemPaths");
/**
 * The path of a file, not a folder.
 */
function ExpectFilePath(filePath, onFail) {
    (0, FileSystemPaths_1.ExpectFileSystemPath)(filePath, onFail);
    (0, Expect_1.Expect)(!filePath.endsWith("/"), `value: ends with "/"`, onFail);
}
exports.ExpectFilePath = ExpectFilePath;
function IsFilePathAbsolute(filePath) {
    ExpectFilePath(filePath);
    return (0, FileSystemPaths_1.IsFileSystemPathAbsolute)(filePath);
}
exports.IsFilePathAbsolute = IsFilePathAbsolute;
function IsFilePathRelative(filePath) {
    ExpectFilePath(filePath);
    return (0, FileSystemPaths_1.IsFileSystemPathRelative)(filePath);
}
exports.IsFilePathRelative = IsFilePathRelative;
function MaybeGetFilePathFileExtension(filePath) {
    ExpectFilePath(filePath);
    const format = MaybeGetFilePathFileFormat(filePath);
    if (format === undefined) {
        return undefined;
    }
    return (0, FileFormats_1.FileFormatToExtension)(format);
}
exports.MaybeGetFilePathFileExtension = MaybeGetFilePathFileExtension;
function MaybeGetFilePathFileFormat(filePath) {
    ExpectFilePath(filePath);
    const [lastNode] = filePath.split("/").slice(-1);
    const lastNodeSplit = lastNode.split(".");
    if (lastNodeSplit.length === 1) {
        return undefined;
    }
    const format = lastNodeSplit.slice(-1)[0];
    if (format === undefined || format === "") {
        return undefined;
    }
    return format;
}
exports.MaybeGetFilePathFileFormat = MaybeGetFilePathFileFormat;
function IsFilePathProbablyAudioFile(filePath) {
    const format = MaybeGetFilePathFileFormat(filePath);
    if (!format) {
        return false;
    }
    return (0, FileFormats_1.IsFileFormatProbablyAudioFile)(format);
}
exports.IsFilePathProbablyAudioFile = IsFilePathProbablyAudioFile;
/** Returns the fileName at the end of the filePath */
function GetFilePathFileName(filePath) {
    ExpectFilePath(filePath);
    const lastNode = filePath.split("/").slice(-1)[0];
    (0, FileNames_1.ExpectFileName)(lastNode);
    return lastNode;
}
exports.GetFilePathFileName = GetFilePathFileName;
/** @returns the folder path one level up from the given file path, or undefined if the path has no parent */
function MaybeGetFilePathParentPath(filePath) {
    ExpectFilePath(filePath);
    return (0, FileSystemPaths_1.MaybeGetFileSystemPathParentPath)(filePath);
}
exports.MaybeGetFilePathParentPath = MaybeGetFilePathParentPath;
/** Returns a filepath with the filename renamed  */
function RenameFilePathFileName(filePath, toFileName) {
    ExpectFilePath(filePath);
    (0, FileNames_1.ExpectFileName)(toFileName);
    const toFolder = MaybeGetFilePathParentPath(filePath);
    return toFolder + toFileName;
}
exports.RenameFilePathFileName = RenameFilePathFileName;
/** changes, eg ("foo/bar/baz.buzz","ABC") --> "/foo/bar/bazABC.buzz" Note that ("foo/bar.tar.gz","ABC")-->("foo/bar.tarABC.gz")*/
function AppendToFilePathBaseFileName(filePath, append) {
    const extension = MaybeGetFilePathFileExtension(filePath);
    if (!extension?.length) {
        return filePath + append;
    }
    console.debug({ filePath, extension });
    const pathUpToExtension = filePath.slice(0, -extension.length);
    return pathUpToExtension + append + extension;
}
exports.AppendToFilePathBaseFileName = AppendToFilePathBaseFileName;
