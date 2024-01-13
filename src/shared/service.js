
import axios from 'axios';

const weatherAPIConfig = {
    cityEntry: 'https://geoapi.qweather.com/v2/city/',
    weatherEntry: 'https://devapi.qweather.com/v7/weather/',
    key: '27d02d6fcd0548e3810d501238fa0878',
}


export const cityPromise = (val) => axios.get(`${weatherAPIConfig.cityEntry}/lookup?location=${val}&key=${weatherAPIConfig.key}`);
export const tempPromise = (locationID, type) => axios.get(`${weatherAPIConfig.weatherEntry}${type}?location=${locationID}&key=${weatherAPIConfig.key}`)