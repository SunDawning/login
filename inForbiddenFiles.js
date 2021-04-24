/**
 * 禁止浏览器访问的文件
 * 作为一个登录页面，起码不能访问到存储密码的文件。
 */
export function inForbiddenFiles(file){
    return [
        "ACCOUNTS.js",
        "decodeRequestBody.js",
        "inForbiddenfiles.js",
        "main.js",
        "requestFile.js",
        "requestIndex.js",
        "requestLogin.js",
        "router.js",
        "run.bat",
    ].filter(function(filename){
        let lowerCaseFilename=filename.toLowerCase();
        let lowerCaseRequestFile=file.toLowerCase();
        return lowerCaseRequestFile.startsWith(lowerCaseFilename);
    }).length>0;
}
