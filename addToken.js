import{encrypt}from"./encrypt.js";
import{TOKENS}from"./TOKENS.js";
import{consoleLog}from"./consoleLog.js";
/**
 * 根据用户登录信息来生成token并保存到TOKENS里 //
 * @param user 用户登录信息，形如：{account:"account",password:"passoword"} //
 * @return token 返回所生成的token //
 */
export function addToken(user){
    let account=user["account"];
    let timestamp=new Date().getTime();
    let token=encrypt(account+user["password"]+timestamp);
    // 在TOKENS里保存token
    TOKENS[token]={
        account:account,
        timestamp:timestamp,
    };
    let TOKEN={};
    TOKEN[token]=TOKENS[token];
    consoleLog("已记录token",TOKEN);
    return token;
}
