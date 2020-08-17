import * as _ from 'ramda'
import S from 'sanctuary'

const _split = (delimiter: string | RegExp, string: string): string[] => string.split(delimiter)
const split = _.curry(_split)

// Exercise 1
//==============
const words = split(/\s/)

test('Ex1: split', () => {
  expect(words('Jingle bells Batman smells')).toEqual(['Jingle', 'bells', 'Batman', 'smells'])
  // sanctuary impl
  expect(S.words('Jingle bells Batman smells')).toEqual(['Jingle', 'bells', 'Batman', 'smells'])
})

// Exercise 1a
//==============
//use map to make a new words fn that not only works on 1 string, but on an array of strings.
const sentences = _.map(words)

test('Ex1a: map/split', () => {
  expect(sentences(['Jingle bells Batman smells', 'Robin laid an egg'])).toStrictEqual([
    ['Jingle', 'bells', 'Batman', 'smells'],
    ['Robin', 'laid', 'an', 'egg'],
  ])
})

// Exercise 2
//==============
const filterQs = _.filter(_.test(/q/gi))

test('Ex2: filter', () => {
  expect(filterQs(['quick', 'camels', 'quarry', 'over', 'quails'])).toStrictEqual([
    'quick',
    'quarry',
    'quails',
  ])
})

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max

const _keepHighest = (x: number, y: number): number => (x >= y ? x : y) // <- leave be

// TODO: rewrite max in its "simplest" form
//  f:: number[] -> number
const max = _.reduce(_keepHighest, 0)

test('Ex3: max', () => {
  expect(max([323, 523, 554, 123, 5234])).toEqual(5234)
})

// Bonus 1:
// ============
// wrap array's built in slice to be functional and curried like ramda fn's.
// //[1,2,3].slice(0, 2)

//  slice(start?: number, end?: number)
const slice = _.curry(<T>(start: number, end: number, xs: T[]): T[] => xs.slice(start, end))

test('Bonus 1', () => {
  expect(slice(1)(3)(['a', 'b', 'c'])).toStrictEqual(['b', 'c'])
})

// Bonus 2:
// ============
// use slice to define a function take() that takes n elements from an array. make it curried
const take = slice(0)

test('Bonus 2', () => {
  expect(take(2)(['a', 'b', 'c'])).toEqual(['a', 'b'])
})
