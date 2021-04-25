/*
 * 登录界面
 * 在浏览器里使用程序
 */
let hostname="0.0.0.0";
import{PORT}from"./PORT.js";
let port=PORT;
import{serve}from"https://deno.land/std@0.95.0/http/server.ts";
let server=serve({
    hostname:hostname,
    port:port
});
import{consoleLog}from"./consoleLog.js";
consoleLog(`HTTP服务器正在运行，地址为：

- http://${hostname}:${port}/
- http://localhost:${port}

在浏览器里访问上述地址，即可在界面里进行登录。

Powered by Deno.
`);
import{router}from"./router.js";
for await (let request of server){
    router(request);
}
