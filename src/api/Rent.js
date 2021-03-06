import request from '../utils/http.js'

const getHouseList = () => {
    return request({
        method: "GET",
        url: "/user/houses"
    })
}

export { getHouseList }