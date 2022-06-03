const path = require('path')
const express = require('express')
const res = require('express/lib/response')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialDir = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialDir);

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        page: 'Home',
        name: 'Erwin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        page: 'Help page',
        helpText: 'Help! help! saklolo! I need your help!',
        name: 'Erwin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        page: 'About page',
        name: 'Erwin'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Weather App',
        page: '404:',
        name: 'Erwin'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${ port }`)
})

module.exports = app
