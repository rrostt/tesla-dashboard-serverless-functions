const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const auth = require('./middleware/auth')

const teslaAdapter = require('./adapters/teslaAdapter')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/vehicle/climateOn', auth, (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  const accessToken = req.user && req.user.token && req.user.token.tokens && req.user.token.tokens.access_token

  teslaAdapter.getVehicleInfo({ accessToken })
    .then(({ id }) => id)
    .then(vehicleId => teslaAdapter.climateStart(vehicleId, { accessToken }))
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

app.get('/vehicle/climateOff', auth, (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  const accessToken = req.user && req.user.token && req.user.token.tokens && req.user.token.tokens.access_token

  teslaAdapter.getVehicleInfo({ accessToken })
    .then(({ id }) => id)
    .then(vehicleId => teslaAdapter.climateStop(vehicleId, { accessToken }))
    .then(() => {
      res.status(200)
      res.send()
    })
    .catch(error => {
      res.status(500)
      res.send('error ' + error.message)
    })
})

app.get('/vehicle/climate', auth, (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  const accessToken = req.user && req.user.token && req.user.token.tokens && req.user.token.tokens.access_token

  teslaAdapter.getVehicleInfo({ accessToken })
    .then(({ id }) => id)
    .then(vehicleId => teslaAdapter.getClimate(vehicleId, { accessToken }))
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
