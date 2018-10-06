const axios = require('axios')

const API_KEY = process.env.GOOGLE_API_KEY

const getETA = ({ origin, destination }) =>
  axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}&departure_time=now`)
    .then(result => result.data)
    .then(data => console.log(data) || data)
    .then(data => data.routes[0].legs[0].duration_in_traffic.value)
    .catch(e => {
      console.log(e)
      throw e
    })

module.exports = {
  getETA
}
