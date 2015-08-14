const exec = require('child_process').exec
const parallel = require('run-parallel')
const series = require('run-series')
const mustache = require('mustache')
const through = require('through2')
const assert = require('assert')
const path = require('path')
const fs = require('fs')

module.exports = engine

// compose module options
// (obj, obj) -> null
function engine (opts, argv) {
  argv = argv || {}
  argv.dirname = __dirname
  assert.equal(typeof opts, 'object')
  assert.equal(typeof argv, 'object')

  const fns = [
    runPre.bind(null, opts.pre, argv),
    createFiles.bind(null, opts.files, argv),
    installDeps.bind(null, opts.devDependencies, argv)
  ]
  series(fns, function (err) {
    if (err) throw err
  })
}

// run pre functions in sequence
// (obj, obj, fn) -> null
function runPre (arr, argv, cb) {
  const nw = arr.map(function (el) {
    return el.bind(null, argv)
  })
  series(nw, cb)
}

// create files
// (obj, obj, fn) -> null
function createFiles (files, argv, cb) {
  const dir = argv.directory

  const fns = files.map(function (file) {
    const tempDir = path.resolve(path.join(argv.dirname, '../templates'))
    const inFile = path.join(tempDir, file.replace(/^\./, '_.'))
    const outFile = path.join(dir, file)

    return function (done) {
      fs.createReadStream(inFile)
        .pipe(through(transform))
        .pipe(fs.createWriteStream(outFile))
        .on('error', done)
        .on('finish', function () {
          process.stdout.write('write: ' + outFile + '\n')
          done()
        })

      function transform (chunk, enc, cb) {
        const str = chunk.toString()
        const mt = mustache.render(str, argv)
        cb(null, mt)
      }
    }
  })
  parallel(fns, cb)
}

// install npm dependencies
// (obj, obj, fn) -> null
function installDeps (deps, argv, cb) {
  const mods = deps.map(function (dep) {
    return function (done) {
      process.stdout.write('pkg: ' + dep + '\n')
      exec(['npm i -D', dep, '--cache-min Infinity'].join(' '), function (err) {
        if (err) return cb(err)
      })
    }
  })

  parallel(mods, cb)
}
