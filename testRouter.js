import{sendObjectInJSON}from"./sendObjectInJSON.js";
import{consoleLog}from"./consoleLog.js";
import{TOKENS}from"./TOKENS.js";
import{ACCOUNTS}from"./ACCOUNTS.js";
import{encrypt}from"./encrypt.js";
/**
 * 批量测试程序的功能
 */
export async function testRouter(port){
    function getURL(path){
        return `http://localhost:${port}${path}`; // 网址的前缀
    }
    let body=[];
    let validAccount=Object.keys(ACCOUNTS)[0];
    let random=new Date().getTime();
    /*
     * 测试＂/login＂，并记录token。
     */
    body.push({
        document:`POST /login`,
        response:await(await sendObjectInJSON(getURL("/login"),"POST",{
            account:validAccount,
            password:encrypt(ACCOUNTS[validAccount].password+random),
            random:random,
        })).json(),
    }); // 验证账号密码登录信息
    let inValidToken="inValidToken";
    let validToken=Object.keys(TOKENS)[0];
    // body.push({
    //     document:`验证GET /login`,
    //     response:await (await window.fetch(getURL("/login"))).json(),
    // })
    body.push({
        document:`POST /login 使用有效的token`,
        response:await (await sendObjectInJSON(getURL("/login"),"POST",{token:validToken})).json(),
    });
    body.push({
        document:`POST /login 使用无效的token`,
        response:await (await sendObjectInJSON(getURL("/login"),"POST",{token:inValidToken})).json(),
    });
    /*
     * 测试＂/isValidToken＂
     */
    body.push({
        document:`POST /isValidToken 使用无效的token`,
        response:await (await sendObjectInJSON(getURL("/isValidToken"),"POST",{token:inValidToken})).json(),
    });
    body.push({
        document:`POST /isValidToken 使用有效的token`,
        response:await (await sendObjectInJSON(getURL("/isValidToken"),"POST",{token:validToken})).json(),
    });
    body.push({
        document:`GET /isValidToken 使用无效的token`,
        response:await (await window.fetch(getURL(`/isValidToken?token=${inValidToken}`))).json(),
    });
    body.push({
        document:`GET /isValidToken 使用有效的token`,
        response:await (await window.fetch(getURL(`/isValidToken?token=${validToken}`))).json(),
    })
    consoleLog("测试结果",body);
}
import{PORT}from"./PORT.js";
if(import.meta.main){
    testRouter(PORT);
}
