var faker = require('faker')
var path = require('path')
var faces = require('cool-ascii-faces').faces
var moment = require('moment')
var repeat = require('./util/repeat-func')

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
    id: getRandomInRange(1, 999999),
    face: faces[getRandomInRange(0, faces.length)],
    price: getRandomInRange(1, 1234),
    size: getRandomInRange(12, 40)
  };
}

function generatePurchases (users, products, maxPurchasesPerUser) {
  var numProducts = products.length

  return [].concat.apply([], users.map(function (user) {
    return [
      {
        id: getRandomInRange(1, 999999),
        username: user.username,
        product_id: products[getRandomInRange(0, numProducts)].id,
        date: moment().subtract(getRandomInRange(1000, 999999), 'seconds').toISOString()
      }
    ]
  }))
}

function generateData () {
  var numUsers = 10
  var numProducts = 20
  var maxPurchasesPerUser = 10
  var users = repeat(numUsers, generateUser)
  var products = repeat(numProducts, generateProduct)
  var purchases = generatePurchases(users, products, maxPurchasesPerUser);

  return {
    users: users,
    products: products,
    purchases: purchases
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
