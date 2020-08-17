import { identity } from './index';

describe('identity', () => {
  test('it returns exactly the provided value', () => {
    const numb = 1;
    const str = 'string';
    expect(identity(numb)).toBe(numb);
    expect(identity(str)).toBe(str);
    expect(identity(str, 'bar')).toBe(str);
  });

  test('it has a length of 1', () => {
    expect(identity.length).toBe(1);
  });
});
