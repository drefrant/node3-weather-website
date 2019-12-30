const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/d16c781904db61bf6c66d79e2367b13e/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=id'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            //console.log(body.daily.data[0])
            //callback(undefined, body.daily.data[0].summary + ' Saat ini ' + body.currently.temperature + ' derajat celcius. Kemungkinan ' + body.currently.precipProbability + '% hujan.')
            callback(undefined, {
                latitude: body.latitude,
                longitude: body.longitude,
                timezone: body.timezone,
                summary: body.daily.data[0].summary + ' Saat ini ' + body.currently.temperature + ' derajat celcius. Kemungkinan ' + body.currently.precipProbability + '% hujan.',
                temperature: body.currently.temperature,
                precip: body.currently.precipProbability,
                icons: body.currently.icon
            })
        }
    })
}

module.exports = forecast