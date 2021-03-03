import request from "../utils/http.js"

const getInfo = (params) => {
    return request({
        method: "Get",
        url: "/user",
        headers: params
    })
}

const logout = (params) => {
    return request({
        method: "POST",
        url: "/user/logout",
        headers: params
    })
}

export {getInfo,logout}