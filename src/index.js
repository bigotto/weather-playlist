const express = require('express')
const { getTemperatureCity, getTemperatureCoord } = require('./temperature')

const app = express()
const port = process.env.PORT || 3000

app.get('', (req, res) => {
    res.send('Playlist suggestion')
})

app.get('/city', (req, res) => {
    const city = req.query.name
    getTemperatureCity(city, (error, temp) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            temp
        })
    })
})

app.get('/coord', (req, res) => {
    const { lat, lon } = req.query
    getTemperatureCoord(lat, lon, (error, temp) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            temp
        })
    })
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})