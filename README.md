# initialize
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Create a new repo with sane defaults. Provides all the tools needed to create
a unix style module.

## Installation
````
npm install -g initialize
````

## Usage
````
  Usage: initialize <dirname>

  Options:

    -h, --help                    output usage information
    -V, --version                 output the version number
    -k, --keyword <tag>           add a keyword to package.json
    -d, --description <sentence>  add a description
````

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
