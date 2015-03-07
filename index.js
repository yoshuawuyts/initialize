const install = require('./lib/npm-install')
const write = require('./lib/write')
const git = require('./lib/git')
const mkdir = require('mkdirp')

module.exports = init

// Init writing files
// @param {Object} opts
function init (opts) {
  const files = opts.files
  const pn = opts.meta.packageName
  const writer = write(opts.meta)

  mkdir.sync(pn)
  process.chdir(pn)

  if (files.gitignore) writer('./.gitignore', '../templates/gitignore')
  if (files.index) writer('./index.js', '../templates/index.js')
  if (files.license) writer('./LICENSE', '../templates/LICENSE')
  if (files.package) writer('./package.json', '../templates/package')
  if (files.readme) writer('./README.md', '../templates/README.md')
  if (files.test) writer('./test.js', '../templates/test.js')
  if (files.travis) writer('./.travis.yml', '../templates/travis.yml')
  if (opts.install) install()
  if (opts.git) git()
}
