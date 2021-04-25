import{consoleLog}from"./consoleLog.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/consoleLog.js
import * as Toast from"./Toast.js";
import{encrypt}from"./encrypt.js";
import{postObjectInJSON}from"./sendObjectInJSON.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/master/sendObjectInJSON.js
/**
 * 点击按钮后的登录事件
 */
export function onClick(event){
    // 查询登录信息
    let data=localStorage.getItem("loginData");
    // 使用账号密码登录
    if(data===null){
        let button=event.currentTarget;
        let collection=button.parentElement.getElementsByTagName("input");
        let inputAccount=collection["account"].value;
        if(inputAccount===""){
            Toast.warning("没有输入账号");
            return;
        }
        let inputPassword=collection["password"].value;
        if(inputPassword===""){
            Toast.warning("没有输入密码");
            return;
        }
        // 准备好将要用来登录的信息：账号、加密的密码
        data={
            account:inputAccount,
            password:inputPassword,
            random:new Date().getTime(),
        }
        data.password=encrypt(data.password+data.random);
    }else{
        data=JSON.parse(data);
        // 使用token登录
        if(data.token){
            data={
                token:data.token,
            }
        }
    }
    consoleLog("点击了登录按钮");
    consoleLog("发送登录信息",data);
    postObjectInJSON("/login",data).then(function(response){return response.json();}).then(function(json){
        consoleLog("返回验证信息",json);
        if(json.isValidToken===false){
            Toast.warning("登录已过期");
            // 删除保存的无效token
            if(localStorage.getItem("loginData")){
                data=JSON.parse(localStorage.getItem("loginData"));
                delete data.token;
            }
            localStorage.setItem("loginData",JSON.stringify(data));
            // 重新登录
            Toast.info("正在重新登录");
            onClick(event);
        }else if(json.isValidToken===true){
            Toast.success("登录成功");
        }else if(json.isValidAccount===false){
            Toast.warning("账号不存在");
            // 清空无效的登录信息
            localStorage.removeItem("loginData");
        }else if(json.isValidPassword===false){
            Toast.warning("密码不正确");
            // 清空无效的登录信息
            localStorage.removeItem("loginData");
        }else{
            Toast.success("登录成功");
            // 保存登录信息
            data.token=json.token;
            localStorage.setItem("loginData",JSON.stringify(data));
        }
    });
}
