/*
 * 登录界面
 */
import{serve}from"https://deno.land/std/http/server.ts";
import{decodeRequestBody}from"https://gitee.com/sundawning/git-diff-7z/raw/c1370a7ed52662736dabfe779a34488fd7fe32cf/decodeRequestBody.js";
import{consoleLog}from"./consoleLog.js";
/**
 * 在浏览器里使用程序
 */
let hostname="0.0.0.0";
let port=1547;
let server=serve({
    hostname:hostname,
    port:port
});
consoleLog(`HTTP服务器正在运行，地址为：

- http://${hostname}:${port}/
- http://localhost:${port}

在浏览器里访问上述地址，即可在界面里进行打包。

Powered by Deno.
`);
for await (let request of server){
    let body;
    let headers;
    consoleLog("访问",request.url);
    // 访问.js文件时：/gui.html.js => ./gui.html.js
    if(request.url.endsWith(".js")){
        let file=`.${request.url}`;
        body=new TextDecoder("utf-8").decode(Deno.readFileSync(file));
        consoleLog("解析完数据",file);
        headers=new Headers();
        headers.set("content-type","application/javascript; charset=utf-8");
        request.respond({body:body,headers:headers});
    }else{
        switch(request.url){
            case "/login":
                consoleLog("登录");
                request.respond({status:200});
                break;
            default:
                body=new TextDecoder("utf-8").decode(Deno.readFileSync("index.html"));
                request.respond({body});
        }
    }
}
