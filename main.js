/*
 * 登录界面
 */
import{serve}from"https://deno.land/std/http/server.ts";
import{consoleLog}from"./consoleLog.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/consoleLog.js
import{router}from"./router.js";
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
    router(request);
}
