import request from '../utils/http.js'

const searchCommunity = (params) => {
    return request({
        method: 'GET',
        url: '/area/community',
        params
    })
}

export { searchCommunity }