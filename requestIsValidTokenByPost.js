import{decodeRequestBody}from"./decodeRequestBody.js";
import{consoleLog}from"./consoleLog.js";
import{checkToken}from"./checkToken.js";
/**
 * POST请求验证是否是有效的token
 */
export async function requestIsValidTokenByPost(request){
    let requestBody=await decodeRequestBody(request.body);
    consoleLog("接收到请求验证token的信息",requestBody);
    requestBody=JSON.parse(requestBody);
    consoleLog("JSON parse",requestBody);
    let body={
        isValidToken:false,
    }; // 存储验证的结果
    let tokenInRequest=requestBody["token"];
    if(tokenInRequest){
        consoleLog("请求的信息里包含了token，验证token");
        checkToken(tokenInRequest,body);
    }
    request.respond({body:JSON.stringify(body)});
    consoleLog("验证的结果",body);
}
