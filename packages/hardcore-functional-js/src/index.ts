import * as Ramda from 'ramda'
import { curryTwo, unCurryTwo, flip } from './curry'
type __ = typeof Ramda.__

type Curry1<A, R> = (a: A) => R
type Curry2<A, B, R> = {
  (a: A): Curry1<B, R>
  (a: A, b: B): R
}

type Curry3<A, B, C, R> = {
  (a: A): Curry2<B, C, R>
  (a: A, b: B): Curry1<C, R>
  (a: A, b: B, c: C): R
}

type Curry4<A, B, C, D, R> = {
  (a: A): Curry3<B, C, D, R>
  (a: A, b: B): Curry2<C, D, R>
  (a: A, b: B, c: C): Curry1<D, R>
  (a: A, b: B, c: C, d: D): R
}

type VariadicCurry<T, R> = T extends [any, any, any, any]
  ? Curry4<T[0], T[1], T[2], T[3], R>
  : T extends [any, any, any]
  ? Curry3<T[0], T[1], T[2], R>
  : T extends [any, any]
  ? Curry2<T[0], T[1], R>
  : T extends [any]
  ? Curry1<T[0], R>
  : unknown
declare function curry<T extends any[], R>(fn: (...args: T) => R): VariadicCurry<T, R>

export type CurriedTwoFunction<X, Y, R> = (x: X) => (y: Y) => R
function add(x: number, y: number): number {
  return x + y
}

function subtract(x: number, y: number): number {
  return x - y
}

export type BinaryFunction<A, B, R> = (a: A, b: B) => R
type UnaryFunction<A, R> = (a: A) => R
function toPair<X, Y, R>(f: BinaryFunction<X, Y, R>): UnaryFunction<[X, Y], R> {
  return ([x, y]) => f(x, y)
}

function formPair<X, Y, R>(f: UnaryFunction<[X, Y], R>): BinaryFunction<X, Y, R> {
  return (x, y) => f([x, y])
}

const _add = add(1, 2) //?
const addPair = toPair(add) //?
const addFormPair = formPair(addPair)
console.log(addPair([1, 2]))
console.log(addPair([1, 2]))
console.log(addFormPair(1, 2))

subtract(5, 4) //?
const flippedSubtraction = flip(subtract)
flippedSubtraction(5, 4) //?

const curriedAdd = curryTwo(add) //?
const increment = curriedAdd(1) //?
increment(2) //?

const unCurriedAdd = unCurryTwo(curriedAdd) //?
unCurriedAdd(1, 2) //?

function modulo(x: number, y: number): number {
  return x % y
}

const curriedModulo = curryTwo(flip(modulo))

const isEven = (x: number) => !curriedModulo(2)(x)
const isOdd = (x: number) => !isEven(x)
isEven(2) //?
isEven(3) //?
isOdd(13) //?
isOdd(2) //?

function filter<X>(f: (value: X, index?: number, array?: X[]) => boolean, xs: X[]): X[] {
  return xs.filter(f)
}

const curriedFilter = curryTwo(filter)
const getOdds = curriedFilter(isOdd)
getOdds([1, 2, 3, 4, 5, 6])

function replace(searchValue: string | RegExp, replaceValue: string, string: string) {
  return string.replace(searchValue, replaceValue)
}

type tuple = ['a', number, string[]]
const test04: tuple = ['a', 1, ['alpha', 'beta', 'gamma']]
const test05 = (...args: tuple) => true
const test06 = test05('a', 42, [])
const fn00 = (name: string, age: number, string: boolean) => true
type test07 = Parameters<typeof fn00> // [string, number, boolean]
type Params<F extends (...args: any[]) => any> = F extends (...args: infer P) => any ? P : never
type test08 = Params<typeof fn00> // [string, number, boolean]

/** Head takes a tuple type T and returns the first type that it contains.  */
type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never
type test09 = Head<[1, 2, string, number]> // 1
type test10 = Head<Params<typeof fn00>> // string

/**  Tail conveniently removes the first entry that a tuple might contain. */
type Tail<T extends any[]> = ((...t: T) => any) extends (_: any, ...tail: infer TT) => any ? TT : []
type test11 = Tail<[1, 2, string, number]> // [2, string, number]
type test12 = Tail<Params<typeof fn00>> // [number,  boolean]
type test13 = Tail<test12> // [boolean]

