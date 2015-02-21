const exec = require('child_process').exec
const assert = require('assert')

module.exports = installDeps

function installDeps() {
  console.log('')
  console.log('dependencies')

  exec('npm i --save-dev tape', function(err) {
    console.log('  module: tape')
    assert.ifError(err)
  })

  exec('npm i --save-dev standard', function(err) {
    console.log('  module: standard')
    assert.ifError(err)
  })

  exec('npm i --save-dev istanbul', function(err) {
    console.log('  module: istanbul')
    assert.ifError(err)
  })
}
