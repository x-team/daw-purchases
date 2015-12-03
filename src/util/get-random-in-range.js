module.exports = function getRandomInRange (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
