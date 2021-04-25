import{sendObjectInJSON}from"./sendObjectInJSON.js";
import{consoleLog}from"./consoleLog.js";
import{TOKENS}from"./TOKENS.js";
import{ACCOUNTS}from"./ACCOUNTS.js";
import{encrypt}from"./encrypt.js";
/**
 * 批量测试程序的功能
 */
export async function testRouter(host){
    function getURL(path){
        return `http://${host}${path}`; // 网址的前缀
    }
    let body={};
    let validAccount=Object.keys(ACCOUNTS)[0];
    let random=new Date().getTime();
    /*
     * 测试＂/login＂，并记录token。
     */
    await sendObjectInJSON(getURL("/login"),"POST",{
        account:validAccount,
        password:encrypt(ACCOUNTS[validAccount].password+random),
        random:random,
    }); // 验证账号密码登录信息
    let inValidToken="inValidToken";
    let validToken=Object.keys(TOKENS)[0];
    await window.fetch(getURL("/login")); // 验证GET /login
    await sendObjectInJSON(getURL("/login"),"POST",{token:validToken});
    await sendObjectInJSON(getURL("/login"),"POST",{token:inValidToken});
    /*
     * 测试＂/isValidToken＂
     */
    await sendObjectInJSON(getURL("/isValidToken"),"POST",{token:inValidToken});
    await sendObjectInJSON(getURL("/isValidToken"),"POST",{token:validToken});
    await window.fetch(getURL(`/isValidToken?token=${inValidToken}`));
    await window.fetch(getURL(`/isValidToken?token=${validToken}`));
    consoleLog("测试结果",body);
}
import{PORT}from"./PORT.js";
if(import.meta.main){
    testRouter(`localhost:${PORT}`);
}
