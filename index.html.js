import{consoleLog}from"./consoleLog.js";
let button=document.createElement("button");
button.innerText="登录";
function onClick(event){
    consoleLog("点击了登录按钮");
}
button.addEventListener("click",onClick);
document.body.appendChild(button);
