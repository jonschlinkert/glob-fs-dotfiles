'use strict';

/* deps: mocha */
var assert = require('assert');
var Glob = require('glob-fs');
var dotfiles = require('./');
var glob;

function has(files, fp) {
  return files.indexOf(fp) !== -1;
}

describe('dotfiles', function () {
  beforeEach(function () {
    glob = new Glob({gitignore: false});

    glob.on('include', function (file) {
      // console.log(file.relative);
    });

    glob.on('exclude', function (file) {
      // console.log('dotfile:', file.isDotfile());
      // console.log('dotdir:', file.isDotdir());
    });
  });

  it('should glob dotfiles by default:', function (done) {
    glob.use(dotfiles())
      .readdir('*', function (err, files) {
        assert.equal(has(files, 'LICENSE'), true);
        assert.equal(has(files, 'package.json'), true);
        assert.equal(has(files, '.gitignore'), false);
        assert.equal(has(files, '.git'), false);
        done();
      });
  });

  it('should use options passed to `glob`:', function (done) {
    glob = new Glob({ dot: true })
    glob.use(dotfiles())
      .readdir('*', function (err, files) {
        assert.equal(has(files, '.git'), true);
        assert.equal(has(files, '.gitignore'), true);
        done();
      });
  });

  it('should use options passed to the middleware:', function (done) {
    glob.use(dotfiles({ dot: true }))
      .readdir('*', function (err, files) {
        assert.equal(has(files, '.git'), true);
        assert.equal(has(files, '.gitignore'), true);

        // reverse the test, ensure options are updated correctly
        glob = new Glob()
        glob.use(dotfiles({ dot: false, dotfiles: false }))
          .readdir('*', function (err, files) {
            assert.equal(has(files, '.git'), false);
            assert.equal(has(files, '.gitignore'), false);
            done();
          });
     });
  });

  it('should glob dotfiles when `dotfiles` true is passed to glob:', function (done) {
    glob = new Glob({ dotfiles: true })
    glob.use(dotfiles())
      .readdir('*', function (err, files) {
        // dotfiles => true
        assert.equal(has(files, '.gitignore'), true);
        // but not dotdirs
        assert.equal(has(files, '.git'), false);
        done();
      });
  });

  it('should glob dotfiles when `dotfiles` true is passed to middleware:', function (done) {
    glob.use(dotfiles({ dotfiles: true }))
      .readdir('*', function (err, files) {
        // dotfiles => true
        assert.equal(has(files, '.gitignore'), true);
        // but not dotdirs
        assert.equal(has(files, '.git'), false);
        done();
      });
  });

  it('should glob dotdirs when `dotdirs` true is passed to glob:', function (done) {
    glob = new Glob({ dotdirs: true })
    glob.use(dotfiles())
      .readdir('*', function (err, files) {
        // dotdirs => true
        assert.equal(has(files, '.git'), true);
        // but not dotfiles
        assert.equal(has(files, '.gitignore'), false);
        done();
      });
  });

  it('should glob dotdirs when `dotdirs` true is passed to the middleware:', function (done) {
    glob.use(dotfiles({ dotdirs: true }))
      .readdir('*', function (err, files) {
        // dotdirs => true
        assert.equal(has(files, '.git'), true);
        // but not dotfiles
        assert.equal(has(files, '.gitignore'), false);
        done();
      });
  });
});
