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
    let pathname=new URL(request.url,"http://request.com").pathname;
    consoleLog(request.method,"访问",request.url,"=>",pathname);
    if(/(\.js|\.css|\.html)$/.test(pathname)){ // 访问本地文件
        requestFile(request);
    }else if(pathname==="/login"){ // 请求登录
        requestLogin(request);
    }else if(pathname==="/isValidToken"){ // 验证是否是有效的token
        requestIsValidToken(request);
    }else if(pathname==="/"){ // 请求根目录
        requestIndex(request);
    }else{ // 不符合上述要求，返回404。
        request404(request);
    }
}
