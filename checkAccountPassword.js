import{consoleLog}from"./consoleLog.js";
import{encrypt}from"./encrypt.js";
import{ACCOUNTS}from"./ACCOUNTS.js";
import{TOKENS}from"./TOKENS.js";
/**
 * 验证账号密码登录信息，保存验证结果到body和TOKENS里。
 */
export function checkAccountPassword(requestBody,body){
    let account=requestBody["account"];
    consoleLog("account",account);
    if(account){
        let lowerCaseAccount=account.toLowerCase();
        consoleLog("lowerCaseAccount",lowerCaseAccount)
        let user=ACCOUNTS[lowerCaseAccount];
        if(user){
            consoleLog("用户存在");
            body.isValidAccount=true;
            let validPassword=encrypt(user["password"]+requestBody["random"]);
            if(validPassword===requestBody["password"]){
                consoleLog("密码正确");
                body.isValidPassword=true;
                let timestamp=new Date().getTime();
                let token=encrypt(account+user["password"]+timestamp);
                // 在内存里保存token
                TOKENS[token]={
                    account:account,
                    timestamp:timestamp,
                };
                let TOKEN={};
                TOKEN[token]=TOKENS[token];
                consoleLog("已在内存里保存token",TOKEN);
                body.token=token;
            }
        }
    }
}
