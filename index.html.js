import{option1}from"./html.js";
option1();
import{consoleLog}from"./consoleLog.js";
/**
 * 网页的标题
 */
document.title="登录";

let button=document.createElement("button");
button.innerText="登录";
function onClick(event){
    consoleLog("点击了登录按钮");
}
button.addEventListener("click",onClick);
document.body.appendChild(button);
