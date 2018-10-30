const stateData = require('../adapters/stateData')

const cleanState = state => {
  Object.keys(state).forEach(key => {
    if (typeof state[key] === 'string' && state[key].length === 0) {
      delete state[key]
    } else if (state[key] && typeof state[key] === 'object') {
      state[key] = cleanState(state[key])
    }
  })
  return state
}

module.exports = (event, context, callback) => {
  console.log(event)

  const messageBody = event.Records[0].body
  const state = JSON.parse(messageBody)

  console.log('received state', event.Records[0].attributes, state)

  stateData.saveState(state.info.vin, +event.Records[0].attributes.SentTimestamp, cleanState(state))
    .then(_ => {
      console.log('saved state')
      callback(null, { message: 'hello saved' })
    })
    .catch(e => {
      console.error('error saving state', e.message)
      callback('Error saving state')
    })
}
