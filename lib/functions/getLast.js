const stateData = require('../adapters/stateData')
const moment = require('moment')

module.exports = (event, context, callback) => {
  stateData.getMostRecentState(event.queryStringParameters.vin)
    .then(state => ({
      ...state,
      datetime: moment(state.timestamp).toISOString()
    }))
    .then(state => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(state)
    }))
    .catch(error => ({
      statusCode: 500,
      body: { error: error.message }
    }))
    .then(response => {
      callback(null, response)
    })
}
