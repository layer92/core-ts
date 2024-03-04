import { Box } from "../away/Box";

export class HttpStatusCodeBox extends Box<number>{
    private readonly __HttpStatusCodeBox__:undefined;
    is(number:number){
        return this.getData()===number;
    }
}

export const GetSuccessHttpStatusCodeBox = new HttpStatusCodeBox(200);
export const PostSuccessHttpStatusCodeBox = new HttpStatusCodeBox(201);
export const CustomVerbSuccessHttpStatusCodeBox = new HttpStatusCodeBox(201);
export const PutSuccessHttpStatusCodeBox = new HttpStatusCodeBox(200);
export const PatchSuccessHttpStatusCodeBox = new HttpStatusCodeBox(200);
export const DeleteSuccessHttpStatusCodeBox = new HttpStatusCodeBox(200);

export const BadRequestHttpStatusCodeBox = new HttpStatusCodeBox(400);
export const MissingOrMalformedUrlParametersHttpStatusCodeBox = new HttpStatusCodeBox(400);
/** https://en.wikipedia.org/wiki/Query_string */
export const MissingOrMalformedQueryStringHttpStatusCodeBox = new HttpStatusCodeBox(400);
export const MalformedRequestBodyHttpStatusCodeBox = new HttpStatusCodeBox(400);
// https://softwareengineering.stackexchange.com/questions/329229/should-i-return-an-http-400-bad-request-status-if-a-parameter-is-syntactically
export const ViolatesBusinessRulesHttpStatusCodeBox = new HttpStatusCodeBox(400);
export const UnauthenticatedHttpStatusCodeBox = new HttpStatusCodeBox(401);
export const ForbiddenHttpStatusCodeBox = new HttpStatusCodeBox(403);
export const UnauthorizedHttpStatusCodeBox = new HttpStatusCodeBox(403);
export const NotFoundHttpStatusCodeBox = new HttpStatusCodeBox(404);
/** Returned when attempting to modify a read-only (part of a) resource. */
export const ReadOnlyHttpStatusCodeBox = new HttpStatusCodeBox(409);
/** The operation you are trying to do has already been done and cannot be done again. */
export const AlreadyDoneHttpStatusCodeBox = new HttpStatusCodeBox(409);
export const SpaceLimitExceededHttpStatusCodeBox = new HttpStatusCodeBox(429);
export const RequestLimitExceededHttpStatusCodeBox = new HttpStatusCodeBox(429);

export const NotImplementedHttpStatusCodeBox = new HttpStatusCodeBox(501);
export const BadGatewayHttpStatusCodeBox = new HttpStatusCodeBox(502);