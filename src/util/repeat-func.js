module.exports = function repeat (times, func) {
  var output = []
  for (var i = 0; i < times; i++) {
    output.push(func())
  }
  return output
}
