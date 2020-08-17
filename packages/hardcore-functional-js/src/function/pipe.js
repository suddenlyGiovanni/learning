/**
 * pipe :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 */
export const pipe = (...fns) => (...args) =>
  fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0]

/**
 * @param {string} message
 * @returns {<T>(x:T)=> T}
 */
const trace = message => x => (console.log(message, x), x)

/**
 * @param {number} x
 * @returns {(y: number)=> number}
 */
const add = x => y => x + y

/**
 * @param {number} multiplier
 * @returns {(multiplicand: number) => number}
 */
const multiply = multiplier => multiplicand => multiplier * multiplicand

/**
 * @param {number} divisor
 * @returns {(dividend: number) => number}
 */
const divide = divisor => dividend => dividend / divisor

/**
 * @param {number} divisor
 * @returns {(dividend: number) => number} remainder
 */
const remainder = divisor => dividend => dividend % divisor

const add3 = add(3)
const triple = multiply(3)
const half = divide(2)
const isEven = n => remainder(2)(n) === 0

// (a: number) -> boolean

const processNumber = pipe(
  trace('initial =>'),
  add3,
  trace('add3 =>'),
  triple,
  trace('triple =>'),
  half,
  trace('half =>'),
  isEven,
  trace('isEven =>'),
) //?

// initial => 1 ​​​​​add3 => 4 ​​​​​triple => 12 half => 6 ​​​​​isEven => true ​​​​​
console.log(processNumber(1)) // true

// initial => 2 ​​​​​add3 => 5 ​​​​​triple => 15 ​​​​​half => 7.5 ​​​​​ isEven => false ​​​​​
console.log(processNumber(2)) // false

// initial => 3 ​​​​​add3 => 6 ​​​​​triple => 18 ​​​​​half => 9 ​​​​​isEven => false ​​​​​
console.log(processNumber(3)) // false

// initial => 4 add3 => 7 triple => 21 ​​​​​half => 10.5 isEven => false ​​​​​
console.log(processNumber(4)) // false

//initial => 5 add3 => 8 triple => 24 half => 12 isEven => true ​​​​​
console.log(processNumber(5)) // true
