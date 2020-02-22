const {
  getCharge,
  getDrive,
  getVehicle,
  getVehicleInfo,
  getClimate
} = require('../adapters/teslaAdapter')

const getState = (accessToken) => getVehicleInfo({ accessToken })
  .then(info =>
    Promise.all([
      getCharge(info.id, { accessToken }),
      getDrive(info.id, { accessToken }),
      getVehicle(info.id, { accessToken }),
      getClimate(info.id, { accessToken })
    ])
    .then(([charge, drive, vehicle, climate]) => ({
      charge,
      drive,
      vehicle,
      climate,
      info
    }))
  )

module.exports = {
  getState
}
