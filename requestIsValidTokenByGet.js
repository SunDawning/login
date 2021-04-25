import{consoleLog}from"./consoleLog.js";
import{checkToken}from"./checkToken.js";
/**
 * GET请求验证是否是有效的token
 */
export async function requestIsValidTokenByGet(request){
    let url=new URL(request.url,"http://token.com");
    let tokenInRequest=url.searchParams.get("token");
    "http://localhost:1547/isValidToken?token=16466a81b3f71376434be36ecd66a59b910c81b7";
    let body={
        isValidToken:false,
    }; // 存储验证的结果
    if(tokenInRequest){
        consoleLog("请求的信息里包含了token，验证token");
        checkToken(tokenInRequest,body);
    }
    request.respond({body:JSON.stringify(body)});
    consoleLog("验证的结果",body);
}
