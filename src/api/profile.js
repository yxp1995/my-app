import request from "../utils/http.js"

const getInfo = () => {
    return request({
        method: "Get",
        url: "/user"
    })
}

const logout = () => {
    return request({
        method: "POST",
        url: "/user/logout"
    })
}

export {getInfo,logout}