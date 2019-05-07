const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFyaWphcmlzIiwiYSI6ImNqdjNxYmg4azA3dHo0NHBteWh3bmRhc2wifQ.aBtiO3TNFppKowlbtFH0Cw'
    
    request({ url, json: true }, (error, {body} ={}) => {
        if (error){
            callback('Cannot connect to location services', undefined)
        }
        else if (body.features.length === 0){
            callback('Unable to find geolocation. Try again with different search!', undefined)
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    }

    module.exports = geocode;