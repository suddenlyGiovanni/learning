import { truthy } from './index';

describe('truthy', () => {
  test('if argument === `false` => `false`', () => {
    expect(truthy(false)).toBe(false);
  });

  test('if argument === `undefined` => `false`', () => {
    expect(truthy(undefined)).toBe(false);
  });

  test('if argument === `0` => `true`', () => {
    expect(truthy(0)).toBe(true);
  });

  test('if argument === `empty string` => `true`', () => {
    expect(truthy('')).toBe(true);
  });
});
