import{consoleLog}from"./consoleLog.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/consoleLog.js
import{requestFile}from"./requestFile.js";
import{requestLogin}from"./requestLogin.js";
import{requestIndex}from"./requestIndex.js";
/**
 * 能访问的内容
 * 路由表
 */
export function router(request){
    consoleLog("访问",request.url);
    // 访问.js文件时：/gui.html.js => ./gui.html.js
    if(/(\.js|\.css)$/.test(request.url)){
        requestFile(request);
    }else{
        switch(request.url){
            case "/login":
                requestLogin(request);
                break;
            default:
                requestIndex(request);
        }
    }
}
