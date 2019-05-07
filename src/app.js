const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Marija Ristovska'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About weather',
        name: 'Marija Ristovska' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Marija Ristovska'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('You must provide an address!')
    }
    geocode(req.query.address, (error, { latitude, longitude, location}={}) => {
        if (error) {
            return res.send({ error })
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Skopje',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send('You must provide a search term. ')
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Marija Ristovska',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Marija Ristovska',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("The app is running on port 3000.")
})