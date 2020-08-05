// --- Directions
// Write a program that console logs the numbers
// from 1 to n. But for multiples of three print
// “fizz” instead of the number and for the multiples
// of five print “buzz”. For numbers which are multiples
// of both three and five print “fizzbuzz”.
// --- Example
//   fizzBuzz(5);
//   1
//   2
//   fizz
//   4
//   buzz

export default function fizzBuzz(n: number): void {
  for (let i = 1; i <= n; i++) {
    let msg: string | number

    if (i % 3 === 0 && i % 5 === 0) {
      msg = 'fizzbuzz'
    } else if (i % 3 === 0) {
      msg = 'fizz'
    } else if (i % 5 === 0) {
      msg = 'buzz'
    } else {
      msg = i
    }

    // eslint-disable-next-line no-console, no-undef
    console.log(msg)
  }
}
