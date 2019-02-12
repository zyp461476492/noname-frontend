export function notifyMsg(message, text, type) {
    message({
        message: text,
        type: type
    })
}

export function isEmptyObject( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}