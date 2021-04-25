import{consoleLog}from"./consoleLog.js";
import{request404}from"./request404.js";
import{requestIsValidTokenByPost}from"./requestIsValidTokenByPost.js";
import{requestIsValidTokenByGet}from"./requestIsValidTokenByGet.js";
/**
 * 请求验证是否是有效的token
 */
export function requestIsValidToken(request){
    if(request.method==="POST"){
        requestIsValidTokenByPost(request);
    }else if(request.method==="GET"){
        requestIsValidTokenByGet(request);
    }else{
        request404(request);
    }
}
