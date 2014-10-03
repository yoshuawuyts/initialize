#!/usr/bin/env node

/**
 * Module dependencies.
 */

var mustache = require('mustache');
var program = require('commander');
var mkdir = require('mkdirp');
var path = require('path');
var fs = require('fs');
var join = path.join;

/**
 * Options.
 */

var pkg = fs.readFileSync(__dirname + '/../package.json', 'utf-8');
var version = JSON.parse(pkg).version;
program.name = 'initialize';
program.version(version);

program.usage('<dirname>')
program.option('-k, --keyword <tag>', 'add a keyword to package.json');
program.option('-d, --description <sentence>', 'add a description');

program.parse(process.argv);

/**
 * Check for errors.
 */

if (!process.argv[2]) throwErr('Please specify a package name. Type \'initialize -h\' to see all options.');

/**
 * Generate new lib.
 */

// get username from npm config
// create folder with name n
// assert folder is empty
// change dir into folder
var config = {};

var date = new Date();
config.year = date.getFullYear();
var month = date.getMonth();
config.month = 2 == month.toString().length ? month : '0' + month;
var day = date.getDay();
config.day = 2 == day.toString().length ? day : '0' + day;
date = config.year + '-' + month + '-' + day;

config.packageName = process.argv[3];

write('./.travis.yml', fs.readFileSync(__dirname + '/../templates/travis.yml', 'utf-8'));
write('./HISTORY.md', fs.readFileSync(__dirname + '/../templates/HISTORY.md', 'utf-8'));
write('./package.json', fs.readFileSync(__dirname + '/../templates/package', 'utf-8'));
write('./.gitignore', fs.readFileSync(__dirname + '/../templates/gitignore', 'utf-8'));
write('./README.md', fs.readFileSync(__dirname + '/../templates/README.md', 'utf-8'));
write('./.eslintrc', fs.readFileSync(__dirname + '/../templates/eslintrc', 'utf-8'));
write('./Makefile', fs.readFileSync(__dirname + '/../templates/Makefile', 'utf-8'));
write('./index.js', fs.readFileSync(__dirname + '/../templates/index.js', 'utf-8'));
write('./test.js', fs.readFileSync(__dirname + '/../templates/test.js', 'utf-8'));
write('./LICENSE', fs.readFileSync(__dirname + '/../templates/LICENSE', 'utf-8'));

process.exit(0);

/**
 * Echo str > path.
 *
 * @param {String} path
 * @param {String} str
 * @api private
 */

function write(path, str, mode) {
  var template = mustache.render(str, config);
  fs.writeFileSync(path, template, {mode: mode || 0666}, function(err) {
    if (err) throwErr(err);
    else console.log('   \x1b[36mcreate\x1b[0m : ' + path);
  });
}

/**
 * Throw err.
 *
 * @param {Any} msg
 * @api private
 */

function throwErr(msg) {
  console.error(msg);
  process.exit(1);
}
