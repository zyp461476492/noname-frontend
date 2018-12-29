export function notifyMsg(notify, title, message, type) {
    notify({
        title: title,
        message: message,
        type: type
    });
}