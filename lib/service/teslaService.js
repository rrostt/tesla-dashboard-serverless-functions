const {
  getCharge,
  getDrive,
  getVehicle,
  getVehicleInfo,
  getClimate
} = require('../adapters/teslaAdapter')

const getState = () => getVehicleInfo()
  .then(info =>
    Promise.all([
      getCharge(info.id),
      getDrive(info.id),
      getVehicle(info.id),
      getClimate(info.id)
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
