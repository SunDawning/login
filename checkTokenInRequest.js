import{consoleLog}from"./consoleLog.js";
import{checkToken}from"./checkToken.js";
/**
 * 验证在已经从请求里提取到的token
 * @param onBody 一个函数，自变量为验证结果。
 */
export function checkTokenInRequest(tokenInRequest,onBody){
    let body={
        isValidToken:false,
    }; // 存储验证的结果
    if(tokenInRequest){
        consoleLog("请求的信息里包含了token，验证token");
        checkToken(tokenInRequest,body);
    }
    consoleLog("验证的结果",body);
    if(onBody){
        onBody(body);
    }
}
