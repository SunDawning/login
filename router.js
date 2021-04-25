import{consoleLog}from"./consoleLog.js";
import{requestFile}from"./requestFile.js";
import{requestLogin}from"./requestLogin.js";
import{requestIndex}from"./requestIndex.js";
import{request404}from"./request404.js";
import{requestIsValidToken}from"./requestIsValidToken.js";
/**
 * 能访问的内容
 * 路由表
 */
export function router(request){
    consoleLog("访问",request.url);
    let url=new URL(request.url,"http://request.com");
    let pathname=url.pathname;
    consoleLog("pathname",pathname);
    if(/(\.js|\.css|\.html)$/.test(pathname)){ // 访问本地文件
        requestFile(request);
    }else{
        switch(pathname){
            case "/login":
                requestLogin(request);
                break;
            case "/isValidToken":
                requestIsValidToken(request);
                break;
            case "/":
                requestIndex(request);
                break;
            default:
                request404(request);
        }
    }
}
