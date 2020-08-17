import * as _ from 'ramda'
import { formatMoney } from 'accounting-js'

// Setup
//==============

const prop = _.curry(
  <P extends keyof T | string, T extends {}>(
    propertyName: P,
    object: T
  ): P extends keyof T ? T[P] : undefined => {
    //@ts-ignore
    return object[propertyName]
  }
)
const disneyCharactersDictianary = { pluto: 'dog', minni: 'mouse' }
const testProp01 = prop('minni', disneyCharactersDictianary) // 'mouse'
const testProp02 = prop('pluto')(disneyCharactersDictianary) // 'dog'
const testProp03 = prop('miki')(disneyCharactersDictianary) // undefined
type Car = { name: string; horsepower: number; dollar_value: number; in_stock: boolean }

// Example Data
const CARS: Car[] = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false },
]

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.

const isLastInStock = (cars: Car[]) => {
  var reversed_cars = _.last(cars)
  return _.prop('in_stock', reversed_cars)
}

const _isLastInStock = _.compose(_.prop('in_stock'), _.last) //?

test('Ex1: isLastInStock', () => {
  expect(_isLastInStock(CARS)).toBe(false)
})

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car

const nameOfFirstCar = _.compose(_.prop('name'), _.head)

test('Ex2: nameOfFirstCar', () => {
  expect(nameOfFirstCar(CARS)).toBe('Ferrari FF')
})

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

const _average = function <T extends number>(xs: T[]): number {
  return _.reduce(_.add, 0, xs) / xs.length
} // <- leave be

const averageDollarValue_ = function (cars: Car[]): number {
  const dollar_values = _.map(_.prop('dollar_value'), cars)
  return _average(dollar_values)
}

//  number <- number[] <- Cars[]
const averageDollarValue = _.compose(_average, _.map(_.prop('dollar_value')))

test('Ex3: averageDollarValue', () => {
  expect(averageDollarValue(CARS)).toBe(790700)
})

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names: e.g: sanitizeNames(["Hello World"]) //=> ["hello_world"].

const _underscore = _.replace(/\W+/g, '_') //<-- leave this alone and use to sanitize

//  sanitizedName[] <- name[] <- Car[]
const sanitizeNames = _.map(_.compose(_underscore, _.toLower, _.prop('name')))

test('Ex4: sanitizeNames', () => {
  expect(sanitizeNames(CARS)).toEqual([
    'ferrari_ff',
    'spyker_c12_zagato',
    'jaguar_xkr_s',
    'audi_r8',
    'aston_martin_one_77',
    'pagani_huayra',
  ])
})

// Bonus 1:
// ============
// Refactor availablePrices with compose.

const availablePrices_ = function (cars: Car[]) {
  const available_cars = _.filter(_.prop('in_stock'), cars)
  return available_cars.map(x => formatMoney(x.dollar_value)).join(', ')
}

const available_cars = _.filter(_.prop('in_stock'))(CARS) //?

const formatCurrency = _.compose(formatMoney, _.prop('dollar_value'))
// string <- string[] <- Car[] <- Car[]
const availablePrices = _.compose(_.join(', '), _.map(formatCurrency), _.filter(_.prop('in_stock')))

test('Bonus 1: availablePrices', () => {
  expect(availablePrices(CARS)).toBe('$700,000.00, $1,850,000.00')
})

// Bonus 2:
// ============
// Refactor to pointfree.

const fastestCar_ = function (cars: Car[]): string {
  const sorted = _.sortBy(car => car.horsepower, cars)
  const fastest = _.last(sorted)
  return fastest.name + ' is the fastest'
}

const append = _.flip(_.concat)
// sort , pick , concat
const fastestCar = _.compose(
  append(' is the fastest'), //
  _.prop('name'),
  _.last,
  _.sortBy(_.prop('horsepower'))
)

test('Bonus 2: fastestCar', () => {
  expect(fastestCar(CARS)).toBe('Aston Martin One-77 is the fastest')
})
