const aws = require('aws-sdk')
const sqs = new aws.SQS({})

const teslaService = require('../service/teslaService')

module.exports = (event, context, callback) => {
  teslaService.getState()
    .then(state => {
      const accountId = context.invokedFunctionArn.split(':')[4]
      const queueName = process.env.STATE_QUEUE_NAME
      const queueUrl = `https://sqs.eu-west-1.amazonaws.com/${accountId}/${queueName}`
      const params = {
        MessageBody: JSON.stringify(state),
        QueueUrl: queueUrl
      }

      sqs.sendMessage(params).promise()
        .then(_ => {
          console.log('sent to queue', queueUrl)

          callback(null, { message: 'Sent car state to sqs' })
        })
        .catch(err => {
          console.error('error', err)
        })
    })
}
