import { isBoolean } from '../is-boolean';
import { isArray } from './index';

describe('isArray', () => {
  test('it returns a boolean', () => {
    expect(isBoolean(isArray(null))).toBe(true);
  });

  test('if an `object` is passed in IT should return `false`', () => {
    expect(isArray({})).toBe(false);
  });

  test('if an `array` is passed in IT should return `true`', () => {
    expect(isArray(Array(1))).toBe(true);
  });
});
