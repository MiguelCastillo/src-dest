# src-dest

Helper utility for managing src and dest file paths. File instances contain an array of `src` file paths and a single `dest` file path; all relative file paths are resolved to full paths.

> This is a trimmed down version of Grunt files.


# Usage

## Install

```
$ npm install --save src-dest
```


## Simple example that takes in a file name.

``` javascript
import File from 'src-dest';

const file = new File('./input.js');

console.log(file.src);
// $ ['/fullpath/input1.js']
```

## Multiple input files

``` javascript
import File from 'src-dest';

const file = new File(['./input1.js', './input2.js']);

console.log(file.src);
// $ ['/fullpath/input1.js', '/fullpath/input2.js']
```

## Input object with explicit `src` and `dest`

``` javascript
import File from 'src-dest';

const file = new File({
  src: ['./input1.js', './input2.js'],
  dest: './ouput.js'
});

console.log(file.src);
// $ ['/fullpath/input1.js', '/fullpath/input2.js']

console.log(file.dest);
// $ /fullpath/output.js
```


# API

## File(options, cwd) : File

Constructor to create file instances. A file instance contains `src` which is an array of full file paths, and a `dest` full file path if one is configured.

- **`options`** { string | string[] | { src: string[], dest: string } } - Options can be a string or an array of strings. These strings are configured as the `src` file paths. Options can also be an object with an `src` and a `dest`.
  - **`options.src`** { string | string[] } - Source file paths.
  - **`options.dest`** { string } - Destination file path.
- **`cwd`** { string } - Current working directory to resolve `src` files relative to. If one isn't provided then `process.cwd()` is used.

> Relative `src` file paths are resolved relative to process.cwd() or `cwd` if that is provided. Relative `dest` files are always resolved relative to process.cwd().


## setSrc(src) : File

Method to configure `src` file paths.

- **`src`** { string | string[] } - Source paths to be configured in the file instance. Relative paths are resolved to full paths.


## setDest(dest) : File

Method to configure `dest` file path.

- **`dest`** { string } Destination path to be configured in the file instance.


## File.list(options, cwd) : File[]

Static method to create a list of file instances from a list of file options. Options are just an array of configurations used to build a list of File instances.

