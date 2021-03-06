import request from '../utils/http.js'

const getHouseIsFavorite = (id) => {
    return request({
        method: 'GET',
        url: `/user/favorites/${id}`
    })
}

const addHouseFavorite = (id) => {
    return request({
        method: 'POST',
        url: `/user/favorites/${id}`
    })
}

const delHouseFavorite = (id) => {
    return request({
        method: 'DELETE',
        url: `/user/favorites/${id}`
    })
}

export { getHouseIsFavorite, addHouseFavorite, delHouseFavorite }