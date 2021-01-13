const city = 'currentCity';


export const getCity = () => {
    return JSON.parse(window.localStorage.getItem(city));
}

export const setCity = (nowCity) => {
    return window.localStorage.setItem(city,JSON.stringify(nowCity));
}
