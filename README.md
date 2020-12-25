# src-dest

[![Build Status](https://travis-ci.org/MiguelCastillo/src-dest.svg?branch=master)](https://travis-ci.org/MiguelCastillo/src-dest)

Helper utility for managing src and dest file paths. File instances contain an array of `src` file paths and a single `dest` file path; all paths are full paths.

> This is a trimmed down version of Grunt files.


# Usage

## Install

```
$ npm install --save src-dest
```


## Single file name input

``` javascript
import File from 'src-dest';

const file = new File('index.js');

console.log(file.src);
// $ ['/fullpath/index.js']
```


## glob example

``` javascript
import File from 'src-dest';

const file = new File('*.js');

console.log(file.src);
// $ ['/fullpath/index1.js', '/fullpath/index2.js']
```


## Multiple input files

``` javascript
import File from 'src-dest';

const file = new File(['./index.js', 'file.js']);

console.log(file.src);
// $ ['/fullpath/index.js', '/fullpath/file.js']
```

## Input object with explicit `src` and `dest` using globs

``` javascript
import File from 'src-dest';

const file = new File({
  src: ['**/*.js', { content: 'console.log("hello world")', path: "/test" }],
  dest: './ouput.js'
});

console.log(file.src);
// $ ['/fullpath/input1.js', '/fullpath/subpath/input2.js']

console.log(file.dest);
// $ /fullpath/output.js
```


# API

## File(options, cwd) : File

Constructor to create file instances. A file instance contains an `src` property which is an array of full file paths. And a `dest` property which is also a full file path created when a `dest` is configured.

- **`options`** { string | string[] | { src: string[], dest: string } } - Options can be a string or an array of strings. These strings are configured as the `src` file paths. Options can alternatively be an object with `src` and `dest`.
  - **`options.src`** { string | string[] | object | object[] } - When input is a string or array of string, they are processed as globs. Otherwise, data is stored as is.
  - **`options.dest`** { string } - Destination file path.
  - **`options.resolve`** { boolean } - Flag to disable glob resolution.
- **`cwd`** { string } - Current working directory to resolve `src` files relative to. It's also used for creating the dest file path. If one isn't provided then `process.cwd()` is used.

> `src` file paths can be globs and are resolved relative to process.cwd() or `cwd` if that is provided. `dest` files are always resolved relative to process.cwd().


## setSrc(src) : File

Method to configure `src` file paths.

- **`src`** { string | string[] | object | object[] } - Source data to be configured in the file instance. These can strings, which are processed as globs. Otherwise, data is stored as is.


## setDest(dest) : File

Method to configure `dest` file path.

- **`dest`** { string } Destination path to be configured in the file instance.


## File.list(options, cwd) : File[]

Static helper method to create a list of file instances from a list of file options. Options are just an array of configurations used to build a list of File instances.

