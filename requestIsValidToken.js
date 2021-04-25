import{request404}from"./request404.js";
import{decodeRequestBody}from"./decodeRequestBody.js";
import{consoleLog}from"./consoleLog.js";
import{checkToken}from"./checkToken.js";
/**
 * 请求验证是否是有效的token
 */
export async function requestIsValidToken(request){
    consoleLog(request.method);
    if(request.method==="POST"){
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
    }else if(request.method==="GET"){ // /isValidToken?token=16466
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
    }else{
        request404(request);
    }
}
