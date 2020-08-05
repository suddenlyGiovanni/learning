// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

export function palindromeWithReversed(str: string): boolean {
  return (
    str ===
    str
      .split('')
      .reverse()
      .join('')
  )
}

export function palindromeWithEvery(str: string): boolean {
  return str
    .split('')
    .every((chr, idx, arr): boolean => chr === arr[arr.length - 1 - idx])
}

export default palindromeWithEvery
