import { isUndefined } from './index';

describe('isUndefined', () => {
  test('IT is defined', () => {
    expect(isUndefined).toBeDefined();
  });

  test('if `undefined` is passed in IT should return `true`', () => {
    expect(isUndefined(undefined)).toBe(true);
  });
});
