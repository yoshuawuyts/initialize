#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');
var mkdir = require('mkdirp');
var path = require('path')
var fs = require('fs');
var join = path.join;

/**
 * Options.
 */

program
  .version(JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version)
  .option('-u, --username [value]', 'username', collect, [])
  .option('-e, --useremail [value]', 'user email', collect, [])

program.name = 'initialize';

/**
 * Generate a new 'lib'.
 */

program
  .command('lib <name>')
  .description('initialize a new lib with name <name>')
  .action(function(name) {
    mkdir.sync('/hi/poo/baz');/*
    var css = fs.readFileSync(join(__dirname, '..', 'mocha.css'));
    var js = fs.readFileSync(join(__dirname, '..', 'mocha.js'));
    var tmpl = fs.readFileSync(join(__dirname, '..', 'lib/template.html'));
    fs.writeFileSync(join(path, 'mocha.css'), css);
    fs.writeFileSync(join(path, 'mocha.js'), js);
    fs.writeFileSync(join(path, 'tests.js'), '');
    fs.writeFileSync(join(path, 'index.html'), tmpl);*/
    process.exit(0);
  })

/**
 * Generate a new 'simple lib'.
 */

/**
 * Generate a new 'application'.
 */


/**
 * Parse options
 */

function collect(value, container) {
  container.push(value);
  return container;
};

/**
 * Handle base files.
 */

// copy .npmignore
// copy LICENSE
// create .travis.yml
// create package.json
// create README.md

/**
 * Create new 'library'.
 */

// create /bin
// create /lib
// create /test
// create /lib/index.js
// create /test/index.js

/**
 * Create new 'simple library'.
 */

// create index.js
// create test.js

/**
 * Create new 'application'.
 */

  program.parse(process.argv);