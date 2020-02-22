const axios = require('axios')

const configAccessToken = require('../../config.json').tokens.access_token

const getHeaders = accessToken => ({
  Authorization: `Bearer ${accessToken}`
})

const getVehicleInfo = ({ accessToken = configAccessToken } = {}) =>
  axios.get(
    'https://owner-api.teslamotors.com/api/1/vehicles',
    {
      headers: getHeaders(accessToken),
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

const getPartState = (vehicleId, stateName, { accessToken = configAccessToken } = {}) =>
  console.log('request', `https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/data_request/${stateName}`) ||
  axios.get(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/data_request/${stateName}`,
    {
      headers: getHeaders(accessToken),
      json: true
    }
  )
  .then(result => result.data.response)
  .catch(e => console.error('error', e) || { error: e.getMessage })

const getCharge = (vehicleId, { accessToken = configAccessToken } = {}) => getPartState(vehicleId, 'charge_state', {accessToken})
const getVehicle = (vehicleId, { accessToken = configAccessToken } = {}) => getPartState(vehicleId, 'vehicle_state', {accessToken})
const getDrive = (vehicleId, { accessToken = configAccessToken } = {}) => getPartState(vehicleId, 'drive_state', {accessToken})
const getClimate = (vehicleId, { accessToken = configAccessToken } = {}) => getPartState(vehicleId, 'climate_state', {accessToken})

const climateStart = (vehicleId, { accessToken = configAccessToken } = {}) =>
  axios.post(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/command/auto_conditioning_start`,
    {},
    {
      headers: getHeaders(accessToken),
      json: true
    }
  )

const climateStop = (vehicleId, { accessToken = configAccessToken } = {}) =>
  axios.post(`https://owner-api.teslamotors.com/api/1/vehicles/${vehicleId}/command/auto_conditioning_stop`,
    {},
    {
      headers: getHeaders(accessToken),
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
