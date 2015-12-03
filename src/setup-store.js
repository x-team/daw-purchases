var faker = require('faker')
var path = require('path')
var faces = require('cool-ascii-faces').faces;
var repeat = require('./util/repeat-func')


function getRandomString () {
  return (Math.random()).toString(36).substr(2)
}

function getRandomInRange (min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

function generateUser () {
  var email = faker.internet.email()
  var username = email.replace(/\@.*$/, '')

  return {
    username: username,
    email: email
  }
}

function generateProduct () {
  return {
    id: getRandomInRange(0, 100000) + '-' + getRandomString(),
    face: faces[getRandomInRange(0, faces.length)],
    price: getRandomInRange(1, 1234),
    size: getRandomInRange(12, 40)
  };
}

function generateData () {
  var numUsers = 10
  var numProducts = 20
  return {
    users: repeat(numUsers, generateUser),
    products: repeat(numProducts, generateProduct)
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
