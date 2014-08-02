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

var config = require('../config.json');

/**
 * Options.
 */

program
  .version(
    JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf-8')).version
  );

program.name = 'initialize';

/**
 * Read template files
 */

var gitignore = fs.readFileSync(__dirname + '/../templates/gitignore', 'utf-8');
var npmignore = fs.readFileSync(__dirname + '/../templates/npmignore', 'utf-8');
var eslintrc = fs.readFileSync(__dirname + '/../templates/eslintrc', 'utf-8');
var travis = fs.readFileSync(__dirname + '/../templates/travis.yml', 'utf-8');
var pjson = fs.readFileSync(__dirname + '/../templates/package.json', 'utf-8');
var readme = fs.readFileSync(__dirname + '/../templates/README.md', 'utf-8');
var license = fs.readFileSync(__dirname + '/../templates/LICENSE', 'utf-8');
var index = fs.readFileSync(__dirname + '/../templates/index.js', 'utf-8');
var test = fs.readFileSync(__dirname + '/../templates/test.js', 'utf-8');

/**
 * Generate a new 'lib'.
 */

program
  .command('lib')
  .description('initialize a new lib with name <name>')
  .action(function(name) {
    argChecker('Please specify a package name.');
    makeConfig();
    mkdir('./lib/');
    mkdir('./test/');
    write('./.gitignore', gitignore);
    write('./.npmignore', npmignore);
    write('./.travis.yml', travis);
    write('./.eslintrc', eslintrc);
    write('./package.json', pjson);
    write('./lib/index.js', index);
    write('./test/index.js', test);
    write('./README.md', readme);
    write('./LICENSE', license);
    process.exit(0);
  });

/**
 * Generate a new 'simple-lib'.
 */

program
  .command('simple-lib')
  .description('initialize a new simple-lib with name <name>')
  .action(function(name) {
    argChecker('Pleas specify a package name.');
    makeConfig();
    write('./.gitignore', gitignore);
    write('./.npmignore', npmignore);
    write('./.travis.yml', travis);
    write('./.eslintrc', eslintrc);
    write('./package.json', pjson);
    write('./index.js', index);
    write('./test.js', test);
    write('./README.md', readme);
    write('./LICENSE', license);
    process.exit(0);
  });

/**
 * Generate a new 'simple-lib'.
 */

program
  .command('project')
  .description('initialize a new project with name <name>')
  .action(function(name) {
    argChecker('Pleas specify a package name.');
    makeConfig();
    mkdir('./client/');
    mkdir('./client/dispatcher');
    mkdir('./client/modules');
    mkdir('./client/modules/index');
    mkdir('./client/stores');
    mkdir('./client/views');
    mkdir('./server/');
    mkdir('./test');
    write('./.gitignore', gitignore);
    write('./.npmignore', npmignore);
    write('./.travis.yml', travis);
    write('./.eslintrc', eslintrc);
    write('./package.json', pjson);
    write('./client/modules/index/index.js', index);
    write('./test/test.js', test);
    write('./README.md', readme);
    write('./LICENSE', license);
    process.exit(0);
  });

/**
 * Parse arguments.
 */

program.parse(process.argv);

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 * @api private
 */

function mkdir(path, fn) {
  console.log(hi)
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 * @api private
 */

function write(path, str, mode) {
  var template = mustache.render(str, config);
  fs.writeFileSync(path, template, {mode: mode || 0666}, function(err) {
    if (err) console.log(err);
    else console.log('   \x1b[36mcreate\x1b[0m : ' + path);
  }); 
}

/**
 * Arg checker.
 *
 * @param {String} msg
 * @api private
 */

function argChecker(msg) {
  if (process.argv[3]) return;
  console.log(msg);
  process.exit(1);
}

/**
 * Setup configuration.
 *
 * @api private
 */

function makeConfig() {
  var date = new Date();
  var year = date.getFullYear();
  config.packageName = process.argv[3];
  config.year = year;
}

/**
 * Log help if no commands specified.
 */

if (!process.argv[2]) program.help();
else {
  if ('lib' == process.argv[2]) return;
  if ('simple-lib' == process.argv[2]) return;
  console.log('Incorrect argument. Type \'initialize -h\' to see all options.');
}