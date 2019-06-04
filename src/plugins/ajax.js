/**
 * ajax请求封装js
 */
import axios from "axios";

/**
 * ajax数据请求方法封装，封装了axios
 * @param {*} url url 
 * @param {*} method post get 
 * @param {*} data 请求body
 * @param {*} params 参数
 */
export function getDataByApi(url, method, data, params) {
    return axios({
        method: method,
        url: url,
        params: params,
        data: data
    })
}