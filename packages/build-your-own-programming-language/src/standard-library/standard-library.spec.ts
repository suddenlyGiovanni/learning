import { environment } from './standard-library'

describe('StandardLibrary', () => {
  const a = 1,
    b = 2,
    c = 3,
    d = 4
  describe('all', () => {
    test.todo('happy path')
  })

  describe('add', () => {
    test('happy path', () => {
      expect.hasAssertions()

      expect(environment.add(a, b, c, d)).toBe(a + b + c + d)
    })
  })

  describe('subtract', () => {
    test('happy path', () => {
      expect.hasAssertions()

      expect(environment.subtract(d, c, b, a)).toBe(d - c - b - a)
    })
  })

  describe('multiply', () => {
    test('happy path', () => {
      expect.hasAssertions()
      expect(environment.multiply(a, b, c, d)).toBe(24)
    })
  })

  describe('divide', () => {
    test('happy path', () => {
      expect.hasAssertions()
      expect(environment.divide(d, a, b, c)).toBe(d / a / b / c)
    })
  })

  describe('modulo', () => {
    test('happy path', () => {
      expect.hasAssertions()
      expect(environment.modulo(d, c, b, a)).toBe(((d % c) % b) % a)
    })
  })

  describe('max', () => {
    test('happy path', () => {
      expect.hasAssertions()
      expect(environment.max(a, b, c, d)).toBe(d)
    })
  })

  describe('pi', () => {
    test('happy path', () => {
      expect.hasAssertions()
      expect(environment.pi).toBe(Math.PI)
    })
  })
})
