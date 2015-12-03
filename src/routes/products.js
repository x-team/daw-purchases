var find = require('array-find')
var sendJson = require('send-data/json')
var url = require('url')

module.exports = function (router, store) {
  var products = store.products

  router.set('/api/products', {
    GET: function (req, res, opts, cb) {
      var query = url.parse(req.url, true).query

      var limit = parseInt(query.limit, 10) || 10
      var skip = parseInt(query.skip, 10) || 0

      sendJson(req, res, {
        products: products.slice(skip, limit + skip)
      })
    }
  })

  router.set('/api/products/:id', {
    GET: function (req, res, opts) {
      var id = parseInt(opts.params.id, 10)

      var found = find(products, function (p) {
        return p.id === id
      })

      sendJson(req, res, {
        product: found
      })
    }
  })
}
