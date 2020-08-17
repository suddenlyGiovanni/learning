type AssertEqual<T, Expected> = T extends Expected ? (Expected extends T ? true : never) : never
type UnaryFn<A, B> = (a: A) => B
type BinaryFn<A, B, C> = (a: A, b: B) => C
type TernaryFn<A, B, C, D> = (a: A, b: B, c: C) => D

type QuaternaryFn<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E
type QuinaryFn<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F

type Curry2 = <A, B, C>(f: BinaryFn<A, B, C>) => Curried2<A, B, C>
type Curried2<A, B, C> = (a: A) => (b: B) => C

/**
 * Curries the given binary function.
 *
 * curry2 :: ((a, b) -> c) -> a -> b -> c
 */
export const curry2: Curry2 = fn => a => b => fn(a, b)

// curry2 tests:
const add2 = (a: number, b: number): number => a + b
const curriedAdd2 = curry2(add2)
const testCurry2: AssertEqual<typeof curriedAdd2, (a: number) => (b: number) => number> = true // pass!

type UnCurry2 = <A, B, C>(f: Curried2<A, B, C>) => BinaryFn<A, B, C>

/**
 * Un-Curries the given Curried2 function.
 *
 * unCurry2 :: (a -> b -> c) -> (a, b) -> c
 * @example
 * ```typescript
 *  const curriedAdd = (x: number) => (y: number): number => x + y
 *  const add = unCurry2(curriedAdd)
 *  console.log(add(1, 2)) // 3
 * ```
 */
export const unCurry2: UnCurry2 = f => (a, b) => f(a)(b)

type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D
type Curry3 = <A, B, C, D>(f: TernaryFn<A, B, C, D>) => Curried3<A, B, C, D>

/**
 * Curries the given ternary function.
 *
 * curry3 :: ((a, b, c) -> d) -> a -> b -> c -> d
 */
export const curry3: Curry3 = fn => a => b => c => fn(a, b, c)

type UnCurry3 = <A, B, C, D>(f: Curried3<A, B, C, D>) => TernaryFn<A, B, C, D>

/**
 * Un-Curries the given Curried3 function.
 *
 * unCurry3 :: (a -> b -> c -> d) -> (a, b, c) -> d
 * @example
 * ```typescript
 *  const curriedAdd = (x: number) => (y: number) => (z: number): number => x + y + z
 *  const add = unCurry3(curriedAdd)
 *  console.log(add(1, 2, 3)) // 6
 * ```
 */
export const unCurry3: UnCurry3 = f => (a, b, c) => f(a)(b)(c)

type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E
type Curry4 = <A, B, C, D, E>(f: QuaternaryFn<A, B, C, D, E>) => Curried4<A, B, C, D, E>

/**
 * Curries the given quaternary function.
 *
 * curry4 :: ((a, b, c, d) -> e) -> a -> b -> c -> d -> e
 */
export const curry4: Curry4 = fn => a => b => c => d => fn(a, b, c, d)

type UnCurry4 = <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => QuaternaryFn<A, B, C, D, E>

/**
 * Un-Curries the given Curried4 function.
 *
 * unCurry4 :: (a -> b -> c -> d -> e) -> (a, b, c, d) -> e
 * @example
 * ```typescript
 *  const curriedAdd = (a: number) => (b: number) => (c: number) (d: number): number =>
 *      a + b + c + d
 *  const add = unCurry4(curriedAdd)
 *  console.log(add(1, 2, 3, 4)) // 10
 * ```
 */
export const unCurry4: UnCurry4 = f => (a, b, c, d) => f(a)(b)(c)(d)

type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F
type Curry5 = <A, B, C, D, E, F>(f: QuinaryFn<A, B, C, D, E, F>) => Curried5<A, B, C, D, E, F>

/**
 * Curries the given quinary function.
 *
 * curry5 :: ((a, b, c, d, e) -> f) -> a -> b -> c -> d -> e -> f
 */
export const curry5: Curry5 = fn => a => b => c => d => e => fn(a, b, c, d, e)

type UnCurry5 = <A, B, C, D, E, F>(f: Curried5<A, B, C, D, E, F>) => QuinaryFn<A, B, C, D, E, F>

/**
 * Un-Curries the given Curried5 function.
 *
 * unCurry5 :: (a -> b -> c -> d -> e -> f) -> (a, b, c, d, e) -> f
 * @example
 * ```typescript
 *  const curriedAdd = (a: number) => (b: number) => (c: number) =>(d: number) => (e: number) =>
 *      a + b + c + d + e
 *  const add = unCurry5(curriedAdd)
 *  console.log(add(1, 2, 3, 4, 5)) // 15
 * ```
 */
export const unCurry5: UnCurry5 = f => (a, b, c, d, e) => f(a)(b)(c)(d)(e)
