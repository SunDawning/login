import{decodeRequestBody}from"./decodeRequestBody.js";
import{consoleLog}from"./consoleLog.js";
import{checkTokenInRequest}from"./checkTokenInRequest.js";
/**
 * POST请求验证是否是有效的token
 */
export async function requestIsValidTokenByPost(request){
    let requestBody=await decodeRequestBody(request.body);
    consoleLog("接收到请求验证token的信息",requestBody);
    requestBody=JSON.parse(requestBody);
    consoleLog("JSON parse",requestBody);
    function onBody(body){
        request.respond({body:JSON.stringify(body)});
    }
    checkTokenInRequest(requestBody["token"],onBody);
}
