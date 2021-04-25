import{onClick}from"./onClick.js";
// 创建提交按钮
export function createSubmitButton(){
    let button=document.createElement("button");
    button.innerText="登录";
    button.addEventListener("click",onClick);
    button.style.cssText=`
    width: 304px;
    font-size: 16px;
    color: #fff;
    border-width: 0;
    box-shadow: none;
    background: none;
    outline: none;
    height: 48px;
    background-image: linear-gradient(129.12deg, #446dff 0%, rgba(99, 125, 255, 0.75) 100%);
    border-radius: 10px;
    backdrop-filter: blur(24px);
    margin:8px;
    cursor:pointer;
`;
    return button;
}
