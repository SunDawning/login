import{consoleLog}from"./consoleLog.js";
import{checkTokenInRequest}from"./checkTokenInRequest.js";
/**
 * GET请求验证是否是有效的token  //
 */
export function requestIsValidTokenByGet(request){
    function onBody(body){
        request.respond({body:JSON.stringify(body)});
    }
    checkTokenInRequest(new URL(request.url,"http://token.com").searchParams.get("token"),onBody);
}
