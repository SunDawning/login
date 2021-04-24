import"./iziToast.min.js"; // https://izitoast.marcelodolza.com/
function addiziToastCSS(){
    let css=document.createElement("link");
    css.rel="stylesheet";
    css.href="./iziToast.min.css";
    document.head.appendChild(css);
    return css;
}
addiziToastCSS();
function warning(message){
    iziToast.warning({
        message: message,
        position: 'center',
    });
}
function success(message){
    iziToast.success({
        message:message,
        position:"center",
    });
}
function info(message){
    iziToast.info({
        message:message,
        position:"center",
    });
}
export{
    info,
    warning,
    success,
};
