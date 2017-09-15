var glob = require("glob");
var path = require("path");
var types = require("dis-isa");
var utils = require("belty");
var configurator = require("setopt")();
var processCwd = process.cwd();

function File(options, cwd) {
  if (!(this instanceof File)) {
    return new File(options);
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

  this.src = [];
  this.dest = null;
  this.cwd = cwd;
  this.resolve = options.resolve;
  configurator.configure(this, options);
}

File.prototype.setSrc = function(files) {
  this.src = src(files, this.cwd, this.resolve);
  return this;
};

File.prototype.setDest = function(file) {
  this.dest = dest(file, processCwd);
  return this;
};

function list(files, cwd) {
  return utils.toArray(files).map(function(file) {
    return new File(file, cwd);
  });
}

function src(files, cwd, resolve) {
  return utils.toArray(files).reduce(function(result, file) {
    var globResult = types.isString(file) && resolve !== false ?
      glob.sync(file, { cwd: cwd, realpath: true }) :
      [file];

    if (!globResult.length) {
      throw new Error("File(s) not found: " + file);
    }

    return result.concat(globResult);
  }, []);
}

function dest(file, cwd) {
  return types.isString(file) ?
    path.isAbsolute(file) ? file : path.join(cwd, file) :
    file;
}

module.exports = File;
module.exports.list = list;
module.exports.src = src;
module.exports.dest = dest;
