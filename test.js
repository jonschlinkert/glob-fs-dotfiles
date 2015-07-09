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

    glob.on('exclude', function (file) {
      // console.log(file.path);
    });
  });

  it('should glob dotfiles by default:', function (done) {
    glob.use(dotfiles())
      .readdir('*', function (err, files) {
        assert.equal(has(files, 'LICENSE'), true);
        assert.equal(has(files, 'package.json'), true);
        assert.equal(has(files, '.gitignore'), false);
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
        done();
      });
  });

  it('should glob dotfiles when `dotfiles` true is passed to middleware:', function (done) {
    glob.use(dotfiles({ dotfiles: true }))
      .readdir('*', function (err, files) {
        // dotfiles => true
        assert.equal(has(files, '.gitignore'), true);
        done();
      });
  });

  it('should glob dotdirs when `dotdirs` true is passed to glob:', function (done) {
    glob = new Glob({ dotdirs: true })
    glob.use(dotfiles())
      .readdir('*', function (err, files) {
        assert.equal(has(files, '.git'), false);
        done();
      });
  });

  it('should glob dotdirs when `dotdirs` true is passed:', function (done) {
    glob = new Glob()
    glob.use(dotfiles({ dotdirs: true }))
      .readdir('*', function (err, files) {
        assert.equal(has(files, '.git'), false);
        done();
      });
  });
});
