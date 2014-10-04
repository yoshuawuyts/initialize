# initialize
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Create a new repo with sane defaults. Provides all the tools needed to create
a unix style module.

## Installation
````
npm i -g initialize
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
Make sure`~/.npmrc` contains at least the values shown in the example. Do note
that the url must start with `http*` or else it wont' be found.
```
init.author.name=Tobi Ferret
init.author.username=tobiferret
init.author.email=i@tobiferret.com
init.author.url=http://tobiferret.com
```

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](yoshuawuyts.com)

[npm-image]: https://img.shields.io/npm/v/barracks.svg?style=flat-square
[npm-url]: https://npmjs.org/package/barracks
[downloads-image]: http://img.shields.io/npm/dm/barracks.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/barracks
