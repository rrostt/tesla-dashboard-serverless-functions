const dynamodb = require('./dynamodb')

const addUser = ({ email, }) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLENAME,
    Item: {
      email,
    }
  }

  return dynamodb.put(params).promise()
    .catch(error => {
      console.error('error saving to dynamodb', error)
      throw error
    })
}

const setUser = ({ email, ...data }) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLENAME,
    Item: {
      email,
      ...data
    }
  }

  return dynamodb.put(params).promise()
    .catch(error => {
      console.error('error saving to dynamodb', error)
      throw error
    })
}

const getUser = ({ email }) => {
  const params = {
    TableName: process.env.DYNAMODB_USER_TABLENAME,
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
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

module.exports = {
  addUser,
  getUser,
  setUser
}