type HasTail<T extends any[]> = T extends [] | [any] ? false : true
type params = [1, 2, string]
type test14 = HasTail<params> // true
type test15 = HasTail<Tail<params>> // true
type test16 = HasTail<Tail<Tail<params>>> // false

/** Extract a property’s type from an object */
type ObjectInfer<O> = O extends { a: infer A }
  ? A // if true
  : never // if false

const object = { a: 'hello' }
type test17 = ObjectInfer<typeof object> // string
type test18 = ObjectInfer<string> // never

/** Extract inner types from function types */
type FunctionInfer<F> = F extends (...args: infer A) => infer R
  ? [A, R] // if true
  : never // if false

const fn01 = (a: number, b: any) => true

type test19 = FunctionInfer<typeof fn01>

/** Extract generic types from a class or an interface */
type ClassInfer<I> = I extends Promise<infer G> ? G : never
const promise = new Promise<string>(() => {})
type test20 = ClassInfer<typeof promise> // string

/** Extract types from an array */
type ArrayInfer<T> = T extends (infer U)[] ? U : never
const array = [0, 'data', 1, 'data']
type test21 = ArrayInfer<typeof array> // string | number

/** Extract types from a tuple */
type TupleInfer<T> = T extends [infer A, ...(infer B)[]] ? [A, B] : never

type test22 = TupleInfer<[string, number, boolean]> // [string, number | boolean] what???

const toCurry01 = (name: string, age: number, single: boolean) => true
const curried01 = (name: string) => (age: number) => (single: boolean) => true

/**
 * Our first curry type must take a tuple of parameters P and a return type R.
 * It is a recursive function type that varies with the length of P:
 */
type CurryV0<P extends any[], R> =
  // A 'classic curry' takes only a single argument at a time
  (
    arg0: Head<P>
  ) => HasTail<P> extends true // if we did not reach the end of the parameters, recurse
    ? CurryV0<Tail<P>, R> // otherwise, infer the return type of the curried function
    : R

declare function curryV0<P extends any[], R>(f: (...args: P) => R): CurryV0<P, R>

const toCurry02 = (name: string, age: number, single: boolean) => true
const curried02 = curryV0(toCurry02) //  CurryV0<[string, number, boolean], boolean>
const test23 = curried02('jane')(26)(true) // boolean

const curried03 = curryV0(toCurry02) // CurryV0<[string, number, boolean], boolean>
const curried04 = curried03('jane') // CurryV0<[number, boolean], boolean>
const curried05 = curried04(26) // CurryV0<[boolean], boolean>
const test24 = curried05(true) // boolean

// @ts-expect-error
const test25 = curried02('jane')('26')(true)

// Nice, but we forgot to handle the scenario where we pass a rest parameter:
// CurryV1
const toCurry06 = (name: string, age: number, ...nicknames: string[]) => true
const curried06 = curryV0(toCurry06) //  CurryV0<[string, number, ...string[]], boolean
// @ts-expect-error
const test26 = curried06('jane')(26)('JJ', 'Jini') // error `Expected 1 arguments, but got 2.`

type CurryV1<P extends any[], R> = (
  arg0: Head<P>,
  ...rest: Tail<Partial<P>>
) => HasTail<P> extends true
  ? CurryV1<Tail<P>, R> //
  : R //

declare function curryV1<P extends any[], R>(f: (...args: P) => R): CurryV1<P, R>

const toCurry07 = (name: string, age: number, ...nicknames: string[]) => true
const curried07 = curryV1(toCurry07) // CurryV1<[string, number, ...string[]], boolean>
const test27 = curried07('jane', 26, 'jj', 'jni') // should error

type CurryV2<P extends any[], R> = <T extends any[]>(
  ...args: T
) => HasTail<P> extends true
  ? CurryV2<Tail<T>, R> //
  : R //

// this is a broken type signature!

/**
 * Last
 * takes a tuple as a parameter and it extracts its last entry out
 */
type Last<T extends any[]> = {
  0: Last<Tail<T>>
  1: Head<T>
}[HasTail<T> extends true ? 0 : 1]

type test29 = Last<[1, 2, 3, 4]> // 4

