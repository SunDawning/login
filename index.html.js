import{option1}from"./html.js";
option1();
import{consoleLog}from"./consoleLog.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/consoleLog.js
import{toast}from"./Toast.js";
document.title="登录"; // 网页的标题
// 创建账号输入框
function createAccountInpput(){
    let input=document.createElement("input");
    input.type="text";
    input.placehold="账号";
    input.name="account";
    return input;
}
// 创建密码输入框
function createPasswordInput(){
    let input=document.createElement("input");
    input.type="password";
    input.placehold="密码";
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
        }
        consoleLog("点击了登录按钮",data);
        postObjectInJSON("/login",data).then(function(response){return response.json();}).then(function(json){
            consoleLog("Response",json);
            if(json.account===false){
                toast("账号不存在");
            }
            if(json.password===false){
                toast("密码不存在");
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
