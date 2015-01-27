#!/usr/bin/env node

var exec     = require('child_process').exec;
var mustache = require('mustache');
var program  = require('commander');
var assert   = require('assert');
var mkdir    = require('mkdirp');
var path     = require('path');
var fs       = require('fs');
const start  = require('../');
var join     = path.join;

/**
 * Options.
 */

var pkg = fs.readFileSync(__dirname + '/../package.json', 'utf-8');
var version = JSON.parse(pkg).version;
program.name = 'initialize';
program.version(version);

program.usage('<dirname>')
//program.option('-k, --keyword <tag>', 'add a keyword to package.json');
//program.option('-d, --description <sentence>', 'add a description');
program.parse(process.argv);

/**
 * Check for errors.
 */

var packageName = process.argv[2];
if (!packageName) throwErr('Please specify a package name. Type \'initialize -h\' to see all options.');

start(program);
