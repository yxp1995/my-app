import request from "../utils/http.js"

export const login = (data) => {
    return request({
        method: "POST",
        url: "/user/login",
        data: data
    })
}