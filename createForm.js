import{createAccountInpput}from"./createAccountInpput.js";
import{createPasswordInput}from"./createPasswordInput.js";
import{createSubmitButton}from"./createSubmitButton.js";
// 一并创建表单
export function createForm(){
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
