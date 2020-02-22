const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const auth = require('./middleware/auth')

const userService = require('./service/userService')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/user', auth, (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  if (!req.email) {
    console.log('no email header')
    res.status(400)
    res.send('no valid auth token')
    return
  }

  if (req.user) {
    res.status(200)
    res.json(req.user)
  } else {
    res.status(400)
    res.json({ error: 'no such user' })
  }
})

app.post('/user/tesla-token', auth, (req, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })

  if (!req.email) {
    console.log('no email header')
    res.status(400)
    res.send('no valid auth token')
    return
  }

  const { token } = req.body

  userService.updateUser({ email: req.email, token })
    .then(() => {
      res.status(200)
      res.send('ok')
    })
})

module.exports = app
