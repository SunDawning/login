/**
 * favicon not found
 */
export function disableIcon(){
    let icon=document.createElement("link");
    icon.rel="icon";
    icon.href="#";
    document.head.appendChild(icon);
    return icon;
}
