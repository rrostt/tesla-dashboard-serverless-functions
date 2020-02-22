const axios = require('axios')

const userService = require('../service/userService')

const auth = (req, res, next) => {
    const token = req.headers['x-g-token']
    console.log(req.headers)
    if (!token) return next()
  
    console.log('got token', token)
  
    axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
      .then(response => response.data)
      .then(data => data.email)
      .then(email => {
        console.log('got email', email)
        req.email = email
        return email
      })
      .then(email => userService.getUser({ email }))
      .then(user => {
        req.user = user
        next()
      })
      .catch(err => console.log(err) || next())
  }

module.exports = auth
