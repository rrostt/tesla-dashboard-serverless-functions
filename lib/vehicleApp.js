const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const teslaAdapter = require('./adapters/teslaAdapter')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/vehicle/climateOn', (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  teslaAdapter.getVehicleInfo()
    .then(({ id }) => id)
    .then(vehicleId => teslaAdapter.climateStart(vehicleId))
    .then(() => {
      res.status(200)
      res.send()
    })
    .catch(error => {
      console.log('error turning climate on', error)
      res.status(500)
      res.send('error ' + error.message)
    })
})

app.get('/vehicle/climateOff', (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  teslaAdapter.getVehicleInfo()
    .then(({ id }) => id)
    .then(vehicleId => teslaAdapter.climateStop(vehicleId))
    .then(() => {
      res.status(200)
      res.send()
    })
    .catch(error => {
      res.status(500)
      res.send('error ' + error.message)
    })
})

app.get('/vehicle/climate', (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  teslaAdapter.getVehicleInfo()
    .then(({ id }) => id)
    .then(vehicleId => teslaAdapter.getClimate(vehicleId))
    .then(climate => {
      res.status(200)
      res.json(climate)
    })
    .catch(error => {
      res.status(500)
      res.send('error ' + error.message)
    })
})

module.exports = app
