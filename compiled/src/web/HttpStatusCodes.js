"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadGatewayHttpStatusCode = exports.NotImplementedHttpStatusCode = exports.RequestLimitExceededHttpStatusCode = exports.SpaceLimitExceededHttpStatusCode = exports.AlreadyDoneHttpStatusCode = exports.ReadOnlyHttpStatusCode = exports.NotFoundHttpStatusCode = exports.UnauthorizedHttpStatusCode = exports.ForbiddenHttpStatusCode = exports.UnauthenticatedHttpStatusCode = exports.ViolatesBusinessRulesHttpStatusCode = exports.MalformedRequestBodyHttpStatusCode = exports.MissingOrMalformedQueryStringHttpStatusCode = exports.MissingOrMalformedUrlParametersHttpStatusCode = exports.BadRequestHttpStatusCode = exports.DeleteSuccessHttpStatusCode = exports.PatchSuccessHttpStatusCode = exports.PutSuccessHttpStatusCode = exports.CustomVerbSuccessHttpStatusCode = exports.PostSuccessHttpStatusCode = exports.GetSuccessHttpStatusCode = void 0;
exports.GetSuccessHttpStatusCode = 200;
exports.PostSuccessHttpStatusCode = 201;
exports.CustomVerbSuccessHttpStatusCode = 201;
exports.PutSuccessHttpStatusCode = 200;
exports.PatchSuccessHttpStatusCode = 200;
exports.DeleteSuccessHttpStatusCode = 200;
exports.BadRequestHttpStatusCode = 400;
exports.MissingOrMalformedUrlParametersHttpStatusCode = 400;
/** https://en.wikipedia.org/wiki/Query_string */
exports.MissingOrMalformedQueryStringHttpStatusCode = 400;
exports.MalformedRequestBodyHttpStatusCode = 400;
// https://softwareengineering.stackexchange.com/questions/329229/should-i-return-an-http-400-bad-request-status-if-a-parameter-is-syntactically
exports.ViolatesBusinessRulesHttpStatusCode = 400;
exports.UnauthenticatedHttpStatusCode = 401;
exports.ForbiddenHttpStatusCode = 403;
exports.UnauthorizedHttpStatusCode = 403;
exports.NotFoundHttpStatusCode = 404;
/** Returned when attempting to modify a read-only (part of a) resource. */
exports.ReadOnlyHttpStatusCode = 409;
/** The operation you are trying to do has already been done and cannot be done again. */
exports.AlreadyDoneHttpStatusCode = 409;
exports.SpaceLimitExceededHttpStatusCode = 429;
exports.RequestLimitExceededHttpStatusCode = 429;
exports.NotImplementedHttpStatusCode = 501;
exports.BadGatewayHttpStatusCode = 502;
