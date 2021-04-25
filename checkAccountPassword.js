import{consoleLog}from"./consoleLog.js";
import{ACCOUNTS}from"./ACCOUNTS.js";
import{encrypt}from"./encrypt.js";
import{addToken}from"./addToken.js";
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
                body.token=addToken(Object.assign(user,{account:lowerCaseAccount}));
            }
        }
    }
}
