/**
 * 数据传递类
 */

var jwt = "";

export function setJwt(val) {
    jwt = val;
}

export function getJwt() {
    return jwt;
}