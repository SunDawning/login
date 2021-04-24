import{consoleLog}from"./consoleLog.js";
/**
 * 请求本地文件
 */
export function requestFile(request){
    let file=`.${request.url}`;
    consoleLog("请求本地文件",file);
    let body=new TextDecoder("utf-8").decode(Deno.readFileSync(file));
    consoleLog("解析完数据",file);
    let headers=new Headers();
    let contentType;
    if(file.endsWith(".js")){
        contentType="application/javascript";
    }else if(file.endsWith(".css")){
        contentType="text/css";
    }else{
        contentType="text/html";
    }
    headers.set("content-type",`${contentType}; charset=utf-8`);
    request.respond({
        body:body,
        headers:headers,
    });
}
