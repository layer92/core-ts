"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFileExtensionProbablyUtf8Incompatible = exports.IsFileExtensionProbablyUtf8Compatible = exports.IsFileExtensionProbablyImageFile = exports.IsFileExtensionProbablyVideoFile = exports.IsFileExtensionProbablyAudioFile = exports.FileExtensionToFormat = exports.ExpectFileExtension = void 0;
const KnownAudioFileExtensions_1 = require("./KnownAudioFileExtensions");
const KnownVideoFileExtensions_1 = require("./KnownVideoFileExtensions");
const KnownImageFileExtensions_1 = require("./KnownImageFileExtensions");
const KnownUtf8CompatibleFileExtensions_1 = require("./KnownUtf8CompatibleFileExtensions");
const KnownUtf8IncompatibleFileExtensions_1 = require("./KnownUtf8IncompatibleFileExtensions");
const Expect_1 = require("../../away/Expect");
const Strings_1 = require("../../strings/Strings");
function ExpectFileExtension(extension) {
    (0, Expect_1.Expect)(extension.startsWith("."), `data: expected to start with "."`);
    (0, Expect_1.Expect)(!(0, Strings_1.IsInCharset)(extension, "."), `File extension with only periods (".", "...", etc) is not valid.`);
}
exports.ExpectFileExtension = ExpectFileExtension;
function FileExtensionToFormat(extension) {
    extension = extension.toLowerCase();
    ExpectFileExtension(extension);
    return extension.slice(1);
}
exports.FileExtensionToFormat = FileExtensionToFormat;
function IsFileExtensionProbablyAudioFile(extension) {
    extension = extension.toLowerCase();
    ExpectFileExtension(extension);
    return KnownAudioFileExtensions_1.KnownAudioFileExtensions.includes(extension);
}
exports.IsFileExtensionProbablyAudioFile = IsFileExtensionProbablyAudioFile;
function IsFileExtensionProbablyVideoFile(extension) {
    extension = extension.toLowerCase();
    ExpectFileExtension(extension);
    return KnownVideoFileExtensions_1.KnownVideoFileExtensions.includes(extension);
}
exports.IsFileExtensionProbablyVideoFile = IsFileExtensionProbablyVideoFile;
function IsFileExtensionProbablyImageFile(extension) {
    extension = extension.toLowerCase();
    ExpectFileExtension(extension);
    return KnownImageFileExtensions_1.KnownImageFileExtensions.includes(extension);
}
exports.IsFileExtensionProbablyImageFile = IsFileExtensionProbablyImageFile;
function IsFileExtensionProbablyUtf8Compatible(extension) {
    extension = extension.toLowerCase();
    ExpectFileExtension(extension);
    return KnownUtf8CompatibleFileExtensions_1.KnownUtf8CompatibleFileExtensions.includes(extension);
}
exports.IsFileExtensionProbablyUtf8Compatible = IsFileExtensionProbablyUtf8Compatible;
function IsFileExtensionProbablyUtf8Incompatible(extension) {
    extension = extension.toLowerCase();
    ExpectFileExtension(extension);
    // always return false if a whitelisted utf8able format (eg svg is an image, but it's also utf8 compatible)
    if (KnownUtf8CompatibleFileExtensions_1.KnownUtf8CompatibleFileExtensions.includes(extension)) {
        return false;
    }
    return KnownUtf8IncompatibleFileExtensions_1.KnownUtf8IncompatibleFileExtensions.includes(extension);
}
exports.IsFileExtensionProbablyUtf8Incompatible = IsFileExtensionProbablyUtf8Incompatible;
