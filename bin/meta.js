module.exports = makeConfig

// create configuration
// @param {Object}
// @param {Function}
function makeConfig(obj, cb) {

}

/**
 * Get configuration.
 */
function getConfig() {
  var date = new Date()
  var day = date.getDate()
  var month = date.getMonth()

  config.year = date.getFullYear()
  config.day = 2 == day.toString().length ? day : '0' + day
  config.month = 2 == month.toString().length ? month : '0' + month

  config.packageName = packageName
  console.log('  packageName: ' + config.packageName)

  config.date = config.year + '-' + config.month + '-' + config.day
  console.log('  date: ' + config.date)
}

function writeFiles(program) {
  console.log('')
  console.log('configuration')
  var config = {}

  exec('npm whoami', function(err, name) {
    assert.ifError(err)
    config.name = name.replace(/(\n)/gm, '')
    console.log('  user: ' + config.name)
    getConfig()
    createDir()
    writeFiles()
    installDeps()
    initGit()
  })
}
