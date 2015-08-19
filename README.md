# initialize
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Create a new repo with sane defaults. Provides all the tools needed to create
a unix style module.

## Installation
```sh
$ npm install -g initialize
```

## Usage
```txt
initialize - generate a fresh package

Usage: initialize [options]

Options:
  -h, --help        Output usage information
  -v, --version     Output version number
  -u, --user        Override user with organization
  -d, --directory   Specify output directory

Examples:
  $ initialize            # generate package in `./`
  $ initialize -d ./dir   # generate package in `./dir`
  $ initialize -u npm     # generate package for `npm`

Docs: https://github.com/yoshuawuyts/initialize
Bugs: https://github.com/yoshuawuyts/initialize/issues
```

## .npmrc
Requires npm to be configured:
```sh
# required
npm config set init.author.name "Your Name"
npm config set init.author.email "me@example.com"
npm config set init.author.github "your-github-handle"

# optional, defaults to your github
npm config set init.author.url "http://your-site.com/"
```

## Variables
The following variables are used in the templates:
```txt
name          Name of the package
varName       Name of package usable as JS var
description   Description of the package
tags          Package tags
user          Logged in user
date.year     Current year
date.month    Current month
date.day      Current day
date.date     Current date
```

## See Also
- [initialize-engine](https://www.npmjs.com/package/initialize-engine)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/initialize.svg?style=flat-square
[npm-url]: https://npmjs.org/package/initialize
[downloads-image]: http://img.shields.io/npm/dm/initialize.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/initialize
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
