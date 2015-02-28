const exec = require('child_process').exec
const assert = require('assert')

module.exports = git

// initialize a git repo
function git () {
  exec('git init --quiet', function (err) {
    assert.ifError(err)
  })
}
