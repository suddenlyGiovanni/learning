// --- Directions
// Write a function that accepts a string.  The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.
// --- Examples
//   capitalize('a short sentence') --> 'A Short Sentence'
//   capitalize('a lazy fox') --> 'A Lazy Fox'
//   capitalize('look, it is working!') --> 'Look, It Is Working!'

export default function capitalize(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word): string => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
