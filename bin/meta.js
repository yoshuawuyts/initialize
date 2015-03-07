const assert = require('assert')
const exec = require('child_process').exec

module.exports = makeConfig
makeConfig.getConfig = getConfig
makeConfig.writeFiles = writeFiles

// create configuration
// @param {Object}
// @param {Function}
function makeConfig (obj, cb) {
  obj = obj
  cb(obj)
}

/**
 * Get configuration.
 */
function getConfig (config) {
  var date = new Date()
  var day = date.getDate()
  var month = date.getMonth()

  config.year = date.getFullYear()
  config.day = day.toString().length === 2 ? day : '0' + day
  config.month = month.toString().length === 2 ? month : '0' + month

  console.log('  packageName: ' + config.packageName)

  config.date = config.year + '-' + config.month + '-' + config.day
  console.log('  date: ' + config.date)
}

function writeFiles (program) {
  console.log('')
  console.log('configuration')
  var config = {}

  exec('npm whoami', function (err, name) {
    assert.ifError(err)
    config.name = name.replace(/(\n)/gm, '')
    console.log('  user: ' + config.name)
  })
}
