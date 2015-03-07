const assert = require('assert')
const exec = require('child_process').exec

module.exports = makeConfig

// create confuration
// @param {Object}
// @param {Function}
function makeConfig (conf, cb) {
  conf = getConfig(conf)
  whoami(conf, function (name) {
    conf.name = name
    conf.username = name
    conf.meta.name = name
    cb(conf)
  })
}

 // get confuration.
 // @param {Object} conf
function getConfig (conf) {
  var date = new Date()
  var day = date.getDate()
  var month = date.getMonth()

  conf.year = date.getFullYear()
  conf.day = day.toString().length === 2 ? day : '0' + day
  conf.month = month.toString().length === 2 ? month : '0' + month

  console.log('packageName: ' + conf.meta.packageName)

  conf.date = conf.year + '-' + conf.month + '-' + conf.day
  console.log('date: ' + conf.date)
  return conf
}

// find out what the username is
// @param {Object} conf
// @param {Function} cb
function whoami (conf, cb) {
  exec('npm whoami', function (err, name) {
    assert.ifError(err)
    name = name.replace(/(\n)/gm, '')
    console.log('user: ' + name)
    cb(name)
  })
}
