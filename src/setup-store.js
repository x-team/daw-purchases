var faker = require('faker')
var path = require('path')
var repeat = require('./util/repeat-func')

function generateUser () {
  var email = faker.internet.email()
  var username = email.replace(/\@.*$/, '')

  return {
    username: username,
    email: email
  }
}

function generateData () {
  var numUsers = 10
  return {
    users: repeat(numUsers, generateUser)
  }
}

module.exports = function (dataPath) {
  // we'll try to use hardcoded data first, but if that is not present we'll generate a new set
  try {
    return {
      users: require(path.join(dataPath, 'users')),
      products: require(path.join(dataPath, 'products'))
    }
  } catch (e) {
    console.log('- Generating new data')
    return generateData()
  }
}

module.exports.generateData = generateData
