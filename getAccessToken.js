'use strict'

const axios = require('axios')
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

if (process.argv.length < 4) {
  console.log('Get access token by supplying login and password as arguments.')
  process.exit(0)
}

const [login, password] = process.argv.slice(2)

const loadCurrentConfig = () => readFile('./config.json')
  .catch(_ => '{}')
  .then(content => JSON.parse(content))

const saveConfig = config => writeFile('./config.json', JSON.stringify(config))

axios.post('https://owner-api.teslamotors.com/oauth/token', {
  grant_type: 'password',
  client_id: '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384',
  client_secret: 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3',
  email: login,
  password: password
})
  .catch(error => {
    console.error('Error getting access token from Tesla servers', JSON.stringify(error), error)
    process.exit(-1)
  })
  .then(result => result.data)
  .then(result =>
    console.log(result) ||
    loadCurrentConfig()
      .then(currentConfig => ({ ...currentConfig, tokens: result }))
  )
  .then(saveConfig)
