export const setToken = (val) => {
    return window.localStorage.setItem("token",JSON.stringify(val))
}

export const getToken = () => {
    return window.localStorage.getItem("token")
}

export const removeToken = () => {
    return window.localStorage.removeItem("token")
}

// 是否登录
export const isToken = () => {
    return !!getToken()
}