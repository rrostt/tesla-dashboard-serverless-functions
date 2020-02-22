const serverless = require('serverless-http')
const app = require('../userApp.js')

module.exports = serverless(app)
