export function notifyMsg(message, text, type) {
    message({
        message: text,
        type: type
    })
}

export function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

export function ajaxSuccess(response) {
    let code = response.data.code;
    return code === 0;
}

export function now() {
    return new Date().getTime();
}