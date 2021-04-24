import"./iziToast.min.js"; // https://izitoast.marcelodolza.com/
function addiziToastCSS(){
    let css=document.createElement("link");
    css.rel="stylesheet";
    css.href="./iziToast.min.css";
    document.head.appendChild(css);
    return css;
}
addiziToastCSS();
/**
 * 弹出消息气泡
 */
function toast(message){
    iziToast.show({
        message:message,
        position:"center",
    });
}
export{toast};
