import{decodeRequestBodyInJSON}from"./decodeRequestBodyInJSON.js";
import{consoleLog}from"./consoleLog.js";
import{checkToken}from"./checkToken.js";
import{checkAccountPassword}from"./checkAccountPassword.js";
/**
 * POST请求＂/login＂页面，验证登录信息。
 */
export async function requestLoginByPost(request){
    let requestBody=await decodeRequestBodyInJSON(request.body);
    let tokenInRequest;
    if(requestBody){
        tokenInRequest=requestBody["token"];
    }
    let body={
        isValidAccount:false,
        isValidPassword:false,
    }; // 存储验证的结果
    if(tokenInRequest){
        consoleLog("请求的信息里包含了token，验证token登录。");
        checkToken(tokenInRequest,body);
    }else{
        consoleLog("验证账号密码登录");
        checkAccountPassword(requestBody,body);
    }
    request.respond({body:JSON.stringify(body)});
    consoleLog("验证的结果",body);
}
