# initialize [![stability][0]][1]
[![NPM version][2]][3] [![Downloads][4]][5] [![js-standard-style][6]][7]

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
user          Logged in user (github)
realName      User's real name
date.year     Current year
date.month    Current month
date.day      Current day
date.date     Current date
```

## See Also
- [initialize-cli][10]
- [initialize-project][11]
- [initialize-subpackage][12]

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/initialize.svg?style=flat-square
[3]: https://npmjs.org/package/initialize
[4]: http://img.shields.io/npm/dm/initialize.svg?style=flat-square
[5]: https://npmjs.org/package/initialize
[6]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[7]: https://github.com/feross/standard
[10]: http://github.com/yoshuawuyts/initialize-cli
[11]: http://github.com/yoshuawuyts/initialize-project
[12]: http://github.com/yoshuawuyts/initialize-subpackage
