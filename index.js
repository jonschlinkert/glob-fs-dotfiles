'use strict';

var extend = require('extend-shallow');
var isDotfile = require('is-dotfile');
var isDotdir = require('is-dotdir');

module.exports = function (options) {
  var config;

  return function dotfiles(file, opts) {
    // cache options from middleware and glob
    if (typeof config === 'undefined') {
      config = extend({}, opts, options);
    }

    // extend file options with
    opts = extend({}, config, opts);
    var isDot = isDotfile(file.path);
    var isDir = isDotdir(file.path);

    // both dotfiles and dotdirs
    if (opts.dot === true && (isDot || isDir)) {
      file.include = true;
      return file;
    }

    // dotdirs only
    if (isDir && file.isDir === true) {
      if (opts.dotdirs === true) {
        file.include = true;
        return file;
      }
      file.exclude = true;
    }

    // dotfiles only
    if (isDot && file.isDir === false) {
      if (opts.dotfiles === true) {
        file.include = true;
        return file;
      }
      file.exclude = true;
    }
    return file;
  };
};
