import { isBoolean } from './index';

// tslint:disable-next-line:no-construct
const booleanWrapperObject = new Boolean(true);

describe('isBoolean', () => {
  test('it returns either `true` or `false`', () => {
    expect(isBoolean('string')).toBe(false);
  });

  describe('if a boolean is passed in it returns true, despite the specific boolean value', () => {
    test('if true => true', () => {
      expect(isBoolean(true)).toBe(true);
    });

    test('if false => true', () => {
      expect(isBoolean(false)).toBe(true);
    });
  });

  test('object => false', () => {
    expect(isBoolean({})).toBe(false);
  });

  test('Boolean obj wrapper => true', () => {
    expect(isBoolean(booleanWrapperObject)).toBe(false);
  });

  test('array => false', () => {
    expect(isBoolean([])).toBe(false);
  });

  test('string => false', () => {
    expect(isBoolean('string')).toBe(false);
  });

  test('fn => false', () => {
    // tslint:disable-next-line:only-arrow-functions ter-prefer-arrow-callback
    expect(isBoolean(function() {})).toBe(false);
  });

  test('undefined => false', () => {
    expect(isBoolean(undefined)).toBe(false);
  });

  test('null => false', () => {
    expect(isBoolean(null)).toBe(false);
  });

  test('NaN => false', () => {
    expect(isBoolean(NaN)).toBe(false);
  });
});
