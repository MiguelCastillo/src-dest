var glob = require("glob");
var path = require("path");
var types = require("dis-isa");
var utils = require("belty");
var processCwd = process.cwd();

function File(options, cwd) {
  if (!(this instanceof File)) {
    return new File(options);
  }

  if (options instanceof File) {
    Object.assign(this, options);
    return this;
  }

  if (!options) {
    options = {};
  }
  else if (types.isString(options) || types.isArray(options)) {
    options = {
      src: options
    };
  }

  cwd = options.cwd || cwd;
  cwd = cwd && path.isAbsolute(cwd) ? cwd : path.join(processCwd, cwd || "");

  Object.assign(this, options, {
    cwd: cwd,
    src: options.src ? src(options.src, cwd, options.resolve) : [],
    dest: options.dest ? dest(options.dest, cwd) : null
  });
}

File.prototype.setSrc = function(files) {
  return new File(Object.assign({}, this, { src: files }));
};

File.prototype.setDest = function(file) {
  return new File(Object.assign({}, this, { dest: file }));
};

function list(files, cwd) {
  return utils.toArray(files).map(function(file) {
    return new File(file, cwd);
  });
}

function src(files, cwd, resolve) {
  return utils.toArray(files).reduce(function(acc, file) {
    var result = (
      types.isString(file) && resolve !== false ?
      glob.sync(file, { cwd: cwd, realpath: true }) :
      [file]
    );

    if (!result.length) {
      throw new Error("File(s) not found: " + file);
    }

    return acc.concat(result);
  }, []);
}

function dest(file, cwd) {
  return types.isString(file) ? (path.isAbsolute(file) ? file : path.join(cwd, file)) : file;
}

module.exports = File;
module.exports.list = list;
module.exports.src = src;
module.exports.dest = dest;
