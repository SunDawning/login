import{decodeRequestBody}from"./decodeRequestBody.js";
import{consoleLog}from"./consoleLog.js";
/**
 * 处理JSON格式的request.body
 * @param body request.body
 * 返回值为所解析的JSON，或undefined。
 */
export async function decodeRequestBodyInJSON(body){
    let requestBody=await decodeRequestBody(body);
    consoleLog("接收到请求",requestBody);
    try{
        requestBody=JSON.parse(requestBody);
        consoleLog("解析完包含的JSON",requestBody);
    }catch(error){
        consoleLog("无法解析JSON",error);
        requestBody=undefined;
    }
    return requestBody;
}
