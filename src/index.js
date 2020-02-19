const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('', (req, res) => {
    res.send('Playlist suggestion')
})

app.get('/city', (req, res) => {
    const city = req.query.name
    console.log(city)
    res.send({
        city
    })
})

app.get('/coord', (req, res) => {
    const {
        lat,
        lon
    } = req.query
    console.log(lat, lon)
    res.send({
        lat,
        lon
    })
})
app.listen(port, () => {
    console.log('Server running on port ' + port)
})