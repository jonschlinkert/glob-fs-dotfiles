'use strict';

var extend = require('extend-shallow');
var isDotfile = require('is-dotfile');
var isDotdir = require('is-dotdir');

module.exports = function (opts) {
  opts = opts || {};

  return function dotfiles(file) {
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
