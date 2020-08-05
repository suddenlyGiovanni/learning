// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

export function strToChrMap(str: string): { [key: string]: number } {
  const obj: { [key: string]: number } = {}
  for (const chr of str) {
    obj[chr] = ++obj[chr] || 1
  }
  return obj //?
}

export function maxChar(str: string): string {
  const map = strToChrMap(str) //?
  const arr = Object.entries(map).sort((a, b) => b[1] - a[1]) //?
  const key = arr[0][0] //?
  return key
}

export function maxChar2(str: string): string {
  let max = 0
  let maxChr = ''
  const map = strToChrMap(str) //?

  for (const chr in map) {
    const key = chr //?
    const val = map[chr] //?
    if (val > max) {
      max = val
      maxChr = key
    }
  }
  return maxChr
}

export default maxChar
