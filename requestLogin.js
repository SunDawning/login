import{request404}from"./request404.js";
import{requestLoginByPost}from"./requestLoginByPost.js";
/**
 * 请求＂/login＂页面
 */
export function requestLogin(request){
    // POST请求访问
    // error: Uncaught (in promise) SyntaxError: Unexpected end of JSON input
    if(request.method==="POST"){
        requestLoginByPost(request);
    }else{
        request404(request);
    }
}
