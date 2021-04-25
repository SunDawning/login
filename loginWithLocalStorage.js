import{consoleLog}from"./consoleLog.js";
/**
 * 使用localStorage里的loginData来自动登录
 * @param submit 登录按钮
 */
export function loginWithLocalStorage(submit){
    let data=localStorage.getItem("loginData");
    if(!(data===null)){
        consoleLog("已经存储了登录信息，将尝试自动登录。")
        submit.click();
    }
}
