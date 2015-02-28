const fs = require('fs')
const mustache = require('mustache')

module.exports = write

/**
 * Echo str > path.
 * @param {String} path
 * @param {String} str
 * @api private
 */
function write (opts) {
  console.log('')
  console.log('files')

  return function (path, str) {
    str = fs.readFileSync(path.join(__dirname, str), 'utf-8')
    var mt = mustache.render(str, opts)
    console.log('  file: ' + path.split('./')[1])
    fs.writeFileSync(path, mt, function (err) {
      if (err) {
        process.stderr.write(err + '\n')
        process.exit(1)
      }
      console.log('   \x1b[36mcreate\x1b[0m : ' + path)
    })
  }
}
