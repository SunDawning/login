import{decodeRequestBody}from"./decodeRequestBody.js";
import{consoleLog}from"./consoleLog.js";
import{checkToken}from"./checkToken.js";
import{checkAccountPassword}from"./checkAccountPassword.js";
/**
 * POST请求＂/login＂页面，验证登录信息。
 */
export async function requestPostLogin(request){
    let requestBody=await decodeRequestBody(request.body);
    consoleLog("接收到请求登录的信息",requestBody);
    requestBody=JSON.parse(requestBody);
    consoleLog("JSON parse",requestBody);
    // 存储验证的结果
    let body={
        account:false,
        password:false,
    };
    if(requestBody["token"]){
        consoleLog("请求的信息里包含了token，验证token登录");
        checkToken(requestBody,body);
    }else{
        consoleLog("验证账号密码登录");
        checkAccountPassword(requestBody,body);
    }
    request.respond({
        status:200,
        // error: Uncaught (in promise) TypeError: r.read is not a function
        body:JSON.stringify(body),
    });
    consoleLog(body);
}
