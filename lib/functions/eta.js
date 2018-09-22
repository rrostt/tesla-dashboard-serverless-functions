const directionsAdapter = require('../adapters/directionsAdapter')

module.exports = (event, context, callback) => {
  const { origin, destination } = event.queryStringParameters

  console.log(origin, destination)

  directionsAdapter.getETA({ origin, destination })
    .then(seconds => ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ seconds })
    }))
    .catch(error => ({
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ error: error.message })
    }))
    .then(response => {
      callback(null, response)
    })
}
