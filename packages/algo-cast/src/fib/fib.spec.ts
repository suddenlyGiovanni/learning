import { tailRecursiveFib, recursiveFib } from './index'

describe('fibonacci', () => {
  test('Fib function is defined', () => {
    expect(typeof tailRecursiveFib).toEqual('function')
    expect(typeof recursiveFib).toEqual('function')
  })

  test('calculates correct fib value for 1', () => {
    expect(tailRecursiveFib(1)).toEqual(1)
    expect(recursiveFib(1)).toEqual(1)
  })

  test('calculates correct fib value for 2', () => {
    expect(tailRecursiveFib(2)).toEqual(1)
    expect(recursiveFib(2)).toEqual(1)
  })

  test('calculates correct fib value for 3', () => {
    expect(tailRecursiveFib(3)).toEqual(2)
    expect(recursiveFib(3)).toEqual(2)
  })

  test('calculates correct fib value for 4', () => {
    expect(tailRecursiveFib(4)).toEqual(3)
    expect(recursiveFib(4)).toEqual(3)
  })

  test('calculates correct fib value for 39', () => {
    expect(recursiveFib(39)/*?.$*/).toEqual(63245986)
    expect(tailRecursiveFib(39)/*?.$*/).toEqual(63245986)
  })
})
