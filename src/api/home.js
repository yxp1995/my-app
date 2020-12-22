import request from "../utils/http.js";

export const getSwiper = () => {
    return request({
        url: "/home/swiper",
        method: "GET"
    })
}