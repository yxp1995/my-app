import {
    getCity
} from "../api/home.js";

export const getCurrCity = () => {
    return new Promise((resolve) => {
        async function myFun(result) {
            const cityName = result.name;
            const res = await getCity({
                name: cityName
            });
            if (res.status === 200) {
                resolve(res.data.body)
            }
        }
        const myCity = new window.BMapGL.LocalCity();
        myCity.get(myFun);
    })
}

