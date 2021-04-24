import{consoleLog}from"./consoleLog.js";
import{existsSync}from"https://deno.land/std@0.95.0/fs/mod.ts";
import{inForbiddenFiles}from"./inForbiddenFiles.js";
import{request404}from"./request404.js";
/**
 * 请求本地文件
 */
export function requestFile(request){
    let file=request.url.substring(1);
    consoleLog("请求本地文件",file);
    if(existsSync(file)===false){ // 文件不存在
        request404(request);
    }else if(inForbiddenFiles(file)===true){ // 文件被禁止访问
        request404(request);
    }else{
        let body=new TextDecoder("utf-8").decode(Deno.readFileSync(file));
        consoleLog("解析完数据",file);
        let contentType;
        if(file.endsWith(".js")){
            contentType="application/javascript";
        }else if(file.endsWith(".css")){
            contentType="text/css";
        }else{
            contentType="text/html";
        }
        let headers=new Headers();
        headers.set("content-type",`${contentType}; charset=utf-8`);
        request.respond({
            body:body,
            headers:headers,
        });
    };
}
