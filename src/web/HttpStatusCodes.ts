export const GetSuccessHttpStatusCode = 200;
export const PostSuccessHttpStatusCode = 201;
export const CustomVerbSuccessHttpStatusCode = 201;
export const PutSuccessHttpStatusCode = 200;
export const PatchSuccessHttpStatusCode = 200;
export const DeleteSuccessHttpStatusCode = 200;

export const BadRequestHttpStatusCode = 400;
export const MissingOrMalformedUrlParametersHttpStatusCode = 400;
/** https://en.wikipedia.org/wiki/Query_string */
export const MissingOrMalformedQueryStringHttpStatusCode = 400;
export const MalformedRequestBodyHttpStatusCode = 400;
// https://softwareengineering.stackexchange.com/questions/329229/should-i-return-an-http-400-bad-request-status-if-a-parameter-is-syntactically
export const ViolatesBusinessRulesHttpStatusCode = 400;
// as suggested in: https://stackoverflow.com/questions/10576898/what-is-the-most-appropriate-http-status-code-to-return-if-a-required-header-is
export const MissingOrMalformedHeaderStatusCode = 400;
export const UnauthenticatedHttpStatusCode = 401;
export const ForbiddenHttpStatusCode = 403;
export const UnauthorizedHttpStatusCode = 403;
export const NotFoundHttpStatusCode = 404;
/** Returned when attempting to modify a read-only (part of a) resource. */
export const ReadOnlyHttpStatusCode = 409;
/** The operation you are trying to do has already been done and cannot be done again. */
export const AlreadyDoneHttpStatusCode = 409;
export const SpaceLimitExceededHttpStatusCode = 429;
export const RequestLimitExceededHttpStatusCode = 429;

export const NotImplementedHttpStatusCode = 501;
export const BadGatewayHttpStatusCode = 502;