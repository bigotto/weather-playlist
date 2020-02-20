const request = require('request')

const getTemperatureCity = (name, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=be69748fc857baf4586b9c7ac66566c6`

    return getResult(url, callback)
}
// [-20.44, -54.65]
const getTemperatureCoord = (lat, lon, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=be69748fc857baf4586b9c7ac66566c6`

    return getResult(url, callback)
}

const getResult = (url, callback) => {
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if( body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.main.temp)
        }
    })
}

module.exports = {
    getTemperatureCity,
    getTemperatureCoord
}
