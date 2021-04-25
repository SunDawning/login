import{decodeRequestBodyInJSON}from"./decodeRequestBodyInJSON.js";
import{checkTokenInRequest}from"./checkTokenInRequest.js";
/**
 * POST请求验证是否是有效的token
 */
export async function requestIsValidTokenByPost(request){
    let requestBody=await decodeRequestBodyInJSON(request.body);
    let tokenInRequest;
    if(requestBody){
        tokenInRequest=requestBody["token"]
    }
    function onBody(body){
        request.respond({body:JSON.stringify(body)});
    }
    checkTokenInRequest(tokenInRequest,onBody);
}
