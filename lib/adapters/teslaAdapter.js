const axios = require('axios')

const configAccessToken = require('../../config.json').tokens.access_token

const getHeaders = accessToken => ({
  Authorization: `Bearer ${accessToken}`
})

const getVehicleInfo = () =>
  axios.get(
    'https://owner-api.teslamotors.com/api/1/vehicles',
    {
      headers: getHeaders(configAccessToken),
      json: true
    }
  )
  .then(result => console.log(result.data) || result.data)
  .then(data => data.response[0])
  .then(({
    id_s: id,
    display_name: name,
    vin
  }) => ({
    id,
    name,
    vin
  }))

const getPartState = (vehicleId, stateName) =>
  console.log('request', `https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/data_request/${stateName}`) ||
  axios.get(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/data_request/${stateName}`,
    {
      headers: getHeaders(configAccessToken),
      json: true
    }
  )
  .then(result => result.data.response)
  .catch(e => console.error('error', e) || { error: e.getMessage })

const getCharge = vehicleId => getPartState(vehicleId, 'charge_state')
const getVehicle = vehicleId => getPartState(vehicleId, 'vehicle_state')
const getDrive = vehicleId => getPartState(vehicleId, 'drive_state')
const getClimate = vehicleId => getPartState(vehicleId, 'climate_state')

const climateStart = vehicleId =>
  axios.post(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/command/auto_conditioning_start`,
    {},
    {
      headers: getHeaders(configAccessToken),
      json: true
    }
  )

const climateStop = vehicleId =>
  axios.post(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/command/auto_conditioning_stop`,
    {},
    {
      headers: getHeaders(configAccessToken),
      json: true
    }
  )

module.exports = {
  getVehicleInfo,
  getCharge,
  getDrive,
  getVehicle,
  getClimate,
  climateStart,
  climateStop
}
