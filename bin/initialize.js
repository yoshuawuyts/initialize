#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

/**
 * Options
 */

program
  .version('0.0.1')
  .option('-n, --projectname [value]', 'project name', collect, [])
  .option('-u, --username [value]', 'username', collect, [])
  .option('-e, --useremail [value]', 'email address', collect, [])
  .option('-l, --lib', 'init a library')
  .option('-L, --library-simple', 'init a simple library')
  .option('-p, --project', 'init a project')
  .parse(process.argv);

/**
 * Parse options
 */

function collect(value, container) {
  container.push(value);
  return container;
};

console.log('  project name: %j', program.projectname);
console.log('  project name: %j', program.username);
console.log('  project name: %j', program.useremail);