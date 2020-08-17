// type Unary<T = any> = (fn: (a: T, ...args: any[]) => any) => (a: T) => any

function first<T>([head, ...tail]: T[]): T {
  return head
}

/**
 * Wraps a function of any arity (including nullary) in a function that accepts exactly 1 parameter.
 * Any extraneous parameters will not be passed to the supplied function.
 */

export function unary<T extends (...args: readonly any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  return function one(...args) {
    return fn(first(args))
  }
}

const f = <T>(...args: T[]): T[] => args

const g = unary(f)

g(
  1,
  2, //
  3, //
  4, //
  'string' //
) //?
