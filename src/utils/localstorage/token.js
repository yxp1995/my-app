export const setToken = (val) => {
    return window.localStorage.setItem("token",JSON.stringify(val))
}

export const getToken = () => {
    return window.localStorage.getItem("token")
}