import{decodeRequestBody}from"./decodeRequestBody.js";
import{consoleLog}from"./consoleLog.js";
import{encrypt}from"./encrypt.js";
import{ACCOUNTS}from"./ACCOUNTS.js";
let TOKENS={}; // 存储所有有时效的登录权限
/**
 * POST请求＂/login＂页面，验证登录信息。
 */
export async function requestPostLogin(request){
    let requestBody=await decodeRequestBody(request.body);
    consoleLog("接收到请求登录的信息",requestBody);
    requestBody=JSON.parse(requestBody);
    consoleLog("JSON parse",requestBody);
    let body={
        account:false,
        password:false,
    };
    // 验证token登录
    let token=requestBody["token"];
    if(token){
        if(TOKENS[token]){
            // 确认token有效
            consoleLog("有效token");
            body.token=true;
        }else{
            // 让token失效
            consoleLog("无效token")
            body.token=false;
        }
    }else{
        // 验证账号密码登录
        consoleLog("token不存在，验证账号密码登录。");
        let account=requestBody["account"];
        consoleLog("account",account);
        if(account){
            let lowerCaseAccount=account.toLowerCase();
            consoleLog("lowerCaseAccount",lowerCaseAccount)
            let user=ACCOUNTS[lowerCaseAccount];
            if(user){
                consoleLog("用户存在");
                body.account=true;
                let validPassword=encrypt(user["password"]+requestBody["random"]);
                if(validPassword===requestBody["password"]){
                    consoleLog("密码正确");
                    body.password=true;
                    let timestamp=new Date().getTime();
                    let token=encrypt(account+user["password"]+timestamp);
                    // 在内存里保存token
                    TOKENS[token]={
                        account:account,
                        timestamp:timestamp,
                    };
                    let TOKEN={};
                    TOKEN[token]=TOKENS[token];
                    consoleLog("在内存里保存token",TOKEN);
                    body.token=token;
                }
            }
        }
    }
    request.respond({
        status:200,
        // error: Uncaught (in promise) TypeError: r.read is not a function
        body:JSON.stringify(body),
    });
    consoleLog(body);    
}
