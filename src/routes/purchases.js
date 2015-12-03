var sendJson = require('send-data/json')
var url = require('url')

module.exports = function (router, store) {
  var purchases = store.purchases

  router.set('/api/purchases/by_user/:username', {
    GET: function (req, res, opts) {
      var query = url.parse(req.url, true).query
      var username = opts.params.username
      var limit = parseInt(query.limit, 10) || 10
      var skip = parseInt(query.skip, 10) || 0

      var found = purchases.filter(function (p) {
        return p.username === username
      })

      sendJson(req, res, {
        purchases: found.slice(skip, limit + skip)
      })
    }
  })

  router.set('/api/purchases/by_product/:id', {
    GET: function (req, res, opts) {
      var query = url.parse(req.url, true).query
      var productId = parseInt(opts.params.id, 10)
      var limit = parseInt(query.limit, 10) || 10
      var skip = parseInt(query.skip, 10) || 0

      var found = purchases.filter(function (p) {
        return p.productId === productId
      })

      sendJson(req, res, {
        purchases: found.slice(skip, limit + skip)
      })
    }
  })
}
