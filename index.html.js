import{option1}from"./html.js";
option1();
import{consoleLog}from"./consoleLog.js";
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
function createSubmitButton(){
    let button=document.createElement("button");
    button.innerText="登录";
    function onClick(event){
        let collection=button.parentElement.getElementsByTagName("input");
        let account=collection["account"].value;
        let password=collection["password"].value;
        let data={
            account:account,
            password:password,
        }
        consoleLog("点击了登录按钮",data);
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
