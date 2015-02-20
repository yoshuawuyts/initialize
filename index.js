var exec = require('child_process').exec
var mustache = require('mustache')
var assert = require('assert')
var mkdir = require('mkdirp')
var path = require('path')
var fs = require('fs')
var join = path.join

module.exports = writeFiles

// Init writing files
// @param {Object} opts
function init(opts) {
  const files = opts.files
  const pn = opts.meta.packageName

  mkdir.sync(pn)
  process.chdir(pn)

  if (files.gitignore) gitIgnore()
  if (files.index) index()
  if (files.license) license()
  if (files.package) package()
  if (files.readme) readme()
  if (files.test) test()
  if (files.travis) travis()
  if (opts.install) install()
  if (opts.git) git()
}

/**
 * Initialize git repo.
 */
function git() {
  exec('git init --quiet', function(err) {
    assert.ifError(err)
  })
}

/**
 * Write files.
 */
function writeFiles() {
  console.log('')
  console.log('files')
  write('./.gitignore', 'templates/gitignore')
  write('./.travis.yml', 'templates/travis.yml')
  write('./index.js', 'templates/index.js')
  write('./LICENSE', 'templates/LICENSE')
  write('./README.md', 'templates/README.md')
  write('./package.json', 'templates/package')
  write('./test.js', 'templates/test.js')
}

/**
 * Install dependencies.
 */
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

/**
 * Echo str > path.
 * @param {String} path
 * @param {String} str
 * @api private
 */
function write(path, str) {
  str = fs.readFileSync(path.join(__dirname, str), 'utf-8')
  var mt = mustache.render(str, config)
  console.log('  file: ' + path.split('./')[1])
  fs.writeFileSync(path, mt, {mode: 0666}, function(err) {
    if (err) {
      process.stderr.write(err + '\n')
      process.exit(1)
    }
    console.log('   \x1b[36mcreate\x1b[0m : ' + path)
  })
}
