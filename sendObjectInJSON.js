// deno bundle https://gitee.com/sundawning/deno-oak-rest-users/raw/master/sendObjectInJSON.js sendObjectInJSON.js
function sendObjectInJSON1(url, method, object) {
    let headers = new Headers();
    headers.set("content-type", "application/json; charset=utf-8");
    return window.fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(object)
    });
}
function postObjectInJSON1(url, object) {
    return sendObjectInJSON1(url, "POST", object);
}
function putObjectInJSON1(url, object) {
    return sendObjectInJSON1(url, "PUT", object);
}
export { putObjectInJSON1 as putObjectInJSON, postObjectInJSON1 as postObjectInJSON, sendObjectInJSON1 as sendObjectInJSON,  };
