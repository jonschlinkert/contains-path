'use strict';

require('mocha');
var assert = require('assert');
var containsPath = require('./');

describe('containsPath', function() {
  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      containsPath();
    }, /expected/);

    assert.throws(function() {
      containsPath({});
    }, /expected/);

    assert.throws(function() {
      containsPath([]);
    }, /expected/);

    assert.throws(function() {
      containsPath(null);
    }, /expected/);
  });

  it('should be false when the value is an empty string', function() {
    assert(!containsPath('foo', ''));
  });

  it('should be false when the value is only slashes', function() {
    assert(!containsPath('/foo', '/'));
    assert(!containsPath('/foo', '//'));
    assert(!containsPath('/foo', '///'));
    assert(!containsPath('foo/', '/'));
    assert(!containsPath('foo/', '//'));
    assert(!containsPath('foo/', '///'));
    assert(!containsPath('/foo/', '/'));
    assert(!containsPath('/foo/', '//'));
    assert(!containsPath('/foo/', '///'));
  });

  it('should return true when a path contains another path', function() {
    assert(!containsPath('./bar/foo/bar/baz', './foo'));
    assert(!containsPath('./bar/foo/bar/baz', './foo/bar'));
    assert(!containsPath('abc', 'foo.md'));
    assert(containsPath('/foo/bar/baz', 'foo/bar'));
    assert(containsPath('aa/foo.md', 'foo.md'));
    assert(containsPath('foo', 'foo'));
    assert(containsPath('foo/bar/baz', 'foo'));
  });

  it('should work with windows drive letters', function() {
    assert(!containsPath('C:/foo/bar', 'C:/bar'));
    assert(containsPath('C:/foo/bar', 'C:/foo'));
    assert(containsPath('C:/foo/bar', 'foo/bar'));
  });

  it('should match any path part when prefixed with "/"', function() {
    assert(!containsPath('./bar/baz/qux', '/bar'));
    assert(!containsPath('bar/baz/qux', '/bar'));
    assert(containsPath('./bar/foo/bar/baz', '/foo/bar'));
    assert(containsPath('/bar/baz/qux', '/bar'));
    assert(containsPath('/bar/foo/bar/baz', '/foo/bar'));
    assert(containsPath('/foo/bar/baz', '/foo/bar'));
    assert(containsPath('foo/bar/baz', '/baz'));
  });

  it('should match from bos when starts with "./"', function() {
    assert(!containsPath('/bar/foo/bar/baz', './bar'));
    assert(containsPath('./bar/foo/bar/baz', './bar'));
    assert(containsPath('./bar/foo/bar/baz', 'foo/bar'));
    assert(containsPath('./foo/bar/baz', 'foo'));
    assert(containsPath('./foo/bar/baz', 'foo/bar'));
    assert(containsPath('bar/foo/bar/baz', './bar'));

    // windows paths
  });

  it('should be true when the path ends with a string', function() {
    assert(!containsPath('foo/bar.md/baz', '.md'));
    assert(containsPath('foo/.git/baz', '.git'));
    assert(containsPath('foo/bar/baz', 'bar/baz'));
    assert(containsPath('foo/bar/baz', 'baz'));
    assert(containsPath('foo/bar/baz.md', 'bar/baz.md'));
    assert(containsPath('foo/bar/baz.md', 'baz.md'));
  });

  it('should return false for partial matches', function() {
    assert(!containsPath('abc', 'foo'));
    assert(!containsPath('aaa', 'foo'));
    assert(!containsPath('aaa.md', 'foo.md'));
  });

  it('should be false when the path does not contain the string', function() {
    assert(!containsPath('foo/bar/baz.md', 'baz'));
  });

  it('should be false when the string is a "partial" match', function() {
    assert(!containsPath('foo/bar/baz.md', '.md'));
    assert(!containsPath('foo/bar/baz.md', 'baz'));
    assert(!containsPath('foo/bar/baz.md', 'baz/'));
    assert(!containsPath('foo/bar/baz.md', 'md'));
    assert(!containsPath('foo/bar/baz.md', 'z.md'));
    assert(!containsPath('foo/bar/bazqux', 'qux'));
  });
});
