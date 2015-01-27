var exec     = require('child_process').exec;
var mustache = require('mustache');
var program  = require('commander');
var assert   = require('assert');
var mkdir    = require('mkdirp');
var path     = require('path');
var fs       = require('fs');
var join     = path.join;

module.exports = writeFiles

/**
 * Set config
 */
function writeFiles(program) {
  console.log('');
  console.log('configuration');
  var config = {};

  exec('npm whoami', function(err, name) {
    assert.ifError(err);
    config.name = name.replace(/(\n)/gm, '');
    console.log('  user: ' + config.name);
    getConfig();
    createDir();
    writeFiles();
    installDeps();
    initGit();
  });
}

/**
 * Get configuration.
 */
function getConfig() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();

  config.year = date.getFullYear();
  config.day = 2 == day.toString().length ? day : '0' + day;
  config.month = 2 == month.toString().length ? month : '0' + month;

  config.packageName = packageName;
  console.log('  packageName: ' + config.packageName);

  config.date = config.year + '-' + config.month + '-' + config.day;
  console.log('  date: ' + config.date);
}

/**
 * Create directory.
 */
function createDir() {
  mkdir.sync(packageName);
  process.chdir(packageName);
}

/**
 * Initialize git repo.
 */
function initGit() {
  exec('git init --quiet', function(err) {
    assert.ifError(err);
  });
}

/**
 * Write files.
 */
function writeFiles() {
  console.log('');
  console.log('files');
  write('./.editorconfig', fs.readFileSync(__dirname + '/templates/editorconfig', 'utf-8'));
  write('./.eslintrc', fs.readFileSync(__dirname + '/templates/eslintrc', 'utf-8'));
  write('./.gitignore', fs.readFileSync(__dirname + '/templates/gitignore', 'utf-8'));
  write('./.travis.yml', fs.readFileSync(__dirname + '/templates/travis.yml', 'utf-8'));
  write('./index.js', fs.readFileSync(__dirname + '/templates/index.js', 'utf-8'));
  write('./LICENSE', fs.readFileSync(__dirname + '/templates/LICENSE', 'utf-8'));
  write('./README.md', fs.readFileSync(__dirname + '/templates/README.md', 'utf-8'));
  write('./package.json', fs.readFileSync(__dirname + '/templates/package', 'utf-8'));
  write('./test.js', fs.readFileSync(__dirname + '/templates/test.js', 'utf-8'));
}

/**
 * Install dependencies.
 */
function installDeps() {
  console.log('');
  console.log('dependencies');

  exec('npm i --save-dev tape', function(err) {
    console.log('  module: tape');
    assert.ifError(err);
  });

  exec('npm i --save-dev colortape', function(err) {
    console.log('  module: colortape');
    assert.ifError(err);
  });

  exec('npm i --save-dev eslint', function(err) {
    console.log('  module: eslint');
    assert.ifError(err);
  });

  exec('npm i --save-dev istanbul', function(err) {
    console.log('  module: istanbul');
    assert.ifError(err);
  });
}

/**
 * Echo str > path.
 * @param {String} path
 * @param {String} str
 * @api private
 */
function write(path, str) {
  var mt = mustache.render(str, config);
  console.log('  file: ' + path.split('./')[1]);
  fs.writeFileSync(path, mt, {mode: 0666}, function(err) {
    if (err) throwErr(err);
    console.log('   \x1b[36mcreate\x1b[0m : ' + path);
  });
}

/**
 * Throw err.
 * @param {Any} msg
 * @api private
 */
function throwErr(msg) {
  console.error(msg);
  process.exit(1);
}
