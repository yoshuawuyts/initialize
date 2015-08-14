const prompt = require('inquirer').prompt

module.exports = runPrompt

// create prompt
// (obj, fn) -> null
function runPrompt (opts, cb) {
  prompt([
    {
      name: 'name',
      message: 'Package name',
      default: opts.packageName || ''
    },
    {
      name: 'description',
      message: 'Module description'
    },
    {
      name: 'tags',
      message: 'Module tags'
    }
  ], cb)
}
