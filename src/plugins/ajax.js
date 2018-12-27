import axios from "axios";

export function getDataByApi(url, method, data, params) {
    return axios({
        method: method,
        url: url,
        params: params,
        data: data
    })
}