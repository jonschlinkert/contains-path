'use strict';

/* deps: mocha */
var assert = require('assert');
var containsPath = require('./');

describe('containsPath', function () {
  it('should return true when a path contains another path:', function () {
    assert.equal(containsPath('a', 'a'), true);
    assert.equal(containsPath('a/b/c', 'a'), true);
    assert.equal(containsPath('./a/b/c', 'a'), true);
    assert.equal(containsPath('./a/b/c', 'a/b'), true);
    assert.equal(containsPath('./b/a/b/c', 'a/b'), true);
  });

  it('should return false when a path does not contain another path:', function () {
    assert.equal(containsPath('abc', 'a'), false);
    assert.equal(containsPath('abc', 'a.md'), false);
    assert.equal(containsPath('./b/a/b/c', './a/b'), false);
    assert.equal(containsPath('./b/a/b/c', './a'), false);
  });

  it('should match absolute paths correctly:', function () {
    assert.equal(containsPath('/a/b/c', 'a/b'), true);
    assert.equal(containsPath('/a/b/c', '/a/b'), true);
    assert.equal(containsPath('./b/a/b/c', '/a/b'), false);
    assert.equal(containsPath('/b/a/b/c', '/a/b'), false);
  });

  it('should throw an error:', function () {
    assert.throws(function () {
      containsPath();
    }, 'contains-path expects file paths to be a string.');
  });
});
