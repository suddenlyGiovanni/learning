// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

interface ChrLookupTable {
  [key: string]: number
}

export function buildChrLookupTable(str: string): ChrLookupTable {
  const chrLookupTable: ChrLookupTable = {}
  for (const chr of str) {
    const chrStr = chr.toString()
    chrLookupTable[chrStr] = chrLookupTable[chrStr]++ || 1
  }
  return chrLookupTable
}

export function escapeStr(str: string): string {
  return str.replace(/[^\w]/g, '').toLowerCase()
}

export function sortStr(str: string): string {
  return str
    .split('')
    .sort()
    .join('')
}

export function isEqual(a: ChrLookupTable, b: ChrLookupTable): boolean {
  if (a === b) return true // the map are equal by reference
  const propsA = Object.getOwnPropertyNames(a)
  const propsB = Object.getOwnPropertyNames(b)
  if (propsA.length !== propsB.length) return false

  for (const key of propsA) {
    if (a[key] !== b[key]) return false
  }

  // the map are equal by value
  return true
}

export function anagrams(stringA: string, stringB: string): boolean {
  const strMapA = buildChrLookupTable(escapeStr(stringA)) //?
  const strMapB = buildChrLookupTable(escapeStr(stringB)) //?
  return isEqual(strMapA, strMapB)
}

/**
 * a solution relying on comparing two strings
 */
export function anagrams2(stringA: string, stringB: string): boolean {
  const strA = sortStr(escapeStr(stringA)) //?
  const strB = sortStr(escapeStr(stringB)) //?
  return strA === strB
}

export default anagrams2