/** Length */
type Length<T extends any[]> = T['length']

type test30 = Length<[]> // 0
type test31 = Length<[any, any]> // 2
type test32 = Length<[any, any, any]> // 3
type test33 = Length<['a', 1, null, string]> // 4

/**
 * Prepend
 * It adds a type E at the top of a tuple T
 */
type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends (...args: infer U) => any
  ? U
  : T

type test34 = Prepend<string, []> // [string]
type test35 = Prepend<number, [1, 2]> // [number, 1, 2]
type test351 = Prepend<0, [1, 2]> // [0, 1, 2]

type test36 = [any, any, any]
type test37 = Length<test36> // 3
type test38 = Length<Prepend<any, test36>> // 4

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

type test39 = Drop<2, [0, 1, 2, 3]> // [2, 3]
type test40 = Drop<Length<test39>, [0]> // []

type parameters = [string, number, boolean, string[]]
type consumed = [string, number]

type toConsume = Drop<Length<consumed>, parameters> // [boolean, string[]]
type CurryV3<P extends any[], R> = <T extends any[]>(
  ...args: T
) => // @ts-expect-error
Length<Drop<Length<T>, P>> extends 0
  ? R // @ts-expect-error
  : CurryV2<Drop<Length<T>, P>, R>

// WOOPS!!

/**
 * Cast
 *  requires TS to re-check a type X against a type Y, and type Y will only be enforced if it fails
 */
type Cast<X, Y> = X extends Y ? X : Y

type test41 = Cast<[string], any> // [string]
type test421 = Cast<[string], string[]> // [string]
type test42 = Cast<[string], number> // number

type CurryV4<P extends any[], R> = <T extends any[]>(
  ...args: Cast<T, Partial<P>>
) => // @ts-ignore
Length<Cast<Drop<Length<T>, P>, any[]>> extends 0
  ? R //
  : CurryV4<Cast<Drop<Length<T>, P>, any[]>, R> //

declare function curryV4<P extends any[], R>(f: (...args: P) => R): CurryV4<P, R>
const toCurry08 = (name: string, age: number, single: boolean) => true
const curried08 = curryV4(toCurry08) // CurryV4<[string, number, boolean], boolean>

const test43 = curried08('jane')(26)(true) // boolean
const test44 = curried08('jane', 26, true) // boolean
// @ts-expect-error
const test45 = curried08('jane', 26)(4000) // error: Argument of type '4000' is not assignable to parameter of type 'boolean'

type restargs = [string, number, boolean, ...string[]]
type test46 = Length<restargs> // number. Woops rest parameters can be unlimited, TS’s best guess is that the length of our tuple is a number

type CurryV5<P extends any[], R> = <T extends any[]>(
  ...args: Cast<T, Partial<P>>
) => Drop<Length<T>, P> extends [any, ...any[]] // @ts-ignore
  ? CurryV5<Cast<Drop<Length<T>, P>, any[]>, R>
  : R

declare function curryV5<P extends any[], R>(f: (...args: P) => R): CurryV5<P, R>
const toCurry09 = (name: string, age: number, single: boolean, ...nicknames: string[]) => true
const curried09 = curryV5(toCurry09) // CurryV5<[string, number, boolean, ...string[]], boolean>
const test47 = curried09('jane', 26)(true, 'jj', 'jini') // boolean
const test48 = curried09('jane')(26, true, 'jj', 'jini') // boolean
// @ts-expect-error
const test49 = curried09('jane')(26)(true, 'jj', 90000) // error: Argument of type '90000' is not assignable to parameter of type 'string'

/**
 * Pos (Position)
 * Use it to query the position of an iterator:
 */

type Pos<I extends any[]> = Length<I>

/**
 * Next (+1)
 * It brings the position of an iterator up
 */
type Next<I extends any[]> = Prepend<any, I>

/**
 * Prev (-1)
 * It brings the position of an iterator down
 */
type Prev<I extends any[]> = Tail<I>

type iterator = [any, any] // 2 items
type test50 = Pos<iterator> // 2
type test51 = Pos<Next<iterator>> // 3
type test52 = Pos<Prev<iterator>> // 1

