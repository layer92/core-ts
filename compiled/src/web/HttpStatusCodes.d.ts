export declare const GetSuccessHttpStatusCode = 200;
export declare const PostSuccessHttpStatusCode = 201;
export declare const CustomVerbSuccessHttpStatusCode = 201;
export declare const PutSuccessHttpStatusCode = 200;
export declare const PatchSuccessHttpStatusCode = 200;
export declare const DeleteSuccessHttpStatusCode = 200;
export declare const BadRequestHttpStatusCode = 400;
export declare const MissingOrMalformedUrlParametersHttpStatusCode = 400;
/** https://en.wikipedia.org/wiki/Query_string */
export declare const MissingOrMalformedQueryStringHttpStatusCode = 400;
export declare const MalformedRequestBodyHttpStatusCode = 400;
export declare const ViolatesBusinessRulesHttpStatusCode = 400;
export declare const MissingOrMalformedHeaderStatusCode = 400;
export declare const UnauthenticatedHttpStatusCode = 401;
export declare const ForbiddenHttpStatusCode = 403;
export declare const UnauthorizedHttpStatusCode = 403;
export declare const NotFoundHttpStatusCode = 404;
/** Returned when attempting to modify a read-only (part of a) resource. */
export declare const ReadOnlyHttpStatusCode = 409;
/** The operation you are trying to do has already been done and cannot be done again. */
export declare const AlreadyDoneHttpStatusCode = 409;
export declare const SpaceLimitExceededHttpStatusCode = 429;
export declare const RequestLimitExceededHttpStatusCode = 429;
export declare const NotImplementedHttpStatusCode = 501;
export declare const BadGatewayHttpStatusCode = 502;
