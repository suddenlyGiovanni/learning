// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'elppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

export function reverseWithRecursion(str: string): string {
  const head = str.charAt(0)
  const tail = str.substring(1)
  return str === ''
    ? '' //
    : reverseWithRecursion(tail) + head //?
}

export const reverseWithRecursionShort = (str: string): string =>
  str === '' ? '' : reverseWithRecursion(str.substring(1)) + str.charAt(0)

export function reverseWithReduce(str: string): string {
  /** solution with reverseRight */
  // return str
  //   .split('')
  //   .reduceRight((rev: string, chr: string): string => rev + chr, '')

  /** solution with reverse left */
  return str
    .split('')
    .reduce((rev: string, chr: string): string => chr + rev, '')
}

export function reverseWithLoop(str: string): string {
  let reversed = ''

  /** using a simple string to construct the reveres string */

  /** while looping backward */
  // for (let index = str.length - 1; index >= 0; index--) {
  //   const chr = str[index]
  //   reversed = reversed + chr
  // }

  /** same thing but looping forward */
  for (const chr of str) {
    reversed = chr + reversed
  }
  return reversed

  /** using an array to store the char series */

  //  let array: string[] = []

  /** looping backwards */
  // for (let index = str.length - 1; index >= 0; index--) {
  //   const chr = str[index]
  //   array.push(chr)
  // }

  /** looping forward and using array.unshift unshift */
  // for (const chr of str) {
  //   array.unshift(chr)
  // }
  // return array.join('')
}

export function reverseWithArray(str: string): string {
  return str
    .split('')
    .reverse()
    .join('')
}

export default reverseWithRecursionShort
