const serverless = require('serverless-http')
const app = require('../vehicleApp.js')

module.exports = serverless(app)
