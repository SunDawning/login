import{TOKENS}from"./TOKENS.js";
import{consoleLog}from"./consoleLog.js";
/**
 * 验证token是否是TOKENS里有效的，并在body里保存验证结果。
 */
export function checkToken(token,body){
    if(token){
        if(TOKENS[token]){
            // 确认token有效
            consoleLog("有效token");
            body.isValidToken=true;
        }else{
            // 让token失效
            consoleLog("无效token")
            body.isValidToken=false;
        }
    }
}
