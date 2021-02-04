import request from "../utils/http.js";

export function getCondition(id) {
    return request({
        url: "/houses/condition",
        params: id
    })
}