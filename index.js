const install = require('./lib/npm-install')
const exec = require('child_process').exec
const mustache = require('mustache')
const write = require('./lib/write')
const assert = require('assert')
const git = require('./lib/git')
const mkdir = require('mkdirp')
const path = require('path')
const fs = require('fs')
const join = path.join

module.exports = writeFiles

// Init writing files
// @param {Object} opts
function init(opts) {
  const files = opts.files
  const pn = opts.meta.packageName

  mkdir.sync(pn)
  process.chdir(pn)

  if (files.gitignore) write('./.gitignore', 'templates/gitignore')
  if (files.index) write('./index.js', 'templates/index.js')
  if (files.license) write('./LICENSE', 'templates/LICENSE')
  if (files.package) write('./package.json', 'templates/package')
  if (files.readme) write('./README.md', 'templates/README.md')
  if (files.test) write('./test.js', 'templates/test.js')
  if (files.travis) write('./.travis.yml', 'templates/travis.yml')
  if (opts.install) install()
  if (opts.git) git()
}
