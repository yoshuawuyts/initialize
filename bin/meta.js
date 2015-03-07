const assert = require('assert')
const exec = require('child_process').exec

module.exports = makeConfig

// create confuration
// @param {Object}
// @param {Function}
function makeConfig (conf, cb) {
  conf = getConfig(conf)
  whoami(conf, function (name) {
    conf.meta.name = name
    log(conf)
    cb(conf)
  })
}

 // get confuration.
 // @param {Object} conf
 // @return {Object}
function getConfig (conf) {
  var date = new Date()
  var day = date.getDate()
  var month = date.getMonth()

  conf.meta.year = date.getFullYear()
  conf.meta.day = day.toString().length === 2 ? day : '0' + day
  conf.meta.month = month.toString().length === 2 ? month : '0' + month
  conf.meta.date = conf.meta.year + '-' + conf.meta.month + '-' + conf.meta.day
  return conf
}

// find out what the username is
// @param {Object} conf
// @param {Function} cb
function whoami (conf, cb) {
  exec('npm whoami', function (err, name) {
    assert.ifError(err)
    name = name.replace(/(\n)/gm, '')
    cb(name)
  })
}

// log meta to stdout
// @param {Object}
function log (conf) {
  process.stdout.write('packageName: ' + conf.meta.packageName + '\n')
  process.stdout.write('date: ' + conf.meta.date + '\n')
  process.stdout.write('user: ' + conf.meta.name + '\n')
}
