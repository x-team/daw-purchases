var find = require('array-find')
var sendJson = require('send-data/json')
var url = require('url')

module.exports = function (router, store) {
  var users = store.users

  router.set('/api/users', {
    GET: function (req, res, opts, cb) {
      var query = url.parse(req.url, true).query

      var limit = parseInt(query.limit, 10) || 10
      var skip = parseInt(query.skip, 10) || 0

      sendJson(req, res, {
        users: users.slice(skip, limit + skip)
      })
    }
  })

  router.set('/api/users/:username', {
    GET: function (req, res, opts) {
      var username = opts.params.username

      var foundUser = find(users, function (user) {
        return user.username === username
      })

      sendJson(req, res, {
        user: foundUser
      })
    }
  })
}
