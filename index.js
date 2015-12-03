'use strict'

var http = require('http')
var Router = require('http-hash-router')
var path = require('path')

var port = process.env.PORT || 8000
var router = new Router()

var store = require('./src/setup-store')(path.join(__dirname, '.data'))

// ----
// setup the http server

var server = http.createServer(function handler (req, res) {
  router(req, res, {}, function onError (err) {
    if (err) {
      res.statusCode = err.statusCode || 500
      res.end(err.message)
    }
  })
})

// ----
// add routes

require('./src/routes/products')(router, store)
require('./src/routes/purchases')(router, store)
require('./src/routes/users')(router, store)

// ----
// start the server

server.listen(port)
console.log('ready on http://0.0.0.0:%d', port)
