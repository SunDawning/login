import{consoleLog}from"./consoleLog.js";
import{requestFile}from"./requestFile.js";
import{requestLogin}from"./requestLogin.js";
import{requestIndex}from"./requestIndex.js";
import{request404}from"./request404.js";
/**
 * 能访问的内容
 * 路由表
 */
export function router(request){
    consoleLog("访问",request.url);
    // 访问本地文件
    if(/(\.js|\.css|\.html)$/.test(request.url)){
        requestFile(request);
    }else{
        switch(request.url){
            case "/login":
                requestLogin(request);
                break;
            case "/":
                requestIndex(request);
                break;
            default:
                request404(request);
        }
    }
}
