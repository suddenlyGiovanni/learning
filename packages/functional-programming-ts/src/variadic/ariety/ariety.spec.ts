import { ariety } from './index'

const obj = {}
const unary = (x: any) => x
const binary = (x: any, y: any) => ({ x, y })
const nAry = (x: any, y: any, z: any) => ({ x, y, z })

describe('ariety', () => {
  test('it accepts only fns', () => {
    expect(ariety(obj)).toThrow()
  })

  test('if a `unary fn` is provided, it should return 1', () => {
    expect(ariety(unary)).toBe(1)
  })

  test('if a `binary fn` is provided, it should return 2', () => {
    expect(ariety(binary)).toBe(2)
  })

  test('if a `nAry fn of 3` is provided, it should return 3', () => {
    expect(ariety(nAry)).toBe(3)
  })
})
