// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

export function reverseInt(n: number): number {
  const reverse = (str: string): string =>
    str
      .split('')
      .reverse()
      .join('')

  if (n === 0) return n
  if (n > 0) {
    n //?
    const str = n.toString() //?
    if (str.length <= 1) return n //?
    return Number(reverse(str)) //?
  }
  // there is a - in front of the n
  n //?
  const intStr = n.toString().substring(1) //?
  if (intStr.length <= 1) return n //?
  return Number('-' + reverse(intStr)) //?
}

function reverseInt2(n: number): number {
  const reversedN = parseInt(
    n
      .toString()
      .split('')
      .reverse()
      .join('')
  ) //?
  // return n >= 0 ? reversedN : reversedN * -1

  // or even a more elegant solution:
  return reversedN * Math.sign(n)
}

export default reverseInt2
