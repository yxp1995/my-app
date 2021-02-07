import request from "../utils/http.js";

export function getCondition(id) {
    return request({
        url: "/houses/condition",
        params: id
    })
}

export const filterHouse = (params) => {
    return request({
        url: "/houses",
        params: params
    })
}