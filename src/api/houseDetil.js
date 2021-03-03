import request from '../utils/http.js'

const getHouseIsFavorite = (id,headers) => {
    return request({
        method: 'GET',
        url: `/user/favorites/${id}`,
        headers
    })
}

export { getHouseIsFavorite }