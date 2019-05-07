const request = require('request')


const forecast = (latitude, longitude, callback) => {
   const url = 'https://api.darksky.net/forecast/3595e9edc19613aeaf5cd8e595af403e/' + longitude + ',' + latitude + '?units=si';

    request({ url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;