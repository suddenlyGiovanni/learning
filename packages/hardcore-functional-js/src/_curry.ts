/**
 * Prepend
 * It adds a type E at the top of a tuple T
 */
type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends (...args: infer U) => any
  ? U
  : T

/**  Tail conveniently removes the first entry that a tuple might contain. */
type Tail<T extends any[]> = ((...t: T) => any) extends (_: any, ...tail: infer TT) => any ? TT : []

/**
 * Drop
 * It takes a tuple T and drops the first N entries.
 * The Drop type will recurse until Length<;I> matches the value of N that we passed.
 * In other words, the type of index 0 is chosen by the conditional accessor until that condition
 * is met.
 * And we used Prepend<any, I> so that we can increase a counter like we would do in a loop.
 * Thus, Length<I> is used as a recursion counter, and it is a way to freely iterate with TS.
 */
type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>
  1: T
}[Length<I> extends N ? 1 : 0]

/**
 * Cast
 *  requires TS to re-check a type X against a type Y, and type Y will only be enforced if it fails
 */
type Cast<X, Y> = X extends Y ? X : Y

/** Length */
type Length<T extends any[]> = T['length']

type Curry<P extends any[], R> = <T extends any[]>(
  ...args: Cast<T, Partial<P>>
) => Drop<Length<T>, P> extends [any, ...any[]] // @ts-ignore
  ? Curry<Cast<Drop<Length<T>, P>, any[]>, R>
  : R

declare function curry<P extends any[], R>(f: (...args: P) => R): Curry<P, R>

const toCurry = (name: string, age: number, single: boolean, ...nicknames: string[]) => true
const curried = curry(toCurry09) // Curry<[string, number, boolean, ...string[]], boolean>
const test01 = curried('jane', 26)(true, 'jj', 'jini') // boolean
const test02 = curried('jane')(26, true, 'jj', 'jini') // boolean
// @ts-expect-error
const test03 = curried('jane')(26)(true, 'jj', 90000) // error: Argument of type '90000' is not assignable to parameter of type 'string'
