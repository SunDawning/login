import{decodeRequestBodyInJSON}from"./decodeRequestBodyInJSON.js";
import{checkTokenInRequest}from"./checkTokenInRequest.js";
/**
 * POST请求验证是否是有效的token
 */
export function requestIsValidTokenByPost(request){
    function onBody(body){
        request.respond({body:JSON.stringify(body)});
    }
    checkTokenInRequest(decodeRequestBodyInJSON(request.body)["token"],onBody);
}
