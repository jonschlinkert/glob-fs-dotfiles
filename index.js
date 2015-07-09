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

    // extend file options with config
    opts = extend({}, config, opts);

    if (file.pattern.glob.charAt(0) === '.') {
      opts.dot = true;
    }

    file.isDotfile = isDotfile(file.path);
    file.isDotdir = isDotdir(file.path);

    // dotfiles
    if (file.isDotfile && (opts.dot === true || opts.dotfiles === true)) {
      file.include = true;
      return file;
    }

    // dotdirs
    if (file.isDotdir && (opts.dot === true || opts.dotdirs === true)) {
      file.include = true;
      return file;
    }

    if ((file.isDotdir || file.isDotfile) && file.include !== true) {
      file.exclude = true;
    }

    return file;
  };
};
