import{disableIcon}from"./disableIcon.js";
import{enableUTF8Charset}from"./enableUTF8Charset.js";
import{enableViewportToDeviceWidth}from"./enableViewportToDeviceWidth.js";
/**
 * 选择1：禁用ICON，UTF-8编码，自适应窗口宽度。
 */
export function option1(){
    disableIcon();
    enableUTF8Charset();
    enableViewportToDeviceWidth();
}
/**
 * 选择2
 */
export function option2(){
    enableUTF8Charset();
    enableViewportToDeviceWidth();
}
