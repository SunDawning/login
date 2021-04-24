// 创建账号输入框
export function createAccountInpput(){
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
