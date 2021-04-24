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
    input.spellcheck=false;
    input.style.cssText=`
    margin:8px;
    font-size: 14px;
    background: rgba(39, 39, 41, 0.04);
    border-radius: 8px;
    padding-left: 12px;
    width: 304px;
    border: 1px solid transparent;
    height: 46px;
`;
    return input;
}
// 创建密码输入框
function createPasswordInput(){
    let input=document.createElement("input");
    input.type="password";
    input.placeholder="密码";
    input.name="password";
    input.style.cssText=`
    margin:8px;
    font-size: 14px;
    background: rgba(39, 39, 41, 0.04);
    border-radius: 8px;
    padding-left: 12px;
    width: 304px;
    border: 1px solid transparent;
    height: 46px;
`;
    return input;
}
// 创建提交按钮
import{postObjectInJSON}from"./sendObjectInJSON.js"; // https://gitee.com/sundawning/deno-oak-rest-users/raw/master/sendObjectInJSON.js
function createSubmitButton(){
    let button=document.createElement("button");
    button.innerText="登录";
    button.style.cssText=`
    width: 304px;
    font-size: 16px;
    color: #fff;
    border-width: 0;
    box-shadow: none;
    background: none;
    outline: none;
    height: 48px;
    background-image: linear-gradient(
129.12deg
, #446dff 0%, rgba(99, 125, 255, 0.75) 100%);
    border-radius: 10px;
    backdrop-filter: blur(24px);
    margin:8px;
    cursor:pointer;
`;
    function onClick(event){
        // 查询登录信息
        let data=localStorage.getItem("loginData");
        if(data===null){
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
        }
        consoleLog("点击了登录按钮");
        consoleLog("发送登录信息",data);
        postObjectInJSON("/login",data).then(function(response){return response.json();}).then(function(json){
            consoleLog("返回验证信息",json);
            if(json.account===false){
                Toast.warning("账号不存在");
                // 清空无效的登录信息
                localStorage.removeItem("loginData");
            }else if(json.password===false){
                Toast.warning("密码不正确");
                // 清空无效的登录信息
                localStorage.removeItem("loginData");
            }else{
                Toast.success("登录成功");
                // 保存登录信息
                localStorage.setItem("loginData",JSON.stringify(data));
            }
        });
    }
    button.addEventListener("click",onClick);
    return button;
}
// 一并创建表单
function createForm(){
    let form=document.createElement("div");
    form.style.cssText=`
margin: 0 auto;
width: 100%;
max-width: 320px;
text-align: center;
padding: 8px;
`
    form.appendChild(createAccountInpput());
    form.appendChild(createPasswordInput());
    let submit=createSubmitButton();
    form.appendChild(submit);
    // javascript - Detect the Enter key in a text input field - Stack Overflow: https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
    Object.values(form.getElementsByTagName("input")).forEach(function(input){
        input.addEventListener("keyup",function(event){
            if(event.key==="Enter"||event.keyCode===13){
                submit.click();
            }
        });
    });
    // 自动登录
    let data=localStorage.getItem("loginData");
    if(!(data===null)){
        submit.click();
    }
    return form;
}
document.body.style.cssText=`
background: #ecefff;
`;
document.body.appendChild(createForm());
