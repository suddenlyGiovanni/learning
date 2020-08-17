import * as _ from 'ramda'
import { Functor, identity, Fn } from '../functor/functor'

class Box<T> extends Functor<T> {
  protected constructor(x: T) {
    super(x)
    this.x = x
  }

  public chain<B>(f: Fn<T, B>): B {
    return f(this.x)
  }
  public static of<U>(x:U): Box<U>{
    return new Box(x)
  }
}

// Exercise: Box
// Goal: Refactor each example using Box
// Keep these tests passing!
// Bonus points: no curly braces

// Ex1: Using Box, refactor moneyToFloat to be unnested.
// =========================
const moneyToFloat_ = (str: string): number => parseFloat(str.replace(/\$/, ''))
const moneyToFloat = (str: string): number =>
  Functor.of(str).map(_.replace(/\$/, '')).fold(parseFloat) //?

test('Ex1: moneyToFloat', () => {
  // reference
  expect(moneyToFloat_('$5.00')).toBe(5)
  // impl
  expect(moneyToFloat('$5.00')).toBe(5)
})

// Ex2: Using Box, refactor percentToFloat to remove assignment
// =========================
const percentToFloat_ = (str: string): number => {
  const float = parseFloat(str.replace(/\%/, ''))
  return float * 0.01
}

const percentToFloat = (str: string): number =>
  Functor.of(str) //
    .map(_.replace(/\%/, ''))
    .map(parseFloat)
    .fold(_.multiply(0.01))

test('Ex2: percentToFloat', () => {
  // reference
  expect(percentToFloat_('20%')).toBe(0.2)
  // impl
  expect(percentToFloat('20%')).toBe(0.2)
})

// Ex3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
// =========================
const applyDiscount_ = (price: string, discount: string): number => {
  const cents = moneyToFloat(price)
  const savings = percentToFloat_(discount)
  return cents - cents * savings
}

const applyDiscount = (price: string, discount: string): number => {
  return Box.of(moneyToFloat(price))
    .chain(
      _cents =>
        Box.of(percentToFloat(discount))
          .map(_discount => _cents - _cents * _discount)
    )
    .fold(identity)
}

test('Ex3: Apply discount', () => {
  // reference
  expect(applyDiscount_('$5.00', '20%')).toBe(4)
  // impl
  expect(applyDiscount('$5.00', '20%')).toBe(4)
})
