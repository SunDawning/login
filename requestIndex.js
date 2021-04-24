/**
 * 请求＂/index.html＂
 */
export function requestIndex(request){
    let body=new TextDecoder("utf-8").decode(Deno.readFileSync("./index.html"));
    request.respond({body});
}
