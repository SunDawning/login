import{option1}from"./html.js";
option1();
import{consoleLog}from"./consoleLog.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/consoleLog.js
import * as Toast from"./Toast.js";
import{encrypt}from"./encrypt.js";
document.title="登录"; // 网页的标题
// 创建账号输入框
function createAccountInpput(){
    let input=document.createElement("input");
    input.type="text";
    input.placeholder="账号";
    input.name="account";
    return input;
}
// 创建密码输入框
function createPasswordInput(){
    let input=document.createElement("input");
    input.type="password";
    input.placeholder="密码";
    input.name="password";
    return input;
}
// 创建提交按钮
import{postObjectInJSON}from"./sendObjectInJSON.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/master/sendObjectInJSON.js
function createSubmitButton(){
    let button=document.createElement("button");
    button.innerText="登录";
    function onClick(event){
        let collection=button.parentElement.getElementsByTagName("input");
        let data={
            account:collection["account"].value,
            password:collection["password"].value,
            random:new Date().getTime(),
        }
        data.password=encrypt(data.password+data.random);
        consoleLog("点击了登录按钮");
        consoleLog("发送登录信息",data);
        postObjectInJSON("/login",data).then(function(response){return response.json();}).then(function(json){
            consoleLog("返回验证信息",json);
            if(json.account===false){
                Toast.warning("账号不存在");
            }else if(json.password===false){
                Toast.warning("密码不正确");
            }else{
                Toast.success("登录成功");
            }
        });
    }
    button.addEventListener("click",onClick);
    return button;
}
// 一并创建表单
function createForm(){
    let form=document.createElement("div");
    form.appendChild(createAccountInpput());
    form.appendChild(createPasswordInput());
    form.appendChild(createSubmitButton());
    return form;
}
document.body.appendChild(createForm());
