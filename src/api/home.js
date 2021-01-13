import request from "../utils/http.js";

export const getSwiper = () => {
    return request({
        url: "/home/swiper",
        method: "GET"
    })
}

export const getGroups = (id) => {
    return request({
        url: "/home/groups",
        method: "GET",
        params: id
    })
}

export const getNews = (id) => {
    return request({
        url: "/home/news",
        method: "GET",
        params: id
    })
}

export const getCity = (cityName) => {
    return request({
        url: "/area/info",
        method: "GET",
        params: cityName
    })
}