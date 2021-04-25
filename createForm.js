import{createAccountInpput}from"./createAccountInpput.js";
import{createPasswordInput}from"./createPasswordInput.js";
import{createSubmitButton}from"./createSubmitButton.js";
import{addEnterSubmitEventListeners}from"./addEnterSubmitEventListeners.js";
import{loginWithLocalStorage}from"./loginWithLocalStorage.js";
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
    addEnterSubmitEventListeners(form,submit);
    loginWithLocalStorage(submit);
    return form;
}
