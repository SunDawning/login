/**
 * 给表单form里的所有input元素添加回车就提交的监听事件
 * javascript - Detect the Enter key in a text input field - Stack Overflow: https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
 */
export function addEnterSubmitEventListeners(form,submit){
    Object.values(form.getElementsByTagName("input")).forEach(function(input){
        input.addEventListener("keyup",function(event){
            if(event.key==="Enter"||event.keyCode===13){
                submit.click();
            }
        });
    });
}
