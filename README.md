# initialize
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Create a new repo with sane defaults. Provides all the tools needed to create
a unix style module.

## Installation
````
npm install -g initialize
````

## Usage
````
  Usage: initialize <packageName>

  Options:

    -h, --help                    output usage information
    -V, --version                 output the version number
    -l, --local                   create a local module
```

## .npmrc
Make sure`~/.npmrc` contains at least the following value:
```
init.author.name=tobiferret
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/initialize.svg?style=flat-square
[npm-url]: https://npmjs.org/package/initialize
[downloads-image]: http://img.shields.io/npm/dm/initialize.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/initialize
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
