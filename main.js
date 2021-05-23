/*
 * 登录界面
 * 在浏览器里使用程序
 */
import{
    parse
}from"https://deno.land/std/flags/mod.ts";
let commandLineArgs=parse(Deno.args);
if(commandLineArgs.help){
    console.log(`
A Login Server to manage Login Page.

Version: <2021-05-23 Sun 11:57:34 UTC+08:00>

  USAGE:
    HomeServer [options]

  OPTIONS:
    --help              Prints help information
    --port <PORT>       Set port
`);
    Deno.exit();
}
import{formatTime}from"https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/formatTime.js";
console.log(formatTime(),"commandLineArgs",commandLineArgs);
let hostname="0.0.0.0";
let port=commandLineArgs.port;
import{PORT}from"./PORT.js";
if(port===undefined){
    port=PORT;
}
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
