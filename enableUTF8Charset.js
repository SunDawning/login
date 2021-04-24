/**
 * 网页使用UTF-8编码
 */
export function enableUTF8Charset(){
    let meta=document.createElement("meta");
    meta.setAttribute("charset","utf-8");
    document.head.appendChild(meta);
    return meta;
}
