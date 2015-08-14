const variableName = require('variable-name')
const prompt = require('inquirer').prompt
const assign = require('object-assign')
const today = require('dates-of-today')
const engine = require('./lib/engine')
const whoami = require('npm-whoami')
const gitInit = require('git-init')
const mkdirp = require('mkdirp')
const path = require('path')

const opts = {
  pre: [
    runPrompt,
    createDir,
    getDate,
    getUser,
    createGit
  ],
  files: [
    '.gitignore',
    '.travis.yml',
    'LICENSE',
    'README.md',
    'index.js',
    'package.json',
    'test.js'
  ],
  devDependencies: [ 'istanbul', 'standard', 'tape' ]
}

module.exports = engine.bind(null, opts)
create.opts = opts

// create a new package
// obj -> null
function create (argv) {
  engine(opts, argv)
}

// create prompt
// (obj, fn) -> null
function runPrompt (argv, cb) {
  const questions = [
    {
      name: 'name',
      default: '',
      message: 'Package name'
    },
    {
      name: 'description',
      message: 'Module description',
      default: '',
      filter: function (str) {
        if (!str) return
        return str[0].toUpperCase() + str.slice(1)
      }
    },
    {
      name: 'tags',
      default: '',
      message: 'Module tags',
      filter: function (str) {
        str = str || ''
        return str.split(',').map(function (str) {
          return str.trim()
        })
      }
    }
  ]

  prompt(questions, function (res) {
    res.varName = variableName(res.name)
    assign(argv, res)
    cb()
  })
}

// create specified path
// (obj, fn) -> null
function createDir (argv, next) {
  const loc = path.resolve(path.join(argv.d, argv.name))
  mkdirp(loc, function (err) {
    if (err) return next(err)
    process.chdir(loc)
    argv.directory = loc
    argv.d = loc
    next()
  })
}

// get the current user if no user was
// specified
// (obj, fn) -> null
function getUser (argv, next) {
  if (argv.user) return next()
  whoami(function (err, user) {
    if (err) throw err
    argv.user = user
    next()
  })
}

// get today's dates
// (obj, fn) -> null
function getDate (argv, next) {
  argv.date = today()
  next()
}

// create git repository
// (obj, cb) -> null
function createGit (argv, next) {
  const path = argv.path
  gitInit(path, next)
}
