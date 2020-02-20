const dynamodb = require('./dynamodb')

const saveState = (vehicle, timestamp, state) => {
  const params = {
    TableName: process.env.DYNAMODB_STATE_TABLENAME,
    Item: {
      vehicle,
      timestamp,
      state
    }
  }

  return dynamodb.put(params).promise()
    .catch(error => {
      console.error('error saving to dynamodb', error)
      throw error
    })
}

const getMostRecentState = vehicle => {
  const params = {
    TableName: process.env.DYNAMODB_STATE_TABLENAME,
    KeyConditionExpression: 'vehicle = :vehicleValue',
    ExpressionAttributeValues: {
      ':vehicleValue': vehicle
    },
    Limit: 1,
    ScanIndexForward: false
  }

  return dynamodb.query(params).promise()
    .then(response => response.Items[0])
    .catch(error => {
      console.error('error getting most recent state', error)
      throw error
    })
}

const getPastLocations = (vehicle, since = Date.now() - 3600000) => {
  const params = {
    TableName: process.env.DYNAMODB_STATE_TABLENAME,
    KeyConditionExpression: 'vehicle = :vehicleValue AND #T > :lastHour',
    ExpressionAttributeNames: {
      '#T': 'timestamp',
      '#S': 'state'
    },
    ExpressionAttributeValues: {
      ':vehicleValue': vehicle,
      ':lastHour': since
    },
    ProjectionExpression: '#T, #S.drive.latitude, #S.drive.longitude',
    ScanIndexForward: false
  }

  return dynamodb.query(params).promise()
    .then(response => response.Items
      .filter(item => item.timestamp && item.state && item.state.drive)
      .map(({ timestamp, state: { drive: { latitude, longitude } } }) => ({
        timestamp,
        latitude,
        longitude
      }))
    ).catch(error => {
      console.error('error getting most recent state', error)
      throw error
    })
}

module.exports = {
  saveState,
  getMostRecentState,
  getPastLocations
}
