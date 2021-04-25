import{decodeRequestBody}from"./decodeRequestBody.js";
import{consoleLog}from"./consoleLog.js";
/**
 * 处理JSON格式的request.body
 */
export async function decodeRequestBodyInJSON(body){
    let requestBody=await decodeRequestBody(body);
    consoleLog("接收到请求验证token的信息",requestBody);
    requestBody=JSON.parse(requestBody);
    consoleLog("JSON parse",requestBody);
    return requestBody;
}
