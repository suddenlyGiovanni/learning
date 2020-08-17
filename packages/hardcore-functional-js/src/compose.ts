import * as _ from 'ramda'
const flipBinaryFn = <T, U, R>(f: (arg0: T, arg1: U) => R) => (arg1: U, arg0: T): R => {
  // @ts-ignore
  return f(arg1, arg0)
}

const trace = <A>(tag: string) => (x: A): A => {
  console.log(tag, x)
  return x
}

const add = (x: number, y: number): number => x + y
const toUpper = (string: string): string => string.toUpperCase()
const exclaim = (string: string): string => string + '!'
const first = <T>(xs: T[]): T => xs[0]
const firstChr = (str: string): string => str[0]
export const concat = _.curry(flipBinaryFn((x: string, y: string): string => x + y))

type Fn<A, B> = (arg: A) => B

// f(x)
// g(x)
// g X f => g(f(x))

// f . g = f(g(x))
export const composeTwo = <A, B, C, F extends Fn<B, C>, G extends Fn<A, B>>(f: F, g: G) => (x: A): C =>
  f(g(x))

const shout = composeTwo(exclaim, toUpper)
const shoutFirst1 = composeTwo(firstChr, composeTwo(exclaim, toUpper))
const shoutFirst2 = composeTwo(composeTwo(firstChr, exclaim), toUpper)
const shoutFirst3 = _.compose(firstChr, exclaim, toUpper)
const shoutFirstChr = _.compose(exclaim, toUpper, firstChr)

// this works because compose is associative
console.log(shout('tears')) // TEARS!
console.log(shoutFirst1('tears')) // T
console.log(shoutFirst2('tears')) // T
console.log(shoutFirst3('tears')) //
console.log(shoutFirstChr('tears')) // T!

// pipe
// f pipe g = g . f = f(g(x))
const pipeTwo = <A, B, C, F extends Fn<A, B>, G extends Fn<B, C>>(f: F, g: G) => (x: A): C =>
  g(f(x))

const loudFirst = pipeTwo(first, toUpper)
const scream = pipeTwo(loudFirst, concat('!'))
console.log(scream('fear')) //?
