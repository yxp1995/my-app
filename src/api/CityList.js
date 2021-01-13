import request from "../utils/http.js";

export const getAirCity = (level) => {
    return request({
        url: "/area/city",
        method: "GET",
        params:level
    })
}

export const getHotCity = () => {
    return request({
        url: "/area/hot",
        method: "GET"
    })
}