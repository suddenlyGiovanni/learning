/* eslint-disable id-length, func-style */

// introduction

function sum(a: number, b: number): number {
  return a + b
}

console.log('Eager sum:\t', sum(10 + 5, 20))

type Lazy<T> = () => T
type Thunk<T> = () => T

function makeThunk<T>(x: T): Thunk<T> {
  return () => x
}

function lazySum(a: Lazy<number>, b: Lazy<number>): Lazy<number> {
  return () => {
    return a() + b()
  }
}

console.log('Lazy sum:\t', lazySum(makeThunk(10 + 5), makeThunk(20))())

console.log('\n=======================================\n')

// Avoiding big computation that are not needed

/** a fn that never completes */
function hang<T>(): T {
  return hang()
}

function first<T>(a: T, b: T): T {
  return a
}

function lazyFirst<T>(a: Lazy<T>, b: Lazy<T>): Lazy<T> {
  return a
}

console.log('Lazy First:\t', lazyFirst(makeThunk(10), () => hang<number>())())

function lazySecond<T>(a: Lazy<T>, b: Lazy<T>): Lazy<T> {
  return b
}

console.log('Lazy Second:\t', lazySecond(() => hang<number>(), makeThunk(10))())

// Short-circuit evaluation
function and(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return function (): boolean {
    return !a()
      ? false //
      : b() //
  }
}

function trace<T>(x: Lazy<T>, message: string): Lazy<T> {
  return function (): T {
    console.log(message)
    return x()
  }
}

console.log(
  'false && false === ',
  and(trace(makeThunk(false), 'L'), trace(makeThunk(false), 'R'))()
)
console.log(
  'true && false ===',
  and(trace(makeThunk(true), 'L'), trace(makeThunk(false), 'R'))()
)
console.log(
  'true && true ===',
  and(trace(makeThunk(true), 'L'), trace(makeThunk(true), 'R'))()
)
console.log(
  'false && true ===',
  and(trace(makeThunk(false), 'L'), trace(makeThunk(true), 'R'))()
)

console.log('\n-----------------\n')

function or(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return function (): boolean {
    return a()
      ? true //
      : b() //
  }
}

console.log(
  'false || false === ',
  or(trace(makeThunk(false), 'L'), trace(makeThunk(false), 'R'))()
)
console.log(
  'true || false ===',
  or(trace(makeThunk(true), 'L'), trace(makeThunk(false), 'R'))()
)
console.log(
  'true || true ===',
  or(trace(makeThunk(true), 'L'), trace(makeThunk(true), 'R'))()
)
console.log(
  'false || true ===',
  or(trace(makeThunk(false), 'L'), trace(makeThunk(true), 'R'))()
)

console.log('\n=======================================\n')

// Infinite Data structures

type LazyList<T> = Lazy<{
  head: Lazy<T>
  tail: LazyList<T>
} | null>

function toList<T>(xs: T[]): LazyList<T> {
  return function (): {
    head: Lazy<T>
    tail: LazyList<T>
  } | null {
    if (xs.length === 0) {
      return null
    }
    return {
      head: makeThunk(xs[0]),
      tail: toList(xs.slice(1)),
    }
  }
}

const lazyList = toList([1, 2, 3])()
console.log(lazyList)
console.log(lazyList)
console.log(lazyList?.head())
console.log(lazyList?.tail()?.head())
console.log(lazyList?.tail()?.tail()?.head())
console.log(lazyList?.tail()?.tail()?.tail())

function range(begin: Lazy<number>): LazyList<number> {
  return function (): {
    head: Lazy<number>
    tail: LazyList<number>
  } {
    const x = begin()
    return {
      head: () => x,
      tail: range(() => x + 1),
    }
  }
}

/*
 * Range of 3:
 * () => 3
 * () => (()=> 3)() + 1
 * () => (() => (()=> 3)() + 1)() 1
 */

console.log('----------')
console.log(range(() => 3)())
console.log(range(() => 3)()?.head())
console.log(range(makeThunk(3))()?.tail()?.head())
console.log(range(makeThunk(3))()?.tail()?.tail()?.head())

function printList<T>(xs: LazyList<T>): void {
  let pair = xs()
  while (pair !== null) {
    console.log(pair.head())
    pair = pair.tail()
  }
}

console.log('------')
printList(toList([1, 2, 3, 4, 5, 6])) // ?
console.log('------')
// PrintList(range(makeThunk(3))) // this is logging an infinite list of number starting from 3.

function take<T>(n: Lazy<number>, xs: LazyList<T>): LazyList<T> {
  return function () {
    const m = n()
    const pair = xs()
    if (m > 0) {
      return {
        head: pair.head,
        tail: take(() => m - 1, pair.tail),
      }
    }
    return null
  }
}

console.log('========')

printList(
  take(
    () => 10,
    range(() => 3)
  )
) // ?

function filter<T>(predicate: (x: T) => boolean, xs: LazyList<T>): LazyList<T> {
  return function () {
    const pair = xs()
    if (pair === null) {
      return null
    }
    const x = pair.head()
    if (predicate(x)) {
      return {
        head: makeThunk(x),
        tail: filter(predicate, pair.tail),
      }
    }
    return filter(predicate, pair.tail)()
  }
}

console.log('----')

printList(
  take(
    () => 10,
    filter(
      (x) => x % 2 === 0,
      range(() => 1)
    )
  )
)
