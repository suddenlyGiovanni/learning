import { Fn, Functor, identity } from './functor'
import * as _ from 'ramda'

const first = <T>(xs: T[]): T => xs[0]

const halfTheFirstLargeNumber_ = (xs: number[]): string => {
  const found = xs.filter(x => x >= 20)
  const answer = first(found) / 2
  return `The answer is ${answer}`
}
const res_ = halfTheFirstLargeNumber_([1, 4, 50])
console.log(res_)

const halfTheFirstLargeNumber = (xs: number[]): string =>
  Functor.of(xs)
    .map(_.filter((x: number) => x >= 20))
    .map(first)
    .map(x => x / 2)
    .fold(x => `The answer is ${x}`)

const res = halfTheFirstLargeNumber([1, 4, 50])
console.log(res)

// we can also define compose with a functor

const compose = <A, B, C, F extends Fn<B, C>, G extends Fn<A, B>>(f: F, g: G): ((a: A) => C) => x =>
  Functor.of<A>(x).map(g).fold(f)

const testCompose = compose(
  first, //
  xs => xs.filter(x => x >= 20)
)([1, 4, 50]) //?
