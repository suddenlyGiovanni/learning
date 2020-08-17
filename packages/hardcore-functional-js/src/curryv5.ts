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

/** Extract a propertyâ€™s type from an object */
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
type test46 = Length<restargs> // number. Woops rest parameters can be unlimited, TSâ€™s best guess is that the length of our tuple is a number

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
