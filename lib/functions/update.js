const aws = require('aws-sdk')
const sqs = new aws.SQS({})

const teslaService = require('../service/teslaService')
const userService = require('../service/userService')

module.exports = (event, context, callback) => {
  userService.getUsers()
    .then(users => Promise.all(users
      .filter(user => user.token && user.token.tokens && user.token.tokens.access_token)
      .map(user => 
        teslaService.getState(user.token.tokens.access_token)
          .then(state => {
            const accountId = context.invokedFunctionArn.split(':')[4]
            const queueName = process.env.STATE_QUEUE_NAME
            const queueUrl = `https://sqs.eu-west-1.amazonaws.com/${accountId}/${queueName}`
            const params = {
              MessageBody: JSON.stringify(state),
              QueueUrl: queueUrl
            }
      
            sqs.sendMessage(params).promise()
              .then(() => {
                console.log('sent to queue', queueUrl)
              })
              .catch(err => {
                console.error(`error sending to use for ${user.email}`, err)
              })
          })
        )
    ))
    .then(() => {
      callback(null, { message: 'Sent car state to sqs' })
    })
}
