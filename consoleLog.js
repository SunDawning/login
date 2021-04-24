// Generate by
// deno bundle https://gitee.com/sundawning/deno-oak-rest-users/raw/1d10a561a22b57e7385f4c240bb88b6c3d3043f6/consoleLog.js consoleLog.js
function __double(number) {
    return (Array(2).join(0) + number).slice(-2);
}
function formatTimeZone(date) {
    let timezoneOffset = date.getTimezoneOffset();
    let absTimezoneOffset = Math.abs(timezoneOffset);
    let hour = __double(Math.floor(absTimezoneOffset / 60));
    let minute = __double(absTimezoneOffset - hour * 60);
    if (timezoneOffset > 0) {
        return `UTC-${hour}:${minute}`;
    } else if (timezoneOffset = 0) {
        return "UTC+00:00";
    } else {
        return `UTC+${hour}:${minute}`;
    }
}
function formatTime(timestamp) {
    let date;
    if (timestamp) {
        date = new Date(timestamp);
    } else {
        date = new Date();
    }
    let year = date.getFullYear();
    let month = __double(date.getMonth());
    let day = __double(date.getDay());
    let hour = __double(date.getHours());
    let minute = __double(date.getMinutes());
    let second = __double(date.getSeconds());
    let timezone = formatTimeZone(date);
    return `[${year}-${month}-${day} ${hour}:${minute}:${second} ${timezone}]`;
}
function consoleLog1() {
    console.log.apply(null, [
        `${formatTime()}`
    ].concat(Object.values(arguments)));
}
export { consoleLog1 as consoleLog };
