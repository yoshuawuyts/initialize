const mustache = require('mustache')
const path = require('path')
const fs = require('fs')

module.exports = write

/**
 * Echo str > filePath.
 * @param {String} filePath
 * @param {String} str
 * @api private
 */
function write (opts) {
  console.log('')
  console.log('files')

  return function (filePath, str) {
    str = fs.readFileSync(path.join(__dirname, str), 'utf-8')
    var mt = mustache.render(str, opts)
    console.log('  file: ' + filePath.split('./')[1])
    fs.writeFile(filePath, mt, function (err) {
      if (err) {
        process.stderr.write(err + '\n')
        process.exit(1)
      }
      console.log('   \x1b[36mcreate\x1b[0m: ' + filePath)
    })
  }
}
