import { BinaryFunction, CurriedTwoFunction } from './index'
import { curry } from 'ramda'

export function flip<X, Y, R>(f: BinaryFunction<X, Y, R>): BinaryFunction<Y, X, R> {
  return (y, x) => f(x, y)
}
export function curryTwo<X, Y, R>(f: BinaryFunction<X, Y, R>): CurriedTwoFunction<X, Y, R> {
  return x => y => f(x, y)
}
export function unCurryTwo<X, Y, R>(f: CurriedTwoFunction<X, Y, R>): BinaryFunction<X, Y, R> {
  return (x, y) => f(x)(y)
}

const add = (x: number, y: number): number => x + y
const curriedAdd = curryTwo(add)
const testAdd = curriedAdd(2)(-4) // -2

const modulo = <T extends number = number>(x: T, y: T): number => x % y
const curriedModulo = curry(flip(modulo))
const testModulo = curriedModulo(3)(4) //?

const isOdd = (x: number): boolean => Boolean(curriedModulo(2)(x))

const testIsOdd = isOdd(1) //?

const filter = <T, F extends (value: T, index: number, array: T[]) => unknown>(
  f: F,
  xs: T[]
): T[] => xs.filter(f)
const curriedFilter = curry(filter)

const getOdds = curriedFilter(isOdd)
const testGetOdds = getOdds([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) //?

const _replace = (regex: RegExp, replacement: string, str: string): string => {
  return str.replace(regex, replacement)
}

const replace = curry(_replace)

const replaceVowels = replace(/[AEIOU]/gi, '!')

const result = replaceVowels('Hey I have words')

console.log(result)
