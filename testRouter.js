import{sendObjectInJSON}from"./sendObjectInJSON.js";
import{consoleLog}from"./consoleLog.js";
import{ACCOUNTS}from"./ACCOUNTS.js";
import{encrypt}from"./encrypt.js";
/**
 * 批量测试程序的功能
 */
export async function testRouter(port){
    function getURL(path){
        return `http://localhost:${port}${path}`; // 网址的前缀
    }
    let database=[];
    let validAccount=Object.keys(ACCOUNTS)[0];
    let random=new Date().getTime();
    /*
     * 测试＂/login＂，并记录token。
     */
    let loginResponse=await(await sendObjectInJSON(getURL("/login"),"POST",{
        account:validAccount,
        password:encrypt(ACCOUNTS[validAccount].password+random),
        random:random,
    })).json();
    database.push({
        document:`POST /login`,
        is:JSON.stringify(loginResponse),
    }); // 验证账号密码登录信息
    let inValidToken="inValidToken";
    let validToken=loginResponse.token;
    database.push({
        document:`验证GET /login`,
        is:await (await window.fetch(getURL("/login"))).text(),
        shouldbe:"",
        form:`window.fetch("${getURL("/login")}")`,
    })
    database.push({
        document:`POST /login 使用有效的token`,
        is:await (await sendObjectInJSON(getURL("/login"),"POST",{token:validToken})).text(),
        shouldbe:'{"isValidAccount":false,"isValidPassword":false,"isValidToken":true}',
        form:`sendObjectInJSON("${getURL("/login")}","POST",{token:"${validToken}"})`,
    });
    database.push({
        document:`POST /login 使用无效的token`,
        is:await (await sendObjectInJSON(getURL("/login"),"POST",{token:inValidToken})).text(),
        shouldbe:'{"isValidAccount":false,"isValidPassword":false,"isValidToken":false}',
        form:`sendObjectInJSON("${getURL("/login")}","POST",{token:"${inValidToken}"})`,
    });
    /*
     * 测试＂/isValidToken＂
     */
    database.push({
        document:`POST /isValidToken 使用无效的token`,
        is:await (await sendObjectInJSON(getURL("/isValidToken"),"POST",{token:inValidToken})).text(),
        shouldbe:'{"isValidToken":false}',
        form:`sendObjectInJSON("${getURL("/isValidToken")}","POST",{token:"${inValidToken}"})`,
    });
    database.push({
        document:`POST /isValidToken 使用有效的token`,
        is:await (await sendObjectInJSON(getURL("/isValidToken"),"POST",{token:validToken})).text(),
        shouldbe:'{"isValidToken":true}',
        form:`sendObjectInJSON("${getURL("/isValidToken")}","POST",{token:"${validToken}"})`,
    });
    database.push({
        document:`GET /isValidToken 使用无效的token`,
        is:await (await window.fetch(getURL(`/isValidToken?token=${inValidToken}`))).text(),
        shouldbe:'{"isValidToken":false}',
        form:`window.fetch("${getURL("/isValidToken?token=${inValidToken}")}")`,
    });
    database.push({
        document:`GET /isValidToken 使用有效的token`,
        is:await (await window.fetch(getURL(`/isValidToken?token=${validToken}`))).text(),
        shouldbe:'{"isValidToken":true}',
        form:`window.fetch("${getURL("/isValidToken?token=${validToken}")}")`,
    });
    let report={
        passed:[],
        failed:[],
    };
    database.forEach(function(data){
        let is=data.is;
        let shouldbe=data.shouldbe;
        if(is&&shouldbe&&(is===shouldbe)){
            report.passed.push(data);
        }else{
            report.failed.push(data);
        }
    });
    consoleLog("测试结果",Object.assign({
        total:database.length,
        passedTotal:report.passed.length,
        failedTotal:report.failed.length,
    },report));
}
import{PORT}from"./PORT.js";
if(import.meta.main){
    testRouter(PORT);
}
