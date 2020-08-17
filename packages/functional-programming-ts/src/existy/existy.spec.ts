import { existy } from './index';

describe('existy', () => {
  it('if argument === `null` => false', () => {
    expect(existy(null)).toBe(false);
  });

  it('if argument === `undefined` => false', () => {
    expect(existy(undefined)).toBe(false);
  });

  it('if argument === `undefined object property` => false', () => {
    expect(existy({}.notHere)).toBe(false);
  });

  it('if argument === `a void function` => false', () => {
    expect(existy((() => {})())).toBe(false);
  });

  it('if argument === 0 => true', () => {
    expect(existy(0)).toBe(true);
  });

  it('if argument === 1 => true', () => {
    expect(existy(1)).toBe(true);
  });

  it('if argument === NaN => true', () => {
    expect(existy(NaN)).toBe(true);
  });

  it('if argument === `false` => true', () => {
    expect(existy(false)).toBe(true);
  });
});
