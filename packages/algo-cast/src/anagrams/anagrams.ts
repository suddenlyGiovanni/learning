// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//

interface OccurrenceLookupMap {
  [key: string]: number
}
function occurrenceLookupMap(str: string): OccurrenceLookupMap {
  return str
    .toLowerCase()
    .replace(' ', '')
    .split('')
    .reduce<OccurrenceLookupMap>((table, chr) => {
      table[chr] = table[chr] + 1 || 1
      return table
    }, {}) //?
}

occurrenceLookupMap('rail safety') //?

function escapeStr(str: string): string {
  return str.replace(/[^\w]/g, '').toLowerCase()
}

function isMapEqual(
  mapA: OccurrenceLookupMap,
  mapB: OccurrenceLookupMap
): boolean {
  if(mapA === mapB) return true
  const propsA = Object.keys(mapA)
  const propsB= Object.keys(mapB)

  if(propsA.length !== propsB.length) return false

  for (const key of propsA) {
    if(mapA[key] !== mapB[key]) return false
  }
  return true
}

function anagrams(stringA: string, stringB: string): boolean {
  const strMapA = occurrenceLookupMap(escapeStr(stringA))
  const strMapB = occurrenceLookupMap(escapeStr(stringB))
  return isMapEqual(strMapA, strMapB)
}

export default anagrams