/**
 * Iterator
 * It creates an `iterator` (our counter type) at a position defined by `Index` and is able to start
 * off from another iterator’s position by using `From`
 */
export type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
  0: Iterator<Index, Next<From>, Next<I>>
  1: From
}[Pos<I> extends Index ? 1 : 0]

type test53 = Iterator<2> // [any, any]
type test54 = Iterator<3, test53> // [any, any, any, any, any]
type test55 = Pos<test53> // 2
type test56 = Pos<test54> // 5

/**
 * Reverse
 * It takes a tuple T and turns it the other way around into a tuple R
 */
type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
  1: R
}[Pos<I> extends Length<T> ? 1 : 0]

type test57 = Reverse<[1, 2, 3]> // [3, 2, 1]
type test58 = Reverse<test57> // [1, 2, 3]
type test59 = Reverse<[2, 1], [3, 4]> // [1, 2, 3, 4]

/**
 * Concat
 * It simply takes a tuple T1 and merges it with another tuple T2
 */
type Concat<T1 extends any[], T2 extends any[]> =
  // @ts-ignore
  Reverse<Cast<Reverse<T1>, any[]>, T2>

type test60 = Concat<[1, 2], [3, 4]> // [1, 2, 3, 4]

/**
 * Append
 * add a type E at the end of a tuple T
 */
type Append<E, T extends any[]> = Concat<T, [E]>
type test61 = Append<3, [1, 2]> // [1, 2, 3]

// FIXME: error due to typescript prenventing infinite recursive types in version > 3.3

// /**
//  * GapOf
//  * It checks for a placeholder in a tuple T1 at the position described by an iterator I.
//  * If it is found, the matching type is collected at the same position in T2 and carried over (saved)
//  * for the next step through TN
//  */
// type GapOf<T1 extends any[], T2 extends any[], TN extends any[], I extends any[]> = T1[Pos<
//   I
// >] extends __
//   ? Append<T2[Pos<I>], TN>
//   : TN

// type test62 = GapOf<[__, __], [number, string], [], Iterator<0>> // [number]
// type test63 = GapOf<[__, __], [number, string], [], Iterator<1>> // [string]

// /**
//  * GapsOf
//  * calls GapOf over T1 & T2 and stores the results in TN. And when it�s done, it concat the
//  * results from TN to the parameter types that are left to be taken (for the next function call)
//  */
// type GapsOf<T1 extends any[], T2 extends any[], TN extends any[] = [], I extends any[] = []> = {
//   // @ts-ignore
//   0: GapsOf<T1, T2, Cast<GapsOf<T1, T2, TN, I>, any[]>, Next<I>>
//   // @ts-ignore
//   1: Concat<TN, Cast<Drop<Pos<I>, T2>, any[]>>
// }[Pos<I> extends Length<T1> ? 1 : 0]

// type test64 = GapsOf<[__, any, __], [number, string, object, string[]]> // [number, object, string[]]
// type test65 = GapsOf<[any, __, any], [number, string, object, string[]]> // [string, strings[]]
// type test656 = GapsOf<[__, __, __], [number, string, object, string[]]> // [] // should never happen

// type PartialGaps<T extends any[]> = {
//   [K in keyof T]?: T[K] | __
// }

// type test67 = PartialGaps<[number, string]> // [(number | Ramda.Placeholder)?, (string | Ramda.Placeholder)?]

// type CleanedGaps<T extends any[]> = {
//   [K in keyof T]: NonNullable<T[K]>
// }

// type Gaps<T extends any[]> = CleanedGaps<PartialGaps<T>>
// type test68 = Gaps<[number, string]> // [(number | Ramda.Placeholder)?, (string | Ramda.Placeholder)?]

// type CurryV6<P extends any[], R> = <T extends any[]>(
//   ...args: Cast<T, Gaps<P>>
// ) => GapsOf<T, P> extends [any, ...any[]]
//   ? //@ts-expect-error
//     CurryV6<Cast<GapsOf<T, P>, any[]>, R>
//   : R

// declare function curryV6<P extends any[], R>(f: (...args: P) => R): CurryV6<P, R>
// const toCurry10 = (name: 'jane', age: 26, single: true) => true
// const curried10 = curryV6(toCurry10)
// const test69 = curried10('jane')(26)(true) // boolean
