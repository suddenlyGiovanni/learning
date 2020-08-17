import { isNull } from './index';

describe('isNull', () => {
  test('it is defined', () => {
    expect(isNull).toBeDefined();
  });

  test('if `undefined` is provided it will return false', () => {
    expect(isNull(undefined)).toBe(false);
  });

  test('if `null` is provided it will return true', () => {
    expect(isNull(null)).toBe(true);
  });

  test('if `boolean` is provided it will return false', () => {
    expect(isNull(true)).toBe(false);
  });

  test('if `string` is provided it will return false', () => {
    expect(isNull('string')).toBe(false);
  });

  test('if `number` is provided it will return false', () => {
    expect(isNull(12.54)).toBe(false);
  });

  test('if `object` is provided it will return false', () => {
    expect(isNull({})).toBe(false);
  });

  test('if `array` is provided it will return false', () => {
    expect(isNull([])).toBe(false);
  });

  test('if `function` is provided it will return false', () => {
    expect(isNull((): void => {})).toBe(false);
  });
});
