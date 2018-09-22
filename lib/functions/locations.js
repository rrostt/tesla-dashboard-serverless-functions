const stateData = require('../adapters/stateData')

module.exports = (event, context, callback) => {
  stateData.getPastLocations(event.queryStringParameters.vin, +event.queryStringParameters.since)
    .then(locations => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(locations)
    }))
    .catch(error => ({
      statusCode: 500,
      body: { error: error.message }
    }))
    .then(response => {
      callback(null, response)
    })
}
