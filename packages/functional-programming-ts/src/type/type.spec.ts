import { type } from './index';

const STRING = 'string';
const NUMBER = 'number';
const BOOLEAN = 'boolean';
const UNDEFINED = 'undefined';
const NULL = 'null';
const SYMBOL = 'symbol';
const ARRAY = 'array';
const FUNCTION = 'function';
const OBJECT = 'object';
const REG_EXP = 'regexp';
const DATE = 'date';
const SET = 'set';
const MAP = 'map';
const WEAK_SET = 'weakset';
const WEAK_MAP = 'weakmap';

describe('type', () => {
  test('IT is defined', () => {
    expect(type).toBeDefined();
  });

  test('if a `string` is passed in IT should return `string`', () => {
    expect(type('')).toBe(STRING); // "string"
    expect(type('hello')).toBe(STRING); // "string"
    expect(type(String('hello'))).toBe(STRING); // "string"
    // tslint:disable-next-line:no-construct
    expect(type(new String('hello'))).toBe(STRING); // "string"
  });

  test('if a `number` is passed in  IT should return `number`', () => {
    expect(type(0)).toBe(NUMBER); // "number"
    expect(type(-0)).toBe(NUMBER); // "number"
    expect(type(0xff)).toBe(NUMBER); // "number"
    expect(type(-3.142)).toBe(NUMBER); // "number"
    expect(type(Infinity)).toBe(NUMBER); // "number"
    expect(type(-Infinity)).toBe(NUMBER); // "number"
    expect(type(NaN)).toBe(NUMBER); // "number"
    expect(type(Number(53))).toBe(NUMBER); // "number"
    // tslint:disable-next-line:no-construct
    expect(type(new Number(53))).toBe(NUMBER); // "number"
  });

  test('if a `boolean` is passed in  IT should return `boolean`', () => {
    expect(type(true)).toBe(BOOLEAN); // "boolean"
    expect(type(false)).toBe(BOOLEAN); // "boolean"
    // tslint:disable-next-line:no-construct
    expect(type(new Boolean(true))).toBe(BOOLEAN); // "boolean"
  });

  test('if an `undefined` value is passed in IT should return `undefined`', () => {
    expect(type(undefined)).toBe(UNDEFINED); // "undefined"
  });

  test('if an `null` value is passed in IT should return `null`', () => {
    expect(type(null)).toBe(NULL); // "null"
  });

  test('if a `symbol` value is passed in IT should return `symbol`', () => {
    expect(type(Symbol())).toBe(SYMBOL); // "symbol"
    expect(type(Symbol.species)).toBe(SYMBOL); // "symbol"
  });

  test('if a `array` value is passed in IT should return `array`', () => {
    expect(type([])).toBe(ARRAY); // "array"
    expect(type(Array(5))).toBe(ARRAY); // "array"
  });

  test('if a `function` value is passed in IT should return `function`', () => {
    expect(
      (function() {
        return type(arguments);
      })()
    ).toBe('arguments'); // "arguments"
    expect(type(function() {})).toBe(FUNCTION); // "function"
    expect(type(new Function())).toBe(FUNCTION); // "function"
  });

  test('if a `class` value is passed in IT should return `function`', () => {
    expect(type(class {})).toBe(FUNCTION); // "function"
  });

  test('if an `object` value is passed in IT should return `object`', () => {
    expect(type({})).toBe(OBJECT); // "object"
    expect(type(new Object())).toBe(OBJECT); // "object"
  });

  test('if a `regexp` value is passed in IT should return `regexp`', () => {
    expect(type(/^(.+)$/)).toBe(REG_EXP); // "regexp"
    expect(type(new RegExp('^(.+)$'))).toBe(REG_EXP); // "regexp"
  });

  test('if a `date` object is passed in IT should return `date`', () => {
    expect(type(new Date())).toBe(DATE); // "date"
  });

  test('if a `set` object is passed in IT should return `set`', () => {
    expect(type(new Set())).toBe(SET); // "set"
  });

  test('if a `map` object is passed in IT should return `map`', () => {
    expect(type(new Map())).toBe(MAP); // "map"
  });

  test('if a `WeakSet` object is passed in IT should return `weakset`', () => {
    expect(type(new WeakSet())).toBe(WEAK_SET); // "weakset"
  });

  test('if a `WeakMap` object is passed in IT should return `weakmap`', () => {
    expect(type(new WeakMap())).toBe(WEAK_MAP); // "weakmap"
  });
});
