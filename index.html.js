import{option1}from"./html.js";
option1();
document.title="登录"; // 网页的标题
import{createForm}from"./createForm.js";
document.body.style.cssText=`
background: #ecefff;
`;
document.body.appendChild(createForm());
