'use strict';

var parse = require('../src/parse');

describe('parse', function() {
  it('can parse an integer', function() {
    var fn = parse('42');
    expect(fn).toBeDefined();
    expect(fn()).toBe(42);
  });

  it('can parse a floating point number', function() {
    var fn = parse('4.2');
    expect(fn()).toBe(4.2);
  });

  it('can parse a floating point number without an integer part', function() {
    var fn = parse('.42');
    expect(fn()).toBe(0.42);
  });

  it('can parse a string in single quotes', function() {
    var fn = parse("'abc'");
    expect(fn()).toEqual('abc');
  });

  it('can parse a string in double quotes', function() {
    var fn = parse('"abc"');
    expect(fn()).toEqual('abc');
  });

  it('can parse null', function() {
    var fn = parse('null');
    expect(fn()).toBe(null);
  });

  it('can parse true', function() {
    var fn = parse('true');
    expect(fn()).toBe(true);
  });

  it('can parse false', function() {
    var fn = parse('false');
    expect(fn()).toBe(false);
  });

  it('ignores whitespace', function() {
    var fn = parse(' \n42 ');
    expect(fn()).toBe(42);
  });

  it('can parse an empty array', function() {
    var fn = parse('[]');
    expect(fn()).toEqual([]);
  });

  it('can parse a non-empty array', function() {
    var fn = parse('[1, "two", [3], true]');
    expect(fn()).toEqual([1, 'two', [3], true]);
  });

});