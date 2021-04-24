/*
 * 登录界面
 */
import{serve}from"https://deno.land/std/http/server.ts";
import{decodeRequestBody}from"./decodeRequestBody.js"; // https://gitee.com/sundawning/git-diff-7z/raw/c1370a7ed52662736dabfe779a34488fd7fe32cf/decodeRequestBody.js
import{consoleLog}from"./consoleLog.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/consoleLog.js
import{ACCOUNTS}from"./ACCOUNTS.js";
import{requestFile}from"./requestFile.js";
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
    if(/(\.js|\.css)$/.test(request.url)){
        requestFile(request);
    }else{
        switch(request.url){
            case "/login":
                let requestBody=await decodeRequestBody(request.body);
                consoleLog("登录",requestBody);
                requestBody=JSON.parse(requestBody);
                consoleLog("JSON parse",requestBody);
                body={
                    account:false,
                    password:false,
                };
                let account=requestBody["account"];
                consoleLog("account",account);
                if(account){
                    let lowerCaseAccount=account.toLowerCase();
                    consoleLog("lowerCaseAccount",lowerCaseAccount)
                    let user=ACCOUNTS[lowerCaseAccount];
                    consoleLog("user",user);
                    if(user){
                        body.account=true;
                        if(user["password"]===requestBody["password"]){
                            body.password=true;
                        }
                    }
                }
                // error: Uncaught (in promise) TypeError: r.read is not a function
                request.respond({status:200,body:JSON.stringify(body)});
                consoleLog(body);
                break;
            default:
                body=new TextDecoder("utf-8").decode(Deno.readFileSync("./index.html"));
                request.respond({body});
        }
    }
}
