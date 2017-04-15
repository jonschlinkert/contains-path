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
    assert(!containsPath('/foo/', '/'));
    assert(!containsPath('/foo/', '//'));
    assert(!containsPath('/foo/', '///'));
    assert(!containsPath('/foo/', '\\\\'));
    assert(!containsPath('/foo/', '\\'));
  });

  it('should return true when a path contains another path', function() {
    assert(containsPath('./a/b/c', 'a'));
    assert(containsPath('./a/b/c', 'a/b'));
    assert(containsPath('./b/a/b/c', '/a/b'));
    assert(containsPath('./b/a/b/c', 'a/b'));
    assert(containsPath('/a/b/c', '/a/b'));
    assert(containsPath('/a/b/c', 'a/b'));
    assert(containsPath('/b/a/b/c', '/a/b'));
    assert(containsPath('a', 'a'));
    assert(containsPath('a/b/c', 'a'));
    assert(containsPath('aa/a.md', 'a.md'));
  });

  it('should match from bos when prefixed with "/"', function() {
    assert(containsPath('/b/c/d', '/b'));
    assert(!containsPath('b/c/d', '/b'));
    assert(!containsPath('./b/c/d', '/b'));

    assert(containsPath('\\b\\c\\d', '\\b'));
    assert(!containsPath('b\\c\\d', '\\b'));
    assert(!containsPath('.\\b\\c\\d', '\\b'));
  });

  it('should match from bos when starts with "./"', function() {
    assert(!containsPath('/b/a/b/c', './b'));
    assert(containsPath('b/a/b/c', './b'));
    assert(containsPath('./b/a/b/c', './b'));

    assert(!containsPath('\\b\\a\\b\\c', '.\\b'));
    assert(containsPath('b\\a\\b\\c', '.\\b'));
    assert(containsPath('.\\b\\a\\b\\c', '.\\b'));
  });

  it('should return false when a path does not contain another path', function() {
    assert(!containsPath('abc', 'a.md'));
    assert(!containsPath('./b/a/b/c', './a/b'));
    assert(!containsPath('./b/a/b/c', './a'));

    assert(!containsPath('.\\b\\a\\b\\c', '.\\a\\b'));
    assert(!containsPath('.\\b\\a\\b\\c', '.\\a'));
  });

  it('should return false for partial matches', function() {
    assert(!containsPath('abc', 'a'));
    assert(!containsPath('aaa', 'a'));
    assert(!containsPath('aaa.md', 'a.md'));
  });

  it('should be true when the path ends with a string', function() {
    assert(containsPath('foo/bar/baz', '/baz'));
    assert(containsPath('foo/bar/baz', 'bar/baz'));
    assert(containsPath('foo/bar/baz', 'baz'));
    assert(containsPath('foo/bar/baz.md', 'bar/baz.md'));
    assert(containsPath('foo/bar/baz.md', 'baz.md'));

    assert(containsPath('foo\\bar\\baz.md', 'bar/baz.md'));
    assert(containsPath('foo\\bar\\baz.md', 'bar\\baz.md'));
    assert(containsPath('foo\\bar\\baz.md', 'baz.md'));
    assert(!containsPath('foo\\bar\\baz.md', '.md'));
    assert(!containsPath('foo\\bar\\baz.md', 'md'));
    assert(!containsPath('foo\\bar\\baz.md', 'z.md'));
  });

  it('should be false when the path does not contain the string', function() {
    assert(!containsPath('foo\\bar\\baz.md', 'baz'));
  });

  it('should be false when the string is a "partial" match', function() {
    assert(!containsPath('foo\\bar\\bazqux', 'qux'));
    assert(!containsPath('foo\\bar\\baz.md', 'baz'));
    assert(!containsPath('foo\\bar\\baz.md', 'baz/'));
  });
});
