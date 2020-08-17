import { isNaN } from './index';

const testNaN = 0 / 0;

describe('isNaN', () => {
  test('is defined', () => {
    expect(isNaN).toBeDefined();
  });

  test('if `undefined` is passed in it should returns false', () => {
    expect(isNaN(undefined)).toBe(false);
  });

  test('if `NaN` is passed in it should return true', () => {
    expect(isNaN(NaN)).toBe(true);
  });

  test('if a known NaN value is passed in it should return true', () => {
    expect(isNaN(testNaN)).toBe(true);
  });

  test('if `number` is passed in it should returns false', () => {
    expect(isNaN(14.74)).toBe(false);
  });
});
