/**
 * 网页自适应窗口宽度
 */
export function enableViewportToDeviceWidth(){
    let meta=document.createElement("meta");
    meta.setAttribute("http-equiv","Content-Type");
    meta.setAttribute("name","viewport");
    meta.setAttribute("content","width=device-width");
    document.head.appendChild(meta);
    return meta;
}
