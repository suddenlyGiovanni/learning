type Fn<T> = (
  previousValue: T,
  currentValue: T,
  currentIndex?: number,
  array?: T[]
) => T

export function all<T>(fn: Fn<T>) {
  return function(...args: T[]): T {
    return args.reduce(fn)
  }
}

const add = all<number>((a, b) => a + b)
const subtract = all<number>((a, b) => a - b)
const multiply = all<number>((a, b) => a * b)
const divide = all<number>((a, b) => a / b)
const modulo = all<number>((a, b) => a % b)
const log = console.log

export const environment: { [MethodName: string]: any } = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  log,
  pi: Math.PI,
  max(...args: number[]): number {
    return Math.max(...args)
  },
}
