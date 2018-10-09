const stateData = require('../adapters/stateData')

module.exports = (event, context, callback) => {
  console.log(event)

  const messageBody = event.Records[0].body
  const state = JSON.parse(messageBody)

  console.log('received state', event.Records[0].attributes, state)

  stateData.saveState(state.info.vin, event.Records[0].attributes.SentTimestamp, state)
    .then(_ => {
      console.log('saved state')
      callback(null, { message: 'hello saved' })
    })
}
