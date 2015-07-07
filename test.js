/*!
 * glob-fs-dotfiles <https://github.com/jonschlinkert/glob-fs-dotfiles>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var glob = require('glob-fs');
var dotfiles = require('./');

describe('dotfiles', function () {
  it('should not glob dotfiles by default:', function (done) {
    glob()
      .use(dotfiles())
      .readdir('*', function (err, files) {
        assert.equal(files.indexOf('LICENSE') !== -1, true);
        assert.equal(files.indexOf('package.json') !== -1, true);
        assert.equal(files.indexOf('.gitignore') !== -1, false);
        done();
      });
  });

  it('should glob dotfiles when `dotfiles` true is passed to `glob`:', function (done) {
    glob({ dotfiles: true })
      .use(dotfiles())
      .readdir('*', function (err, files) {
        assert.equal(files.indexOf('.gitignore') !== -1, true);
        done();
      });
  });

  // it('should throw an error:', function () {
  //   (function () {
  //     dotfiles();
  //   }).should.throw('dotfiles expects valid arguments');
  // });
});
